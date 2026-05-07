import json

# Input TopoJSON file
input_file = "countries.geo.json"

# Output file for unique country names
output_file = "geo_countries2.txt"

# Load the TopoJSON data
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Set to store unique country names
unique_countries = set()

# Iterate over all geometries and collect country names
for geometry in data.get("objects", {}).get("countries", {}).get("geometries", []):
    country_name = geometry.get("properties", {}).get("name", "").strip()
    if country_name:
        unique_countries.add(country_name)

# Write unique country names to the output file, one per line
with open(output_file, 'w', encoding='utf-8') as f:
    for name in sorted(unique_countries):  # sorted alphabetically
        f.write(name + "\n")

print(f"{len(unique_countries)} unique country names written to {output_file}")