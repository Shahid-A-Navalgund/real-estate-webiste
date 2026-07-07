import { ScrollRevealText } from "../ScrollRevealText";

const COPY =
  "This isn't only about a house. It's about arriving somewhere that finally makes sense — a room that holds silence well, a view you stop noticing because it's simply yours. You are not comparing square footage. You are recognizing a life that was already waiting for you. That recognition is what we exist to protect.";

export function Manifesto() {
  return (
    <section className="relative bg-void px-6 py-32 md:py-44">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-10">
          Why AFTERLEX
        </p>
        <ScrollRevealText
          text={COPY}
          className="text-3xl md:text-5xl lg:text-6xl"
        />
      </div>
    </section>
  );
}
