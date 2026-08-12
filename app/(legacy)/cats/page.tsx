import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

type CatImage = {
  src: string;
  alt: string;
};

function getCatImages(): CatImage[] {
  const dir = join(process.cwd(), "public", "cats");
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
        src: `/cats/${encodeURIComponent(name)}`,
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
  return cleaned || "cat";
}

export const metadata = {
  title: "cats | fuyofulo",
  description: "Cat photos.",
};

export default function CatsPage() {
  const images = getCatImages();

  return (
    <section className="window section-window cats__window">
      <div className="window-title">
        <span>cats.htm</span>
        <div className="window-actions" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="window-body">
        <div className="section-heading cats__heading">
          <h2>Cats</h2>
          <p className="cats__intro">Cat photos.</p>
        </div>

        {images.length === 0 ? (
          <div className="cats__empty">
            <p>No cats yet — for now.</p>
            <p className="cats__empty-hint">
              Drop images into <code>public/cats/</code> and they show up here
              on the next build.
            </p>
          </div>
        ) : (
          <div className="cats__grid">
            {images.map((image) => (
              <figure key={image.src} className="cats__item">
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
