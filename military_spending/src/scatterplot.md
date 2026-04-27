---
title: "Scatterplot"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Military Spending against GDP</h1>
</div>


<div class="summary">
  <h2>
  This scatterplot shows the relationship between a country’s GDP and its military expenditure for a selected year. Each point represents a country, positioned horizontally according to its GDP and vertically according to how much it spends on the military.
  </br></br>
  The x-axis uses a logarithmic scale to better display countries with very different economic sizes, while the y-axis shows military expenditure in absolute terms (converted to billions of USD). By selecting a specific year, the plot reflects the situation for that time period, allowing comparison of how economic size relates to defense spending across countries.
  </h2>
</div>


```js
const year = view(
  Inputs.range([1960, 2024], {
    step: 1,
    value: 2024,
    label: "Year",
  }),
);
```


<div class=container-base>
  ${ScatterPlot({ data: dataForSelectedYear })}
</div>




```js
import ScatterPlot from "./components/scatterPlot.js";
import { filterMilitaryData, filterOnYear } from "./utils/data.js"
```

```js
const rawAbsolute = await FileAttachment(
  "data/military-spending-sipri.csv",
).csv({ typed: true });

const militaryData = filterMilitaryData(rawAbsolute)
```

```js
const militaryLookup = new Map(
  militaryData.map(d => [`${d.Code}-${d.Year}`, d])
);
```

```js
const gdpData = await FileAttachment(
  "data/gdp_of_countries.csv",
).csv({ typed: true });
```

```js
const militaryJoinedWithGDP = gdpData
  .map(g => {
    const m = militaryLookup.get(`${g.Code}-${g.Year}`);
    return m
      ? {
          Country: g.Country,
          Code: g.Code,
          Year: g.Year,
          gdp: g.GDP,
          military_expenditure: m.Military_expenditure
        }
      : null;
  })
  .filter(Boolean);
```

```js
const dataForSelectedYear = filterOnYear(militaryJoinedWithGDP, year)
```

---