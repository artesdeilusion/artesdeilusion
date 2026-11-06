"use client";

import { useEffect, useState } from "react";

export function CountUp({
  value,
  run,
  duration = 1400,
}: {
  value: string;
  run: boolean;
  duration?: number;
}) {
  const match = /^(\d+)(.*)$/.exec(value);
  const numeric = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match?.[2] ?? "";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!numeric || !run) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setCurrent(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, target, duration, numeric]);

  if (!numeric) return <>{value}</>;
  return (
    <>
      {run ? current : 0}
      {suffix}
    </>
  );
}
