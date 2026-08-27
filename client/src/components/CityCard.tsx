import type { WeatherAnalytics } from "../types/weather";

interface CityCardProps {
  city: WeatherAnalytics;
}

function CityCard({ city }: CityCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700">
          #{city.rank}
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-slate-900">
            {city.cityName}
          </h2>

          <p className="mt-1 capitalize text-sm text-slate-500">
            {city.weatherDescription}
          </p>
        </div>
      </div>

      <div className="my-6">
        <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400">
            COMFORT SCORE
            </span>

            <div>
            <span className="text-3xl font-bold text-slate-900">
                {city.comfortScore.toFixed(1)}
            </span>

            <span className="ml-1 text-sm text-slate-400">/ 100</span>
            </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
            className="h-full rounded-full bg-slate-700 transition-all"
            style={{ width: `${city.comfortScore}%` }}
            />
        </div>
        </div>

      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
        <WeatherStat
          label="Temperature"
          value={`${city.temperature.toFixed(1)}°C`}
        />

        <WeatherStat
          label="Humidity"
          value={`${city.humidity}%`}
        />

        <WeatherStat
          label="Wind"
          value={`${city.windSpeed.toFixed(1)} m/s`}
        />

        <WeatherStat
          label="Cloudiness"
          value={`${city.cloudiness}%`}
        />
      </div>
    </article>
  );
}

interface WeatherStatProps {
  label: string;
  value: string;
}

function WeatherStat({ label, value }: WeatherStatProps) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-medium text-slate-700">{value}</p>
    </div>
  );
}

export default CityCard;