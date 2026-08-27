import { useMemo, useState } from "react";
import CityCard from "./components/CityCard";
import { useWeatherAnalytics } from "./hooks/useWeatherAnalytics";

type SortOption = "comfort" | "temperature" | "name";

function App() {
  const { cities, loading, error } = useWeatherAnalytics();
  const [sortBy, setSortBy] = useState<SortOption>("comfort");

  const sortedCities = useMemo(() => {
    const result = [...cities];

    switch (sortBy) {
      case "temperature":
        return result.sort((a, b) => b.temperature - a.temperature);

      case "name":
        return result.sort((a, b) =>
          a.cityName.localeCompare(b.cityName),
        );

      case "comfort":
      default:
        return result.sort((a, b) => a.rank - b.rank);
    }
  }, [cities, sortBy]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-slate-500">Loading weather data...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-widest text-slate-500">
            WEATHER ANALYTICS
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Comfort Index
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Compare weather conditions across cities using our custom comfort
            scoring model.
          </p>
        </header>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {cities.length} cities analyzed
          </p>

          <label className="flex items-center gap-3 text-sm text-slate-600">
            Sort by

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              <option value="comfort">Comfort Score</option>
              <option value="temperature">Temperature</option>
              <option value="name">City Name</option>
            </select>
          </label>
        </div>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {sortedCities.map((city) => (
            <CityCard key={city.cityCode} city={city} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;