import React, { useEffect, useState, useMemo } from "react";
import * as topojson from "topojson-client";
import { csvParse, autoType } from "d3-dsv";
import { WorldMapContext } from "../contexts/WorldMapContext";

function parsePerCapitaRows(lines) {
  // Skip lines[0] since it's carriage return
  const headers = lines[1].split(";");

  return lines.slice(2).map((line) => {
    const parts = line.split(";");

    const obj = {
      Entity: parts[0],
    };

    for (let i = 2; i < parts.length; i++) {
      const year = headers[i]?.trim();
      const val = parts[i];

      obj[year] = !val || val === "..." ? undefined : +val.replace(",", ".");
    }

    return obj;
  });
}

function flattenPerCapita(data) {
  return data.flatMap((row) =>
    Object.entries(row)
      .filter(
        ([k, v]) => k !== "Entity" && v != null && !isNaN(v),
      )
      .map(([year, value]) => ({
        Entity: row.Entity,
        Year: +year,
        value,
      })),
  );
}

export function WorldMapProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [geoToEntityMap, setGeoToEntityMap] = useState({});

  const [absoluteData, setAbsoluteData] = useState([]);
  const [perCapitaData, setPerCapitaData] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/military-spending-sipri.csv");
      const text = await res.text();
      const data = csvParse(text, autoType);

      data.forEach((d) => {
        d.Military_expenditure = d["Military expenditure"];
        delete d["Military expenditure"];
      });

      setAbsoluteData(data);
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      const res = await fetch("/military-spending-sipri-percapita.csv");
      const text = await res.text();

      const lines = text.split("\n");
      const parsed = parsePerCapitaRows(lines);
      const long = flattenPerCapita(parsed);

      setPerCapitaData(long);
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      const countriesGeo = await fetch("/countries.geo.json").then((r) =>
        r.json(),
      );

      const features = topojson.feature(
        countriesGeo,
        countriesGeo.objects.countries,
      ).features;

      setCountries(features);

      const geoFile = await fetch("/geo_countries.txt").then((r) => r.text());
      const entityFile = await fetch("/entities.txt").then((r) => r.text());

      const geoNames = geoFile.split("\n").map((d) => d.trim());
      const entityNames = entityFile.split("\n").map((d) => d.trim());

      const map = {};
      const len = Math.min(geoNames.length, entityNames.length);

      for (let i = 0; i < len; i++) {
        map[geoNames[i]] = entityNames[i];
      }

      setGeoToEntityMap(map);
    }

    load();
  }, []);

  const value = useMemo(
    () => ({
      countries,
      geoToEntityMap,
      absoluteData,
      perCapitaData,
    }),
    [countries, geoToEntityMap, absoluteData, perCapitaData],
  );

  return (
    <WorldMapContext.Provider value={value}>
      {children}
    </WorldMapContext.Provider>
  );
}
