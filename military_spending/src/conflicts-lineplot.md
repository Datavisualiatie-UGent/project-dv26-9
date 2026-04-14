---
name: "Conflicts"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Effect of conflicts on Military Spending</h1>
</div>

```js
const selectedConflict = view(
  Inputs.select(
    conflicts,
    {
      format: d => d.name,
      value: conflicts[0].name
    }
  )
);
```

<div class=container-base>
  ${ConflictLinePlot({ data: dataForSelectedCountry, startOfConflict: selectedConflict.start, endOfConflict: selectedConflict.end })}
</div>


```js
import ConflictLinePlot from "./components/conflictLinePlot.js";
import { filterMilitaryData, filterOnCountries } from "./utils/data.js"
```

```js
const countriesOfConflict = selectedConflict.countries;
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


```js
const conflicts = [
  {
    name: "Ukrain vs Russia",
    countries: ["Ukraine", "Russia"],
    start: 2022,
    end: undefined // ongoing
  },
  {
    name: "Iran-Iraq war",
    countries: ["Iran", "Iraq"],
    start: 1980,
    end: 1988
  },
  {
    name: "Yom Kippur War",
    countries: ["Israel", "Egypt"],
    start: 1967,
    end: undefined // TODO: look up
  },
  {
    name: "Gulf war",
    countries: ["Iraq", "Kuwait"],
    start: 1990,
    end: 1991
  }
];
```

```js
function getConflictByCountries(data, countries) {
  return data.filter(d => countries.includes(d.country));
}
```