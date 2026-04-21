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

function filterOnYear(data, year) {
    return data.filter((d) => d.Year === year);
}

export { filterMilitaryData, filterOnCountries, filterOnYear };