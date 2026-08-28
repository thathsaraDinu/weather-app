import type { WeatherAnalytics } from "../types/weather";
import TemperatureTrend from "./TemperatureTrend";

interface CityCardProps {
  city: WeatherAnalytics;
}

function getComfortColor(score: number): string {
  if (score >= 70) return "from-emerald-500 to-teal-500";
  if (score >= 50) return "from-amber-500 to-orange-500";
  return "from-rose-500 to-pink-500";
}

function getWeatherIcon(description: string): string {
  const desc = description.toLowerCase();
  if (desc.includes("clear")) return "☀️";
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("mist") || desc.includes("fog")) return "🌫️";
  if (desc.includes("thunder")) return "⛈️";
  return "🌤️";
}

function CityCard({ city }: CityCardProps) {
  const comfortColor = getComfortColor(city.comfortScore);
  const weatherIcon = getWeatherIcon(city.weatherDescription);

  return (
    <article className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-600">
      <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
      
      <div className="relative flex items-start gap-5">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
          city.rank <= 3 
            ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/30" 
            : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 dark:from-slate-700 dark:to-slate-600 dark:text-white shadow-slate-500/20"
        }`}>
          {city.rank <= 3 ? ["🥇", "🥈", "🥉"][city.rank - 1] : `#${city.rank}`}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {city.cityName}
            </h2>
            <span className="text-3xl transition-transform group-hover:scale-125" role="img" aria-label="weather">
              {weatherIcon}
            </span>
          </div>

          <p className="mt-2 text-sm font-medium capitalize text-slate-500 dark:text-slate-400">
            {city.weatherDescription}
          </p>
        </div>
      </div>

      <div className="my-8">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-xs font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
            Comfort Score
          </span>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {city.comfortScore.toFixed(1)}
            </span>

            <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
              /100
            </span>
          </div>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${comfortColor} transition-all duration-700 ease-out shadow-lg`}
            style={{ width: `${city.comfortScore}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <span className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
          <span className="text-lg">📈</span>
          <span>24H Temperature Trend</span>
        </span>
        <TemperatureTrend data={city.temperatureTrend} />
      </div>

      <div className="grid grid-cols-2 gap-4 border-t-2 border-slate-100 pt-6 dark:border-slate-800">
        <WeatherStat
          label="Temperature"
          value={`${city.temperature.toFixed(1)}°C`}
          icon="🌡️"
        />

        <WeatherStat
          label="Humidity"
          value={`${city.humidity}%`}
          icon="💧"
        />

        <WeatherStat
          label="Wind"
          value={`${city.windSpeed.toFixed(1)} m/s`}
          icon="💨"
        />

        <WeatherStat
          label="Cloudiness"
          value={`${city.cloudiness}%`}
          icon="☁️"
        />
      </div>
    </article>
  );
}

interface WeatherStatProps {
  label: string;
  value: string;
  icon: string;
}

function WeatherStat({ label, value, icon }: WeatherStatProps) {
  return (
    <div className="group/stat flex items-center gap-4 rounded-2xl border-2 border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/30">
      <span className="text-2xl transition-transform group-hover/stat:scale-125" role="img" aria-label={label}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="mt-1 text-lg font-black text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

export default CityCard;