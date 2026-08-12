import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Nanum_Pen_Script } from "next/font/google";
import { MusicPlayerProvider } from "../components/portal/MusicPlayer";
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

export const metadata: Metadata = {
  title: "fuyofulo",
  description:
    "personal site of fuyofulo — 23, engineer, building decimal. everything else about me is scattered around this page.",
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
      className={`${pen.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Shared by the hero turntable and the scroll navbar. */}
        <MusicPlayerProvider>{children}</MusicPlayerProvider>
      </body>
    </html>
  );
}
