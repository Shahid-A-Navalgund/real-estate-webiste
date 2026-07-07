import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobeStore } from "../../lib/globeStore";
import { useSectionVisibility } from "../../hooks/useSectionVisibility";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_DURATION = 14.1;
const PX_PER_SECOND = 130;
const SCROLL_PX = VIDEO_DURATION * PX_PER_SECOND;
const LERP_FACTOR = 0.08;
const SEEK_INTERVAL_MS = 1000 / 24;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const setHeroVisible = useGlobeStore((s) => s.setHeroVisible);

  const scrubbingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const lastSeekMsRef = useRef(0);
  const rafRef = useRef(0);

  useSectionVisibility(sectionRef, useCallback((v) => setHeroVisible(v), [setHeroVisible]));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = (timestamp: number) => {
      if (scrubbingRef.current) {
        const delta = targetTimeRef.current - smoothedTimeRef.current;
        if (Math.abs(delta) > 0.0005) {
          smoothedTimeRef.current += delta * LERP_FACTOR;
        }

        if (
          timestamp - lastSeekMsRef.current >= SEEK_INTERVAL_MS &&
          video.readyState >= 2 &&
          Math.abs(smoothedTimeRef.current - video.currentTime) > 0.04
        ) {
          video.currentTime = smoothedTimeRef.current;
          lastSeekMsRef.current = timestamp;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { autoAlpha: 0, y: 40, scale: 0.9, transformPerspective: 1000 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.3,
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${SCROLL_PX}`,
        pin: stageRef.current,
        pinSpacing: true,
        onUpdate: (self) => {
          const video = videoRef.current;
          if (!video) return;

          scrubbingRef.current = true;
          video.pause();
          targetTimeRef.current = self.progress * VIDEO_DURATION;
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative"
      style={{ height: `calc(100svh + ${SCROLL_PX}px)` }}
    >
      <div
        ref={stageRef}
        className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <div className="absolute inset-0 -z-[2]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="https://res.cloudinary.com/gi6ejqjf/video/upload/f_mp4,vc_h264,q_auto/v1783231593/copy_DB265340-2A2E-4833-ACEF-0E45BE232A92_zg2dvu.mp4"
            poster="https://res.cloudinary.com/gi6ejqjf/video/upload/so_0,f_jpg,q_auto/v1783231593/copy_DB265340-2A2E-4833-ACEF-0E45BE232A92_zg2dvu.jpg"
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent" />
        </div>

        <h1
          className="hero-reveal invisible font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.08em] uppercase text-ivory"
          style={{ textShadow: "0 4px 50px rgba(250,247,242,0.65)" }}
        >
          After<span className="text-gradient-gold italic">lex</span>
        </h1>

        <div className="hero-reveal invisible absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="h-12 w-px bg-gradient-to-b from-gold-light to-transparent" />
        </div>
      </div>
    </section>
  );
}
