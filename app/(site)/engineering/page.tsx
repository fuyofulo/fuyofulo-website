import type { Metadata } from "next";
import { FitFrame } from "../../../components/site/FitFrame";
import { SiteNav } from "../../../components/site/SiteNav";
import { Engineering } from "../../../components/site/Engineering";

export const metadata: Metadata = {
  title: "engineering | fuyofulo",
  description:
    "things i'm building right now, programs and fellowships i've been part of, and experiments in between.",
};

/* Designed as a 1440x1580 frame whose first 800px is the on-load viewport;
   Other Projects sits below the fold. Both numbers drop the design's 64px
   navbar row, since the navbar renders outside the scaled frame:
   1580 - 64 = 1516 total, 800 - 64 = 736 above the fold. */
export default function EngineeringPage() {
  return (
    <>
      <SiteNav variant="navy" />
      <FitFrame
        width={1440}
        height={1516}
        foldHeight={736}
        className="fitframe-outer--navy fitframe-outer--below-nav"
      >
        <Engineering />
      </FitFrame>
    </>
  );
}
