---
toc: true
theme: "ocean-floor"
title: Military Spending Analysis
---

<link rel="stylesheet" href="./style/base.css">
<link rel="stylesheet" href="./style/barPlot.css">

<div class="hero">
  <h1>Military Spending Visualizations</h1>
</div>

<div class="introduction">
  Military expenditure is not just a number, it reflects a country’s priorities, economical situation, and geopolitical shifts. While some countries allocate large parts of their economy to defense, others maintain smaller but more stable budgets shaped by different historical and regional contexts. Over time, these patterns reveal how spending responds to wars, alliances, economic growth, and periods of global uncertainty.
</div>
</br>
<div class="introduction">
  These visualizations are designed to make a massive, complex dataset feel approachable at a glance. Military spending numbers are often buried in long reports or static tables, but here they’re turned into something you can actually explore smoothly, interactively, and over time. This lets you compare countries side by side, track changes year by year, and see how military spending has evolved in response to an ever-changing world.
</div>
</br>
<div class="introduction">
  Whether you’re interested in economics, geopolitics, or history, this provides a clear way to explore how countries invest in defense and the influences that shape those decisions.
</div>
</br></br></br>



## Military spending of the World

<div style="width: 100%">
  This line chart aggregates the military expenditure of all countries to show the total global spending on defense over time. This allows us to see the overall trend in military spending worldwide, and how it has evolved across different years.
</div>
</br>
<div style="width: 100%">
  Each point on the line represents the total absolute military expenditure for that year, measured in constant 2024 USD. Hovering over the chart reveals a tooltip with the year and the total global military expenditure for that year.
</div>

<div class="container-base">
  ${LinePlot({ data: linePlotWorldData, dataType: "Absolute" })}
</div>

## Military spending per country

<div style="width: 100%">
  This interactive line chart displays the evolution of military expenditure over time for a selected country. The user can choose which country to view, and the chart updates to show its data across different years.
<div style="width: 100%">
</br>
</div>
  The chart offers several ways to represent military spending. It can be viewed in absolute terms (measured in constant 2024 USD), as a percentage of GDP, as a percentage of total government expenditure,or as spending per capita in USD. The vertical axis adjusts accordingly to reflect the selected metric.
</div>
</br>
<div style="width: 100%">
  Each point on the line corresponds to a specific year, and hovering over the chart reveals detailed values through a tooltip: the year and the exact level of military expenditure in the chosen format.
</div>

<div style="display: flex; align-items: center">

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
    [...new Set(absoluteData.map((d) => d.Entity))], // all unique countries
    { value: "Belgium", class: "country-select" }, // default
  ),
);
```

</div>

<div class="container-base">
  ${LinePlot({ data: linePlotDataForSelectedCountry, dataType: linePlotDataType })}
</div>

## Comparing military spending between countries

<div style="width: 100%">
This interactive bar chart allows users to compare the military spending of multiple countries for aselected year. Countries can be selected dynamically, after which the chart displays their militaryexpenditure side by side, making differences in spending easier to observe and compare.
</div>
</br>
<div style="width: 100%">
Different representations of military expenditure are available through the selector above the chart.Spending can be shown in absolute terms (constant 2024 USD), per capita, as a percentage of totalgovernment spending, or as a percentage of GDP. This makes it possible to compare countries not only byraw spending power, but also relative to population size, economic output, or government priorities.
</div>
</br>
<div style="width: 100%">
Each bar represents one country, and hovering over a bar reveals the exact military expenditure value forthe selected year and metric. By changing the year, users can also explore how comparisons between countries evolve over time.
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

<div class="container-base">
  ${BarPlot({data: barPlotDataForSelectedCountries, dataType: barPlotDataType})}
</div>

## Military spending against GDP

<div style="width: 100%">
This scatter plot shows the relationship between a country’s GDP and its military expenditure for a selected year. Each point represents a country, positioned horizontally according to its GDP and vertically according to how much it spends on the military.
</div>
</br>
<div style="width: 100%">
The x-axis uses a logarithmic scale to better display countries with very different economic sizes, while the y-axis shows military expenditure in absolute terms (in billions of USD). By selecting a specific year, the plot reflects the situation for that time period, allowing comparison of how economic size relates to defense spending across countries.
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

## Top 5 Military spending Countries through time

<div style="width: 100%">
  This plot shows the top 5 countries with the highest military spending for each year. The rank of each country is determined by its military expenditure compared to other countries in that year. The plot allows us to see how the rankings of countries have changed over time.
</div>
</br>
<div style="width: 100%">
  That way we can for example see that the United States has consistently been the country with the highest military spending, while other countries like the UK and Germany have also been in the top 5 for many years.
</div>
</br>
<div style="width: 100%">
  Another interesting observation is that since 2000, China has been rising in the ranks and has become one of the top spenders in recent years.
  While the UK has dropped to the bottom / out of the top 5 in recent years.
</div>
</br>

<div style="width: 100%; margin-bottom: 6rem;">
  ${RankPlot({ data: top5_sorted, selected: "" })}
</div>

## Data source

All military expenditure data used in this analysis comes from:

SIPRI Military Expenditure Database 2026  
https://www.sipri.org/databases/milex

The data is used under SIPRI’s fair use policy for non-commercial research and educational purposes.

```js
import {
  filterMilitaryData,
  filterOnCountries,
  filterOnYear,
  createCountryToCodeMap,
} from "./utils/data.js";

