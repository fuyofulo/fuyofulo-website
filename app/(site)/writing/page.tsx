import type { Metadata } from "next";
import { SiteNav } from "../../../components/site/SiteNav";
import { Writing } from "../../../components/site/Writing";

export const metadata: Metadata = {
  title: "writing | fuyofulo",
  description: "essays and notes — on substack, quick notes on medium.",
};

export default function WritingPage() {
  return (
    <>
      <SiteNav variant="paper" />
      <main className="page">
        <Writing />
      </main>
    </>
  );
}
