import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GlobeMesh } from "./GlobeMesh";
import { useGlobeStore } from "../../lib/globeStore";

function useIsWebGLAvailable() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

export function GlobeCanvas() {
  const reachVisible = useGlobeStore((s) => s.reachVisible);
  const opacity = reachVisible ? 1 : 0;
  const webglOK = useIsWebGLAvailable();
  const isMobile = useIsMobile();

  if (!webglOK) {
    return (
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#f1ece1_0%,#faf7f2_70%)]" />
    );
  }

  return (
    <div
      className="fixed inset-0 -z-10 transition-opacity duration-700 ease-out"
      style={{ opacity }}
    >
      <Canvas
        dpr={isMobile ? 1 : [1, 1.75]}
        camera={{ position: [0, 0, 7.4], fov: 36 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#faf7f2"]} />
        <fog attach="fog" args={["#faf7f2", 8, 13]} />
        <ambientLight intensity={1.1} />
        <pointLight position={[6, 4, 6]} intensity={45} color="#a97c2f" />
        <pointLight position={[-6, -3, -4]} intensity={20} color="#d8cbb0" />
        <Suspense fallback={null}>
          {reachVisible && <GlobeMesh lowDetail={isMobile} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
