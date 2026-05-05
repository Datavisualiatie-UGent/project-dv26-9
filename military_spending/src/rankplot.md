---
title: "Rank Plot"
toc: false
theme: "ocean-floor"
---


<link rel="stylesheet" href="./style/base.css">

<div class="hero">
  <h1>Top 5 Military Spending Countries through time</h1>
</div>


<div class="summary">
  <h2>
  This plot shows the top 5 countries with the highest military spending for each year. The rank of each country is determined by its military expenditure compared to other countries in that year. The plot allows us to see how the rankings of countries have changed over time.
  </br></br>
  That way you can for example see that the United States has consistently been the country with the highest military spending, while other countries like the UK and Germany have also been in the top 5 for many years.
  </br></br>
  Another interesting observation is that since 2000, China has been rising in the ranks and has become one of the top spenders in recent years.
  While the UK has dropped to the bottom / out of the top 5 in recent years.
  </h2>
</div>


<div>
  ${RankPlot({ data: top5_sorted, selected: "" })}
</div>




```js
import RankPlot from "./components/topSpendingRankPlot.js";
import { filterMilitaryData, filterOnYear } from "./utils/data.js"
```

```js
const rawAbsolute = await FileAttachment(
  "data/military-spending-sipri.csv",
).csv({ typed: true });

const militaryData = filterMilitaryData(rawAbsolute)
```

```js

const top5 = () => {
  const byYear = new Map();

  militaryData.forEach(d => {
    (byYear.get(d.Year) ?? byYear.set(d.Year, []).get(d.Year)).push(d);
  });

  const all = [...byYear].flatMap(([year, values]) =>
    values
      .sort((a, b) => b.Military_expenditure - a.Military_expenditure)
      .slice(0, 6)
      .map((d, i) => ({
        Country: d.Entity,
        Year: year,
        value: d.Military_expenditure,
        rank: i + 1
      }))
  );

  // find best (minimum) rank per country
  const bestRank = new Map();

  for (const d of all) {
    bestRank.set(d.Country, Math.min(bestRank.get(d.Country) ?? Infinity, d.rank));
  }
  
  // keep only countries that ever reach top 5
  return all.filter(d => bestRank.get(d.Country) <= 5);
}
```

```js
const top5_sorted = top5().sort((a, b) =>
  d3.ascending(a.Country, b.Country) ||
  d3.ascending(a.Year, b.Year)
);
```


---