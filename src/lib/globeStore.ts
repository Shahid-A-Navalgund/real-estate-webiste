import { create } from "zustand";

export type GlobeMode = "hero" | "reach";

interface GlobeState {
  heroVisible: boolean;
  reachVisible: boolean;
  activeMarkerIndex: number;
  setHeroVisible: (visible: boolean) => void;
  setReachVisible: (visible: boolean) => void;
  setActiveMarkerIndex: (index: number) => void;
}

export const useGlobeStore = create<GlobeState>((set) => ({
  heroVisible: true,
  reachVisible: false,
  activeMarkerIndex: 0,
  setHeroVisible: (visible) => set({ heroVisible: visible }),
  setReachVisible: (visible) => set({ reachVisible: visible }),
  setActiveMarkerIndex: (index) => set({ activeMarkerIndex: index }),
}));

if (import.meta.env.DEV) {
  (window as typeof window & { __globeStore?: typeof useGlobeStore }).__globeStore =
    useGlobeStore;
}
