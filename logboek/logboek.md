# Logboek Datavisualisatie groep 9: militaire uitgaven
Maarten Lambrecht, Nyah Van Wayenberge


# 1: initiële ideeën voor visualisatie
- **line chart** die de evolutie van militaire uitgaven per land toont door de jaren heen
![line chart](/logboek/images/line_chart.png)

- **bar chart** die de militaire uitgaven van verschillende landen in een bepaald jaar vergelijkt
![bar chart](/logboek/images/bar_chart_old.png)

- **wereldkaart** die via kleurschaal aanduidt hoeveel elk land uitgeeft aan militaire uitgaven in een bepaald jaar
![world map](/logboek/images/world_map.png)
![globe map](/logboek/images/globe.png)

- **verhalende visualisatie (storytelling)**: Stacked bar charts die de militaire uitgaven van de NAVO-landen vergelijkt met die van Rusland. 1 plot zonder VS en 1 plot met VS, om te laten zien hoe de NAVO-landen afhangen van de VS in termen van militaire uitgaven en bescherming in geval van een conflict met Rusland. 


Al deze visualisaties zouden interactief zijn, zodat gebruikers kunnen filteren op specifieke landen of jaren om een dieper inzicht te krijgen in de data en de trends die zich voordoen.


# 2: initiele exploratie van de data
Na het bekijken van de data, hebben we besloten dat de visualisatie over NAVO vs Rusland niet nuttig is. 
De NAVO-landen zonder VS hebben al meer militaire uitgaven dan Rusland, dus het vergelijken van de totale uitgaven van de NAVO zonder VS en met VS ten opzichte van Rusland zou niet veel inzicht geven.

![NAVO storytelling](/logboek/images/NAVO_story.png)


# 3: extra data toegevoegd
- data over militaire uitgaven **per capita**
- data over militaire uitgaven als percentage van het **GDP**
- data over militaire uitgaven als percentage van de totale **overheidsuitgaven**

In de line chart, bar chart & wereldkaart kan de gebruiker nu ook filteren op deze extra data, om andere inzichten te krijgen over hoe de militaire uitgaven zich verhouden tot de bevolking, economie en totale uitgaven van elk land.

![data types](/logboek/images/data_type_selector.png)


# 4: nieuw idee voor de verhalende visualisatie
Plot de uitgaven van 2 landen die in conflict zijn met elkaar: Rusland vs Oekraïne op een line chart, met een verticale lijn die aanduidt wanneer de oorlog begon.
Op deze manier kunnen we zien of conflicten een invloed hebben op de militaire uitgaven van elk land.

![conflict storytelling](/logboek/images/conflicts.png)

- Het initiële idee was om dit te doen voor meerdere conflicten, maar data was niet beschikbaar of volledig voor alle landen en conflicten, dus we hebben besloten om ons te richten op Rusland vs Oekraïne vanwege de recente aard van het conflict en de beschikbaarheid van data.


# 5: extra GDP-dataset toegevoegd + extra plot toegevoegd
Een GDP-dataset, die het totale GDP van elk land per jaar toont, toegevoegd. 
Hierdoor kunnen we ook een **scatter plot** maken die de absolute militaire uitgaven van elk land toont in relatie tot hun GDP.
Dit geeft een beeld van hoe groot de militaire uitgaven zijn in verhouding tot de totale economie van elk land.

![scatter plot](/logboek/images/scatter_plot.png)


# 6: extra visualisaties toegevoegd
- visualisatie die het huidige (2024) procent van het GDP dat elke lidstaat van de NAVO uitgeeft aan militaire uitgaven toont, ten opzichte van het NAVO doel van 5% tegen 2035
![navo GDP](/logboek/images/navo_gdp.png)

- visualisatie die de top 5 landen toont met de hoogste militaire uitgaven door de jaren heen
![top 5](/logboek/images/rank_plot.png)

# 7: tekstuele uitleg toegevoegd bij visualisaties


# Rolverdeling
Maarten: 
- bar chart
- wereldkaart
- extra data (GDP, per capita, government spending)

Nyah: 
- line chart
- conflict linechart
- GDP-dataset
- scatter plot
- NAVO GDP plot
- top 5 plot