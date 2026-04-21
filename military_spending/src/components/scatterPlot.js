import * as Plot from "npm:@observablehq/plot";

export default function ScatterPlot({ data }) {
    return Plot.plot({
        width: 900,
        height: 600,
        grid: true,
        marks: [
            Plot.dot(data, {
            x: "gdp",
            y: "military_expenditure",
            fill: "steelblue",
            opacity: 0.85,
            tip: {
                format: {
                    y: d => `${(d / 1e9).toFixed(2)}`,
                    x: d => `${(d / 1e9).toFixed(2)}`,
                    Country: true 
                }
            },
            channels: {Country: "Country"},
            })
        ],
        x: {
            label: "GDP (billion USD)",
            type: "log",
            tickFormat: d => d / (10**9)
        },
        y: {
            label: "Military expenditure (billion USD)",
            grid: true,
            tickFormat: d => d / (10**9)  // divide by 1000 for labels
        }
    });
}
