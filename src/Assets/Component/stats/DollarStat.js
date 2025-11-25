// components/stats/DollarStat.js
import { useEffect, useState } from "react";
import StatCard from "./StatCard";

export default function DollarStat({ name = "Precio del dólar (USD→MXN)" }) {
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [hint, setHint] = useState("—");

  useEffect(() => {
    let cancelled = false;

    async function loadFx() {
      setStatus("loading");
      setHint("Consultando cotización…");

      // Pequeño ciclo de reintentos con for…of
      const attempts = [0, 1]; // 2 intentos
      for (const _ of attempts) {
        try {
          const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=MXN", { cache: "no-store" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          const data = await res.json();

          if (!cancelled && data?.rates?.MXN) {
            setValue(Number(data.rates.MXN).toFixed(2));
            setStatus("success");
            setHint("Fuente: Frankfurter.app");
            return;
          }
        } catch (err) {
          // continúas al siguiente intento
        }
      }

      if (!cancelled) {
        setStatus("error");
        setHint("No se pudo obtener el tipo de cambio.");
      }
    }

    loadFx();
    return () => {
      cancelled = true;
    };
  }, []);

  // switch: define hint final según estado (ejemplo de estructura de control)
  switch (status) {
    case "loading":
      return <StatCard name={name} value="…" suffix="MXN" hint={hint} />;
    case "success":
      return <StatCard name={name} value={value} suffix="MXN" hint={hint} />;
    case "error":
      return <StatCard name={name} value="—" suffix="" hint={hint} />;
    default:
      return <StatCard name={name} value="—" />;
  }
}