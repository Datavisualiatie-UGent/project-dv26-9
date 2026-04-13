import { useState } from "react";
import "./App.css";
import InteractiveLinePlot from "./plots/InteractiveLinePlot";
import InteractiveWorldMap from "./maps/InteractiveWorldMap";
import { WorldMapProvider } from "./contexts/WorldMapProvider";

function App() {
  return (
    <div>
      <h1>Datavisualisatie Groep 9</h1>
      <WorldMapProvider>
        <InteractiveLinePlot />

        <InteractiveWorldMap />
      </WorldMapProvider>
    </div>
  );
}

export default App;
