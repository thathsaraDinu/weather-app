import type { WeatherAnalytics } from "../types/weather";

export async function getWeatherAnalytics(
  accessToken: string,
): Promise<WeatherAnalytics[]> {
  const response = await fetch("/api/analytics", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather analytics");
  }

  return response.json();
}