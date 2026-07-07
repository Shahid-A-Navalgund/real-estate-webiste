import { useMemo } from "react";

export function Particles({ count = 18 }: { count?: number }) {
  const specks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * -18,
        driftX: (Math.random() - 0.5) * 60,
        driftY: -(80 + Math.random() * 140),
        opacity: 0.25 + Math.random() * 0.35,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {specks.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `drift ${s.duration}s ease-in-out ${s.delay}s infinite`,
            ["--drift-x" as string]: `${s.driftX}px`,
            ["--drift-y" as string]: `${s.driftY}px`,
            ["--particle-opacity" as string]: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
