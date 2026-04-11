import { csvParse, autoType } from "d3-dsv";

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

export { loadAllData };