import { useId } from "react";

/**
 * A very dark planet shown while exoplanet data loads. It takes exactly the same
 * space as `PlanetArt` (same viewBox and default width), so swapping one for the
 * other doesn't shift the layout. A faint highlight slowly pulses to show it's
 * loading (disabled for users who prefer reduced motion).
 */
export function PlanetPlaceholder({ className = "w-30" }: { className?: string }) {
  // Gradient ids must be unique per instance; useId's output contains characters invalid in url(#…).
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <svg
      viewBox="-50 -50 100 100"
      overflow="visible"
      className={`aspect-square ${className}`}
      role="img"
      aria-label="Loading exoplanet"
    >
      <defs>
        {/* Same light direction as PlanetArt: top-left, night side bottom-right */}
        {/* The transparent stop switches from white to black at the same offset:
            fading straight from white to black would leave a grey veil in between */}
        <radialGradient id={`${id}-shade`} cx="0.3" cy="0.28" r="0.78">
          <stop offset="0" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a7fc0" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#8a7fc0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle r="50" fill="#0b0a14" />
      <circle r="50" fill={`url(#${id}-shade)`} />
      <g className="motion-safe:animate-pulse">
        <circle r="49.6" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="0.8" />
        <circle r="50" fill={`url(#${id}-shade)`} />
      </g>
    </svg>
  );
}
