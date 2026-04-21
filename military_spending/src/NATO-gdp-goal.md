---
title: "NATO gdp goal"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Progress of countries to reach the NATO gdp goal</h1>
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
  ${GDPGoalPlot({ data: natoInPercent })}
</div>




```js
import GDPGoalPlot from "./components/gdpGoalPlot.js";
import { filterMilitaryData, filterOnYear } from "./utils/data.js"
```

```js
const percentOfGDPData = await FileAttachment(
  "data/military-spending-sipri-gdp-long.csv",
).csv({ typed: true });
```


```js
const countriesOfNATO = [
    "Albania",
    "Belgium",
    "Bulgaria",
    "Canada",
    "Croatia",
    "Czechia",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Turkey",
    "United Kingdom",
    "United States"
];

const natoInPercent = percentOfGDPData
    .filter(d => countriesOfNATO.includes(d.Country) && d.Year === year)
    .map(d => ({
    country: d.Country,
    year: +d.Year,
    percentage_of_military_expenditure: +d.gdp,
    })).sort(
    (a, b) =>
        d3.descending(
        a.percentage_of_military_expenditure,
        b.percentage_of_military_expenditure
        )
    );
```

---