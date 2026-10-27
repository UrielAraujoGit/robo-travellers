import { convertRawDataToCsv } from "./exoplanets-to-csv.ts";
import { parseLimitArg } from "./parse-limit-arg.ts";

const count = await convertRawDataToCsv({ limit: parseLimitArg() });

console.log(`Wrote ${count} exoplanets to data/exoplanets.csv`);
