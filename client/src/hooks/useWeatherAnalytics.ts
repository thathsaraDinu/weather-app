import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getWeatherAnalytics } from "../services/weather.service";
import type { WeatherAnalytics } from "../types/weather";

export function useWeatherAnalytics() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [cities, setCities] = useState<WeatherAnalytics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    async function loadAnalytics() {
      setLoading(true);
      setError(null);

      try {
        const token = await getAccessTokenSilently();

        const data = await getWeatherAnalytics(token);
        setCities(data);
      } catch {
        setError("Unable to load weather data.");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, [isAuthenticated, getAccessTokenSilently]);

  return {
    cities,
    loading,
    error,
  };
}