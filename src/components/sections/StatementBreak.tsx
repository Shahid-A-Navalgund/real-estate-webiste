import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Sourced.", "Verified.", "Secured.", "Delivered."];

export function StatementBreak() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".statement-word",
        { autoAlpha: 0.08, scale: 0.9, x: -30 },
        {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          ease: "power2.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-void px-6 py-32 md:py-44 flex flex-col items-center md:items-start"
    >
      <div className="mx-auto max-w-4xl w-full">
        {WORDS.map((w, i) => (
          <h2
            key={w}
            className={`statement-word text-6xl md:text-8xl lg:text-9xl leading-[1.05] ${
              i === WORDS.length - 1 ? "text-gradient-gold italic" : "text-ivory"
            }`}
          >
            {w}
          </h2>
        ))}
      </div>
    </section>
  );
}
