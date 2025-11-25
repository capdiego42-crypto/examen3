import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Download,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Github,
  Linkedin,
} from "lucide-react";

// ====== Datos de ejemplo (cámbialos por los tuyos) ======
const PROFILE = {
  nombre: "Osiel Morales Chávez",
  rol: "Diseñador curricular | UX/UI | IA aplicada",
  ubicacion: "Puebla, MX",
  email: "osiel@example.com",
  telefono: "+52 222 000 0000",
  bio: "Profesor y coordinador académico con enfoque en diseño instruccional, UX y automatización. Apasionado por crear experiencias de aprendizaje significativas, inclusivas y medibles.",
  links: {
    github: "https://github.com/tu_usuario",
    linkedin: "https://linkedin.com/in/tu_usuario",
    cv: "/cv-osiel.pdf",
  },
};

const EXPERIENCIA = [
  {
    empresa: "UMP",
    rol: "Coordinador de Maestría",
    inicio: 2021,
    fin: "Actual",
    logros: ["Optimicé el plan curricular 7+1", "Integré IA en evaluación formativa"],
  },
  {
    empresa: "UNIR",
    rol: "Profesor de Marketing Digital",
    inicio: 2020,
    fin: 2024,
    logros: ["Diseñé 12 módulos con DCU", "Aumenté retención 15%"],
  },
  {
    empresa: "BDS",
    rol: "Líder de Desarrollo Web",
    inicio: 2018,
    fin: 2020,
    logros: ["Automatizaciones con bots", "Sitios e-commerce escalables"],
  },
];

const HABILIDADES = [
  { nombre: "UX Research", nivel: "Avanzado", categoria: "UX" },
  { nombre: "UI Design (Tailwind)", nivel: "Avanzado", categoria: "UI" },
  { nombre: "React", nivel: "Intermedio", categoria: "Frontend" },
  { nombre: "Node.js", nivel: "Intermedio", categoria: "Backend" },
  { nombre: "MongoDB", nivel: "Intermedio", categoria: "Datos" },
  { nombre: "Python (IA)", nivel: "Intermedio", categoria: "IA" },
  { nombre: "ISO 27001", nivel: "Avanzado", categoria: "Calidad" },
  { nombre: "Didáctica y evaluación", nivel: "Avanzado", categoria: "Educación" },
];

