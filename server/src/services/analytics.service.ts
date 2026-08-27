import { getCities } from "./city.service.js";
import { getWeatherByCityCode } from "./weather.service.js";
import { calculateComfortIndex } from "./comfort.service.js";

export async function getWeatherAnalytics() {
  const cities = await getCities();

  const results = await Promise.all(
    cities.map(async (city) => {
      const weather = await getWeatherByCityCode(city.CityCode);

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