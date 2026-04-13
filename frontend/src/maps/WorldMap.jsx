import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";
import "../style/WorldMap.css";
import { formatMoney } from "../utils";

const unknownColor = "rgb(73, 73, 73)";

const modeToColorMap = {
  absolute: ["log", 1],
  capita: ["linear", 0],
};

function WorldMap({
  countries,
  dataMap,
  geoToEntityMap,
  maxExpenditure,
  year,
  mode,
}) {
  const ref = useRef();

  useEffect(() => {
    if (!countries.length) return;
    const width = ref.current.clientWidth || 800;
    const height = ref.current.clientHeight || 500;

    const colorType = modeToColorMap[mode][0];
    const colorDomain = modeToColorMap[mode][1];

    async function loadAndRender() {
      const map = Plot.plot({
        projection: { type: "equirectangular"},
        marks: [
          Plot.geo(countries, {
            pointerEvents: "all",
            stroke: "white",
            strokeWidth: 0.25,
            strokeOpacity: 0.8,
            fill: (d) => {
              const countryName = d.properties.name;
              const value = dataMap.get(geoToEntityMap[countryName]);

              return value;
            },
          }),
          Plot.tip(
            countries,
            Plot.pointer(
              Plot.geoCentroid({
                title: (d) => {
                  const countryName = d.properties.name;
                  const value = dataMap.get(geoToEntityMap[countryName]);

                  return `${countryName} (${formatMoney(value) ?? "unknown"})`;
                },
                anchor: "bottom",
                textPadding: 3,
              }),
            ),
          ),
        ],
        color: {
          type: colorType,
          base: 10,
          domain: [colorDomain, maxExpenditure],
          scheme: "Viridis",
          unknown: unknownColor,
        },
        width,
        height,
      });

      ref.current.innerHTML = "";
      ref.current.appendChild(map);
    }

    loadAndRender();

    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [year, countries, dataMap, geoToEntityMap, maxExpenditure, mode]);

  return <div className="world-map" ref={ref}></div>;
}

export default WorldMap;
