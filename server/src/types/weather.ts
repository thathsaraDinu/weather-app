export interface OpenWeatherResponse {
  id: number;
  name: string;

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