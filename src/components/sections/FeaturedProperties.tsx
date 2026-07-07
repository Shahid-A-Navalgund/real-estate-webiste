import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { properties, type Property } from "../../data/properties";

gsap.registerPlugin(ScrollTrigger);

function PropertyCard({
  property,
  onOpen,
}: {
  property: Property;
  onOpen: (p: Property) => void;
}) {
  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 10,
      rotateX: -py * 10,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1,0.5)",
    });
  };

  return (
    <button
      onClick={() => onOpen(property)}
      className="property-card group relative w-[78vw] sm:w-[420px] flex-shrink-0 overflow-hidden border border-line bg-charcoal text-left [transform-style:preserve-3d]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="relative h-[320px] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
        <span className="absolute top-4 left-4 glass hairline px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-gold-light">
          {property.tag}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl text-ivory">{property.name}</h3>
            <p className="mt-1 text-sm text-ivory/50">
              {property.city}, {property.country}
            </p>
          </div>
          <p className="font-display text-lg text-gold-light whitespace-nowrap">
            {property.price}
          </p>
        </div>
        <div className="mt-5 flex gap-6 text-xs tracking-[0.1em] uppercase text-ivory/40">
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          <span>{property.sqft.toLocaleString()} Sqft</span>
        </div>
      </div>
    </button>
  );
}

function PropertyModal({
  property,
  onClose,
}: {
  property: Property | null;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!property) return;
    gsap.fromTo(
      backdropRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4, ease: "power2.out" }
    );
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: 40, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [property]);

  if (!property) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void/85 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden border border-gold-dim/40 bg-charcoal"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center border border-ivory/20 text-ivory/70 hover:text-gold-light hover:border-gold-light transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="h-64 md:h-80 overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-light/80">
            {property.tag}
          </p>
          <h3 className="mt-2 text-3xl">{property.name}</h3>
          <p className="mt-1 text-ivory/50">
            {property.city}, {property.country}
          </p>
          <p className="mt-6 font-display text-3xl text-gold-light">
            {property.price}
          </p>
          <div className="mt-6 flex gap-8 text-sm text-ivory/60">
            <span>{property.beds} Bedrooms</span>
            <span>{property.baths} Bathrooms</span>
            <span>{property.sqft.toLocaleString()} Sqft</span>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="mt-8 inline-block border border-gold px-8 py-3.5 text-xs tracking-[0.25em] uppercase text-gold-light hover:bg-gold hover:text-void transition-colors duration-300"
          >
            Request Private Viewing
          </a>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Property | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      gsap.fromTo(
        ".property-card",
        { autoAlpha: 0, scale: 0.8, rotateY: -20, transformPerspective: 1000 },
        {
          autoAlpha: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      const distance = () => track.scrollWidth - window.innerWidth + 96;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.scrollTrigger?.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="properties"
      className="relative bg-void py-32 md:py-0 md:h-screen md:flex md:flex-col md:justify-center overflow-hidden"
    >
      <div className="px-6 md:px-10 mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-4">
          The Portfolio
        </p>
        <h2 className="text-4xl md:text-5xl max-w-xl">
          Currently <span className="text-gradient-gold italic">Available</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 px-6 md:px-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0"
      >
        {properties.map((p) => (
          <div key={p.id} className="snap-start">
            <PropertyCard property={p} onOpen={setSelected} />
          </div>
        ))}
      </div>

      <PropertyModal property={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
