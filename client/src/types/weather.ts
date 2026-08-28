export interface WeatherAnalytics {
  rank: number;
  cityCode: string;
  cityName: string;
  weatherDescription: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
  pressure: number;
  visibility: number;
  comfortScore: number;
  temperatureTrend: TemperatureDataPoint[];
}

export interface TemperatureDataPoint {
  time: string;
  temperature: number;
}