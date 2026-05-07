import * as Plot from "npm:@observablehq/plot";
import { formatValueOnTooltip, formatValueOnYAxis, formatValueOnYLabel } from "../utils/formatting.js";


export default function LinePlot({ data, dataType }) {
    const fmt = new Intl.NumberFormat("en-US");

    const yLabel = formatValueOnYLabel(dataType.toLowerCase());

    // Render line plot when data changes
    return Plot.plot({
        y: {axis: "right", grid: true, nice: true},
        marginTop: 35,
        marks: [
            Plot.lineY(data, {
                x: "Year", 
                y: "Military_expenditure",
                stroke: "Entity"
            }),
            
            Plot.dot(data, {
                x: "Year", 
                y: "Military_expenditure", 
                r: 2,
                stroke: "Entity",
                fill: "Entity"
            }),
            
            Plot.crosshair(data, {
                x: "Year", 
                y: "Military_expenditure", 
                color: "red", 
                opacity: 0.5,
                textFillOpacity: 0,
                textStrokeOpacity: 0
            }),
            
            Plot.dot(data, Plot.pointer({
                x: "Year", 
                y: "Military_expenditure", 
                r: 5,
                stroke: "red", 
                opacity: 0.5
            })),
            
            Plot.text(data, Plot.pointer({
                px: "Year", 
                py: "Military_expenditure", 
                dy: -30, 
                frameAnchor: "top-right", 
                fontVariant: "tabular-nums", 
                text: (d) => [`Year: ${d.Year}`, `Military expenditure: ${formatValueOnTooltip(d.Military_expenditure, dataType.toLowerCase())}`].join("\n"),
                fontSize: 13
            })),

        ],
        x: {
            label: "Year",
            grid: true,
            tickFormat: d => `${d}`
        },
        y: {
            label: yLabel,
            grid: true,
            tickFormat: d => formatValueOnYAxis(d, dataType.toLowerCase())  // divide by 1000 for labels
        }
    });
}
