import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { BrandBar } from "../../components/portal/BrandBar";
import { VibeGate } from "../../components/portal/VibeGate";

/* The original retro chrome, kept for /books, /cats and /wall-of-hope until
   those pages are folded into the redesigned sections. Its styling lives in
   globals.css, scoped to .portal. */
export default async function LegacyLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasEntered = cookieStore.has("fv");

  return (
    <>
      <VibeGate defaultDismissed={hasEntered} />
      <div className="portal">
        <BrandBar />
        {children}
      </div>
    </>
  );
}
