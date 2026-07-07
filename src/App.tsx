import { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "./lib/SmoothScroll";
import { GlobeCanvas } from "./components/three/GlobeCanvas";
import { Preloader } from "./components/Preloader";
import { CursorGlow } from "./components/CursorGlow";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/sections/Hero";
import { Ticker } from "./components/Ticker";
import { About } from "./components/sections/About";
import { Manifesto } from "./components/sections/Manifesto";
import { Services } from "./components/sections/Services";
import { StatementBreak } from "./components/sections/StatementBreak";
import { FeaturedProperties } from "./components/sections/FeaturedProperties";
import { GlobalReach } from "./components/sections/GlobalReach";
import { Process } from "./components/sections/Process";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact, Footer } from "./components/sections/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      <GlobeCanvas />
      <CursorGlow />

      <Preloader
        onDone={() => {
          setLoading(false);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }}
      />

      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <Navbar />
        <main className="relative">
          <Hero />
          <Ticker />
          <About />
          <Manifesto />
          <Services />
          <StatementBreak />
          <FeaturedProperties />
          <GlobalReach />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
