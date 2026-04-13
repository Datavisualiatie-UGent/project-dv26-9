import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

export async function loadSIPRI(filename, options = {}) {
  const { stripPercent = false } = options;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(
    __dirname,
    `military-spending-sipri-${filename}.csv`,
  );

  const raw = await readFile(filePath, "utf-8");

  const lines = raw.split("\n");
  const headers = lines[0].split(";");

  const parsed = lines.slice(1).map((line) => {
    const parts = line.split(";");

    const obj = { Entity: parts[0] };

    for (let i = 2; i < parts.length; i++) {
      const year = headers[i]?.trim();
      let val = parts[i];

      if (!val || val === "...") {
        obj[year] = undefined;
        continue;
      }

      if (stripPercent) {
        val = val.replaceAll("%", "");
      }

      obj[year] = !val || val === "..." ? undefined : +val.replace(",", ".");
    }

    return obj;
  });

  return parsed.flatMap((row) =>
    Object.entries(row)
      .filter(([k, v]) => k !== "Entity" && v != null && !isNaN(v))
      .map(([year, value]) => ({
        Entity: row.Entity,
        Year: +year,
        Military_expenditure: value,
      })),
  );
}
