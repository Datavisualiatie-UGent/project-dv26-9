import "../style/WorldMap.css";
import WorldMap from "./WorldMap";
import Slider from "./Slider";
import Select from "react-select";
import { useWorldMap } from "../contexts/WorldMapContext";
import { use, useMemo, useState } from "react";

const modeOptions = [
  { value: "absolute", label: "Constant (2024) USD" },
  { value: "capita", label: "Per Capita" },
];

const viewOptions = [
    { value: "equirectangular", label: "map" },
    { value: "orthographic", label: "globe" },
]

const yearRangeMap = {
  absolute: [1949, 2024],
  capita: [1988, 2024],
};

export default function InteractiveWorldMap() {
  const { countries, geoToEntityMap, absoluteData, perCapitaData } =
    useWorldMap();
  const [year, setYear] = useState(2024);
  const [mode, setMode] = useState("absolute");
  const [view, setView] = useState(viewOptions[0].value);

  const dataForYear = useMemo(() => {
    return absoluteData.filter((d) => d.Year === year);
  }, [absoluteData, year]);

  const perCapitaForYear = useMemo(() => {
    return perCapitaData.filter((d) => d.Year === year);
  }, [perCapitaData, year]);

  const absoluteMap = useMemo(() => {
    return new Map(dataForYear.map((d) => [d.Entity, d.Military_expenditure]));
  }, [dataForYear]);

  const perCapitaMap = useMemo(() => {
    return new Map(perCapitaForYear.map((d) => [d.Entity, d.value]));
  }, [perCapitaForYear]);

  const activeMap = mode === "absolute" ? absoluteMap : perCapitaMap;

  const maxExpenditure = useMemo(() => {
    if (!activeMap.size) return undefined;
    return Math.max(...activeMap.values());
  }, [activeMap]);

  const setModeSafe = (newMode) => {
    const [min, max] = yearRangeMap[newMode];

    setYear((y) => {
      if (y < min) return min;
      if (y > max) return max;
      return y;
    });

    setMode(newMode);
  };

  return (
    <div className="world-map-container">
      <div className="options-container">
        <h2 className="select-label">Data type</h2>
        <div className="select-container">
          <Select
            defaultValue={modeOptions[0]}
            options={modeOptions}
            onChange={(v) => setModeSafe(v.value)}
          />
        </div>
        <h2 className="select-label">View type</h2>
        <div className="select-container">
          <Select
            defaultValue={viewOptions[0]}
            options={viewOptions}
            onChange={(v) => setView(v.value)}
          />
        </div>
      </div>
      <WorldMap
        countries={countries}
        dataMap={activeMap}
        geoToEntityMap={geoToEntityMap}
        maxExpenditure={maxExpenditure}
        year={year}
        mode={mode}
        view={view}
      />
      <div className="slider-container">
        <Slider
          year={year}
          setYear={setYear}
          min={yearRangeMap[mode][0]}
          max={yearRangeMap[mode][1]}
        />
      </div>
    </div>
  );
}
