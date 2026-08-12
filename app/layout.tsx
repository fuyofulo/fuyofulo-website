import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MusicPlayerProvider } from "../components/portal/MusicPlayer";
import "./globals.css";
import "./site.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Nanum+Pen+Script&display=swap"
        />
      </head>
      <body>
        {/* Shared by the hero turntable and the scroll navbar. */}
        <MusicPlayerProvider>{children}</MusicPlayerProvider>
      </body>
    </html>
  );
}
