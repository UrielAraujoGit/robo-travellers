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

/** Characters with a meaning in PostgREST filters; stripped from user search text. */
const FILTER_SYNTAX = /[,()*%\\:]/g;

/** Exoplanets whose name or host star contains `query` (case-insensitive). */
export const apiSearchExoplanets = async (query: string, limit = 24) => {
  const term = query.replace(FILTER_SYNTAX, " ").trim();
  const { data, error } = await supabase
    .from("exoplanets")
    .select("*")
    .or(`pl_name.ilike.%${term}%,hostname.ilike.%${term}%`)
    .order("pl_name")
    .limit(limit);
  console.log("apiSearchExoplanets, query " + term, data, error);
  return data as ExoplanetType[] | null;
};

/** One exoplanet by its exact name; `null` when there's no planet with that name. */
export const apiGetExoplanet = async (name: string) => {
  const { data, error } = await supabase
    .from("exoplanets")
    .select("*")
    .eq("pl_name", name)
    .maybeSingle();
  console.log("apiGetExoplanet, name " + name, data, error);
  if (error) throw error;
  return data as ExoplanetType | null;
};
