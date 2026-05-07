function filterMilitaryData(rawAbsolute) {
  const absoluteData = rawAbsolute.filter(
    (d) => !d.Entity.includes("(SIPRI)") && d.Entity != "World",
  );

  absoluteData.forEach((d) => {
    d.Military_expenditure = d["Military expenditure"];
    delete d["Military expenditure"];
  });

  return absoluteData;
}

function filterOnCountries(data, countries) {
  return data.filter((d) => countries.includes(d.Entity));
}

function createCountryToCodeMap(data) {
  const m = new Map();
  data.forEach((d) => {
    if (!m.has(d.Entity)) {
      m.set(d.Entity, d.Code);
    }
  });
  return m
}

function filterOnYear(data, year) {
  return data.filter((d) => d.Year === year);
}

export {
  filterMilitaryData,
  filterOnCountries,
  filterOnYear,
  createCountryToCodeMap,
};
