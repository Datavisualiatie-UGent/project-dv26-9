import * as Plot from "npm:@observablehq/plot";

const formatValueOnTooltip = (value) => {
    return `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 1e9)} billion USD`;
};


export default function ConflictLinePlot({ data, startOfConflict, endOfConflict }) {
    return Plot.plot({
        y: {grid: true},
        marginTop: 100,
        width: 750,
        height: 550,
        symbol: {
            legend: true,
            range: ["circle", "square"]
        },
        
        marks: [
            // Line plots
            Plot.lineY(data, {
                x: "Year", 
                y: "Military_expenditure",
                stroke: "Entity",
            }),

            // Dots on the line plots
            Plot.dot(data, {
                x: "Year", 
                y: "Military_expenditure", 
                r: 2,
                stroke: "Entity",
                fill: "Entity",
                symbol: "Entity"
            }),

            // Interactive vertical line when moving cursor
            Plot.ruleX(data, Plot.pointerX({
                x: "Year", 
                py: "Military_expenditure", 
                stroke: "red", 
                opacity: 0.5
            })),

            Plot.text(data, Plot.pointerX({
                px: "Year", 
                py: "Military_expenditure", 
                dy: -100, 
                frameAnchor: "top-right", 
                fontVariant: "tabular-nums", 
                text: (d) => {
                    const rows = data.filter(row => row.Year === d.Year)
                
                    return [
                        `Year: ${d.Year}`,
                        "",
                        ...rows.map(d =>
                            `${d.Entity}: ${formatValueOnTooltip(d.Military_expenditure)}`
                        )
                    ].join("\n");
                },
                fontSize: 13
            })),

            // Vertical line for start
            startOfConflict != null && Plot.ruleX([startOfConflict], {
                strokeDasharray: "4,2"
            }),
            
            // Label for start
            startOfConflict != null && Plot.text([startOfConflict], {
                x: d => d,
                frameAnchor: "top",
                dx: 0,
                dy: -40,
                text: () => "Start\nof\nconflict",
                textAnchor: "middle",
                fontSize: 12
            }),
            
            // Vertical line for end
            endOfConflict != null && Plot.ruleX([endOfConflict], {
                strokeDasharray: "4,2"
            }),
            
            // Label for end
            endOfConflict != null && Plot.text([endOfConflict], {
                x: d => d,
                frameAnchor: "top",
                dx: 0,
                dy: -40,
                text: () => "End\nof\nconflict",
                textAnchor: "middle",
                fontSize: 12,
            }),
            
        ].filter(Boolean),
        x: {
            label: "Year",
            grid: true,
            tickFormat: d => `${d}`
        },
        y: {
            label: "Military expenditure (billion USD)",
            grid: true,
            tickFormat: d => d / (10**9)  // divide by 1000 for labels
        }
    });
}