export default function AcercaDeMi() {
  const [filtro, setFiltro] = useState("Todos");
  const [modoCompacto, setModoCompacto] = useState(false);

  // ====== ESTRUCTURAS DE CONTROL ======
  if (!PROFILE || !PROFILE.nombre) {
    return <p className="text-center text-sm text-gray-500">No se encontró el perfil.</p>;
  }

  const nivelClass = (nivel) => {
    switch (nivel) {
      case "Avanzado":
        return "bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-400/40";
      case "Intermedio":
        return "bg-blue-500/10 text-blue-600 ring-1 ring-blue-400/40";
      case "Básico":
        return "bg-amber-500/15 text-amber-600 ring-1 ring-amber-400/40";
      default:
        return "bg-zinc-500/10 text-zinc-600 ring-1 ring-zinc-400/40";
    }
  };

  const { habilidadesFiltradas, categorias, aniosExperiencia } = useMemo(() => {
    const categoriasUnicas = Array.from(new Set(HABILIDADES.map((h) => h.categoria)));
    const habilidadesFiltradas = HABILIDADES.filter((h) =>
      filtro === "Todos" ? true : h.categoria === filtro
    );

    const currentYear = new Date().getFullYear();
    const anios = EXPERIENCIA.reduce((acc, item) => {
      const fin = item.fin === "Actual" ? currentYear : item.fin;
      const duracion = (fin ?? currentYear) - item.inicio;
      return acc + (Number.isFinite(duracion) ? Math.max(duracion, 0) : 0);
    }, 0);

    return { habilidadesFiltradas, categorias: categoriasUnicas, aniosExperiencia: anios };
  }, [filtro]);

  const cardBase =
    "rounded-2xl border border-white/20 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)]";

  return (
    <section
      aria-labelledby="about-heading"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/50 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"
            alt="Avatar del perfil"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <h2
          id="about-heading"
          className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          {PROFILE.nombre}
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{PROFILE.rol}</p>

        <div className="mt-3 flex items-center justify-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
          <span className="inline-flex items-center gap-1">
            <MapPin size={16} /> {PROFILE.ubicacion}
          </span>
          <span aria-hidden>|</span>
          <a
            className="inline-flex items-center gap-1 hover:underline"
            href={`mailto:${PROFILE.email}`}
          >
            <Mail size={16} /> {PROFILE.email}
          </a>
          <span aria-hidden>|</span>
          <a
            className="inline-flex items-center gap-1 hover:underline"
            href={`tel:${PROFILE.telefono}`}
          >
            <Phone size={16} /> {PROFILE.telefono}
          </a>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-balance text-zinc-700 dark:text-zinc-200">
          {PROFILE.bio}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={PROFILE.links.cv}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-gradient-to-br from-zinc-50/70 to-white/60 px-4 py-2 text-sm font-medium text-zinc-900 shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:from-zinc-800/70 dark:to-zinc-900/70 dark:text-white"
          >
            <Download size={16} /> Descargar CV
          </a>
          <a
            href={PROFILE.links.github}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-zinc-800/70 dark:text-white"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={PROFILE.links.linkedin}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-zinc-800/70 dark:text-white"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </motion.header>

      {/* CONTROLES */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor="categoria"
            className="text-sm text-zinc-600 dark:text-zinc-300"
          >
            Filtrar habilidades:
          </label>
          <select
            id="categoria"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className={`${cardBase} bg-white/70 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
          >
            <option>Todos</option>
            {categorias.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setModoCompacto((m) => !m)}
          className={`${cardBase} inline-flex items-center gap-2 px-4 py-2 text-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400`}
          aria-pressed={modoCompacto}
        >
          <Sparkles size={16} /> {modoCompacto ? "Modo detallado" : "Modo compacto"}
        </button>
      </div>

      {/* MÉTRICAS */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Años de experiencia", value: aniosExperiencia },
          { label: "Proyectos guiados", value: 40 },
          { label: "Cursos dirigidos", value: 25 },
        ].map((m) => (
          <div key={m.label} className={`${cardBase} p-5`}>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{m.label}</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {m.value}
            </p>
          </div>
        ))}
      </section>

      {/* HABILIDADES */}
      <section className="mb-10">
        <h3 className="mb-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Habilidades clave
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {habilidadesFiltradas.map((h) => (
            <div key={h.nombre} className={`${cardBase} flex items-center justify-between p-4`}>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{h.nombre}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">{h.categoria}</p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${nivelClass(
                  h.nivel
                )}`}
              >
                <BadgeCheck size={14} className="mr-1" /> {h.nivel}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="mb-10">
        <h3 className="mb-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Experiencia
        </h3>
        <ol className="relative border-s border-zinc-200 dark:border-zinc-700">
          {EXPERIENCIA.map((item, idx) => {
            const fin = item.fin === "Actual" ? "Actual" : item.fin;
            return (
              <li key={`${item.empresa}-${idx}`} className="mb-8 ms-4">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <div className={`${cardBase} p-4`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.rol} · {item.empresa}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">
                      {item.inicio} — {fin}
                    </p>
                  </div>

                  {!modoCompacto ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                      {item.logros?.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.logros?.[0] ?? "Experiencia destacada"}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* CONTACTO */}
      <footer
        className={`${cardBase} p-5`}
        role="contentinfo"
        aria-label="Información de contacto"
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">¿Colaboramos?</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Escríbeme y construyamos soluciones claras, accesibles y sostenibles.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-400/30 hover:bg-emerald-500/15 focus-visible:ring-2 focus-visible:ring-emerald-400 dark:text-emerald-300"
            >
              <Mail size={16} /> Contactar
            </a>
            <a
              href={PROFILE.links.github}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-zinc-50/70 px-4 py-2 text-sm font-medium text-zinc-800 ring-1 ring-zinc-300/50 hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-zinc-800/70 dark:text-white"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={PROFILE.links.linkedin}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-sky-50/70 px-4 py-2 text-sm font-medium text-sky-800 ring-1 ring-sky-300/50 hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-zinc-800/70 dark:text-white"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
