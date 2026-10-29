import { Link } from "react-router";
import { Icon, type IconName } from "../../components/Icon";
import { Page } from "../../components/Page";
import { useScrollParallax } from "../../hooks/useScrollParallax";
import { PlanetArt } from "../../components/PlanetArt";
import type { ExoplanetType } from "../../schemas/exoplanet.type";
import {
  formatDistance,
  formatOrbitalPeriod,
  formatSurface,
  formatTemperature,
} from "../../utils/exoplanet-format";
import { inHabitableZone, missionLog } from "../../utils/mission-log";
import { planetSurface } from "../../utils/planet-surface";

/**
 * Scroll speed of each backdrop layer relative to the page (the log moves at 1):
 * slower layers feel farther away.
 */
const PARALLAX = { stars: 0.1, planet: 0.3 };

/** Vertical offset that makes a fixed layer move up at `speed` × the scroll. */
const parallax = (speed: number) => `calc(var(--scroll-y, 0px) * ${-speed})`;

/** A planet's mission: the planet, large, beside the robot's log. */
export function MissionDetail({
  planet,
  robot,
}: {
  planet: ExoplanetType;
  robot: string;
}) {
  useScrollParallax();
  const surface = planetSurface(planet);
  const badges: { icon: IconName; text: string }[] = [
    { icon: "distance", text: formatDistance(planet.sy_dist) },
    { icon: "planet", text: formatSurface(surface) },
    { icon: "thermo", text: formatTemperature(planet.pl_eqt) },
    { icon: "clock", text: `Year: ${formatOrbitalPeriod(planet.pl_orbper)}` },
  ];

  return (
    <Page>
      <BackToArchive />

      {/* Fixed backdrop on every screen size: the log scrolls over it, while the
          stars and the planet drift up more slowly (parallax, see PARALLAX) */}
      <section className="fixed inset-0 overflow-hidden bg-[radial-gradient(circle_at_31%_43%,rgba(116,50,217,0.4),transparent_29%),radial-gradient(circle_at_55%_88%,rgba(79,34,185,0.3),transparent_39%),linear-gradient(#010107_5%,#07031b_58%,#160b3b_100%)]">
        <div
          className="starfield absolute inset-0 opacity-70"
          style={{ backgroundPosition: `0 ${parallax(PARALLAX.stars)}` }}
        />
        <div className="absolute top-[17%] left-1/2 z-1 w-[min(88vw,480px)] -translate-x-1/2 tablet:top-[15%] tablet:w-[min(70vw,560px)] desktop:top-[17%] desktop:left-[8%] desktop:w-[min(46vw,700px)] desktop:translate-x-0">
          <div
            className="will-change-transform"
            style={{
              transform: `translate3d(0, ${parallax(PARALLAX.planet)}, 0)`,
            }}
          >
            <PlanetArt
              exoplanet={planet}
              seed={planet.pl_name}
              className="w-full"
            />
          </div>
        </div>
        {/* Blurs the part of the planet behind the log, more and more toward the
            text, so it stays readable while the left of the planet stays sharp */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-2 hidden w-[60%] backdrop-blur-[10px] mask-[linear-gradient(90deg,transparent,black_35%)] desktop:block" />
        <div className="pointer-events-none absolute inset-0 z-4 bg-[linear-gradient(180deg,transparent_45%,rgba(1,1,7,0.8)_100%)] desktop:bg-[linear-gradient(90deg,transparent_0_39%,rgba(1,1,7,0.18)_47%,rgba(1,1,7,0.72)_100%)]" />
      </section>

      <article className="relative z-7 mx-auto mt-[46vh] max-w-180 rounded-t-[20px] bg-[linear-gradient(180deg,rgba(5,3,16,0.82),#020108_170px)] px-5.5 pt-8 pb-14.5 backdrop-blur-[14px] tablet:mt-[52vh] tablet:rounded-t-3xl tablet:px-7 tablet:pt-9.5 tablet:pb-17.5 desktop:mt-[max(1.5rem,calc(20vh-160px))] desktop:mr-[3vw] desktop:ml-auto desktop:w-[45%] desktop:max-w-172.5 desktop:rounded-none desktop:bg-none desktop:px-0 desktop:pt-0 desktop:pb-16 desktop:backdrop-blur-none">
        <div className="flex items-center gap-3 font-display text-[11px] leading-[normal] font-semibold tracking-[0.22em] text-[#b375ff]">
          <span className="h-px w-6 bg-[#b375ff]" /> EXOPLANET
        </div>
        <h1 className="mt-2.5 mb-4.25 font-display text-[3rem] leading-[1.05] font-medium tracking-[-0.045em] desktop:text-[clamp(3rem,4.4vw,5.2rem)]">
          {planet.pl_name}
        </h1>
        <div className="mb-5 grid grid-cols-2 gap-x-0 gap-y-3 tablet:flex tablet:flex-wrap desktop:mb-4.5 desktop:gap-y-2">
          {badges.map(({ icon, text }) => (
            <span
              key={icon}
              className="flex items-center gap-2 border-[rgba(139,124,174,0.28)] px-2.5 text-[11px] text-[#9cadb6] odd:border-r odd:pl-0 tablet:border-r tablet:px-3 tablet:text-[12px] tablet:first:pl-0 tablet:last:border-0 desktop:px-4.25"
            >
              <Icon name={icon} className="w-4.25 shrink-0" />
              {text}
            </span>
          ))}
        </div>
        {inHabitableZone(planet) && (
          <b className="mb-6.5 inline-block rounded-full border border-[#357b75] px-3 py-1.5 font-display text-[9px] leading-[normal] font-medium tracking-[0.13em] text-[#73d5c9] desktop:mb-8">
            HABITABLE ZONE
          </b>
        )}
        <h2 className="mt-3.75 mb-3.5 font-display text-[1.65rem] leading-[1.2] font-normal tablet:text-[clamp(1.5rem,2vw,2.2rem)]">
          The story of {robot}
        </h2>
        {missionLog(planet, robot).map((paragraph) => (
          <p
            key={paragraph}
            className="mb-3.5 text-[13px] leading-[1.65] text-[#c0bacf] tablet:leading-[1.55]"
          >
            {paragraph}
          </p>
        ))}
      </article>
    </Page>
  );
}

export function BackToArchive() {
  return (
    <Link
      to="/explore"
      className="relative z-12 mt-4 inline-block rounded-full bg-[rgba(11,8,25,0.45)] px-3 py-2.25 font-display text-[9px] leading-[normal] font-semibold tracking-[0.13em] text-[#81799e] hover:text-foreground tablet:mt-7 tablet:px-3.75 tablet:py-2.5"
    >
      ← &nbsp; BACK TO ARCHIVE
    </Link>
  );
}
