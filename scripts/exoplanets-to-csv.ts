import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { ExoplanetType } from "../src/schemas/exoplanet.type.ts";

const root = join(import.meta.dirname, "..");

type Column = keyof ExoplanetType;

/**
 * Formats one CSV field (RFC 4180). `null` becomes an empty field and an empty
 * string becomes `""`, so the two stay distinguishable (PostgreSQL's
 * `COPY ... CSV` reads them back as NULL and '' respectively).
 */
function toCsvField(value: ExoplanetType[Column] | undefined): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "";
  if (value === "" || /[",\r\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

/** Builds a CSV with a header row and one line per exoplanet. */
export function exoplanetsToCsv(rows: ExoplanetType[]): string {
  // Union of keys across all rows; a row missing a key gets an empty field.
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row) as Column[]))];
  const lines = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => toCsvField(row[column])).join(",")),
  ];
  return `${lines.join("\n")}\n`;
}

interface ConvertOptions {
  inputPath?: string;
  outputPath?: string;
  /** Only use the first `limit` exoplanets from the list; all of them when omitted. */
  limit?: number;
}

/**
 * Reads the NASA archive dump at `inputPath` and writes it as CSV to `outputPath`.
 * Returns how many exoplanets were written.
 */
export async function convertRawDataToCsv({
  inputPath = join(root, "data", "raw_data.json"),
  outputPath = join(root, "data", "exoplanets.csv"),
  limit,
}: ConvertOptions = {}): Promise<number> {
  const data: unknown = JSON.parse(await readFile(inputPath, "utf-8"));
  if (!Array.isArray(data)) throw new Error(`${inputPath} must contain a JSON array of exoplanets`);

  const rows = (data as ExoplanetType[]).slice(0, limit);
  await writeFile(outputPath, exoplanetsToCsv(rows), "utf-8");
  return rows.length;
}
