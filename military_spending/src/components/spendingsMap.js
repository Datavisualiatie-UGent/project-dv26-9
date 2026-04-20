import * as Plot from "npm:@observablehq/plot";

const formatValue = (value, type) => {
  if (value == null || isNaN(value)) return "No data";

  if (type === "govt" || type === "gdp") {
    return `${value}%`;
  }

  return (
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value) + " USD"
  );
};

const colorMap = {
  absolute: ["log", 1],
  capita: ["linear", 0],
  govt: ["linear", 0],
  gdp: ["linear", 0],
};

const labelMap = {
  absolute: "Military expenditure in constant 2023 USD (logarithmic scale)",
  capita: "Military spending per capita",
  govt: "Share of government spending",
  gdp: "Share of Gross Domestic Product",
};

export function spendingsMap(
  countries,
  access_year,
  geoToEntityMap,
  maxExpenditure,
  mode,
  mapType,
  width,
  rotate,
) {
  return Plot.plot({
    width,
    height: width * 0.55,
    projection: {
      type: mapType === "Map" ? "equirectangular" : "orthographic",
      rotate: rotate,
    },
    marks: [
      ...(mapType !== "Map" ? [Plot.graticule()] : []),
      Plot.geo(countries, {
        stroke: "white",
        strokeWidth: 0.25,
        strokeOpacity: 0.8,
        fill: (d) => {
          const countryName = d.properties.name;
          const value = access_year.get(geoToEntityMap[countryName]);
          return value;
        },
      }),
      Plot.tip(
        countries,
        Plot.pointer(
          Plot.geoCentroid({
            title: (d) => {
              const countryName = d.properties.name;
              const value = access_year.get(geoToEntityMap[countryName]);
              return `${countryName} (${formatValue(value, mode) ?? "unknown"})`;
            },
            anchor: "bottom",
            textPadding: 3,
          }),
        ),
      ),
    ],
    color: {
      type: colorMap[mode][0],
      domain: [colorMap[mode][1], maxExpenditure],
      scheme: "blues",
      label: labelMap[mode],
      unknown: "var(--theme-foreground-muted)",
      legend: true,
      tickFormat: (d) =>
        `${formatValue(d, mode)}`,
      ticks: 3

    },
  });
}
