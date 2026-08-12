import { programs, projects } from "../../lib/site-content";

/* Pixel monitor: the 1512x945 Decimal mock scaled to a 420px-wide screen. */
const MON_W = 420;
const MON_SCREEN_H = 240;
const MON_SCALE = 0.2778;

const CHECKER_LIGHT = "#eeebda";
const CHECKER_DARK = "#3a3e63";

/* Four strips forming the checkered bezel. Start colors are offset per edge so
   the 10px cells tile correctly around the corners. */
const EDGES = [
  {
    key: "top",
    style: { left: 0, top: 0, right: 0, height: 10 },
    gradient: `repeating-linear-gradient(90deg, ${CHECKER_LIGHT} 0 10px, ${CHECKER_DARK} 10px 20px)`,
  },
  {
    key: "bottom",
    style: { left: 0, bottom: 0, right: 0, height: 10 },
    gradient: `repeating-linear-gradient(90deg, ${CHECKER_DARK} 0 10px, ${CHECKER_LIGHT} 10px 20px)`,
  },
  {
    key: "left",
    style: { left: 0, top: 10, bottom: 10, width: 10 },
    gradient: `repeating-linear-gradient(180deg, ${CHECKER_DARK} 0 10px, ${CHECKER_LIGHT} 10px 20px)`,
  },
  {
    key: "right",
    style: { right: 0, top: 10, bottom: 10, width: 10 },
    gradient: `repeating-linear-gradient(180deg, ${CHECKER_LIGHT} 0 10px, ${CHECKER_DARK} 10px 20px)`,
  },
] as const;

/* Positions are from the design's section top-right corner. The navbar is
   rendered outside this frame, so every `top` is the design value minus the
   64px the navbar row occupied. */
const NAV_ROW = 64;

const PIXEL_STICKERS = [
  { src: "/stickers/pixel-retro-pc.png", alt: "pixel retro pc", width: 230, right: 65, top: 115 },
  { src: "/stickers/pixel-pikachu.png", alt: "pixel pikachu", width: 180, right: 420, top: 230 },
  { src: "/stickers/pixel-cat-sleeping.png", alt: "sleeping pixel cat", width: 180, right: 225, top: 380 },
  { src: "/stickers/pixel-monster.png", alt: "pixel energy drink", width: 100, right: 60, top: 525 },
] as const;

export function Engineering() {
  return (
    <div className="eng-frame">
      {PIXEL_STICKERS.map((s) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={s.src}
          className="eng-sticker"
          src={s.src}
          alt={s.alt}
          style={{ width: s.width, right: s.right, top: s.top - NAV_ROW }}
        />
      ))}

      <div className="eng-content">
        <h1 className="eng-title">Software Engineering</h1>

        {/* ---- programs & fellowships ---- */}
        <div className="eng-programs">
          <h2 className="eng-h2--sm">Programs &amp; Fellowships</h2>
          <div className="eng-list">
            {programs.map((p) => (
              <a
                key={p.name}
                className="eng-row"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="eng-row-head">
                  <span className="eng-row-name">{p.name}</span>
                  <span className="eng-row-dates">{p.dates}</span>
                </div>
                <div className="eng-row-desc">{p.description}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ---- decimal ---- */}
        <div className="eng-decimal">
          <div className="decimal-block">
            <div className="monitor-wrap">
              <div className="monitor" style={{ width: MON_W }}>
                {EDGES.map((e) => (
                  <div
                    key={e.key}
                    className="monitor-edge"
                    style={{ ...e.style, background: e.gradient }}
                    aria-hidden="true"
                  />
                ))}
                <div className="monitor-screen" style={{ height: MON_SCREEN_H }}>
                  <iframe
                    src="/decimal-screen.html"
                    title="decimal.finance product interface"
                    scrolling="no"
                    style={{ transform: `scale(${MON_SCALE})` }}
                  />
                </div>
              </div>
            </div>

            <div className="decimal-copy">
              <div className="decimal-name">Decimal</div>
              <p>
                Self-driving accounts payable. AI reads vendor bills, codes them to
                your books, and pays them on time — you just approve.
              </p>
              <p>
                Building the AI layer that turns every incoming bill — from inbox
                to paid — into a single approval.
              </p>
              <a
                className="decimal-link"
                href="https://decimal.finance"
                target="_blank"
                rel="noopener noreferrer"
              >
                visit decimal.finance →
              </a>
            </div>
          </div>
        </div>

        {/* ---- other projects (below the fold) ---- */}
        <div className="eng-projects">
          <h2 className="eng-h2">Other Projects</h2>
          <div className="projects-card">
            <div className="projects-grid">
              {projects.map((p) => (
                <a
                  key={p.name}
                  className="project"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-head">
                    <span className="project-name">{p.name}</span>
                    <span className="project-tags">{p.tags}</span>
                  </div>
                  <div className="project-desc">{p.description}</div>
                </a>
              ))}
            </div>

            <a
              className="projects-all"
              href="https://github.com/fuyofulo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ccffbc">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              all projects →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
