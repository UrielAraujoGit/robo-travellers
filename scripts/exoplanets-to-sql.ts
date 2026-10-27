import { writeFile } from "node:fs/promises";
import type { ExoplanetType } from "../src/schemas/exoplanet.type.ts";

/** Rows per INSERT statement, so a full archive dump doesn't become one giant statement. */
const BATCH_SIZE = 500;

/** Column names come from the data, so only plain snake_case identifiers are allowed into the SQL. */
const IDENTIFIER = /^[a-z_][a-z0-9_]*$/;

type Column = keyof ExoplanetType;

/** `undefined` is accepted because a row may lack a key that other rows have. */
function toSqlLiteral(value: ExoplanetType[Column] | undefined): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL";
  return `'${value.replaceAll("'", "''")}'`;
}

/**
 * Builds a PostgreSQL script that upserts the rows into the `exoplanets` table
 * (see sql/exoplanets.sql). Rows whose `pl_name` already exists are updated, so
 * the script can be re-run with a fresher archive dump.
 */
export function exoplanetsToSql(rows: ExoplanetType[]): string {
  if (rows.length === 0) return "-- No exoplanets to insert.\n";

  // Union of keys across all rows; a row missing a key gets NULL for it.
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row) as Column[]))];
  for (const column of columns) {
    if (!IDENTIFIER.test(column)) throw new Error(`Invalid column name: ${column}`);
  }

  const updates = columns
    .filter((column) => column !== "pl_name")
    .map((column) => `${column} = EXCLUDED.${column}`)
    .join(",\n    ");

  const statements: string[] = [];
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const values = rows
      .slice(i, i + BATCH_SIZE)
      .map((row) => `  (${columns.map((column) => toSqlLiteral(row[column])).join(", ")})`)
      .join(",\n");

    statements.push(
      `INSERT INTO exoplanets (${columns.join(", ")})\nVALUES\n${values}\n` +
        `ON CONFLICT (pl_name) DO UPDATE SET\n    ${updates};`,
    );
  }

  return `BEGIN;\n\n${statements.join("\n\n")}\n\nCOMMIT;\n`;
}

/** Writes the upsert script for `rows` to `filePath`. */
export async function writeExoplanetsSqlFile(rows: ExoplanetType[], filePath: string): Promise<void> {
  await writeFile(filePath, exoplanetsToSql(rows), "utf-8");
}
