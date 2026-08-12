"use client";

import Link from "next/link";
import { useMusicPlayer } from "../portal/MusicPlayer";
import { VinylSheen } from "./VinylSheen";

/* Palette per section, matching frames 9a/9b/9c in the handoff. Each page
   declares its own variant now that the sections are separate routes. */
const VARIANTS = {
  cream: { className: "nav-cream", mascot: "/stickers/fuyosmile-sticker.webp" },
  espresso: { className: "nav-espresso", mascot: "/stickers/fuyosmile-pink.webp" },
  navy: { className: "nav-navy", mascot: "/stickers/fuyosmile-green.webp" },
  paper: { className: "nav-paper", mascot: "/stickers/fuyosmile-sticker.webp" },
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

export function SiteNav({ variant }: { variant: NavVariant }) {
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
        {LINKS.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ),
        )}
      </div>

      <button
        type="button"
        className="scrollnav-music"
        onClick={toggle}
        title="music on/off"
        aria-label={playing ? "pause music" : "play music"}
      >
        <span className="scrollnav-music-label">{playing ? "playing" : "paused"}</span>
        <span className="scrollnav-vinyl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stickers/vinyl-player-baked.webp" alt="" aria-hidden="true" />
          {playing ? (
            <VinylSheen left="16.9%" top="22.4%" width="56.1%" blur={2} />
          ) : null}
        </span>
      </button>
    </nav>
  );
}
