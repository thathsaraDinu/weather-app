export interface OpenWeatherResponse {
  id: number;
  name: string;

  coord: {
    lat: number;
    lon: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  visibility: number;

  wind: {
    speed: number;
    deg?: number;
    gust?: number;
  };

  clouds: {
    all: number;
  };
}

export interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface TemperatureDataPoint {
  time: string;
  temperature: number;
}