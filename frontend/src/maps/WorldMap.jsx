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
  view,
}) {
  const ref = useRef();
  const rotationRef = useRef([0, 0, 0]);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const rafRef = useRef(null);

  const colorType = modeToColorMap[mode][0];
  const colorDomain = modeToColorMap[mode][1];

  useEffect(() => {
    const render = () => {
      const width = ref.current.clientWidth || 800;
      const height = ref.current.clientHeight || 500;
      const map = Plot.plot({
        projection: {
          type: view,
          rotate: [...rotationRef.current],
          scale: 100,
        },
        marks: [
          ...(view === "orthographic" ? [Plot.graticule()] : []),
          Plot.geo(countries, {
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
    };
    const scheduleRender = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(render);
    };
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      if (view === "orthographic") {
        lastY.current = e.clientY;
      }
    };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      rotationRef.current[0] += dx * 0.5;

      // No vertical rotation when in 2D view
      if (view === "orthographic") {
        const dy = e.clientY - lastY.current;
        lastY.current = e.clientY;
        rotationRef.current[1] -= dy * 0.4;
      }
      scheduleRender();
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    render();

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [
    view,
    colorType,
    colorDomain,
    maxExpenditure,
    countries,
    dataMap,
    geoToEntityMap,
  ]);

  return <div className="world-map" ref={ref}></div>;
}

export default WorldMap;
