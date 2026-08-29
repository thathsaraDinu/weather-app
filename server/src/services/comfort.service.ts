import type { OpenWeatherResponse } from "../types/weather.js";

const IDEAL_TEMPERATURE = 22;
const TEMPERATURE_TOLERANCE = 15;

const IDEAL_HUMIDITY = 50;
const HUMIDITY_TOLERANCE = 50;

const COMFORTABLE_WIND_SPEED = 2;
const MAX_WIND_PENALTY_SPEED = 10;

const COMFORTABLE_CLOUDINESS = 20;
const MAX_CLOUDINESS = 100;

const WEIGHTS = {
  temperature: 0.45,
  humidity: 0.25,
  wind: 0.15,
  cloudiness: 0.15,
} as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function calculateTemperatureScore(temperature: number): number {
  const deviation = Math.abs(temperature - IDEAL_TEMPERATURE);

  const score =
    100 - (deviation / TEMPERATURE_TOLERANCE) * 100;

  return clamp(score, 0, 100);
}

function calculateHumidityScore(humidity: number): number {
  const deviation = Math.abs(humidity - IDEAL_HUMIDITY);

  const score =
    100 - (deviation / HUMIDITY_TOLERANCE) * 100;

  return clamp(score, 0, 100);
}

function calculateWindScore(windSpeed: number): number {
  if (windSpeed <= COMFORTABLE_WIND_SPEED) {
    return 100;
  }

  const excessWind =
    windSpeed - COMFORTABLE_WIND_SPEED;

  const score =
    100 -
    (excessWind /
      (MAX_WIND_PENALTY_SPEED - COMFORTABLE_WIND_SPEED)) *
      100;

  return clamp(score, 0, 100);
}

function calculateCloudinessScore(cloudiness: number): number {
  if (cloudiness <= COMFORTABLE_CLOUDINESS) {
    return 100;
  }

  const excessCloudiness =
    cloudiness - COMFORTABLE_CLOUDINESS;

  const score =
    100 -
    (excessCloudiness /
      (MAX_CLOUDINESS - COMFORTABLE_CLOUDINESS)) *
      100;

  return clamp(score, 0, 100);
}

//calculate the comfort index
export function calculateComfortIndex(
  weather: OpenWeatherResponse,
): number {
  const temperatureScore = calculateTemperatureScore(
    weather.main.temp,
  );

  const humidityScore = calculateHumidityScore(
    weather.main.humidity,
  );

  const windScore = calculateWindScore(
    weather.wind.speed,
  );

  const cloudinessScore = calculateCloudinessScore(
    weather.clouds.all,
  );

  const score =
    temperatureScore * WEIGHTS.temperature +
    humidityScore * WEIGHTS.humidity +
    windScore * WEIGHTS.wind +
    cloudinessScore * WEIGHTS.cloudiness;

  return Number(clamp(score, 0, 100).toFixed(2));
}