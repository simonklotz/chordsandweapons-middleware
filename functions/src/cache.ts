import { getRedisClient } from "./redis";

export async function getFromCache<T>(key: string): Promise<T | null> {
  const client = await getRedisClient();
  const cached = await client.get(key);
  return cached ? JSON.parse(cached) : null;
}

export async function setToCache(key: string, value: any, ttl = 3600) {
  const client = await getRedisClient();
  await client.set(key, JSON.stringify(value), { EX: ttl });
}
