import { createContext, useContext} from "react";

export const WorldMapContext = createContext(null);

export function useWorldMap() {
  const ctx = useContext(WorldMapContext);
  if (!ctx) {
    throw new Error("useWorldMap must be used inside WorldMapProvider");
  }
  return ctx;
}
