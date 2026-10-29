import { useId } from "react";
import {
  planetPalette,
  seededRandom,
  type PlanetSurface,
} from "./planet-palette";
import type { ExoplanetType } from "../schemas/exoplanet.type";
import { planetSurface } from "../utils/planet-surface";

export type { PlanetSurface };

interface PlanetArtProps {
  /** Any string (e.g. the planet name): the same seed always draws the same texture and colors. */
  seed?: string;
  /** Exoplanet data */
  exoplanet: ExoplanetType;
  /** Draw rings. Their color comes from the seed and never matches the surface color. */
  rings?: boolean;
  /** Sets the width of the planet itself; rings are drawn outside it. */
  className?: string;
}

const round = (n: number) => Math.round(n * 10) / 10;

interface NoiseLayerProps {
  id: string;
  color: string;
  /** Noise scale in planet units (radius is 50); two values stretch it, e.g. "0.02 0.1" for streaks. */
  frequency: string;
  octaves?: number;
  seed: number;
  /** Noise level (0-1) where the layer starts to show. */
  threshold: number;
  /** How quickly it goes from transparent to opaque above the threshold. */
  contrast: number;
  blur?: number;
  transform?: string;
  /** Swirls the noise with a second noise (feDisplacementMap): turbulent edges, cloud systems. */
  warp?: { frequency: number; scale: number };
  opacity?: number;
}

/**
 * Organic texture: fractal noise turned into a mask and filled with `color`.
 * Only the parts where the noise is above `threshold` are painted.
 */
