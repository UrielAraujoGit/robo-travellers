import { type ExoplanetType } from "../schemas/exoplanet.type";
import { supabase } from "./db-connection.service";

export const apiGetAllExoplanets = async () => {
  const { data, error } = await supabase.from("exoplanets").select("*");
  console.log("apiGetAllExoplanets", data, error);
  return data as ExoplanetType[] | null;
};
