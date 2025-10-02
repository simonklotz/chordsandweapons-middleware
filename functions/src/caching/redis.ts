import { defineString } from "firebase-functions/params";
import { createClient } from "redis";

type RedisClientType = ReturnType<typeof createClient>;

const redisUrl = defineString("REDIS_URL");

let _client: RedisClientType | null = null;
let _connecting: Promise<RedisClientType> | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  // Reuse if already connected
  if (_client && _client.isOpen) {
    return _client;
  }

  // If a connection is in progress, await it
  if (_connecting) {
    return _connecting;
  }

  // Start a single connection attempt
  const client = createClient({ url: redisUrl.value() });
  client.on("error", (err) => console.error("Redis Client Error:", err));

  _connecting = client
    .connect()
    .then(() => {
      _client = client;
      return client;
    })
    .finally(() => {
      _connecting = null;
    });

  return _connecting;
}

// Optional: clean shutdown in emulator/dev
process.on("beforeExit", async () => {
  if (_client && _client.isOpen) {
    try {
      await _client.quit();
    } catch {}
  }
});
