import pandas as pd

# Load the file (replace with your filename)
df = pd.read_csv("/Users/nyah/Developer/SEM2/Datavisualisatie/project-dv26-9/military_spending/src/data/gdp_of_countries.csv")

# Keep only relevant columns
df = df[["Country Name", "Country Code"] + 
        [col for col in df.columns if col.isdigit()]]

# Convert from wide to long format
df_long = df.melt(
    id_vars=["Country Name", "Country Code"],
    var_name="Year",
    value_name="GDP"
)

# Drop missing GDP values
df_long = df_long.dropna(subset=["GDP"])

# Rename columns
df_long = df_long.rename(columns={
    "Country Name": "Country",
    "Country Code": "Code"
})

# Optional: sort
df_long = df_long.sort_values(["Country", "Year"])

# Save to CSV
df_long.to_csv("/Users/nyah/Developer/SEM2/Datavisualisatie/project-dv26-9/military_spending/src/data/gdp_of_countries_long.csv", index=False)

print("Done! Saved as gdp_of_countries_long.csv")