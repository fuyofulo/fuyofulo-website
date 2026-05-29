import { Redis } from "@upstash/redis";

const KEY = "visitor:count";

// Vercel Marketplace injects KV_REST_API_URL + KV_REST_API_TOKEN.
// Falls back gracefully if env is missing so local dev without the
// vars doesn't crash — count just reads as 0.
function getClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function readVisitorCount(): Promise<number> {
  const redis = getClient();
  if (!redis) return 0;
  try {
    const value = await redis.get<number>(KEY);
    return typeof value === "number" && Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

export async function incrementVisitorCount(): Promise<number> {
  const redis = getClient();
  if (!redis) return 0;
  try {
    return await redis.incr(KEY);
  } catch {
    return 0;
  }
}
