import * as Plot from "npm:@observablehq/plot";

export default function GDPGoalPlot({ data }) {
    return Plot.plot({
        marginLeft: 100,
        marginRight: 25,
        marginTop: 40,
        height: 600,
        x: {
            label: "% of gdp spent on military",
            domain: [0, 5]
        },
        y: {
            grid: true,
            label: null,
            domain: data.map(d => d.country)
        },
        marks: [
            // optional reference line at 0 (not very useful on log scale, but kept for structure)
            Plot.ruleX([0]),
            
            Plot.dot(data, {
            y: "country",
            x: "percentage_of_military_expenditure",
            fill: "steelblue",
            r: 3,
            tip: true,
            }),
            
            Plot.ruleX([5], {
            stroke: "red",
            strokeWidth: 2
            }),
            
            Plot.text([5], {
            x: d => d,
            dy: -35,                 // Shifts the text 10px up from the frame top
            frameAnchor: "top",      // Anchors the text to the top of the chart
            text: ["Goal to\nreach by\n2035"], 
            fill: "red",
            fontWeight: "bold"
            })
            
        ]
        });
}
