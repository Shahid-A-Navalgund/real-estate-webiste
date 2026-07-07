import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    gsap.to(el, { autoAlpha: 1, duration: 0.6, delay: 0.4 });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 -z-[9] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 invisible"
      style={{
        background:
          "radial-gradient(circle, rgba(169,124,47,0.14) 0%, rgba(169,124,47,0.05) 35%, transparent 70%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
