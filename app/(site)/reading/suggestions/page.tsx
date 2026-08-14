import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../../../../components/site/SiteNav";
import { listSuggestions } from "../../../../lib/suggestions";

export const metadata: Metadata = {
  title: "suggestions | fuyofulo",
  description: "books people told me to read.",
};

/* Always fresh — the whole point is seeing what others just suggested. */
export const dynamic = "force-dynamic";

function when(at: number): string {
  return new Date(at)
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toLowerCase();
}

export default async function SuggestionsPage() {
  const suggestions = await listSuggestions();

  return (
    <>
      <SiteNav variant="espresso" active="reading" />
      <main className="sugg-page">
        <div className="sugg-container">
          <div className="sugg-title-wrap">
            <span aria-hidden="true" className="sugg-title sugg-title--outline">
              suggested by you
            </span>
            <h1 className="sugg-title">suggested by you</h1>
          </div>
          <p className="sugg-subtitle">
            books people told me to read.{" "}
            <Link href="/reading" className="sugg-back">
              add yours on the reading page →
            </Link>
          </p>

          {suggestions.length === 0 ? (
            <p className="sugg-empty">
              nothing here yet — be the first to scribble one down.
            </p>
          ) : (
            <div className="sugg-grid">
              {suggestions.map((s) => (
                <div key={s.id} className="sugg-note">
                  <div className="grain" style={{ opacity: 0.35 }} />
                  <div className="sugg-note-body">
                    <div className="sugg-book">{s.book}</div>
                    {s.why ? <div className="sugg-why">{s.why}</div> : null}
                    <div className="sugg-meta">
                      — {s.name} · {when(s.at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* the grain filter the notes reference */}
        <svg
          style={{ position: "absolute", width: 0, height: 0, visibility: "hidden" }}
          aria-hidden="true"
        >
          <defs>
            <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="8" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1" result="diffLight">
                <feDistantLight azimuth="45" elevation="35" />
              </feDiffuseLighting>
            </filter>
          </defs>
        </svg>
      </main>
    </>
  );
}
