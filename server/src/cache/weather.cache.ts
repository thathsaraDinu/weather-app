interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

interface CacheStatus {
  cityCode: string;
  expiresAt: number;
  status: "HIT" | "EXPIRED";
}

const cache = new Map<string, CacheEntry<unknown>>();

const CACHE_TTL = 5 * 60 * 1000;

export function getCachedWeather<T>(cityCode: string): T | null {
  const entry = cache.get(cityCode);

  if (!entry) {
    return null;
  }

  if (Date.now() >= entry.expiresAt) {
    cache.delete(cityCode);
    return null;
  }

  return entry.data as T;
}

export function setCachedWeather<T>(
  cityCode: string,
  data: T,
): void {
  cache.set(cityCode, {
    data,
    expiresAt: Date.now() + CACHE_TTL,
  });
}

export function getCacheStatus(): CacheStatus[] {
  const statuses: CacheStatus[] = [];

  for (const [cityCode, entry] of cache.entries()) {
    const isExpired = Date.now() >= entry.expiresAt;

    if (isExpired) {
      cache.delete(cityCode);

      statuses.push({
        cityCode,
        expiresAt: entry.expiresAt,
        status: "EXPIRED",
      });

      continue;
    }

    statuses.push({
      cityCode,
      expiresAt: entry.expiresAt,
      status: "HIT",
    });
  }

  return statuses;
}