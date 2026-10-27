import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { PSCompParsRow } from "../src/schemas/exoplanet.type.ts";
import { exoplanetsToSql } from "./exoplanets-to-sql.ts";

const root = join(import.meta.dirname, "..");
const inputPath = join(root, "data", "raw_data.json");
const outputPath = join(root, "sql", "exoplanets-data.sql");

const data: unknown = JSON.parse(await readFile(inputPath, "utf-8"));
if (!Array.isArray(data)) throw new Error(`${inputPath} must contain a JSON array of exoplanets`);

const rows = data as PSCompParsRow[];
await writeFile(outputPath, exoplanetsToSql(rows), "utf-8");

console.log(`Wrote ${rows.length} exoplanets to ${outputPath}`);
