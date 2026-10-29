export type PlanetSurface = "rocky" | "ocean" | "gas" | "lava";

/** Deterministic random numbers in [0, 1) from a string seed. */
export function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

type Range = [number, number];

/**
 * A color range in HSL. `h` is an absolute hue; `dh` is a hue offset from the
 * planet's surface color (used for accents and atmospheres that follow it).
 */
interface ColorRange {
  h?: Range;
  dh?: Range;
  s: Range;
  l: Range;
}

interface PaletteFamily {
  name: string;
  surface: ColorRange;
  accent: ColorRange;
  atmosphere: ColorRange;
  /** Hot core of the magma fissures. Defaults to a pale yellow. */
  core?: ColorRange;
  /** Magma pools. Defaults to the accent color. */
  pool?: ColorRange;
}

// Families inspired by Solar System bodies and exoplanet atmosphere models.
const families: Record<PlanetSurface, PaletteFamily[]> = {
  // Dark crust; the accent is the magma glowing through its fissures
  rocky: [
    {
      name: "basalt",
      surface: { h: [15, 30], s: [8, 18], l: [22, 30] },
      accent: { h: [18, 30], s: [95, 100], l: [52, 58] },
      atmosphere: { h: [20, 35], s: [85, 100], l: [62, 70] },
    },
    {
      name: "ash plum",
      surface: { h: [330, 355], s: [8, 16], l: [22, 28] },
      accent: { h: [12, 25], s: [92, 100], l: [50, 56] },
      atmosphere: { h: [15, 28], s: [85, 100], l: [60, 68] },
    },
    {
      name: "iron",
      surface: { h: [10, 20], s: [20, 30], l: [24, 32] },
      accent: { h: [25, 38], s: [95, 100], l: [55, 60] },
      atmosphere: { h: [28, 40], s: [85, 100], l: [64, 72] },
    },
    {
      name: "charcoal",
      surface: { h: [220, 260], s: [5, 10], l: [18, 24] },
      accent: { h: [15, 28], s: [92, 100], l: [50, 56] },
      atmosphere: { h: [18, 30], s: [85, 100], l: [60, 68] },
    },
  ],
  ocean: [
    {
      name: "deep blue",
      surface: { h: [205, 222], s: [45, 65], l: [26, 38] },
      accent: { h: [95, 140], s: [25, 45], l: [30, 40] },
      atmosphere: { h: [195, 210], s: [70, 90], l: [75, 85] },
    },
    {
      name: "teal",
      surface: { h: [182, 198], s: [40, 60], l: [26, 36] },
      accent: { h: [70, 110], s: [25, 40], l: [32, 42] },
      atmosphere: { h: [180, 195], s: [60, 80], l: [78, 86] },
    },
    {
      name: "navy",
      surface: { h: [218, 230], s: [40, 55], l: [20, 28] },
      accent: { h: [30, 42], s: [30, 45], l: [40, 50] },
      atmosphere: { h: [205, 220], s: [60, 80], l: [72, 82] },
    },
  ],
  gas: [
    {
      name: "jovian",
      surface: { h: [28, 40], s: [30, 50], l: [50, 62] },
      accent: { dh: [-5, 8], s: [35, 55], l: [78, 88] },
      atmosphere: { dh: [0, 8], s: [40, 60], l: [84, 90] },
    },
    {
      name: "ice giant",
      surface: { h: [180, 200], s: [35, 55], l: [45, 58] },
      accent: { dh: [-8, 8], s: [30, 50], l: [75, 85] },
      atmosphere: { dh: [-5, 5], s: [50, 70], l: [82, 90] },
    },
    {
      name: "neptunian",
      surface: { h: [210, 225], s: [50, 70], l: [38, 50] },
      accent: { dh: [-10, 5], s: [40, 60], l: [72, 82] },
      atmosphere: { dh: [-10, 0], s: [60, 80], l: [80, 88] },
    },
    {
      name: "violet haze",
      surface: { h: [255, 280], s: [18, 35], l: [40, 52] },
      accent: { dh: [-30, -10], s: [20, 35], l: [75, 85] },
      atmosphere: { dh: [-10, 10], s: [40, 60], l: [82, 90] },
    },
    {
      name: "hot jupiter",
      surface: { h: [5, 20], s: [30, 50], l: [18, 26] },
      accent: { dh: [10, 20], s: [65, 80], l: [45, 55] },
      atmosphere: { h: [18, 28], s: [80, 95], l: [60, 70] },
    },
  ],
  // Dark cooled crust; the accent is the glowing magma
  // Volcanic palette: basalt #1B151C, volcanic rock #382523, dark magma #72251F,
  // red lava #A93420 and orange lava #C95726, each with a little room to vary.
  lava: [
    // Basalt crust, red lava fissures with an orange core
    {
      name: "basalt",
      surface: { h: [285, 300], s: [10, 18], l: [8, 12] },
      pool: { h: [2, 7], s: [52, 62], l: [25, 31] },
      accent: { h: [6, 12], s: [62, 72], l: [36, 42] },
      core: { h: [15, 21], s: [64, 72], l: [44, 50] },
      atmosphere: { h: [14, 20], s: [62, 70], l: [42, 48] },
    },
    // Volcanic rock crust, same lava
    {
      name: "volcanic rock",
      surface: { h: [2, 10], s: [18, 26], l: [15, 20] },
      pool: { h: [2, 7], s: [52, 62], l: [25, 31] },
      accent: { h: [6, 12], s: [62, 72], l: [36, 42] },
      core: { h: [15, 21], s: [64, 72], l: [44, 50] },
      atmosphere: { h: [14, 20], s: [62, 70], l: [42, 48] },
    },
    // Cooler: dark magma fissures with a red core
    {
      name: "dark magma",
      surface: { h: [285, 300], s: [10, 18], l: [8, 12] },
      pool: { h: [2, 7], s: [45, 55], l: [20, 25] },
      accent: { h: [2, 7], s: [52, 62], l: [26, 31] },
      core: { h: [6, 12], s: [62, 72], l: [36, 42] },
      atmosphere: { h: [6, 12], s: [62, 72], l: [36, 42] },
    },
  ],
};

