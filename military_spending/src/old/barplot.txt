---
title: "Barplot"
toc: false
theme: "ocean-floor"
---

<link rel="stylesheet" href="./style/base.css">
<link rel="stylesheet" href="./style/barPlot.css">


```js
const dataMap = {
  Absolute: await absoluteData,
  Capita: capitaData,
  Govt: govtData,
  Gdp: gdpData,
};
```

```js
const absoluteData = await FileAttachment("data/absolute.csv").csv({ typed: true });
```

```js
const capitaData = await FileAttachment("data/capita2.csv").csv({ typed: true });
```

```js
const govtData = await FileAttachment("data/govt2.csv").csv({ typed: true });
```

```js
const gdpData = await FileAttachment("data/gdp2.csv").csv({ typed: true });
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
  absolute: [1949, 2025],
  capita: [1988, 2025],
  govt: [1988, 2025],
  gdp: [1949, 2025],
};
const year = view(
  Inputs.range(rangeMap[dataType.toLowerCase()], {
    step: 1,
    value: 2025,
    label: "Year",
  }),
);
```

<div class=container-base>
  ${BarPlot({dataForSelectedCountries, dataType})}
</div>

