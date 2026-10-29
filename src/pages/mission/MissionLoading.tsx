import { Icon } from "../../components/Icon";
import { Page } from "../../components/Page";
import { PlanetArt } from "../../components/PlanetArt";
import { PlanetPlaceholder } from "../../components/PlanetPlaceholder";
import { Rocket } from "../../components/Rocket";
import type { ExoplanetType } from "../../schemas/exoplanet.type";
import { BackToArchive } from "./MissionDetail";

interface MissionLoadingProps {
  /** Planet name from the URL, known before its data arrives. */
  name: string;
  /** The planet's data, once it has arrived (the dark placeholder is shown until then). */
  planet: ExoplanetType | null;
  robot: string;
  /** 0-100 */
  progress: number;
}

/** Transition while a mission loads: the robot's rocket flies toward its planet. */
export function MissionLoading({
  name,
  planet,
  robot,
  progress,
}: MissionLoadingProps) {
  const planetClass = "w-full";
  return (
    <Page>
      {/* Night sky over a mountain horizon, behind everything (the page's stars show through) */}
      <section className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_69%_40%,rgba(104,45,216,0.2),transparent_27%),linear-gradient(180deg,transparent,rgba(5,1,19,0.6)_70%,#110729)]">
        <div className="absolute top-[15%] right-[-19%] z-1 aspect-square w-[78vw] tablet:top-[12%] tablet:right-[7%] tablet:w-[min(38vw,610px)]">
          {planet ? (
            <PlanetArt
              exoplanet={planet}
              seed={planet.pl_name}
              className={planetClass}
            />
          ) : (
            <PlanetPlaceholder className={planetClass} />
          )}
        </div>
        <div className="absolute right-[-5%] bottom-[-5%] left-[-5%] z-2 h-[30%] bg-[linear-gradient(180deg,rgba(20,8,58,0.1),#010005_90%),linear-gradient(120deg,#12082e,#020108)] [clip-path:polygon(0_55%,9%_18%,18%_50%,28%_31%,38%_60%,48%_42%,60%_64%,73%_35%,82%_55%,91%_20%,100%_47%,100%_100%,0_100%)]" />
        <div className="absolute top-[35%] left-[8%] z-5 origin-left scale-66 tablet:top-[29%] tablet:left-[27%] tablet:scale-100">
          <Rocket label={`${robot} traveling by rocket`} />
        </div>
      </section>

      <BackToArchive />

      {/* Leaves room for the scene, which is absolutely positioned */}
      <div className="h-[max(720px,calc(100vh-120px))]" />

      <div className="absolute bottom-[16%] left-1/2 z-6 w-[calc(100%-36px)] -translate-x-1/2 text-center tablet:bottom-[28%] tablet:w-[min(520px,80vw)]">
        <div className="flex items-center justify-center gap-3 font-display text-[11px] leading-[normal] font-semibold tracking-[0.22em] text-[#b26bff]">
          <span className="h-px w-6 bg-[#b26bff]" /> ACQUIRING MISSION DATA
        </div>
        <h1 className="my-3 font-display text-[2rem] font-medium tablet:text-[clamp(2rem,3vw,3.2rem)]">
          The story of {robot}
        </h1>
        <p className="mx-auto mb-6.5 max-w-125 text-[13px] leading-[1.55] text-[#aaa3b9] tablet:text-[14px]">
          Establishing a secure link with {name}. Preparing surface reports and
          robot telemetry.
        </p>
        <div
          className="h-2.5 overflow-hidden rounded-full border border-[#211b4b] bg-[#0d0c29] p-0.5"
          role="progressbar"
          aria-label="Receiving mission data"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <i
            className="block h-full rounded-full bg-[linear-gradient(90deg,#5837ff,#f05aff)] shadow-[0_0_15px_#a742ff] transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <small className="mt-3 block text-[#8c849e]">
          Receiving mission data…{" "}
          <b className="ml-2.5 text-[#d7cdf0]">{Math.round(progress)}%</b>
        </small>
        <div className="mt-4.5 flex items-center justify-center gap-4.5 text-[#9185c2] tablet:mt-6.25">
          <span className="h-px w-17.5 bg-[#373052]" />
          <Icon name="planet" className="w-6" />
          <span className="h-px w-17.5 bg-[#373052]" />
        </div>
      </div>
    </Page>
  );
}
