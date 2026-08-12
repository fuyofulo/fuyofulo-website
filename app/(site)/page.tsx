import { FitFrame } from "../../components/site/FitFrame";
import { Hero, MobileHero } from "../../components/site/Hero";

/* The landing page is the hero alone — the stickers are the navigation.
   Desktop: the 1440x800 hand-placed scene, scaled to the window by FitFrame.
   <=768px: a separate hand-specced mobile layout (centered identity + labelled
   sticker grid), toggled purely by CSS media query so the correct layout is
   painted first with no hydration swap. */
export default function Home() {
  return (
    <>
      <div className="hero-desktop-only">
        <FitFrame
          width={1440}
          height={800}
          className="fitframe-outer--cream"
          centered
        >
          <Hero />
        </FitFrame>
      </div>
      <div className="hero-mobile-only">
        {/* Same fit-to-screen treatment as desktop: the 390x844 composition
            scales to the phone's actual viewport so nothing falls off the
            bottom. Own var namespace so it can't fight the hidden desktop
            frame's scale vars. */}
        <FitFrame
          width={390}
          height={844}
          className="fitframe-outer--cream"
          varPrefix="--fitm"
          centered
        >
          <MobileHero />
        </FitFrame>
      </div>
    </>
  );
}
