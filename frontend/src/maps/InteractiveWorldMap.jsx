import React, { useEffect, useState, useMemo } from "react";
import { csvParse, autoType } from "d3-dsv";
import "../style/WorldMap.css";
import WorldMap from "./WorldMap";
import Slider from "./Slider";
import * as topojson from "topojson-client";
import { formatMoney } from "../utils";
import Select from "react-select";

const yearRangeMap = {
  absolute: [1970, 2024],
  capita: [1988, 2024],
};

const modeOptions = [
  { value: "absolute", label: "Absolute spending" },
  { value: "capita", label: "Per capita spending" },
];

async function loadAllData() {
  const res = await fetch("/military-spending-sipri.csv");
  const text = await res.text();
  const data = csvParse(text, autoType);

  data.forEach((d) => {
    d.Military_expenditure = d["Military expenditure"];
    delete d["Military expenditure"];
  });

  return data;
}

function parseRows(lines) {
  const headers = lines[1].split(";");

  return lines.slice(2).map((line) => {
    const parts = line.split(";");

    const entity = parts[0]; // KEEP comma inside name

    const obj = {
      Entity: entity,
      Code: parts[1],
    };

    for (let i = 2; i < parts.length; i++) {
      const year = headers[i].trim();

      let val = parts[i];

      if (!val || val === "...") {
        obj[year] = undefined;
      } else {
        // FIX decimal comma → dot
        obj[year] = +val.replace(",", ".");
      }
    }

    return obj;
  });
}

function toLongFormat(data) {
  return data.flatMap((row) => {
    return Object.entries(row)
      .filter(([k, v]) => k !== "Entity" && k !== "Code" && isNaN(v) === false)
      .map(([year, value]) => ({
        Entity: row.Entity,
        Year: +year,
        value,
      }));
  });
}

async function loadPerCapita() {
  const res = await fetch("/military-spending-sipri-percapita.csv");
  const text = await res.text();

  const lines = text.split("\n").filter(Boolean);

  const parsed = parseRows(lines);
  return toLongFormat(parsed);
}

export default function InteractiveWorldMap() {
  const [allData, setAllData] = useState([]);
  const [year, setYear] = useState(2024);
  const [countries, setCountries] = useState([]);
  const [geoToEntityMap, setGeoToEntityMap] = useState({});
  const [allPerCapitaData, setAllPerCapitaData] = useState([]);
  const [mode, setMode] = useState("absolute");

  useEffect(() => {
    const load = async () => {
      const data = await loadAllData();
      setAllData(data);
    };

    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      loadPerCapita().then((transformed) => {
        setAllPerCapitaData(transformed);
      });
    };

    load();
  }, []);

  useEffect(() => {
    const loadMapData = async () => {
      const countriesGeo = await fetch("/countries.geo.json").then((r) =>
        r.json(),
      );

      setCountries(
        topojson.feature(countriesGeo, countriesGeo.objects.countries).features,
      );

      const geoFile = await fetch("/geo_countries.txt").then((r) => r.text());
      const entitiesFile = await fetch("/entities.txt").then((r) => r.text());

      const geoNames = geoFile.split("\n").map((d) => d.trim());
      const entityNames = entitiesFile.split("\n").map((d) => d.trim());

      const map = {};
      const len = Math.min(geoNames.length, entityNames.length);

      for (let i = 0; i < len; i++) {
        map[geoNames[i]] = entityNames[i];
      }

      setGeoToEntityMap(map);
    };

    loadMapData();
  }, []);

  const dataForYear = useMemo(() => {
    return allData.filter((d) => d.Year === year);
  }, [allData, year]);

  const accessYear = useMemo(() => {
    return new Map(
      dataForYear.map(({ Entity, Military_expenditure }) => [
        Entity,
        Military_expenditure,
      ]),
    );
  }, [dataForYear]);

  const perCapitaForYear = useMemo(() => {
    return allPerCapitaData.filter((d) => d.Year === year);
  }, [allPerCapitaData, year]);

  const perCapitaMap = useMemo(() => {
    return new Map(perCapitaForYear.map((d) => [d.Entity, d.value]));
  }, [perCapitaForYear]);

  const activeMap = mode === "absolute" ? accessYear : perCapitaMap;
  const maxExpenditure = useMemo(() => {
    return activeMap.size ? Math.max(...activeMap.values()) : undefined;
  }, [activeMap]);

  return (
    <div className="world-map-container">
      <h2>Map</h2>
      <div className="options-container">
        <div className="select-container">
          <Select
            defaultValue={modeOptions[0]}
            options={modeOptions}
            onChange={(value, _) => {
                // If we switch mode, make sure that place of current slider is not lower than minimum year of the new mode
                if (year < yearRangeMap[value.value][0]) {
                  setYear(yearRangeMap[value.value][0]);
                }

                // Same for the max
                if (year > yearRangeMap[value.value][1]) {
                  setYear(yearRangeMap[value.value][1]);
                }
                
                setMode(value.value);
            }}
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
