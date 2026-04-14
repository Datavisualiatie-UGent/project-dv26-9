---
name: "Conflicts"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Effect of conflicts on Military Spending</h1>
</div>

<div class=container-base>
  ${ConflictLinePlot({ data: dataForSelectedCountry, startOfConflict: 2020, endOfConflict: 2023 })}
</div>


```js
import ConflictLinePlot from "./components/conflictLinePlot.js";
import { filterMilitaryData, filterOnCountries } from "./utils/data.js"
```

```js
const countriesOfConflict = ["Ukraine", "Russia"]
```

```js
const rawAbsolute = await FileAttachment(
  "data/military-spending-sipri.csv",
).csv({ typed: true });

const absoluteData = filterMilitaryData(rawAbsolute)
```


```js
const dataForSelectedCountry = filterOnCountries(absoluteData, countriesOfConflict)
```