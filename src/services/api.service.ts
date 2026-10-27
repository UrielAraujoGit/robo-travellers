import { type ExoplanetType } from "../schemas/exoplanet.type";
import { supabase } from "../../scripts/db-connection";

export const apiGetAllExoplanets = async () => {
  const { data, error } = await supabase
    .from("exoplanets")
    .select("*")
    .limit(20);
  console.log("apiGetAllExoplanets", data, error);
  return data as ExoplanetType[] | null;
};
