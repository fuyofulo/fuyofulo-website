"use client";

import { useEffect, useState } from "react";

const DAY_LABEL = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function format(date: Date): string {
  const day = DAY_LABEL[date.getDay()];
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${day} · ${hh}:${mm}:${ss}`;
}

export function BrandClock() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(format(new Date()));
    const id = setInterval(() => setLabel(format(new Date())), 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>{label ?? "--:--:--"}</span>
  );
}
