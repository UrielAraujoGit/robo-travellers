import { useEffect, useState } from "react";
import { Page } from "../components/Page";
import { PlanetArt } from "../components/PlanetArt";
import { PlanetPlaceholder } from "../components/PlanetPlaceholder";
import { type ExoplanetType } from "../schemas/exoplanet.type";
import { apiGetRandomExoplanets } from "../services/api.service";

// Placeholder until the Explore page from the Figma design is built:
// the exoplanet list that App used to render.
const PLANET_COUNT = 6;

export function Explore() {
  const [exoplanets, setExoplanets] = useState<ExoplanetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRandomExoplanets();
  }, []);

  const getRandomExoplanets = async () => {
    try {
      const result = await apiGetRandomExoplanets(PLANET_COUNT);
      if (result == null) {
        throw new Error("random exoplanets list is null");
      }
      setExoplanets(result);
    } catch (e) {
      console.error("error getting random exoplanets list");
    } finally {
      setLoading(false);
    }
  };

  // While loading, empty cards hold dark placeholder planets in the same spots
  const cards: (ExoplanetType | null)[] = loading
    ? Array.from({ length: PLANET_COUNT }, () => null)
    : exoplanets;

  return (
    <Page>
      <div className="relative gap-16 flex flex-wrap ">
        {cards.map((item, index) => (
          <div
            key={item?.pl_name ?? `loading-${index}`}
            className="border border-gray-800 rounded-2xl items-center justify-center flex py-3w-1/3 tablet:w-1/5 flex-wrap"
          >
            {item ? (
              <PlanetArt
                seed={item.pl_name}
                exoplanet={item}
                className="p-3 "
              />
            ) : (
              <PlanetPlaceholder className="p-3 " />
            )}
            <p>{item?.pl_name ?? "\u00a0"}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}
