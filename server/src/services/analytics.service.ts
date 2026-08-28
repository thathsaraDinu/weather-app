import { getCities } from "./city.service.js";
import { getWeatherByCityCode } from "./weather.service.js";
import { calculateComfortIndex } from "./comfort.service.js";

async function getForecastTemperatureTrend(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENWEATHER_API_KEY is not configured");
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/forecast");
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lon", lon.toString());
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");
  url.searchParams.set("cnt", "8");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OpenWeatherMap forecast request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.list || !Array.isArray(data.list)) {
    return [];
  }

  const trend = data.list.slice(0, 8).map((item: any) => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round(item.main.temp * 10) / 10,
    };
  });

  return trend;
}

export async function getWeatherAnalytics() {
  const cities = await getCities();

  const results = await Promise.all(
    cities.map(async (city) => {
      const weather = await getWeatherByCityCode(city.CityCode);
      
      const temperatureTrend = weather.coord 
        ? await getForecastTemperatureTrend(weather.coord.lat, weather.coord.lon)
        : [];

      return {
        cityCode: city.CityCode,
        cityName: city.CityName,
        weatherDescription: weather.weather[0]?.description ?? "Unknown",
        temperature: weather.main.temp,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        cloudiness: weather.clouds.all,
        pressure: weather.main.pressure,
        visibility: weather.visibility,
        comfortScore: calculateComfortIndex(weather),
        temperatureTrend,
      };
    }),
  );

  results.sort(
    (a, b) => b.comfortScore - a.comfortScore,
  );

  return results.map((city, index) => ({
    rank: index + 1,
    ...city,
  }));
}