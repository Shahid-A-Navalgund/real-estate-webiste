import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "../../data/properties";
import { Particles } from "../Particles";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { autoAlpha: 0, y: 50, scale: 0.9, rotateX: -20, transformPerspective: 1000 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "back.out(1.4)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      const counters = gsap.utils.toArray<HTMLElement>(".stat-value");
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.value ?? "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent =
              (el.dataset.prefix ?? "") +
              (target % 1 === 0
                ? Math.floor(obj.val).toString()
                : obj.val.toFixed(1)) +
              (el.dataset.suffix ?? "");
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 14,
      rotateX: -py * 14,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const resetTilt = () => {
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-void px-6 py-32 md:py-44"
    >
      <Particles />
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-24 items-center">
        <div>
          <p className="about-reveal invisible text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-5">
            The House
          </p>
          <h2 className="about-reveal invisible text-4xl md:text-5xl leading-tight mb-6">
            Eighteen years of <span className="text-gradient-gold italic">quiet</span> access.
          </h2>
          <p className="about-reveal invisible text-ivory/60 font-light leading-relaxed max-w-md mb-12">
            AFTERLEX operates off-market, by introduction only. We represent
            fewer than forty addresses at any time — each vetted for
            architecture, provenance, and privacy — placed directly into the
            hands of collectors who understand what they are worth.
          </p>

          <div className="about-reveal invisible grid grid-cols-2 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="stat-value font-display text-3xl md:text-4xl text-gold-light"
                  data-value={s.value}
                  data-suffix={s.suffix}
                  data-prefix={s.prefix ?? ""}
                >
                  0
                </p>
                <p className="mt-1 text-xs tracking-[0.15em] uppercase text-ivory/40">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="about-reveal invisible [perspective:900px]"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden border border-gold-dim/40 [transform-style:preserve-3d]"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
              alt="Signature AFTERLEX residence"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 glass hairline px-4 py-3">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold-light">
                Est. 2008
              </p>
            </div>

            <div
              className="absolute top-6 right-6 glass hairline flex items-center gap-2 px-3.5 py-2.5"
              style={{ animation: "chip-float 5s ease-in-out infinite" }}
            >
              <span className="text-gold-light text-sm">◈</span>
              <p className="text-[10px] tracking-[0.15em] uppercase text-ivory/80">
                Private Pool
              </p>
            </div>

            <div
              className="absolute top-1/2 left-6 glass hairline flex items-center gap-2 px-3.5 py-2.5"
              style={{ animation: "chip-float 6s ease-in-out infinite 1.2s" }}
            >
              <span className="text-gold-light text-sm">⌁</span>
              <p className="text-[10px] tracking-[0.15em] uppercase text-ivory/80">
                Smart Access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
