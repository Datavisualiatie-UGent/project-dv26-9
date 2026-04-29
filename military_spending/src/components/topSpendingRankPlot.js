import * as Plot from "npm:@observablehq/plot";

export default function RankPlot({ data, selected }) {
    return Plot.plot({
        width: 1300,
        height: 360,
        marginLeft: 75,
        marginTop: 40,
        color: {
            legend: true,
            range: [
                "#6cc5b0", // teal
                "#ff735c", // peach
                "#efb217", // yellow
                "#3ba951", // green
                "#ff8ab7", // pink
                "#a463f2", // purple
                "#97bbf5", // baby blue
                "#9c6b4e", // brown
                "#9498a0", // gray
                "#d62728", // red
                "#4269d0", // blue
                "#e7298a", // dark pink
                "#b2df8a", // light green
                "#c59dda", // light purple
            ]
        },
        style: {
            fontSize: 14
        },
        marks: [
            Plot.line(data, {
                x: "Year",
                y: "rank",
                stroke: "Country",
                curve: "monotone-x",
                opacity: d => !selected || d.Country === selected ? 1 : 0.1,
            }),
            
            Plot.dot(data, {
                x: "Year",
                y: "rank",
                fill: "Country",
                r: 2,
                opacity: d => !selected || d.Country === selected ? 1 : 0.1,
                tip: {
                    format: {
                        Country: true,
                        Year: true,
                        rank: true,
                        opacity: false,
                        x: (d) => `${d}`,
                        y: (d) => d,
                        stroke: false,
                    }
                }
            }),

            Plot.ruleX([Math.min(...data.map(d => d.Year))])
        ],

        y: {
            reverse: true, // rank 1 at top
            label: "rank\n(top 5)",
            ticks: [1, 2, 3, 4, 5],
            tickFormat: String,
            domain: [1,5],
            labelAnchor: "bottom",
        },
        x: {
            label: "Year",
            tickFormat: d => `${d}`,
            axis: "top" 
        },
        });
}
