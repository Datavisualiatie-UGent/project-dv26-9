import * as Plot from "npm:@observablehq/plot";

const formatMoney = (value) => {
  if (value == null || isNaN(value)) return "No data";

  return (
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value) + " USD"
  );
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
              return `${countryName} (${formatMoney(value) ?? "unknown"})`;
            },
            anchor: "bottom",
            textPadding: 3,
          }),
        ),
      ),
    ],
    color: {
      type: "log",
      domain: [1, maxExpenditure],
      scheme: "blues",
      label: "Military expenditure (USD)",
      unknown: "var(--theme-foreground-muted)",
    },
  });
}
