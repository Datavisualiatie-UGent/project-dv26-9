---
title: "Interactive Lineplot"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Military Spending of ${selectedCountry}</h1>
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