import { Link } from "react-router";
import { Icon } from "../components/Icon";
import { Page } from "../components/Page";
import { PlanetArt } from "../components/PlanetArt";
import { useState, useEffect, useRef } from "react";
import type { ExoplanetType } from "../schemas/exoplanet.type";
import { apiGetRandomExoplanets } from "../services/api.service";
import { PlanetPlaceholder } from "../components/PlanetPlaceholder";

export function Home() {
  const [exoplanet, setExoplanet] = useState<ExoplanetType | null>(null);
  // Only the latest request may set the planet. In DEV, StrictMode runs this
  // effect twice: the first response is ignored, so the planet doesn't swap.
  const latestRequest = useRef(0);

  useEffect(() => {
    const request = ++latestRequest.current;

    const getRandomExoplanet = async () => {
      try {
        const results = await apiGetRandomExoplanets(1);
        const result = results?.[0];
        if (!result) throw new Error("random exoplanet is null");
        if (request === latestRequest.current) setExoplanet(result);
      } catch (error) {
        if (request === latestRequest.current) {
          console.error("error getting random exoplanet", error);
        }
      }
    };

    getRandomExoplanet();
  }, []);

  return (
    <Page>
      <section className="relative z-1 m-auto max-w-375 pt-13 tablet:min-h-[calc(100vh-96px)] tablet:pt-17.5 desktop:grid desktop:grid-cols-[46%_54%] desktop:items-center desktop:pt-0">
        <div className="desktop:pl-[3vw]">
          <div className="flex items-center gap-3 font-display text-[11px] leading-[normal] font-semibold tracking-[0.22em] text-accent">
            <span className="h-px w-6 bg-accent" /> DEEP SPACE ARCHIVE
          </div>
          <h1 className="mt-4.5 mb-6 font-display text-[clamp(3.1rem,16vw,4.4rem)] leading-[0.94] font-medium tracking-[-0.045em] tablet:mt-6 tablet:mb-8 tablet:text-[clamp(3.8rem,7vw,7.4rem)] tablet:leading-[0.92]">
            Worlds beyond.
            <br />
            <em className="text-transparent not-italic [-webkit-text-stroke:1px_#9182aa]">
              Stories within.
            </em>
          </h1>
          <p className="max-w-140 text-[15px] leading-[1.65] text-muted tablet:text-[17px] tablet:leading-[1.7]">
            Follow the autonomous explorers charting distant exoplanets,
            decoding their secrets, and building the first outposts beyond our
            solar system.
          </p>
          <Link
            to="/explore"
            className="mt-7 flex w-full items-center justify-between gap-8.75 rounded-[14px] border border-[#4d4388] px-4.5 py-4 font-display text-[12px] leading-[normal] font-semibold tracking-[0.12em] text-[#b9b3f5] shadow-[0_0_18px_rgba(76,57,155,0.1)] hover:border-[#7063bc] hover:bg-[rgba(92,70,190,0.09)] hover:text-[#e1ddff] tablet:mt-6.25 tablet:w-fit tablet:justify-start tablet:px-5.5 tablet:py-4.25"
          >
            Begin exploration <Icon name="arrow" />
          </Link>
          <div className="mt-8 flex items-center gap-3.75 tablet:mt-12.5">
            <strong className="font-display text-[30px] leading-[normal] font-normal text-accent">
              4
            </strong>
            <span className="font-display text-[9px] leading-normal font-medium tracking-[0.17em] text-[#71698f]">
              ACTIVE MISSIONS
              <br />
              ACROSS THE COSMOS
            </span>
          </div>
        </div>
        <div className="relative mt-3 flex h-90 items-center justify-center tablet:mt-0 tablet:h-125 desktop:h-[70vh]">
          <div className="relative grid size-[min(78vw,320px)] -rotate-12 place-items-center rounded-full after:absolute tablet:size-97.5 desktop:size-[min(39vw,610px)]">
            {exoplanet ? (
              <PlanetArt
                exoplanet={exoplanet}
                seed={exoplanet?.pl_name}
                className="w-[78%] tablet:w-[82%]"
              />
            ) : (
              <PlanetPlaceholder className="w-[78%] tablet:w-[82%]" />
            )}
          </div>
          <Link to={`/exoplanet/${exoplanet?.pl_name}`}>
            <div className="absolute right-0 bottom-[8%] hidden flex-col gap-1.25 border-l border-accent-purple pl-3.75 font-display tablet:flex">
              <span className="text-[9px] tracking-[0.15em] text-muted">
                MISSION 01
              </span>
              <strong className="text-[14px] tracking-[0.12em]">
                {exoplanet?.pl_name ?? "-"}
              </strong>
              <small className="text-[9px] tracking-[0.15em] text-muted">
                STATUS · TRANSMITTING
              </small>
            </div>
          </Link>
        </div>
      </section>
    </Page>
  );
}
