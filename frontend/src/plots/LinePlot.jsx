import { useEffect, useRef, useState } from 'react'
import '../style/LinePlot.css'
import * as Plot from "@observablehq/plot";
import { csvParse, autoType } from "d3-dsv";


function LinePlot({ data }) {
    const ref = useRef();

    // Render line plot when data changes
    useEffect(() => {
        if (!data || !data.length) return;

        // Make line plot using Observable PLot
        const linePlot = Plot.plot({
            y: {axis: "right", grid: true, nice: true},
            marks: [
                Plot.lineY(data, {x: "Year", y: "Military_expenditure"}),
                Plot.dot(data, {x: "Year", y: "Military_expenditure", r: 2}),
                
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
                
                Plot.text(data, Plot.pointerX({
                px: "Year", 
                py: "Military_expenditure", 
                dy: -17, 
                frameAnchor: "top-right", 
                fontVariant: "tabular-nums", 
                text: (d) => [`Year: ${d.Year}`, `Military expenditure: ${d["Military_expenditure"]} USD`].join("   "),
                fontSize: 13
                })),

            ],
            x: {
                label: "Year",
                grid: true
            },
            y: {
                label: "Military expenditure (×10⁹)",
                grid: true,
                tickFormat: d => d / (10**9)  // divide by 1000 for labels
            }
        });

        ref.current.innerHTML = ""; 

        // Append to container
        ref.current.appendChild(linePlot);

        // Cleanup when component unmounts or data changes
        return () => linePlot.remove();
    }, [data]);


    return <div>
        <div ref={ref} className="line-plot"></div>
    </div>;
}

export default LinePlot

