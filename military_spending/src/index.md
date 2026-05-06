---
toc: false
theme: "ocean-floor"
---

<link rel="stylesheet" href="./style/base.css">
<link rel="stylesheet" href="./style/barPlot.css">

<div class="hero">
  <h1>Military Spending of the World</h1>
</div>

<div class="summary">
  <h2>
  This line chart aggregates the military expenditure of all countries to show the total global spending on defense over time. 
  This allows us to see the overall trend in military spending worldwide, and how it has evolved across different years.
  </br></br>
  Each point on the line represents the total absolute military expenditure for that year, measured in constant 2024 USD.
  Hovering over the chart reveals a tooltip with the year and the total global military expenditure for that year, providing insights into how global defense spending has changed over time.
  </h2>
</div>

<div class="container-base">
  ${LinePlot({ data: linePlotWorldData, dataType: "Absolute" })}
</div>


---

<div class="hero">
  <h1>Military Spending of ${linePlotSelectedCountry}</h1>
</div>

<div class="summary">
  <h2>
  This interactive line chart displays the evolution of military expenditure over time for a selected country. The user can choose which country to view, and the chart updates to show its data across different years.
  </br></br>
  The chart offers several ways to represent military spending. It can be viewed in absolute terms (measured in constant 2024 USD), as a percentage of GDP, as a percentage of total government expenditure, or as spending per capita in USD. The vertical axis adjusts accordingly to reflect the selected metric.
  </br></br>
  Each point on the line corresponds to a specific year, and hovering over the chart reveals detailed values through a tooltip: the year and the exact level of military expenditure in the chosen format. 
  </h2>
</div>


```js
const linePlotDataType = view(
  Inputs.select(["Absolute", "Capita", "Govt", "Gdp"], {
    value: "Absolute",
  }),
);
```


```js
const linePlotSelectedCountry = view(
    Inputs.select(
        [...new Set(absoluteData.map(d => d.Entity))],  // all unique countries
        {value: "Belgium", class: "country-select"}  // default
    )
);
```

<div class=container-base>
  ${LinePlot({ data: linePlotDataForSelectedCountry, dataType: linePlotDataType })}
</div>




---

<div class="hero">
  <h1>Compare Military Spending between countries</h1>
</div>

<div class="summary">
  <h2>
  TODO
  </h2>
</div>


```js
const barPlotSelectedCountries = view(
  CountrySelector({
    countries: allCountries,
    initial: ["Belgium"],
  }),
);
```

```js
const barPlotDataType = view(
  Inputs.select(["Absolute", "Capita", "Govt", "Gdp"], {
    value: "Absolute",
  }),
);
```

```js
const barPlotYear = view(
  Inputs.range(rangeMap[barPlotDataType.toLowerCase()], {
    step: 1,
    value: 2025,
    label: "Year",
  }),
);
```

<div class=container-base>
  ${BarPlot({data: barPlotDataForSelectedCountries, dataType: barPlotDataType})}
</div>




---


<div class="hero">
  <h1>Military Spending against GDP</h1>
</div>

<div class="summary">
  <h2>
  This scatter plot shows the relationship between a country’s GDP and its military expenditure for a selected year. Each point represents a country, positioned horizontally according to its GDP and vertically according to how much it spends on the military.
  </br></br>
  The x-axis uses a logarithmic scale to better display countries with very different economic sizes, while the y-axis shows military expenditure in absolute terms (in billions of USD). By selecting a specific year, the plot reflects the situation for that time period, allowing comparison of how economic size relates to defense spending across countries.
  </h2>
</div>


```js
const scatterPlotYear = view(
  Inputs.range([1960, 2024], {
    step: 1,
    value: 2024,
    label: "Year",
  }),
);
```

<div class=container-base>
  ${ScatterPlot({ data: scatterPlotDataForSelectedYear })}
</div>




---

<div class="hero">
  <h1>Top 5 Military Spending Countries through time</h1>
</div>

<div class="summary">
  <h2>
  This plot shows the top 5 countries with the highest military spending for each year. The rank of each country is determined by its military expenditure compared to other countries in that year. The plot allows us to see how the rankings of countries have changed over time.
  </br></br>
  That way we can for example see that the United States has consistently been the country with the highest military spending, while other countries like the UK and Germany have also been in the top 5 for many years.
  </br></br>
  Another interesting observation is that since 2000, China has been rising in the ranks and has become one of the top spenders in recent years.
  While the UK has dropped to the bottom / out of the top 5 in recent years.
  </h2>
</div>

<div>
  ${RankPlot({ data: top5_sorted, selected: "" })}
</div>




```js
import { filterMilitaryData, filterOnCountries, filterOnYear, createCountryToCodeMap } from "./utils/data.js"

import LinePlot from "./components/linePlot.js";
import BarPlot from "./components/barPlot.js";
import CountrySelector from "./components/countrySelector.js";
import ScatterPlot from "./components/scatterPlot.js";
import RankPlot from "./components/topSpendingRankPlot.js";
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
const absoluteGDPData = await FileAttachment("data/gdp_of_countries.csv").csv({ typed: true });
```

```js
const rawAbsolute = await FileAttachment("data/military-spending-sipri.csv").csv({ typed: true });

const militaryData = filterMilitaryData(rawAbsolute)
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
const rangeMap = {
  absolute: [1949, 2025],
  capita: [1988, 2025],
  govt: [1988, 2025],
  gdp: [1949, 2025],
};
```

```js
const allCountries = [...new Set(absoluteData.map((d) => d.Entity))];
```

```js
const countryToCode = createCountryToCodeMap(militaryData);
```


```js
const barPlotDataForSelectedCountries = dataMap[barPlotDataType].filter(
  (d) => barPlotSelectedCountries.includes(d.Entity) && d.Year === barPlotYear,
);
```


```js
const linePlotDataForSelectedCountry = filterOnCountries(dataMap[linePlotDataType], [linePlotSelectedCountry])
```

```js
const linePlotWorldData = (() => {
  const data = absoluteData;
  const byYear = new Map();

  for (const d of data) {
    const year = d.Year;
    const value = d.Military_expenditure; // adjust if needed

    byYear.set(year, (byYear.get(year) || 0) + value);
  }

  return Array.from(byYear, ([Year, Military_expenditure]) => ({
    Entity: "World",
    Year,
    Military_expenditure
  }))
  .sort((a, b) => a.Year - b.Year); // sort by year
})();
```



```js
const scatterPlotMilitaryLookup = new Map(
  absoluteData.map(d => [`${countryToCode.get(d.Entity)}-${d.Year}`, d])
);
```

```js
const scatterPlotMilitaryJoinedWithGDP = absoluteGDPData
  .map(g => {
    const m = scatterPlotMilitaryLookup.get(`${g.Code}-${g.Year}`);
    return m
      ? {
          Country: g.Country,
          Code: g.Code,
          Year: g.Year,
          gdp: g.GDP,
          military_expenditure: m.Military_expenditure
        }
      : null;
  })
  .filter(Boolean);
```

```js
const scatterPlotDataForSelectedYear = filterOnYear(scatterPlotMilitaryJoinedWithGDP, scatterPlotYear)
```

```js
const top5 = () => {
  const byYear = new Map();

  absoluteData.forEach(d => {
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