---
title: "Ukraine-Russia Conflict"
toc: false
theme: "ocean-floor"
---

<link rel="stylesheet" href="./style/base.css">

## Effect of war between Ukraine and Russia on Military Spending

<div style="width: 100%">
This plot shows the military expenditure of Ukraine and Russia over time, with a focus on the period around the conflict that started in 2022. The plot allows us to see how the military spending of both countries has evolved before, during, and after the conflict.
</div>
</br>
<div style="width: 100%">
We can observe that both countries had a significant increase in military spending around the time of the conflict, with Russia's expenditure being notably higher than Ukraine's.
</div>

<div class="container-base">
  ${ConflictLinePlot({ data: dataForSelectedCountry, startOfConflict: 2022, endOfConflict: undefined })}
</div>


```js
import ConflictLinePlot from "./components/conflictLinePlot.js";
import { filterMilitaryData, filterOnCountries } from "./utils/data.js";
```

```js
const absoluteData = await FileAttachment("data/absolute.csv").csv({
  typed: true,
});
```

```js
const dataForSelectedCountry = filterOnCountries(absoluteData, [
  "Ukraine",
  "Russia",
]);
```
