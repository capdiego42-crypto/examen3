// components/stats/CounterStat.js
import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import StatCard from "./StatCard";

export default function CounterStat({ name = "Contador (0–300)", target = 300, durationMs = 1200 }) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null); // ✅ corregido

  useEffect(() => {
    let rafId = 0;
    const step = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;

      // if/else + límites
      const t = elapsed / durationMs;
      const clamped = t < 0 ? 0 : t > 1 ? 1 : t;

      // easing (easeOutCubic)
      const eased = 1 - Math.pow(1 - clamped, 3);
      setValue(Math.round(eased * target));

      if (clamped < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    if (typeof target === "number" && target > 0) {
      rafId = requestAnimationFrame(step);
    } else {
      setValue(0);
    }

    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);

  return <StatCard name={name} value={value} Icon={PlusIcon} />;
}