import type { PlanetSurface } from "../components/planet-palette";
import type { ExoplanetType } from "../schemas/exoplanet.type";

type SurfaceFields = Pick<
  ExoplanetType,
  "pl_rade" | "pl_bmasse" | "pl_dens" | "pl_eqt"
>;

/** Above this radius [Earth radii] a planet holds a thick gas envelope. */
const GAS_GIANT_RADIUS = 6;
/** Above this mass [Earth masses] a planet is a gas giant. */
const GAS_GIANT_MASS = 50;
/** Below this radius [Earth radii] most planets are rocky (the "radius valley" is around 1.5–2). */
const ROCKY_RADIUS = 1.6;
/** Largest radius [Earth radii] considered for a water world. */
const OCEAN_MAX_RADIUS = 4;
/** Density [g/cm³] from which a planet is mostly rock and metal (Earth is 5.5). */
const ROCKY_DENSITY = 3.5;
/** Equilibrium temperatures [K] where liquid water is plausible. */
const OCEAN_TEMPERATURE: [number, number] = [200, 400];
/** Equilibrium temperature [K] above which rock melts. */
const LAVA_TEMPERATURE = 1500;

/**
 * Infers the most plausible kind of surface from a planet's size, density and
 * temperature. The archive has no field for it, so this is an estimate, not a
 * measurement. Returns "gas" when the data isn't enough to decide.
 */
export function planetSurface(planet: SurfaceFields): PlanetSurface {
  const {
    pl_rade: radius,
    pl_bmasse: mass,
    pl_dens: density,
    pl_eqt: temperature,
  } = planet;

  if (
    (radius != null && radius > GAS_GIANT_RADIUS) ||
    (mass != null && mass > GAS_GIANT_MASS)
  ) {
    return "gas";
  }
  // Without a radius there is no way to tell rock from gas
  if (radius == null) return "gas";

  const dense = density != null && density >= ROCKY_DENSITY;
  const rockyOrLava = (): PlanetSurface =>
    temperature != null && temperature > LAVA_TEMPERATURE ? "lava" : "rocky";

  if (radius < ROCKY_RADIUS && (density == null || dense)) return rockyOrLava();

  const [minOcean, maxOcean] = OCEAN_TEMPERATURE;
  if (
    radius <= OCEAN_MAX_RADIUS &&
    temperature != null &&
    temperature >= minOcean &&
    temperature <= maxOcean
  ) {
    return "ocean";
  }

  if (radius <= OCEAN_MAX_RADIUS && dense) return rockyOrLava();

  return "gas";
}
