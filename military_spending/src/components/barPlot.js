import * as Plot from "npm:@observablehq/plot";

const labelMap = {
  Absolute: "",
  Capita: "",
  Govt: "",
  Gdp: "",
};

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

export default function BarPlot({ dataForSelectedCountries, dataType }) {
  return Plot.plot({
    marginLeft: 100, // adds padding on the left for long country names
    marks: [
      Plot.ruleX([0]),
      Plot.barX(dataForSelectedCountries, {
        y: "Entity",
        x: "Military_expenditure",
        sort: { y: "x", reverse: true },
        fill: "steelblue",
      }),
      Plot.tip(
        dataForSelectedCountries,
        Plot.pointerY({
          y: "Entity",
          x: "Military_expenditure",
          title: (d) => formatValue(d.Military_expenditure, dataType.toLowerCase()),
          textPadding: 7.5,
          anchor: "right"
        }),
        
      ),
    ],
    x: {
      label: labelMap[dataType],
      grid: true,
      axis: "top",
      tickFormat: (d) => formatValue(d, dataType.toLowerCase()),
    },
    y: {
      label: "Country",
    },
  });
}
