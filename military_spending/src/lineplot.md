---
title: "Line plot"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Military Spending of the World</h1>
</div>

<div class="summary">
  <h2>
  This line chart aggregates the military expenditure of all countries to show the total global spending on defense over time. 
  This allows us to see the overall trend in military spending worldwide, and how it has evolved across different years.
  </br></br>
  Each point on the line represents the total absolute military expenditure for that year, measured in billions of USD.
  Hovering over the chart reveals a tooltip with the year and the total global military expenditure for that year, providing insights into how global defense spending has changed over time.
  </h2>
</div>

<div class="container-base">
  ${LinePlot({ data: worldData, dataType: "Absolute" })}
</div>


---

<div class="hero">
  <h1>Military Spending of ${selectedCountry}</h1>
</div>

<div class="summary">
  <h2>
  This interactive line chart displays the evolution of military expenditure over time for a selected country. The user can choose which country to view, and the chart updates to show its data across different years.
  </br></br>
  The chart offers several ways to represent military spending. It can be viewed in absolute terms (measured in billions of USD), as a percentage of GDP, as a percentage of total government expenditure, or as spending per capita in USD. The vertical axis adjusts accordingly to reflect the selected metric.
  </br></br>
  Each point on the line corresponds to a specific year, and hovering over the chart reveals detailed values through a tooltip: the year and the exact level of military expenditure in the chosen format. 
  </h2>
</div>


```js
const dataType = view(
  Inputs.select(["Absolute", "Capita", "Govt", "Gdp"], {
    value: "Absolute",
  }),
);
```


```js
const selectedCountry = view(
    Inputs.select(
        [...new Set(absoluteData.map(d => d.Entity))],  // all unique countries
        {value: "Belgium", class: "country-select"}  // default
    )
);
```

<div class=container-base>
  ${LinePlot({ data: dataForSelectedCountry, dataType: dataType })}
</div>


```js
import LinePlot from "./components/linePlot.js";
import { filterMilitaryData, filterOnCountries } from "./utils/data.js"
```

```js
const rawAbsolute = await FileAttachment(
  "data/military-spending-sipri.csv",
).csv({ typed: true });

const absoluteData = filterMilitaryData(rawAbsolute)
```


```js
const dataMap = {
  Absolute: await absoluteData,
  Capita: capitaData,
  Govt: govtData,
  Gdp: gdpData,
};
```

```js
const capitaData = await FileAttachment("data/capita.csv").csv({ typed: true });
```

```js
const govtData = await FileAttachment("data/govt.csv").csv({ typed: true });
```

```js
const gdpData = await FileAttachment("data/gdp.csv").csv({ typed: true });
```


```js
const dataForSelectedCountry = filterOnCountries(dataMap[dataType], [selectedCountry])
```


```js
const worldData = (() => {
  const data = absoluteData;
  const byYear = new Map();

  for (const d of data) {
    const year = d.Year;
    const value = d.Military_expenditure; // adjust if needed

    byYear.set(year, (byYear.get(year) || 0) + value);
  }

  return Array.from(byYear, ([Year, Military_expenditure]) => ({
    Entity: "World",
    Year,
    Military_expenditure
  }))
  .sort((a, b) => a.Year - b.Year); // sort by year
})();

console.log(worldData);
```


---