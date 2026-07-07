import { useEffect, type RefObject } from "react";

export function useSectionVisibility(
  ref: RefObject<Element | null>,
  onChange: (visible: boolean) => void
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => onChange(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, onChange]);
}
