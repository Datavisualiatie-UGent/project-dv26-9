import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import ConflictWrapper from './plots/ConflictWrapper';
import InteractiveLinePlot from './plots/InteractiveLinePlot';

function App() {
  return <div>
    <h1>Datavisualisatie Groep 9</h1>

      <nav>
        <Link to="/conflicts">Conflict</Link> |{" "}
        <Link to="/lineplot">Interactive Lineplot</Link>
      </nav>

      <Routes>
        <Route path="/conflicts" element={<ConflictWrapper />} />
        <Route path="/lineplot" element={<InteractiveLinePlot />} />
      </Routes>
  </div>;
}

export default App
