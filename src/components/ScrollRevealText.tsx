import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(".reveal-word", {
        color: "var(--color-ivory)",
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <p
      ref={containerRef}
      className={`font-display leading-[1.25] ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-word"
          style={{ color: "rgba(20, 18, 15, 0.18)" }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
