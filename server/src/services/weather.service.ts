import {
  getCachedWeather,
  setCachedWeather,
} from "../cache/weather.cache.js";
import type { OpenWeatherResponse } from "../types/weather.js";

const OPENWEATHER_BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCityCode(cityCode: string) {
  const cachedWeather = getCachedWeather<OpenWeatherResponse>(cityCode);

  if (cachedWeather) {
    return cachedWeather;
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENWEATHER_API_KEY is not configured");
  }

  const url = new URL(OPENWEATHER_BASE_URL);

  url.searchParams.set("id", cityCode);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `OpenWeatherMap request failed: ${response.status} ${response.statusText}`,
    );
  }

  const weather: OpenWeatherResponse = await response.json();

  setCachedWeather(cityCode, weather);

  return weather;
}