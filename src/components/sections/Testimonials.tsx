import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const QUOTES = [
  {
    quote:
      "AFTERLEX found us a residence we didn't know existed — and negotiated it without a single public listing.",
    name: "Private Collector, London",
  },
  {
    quote:
      "The most discreet team we've worked with. Every detail, handled personally, start to close.",
    name: "Family Office, Singapore",
  },
  {
    quote:
      "They understand that a home is an asset of legacy, not just an address.",
    name: "Founder, New York",
  },
  {
    quote:
      "From first call to keys in hand — six weeks. Nothing about the process felt rushed.",
    name: "Private Client, Dubai",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 34,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const items = [...QUOTES, ...QUOTES];

  return (
    <section className="relative bg-charcoal py-28 md:py-36 overflow-hidden">
      <p className="text-center text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-14">
        Trusted, Privately
      </p>

      <div className="relative">
        <div ref={trackRef} className="flex w-max gap-8 px-6">
          {items.map((t, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[420px] flex-shrink-0 border border-line bg-void/40 p-8"
            >
              <p className="font-display text-xl md:text-2xl italic text-ivory/85 leading-relaxed">
                “{t.quote}”
              </p>
              <p className="mt-6 text-xs tracking-[0.15em] uppercase text-gold-dim">
                {t.name}
              </p>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal to-transparent" />
      </div>
    </section>
  );
}
