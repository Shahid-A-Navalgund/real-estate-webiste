import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "../Particles";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    n: "01",
    title: "Acquisitions",
    copy: "We source and negotiate off-market residences before they ever reach a listing.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "Private Sales",
    copy: "Discreet disposals for owners who value silence over signage.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=600&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Portfolio Advisory",
    copy: "Long-horizon strategy for collectors holding property across multiple markets.",
    image:
      "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?q=80&w=600&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "Concierge Relocation",
    copy: "From keys to staffing — a residence made livable before you arrive.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
  },
];

function ServiceRow({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <div className="group relative border-b border-line py-8 md:py-10">
      <div className="flex items-center gap-6 md:gap-10">
        <span className="font-display text-sm text-gold-dim shrink-0">
          {service.n}
        </span>
        <h3 className="flex-1 text-3xl md:text-5xl text-ivory/80 transition-colors duration-300 group-hover:text-ivory">
          {service.title}
        </h3>
        <span className="hidden md:block text-sm text-ivory/40 max-w-xs text-right transition-opacity duration-300 group-hover:opacity-0">
          {service.copy}
        </span>
        <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-full border border-gold-dim/40 scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
          <img
            src={service.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <p className="md:hidden mt-3 pl-[3.25rem] text-sm text-ivory/40 max-w-sm">
        {service.copy}
      </p>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-row",
        { autoAlpha: 0, y: 40, scale: 0.96, transformPerspective: 1000 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.3)",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-charcoal px-6 py-32 md:py-40"
    >
      <Particles count={12} />
      <div className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-4">
          What We Handle
        </p>
        <h2 className="text-4xl md:text-5xl mb-16 max-w-lg">
          Every stage of a <span className="text-gradient-gold italic">private</span> acquisition
        </h2>

        <div>
          {SERVICES.map((s) => (
            <div key={s.n} className="service-row invisible">
              <ServiceRow service={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
