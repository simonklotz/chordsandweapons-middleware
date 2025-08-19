import { defineString } from "firebase-functions/params";
import { createClient } from "redis";

const redisUrl = defineString("REDIS_URL");

export async function getRedisClient() {
  const client = createClient({ url: redisUrl.value() });
  client.on("error", (err) => console.error("Redis Client Error:", err));
  await client.connect();
  return client;
}
