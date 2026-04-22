---
title: "Barplot"
toc: false
theme: "ocean-floor"
---

<link rel="stylesheet" href="./style/base.css">
<link rel="stylesheet" href="./style/barPlot.css">

```js
const rawAbsolute = await FileAttachment(
  "data/military-spending-sipri.csv",
).csv({ typed: true });
const absoluteData = rawAbsolute.filter(
  (d) => !d.Entity.includes("(SIPRI)") && d.Entity != "World",
);
absoluteData.forEach((d) => {
  d.Military_expenditure = d["Military expenditure"];
  delete d["Military expenditure"];
});
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
const allCountries = [...new Set(absoluteData.map((d) => d.Entity))];
```

```js
const selectedCountriesList = selectedCountries;
const dataForSelectedCountries = dataMap[dataType].filter(
  (d) => selectedCountriesList.includes(d.Entity) && d.Year === year,
);
```

```js
import BarPlot from "./components/barPlot.js";
import CountrySelector from "./components/countrySelector.js";
```

```js

const selectedCountries = view(
  CountrySelector({
    countries: allCountries,
    initial: ["Belgium"],
  }),
);
```

```js
const dataType = view(
  Inputs.select(["Absolute", "Capita", "Govt", "Gdp"], {
    value: "Absolute",
  }),
);
```

```js
const rangeMap = {
  absolute: [1949, 2024],
  capita: [1988, 2024],
  govt: [1988, 2024],
  gdp: [1949, 2024],
};
const year = view(
  Inputs.range(rangeMap[dataType.toLowerCase()], {
    step: 1,
    value: 2024,
    label: "Year",
  }),
);
```

<div class=container-base>
  ${BarPlot({dataForSelectedCountries, dataType})}
</div>

