---
toc: false
theme: "ocean-floor"
---

<div class="hero">
  <h1>Military spendings around the world</h1>
</div>
<link rel="stylesheet" href="./style/base.css">

```js
import { spendingsMap } from "./components/spendingsMap.js";
import { ToggleButtons } from "./components/toggleButton.js"
```

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
const capitaData = await FileAttachment("data/capita2.csv").csv({ typed: true });
```

```js
const govtData = await FileAttachment("data/govt2.csv").csv({ typed: true });
```

```js
const gdpData = await FileAttachment("data/gdp2.csv").csv({ typed: true });
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
const countriesGeo = await FileAttachment("data/countries.geo.json").json();
const countries = topojson.feature(
  countriesGeo,
  countriesGeo.objects.countries,
);
```

```js
const rotationState = {
  current: [0, 0, 0],
};
```

```js
const dataType = view(
  Inputs.select(["Absolute", "Capita", "Govt", "Gdp"], {
    value: "Absolute",
  }),
);
```

```js
const mapType = view(
  ToggleButtons({
    options: ["Map", "Globe"],
    initial: "Map",
  })
);
```

```js
const rangeMap = {
  absolute: [1949, 2024],
  capita: [1988, 2025],
  govt: [1988, 2025],
  gdp: [1949, 2025]
};
const year = view(
  Inputs.range(rangeMap[dataType.toLowerCase()], {
    step: 1,
    value: 2024,
    label: "Year",
  }),
);
```

```js
let raf = null;

function scheduleRender() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    render(container.clientWidth);
    raf = null;
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

let container = html`<div></div>`;
function render(width) {
  const chart = spendingsMap(
    countries,
    access_year,
    geoToEntityMap,
    maxExpenditure,
    dataType.toLowerCase(),
    mapType,
    width,
    rotationState.current,
  );

  container.replaceChildren(chart);
}
let dragging = false;
let lastX = 0;
let lastY = 0;

container.addEventListener("mousedown", (e) => {
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

window.addEventListener("mouseup", () => {
  dragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const dx = e.clientX - lastX;
  lastX = e.clientX;
  rotationState.current[0] += dx * 0.5;

  if (mapType === "Globe") {
    const dy = e.clientY - lastY;
    lastY = e.clientY;
    rotationState.current[1] = clamp(
      rotationState.current[1] - dy * 0.3,
      -60,
      60,
    );
  }

  scheduleRender(container.clientWidth);
});
```

```js
mapType; // Reset y rotation when map is changed
if (mapType === "Map") rotationState.current[1] = 0;
```

<div style="
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
">
  <div class="map-container">
    ${
      resize((width) => {
        render(width);
        return container;
      })
    }
  </div>
</div>

```js
const selectedData = dataMap[dataType];
const dataForYear = selectedData.filter((d) => d.Year === year);
const access_year = new Map(
  dataForYear.map(({ Entity, Military_expenditure }) => [
    Entity,
    Military_expenditure,
  ]),
);

const maxExpenditure = Math.max(...Array.from(access_year.values()));
```

```js
const entitiesFile = await FileAttachment("data/entities.txt").text();
const geoFile = await FileAttachment("data/geo_countries.txt").text();
const geoNames = geoFile.split("\n").map((d) => d.trim());
const entityNames = entitiesFile.split("\n").map((d) => d.trim());

const geoToEntityMap = (() => {
  const map = {};

  const len = Math.min(entityNames.length, geoNames.length); // avoid out-of-bounds

  for (let i = 0; i < len; i++) {
    const entity = entityNames[i];
    const geo = geoNames[i];

    map[geo] = entity; // direct 1-to-1 mapping
  }

  return map;
})();
```

---

<style>

.map-container {
  width: 100%;
  max-width: 1200px;"
}

.map-container path {
  cursor: auto;
}

.map-container:hover {
  cursor: grab;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>
