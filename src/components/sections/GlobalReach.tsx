import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { properties } from "../../data/properties";
import { useGlobeStore } from "../../lib/globeStore";
import { useSectionVisibility } from "../../hooks/useSectionVisibility";

gsap.registerPlugin(ScrollTrigger);

export function GlobalReach() {
  const sectionRef = useRef<HTMLElement>(null);
  const lastIndex = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const setReachVisible = useGlobeStore((s) => s.setReachVisible);
  const setActiveMarkerIndex = useGlobeStore((s) => s.setActiveMarkerIndex);

  useSectionVisibility(sectionRef, useCallback((v) => setReachVisible(v), [setReachVisible]));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const perCity = isMobile ? 45 : 90;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${properties.length * perCity}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            properties.length - 1,
            Math.floor(self.progress * properties.length)
          );
          if (idx !== lastIndex.current) {
            lastIndex.current = idx;
            setActiveMarkerIndex(idx);
            setActiveIndex(idx);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveMarkerIndex]);

  const active = properties[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="reach"
      className="relative h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-6">
        Global Reach
      </p>

      <div className="relative h-32 md:h-40 flex items-center justify-center">
        {properties.map((p, i) => (
          <div
            key={p.id}
            className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <h3 className="text-4xl md:text-6xl text-void" style={{ textShadow: "0 2px 24px rgba(20,18,15,0.5)" }}>
              {p.city}
              <span className="text-gold-light">.</span>
            </h3>
            <p
              className="mt-2 text-sm tracking-[0.2em] uppercase text-void/80"
              style={{ textShadow: "0 1px 12px rgba(20,18,15,0.5)" }}
            >
              {p.country}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-2">
        {properties.map((p, i) => (
          <span
            key={p.id}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? "28px" : "8px",
              backgroundColor:
                i === activeIndex ? "#e6c878" : "rgba(243,239,231,0.2)",
            }}
          />
        ))}
      </div>

      <p className="mt-10 max-w-sm text-ivory/50 font-light">
        {active?.beds} bed · {active?.baths} bath · {active?.sqft.toLocaleString()} sqft
        <br />
        <span className="text-gold-light">{active?.price}</span>
      </p>
    </section>
  );
}
