import type { PlanetSurface } from "../components/planet-palette";

const LIGHT_YEARS_PER_PARSEC = 3.26156;

const number = (value: number, maximumFractionDigits: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits });

/** Distance from Earth (`sy_dist`, parsecs) in light-years, e.g. "1,206 light-years". */
export function formatDistance(parsecs: number | null) {
  if (parsecs == null) return "Distance unknown";
  const lightYears = parsecs * LIGHT_YEARS_PER_PARSEC;
  return `${number(lightYears, lightYears < 100 ? 2 : 0)} light-years`;
}

/** Equilibrium temperature (`pl_eqt`, kelvin) in Celsius, e.g. "≈ −32 °C". */
export function formatTemperature(kelvin: number | null) {
  if (kelvin == null) return "Unknown";
  const celsius = Math.round(kelvin - 273.15);
  // A real minus sign reads better than a hyphen
  return `≈ ${celsius < 0 ? "−" : ""}${number(Math.abs(celsius), 0)} °C`;
}

/** Length of the planet's year (`pl_orbper`, days), in hours, days or years. */
export function formatOrbitalPeriod(days: number | null) {
  if (days == null) return "Unknown";
  if (days < 1) return `${number(days * 24, 1)} hours`;
  if (days < 365) return `${number(days, 1)} days`;
  return `${number(days / 365.25, 1)} years`;
}

const surfaceLabels: Record<PlanetSurface, string> = {
  rocky: "Rocky",
  ocean: "Ocean world",
  gas: "Gaseous",
  lava: "Lava world",
};

/** Human-readable name for an inferred surface type. */
export const formatSurface = (surface: PlanetSurface) => surfaceLabels[surface];
