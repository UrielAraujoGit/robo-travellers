import { parseArgs } from "node:util";

/** Reads the optional `--limit N` CLI option: only use the first N exoplanets from the list. */
export function parseLimitArg(): number | undefined {
  const { values } = parseArgs({ options: { limit: { type: "string" } } });
  if (values.limit === undefined) return undefined;

  const limit = Number(values.limit);
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error(`--limit must be a positive integer, got "${values.limit}"`);
  }
  return limit;
}
