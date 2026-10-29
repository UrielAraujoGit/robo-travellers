import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Icon, type IconName } from "../components/Icon";
import { Page } from "../components/Page";
import { PlanetArt } from "../components/PlanetArt";
import { PlanetPlaceholder } from "../components/PlanetPlaceholder";
import { type ExoplanetType } from "../schemas/exoplanet.type";
import {
  apiGetRandomExoplanets,
  apiSearchExoplanets,
} from "../services/api.service";
import {
  formatDistance,
  formatOrbitalPeriod,
  formatSurface,
  formatTemperature,
} from "../utils/exoplanet-format";
import { planetSurface } from "../utils/planet-surface";

/** Random planets shown before searching (two rows of the 4-column grid). */
const PLANET_COUNT = 8;
/** Wait this long after the last keystroke before searching. */
const SEARCH_DELAY_MS = 300;

/** Route of a planet's detail page (not built yet). */
const missionPath = (planet: ExoplanetType) =>
  `/exoplanet/${encodeURIComponent(planet.pl_name)}`;

export function Explore() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [exoplanets, setExoplanets] = useState<ExoplanetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  // Only the latest request may update the list (an older, slower one is ignored)
  const latestRequest = useRef(0);

  useEffect(() => {
    const request = ++latestRequest.current;
    const search = query.trim();
    const timer = window.setTimeout(
      async () => {
        try {
          const result = search
            ? await apiSearchExoplanets(search)
            : await apiGetRandomExoplanets(PLANET_COUNT);
          if (result == null) throw new Error("exoplanets list is null");
          if (request === latestRequest.current) {
            setExoplanets(result);
            setFailed(false);
          }
        } catch (error) {
          console.error("error getting exoplanets", error);
          if (request === latestRequest.current) setFailed(true);
        } finally {
          if (request === latestRequest.current) setLoading(false);
        }
      },
      search ? SEARCH_DELAY_MS : 0,
    );
    return () => window.clearTimeout(timer);
  }, [query]);

  const surpriseMe = () => {
    if (exoplanets.length === 0) return;
    const planet = exoplanets[Math.floor(Math.random() * exoplanets.length)];
    navigate(missionPath(planet));
  };

  // While loading, empty cards hold dark placeholder planets in the same spots
  const cards: (ExoplanetType | null)[] = loading
    ? Array.from({ length: PLANET_COUNT }, () => null)
    : exoplanets;

  return (
    <Page>
      <div className="relative z-2 pt-10.5 pb-6.25 tablet:flex tablet:items-end tablet:justify-between tablet:pt-15 tablet:pb-9.5">
        <div>
          <div className="flex items-center gap-3 font-display text-[11px] leading-[normal] font-semibold tracking-[0.22em] text-accent">
            <span className="h-px w-6 bg-accent" /> MISSION CATALOG
          </div>
          <h1 className="mt-3 mb-1.75 font-display text-[2.65rem] leading-none font-medium tracking-[-0.045em] tablet:mt-3.75 tablet:text-[clamp(2.5rem,5vw,4.5rem)] tablet:leading-[normal]">
            Explore new worlds
          </h1>
          <p className="mb-5.5 text-[14px] text-muted tablet:mb-0 tablet:text-[16px]">
            Search the archive. Follow the signal.
          </p>
        </div>
        <button
          type="button"
          onClick={surpriseMe}
          disabled={exoplanets.length === 0}
          className="cursor-pointer rounded-[13px] border border-[#3c3065] bg-[rgba(14,10,31,0.45)] px-4 py-3.5 font-display text-[10px] leading-[normal] font-semibold tracking-[0.14em] text-accent hover:border-[#53418c] disabled:cursor-default disabled:opacity-50 tablet:text-[11px]"
        >
          SURPRISE ME{" "}
          <span className="ml-3.5 text-[16px] tablet:ml-4.5 tablet:text-[18px]">
            ↗
          </span>
        </button>
      </div>

      <label className="relative z-2 flex h-13.5 items-center gap-3.5 rounded-[15px] border border-line bg-[rgba(7,5,20,0.9)] px-4 tablet:h-14.5 tablet:rounded-[18px] tablet:px-5">
        <Icon name="search" className="w-5.5 shrink-0 text-accent" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setLoading(true);
          }}
          placeholder="Search by planet or host star…"
          aria-label="Search exoplanets"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-0 placeholder:text-muted tablet:text-[16px]"
        />
        <span
          className="hidden font-display text-[10px] leading-[normal] font-medium tracking-[0.14em] text-[#777091] tablet:inline"
          aria-live="polite"
        >
          {loading ? "SCANNING…" : `${exoplanets.length} WORLDS`}
        </span>
      </label>

      {failed ? (
        <p className="relative p-25 text-center text-muted">
          Signal lost. Couldn't reach the archive, try again later.
        </p>
      ) : !loading && exoplanets.length === 0 ? (
        <p className="relative p-25 text-center text-muted">
          No signal found. Try another search.
        </p>
      ) : (
        <section
          className="relative z-2 mt-4 grid grid-cols-1 gap-3.5 tablet:mt-5 tablet:grid-cols-2 tablet:gap-4 desktop:grid-cols-4"
          aria-busy={loading}
        >
          {cards.map((planet, index) =>
            planet ? (
              <PlanetCard key={planet.pl_name} planet={planet} index={index} />
            ) : (
              <LoadingCard key={`loading-${index}`} />
            ),
          )}
        </section>
      )}
    </Page>
  );
}

