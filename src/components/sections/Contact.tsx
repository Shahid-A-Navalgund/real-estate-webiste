import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "../Particles";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { autoAlpha: 0, y: 50, scale: 0.9, rotateX: -20, transformPerspective: 1000 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "back.out(1.4)",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-void px-6 py-32 md:py-44"
    >
      <Particles />
      <div className="mx-auto max-w-3xl text-center">
        <p className="contact-reveal invisible text-xs tracking-[0.4em] uppercase text-gold-light/80 mb-5">
          Private Enquiry
        </p>
        <h2 className="contact-reveal invisible text-4xl md:text-6xl mb-6">
          Begin your <span className="text-gradient-gold italic">search</span>
        </h2>
        <p className="contact-reveal invisible text-ivory/55 font-light mb-14 max-w-lg mx-auto">
          Introductions are by referral or direct enquiry. Tell us what
          you're looking for and a principal will respond within 24 hours.
        </p>

        {submitted ? (
          <div className="contact-reveal invisible border border-gold-dim/40 px-8 py-10">
            <p className="font-display text-2xl text-gold-light mb-2">
              Thank you.
            </p>
            <p className="text-ivory/55 font-light">
              Your enquiry has been received. Our team will be in touch
              privately, within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="contact-reveal invisible grid gap-5 text-left"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Full Name"
                className="border border-line bg-transparent px-5 py-4 text-sm placeholder:text-ivory/30 focus:border-gold focus:outline-none transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="border border-line bg-transparent px-5 py-4 text-sm placeholder:text-ivory/30 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="City of Interest"
              className="border border-line bg-transparent px-5 py-4 text-sm placeholder:text-ivory/30 focus:border-gold focus:outline-none transition-colors"
            />
            <textarea
              rows={4}
              placeholder="Tell us what you're searching for"
              className="border border-line bg-transparent px-5 py-4 text-sm placeholder:text-ivory/30 focus:border-gold focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              className="mt-2 border border-gold px-8 py-4 text-xs tracking-[0.25em] uppercase text-gold-light hover:bg-gold hover:text-void transition-colors duration-300"
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-charcoal border-t border-line px-6 py-12">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-lg tracking-[0.3em] uppercase">
          After<span className="text-gradient-gold">lex</span>
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs tracking-[0.15em] uppercase text-ivory/40">
          <a href="#properties" className="hover:text-gold-light transition-colors">
            Properties
          </a>
          <a href="#reach" className="hover:text-gold-light transition-colors">
            Reach
          </a>
          <a href="#process" className="hover:text-gold-light transition-colors">
            Process
          </a>
          <a href="#contact" className="hover:text-gold-light transition-colors">
            Contact
          </a>
        </nav>
        <p className="text-xs text-ivory/30">
          © {new Date().getFullYear()} AFTERLEX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
