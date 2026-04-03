import csv

# Input CSV file
input_file = "data/military-spending-sipri/military-spending-sipri.csv"

# Output file for unique entities
output_file = "unique_entities.txt"

# Set to store unique entities
unique_entities = set()

# Read the CSV and collect unique entities
with open(input_file, mode='r', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        entity = row['Entity'].strip()
        if entity:  # Skip empty values
            unique_entities.add(entity)

# Write unique entities to the output file, one per line
with open(output_file, mode='w', encoding='utf-8') as f:
    for entity in sorted(unique_entities):  # Optional: sort alphabetically
        f.write(entity + '\n')

print(f"{len(unique_entities)} unique entities written to {output_file}")