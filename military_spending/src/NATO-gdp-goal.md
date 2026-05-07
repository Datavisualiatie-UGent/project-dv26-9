---
title: "NATO defense spending vs 5% goal"
toc: false
theme: "ocean-floor"
---

<link rel="stylesheet" href="./style/base.css">

# Progress of countries to reach the NATO gdp goal
<div style="width: 100%">
This plot compares how much NATO member countries currently spend on military purposes as a percentage of their GDP in 2025, alongside a common target set for the future. Each dot represents a country, positioned along the horizontal axis according to the percentage of its GDP devoted to defense.
</div>
</br>
<div style="width: 100%">
The vertical red line marks a common target: by 2035, all NATO countries are expected to reach a military spending level equivalent to 5% of their GDP.
</div>
</br>
<div style="width: 100%">
All countries are still to the left of this line and thus currently (in 2025, since this in the most recently available data) below the target.
This plot makes it easy to see which countries are already close to this target, and which still need to increase their military spending by a lot to meet the objective.
</div>

${GDPGoalPlot({ data: natoInPercent })}

```js
import GDPGoalPlot from "./components/gdpGoalPlot.js";
import { filterMilitaryData, filterOnYear } from "./utils/data.js";
```

```js
const percentOfGDPData = await FileAttachment("data/gdp2.csv").csv({
  typed: true,
});
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
  "United States",
];

const natoInPercent = percentOfGDPData
  .filter((d) => countriesOfNATO.includes(d.Entity) && d.Year === 2025)
  .map((d) => ({
    country: d.Entity,
    percentage_of_military_expenditure: +d.Military_expenditure,
  }))
  .sort((a, b) =>
    d3.descending(
      a.percentage_of_military_expenditure,
      b.percentage_of_military_expenditure,
    ),
  );
```

---
