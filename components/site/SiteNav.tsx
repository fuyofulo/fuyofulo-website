"use client";

import Link from "next/link";
import { useMusicPlayer } from "../portal/MusicPlayer";

/* Palette per section, matching frames 9a/9b/9c in the handoff. Each page
   declares its own variant now that the sections are separate routes. */
const VARIANTS = {
  cream: { className: "nav-cream", mascot: "/stickers/fuyosmile-sticker.webp" },
  espresso: { className: "nav-espresso", mascot: "/stickers/fuyosmile-pink.webp" },
  navy: { className: "nav-navy", mascot: "/stickers/fuyosmile-green.webp" },
  paper: { className: "nav-paper", mascot: "/stickers/fuyosmile-sticker.webp" },
  /* blackberry cordial — wall of hope */
  cordial: { className: "nav-cordial", mascot: "/stickers/fuyosmile-manila.webp" },
} as const;

export type NavVariant = keyof typeof VARIANTS;

/* gallery and writing point off-site (VSCO / Substack) until those pages are
   designed — keep in sync with the hero stickers in Hero.tsx. */
const LINKS = [
  { label: "engineering", href: "/engineering" },
  { label: "reading", href: "/reading" },
  { label: "gallery", href: "https://vsco.co/fuyofulo/gallery", external: true },
  { label: "wall of hope", href: "/wall-of-hope" },
  { label: "writing", href: "https://fuyofulo.substack.com", external: true },
];

export function SiteNav({
  variant,
  /* label of the link for the page we're on — rendered underlined */
  active,
}: {
  variant: NavVariant;
  active?: string;
}) {
  const { playing, toggle } = useMusicPlayer();
  const { className, mascot } = VARIANTS[variant];

  return (
    <nav className={`scrollnav ${className}`}>
      {/* Link, not <a> — a full reload would tear down the YouTube player
          and stop playback on every navigation. */}
      <Link href="/" aria-label="back to the landing page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="scrollnav-mascot" src={mascot} alt="fuyo smile" />
      </Link>

      <div className="scrollnav-links">
        {LINKS.map((link) => {
          const cls = link.label === active ? "is-active" : undefined;
          return link.external ? (
            <a
              key={link.label}
              className={cls}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} className={cls} href={link.href}>
              {link.label}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="scrollnav-music"
        onClick={toggle}
        title="music on/off"
        aria-label={playing ? "pause music" : "play music"}
      >
        <span className="scrollnav-music-label">{playing ? "playing" : "paused"}</span>
        {/* Lucide "music" (ISC) — full opacity while playing, dimmed when paused */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scrollnav-music-icon"
          style={{ opacity: playing ? 1 : 0.45 }}
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>
    </nav>
  );
}
