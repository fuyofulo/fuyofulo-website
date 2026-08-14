import { Redis } from "@upstash/redis";

/* Book suggestions from the reading page's sticky note, newest first.
   Same Upstash store as the visitor counter; same graceful degradation
   when the env isn't present (local dev without pulled vars). */

const LIST_KEY = "book-suggestions";
const RATE_PREFIX = "rl:suggest:";
const RATE_LIMIT = 5; // per IP...
const RATE_WINDOW_S = 60 * 60; // ...per hour

export type Suggestion = {
  id: string;
  name: string;
  book: string;
  why: string;
  at: number;
};

function getClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function addSuggestion(
  entry: Omit<Suggestion, "id" | "at">,
): Promise<boolean> {
  const redis = getClient();
  if (!redis) return false;
  try {
    const suggestion: Suggestion = {
      ...entry,
      id: crypto.randomUUID(),
      at: Date.now(),
    };
    await redis.lpush(LIST_KEY, JSON.stringify(suggestion));
    return true;
  } catch {
    return false;
  }
}

export async function listSuggestions(limit = 200): Promise<Suggestion[]> {
  const redis = getClient();
  if (!redis) return [];
  try {
    const raw = await redis.lrange<string | Suggestion>(LIST_KEY, 0, limit - 1);
    return raw
      .map((item) => {
        try {
          return typeof item === "string"
            ? (JSON.parse(item) as Suggestion)
            : item;
        } catch {
          return null;
        }
      })
      .filter((s): s is Suggestion => s !== null && !!s.book);
  } catch {
    return [];
  }
}

/** true = this IP is over the hourly limit */
export async function isRateLimited(ip: string): Promise<boolean> {
  const redis = getClient();
  if (!redis) return false;
  try {
    const key = `${RATE_PREFIX}${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, RATE_WINDOW_S);
    return count > RATE_LIMIT;
  } catch {
    return false;
  }
}
