import { FitFrame } from "../../components/site/FitFrame";
import { Hero } from "../../components/site/Hero";

/* The landing page is the hero alone — the stickers are the navigation.
   No navbar here; each sticker is a doorway to its own page. */
export default function Home() {
  return (
    <FitFrame
      width={1440}
      height={800}
      className="fitframe-outer--cream"
      fluidBelow={1024}
      centered
    >
      <Hero />
    </FitFrame>
  );
}
