// sections/Hero.js
import DollarStat from "../stats/DollarStat";
import CounterStat from "../stats/CounterStat";
import StatCard from "../stats/StatCard";
import LinksList from "./LinkList";


const links = [
  { name: "Variables y tipos de datos", href: "#" },
  { name: "Estructuras de control (if/else, switch)", href: "#" },
  { name: "Bucles (for, while)", href: "#" },
  { name: "Funciones y procedimientos", href: "#" },
];

export default function Hero() {
  // Ejemplos de valores estáticos/derivados (podrías convertirlos a contadores también)
  const hoursPerWeek = "6–8";
  const challengesAvg = 12;

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt=""
        src="https://cdn.pixabay.com/photo/2024/05/21/19/57/computer-8779036_1280.jpg"
        className="absolute inset-0 -z-10 size-full object-cover object-center opacity-30"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Título */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Programación Estructurada
          </h2>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
            Fluctuación del Peso Mexicano con respecto al Dolar   
          </p>
        </div>

        {/* Enlaces */}
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <LinksList links={links} />

          {/* Stats */}
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1) USD→MXN en vivo */}
            <DollarStat name="Precio del dólar (USD→MXN)" />

            {/* 2) Contador 0..300 con icono + */}
            <CounterStat name="Contador de ejercicios (0–300)" target={300} durationMs={1200} />

            {/* 3) Otros datos del curso (pueden animarse si quieres) */}
            <StatCard name="Horas de práctica/semana" value={hoursPerWeek} />
            <StatCard name="Retos completados (promedio)" value={challengesAvg} />
          </dl>
        </div>
      </div>
    </div>
  );
}
