import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Nanum_Pen_Script } from "next/font/google";
import localFont from "next/font/local";
import { MusicPlayerProvider } from "../components/site/MusicPlayer";
import "./globals.css";
import "./site.css";

/* Self-hosted at build time via next/font: the woff2 is preloaded from our own
   origin, so the name never flashes a fallback font the way the runtime Google
   Fonts <link> did. display:block on the pen font — for a display face this
   distinctive, a beat of invisible text beats a beat of the wrong font. */
const pen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-pen",
});

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

/* Display face for /engineering — block, not swap, for the same reason as the
   pen font: never paint the imposter fallback. */
const game = localFont({
  src: "./fonts/gamepaused-regular.woff2",
  display: "block",
  variable: "--font-game",
});

const DESCRIPTION =
  "personal site of fuyofulo — 23, engineer, building decimal. everything else about me is scattered around this page.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fuyofulo.com"),
  title: "fuyofulo",
  description: DESCRIPTION,
  /* Dark Reader honors this and leaves the page alone — the palette here is
     hand-picked per page; force-darkening it produces grey mush. */
  other: { "darkreader-lock": "true" },
  openGraph: {
    title: "fuyofulo",
    description: DESCRIPTION,
    url: "https://fuyofulo.com",
    siteName: "fuyofulo",
    type: "website",
    /* the chaos-mode hero, cropped to card proportions */
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "fuyofulo — sticker hero" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "fuyofulo",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  /* suppressHydrationWarning: FitFrame's pre-paint script sets --fit-scale and
     --fit-box-h on <html> before hydration, so this element's style attribute
     intentionally differs from the server markup. It applies to this element's
     attributes only — children still get normal hydration checking. */
  return (
    <html
      lang="en"
      className={`${pen.variable} ${serif.variable} ${game.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Shared by the hero turntable and the scroll navbar. */}
        <MusicPlayerProvider>{children}</MusicPlayerProvider>
      </body>
    </html>
  );
}
