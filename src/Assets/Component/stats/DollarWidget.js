import { useEffect, useMemo, useState } from "react";

/** Formato de número */
function fmt(n, digits = 2) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return Number(n).toFixed(digits);
}

/** Rango mínimo/máximo */
function range(arr) {
  let min = Infinity, max = -Infinity;
  for (const v of arr) {
    if (typeof v === "number" && !Number.isNaN(v)) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  return [min, max];
}

/** Sparkline ampliado en SVG */
function Sparkline({ data = [], strokeWidth = 2 }) {
  if (!data.length) return null;

  const w = 400; // 🔹 ancho mayor
  const h = 100; // 🔹 alto mayor
  const [min, max] = range(data);
  const span = max - min || 1;
  const stepX = data.length > 1 ? w / (data.length - 1) : w;

  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / span) * h;
      // CORRECCIÓN: Devolver un string con formato
      return `${x},${y}`;
    })
    .join(" ");

  const last = data[data.length - 1];
  // CORRECCIÓN: Calcular la coordenada X del último punto
  const lastX = (data.length - 1) * stepX;
  const lastY = h - ((last - min) / span) * h;

  return (
    // CORRECCIÓN: Usar template literal (con backticks) para el viewBox
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[100px]">
      {/* línea principal */}
      <polyline
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth={strokeWidth}
        points={points}
      />
      {/* punto final */}
      <circle
        // CORRECCIÓN: Usar las coordenadas X e Y calculadas
        cx={lastX}
        cy={lastY}
        r="4"
        className="fill-current"
      />
    </svg>
  );
}

/** Componente principal */
export default function DollarWidget() {
  const [status, setStatus] = useState("idle");
  const [series, setSeries] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const { last, prev, change, changePct } = useMemo(() => {
    if (series.length < 2) return { last: null, prev: null, change: null, changePct: null };
    const l = series[series.length - 1].value;
    const p = series[series.length - 2].value;
    const ch = l - p;
    const pct = p ? (ch / p) * 100 : null;
    return { last: l, prev: p, change: ch, changePct: pct };
  }, [series]);

  useEffect(() => {
    let cancelled = false;

    async function fetchFx() {
      setStatus("loading");
      const cacheKey = "usd_mxn_series";
      const now = Date.now();
      try {
        const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
        if (cached && now - cached.ts < 10 * 60 * 1000) {
          if (!cancelled) {
            setSeries(cached.data);
            setStatus("ok");
            return;
          }
        }
      } catch {}

      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);
      const fmtD = (d) => d.toISOString().slice(0, 10);

      const attempts = [0, 1];
      for (const _ of attempts) {
        try {
          // CORRECCIÓN: La URL debe ser un string (template literal)
          const url = `https://api.frankfurter.app/${fmtD(start)}..${fmtD(end)}?from=USD&to=MXN`;
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          const data = await res.json();
          if (data && data.rates && typeof data.rates === "object") {
            const points = Object.keys(data.rates)
              .sort()
              .map((date) => ({ date, value: Number(data.rates[date]?.MXN) }))
              .filter((p) => !Number.isNaN(p.value));

            if (!cancelled && points.length) {
              setSeries(points);
              setStatus("ok");
              try {
                localStorage.setItem(cacheKey, JSON.stringify({ ts: now, data: points }));
              } catch {}
              return;
            }
          }
        } catch {}
      }

      if (!cancelled) {
        setStatus("error");
        setErrorMsg("No se pudo obtener el tipo de cambio USD→MXN.");
      }
    }

    fetchFx();
    return () => {
      cancelled = true;
    };
  }, []);

  // Layout: izquierda (texto) | derecha (gráfica)
  if (status === "ok") {
    const values = series.map((s) => s.value);
    const arrowUp = change >= 0;

    return (
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          {/* 🟢 Izquierda */}
          <div className="min-w-0 flex-1">
            <div className="text-sm text-gray-300 mb-1">Precio del dólar (USD→MXN)</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-white">{fmt(last)}</span>
              <span className="text-gray-400 text-lg">MXN</span>
            </div>
            <div className="mt-1 text-sm">
              <span className={arrowUp ? "text-emerald-400" : "text-red-400"}>
                {arrowUp ? "▲" : "▼"} {fmt(change)} ({fmt(changePct)}%)
              </span>
              <span className="text-gray-400"> vs. día previo</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Fuente: frankfurter.app — actualización diaria (últimos 30 días)
            </div>
          </div>

          {/* 📈 Derecha */}
          <div className="sm:w-[420px] w-full text-emerald-400">
            <div className="text-xs text-gray-400 text-center mb-1">
              Tendencia USD→MXN (últimos 30 días)
            </div>
            <Sparkline data={values} />
          </div>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div className="text-sm text-gray-300 mb-1">Precio del dólar (USD→MXN)</div>
            <div className="text-4xl font-semibold text-white">...</div>
            <div className="text-xs text-gray-400 mt-1">Cargando cotización...</div>
          </div>
          <div className="sm:w-[420px] w-full h-[100px] rounded bg-white/10 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 w-full max-w-5xl mx-auto">
        <div className="text-sm text-gray-300 mb-1">Precio del dólar (USD→MXN)</div>
        <div className="text-red-400 text-sm">{errorMsg}</div>
        <div className="text-xs text-gray-400 mt-1">
          Sugerencia: verifica tu conexión o intenta más tarde.
        </div>
      </div>
    );
  }

  return null;
}