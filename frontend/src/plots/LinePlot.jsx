import { useEffect, useRef, useState } from 'react'
import '../style/LinePlot.css'
import * as Plot from "@observablehq/plot";


function LinePlot({ data }) {
    const ref = useRef();
    const fmt = new Intl.NumberFormat("en-US");

    // Render line plot when data changes
    useEffect(() => {
        if (!data || !data.length) return;

        // Make line plot using Observable PLot
        const linePlot = Plot.plot({
            y: {axis: "right", grid: true, nice: true},
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
                    dy: -17, 
                    frameAnchor: "top-right", 
                    fontVariant: "tabular-nums", 
                    text: (d) => [`Year: ${d.Year}`, `Military expenditure: ${fmt.format(d.Military_expenditure)} USD`].join("   "),
                    fontSize: 13
                })),

            ],
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

