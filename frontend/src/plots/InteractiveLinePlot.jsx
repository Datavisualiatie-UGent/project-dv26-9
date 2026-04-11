import React, { useEffect, useState } from "react";
import { csvParse, autoType } from "d3-dsv";
import LinePlot from "./LinePlot";
import { loadAllData } from "../utils/dataloader";


function InteractiveLinePlot() {
  const [allData, setAllData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        // Load full dataset once
        loadAllData().then(({ data, countries }) => {
            setAllData(data);
            setCountries(countries);
            setSelectedCountry(countries[0]);
        });
    }, []);

  const dataForSelectedCountry = allData.filter(
    d => d.Entity === selectedCountry
  );

  return (
    <div>

        {/* Dropdown to select country */}
        <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
        >
            {countries.map(country => (
            <option key={country} value={country}>
                {country}
            </option>
            ))}
        </select>

        <div className="line-plot-container">
            <h2>Military Spending of {selectedCountry}</h2>
            <LinePlot data={dataForSelectedCountry} />
        </div>

    </div>
  );
}

export default InteractiveLinePlot;