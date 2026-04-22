---
title: "Scatterplot"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Military Spending against GDP</h1>
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