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
  if (dataForSelectedCountries.length === 0) {
    return "";
  }
  return Plot.plot({
    marginLeft: 100, // adds padding on the left for long country names
    marginRight:75, // adds padding on the right for tooltip
    marks: [
      Plot.ruleX([0]),
      Plot.barX(dataForSelectedCountries, {
        y: "Entity",
        x: "Military_expenditure",
        sort: { y: "x", reverse: true },
        fill: "steelblue",
      }),
      Plot.text(dataForSelectedCountries, {
        y: "Entity",
        x: "Military_expenditure",
        dx: 5,
        text: (d) => formatValue(d.Military_expenditure, dataType.toLowerCase()),
        textAnchor: "start"
      }),
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
