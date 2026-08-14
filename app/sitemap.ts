import type { MetadataRoute } from "next";

/* Internal navigation uses QuietLink (no hrefs, no status-bar preview), so
   crawlers discover the pages here instead of by following links. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fuyofulo.com";
  return ["", "/reading", "/engineering", "/wall-of-hope"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
