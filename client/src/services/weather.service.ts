import type { WeatherAnalytics } from "../types/weather";

export async function getWeatherAnalytics(): Promise<
  WeatherAnalytics[]
> {
  const response = await fetch("/api/analytics");

  if (!response.ok) {
    throw new Error("Failed to fetch weather analytics");
  }

  return response.json();
}