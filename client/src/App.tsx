import { useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CityCard from "./components/CityCard";
import { useWeatherAnalytics } from "./hooks/useWeatherAnalytics";

type SortOption = "comfort" | "temperature" | "name";

function App() {
  const { isLoading, isAuthenticated, user, loginWithRedirect, logout } =
    useAuth0();

  const { cities, loading, error } = useWeatherAnalytics();

  const [sortBy, setSortBy] = useState<SortOption>("comfort");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

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

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="text-center">
          <div className="mb-4 text-5xl animate-bounce">🌤️</div>
          <p className="text-lg font-medium text-indigo-600 dark:text-indigo-300">
            Loading authentication...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 transition-colors dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwIDIgMiAyIDJzLTIgMi00IDJ6Ii8+PHBhdGggZD0iTTI0IDQ0YzAtMiAyLTQgMi00cy0yLTItNC0yYzAgMCAyIDIgMiAycy0yIDItNCAyeiIvPjxwYXRoIGQ9Ik00NCAyNGMwLTIgMi00IDItNHMtMi0yLTQtMmMwIDAgMiAyIDIgMnMtMiAyLTQgMnoiLz48cGF0aCBkPSJNMzYgMTRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwIDIgMiAyIDJzLTIgMi00IDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <div className="relative">
              <div className="mb-4 text-7xl">🌍</div>
              <p className="text-sm font-bold tracking-[0.3em] text-white/90 uppercase">
                Weather Analytics
              </p>
              <h1 className="mt-3 text-4xl font-black text-white tracking-tight">
                Comfort Index
              </h1>
            </div>
          </div>

          <div className="p-8 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Discover the world's most comfortable cities through our unique weather scoring system.
            </p>

            <button
              onClick={() => {
                console.log("Login clicked");
                loginWithRedirect();
              }}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white shadow-lg transition-all hover:shadow-2xl hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sign In
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>

            <button
              onClick={() => setDarkMode((value) => !value)}
              className="mt-4 flex items-center justify-center gap-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/30"
            >
              {darkMode ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 text-5xl animate-pulse">🌡️</div>
          <p className="text-lg font-medium text-indigo-600 dark:text-indigo-300">
            Gathering weather data from around the world...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border-2 border-red-200 bg-white p-8 shadow-xl dark:border-red-900/50 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-3xl dark:bg-red-950/50">
                ⚠️
              </div>
              <div>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">Weather Data Unavailable</p>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 transition-colors sm:px-6 lg:px-8 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="relative">
            <div className="absolute -top-4 -left-4 text-6xl opacity-20">🌍</div>
            <div className="relative">
              <p className="mb-2 text-sm font-bold tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase">
                Weather Analytics
              </p>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
                Comfort Index
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                Our algorithm analyzes temperature, humidity, wind speed, and cloudiness to determine the world's most comfortable cities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Welcome back</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode((value) => !value)}
              className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-xl shadow-lg transition-all hover:scale-110 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
              className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-lg transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="mb-8 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl shadow-lg">
                📊
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Cities Analyzed
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {cities.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                >
                  <option value="comfort">🏆 Comfort Score</option>
                  <option value="temperature">🌡️ Temperature</option>
                  <option value="name">🏙️ City Name</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {sortedCities.map((city) => (
            <CityCard key={city.cityCode} city={city} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;