import { useState } from 'react'
import './App.css'
import InteractiveLinePlot from './plots/InteractiveLinePlot';
import InteractiveWorldMap from './maps/InteractiveWorldMap';

function App() {
  return <div>
    <h1>Datavisualisatie Groep 9</h1>
    <InteractiveLinePlot/>
    <InteractiveWorldMap/>
  </div>;
}

export default App