import LinePlot from "./components/linePlot.js";
import BarPlot from "./components/barPlot.js";
import CountrySelector from "./components/countrySelector.js";
import ScatterPlot from "./components/scatterPlot.js";
import RankPlot from "./components/topSpendingRankPlot.js";
```

```js
const absoluteData = await FileAttachment("data/absolute.csv").csv({
  typed: true,
});
```

```js
const capitaData = await FileAttachment("data/capita2.csv").csv({
  typed: true,
});
```

```js
const govtData = await FileAttachment("data/govt2.csv").csv({ typed: true });
```

```js
const gdpData = await FileAttachment("data/gdp2.csv").csv({ typed: true });
```

```js
const absoluteGDPData = await FileAttachment("data/gdp_of_countries.csv").csv({
  typed: true,
});
```

```js
const rawAbsolute = await FileAttachment("data/military-spending-sipri.csv",).csv({ typed: true });

const militaryData = filterMilitaryData(rawAbsolute);
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
const allCountries = [...new Set(absoluteData.map((d) => d.Entity))].sort();
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
const linePlotDataForSelectedCountry = filterOnCountries(
  dataMap[linePlotDataType],
  [linePlotSelectedCountry],
);
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
    Military_expenditure,
  })).sort((a, b) => a.Year - b.Year); // sort by year
})();
```

```js
const scatterPlotMilitaryLookup = new Map(
  absoluteData.map((d) => [`${countryToCode.get(d.Entity)}-${d.Year}`, d]),
);
```

```js
const scatterPlotMilitaryJoinedWithGDP = absoluteGDPData
  .map((g) => {
    const m = scatterPlotMilitaryLookup.get(`${g.Code}-${g.Year}`);
    return m
      ? {
          Country: g.Country,
          Code: g.Code,
          Year: g.Year,
          gdp: g.GDP,
          military_expenditure: m.Military_expenditure,
        }
      : null;
  })
  .filter(Boolean);
```

```js
const scatterPlotDataForSelectedYear = filterOnYear(
  scatterPlotMilitaryJoinedWithGDP,
  scatterPlotYear,
);
```

```js
const top5 = () => {
  const byYear = new Map();

  absoluteData.forEach((d) => {
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
        rank: i + 1,
      })),
  );

  // find best (minimum) rank per country
  const bestRank = new Map();

  for (const d of all) {
    bestRank.set(
      d.Country,
      Math.min(bestRank.get(d.Country) ?? Infinity, d.rank),
    );
  }

  // keep only countries that ever reach top 5
  return all.filter((d) => bestRank.get(d.Country) <= 5);
};
```

```js
const top5_sorted = top5().sort(
  (a, b) => d3.ascending(a.Country, b.Country) || d3.ascending(a.Year, b.Year),
);
```
