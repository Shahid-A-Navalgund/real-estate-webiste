import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LINKS = [
  { label: "Properties", href: "#properties" },
  { label: "Reach", href: "#reach" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function MagneticLink({ label, href }: { label: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.5,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative text-sm tracking-[0.15em] uppercase text-ivory/70 hover:text-gold-light transition-colors duration-300"
    >
      {label}
    </a>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
      gsap.fromTo(
        ".mobile-link",
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.1,
        }
      );
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="md:hidden fixed inset-x-0 top-[65px] z-40 glass hairline px-6 py-8"
    >
      <nav className="flex flex-col gap-6">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="mobile-link invisible text-lg tracking-[0.1em] uppercase text-ivory/80"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={onClose}
          className="mobile-link invisible mt-2 inline-block border border-gold-dim px-5 py-3 text-center text-xs tracking-[0.2em] uppercase text-gold-light"
        >
          Enquire
        </a>
      </nav>
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 py-5 glass hairline">
        <a
          href="#top"
          className="font-display text-lg tracking-[0.3em] uppercase text-ivory"
        >
          After<span className="text-gradient-gold">lex</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <MagneticLink key={l.href} {...l} />
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-block border border-gold-dim px-5 py-2 text-xs tracking-[0.2em] uppercase text-gold-light hover:bg-gold hover:text-void transition-colors duration-300"
        >
          Enquire
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        >
          <span
            className="h-px w-5 bg-ivory transition-transform duration-300"
            style={{
              transform: menuOpen ? "translateY(3.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="h-px w-5 bg-ivory transition-transform duration-300"
            style={{
              transform: menuOpen ? "translateY(-3.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
