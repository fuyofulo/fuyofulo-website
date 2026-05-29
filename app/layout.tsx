import { cookies } from "next/headers";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BrandBar } from "../components/portal/BrandBar";
import { MusicPlayerProvider } from "../components/portal/MusicPlayer";
import { VibeGate } from "../components/portal/VibeGate";
import { readVisitorCount } from "../lib/visitor-count";
import "./globals.css";

export const metadata: Metadata = {
  title: "fuyofulo | portfolio.exe",
  description:
    "Retro-futurist portfolio for fuyofulo, built like a polished GeoCities personal homepage.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasEntered = cookieStore.has("fv");
  const visitorCount = await readVisitorCount();

  return (
    <html lang="en">
      <body>
        <MusicPlayerProvider>
          <VibeGate defaultDismissed={hasEntered} />
          <div className="portal">
            <BrandBar visitorCount={visitorCount} />
            {children}
          </div>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