function NoiseLayer({
  id,
  color,
  frequency,
  octaves = 3,
  seed,
  threshold,
  contrast,
  blur,
  transform,
  warp,
  opacity,
}: NoiseLayerProps) {
  return (
    <>
      <filter
        id={id}
        x="-60"
        y="-60"
        width="120"
        height="120"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          seed={seed}
          result="noise"
        />
        {warp && (
          <>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={warp.frequency}
              numOctaves={2}
              seed={seed + 50}
              result="warpNoise"
            />
            <feDisplacementMap
              in="noise"
              in2="warpNoise"
              scale={warp.scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="warped"
            />
          </>
        )}
        {/* alpha = contrast × (noise − threshold) */}
        <feColorMatrix
          in={warp ? "warped" : "noise"}
          type="matrix"
          values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${contrast} 0 0 0 ${-threshold * contrast}`}
          result="mask"
        />
        <feFlood floodColor={color} result="fill" />
        <feComposite in="fill" in2="mask" operator="in" result="layer" />
        {blur ? <feGaussianBlur in="layer" stdDeviation={blur} /> : null}
      </filter>
      <rect
        x="-60"
        y="-60"
        width="120"
        height="120"
        filter={`url(#${id})`}
        transform={transform}
        opacity={opacity}
      />
    </>
  );
}

interface DetailsProps {
  id: string;
  seed: string;
  accentColor?: string;
  /** Hot core of magma fissures. */
  coreColor?: string;
  /** Magma pools. */
  poolColor?: string;
}

/** A random number between min and max. */
const between = (random: () => number, min: number, max: number) =>
  min + random() * (max - min);

// The seed decides not only where details fall, but each planet's character:
// texture scale, how much of the surface each layer covers, angles, counts and sizes.
// Filter ids include the noise seed, so a changed seed gets a fresh filter instead of a cached one.

/** Alpha table for a band of noise levels around 0.5 (81 steps, `width` steps on each side). */
const bandTable = (width: number) =>
  Array.from({ length: 81 }, (_, i) =>
    Math.abs(i - 40) <= width ? 1 : 0,
  ).join(" ");

/** Light comes from the top-left, matching the day/night shading. */
const LIGHT_AZIMUTH = 225;

interface ReliefProps {
  id: string;
  seed: number;
  /** Size of the terrain features: lower = broader mountains and basins. */
  frequency: number;
  /** Height of the terrain: higher = harsher light and shadow. */
  height?: number;
  /** How strongly the relief shows over the surface (0-1). */
  strength?: number;
  octaves?: number;
}

/**
 * Terrain relief: a noise height map lit by the star (feDiffuseLighting), blended
 * over the surface so ridges catch the light and slopes fall into shadow.
 */
function Relief({
  id,
  seed,
  frequency,
  height = 4,
  strength = 0.7,
  octaves = 5,
}: ReliefProps) {
  return (
    <>
      <filter
        id={id}
        x="-60"
        y="-60"
        width="120"
        height="120"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency={`${Math.round(frequency * 1000) / 1000}`}
          numOctaves={octaves}
          seed={seed}
          result="height"
        />
        <feDiffuseLighting
          in="height"
          surfaceScale={height}
          diffuseConstant="1"
          lightingColor="#fff"
        >
          <feDistantLight azimuth={LIGHT_AZIMUTH} elevation="35" />
        </feDiffuseLighting>
      </filter>
      <rect
        x="-60"
        y="-60"
        width="120"
        height="120"
        filter={`url(#${id})`}
        opacity={strength}
        style={{ mixBlendMode: "overlay" }}
      />
    </>
  );
}

/**
 * Impact craters: few big, many small. Each has a bowl whose wall facing the light
 * is in shadow and whose far wall is lit, a raised rim, and is foreshortened near
 * the edge of the disc like a crater seen on a real sphere.
 */
function Craters({ id, random }: { id: string; random: () => number }) {
  const craters = Array.from(
    { length: Math.floor(between(random, 8, 18)) },
    () => {
      const angle = random() * Math.PI * 2;
      const distance = Math.sqrt(random()) * 44;
      return {
        cx: round(Math.cos(angle) * distance),
        cy: round(Math.sin(angle) * distance),
        r: round(1 + 8 * random() ** 2.5),
        angle: round((angle * 180) / Math.PI),
        // Seen at a slant near the limb: squashed toward the center
        squash: round(Math.sqrt(1 - (distance / 50) ** 2) * 100) / 100,
      };
    },
  );
  return (
    <>
      <linearGradient id={`${id}-crater-bowl`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.6" />
        <stop offset="0.5" stopColor="#000" stopOpacity="0.25" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.16" />
      </linearGradient>
      <linearGradient id={`${id}-crater-rim`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.4" />
      </linearGradient>
      <g filter={`url(#${id}-soft)`}>
        {craters.map(({ cx, cy, r, angle, squash }) => (
          <g
            key={`${cx},${cy}`}
            transform={`translate(${cx} ${cy}) rotate(${angle}) scale(${squash} 1) rotate(${-angle})`}
          >
            {/* Ejecta: a faint lighter halo around bigger craters */}
            {r > 4 && <circle r={r * 1.7} fill="#fff" fillOpacity="0.04" />}
            <circle r={r} fill={`url(#${id}-crater-bowl)`} />
            <circle
              r={r}
              fill="none"
              stroke={`url(#${id}-crater-rim)`}
              strokeWidth={round(Math.max(0.4, r * 0.18) * 10) / 10}
            />
          </g>
        ))}
      </g>
    </>
  );
}

interface MagmaVeinsProps {
  id: string;
  color: string;
  seed: number;
  /** Lower frequency = fewer, longer fissures. */
  frequency: number;
  octaves?: number;
  /** Width of the glowing edge, in steps of the band table. */
  width?: number;
  /** Color of the thin, hot core. */
  coreColor?: string;
  /** Overall brightness (0-1); finer, secondary cracks use less. */
  intensity?: number;
}

/**
 * Glowing fissures: the contour lines of a noise field (levels around 0.5) form a
 * branching network. A second, broader noise makes them brighter in some stretches
 * and fade out in others, so they read as cracks rather than a drawn net. Each
 * fissure has a wide faint halo, a blurred edge in `color` and a thin hot core.
 */
function MagmaVeins({
  id,
  color,
  seed,
  frequency,
  octaves = 4,
  width = 2,
  coreColor = "#ffe7a8",
  intensity = 1,
}: MagmaVeinsProps) {
  return (
    <>
      <filter
        id={id}
        x="-60"
        y="-60"
        width="120"
        height="120"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency={`${Math.round(frequency * 1000) / 1000}`}
          numOctaves={octaves}
          seed={seed}
          result="noise"
        />
        {/* Noise level → alpha, then keep only the bands around 0.5 */}
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
          result="level"
        />
        {/* Broad noise that fades the fissures in and out along their length */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency={`${Math.round(frequency * 700) / 1000}`}
          numOctaves={2}
          seed={seed + 7}
          result="breakNoise"
        />
        <feColorMatrix
          in="breakNoise"
          type="matrix"
          values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${3 * intensity} 0 0 0 ${-1.2 * intensity}`}
          result="breakMask"
        />
        <feComponentTransfer in="level" result="band">
          <feFuncA type="table" tableValues={bandTable(width)} />
        </feComponentTransfer>
        <feComponentTransfer in="level" result="coreBand">
          <feFuncA type="table" tableValues={bandTable(0)} />
        </feComponentTransfer>
        <feComposite in="band" in2="breakMask" operator="in" result="edge" />
        <feComposite
          in="coreBand"
          in2="breakMask"
          operator="in"
          result="core"
        />
        <feFlood floodColor={color} result="magma" />
        <feComposite in="magma" in2="edge" operator="in" result="edgeFill" />
        <feGaussianBlur in="edgeFill" stdDeviation="1.6" result="glow" />
        {/* Wide, faint halo: magma light spilling onto the crust around it */}
        <feGaussianBlur in="edgeFill" stdDeviation="4" result="haloBlur" />
        <feComponentTransfer in="haloBlur" result="halo">
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feFlood floodColor={coreColor} result="hot" />
        <feComposite in="hot" in2="core" operator="in" result="coreFill" />
        <feGaussianBlur in="coreFill" stdDeviation="0.3" result="coreSoft" />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="glow" />
          <feMergeNode in="edgeFill" />
          <feMergeNode in="coreSoft" />
        </feMerge>
      </filter>
      <rect x="-60" y="-60" width="120" height="120" filter={`url(#${id})`} />
    </>
  );
}

interface MagmaPoolsProps {
  id: string;
  seed: number;
  frequency: number;
  /** Noise level where the pools start: higher = fewer, smaller pools. */
  cover: number;
  /** From the cooler edge to the hottest center. */
  colors: [string, string, string];
}

/**
 * Magma lakes in three nested layers of the same noise: a dark, cooling rim,
 * then glowing lava, then a hot center, like a real lava lake.
 */
function MagmaPools({ id, seed, frequency, cover, colors }: MagmaPoolsProps) {
  const [rim, lava, hot] = colors;
  const layers = [
    { color: rim, threshold: cover, blur: 0.6 },
    { color: lava, threshold: cover + 0.035, blur: 0.5 },
    { color: hot, threshold: cover + 0.07, blur: 0.4 },
  ];
  return (
    <>
      {layers.map(({ color, threshold, blur }, i) => (
        <NoiseLayer
          key={i}
          id={`${id}-${i}`}
          color={color}
          frequency={`${Math.round(frequency * 1000) / 1000}`}
          octaves={4}
          seed={seed}
          threshold={threshold}
          contrast={6}
          blur={blur}
        />
      ))}
    </>
  );
}

/** Dark, cratered crust of a rocky world with real relief, drawn under the shading. */
function RockyCrust({ id, seed }: DetailsProps) {
  const random = seededRandom(seed);
  const noiseSeed = Math.floor(random() * 10000);
  const scale = between(random, 0.6, 1.5);
  const darkCover = between(random, 0.42, 0.52);
  return (
    <>
      {/* Darker and lighter regions of rock (albedo) */}
      <NoiseLayer
        id={`${id}-dark-${noiseSeed}`}
        color="#000"
        frequency={`${0.03 * scale}`}
        octaves={4}
        seed={noiseSeed}
        threshold={darkCover}
        contrast={1.4}
      />
      {/* Mountains and basins, then fine rough ground */}
      <Relief
        id={`${id}-relief-${noiseSeed}`}
        seed={noiseSeed + 1}
        frequency={0.05 * scale}
        height={4}
        strength={0.8}
      />
      <Relief
        id={`${id}-roughness-${noiseSeed}`}
        seed={noiseSeed + 2}
        frequency={0.22}
        height={1.5}
        strength={0.4}
        octaves={3}
      />
      <Craters id={id} random={random} />
    </>
  );
}

/**
 * A few glowing fissures and small magma pools.
 * Drawn over the shading because magma gives off its own light.
 */
function RockyGlow({
  id,
  seed,
  accentColor = "#ff7a1a",
  coreColor,
  poolColor = accentColor,
}: DetailsProps) {
  // Own stream, so the glow doesn't depend on how many values the crust used.
  const random = seededRandom(`${seed}:glow`);
  const noiseSeed = Math.floor(random() * 10000);
  const veinScale = between(random, 0.7, 1.4);
  const veinWidth = Math.round(between(random, 1, 3));
  return (
    <>
      <MagmaPools
        id={`${id}-pools-${noiseSeed}`}
        seed={noiseSeed + 1}
        frequency={0.05}
        cover={0.72}
        colors={[poolColor, accentColor, coreColor ?? accentColor]}
      />
      <MagmaVeins
        id={`${id}-veins-${noiseSeed}`}
        color={accentColor}
        seed={noiseSeed}
        frequency={0.022 * veinScale}
        width={veinWidth}
        coreColor={coreColor}
      />
    </>
  );
}

function OceanDetails({ id, seed, accentColor }: DetailsProps) {
  const random = seededRandom(seed);
  const noiseSeed = Math.floor(random() * 10000);
  const scale = between(random, 0.6, 1.5);
  const landCover = between(random, 0.52, 0.68);
  const cloudCover = between(random, 0.48, 0.62);
  const cloudAngle = round(between(random, -40, 0));
  const land = {
    frequency: `${0.025 * scale}`,
    octaves: 4,
    seed: noiseSeed + 1,
    threshold: landCover,
    contrast: 3,
    blur: 0.4,
  };
  // Cloud systems: stretched noise, swirled by a second noise
  const clouds = {
    frequency: `${0.012 * scale} ${0.06 * scale}`,
    octaves: 5,
    seed: noiseSeed + 2,
    threshold: cloudCover,
    warp: { frequency: 0.03, scale: 12 },
  };
  return (
    <>
      {/* Deeper and shallower water */}
      <NoiseLayer
        id={`${id}-depth-${noiseSeed}`}
        color="#000"
        frequency={`${0.03 * scale}`}
        seed={noiseSeed}
        threshold={0.45}
        contrast={1.4}
      />
      {accentColor && (
        <>
          {/* Shallow shelves: lighter water around the coasts */}
          <NoiseLayer
            id={`${id}-shelf-${noiseSeed}`}
            color="#fff"
            {...land}
            threshold={landCover - 0.06}
            contrast={1.5}
          />
          <NoiseLayer
            id={`${id}-land-${noiseSeed}`}
            color={accentColor}
            {...land}
          />
          {/* Mountains and valleys, only on land */}
          <mask
            id={`${id}-land-mask`}
            maskUnits="userSpaceOnUse"
            x="-60"
            y="-60"
            width="120"
            height="120"
          >
            <NoiseLayer
              id={`${id}-land-mask-${noiseSeed}`}
              color="#fff"
              {...land}
            />
          </mask>
          <g mask={`url(#${id}-land-mask)`}>
            <Relief
              id={`${id}-land-relief-${noiseSeed}`}
              seed={noiseSeed + 3}
              frequency={0.06 * scale}
              height={3}
              strength={0.7}
            />
          </g>
        </>
      )}
      {/* Sun glint: the star reflected on the water (not on land) */}
      <filter id={`${id}-glint`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <mask
        id={`${id}-sea-mask`}
        maskUnits="userSpaceOnUse"
        x="-60"
        y="-60"
        width="120"
        height="120"
      >
        <rect x="-60" y="-60" width="120" height="120" fill="#fff" />
        {accentColor && (
          <NoiseLayer
            id={`${id}-sea-mask-${noiseSeed}`}
            color="#000"
            {...land}
          />
        )}
      </mask>
      <g mask={`url(#${id}-sea-mask)`}>
        <ellipse
          cx="-20"
          cy="-18"
          rx="10"
          ry="7"
          fill="#fff"
          opacity="0.35"
          filter={`url(#${id}-glint)`}
        />
      </g>
      {/* Clouds cast shadows on the surface, offset away from the light */}
      <NoiseLayer
        id={`${id}-cloud-shadows-${noiseSeed}`}
        color="#000"
        {...clouds}
        contrast={1.2}
        blur={1}
        transform={`translate(1.8 1.8) rotate(${cloudAngle})`}
      />
      <NoiseLayer
        id={`${id}-clouds-${noiseSeed}`}
        color="#fff"
        {...clouds}
        contrast={2.6}
        blur={0.4}
        transform={`rotate(${cloudAngle})`}
      />
      {/* Small, puffy clouds */}
      <NoiseLayer
        id={`${id}-cumulus-${noiseSeed}`}
        color="#fff"
        frequency={`${0.07 * scale}`}
        octaves={4}
        seed={noiseSeed + 4}
        threshold={cloudCover + 0.08}
        contrast={3}
        blur={0.3}
      />
    </>
  );
}

/** Share of gas planets with a storm (0-1). */
const STORM_CHANCE = 0.3;

function GasDetails({ id, seed, accentColor = "#fff" }: DetailsProps) {
  const random = seededRandom(seed);
  const noiseSeed = Math.floor(random() * 10000);
  // Lower frequency = fewer, wider bands
  const bandFrequency = round(between(random, 0.03, 0.1) * 1000) / 1000;
  const tilt = `rotate(${round(between(random, -25, 0))})`;
  const lightCover = between(random, 0.4, 0.52);
  // Only some gas planets have a storm: anywhere on the lit side, at a random size
  const storm =
    random() < STORM_CHANCE
      ? {
          cx: round(between(random, -28, 22)),
          cy: round(between(random, -25, 25)),
          size: between(random, 0.6, 1.6),
        }
      : null;
  // How strongly the winds churn the edges of the bands
  const turbulence = round(between(random, 4, 9));
  const bands = `0.002 ${bandFrequency}`;
  const warp = { frequency: 0.05, scale: turbulence };
  return (
    <>
      {/* Light zones and dark belts, with turbulent, wavy edges */}
      <NoiseLayer
        id={`${id}-zones-${noiseSeed}`}
        color={accentColor}
        frequency={bands}
        seed={noiseSeed}
        threshold={lightCover}
        contrast={4}
        blur={0.5}
        transform={tilt}
        warp={warp}
      />
      <NoiseLayer
        id={`${id}-belts-${noiseSeed}`}
        color="#000"
        frequency={bands}
        seed={noiseSeed + 1}
        threshold={0.52}
        contrast={3.5}
        blur={0.5}
        transform={tilt}
        warp={warp}
      />
      {/* Finer structure inside the belts */}
      <NoiseLayer
        id={`${id}-belt-detail-${noiseSeed}`}
        color="#000"
        frequency={`0.004 ${round(bandFrequency * 3 * 1000) / 1000}`}
        seed={noiseSeed + 2}
        threshold={0.55}
        contrast={1.2}
        transform={tilt}
        warp={{ frequency: 0.08, scale: turbulence * 0.6 }}
      />
      <NoiseLayer
        id={`${id}-streaks-${noiseSeed}`}
        color="#fff"
        frequency="0.01 0.25"
        octaves={2}
        seed={noiseSeed + 3}
        threshold={0.5}
        contrast={0.4}
        transform={tilt}
      />
      {/* Hazy, darker poles */}
      <linearGradient id={`${id}-poles`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.5" />
        <stop offset="0.2" stopColor="#000" stopOpacity="0" />
        <stop offset="0.8" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.5" />
      </linearGradient>
      <rect
        x="-50"
        y="-50"
        width="100"
        height="100"
        fill={`url(#${id}-poles)`}
        transform={tilt}
      />
      {/* Storm: concentric ovals like Jupiter's Great Red Spot, with ragged
          edges and a turbulent wake trailing downstream */}
      {storm && (
        <>
          <filter
            id={`${id}-swirl`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.2"
              numOctaves={2}
              seed={noiseSeed + 4}
              result="swirl"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="swirl"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="ragged"
            />
            <feGaussianBlur in="ragged" stdDeviation="0.5" />
          </filter>
          <g
            transform={`translate(${storm.cx} ${storm.cy}) ${tilt} scale(${round(storm.size * 100) / 100})`}
            filter={`url(#${id}-swirl)`}
          >
            <ellipse
              cx="14"
              rx="16"
              ry="4"
              fill={accentColor}
              fillOpacity="0.15"
            />
            <ellipse rx="11" ry="7" fill={accentColor} fillOpacity="0.35" />
            <ellipse
              rx="8"
              ry="5"
              fill="none"
              stroke={accentColor}
              strokeOpacity="0.6"
              strokeWidth="1.2"
            />
            <ellipse
              rx="4.5"
              ry="2.8"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </g>
        </>
      )}
    </>
  );
}

/** Cooled, cracked crust of a lava world with relief, drawn under the shading. */
function LavaCrust({ id, seed }: DetailsProps) {
  const random = seededRandom(seed);
  const noiseSeed = Math.floor(random() * 10000);
  const scale = between(random, 0.7, 1.4);
  return (
    <>
      <NoiseLayer
        id={`${id}-crust-${noiseSeed}`}
        color="#000"
        frequency={`${0.04 * scale}`}
        octaves={4}
        seed={noiseSeed}
        threshold={0.45}
        contrast={1.4}
      />
      {/* Rough, solidified flows */}
      <Relief
        id={`${id}-relief-${noiseSeed}`}
        seed={noiseSeed + 1}
        frequency={0.07 * scale}
        height={3}
        strength={0.7}
      />
    </>
  );
}

/**
 * Glowing magma: lava lakes, main fissures and a fainter web of fine cracks between
 * crust plates. Drawn over the shading because lava gives off its own light, so it
 * also glows on the night side.
 */
function LavaGlow({
  id,
  seed,
  accentColor = "#ff7a1a",
  coreColor,
  poolColor = accentColor,
}: DetailsProps) {
  // Own stream, so the glow doesn't depend on how many values the crust used.
  const random = seededRandom(`${seed}:glow`);
  const noiseSeed = Math.floor(random() * 10000);
  const crackScale = between(random, 0.7, 1.4);
  const poolCover = between(random, 0.56, 0.64);
  return (
    <>
      <MagmaPools
        id={`${id}-lakes-${noiseSeed}`}
        seed={noiseSeed}
        frequency={0.03}
        cover={poolCover}
        colors={[poolColor, accentColor, coreColor ?? accentColor]}
      />
      {/* Fine cracks between the cooled crust plates */}
      <MagmaVeins
        id={`${id}-plates-${noiseSeed}`}
        color={poolColor}
        seed={noiseSeed + 1}
        frequency={0.08 * crackScale}
        octaves={2}
        width={0}
        coreColor={accentColor}
        intensity={0.7}
      />
      {/* Main fissures */}
      <MagmaVeins
        id={`${id}-cracks-${noiseSeed}`}
        color={accentColor}
        seed={noiseSeed + 2}
        frequency={0.03 * crackScale}
        octaves={3}
        width={2}
        coreColor={coreColor}
      />
    </>
  );
}

/** Thin, translucent ring bands, drawn as concentric ellipses (outermost first). */
function Rings({ color }: { color: string }) {
  return (
    <g fill="none" stroke={color}>
      <ellipse rx="92" ry="22" strokeWidth="1" strokeOpacity="0.35" />
      <ellipse rx="88" ry="21" strokeWidth="3.5" strokeOpacity="0.5" />
      <ellipse rx="84" ry="20" strokeWidth="1.5" strokeOpacity="0.3" />
      <ellipse rx="80" ry="19" strokeWidth="2.5" strokeOpacity="0.55" />
      <ellipse rx="76" ry="18" strokeWidth="0.8" strokeOpacity="0.3" />
    </g>
  );
}

/** An exoplanet drawn as an SVG, with a procedural texture, soft shading and optional rings. */
export function PlanetArt({
  exoplanet,
  seed = "",
  rings = false,
  className = "w-30",
}: PlanetArtProps) {
  // Derivated planet surface from exoplanet data
  // gas" if no data is available
  const surface = planetSurface(exoplanet) ?? "gas";

  // Colors passed as props win; the rest come from the seed's palette.
  const palette = planetPalette(seed, surface);
  const surfaceColor = palette.surfaceColor;
  const accentColor = palette.accentColor;
  const atmosphereColor = palette.atmosphereColor;
  const ringColor = rings ? palette.ringColor : undefined;
  const auraColor = palette.auraColor;

  // Filter/gradient ids must be unique per instance; useId's output contains characters invalid in url(#…).
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ringTilt = "rotate(-15)";
  const detailsProps = {
    id,
    seed: `${surface}:${seed}`,
    accentColor,
    coreColor: palette.coreColor,
    poolColor: palette.poolColor,
  };

  return (
    <svg
      viewBox="-50 -50 100 100"
      overflow="visible"
      className={`aspect-square ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter
          id={`${id}-aura`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <clipPath id={`${id}-planet`}>
          <circle r="50" />
        </clipPath>
        {/* Only the half of the ring that passes in front of the planet */}
        <clipPath id={`${id}-ring-front`}>
          <rect x="-110" y="0" width="220" height="40" transform={ringTilt} />
        </clipPath>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter id={`${id}-haze`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        {/* Light from the top-left; a soft terminator into a deep night side */}
        <radialGradient id={`${id}-shade`} cx="0.3" cy="0.28" r="0.78">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.35" />
          <stop offset="0.72" stopColor="#000" stopOpacity="0.8" />
          <stop offset="1" stopColor="#000" stopOpacity="0.94" />
        </radialGradient>
        {/* Darker toward the edge of the disc */}
        <radialGradient id={`${id}-limb`} r="0.5">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </radialGradient>
        {/* Haze of a thick atmosphere, seen edge-on near the limb */}
        <radialGradient id={`${id}-air`} r="0.5">
          <stop offset="0.75" stopColor={atmosphereColor} stopOpacity="0" />
          <stop offset="1" stopColor={atmosphereColor} stopOpacity="0.45" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={atmosphereColor} stopOpacity="0.95" />
          <stop offset="0.5" stopColor={atmosphereColor} stopOpacity="0.2" />
          <stop offset="0.8" stopColor={atmosphereColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Aura: a soft glow around the planet, in its surface's hue */}
      <circle
        r="56"
        fill={auraColor}
        opacity="0.28"
        filter={`url(#${id}-aura)`}
      />

      {ringColor && (
        <g transform={ringTilt}>
          <Rings color={ringColor} />
        </g>
      )}

      <g clipPath={`url(#${id}-planet)`}>
        <circle r="50" fill={surfaceColor} />
        {surface === "ocean" ? (
          <OceanDetails {...detailsProps} />
        ) : surface === "gas" ? (
          <GasDetails {...detailsProps} />
        ) : surface === "lava" ? (
          <LavaCrust {...detailsProps} />
        ) : (
          <RockyCrust {...detailsProps} />
        )}
        {(surface === "ocean" || surface === "gas") && (
          <circle r="50" fill={`url(#${id}-air)`} />
        )}
        <circle r="50" fill={`url(#${id}-shade)`} />
        {/* Gas giants darken strongly toward the edge of the disc */}
        {surface === "gas" && <circle r="50" fill={`url(#${id}-limb)`} />}
        {/* Magma gives off its own light, so it goes over the shading */}
        {(surface === "lava" || surface === "rocky") && (
          <>
            {surface === "lava" ? (
              <LavaGlow {...detailsProps} />
            ) : (
              <RockyGlow {...detailsProps} />
            )}
            <circle r="50" fill={`url(#${id}-limb)`} />
          </>
        )}
        {/* Atmosphere: a soft glow just inside the lit edge */}
        <circle
          r="49"
          fill="none"
          stroke={`url(#${id}-rim)`}
          strokeWidth="4"
          filter={`url(#${id}-haze)`}
        />
      </g>
      <circle
        r="49.7"
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="0.8"
      />

      {ringColor && (
        <g clipPath={`url(#${id}-ring-front)`}>
          <g transform={ringTilt}>
            <Rings color={ringColor} />
          </g>
        </g>
      )}
    </svg>
  );
}