export interface PlanetPalette {
  /** Name of the palette family, e.g. "ice giant". */
  family: string;
  surfaceColor: string;
  accentColor: string;
  atmosphereColor: string;
  /** Always clearly different from `surfaceColor`. */
  ringColor: string;
  /** Hot core of the magma fissures (rocky and lava planets). */
  coreColor: string;
  /** Magma pools (lava planets). */
  poolColor: string;
  /** Glow around the planet: the surface hue, light enough to show on a dark background. */
  auraColor: string;
}

const pick = (random: () => number, [min, max]: Range) =>
  min + random() * (max - min);

function hslToHex(h: number, s: number, l: number) {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const value = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

/** "#rrggbb" (or "#rgb") to HSL; `null` when the color isn't in hex form. */
/** The surface color's hue, lifted to a lightness and saturation that glow on a dark sky. */
function auraColor(surfaceColor: string) {
  const surface = hexToHsl(surfaceColor);
  if (!surface) return surfaceColor;
  return hslToHex(
    surface.h,
    Math.max(surface.s, 35),
    Math.min(Math.max(surface.l + 25, 50), 70),
  );
}

function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const digits =
    match[1].length === 3 ? [...match[1]].map((d) => d + d).join("") : match[1];
  const [r, g, b] = [0, 2, 4].map(
    (i) => parseInt(digits.slice(i, i + 2), 16) / 255,
  );
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l: l * 100 };
  const s = d / (1 - Math.abs(2 * l - 1));
  const h =
    max === r
      ? ((g - b) / d) % 6
      : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: s * 100, l: l * 100 };
}

/**
 * Plausible surface, accent and atmosphere colors for a planet, derived only from
 * its seed and surface type: the same inputs always give the same colors.
 */
export function planetPalette(
  seed: string,
  surface: PlanetSurface,
): PlanetPalette {
  // Own random stream, separate from the texture's, so colors don't shift the details.
  const random = seededRandom(`color:${surface}:${seed}`);
  const options = families[surface];
  const family = options[Math.floor(random() * options.length)];

  const baseHue = pick(random, family.surface.h ?? [0, 0]);
  const color = (range: ColorRange) => {
    const hue = range.h
      ? pick(random, range.h)
      : baseHue + pick(random, range.dh ?? [0, 0]);
    return hslToHex(
      (hue + 360) % 360,
      pick(random, range.s),
      pick(random, range.l),
    );
  };

  const surfaceColor = hslToHex(
    baseHue,
    pick(random, family.surface.s),
    pick(random, family.surface.l),
  );
  const accentColor = color(family.accent);
  const atmosphereColor = color(family.atmosphere);
  // Picked last, so families without them keep the colors they had before
  const coreColor = family.core ? color(family.core) : "#ffe7a8";
  const poolColor = family.pool ? color(family.pool) : accentColor;
  return {
    family: family.name,
    surfaceColor,
    accentColor,
    atmosphereColor,
    ringColor: planetRingColor(seed, surfaceColor),
    coreColor,
    poolColor,
    auraColor: auraColor(surfaceColor),
  };
}

// Rings are ice, dust or rock debris, so their colors are mostly pale and desaturated.
const ringFamilies: ColorRange[] = [
  { h: [195, 220], s: [15, 35], l: [78, 90] }, // water ice
  { h: [210, 240], s: [5, 12], l: [70, 82] }, // frost grey
  { h: [30, 45], s: [25, 45], l: [62, 75] }, // dust
  { h: [20, 40], s: [8, 20], l: [45, 58] }, // rock debris
  { h: [15, 30], s: [30, 50], l: [30, 40] }, // dark ochre dust
];

/** True when two colors are close enough to look like the same color. */
function looksAlike(
  a: { h: number; s: number; l: number },
  b: { h: number; s: number; l: number },
) {
  const hueGap = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h));
  // Greys have no meaningful hue, so only lightness tells them apart.
  // Generous margins, so rounding to #rrggbb can't bring two colors back together.
  const sameHue = hueGap < 40 || a.s < 18 || b.s < 18;
  return sameHue && Math.abs(a.l - b.l) < 25;
}

/**
 * A plausible ring color for `seed` that never looks like `surfaceColor`
 * (pass the planet's actual surface color, even when it was chosen by hand).
 */
export function planetRingColor(seed: string, surfaceColor: string): string {
  // Own random stream, so rings don't shift the planet's other colors.
  const random = seededRandom(`ring:${seed}`);
  const surface = hexToHsl(surfaceColor);
  let candidate = { h: 0, s: 0, l: 0 };
  // Try a few seeded candidates; the first that differs from the surface wins.
  for (let attempt = 0; attempt < 8; attempt++) {
    const family = ringFamilies[Math.floor(random() * ringFamilies.length)];
    candidate = {
      h: pick(random, family.h ?? [0, 0]),
      s: pick(random, family.s),
      l: pick(random, family.l),
    };
    if (!surface || !looksAlike(candidate, surface))
      return hslToHex(candidate.h, candidate.s, candidate.l);
  }
  // Still too close: push the lightness to the opposite end from the surface.
  const l = surface && surface.l > 50 ? surface.l - 35 : (surface?.l ?? 0) + 40;
  return hslToHex(candidate.h, candidate.s, Math.min(90, Math.max(15, l)));
}
