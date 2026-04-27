---
title: "Lineplot"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Military Spending of ${selectedCountry}</h1>
</div>

<div class="summary">
  <h2>
  This interactive line chart displays the evolution of military expenditure over time for a selected country. The user can choose which country to view, and the chart updates to show its data across different years.
  </br></br>
  The chart offers several ways to represent military spending. It can be viewed in absolute terms (measured in billions of USD), as a percentage of GDP, as a percentage of total government expenditure, or as spending per capita in USD. The vertical axis adjusts accordingly to reflect the selected metric.
  </br></br>
  Each point on the line corresponds to a specific year, and hovering over the chart reveals detailed values through a tooltip, including the year and the exact level of military expenditure in the chosen format. 
  </br></br>
  This allows users to easily track trends, identify periods of increase or decrease in spending.
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


---