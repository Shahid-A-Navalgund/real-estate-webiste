import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setHidden(true);
          onDone();
        },
      });

      tl.set(rootRef.current, { autoAlpha: 1 })
        .fromTo(
          ".preloader-mark",
          { autoAlpha: 0, y: 16, letterSpacing: "0.5em" },
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.35em",
            duration: 1,
            ease: "power3.out",
          }
        )
        .to(barRef.current, {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
        })
        .to(".preloader-mark", {
          autoAlpha: 0,
          y: -12,
          duration: 0.5,
          ease: "power2.in",
        })
        .to(
          rootRef.current,
          { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" },
          "-=0.2"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [onDone]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void invisible"
    >
      <p className="preloader-mark font-display text-2xl md:text-3xl text-gold-light tracking-[0.35em] uppercase">
        Afterlex
      </p>
      <div className="mt-6 h-px w-40 bg-line overflow-hidden">
        <div
          ref={barRef}
          className="h-full w-full bg-gold origin-left scale-x-0"
        />
      </div>
    </div>
  );
}
