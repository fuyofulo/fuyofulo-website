"use client";

import Link from "next/link";
import { useState } from "react";
import { heroContent } from "../../lib/site-content";
import { useMusicPlayer } from "../portal/MusicPlayer";
import { VinylSheen } from "./VinylSheen";

/* Hero "14a" — a 1440x800 canvas of hand-placed stickers with two layouts:
   chaos (scattered, rotated) and clean (tidy rows, mostly 0°). One state
   variable drives every coordinate; CSS transitions morph between them.

   EVERY coordinate below was hand-placed in the design tool and verified
   against the handoff's data-props schema (design_handoff_hero_14a). Do not
   "tidy" or round them. Positions are from the frame's top-left. */

type Mode = "chaos" | "clean";
type Pose = { x: number; y: number; r: number; w: number };

const EASE = "cubic-bezier(.22,1,.36,1)";
const MORPH = `.9s ${EASE}`;

/* The -baked.png nav stickers carry a white outline + shadow as transparent
   padding; render them oversized with a negative margin so the *visible* art
   matches the pose width. pad ÷ nominal width. */
const PAD = {
  books: 0.1427,
  typewriter: 0.172,
  camera: 0.1807,
  vinyl: 0.1656,
} as const;

type NavSticker = {
  key: string;
  href: string;
  /** opens in a new tab (external destination) */
  external?: boolean;
  title: string;
  src: string;
  alt: string;
  /** overhang pad ratio for -baked images; plain image when absent */
  pad?: number;
  z: number;
  chaos: Pose;
  clean: Pose;
};

const NAV_STICKERS: NavSticker[] = [
  {
    key: "books",
    href: "/reading",
    title: "reading",
    src: "/stickers/books-stack-baked.webp",
    alt: "stack of vintage books",
    pad: PAD.books,
    z: 12,
    chaos: { x: 204, y: 515, r: -3, w: 240 },
    clean: { x: 210, y: 0, r: 0, w: 305 },
  },
  {
    key: "typewriter",
    href: "https://fuyofulo.substack.com",
    external: true,
    title: "writing",
    src: "/stickers/typewriter-watercolor-baked.webp",
    alt: "vintage typewriter",
    pad: PAD.typewriter,
    z: 12,
    chaos: { x: 1060, y: 510, r: 13, w: 230 },
    clean: { x: 820, y: 515, r: 0, w: 245 },
  },
  {
    key: "camera",
    href: "https://vsco.co/fuyofulo/gallery",
    external: true,
    title: "gallery",
    src: "/stickers/camera-baked.webp",
    alt: "vintage film camera",
    pad: PAD.camera,
    z: 12,
    chaos: { x: 1110, y: 60, r: 14, w: 250 },
    clean: { x: 525, y: 635, r: 0, w: 180 },
  },
  {
    key: "crt",
    href: "/engineering",
    title: "software",
    src: "/stickers/crt-tv.webp",
    alt: "retro CRT tv",
    z: 9,
    chaos: { x: 195, y: 70, r: 0, w: 140 },
    clean: { x: 75, y: 570, r: 0, w: 175 },
  },
  {
    key: "pinboard",
    href: "/wall-of-hope",
    title: "wall of hope",
    src: "/stickers/pinboard-baked.webp",
    alt: "wall of hope pinboard",
    z: 12,
    chaos: { x: 1140, y: 300, r: -3, w: 255 },
    clean: { x: 1095, y: 26, r: 0, w: 315 },
  },
];

/* Vinyl is the sixth "nav" sticker but acts as a music toy, not a link. */
const VINYL = {
  z: 12,
  chaos: { x: 90, y: 340, r: 2, w: 155 },
  clean: { x: 1205, y: 565, r: 0, w: 165 },
} as const;

type DecoSticker = {
  src: string;
  alt: string;
  z: number;
  /** nearest-neighbor scaling for pixel art only */
  pixel?: boolean;
  chaos: Pose;
  clean: Pose;
  /** rainbow only: explicit heights (image is stretched horizontally in clean) */
  chaosH?: number;
  cleanH?: number;
};

