import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Page } from "../components/Page";
import type { ExoplanetType } from "../schemas/exoplanet.type";
import { apiGetExoplanet } from "../services/api.service";
import { robotDesignation } from "../utils/robot-designation";
import { BackToArchive, MissionDetail } from "./mission/MissionDetail";
import { MissionLoading } from "./mission/MissionLoading";

/** The transition plays at least this long, even when the data arrives sooner. */
const MIN_TRANSITION_MS = 15000;
/** Pause at 100% before showing the mission. */
const COMPLETE_PAUSE_MS = 450;
/** The progress bar starts here and waits at the cap until the data has arrived. */
const PROGRESS_START = 8;
const PROGRESS_CAP = 96;

type Status = "loading" | "ready" | "missing" | "failed";

/** Route `/exoplanet/:id`, where `id` is the planet name. */
export function MissionRoute() {
  const { id = "" } = useParams();
  // A new planet starts over with a fresh transition
  return <Mission key={id} name={id} />;
}

function Mission({ name }: { name: string }) {
  const robot = robotDesignation(name);
  const [planet, setPlanet] = useState<ExoplanetType | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [elapsed, setElapsed] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  // Only the latest request may set the planet (StrictMode runs effects twice in DEV)
  const latestRequest = useRef(0);

  useEffect(() => {
    const request = ++latestRequest.current;
    const startedAt = Date.now();
    // Drives the progress bar; stops once the minimum duration has passed
    const ticker = window.setInterval(() => {
      const time = Date.now() - startedAt;
      setElapsed(time);
      if (time >= MIN_TRANSITION_MS) window.clearInterval(ticker);
    }, 100);

    apiGetExoplanet(name)
      .then((result) => {
        if (request !== latestRequest.current) return;
        setPlanet(result);
        setStatus(result ? "ready" : "missing");
      })
      .catch((error) => {
        if (request !== latestRequest.current) return;
        console.error("error getting exoplanet", error);
        setStatus("failed");
      });

    return () => window.clearInterval(ticker);
  }, [name]);

  const complete = status === "ready" && elapsed >= MIN_TRANSITION_MS;

  useEffect(() => {
    if (!complete) return;
    const timer = window.setTimeout(
      () => setShowDetail(true),
      COMPLETE_PAUSE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [complete]);

  if (status === "missing" || status === "failed") {
    return (
      <Page>
        <BackToArchive />
        <p className="relative p-25 text-center text-muted">
          {status === "missing"
            ? `No signal from “${name}”. It isn't in the archive.`
            : "Signal lost. Couldn't reach the archive, try again later."}
        </p>
      </Page>
    );
  }

  if (showDetail && planet)
    return <MissionDetail planet={planet} robot={robot} />;

  const progress = complete
    ? 100
    : Math.min(
        PROGRESS_CAP,
        PROGRESS_START +
          ((PROGRESS_CAP - PROGRESS_START) * elapsed) / MIN_TRANSITION_MS,
      );
  return (
    <MissionLoading
      name={name}
      planet={planet}
      robot={robot}
      progress={progress}
    />
  );
}
