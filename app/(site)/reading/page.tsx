import type { Metadata } from "next";
import { FitFrame } from "../../../components/site/FitFrame";
import { Reading } from "../../../components/site/Reading";
import { SiteNav } from "../../../components/site/SiteNav";

export const metadata: Metadata = {
  title: "reading | fuyofulo",
  description:
    "books i'm making my way through — slowly, with pencil in hand.",
};

/* The navbar sits outside the scaled frame so it renders at its true height,
   identical to /engineering and /writing. Inside a FitFrame it would be multiplied by
   the frame scale and read noticeably thicker than the same bar elsewhere.
   736 = the design's 800px frame minus its 64px navbar row. */
export default function ReadingPage() {
  return (
    <>
      <SiteNav variant="espresso" active="reading" />
      <FitFrame
        width={1440}
        height={736}
        className="fitframe-outer--espresso fitframe-outer--below-nav"
      >
        <Reading />
      </FitFrame>
    </>
  );
}