const cardClass =
  "relative block min-h-115 overflow-hidden rounded-[20px] border border-line bg-[linear-gradient(145deg,rgba(11,8,27,0.97),rgba(3,3,12,0.99))] tablet:min-h-122.5 tablet:rounded-3xl";

const cardTopClass =
  "flex justify-between gap-3 p-4.5 font-display text-[10px] leading-[normal] font-medium tracking-[0.13em] text-[#746c91]";

function PlanetCard({
  planet,
  index,
}: {
  planet: ExoplanetType;
  index: number;
}) {
  const facts: { icon: IconName; label: string; value: string }[] = [
    {
      icon: "planet",
      label: "CLASS",
      value: formatSurface(planetSurface(planet)),
    },
    {
      icon: "thermo",
      label: "SURFACE",
      value: formatTemperature(planet.pl_eqt),
    },
    {
      icon: "clock",
      label: "YEAR",
      value: formatOrbitalPeriod(planet.pl_orbper),
    },
  ];

  return (
    <Link
      to={missionPath(planet)}
      aria-label={`Explore ${planet.pl_name}`}
      className={`${cardClass} transition duration-250 hover:-translate-y-1.25 hover:border-[#53418c] hover:shadow-[0_18px_50px_rgba(33,17,87,0.25)]`}
    >
      <div className={cardTopClass}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="truncate uppercase">{planet.hostname}</span>
      </div>
      <PlanetArt
        exoplanet={planet}
        seed={planet.pl_name}
        className="mx-auto mt-1.25 mb-5 w-35.5 tablet:w-37.5"
      />
      <div className="px-5.5 pb-20">
        <p className="mb-1.75 font-display text-[9px] leading-[normal] font-medium tracking-[0.15em] text-accent uppercase">
          {formatDistance(planet.sy_dist)}
        </p>
        <h2 className="font-display text-[23px] leading-[normal] font-medium tracking-[-0.03em] tablet:text-[25px]">
          {planet.pl_name}
        </h2>
        <div className="mt-4.25 grid gap-2.5 border-t border-line pt-3.75">
          {facts.map(({ icon, label, value }) => (
            <span
              key={label}
              className="grid grid-cols-[27px_1fr] grid-rows-[auto_auto]"
            >
              <Icon name={icon} className="row-span-2 w-5.5 text-[#8880ad]" />
              <i className="font-display text-[8px] leading-[normal] font-medium tracking-[0.14em] text-[#777091] not-italic">
                {label}
              </i>
              <b className="text-[12px] font-normal text-[#c9c2dd]">{value}</b>
            </span>
          ))}
        </div>
      </div>
      <span className="absolute inset-x-5.5 bottom-5 flex justify-between border-t border-line pt-4 font-display text-[9px] leading-[normal] font-semibold tracking-[0.13em] text-[#9990b7]">
        VIEW MISSION <Icon name="arrow" className="w-5.5" />
      </span>
    </Link>
  );
}

/** Same shape as PlanetCard, with a dark placeholder planet and empty text lines. */
function LoadingCard() {
  return (
    <div className={cardClass} aria-hidden="true">
      <div className={cardTopClass}>
        <span className="h-3 w-5 rounded bg-white/5" />
        <span className="h-3 w-16 rounded bg-white/5" />
      </div>
      <PlanetPlaceholder className="mx-auto mt-1.25 mb-5 w-35.5 tablet:w-37.5" />
      <div className="px-5.5">
        <span className="mb-3 block h-2.5 w-24 rounded bg-white/5" />
        <span className="block h-6 w-36 rounded bg-white/5" />
      </div>
    </div>
  );
}
