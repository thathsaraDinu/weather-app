import { useEffect, useState } from "react";
import { getWeatherAnalytics } from "../services/weather.service";
import type { WeatherAnalytics } from "../types/weather";

export function useWeatherAnalytics() {
  const [cities, setCities] = useState<WeatherAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getWeatherAnalytics();
        setCities(data);
      } catch {
        setError("Unable to load weather data.");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  return {
    cities,
    loading,
    error,
  };
}