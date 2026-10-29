import { type ExoplanetType } from "../schemas/exoplanet.type";
import { supabase } from "./db-connection.service";

export const apiGetAllExoplanets = async (limit = 10) => {
  const { data, error } = await supabase
    .from("exoplanets")
    .select("*")
    .limit(limit);
  console.log("apiGetAllExoplanets, limit" + limit, data, error);
  return data as ExoplanetType[] | null;
};

export const apiGetRandomExoplanets = async (limit = 10) => {
  const { data, error } = await supabase.rpc("get_random_exoplanets", {
    n: limit,
  });
  console.log("apiGetRandomExoplanets, limit" + limit, data, error);
  return data as ExoplanetType[] | null;
};
