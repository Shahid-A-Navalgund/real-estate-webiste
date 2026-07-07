import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "../Particles";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Private Introduction",
    copy: "A confidential conversation to understand what you are truly searching for — beyond the brief.",
  },
  {
    n: "02",
    title: "Curated Access",
    copy: "We open doors to addresses that never reach the open market, matched precisely to your criteria.",
  },
  {
    n: "03",
    title: "Discreet Negotiation",
    copy: "Every term is handled directly by our principals — no intermediaries, no leverage lost.",
  },
  {
    n: "04",
    title: "Seamless Closing",
    copy: "From offer to keys, a single point of contact carries the transaction to completion.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        { autoAlpha: 0, x: -50, scale: 0.9, rotateY: 25, transformPerspective: 1000 },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "back.out(1.4)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-void px-6 py-32 md:py-44"
    >
      <Particles />
      <div className="mx-auto max-w-4xl">
        <p className="text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-5 text-center">
          The Process
        </p>
        <h2 className="text-4xl md:text-5xl text-center mb-20">
          How <span className="text-gradient-gold italic">AFTERLEX</span> Works
        </h2>

        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-0 top-1 bottom-1 w-px bg-line">
            <div
              ref={lineRef}
              className="w-full h-full bg-gold origin-top scale-y-0"
            />
          </div>

          <div className="flex flex-col gap-16">
            {STEPS.map((s) => (
              <div key={s.n} className="process-step invisible relative">
                <span className="absolute -left-10 md:-left-14 top-0 font-display text-sm text-gold-dim">
                  {s.n}
                </span>
                <h3 className="text-2xl md:text-3xl mb-3">{s.title}</h3>
                <p className="text-ivory/55 font-light max-w-md leading-relaxed">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
