import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { properties } from "../data/properties";

export function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const items = [...properties, ...properties];

  return (
    <div className="relative border-y border-line bg-charcoal py-4 overflow-hidden">
      <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-lg text-ivory/70">
              {p.city} <span className="text-gold-light">{p.price}</span>
            </span>
            <span className="text-gold-dim">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
