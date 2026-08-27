import { readFile } from "node:fs/promises";

interface City {
  CityCode: string;
  CityName: string;
  Temp: string;
  Status: string;
}

interface CitiesFile {
  List: City[];
}

export async function getCities(): Promise<City[]> {
  const file = await readFile(
    new URL("../../data/cities.json", import.meta.url),
    "utf-8"
  );

  const cities: CitiesFile = JSON.parse(file);

  return cities.List;
}