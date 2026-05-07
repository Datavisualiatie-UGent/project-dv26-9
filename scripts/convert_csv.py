import pandas as pd

# Load the dataset (adjust filename as needed)
# sep=';' because your file uses semicolons
df = pd.read_csv("/Users/nyah/Developer/SEM2/Datavisualisatie/project-dv26-9/military_spending/src/data/military-spending-sipri-gdp.csv", sep=";")

# Rename first column to Country (in case it's not already clean)
df = df.rename(columns={df.columns[0]: "Country"})

# Remove Notes column if it exists (optional)
if "Notes" in df.columns:
    df = df.drop(columns=["Notes"])

# Melt from wide to long format
df_long = df.melt(
    id_vars=["Country"],
    var_name="Year",
    value_name="gdp"
)

df_long = df_long.sort_values(["Country", "Year"])



# Clean values:
# - Replace '...' with NaN
# - Convert comma decimals to dot decimals
df_long["gdp"] = (
    df_long["gdp"]
    .replace("...", pd.NA)
    .str.replace(",", ".", regex=False)
    .str.replace("%", "", regex=False)  # Remove percentage signs if present
)

# Convert Year to integer
df_long["Year"] = pd.to_numeric(df_long["Year"], errors="coerce")

# Convert GDP to float
df_long["gdp"] = pd.to_numeric(df_long["gdp"], errors="coerce")

# Sort for readability
df_long = df_long.sort_values(["Country", "Year"])

# Save to CSV
df_long.to_csv("military_spending/src/data/military-spending-sipri-gdp-long.csv", index=False)

print("Done: saved as military-spending-sipri-gdp-long.csv")