const DECO_STICKERS: DecoSticker[] = [
  { src: "/stickers/pixel-blob-laptop.png", alt: "pixel blob with laptop and coffee", z: 18, pixel: true,
    chaos: { x: 418, y: 641, r: -6, w: 101 }, clean: { x: 895, y: 65, r: 0, w: 115 } },
  { src: "/stickers/pixel-blob-chef.png", alt: "pixel blob chef with pan", z: 11, pixel: true,
    chaos: { x: 285, y: 155, r: -8, w: 120 }, clean: { x: 290, y: 655, r: 0, w: 115 } },
  { src: "/stickers/pixel-solana-coin.png", alt: "pixel solana coin", z: 11, pixel: true,
    chaos: { x: 350, y: 125, r: 10, w: 60 }, clean: { x: 705, y: 580, r: 0, w: 70 } },
  { src: "/stickers/mac-folder.webp", alt: "blue mac folder", z: 30,
    chaos: { x: 225, y: 190, r: 0, w: 70 }, clean: { x: 735, y: 190, r: 0, w: 85 } },
  { src: "/stickers/magnifying-glass.webp", alt: "watercolor magnifying glass", z: 11,
    chaos: { x: 381, y: 592, r: -32, w: 90 }, clean: { x: 320, y: 570, r: 38, w: 90 } },
  { src: "/stickers/iced-coffee.webp", alt: "iced coffee cup", z: 11,
    chaos: { x: 1240, y: 580, r: -9, w: 90 }, clean: { x: 1070, y: 635, r: -10, w: 75 } },
  { src: "/stickers/croissant.webp", alt: "croissant", z: 13,
    chaos: { x: 96, y: 637, r: 3, w: 98 }, clean: { x: 745, y: 665, r: 17, w: 105 } },
  { src: "/stickers/paper-globe.webp", alt: "paper collage globe", z: 11,
    chaos: { x: 159, y: 592, r: 0, w: 113 }, clean: { x: 860, y: 150, r: 0, w: 110 } },
  { src: "/stickers/fountain-pen.webp", alt: "brass fountain pen", z: 8,
    chaos: { x: 1270, y: 560, r: 117, w: 115 }, clean: { x: 535, y: 145, r: 56, w: 145 } },
  { src: "/stickers/keyboard.webp", alt: "mechanical keyboard", z: 28,
    chaos: { x: 130, y: 105, r: -50, w: 85 }, clean: { x: 680, y: 5, r: -90, w: 120 } },
  { src: "/stickers/spiderman.webp", alt: "spiderman sticker", z: 17,
    chaos: { x: 975, y: 45, r: -8, w: 175 }, clean: { x: 40, y: 75, r: 0, w: 190 } },
  { src: "/stickers/sun.webp", alt: "smiling sun sticker", z: 25,
    chaos: { x: 1280, y: 40, r: 10, w: 110 }, clean: { x: 490, y: 60, r: 0, w: 110 } },
  { src: "/stickers/paper-ball.webp", alt: "crumpled paper ball", z: 11,
    chaos: { x: 945, y: 615, r: -79, w: 100 }, clean: { x: 1065, y: 545, r: 0, w: 65 } },
  { src: "/stickers/lightbulb.webp", alt: "painted lightbulb", z: 11,
    chaos: { x: 1010, y: 565, r: -17, w: 100 }, clean: { x: 1015, y: 135, r: -19, w: 85 } },
  { src: "/stickers/map-pin.webp", alt: "hand-drawn map pin", z: 25,
    chaos: { x: 1285, y: 155, r: -4, w: 60 }, clean: { x: 435, y: 675, r: -13, w: 50 } },
  /* Rainbow: source is 584x356. Height comes from the size value
     (165 -> 101, 135 -> 82); width is size x stretch (chaos 165x1 = 165,
     clean 135x1.35 = 182) — the image deliberately stretches in clean. */
  { src: "/stickers/rainbow.webp", alt: "embroidered rainbow patch", z: 18,
    chaos: { x: 1090, y: 145, r: -3, w: 165 }, chaosH: 101,
    clean: { x: 440, y: 560, r: -15, w: 182 }, cleanH: 82 },
];

const SHADOW_SOFT = "drop-shadow(0 4px 10px rgba(0,0,0,.15))";
const SHADOW_DEEP = "drop-shadow(0 8px 18px rgba(0,0,0,.22))";

/* Baked image with the white outline overhanging the layout box. */
function OverhangImg({ src, alt, w, pad }: { src: string; alt: string; w: number; pad: number }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      style={{
        width: w * (1 + 2 * pad),
        margin: -(w * pad),
        maxWidth: "none",
        display: "block",
        transition: `width ${MORPH}, margin ${MORPH}`,
      }}
    />
  );
}

