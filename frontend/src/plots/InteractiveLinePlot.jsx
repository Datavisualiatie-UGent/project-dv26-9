import React, { useEffect, useState } from "react";
import { csvParse, autoType } from "d3-dsv";
import LinePlot from "./LinePlot";


async function loadAllData() {
  const res = await fetch("/military-spending-sipri.csv");
  const text = await res.text();
  const data = csvParse(text, autoType);

  // Rename column for easier access
  data.forEach(d => {
    d.Military_expenditure = d["Military expenditure"];
    delete d["Military expenditure"];
  });

  // Extract unique countries
  const countries = [...new Set(data.map(d => d.Entity))].sort();

  return { data, countries };
}


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