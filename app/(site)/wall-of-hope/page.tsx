import type { Metadata } from "next";
import { SiteNav } from "../../../components/site/SiteNav";

export const metadata: Metadata = {
  title: "wall of hope | fuyofulo",
  description: "pictures that give me hope.",
};

/* Order matters — it's the order on the wall. To add a picture: drop the
   image in public/wall-of-hope and append a row here; the grid fills each
   row of four edge-to-edge and wraps. */
const PICTURES = [
  { src: "/wall-of-hope/allahsplan.webp", alt: "allah's plan" },
  { src: "/wall-of-hope/carsposter.webp", alt: "cars poster" },
  { src: "/wall-of-hope/farmerdog.webp", alt: "farmer and his dog" },
  { src: "/wall-of-hope/moisturized.webp", alt: "moisturized, unbothered" },
];

export default function WallOfHopePage() {
  return (
    <>
      <SiteNav variant="cordial" active="wall of hope" />
      <main className="wall-page">
        <div className="wall-container">
          <div className="wall-titlerow">
            <div className="wall-title-wrap">
              <span aria-hidden="true" className="wall-title wall-title--outline">
                wall of hope
              </span>
              <h1 className="wall-title">wall of hope</h1>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="wall-sun" src="/stickers/sun.webp" alt="smiling sun sticker" />
          </div>

          <p className="wall-subtitle">pictures that give me hope.</p>

          <div className="wall-wall">
            {PICTURES.map((p) => (
              <figure key={p.src} className="wall-mat">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
