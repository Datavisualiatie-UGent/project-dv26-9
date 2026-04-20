import * as Plot from "npm:@observablehq/plot";

export default function ConflictLinePlot({ data, startOfConflict, endOfConflict }) {
    return Plot.plot({
        //width: 850,
        y: {grid: true},
        color: {legend: true},
        
        marginTop: 50,
        marginRight: 50,
        //marginLeft: 200,
        
        marks: [
            // Line plots
            Plot.lineY(data, {
                x: "Year", 
                y: "Military_expenditure",
                stroke: "Entity"
            }),

            // Dots on the line plots
            Plot.dot(data, {
                x: "Year", 
                y: "Military_expenditure", 
                r: 2,
                stroke: "Entity",
                fill: "Entity"
            }),

            // Interactive vertical line when moving cursor
            Plot.ruleX(data, Plot.pointerX({
                x: "Year", 
                py: "Military_expenditure", 
                stroke: "red", 
                opacity: 0.5
            })),

            // Interactive text that shows current year and expenditures
            Plot.text(data, Plot.pointerX({
                x: "Year",
                frameAnchor: "top-right",
                fontVariant: "tabular-nums",
                fontSize: 12,
                dx: -10,
                text: (d) => {
                    const fmt = new Intl.NumberFormat("en-US");
                    const rows = data.filter(row => row.Year === d.Year)
                
                    return [
                    `Year: ${d.Year}`,
                    "",
                    ...rows.map(d =>
                        `${d.Entity}: ${fmt.format(d.Military_expenditure)} USD`
                    )
                    ].join("\n");
                }
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
                dy: -50,
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
                dy: -50,
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
            label: "Military expenditure in USD (×10⁹)",
            grid: true,
            tickFormat: d => d / (10**9)  // divide by 1000 for labels
        }
    });
}
