---
name: "Interactive Lineplot"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Military Spending of ${selectedCountry}</h1>
</div>

```js
const selectedCountry = view(
    Inputs.select(
        [...new Set(absoluteData.map(d => d.Entity))],  // all unique countries
        {value: "Belgium", class: "country-select"}  // default
    )
);
```

<div class=container-base>
  ${LinePlot({ data: dataForSelectedCountry })}
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
const dataForSelectedCountry = filterOnCountries(absoluteData, [selectedCountry])
```


---