export function Hero() {
  const [mode, setMode] = useState<Mode>("chaos");
  const { playing, toggle } = useMusicPlayer();
  const clean = mode === "clean";

  const pose = (s: { chaos: Pose; clean: Pose }) => (clean ? s.clean : s.chaos);
  const place = (p: Pose, z: number): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: z,
    transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.r}deg)`,
    transition: `transform ${MORPH}`,
  });

  const vinylPose = pose(VINYL);
  const vw = vinylPose.w;

  return (
    <div className="hero14-scene">
      {/* ---- hero text ---- */}
      <div className="hero14-text">
        <div
          className="hero14-namerow"
          style={{
            transform: `translate(${clean ? -280 : 0}px, ${clean ? 50 : -40}px)`,
          }}
        >
          <div className="hero14-name-wrap">
            <div
              aria-hidden="true"
              className="hero14-name hero14-name--shadow"
              style={{ fontSize: clean ? 100 : 86 }}
            >
              {heroContent.name}
            </div>
            <h1 className="hero14-name" style={{ fontSize: clean ? 100 : 86 }}>
              {heroContent.name}
            </h1>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero14-smile"
            src="/stickers/fuyosmile-sticker.webp"
            alt="fuyo smile"
            style={{ width: clean ? 140 : 120 }}
          />
        </div>

        <div
          className="hero14-bio"
          style={{
            transform: `translate(${clean ? 320 : 0}px, ${clean ? -75 : -50}px)`,
          }}
        >
          <div className="hero14-tag" style={{ fontSize: clean ? 15.5 : 14 }}>
            {heroContent.role}
          </div>
          <p className="hero14-bio-text" style={{ fontSize: clean ? 13 : 13.5 }}>
            building{" "}
            <a
              className="hero14-bio-link"
              href="https://decimal.finance"
              target="_blank"
              rel="noopener noreferrer"
            >
              decimal
            </a>{" "}
            — teaching AI to pay the bills. everything
            <br className="hero14-bio-br" />{" "}
            else about me is scattered around this page.
          </p>
        </div>
      </div>

      {/* ---- nav stickers ---- */}
      {NAV_STICKERS.map((s) => {
        const p = pose(s);
        const inner = (
          <div className="hero14-lift">
            {s.pad != null ? (
              <div style={{ width: p.w, transition: `width ${MORPH}` }}>
                <OverhangImg src={s.src} alt={s.alt} w={p.w} pad={s.pad} />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={s.src}
                alt={s.alt}
                style={{
                  width: p.w,
                  display: "block",
                  filter: SHADOW_DEEP,
                  transition: `width ${MORPH}`,
                }}
              />
            )}
          </div>
        );
        /* External destinations (VSCO, Substack) open in a new tab; internal
           ones stay client-side so the music keeps playing. */
        return s.external ? (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.title}
            className="hero14-sticker"
            style={place(p, s.z)}
          >
            {inner}
          </a>
        ) : (
          <Link
            key={s.key}
            href={s.href}
            title={s.title}
            className="hero14-sticker"
            style={place(p, s.z)}
          >
            {inner}
          </Link>
        );
      })}

      {/* ---- vinyl: music toy ---- */}
      <button
        type="button"
        onClick={toggle}
        title={playing ? "music — playing" : "music — click to spin"}
        aria-label={playing ? "pause music" : "play music"}
        className="hero14-sticker hero14-vinyl"
        style={place(vinylPose, VINYL.z)}
      >
        <div style={{ width: vw, transition: `width ${MORPH}` }}>
          <div
            style={{
              position: "relative",
              width: vw,
              height: (vw * 902) / 924,
              transition: `width ${MORPH}, height ${MORPH}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/stickers/vinyl-player-baked.webp"
              alt="pink vinyl turntable"
              style={{
                position: "absolute",
                left: -(vw * PAD.vinyl),
                top: -(vw * PAD.vinyl),
                width: vw * (1 + 2 * PAD.vinyl),
                maxWidth: "none",
                display: "block",
                transition: `width ${MORPH}, left ${MORPH}, top ${MORPH}`,
              }}
            />
            {playing ? <VinylSheen blur={6} /> : null}
          </div>
        </div>
      </button>

      {/* ---- decorative stickers ---- */}
      {DECO_STICKERS.map((s) => {
        const p = pose(s);
        const h = clean ? s.cleanH : s.chaosH;
        return (
          <div key={s.src} className="hero14-deco" style={place(p, s.z)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              style={{
                width: p.w,
                height: h ?? "auto",
                display: "block",
                imageRendering: s.pixel ? "pixelated" : undefined,
                filter: SHADOW_SOFT,
                transition: `width ${MORPH}, height ${MORPH}`,
              }}
            />
          </div>
        );
      })}

      {/* ---- mode toggle ---- */}
      <div className="hero14-toggle">
        <div className="hero14-toggle-btns">
          <button
            type="button"
            aria-label="chaos mode"
            aria-pressed={!clean}
            onClick={() => setMode("chaos")}
            className={`hero14-toggle-btn${clean ? "" : " hero14-toggle-btn--active"}`}
          >
            {/* Lucide "shuffle" (ISC) — scatter the stickers */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 14 4 4-4 4" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
              <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
              <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="cleaned-up mode"
            aria-pressed={clean}
            onClick={() => setMode("clean")}
            className={`hero14-toggle-btn${clean ? " hero14-toggle-btn--active" : ""}`}
          >
            {/* Lucide "brush-cleaning" (ISC) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m16 22-1-4" />
              <path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" />
              <path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" />
              <path d="m8 22 1-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
