import { describe, expect, it } from "vitest";
import { calculateComfortIndex } from "../services/comfort.service.js";
import type { OpenWeatherResponse } from "../types/weather.js";

function createWeather(
  overrides: Partial<{
    temperature: number;
    humidity: number;
    windSpeed: number;
    cloudiness: number;
  }> = {},
): OpenWeatherResponse {
  return {
    id: 1,
    name: "Test City",
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    main: {
      temp: overrides.temperature ?? 22,
      feels_like: 22,
      temp_min: 22,
      temp_max: 22,
      pressure: 1010,
      humidity: overrides.humidity ?? 50,
    },
    visibility: 10000,
    wind: {
      speed: overrides.windSpeed ?? 2,
    },
    clouds: {
      all: overrides.cloudiness ?? 20,
    },
  };
}

describe("calculateComfortIndex", () => {
  it("returns 100 for ideal conditions", () => {
    const weather = createWeather();

    expect(calculateComfortIndex(weather)).toBe(100);
  });

  it("returns a lower score when temperature moves away from ideal", () => {
    const idealWeather = createWeather();

    const hotWeather = createWeather({
      temperature: 35,
    });

    const idealScore = calculateComfortIndex(idealWeather);
    const hotScore = calculateComfortIndex(hotWeather);

    expect(hotScore).toBeLessThan(idealScore);
  });

  it("returns a lower score for high humidity", () => {
    const idealWeather = createWeather();

    const humidWeather = createWeather({
      humidity: 90,
    });

    const idealScore = calculateComfortIndex(idealWeather);
    const humidScore = calculateComfortIndex(humidWeather);

    expect(humidScore).toBeLessThan(idealScore);
  });

  it("returns a lower score for high wind speed", () => {
    const idealWeather = createWeather();

    const windyWeather = createWeather({
      windSpeed: 10,
    });

    const idealScore = calculateComfortIndex(idealWeather);
    const windyScore = calculateComfortIndex(windyWeather);

    expect(windyScore).toBeLessThan(idealScore);
  });

  it("returns a lower score for high cloudiness", () => {
    const idealWeather = createWeather();

    const cloudyWeather = createWeather({
      cloudiness: 100,
    });

    const idealScore = calculateComfortIndex(idealWeather);
    const cloudyScore = calculateComfortIndex(cloudyWeather);

    expect(cloudyScore).toBeLessThan(idealScore);
  });

  it("always returns a score between 0 and 100", () => {
    const extremeWeather = createWeather({
      temperature: 50,
      humidity: 100,
      windSpeed: 50,
      cloudiness: 100,
    });

    const score = calculateComfortIndex(extremeWeather);

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});