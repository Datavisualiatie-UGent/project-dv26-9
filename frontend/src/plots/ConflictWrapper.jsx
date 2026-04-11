import React, { useEffect, useState } from "react";
import { loadAllData } from "../utils/dataloader";
import ConflictLinePlot from './ConflictLinePot';


function ConflictPlotWrapper() {
  const [allData, setAllData] = useState([]);

    useEffect(() => {
        // Load full dataset once
        loadAllData().then(({ data, _ }) => {
            setAllData(data);
        });
    }, []);

  const dataForConflicts = allData.filter(d => d.Entity === "Ukraine" || d.Entity === "Russia");

  return (
    <div>

        // TODO: Add dropdown to select different conflicts (e.g. Afghanistan, Syria, Yemen) and filter data accordingly

        <div className="line-plot-container">
            <ConflictLinePlot data={dataForConflicts} startOfConflict={2022} />
        </div>

    </div>
  );
}

export default ConflictPlotWrapper;