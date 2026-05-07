# datavisualisatie-project-groep9

Deze repository bevat visualisaties gebaseerd op de dataset over militaire uitgaven van Our World in Data.
De data is afkomstig uit de SIPRI Military Expenditure Database en toont de jaarlijkse militaire uitgaven per land van 1949 tot en met 2025, uitgedrukt in US dollars.

## Data

De dataset is beschikbaar als zip-bestand in de `/military_spending/src/data` folder.
Bij het uitpakken van dit bestand, wordt de map `military-spending-sipri` aangemaakt met daarin het csv-bestand met de data.
De data per capita `military-spending-sipri-capita.csv`, als percentage van het GDP `military-spending-sipri-gdp.csv` en als percentage van de totale overheidsuitgaven `military-spending-sipri-govt.csv` zijn ook beschikbaar in deze map.

Voor de absolute GDP data, hebben we een dataset van de World Bank gebruikt, die het totale GDP van elk land per jaar toont. Deze dataset is ook beschikbaar in de `/military_spending/src/data` folder als `gdp_of_countries.csv`.

## Databron

Stockholm International Peace Research Institute (2025) – with minor processing by Our World in Data. “Military spending” [dataset]. Stockholm International Peace Research Institute, “SIPRI Military Expenditure Database” [original data]. Retrieved March 9, 2026 from https://archive.ourworldindata.org/20260304-094028/grapher/military-spending-sipri.html (archived on March 4, 2026).

Dataset for GDP of all countries: World Bank
https://data.worldbank.org/indicator/NY.GDP.MKTP.CD

**Originele bron:**
SIPRI Military Expenditure Database 2026  
https://www.sipri.org/databases/milex

## website

Our website is built with Observable plot framework and managed using npm.

### install dependencies

To install all needed dependencies, run:

```
npm install
```

### run

To run the website while developping, run:

```
npm run dev
```
