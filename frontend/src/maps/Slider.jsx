import "../style/WorldMap.css";

export default function Slider({ year, setYear, min = 2000, max = 2024 }) {
  return (
    <div className="year-slider">
      <div style={{"marginLeft": "5px"}}>{min}</div>
      <input
        type="range"
        min={min}
        max={max}
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        style={{"width": "100%"}}
      />
      <div style={{"marginLeft": "5px"}}>{max}</div>
    </div>
  );
}