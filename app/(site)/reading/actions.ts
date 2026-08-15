"use server";

import { headers } from "next/headers";
import { addSuggestion, isRateLimited } from "../../../lib/suggestions";

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rate" | "unavailable" };

const MAX = { name: 40, book: 80, why: 240 } as const;

export async function submitSuggestion(
  formData: FormData,
): Promise<SubmitResult> {
  /* Honeypot: real visitors never see this field. A filled value gets a
     quiet "success" so bots don't learn anything. */
  if (String(formData.get("website") ?? "").length > 0) {
    return { ok: true };
  }

  const name = String(formData.get("name") ?? "").trim().slice(0, MAX.name);
  const book = String(formData.get("book") ?? "").trim().slice(0, MAX.book);
  const why = String(formData.get("why") ?? "").trim().slice(0, MAX.why);

  if (!name || !book) {
    return { ok: false, reason: "invalid" };
  }

  /* client-controlled header — cap length so it can't bloat the redis key */
  const ip = (
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  ).slice(0, 45);
  if (await isRateLimited(ip)) {
    return { ok: false, reason: "rate" };
  }

  const stored = await addSuggestion({ name, book, why });
  return stored ? { ok: true } : { ok: false, reason: "unavailable" };
}
