import * as Plot from "npm:@observablehq/plot";
import { formatValueOnYAxis } from "../utils/formatting.js";

const labelMap = {
  Absolute: "Military expenditure in USD",
  Capita: "Military expenditure per capita in USD",
  Govt: "Military expenditure as percentage of government expenditure",
  Gdp: "Military expenditure as percentage of GDP",
};

export default function BarPlot({ data, dataType }) {
  if (data.length === 0) {
    return "";
  }
  return Plot.plot({
    marginLeft: 100, // adds padding on the left for long country names
    marginRight:75, // adds padding on the right for tooltip
    marginTop: 40, // adds padding on the top for x-axis label
    marks: [
      Plot.ruleX([0]),
      Plot.barX(data, {
        y: "Entity",
        x: "Military_expenditure",
        sort: { y: "x", reverse: true },
        fill: "steelblue",
      }),
      Plot.text(data, {
        y: "Entity",
        x: "Military_expenditure",
        dx: 5,
        text: (d) => formatValueOnYAxis(d.Military_expenditure, dataType.toLowerCase())  + " USD",
        textAnchor: "start"
      }),
    ],
    x: {
      label: labelMap[dataType],
      grid: true,
      axis: "top",
      tickFormat: (d) => formatValueOnYAxis(d, dataType.toLowerCase()),
    },
    y: {
      label: "Country",
    },
  });
}
