import * as topojson from "topojson-client";
import { csvFormat } from "d3-dsv";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(
  __dirname,
  "military-spending-sipri-percapita.csv"
);

const rawPerCap = await readFile(filePath, "utf-8");

const lines = rawPerCap.split("\n");

const headers = lines[1].split(";");

const parsed = lines.slice(2).map((line) => {
  const parts = line.split(";");
  const obj = { Entity: parts[0] };

  for (let i = 2; i < parts.length; i++) {
    const year = headers[i]?.trim();
    const val = parts[i];

    obj[year] = !val || val === "..." ? undefined : +val.replace(",", ".");
  }

  return obj;
});

const perCapitaFlat = parsed.flatMap((row) =>
  Object.entries(row)
    .filter(([k, v]) => k !== "Entity" && v != null && !isNaN(v))
    .map(([year, value]) => ({
      Entity: row.Entity,
      Year: +year,
      Military_expenditure: value,
    })),
);

process.stdout.write(csvFormat(perCapitaFlat));
