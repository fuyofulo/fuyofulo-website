import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

type WallImage = {
  src: string;
  alt: string;
};

function getWallImages(): WallImage[] {
  const dir = join(process.cwd(), "public", "wall-of-hope");
  try {
    const entries = readdirSync(dir).filter((name) => {
      const dot = name.lastIndexOf(".");
      if (dot === -1) return false;
      return IMAGE_EXTS.has(name.slice(dot).toLowerCase());
    });
    return entries
      .map((name) => ({ name, mtime: statSync(join(dir, name)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime)
      .map(({ name }) => ({
        src: `/wall-of-hope/${encodeURIComponent(name)}`,
        alt: altFromFilename(name),
      }));
  } catch {
    return [];
  }
}

function altFromFilename(name: string): string {
  const base = name.slice(0, name.lastIndexOf(".")) || name;
  const cleaned = base
    .replace(/^[-_0-9]+/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return cleaned || "image of hope";
}

export const metadata = {
  title: "wall of hope | fuyofulo",
  description: "Pictures that give me hope.",
};

export default function WallOfHopePage() {
  const images = getWallImages();

  return (
    <section className="window section-window wall-of-hope__window">
      <div className="window-title">
        <span>wall_of_hope.gif</span>
        <div className="window-actions" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="window-body">
        <div className="section-heading wall-of-hope__heading">
          <h2>Wall of Hope</h2>
          <p className="wall-of-hope__intro">
            Pictures that give me hope.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="wall-of-hope__empty">
            <p>The wall is empty — for now.</p>
            <p className="wall-of-hope__empty-hint">
              Drop images into <code>public/wall-of-hope/</code> and they
              show up here on the next build.
            </p>
          </div>
        ) : (
          <div className="wall-of-hope__grid">
            {images.map((image) => (
              <figure key={image.src} className="wall-of-hope__item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
