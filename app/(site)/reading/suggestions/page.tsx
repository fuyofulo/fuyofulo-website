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
            <div className="sugg-table">
              {suggestions.map((s) => (
                <div key={s.id} className="sugg-row">
                  <span className="sugg-book">{s.book}</span>
                  <span className="sugg-why">{s.why}</span>
                  <span className="sugg-who">{s.name}</span>
                  <span className="sugg-when">{when(s.at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
