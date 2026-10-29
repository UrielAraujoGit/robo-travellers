const paths = {
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </>
  ),
  thermo: (
    <>
      <path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z" />
      <path d="M12 11v6" />
    </>
  ),
  distance: (
    <>
      <path d="M6 12h12" strokeDasharray="2 2.5" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="20" cy="12" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  planet: (
    <>
      <circle cx="12" cy="12" r="6" />
      <path d="M3 15c2 2 7 1 12-2s7-6 6-8c-1-1-3-1-5 0M8 19c-2 0-4 0-5-1" />
    </>
  ),
};

export type IconName = keyof typeof paths;

/** Line icon; `className` sets its size (22px wide by default). */
export function Icon({
  name,
  className = "w-5.5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={`fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] stroke-[1.6] ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
