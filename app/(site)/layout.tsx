import type { ReactNode } from "react";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  /* The navbar is per-page now (each section route declares its own palette),
     so this layout only establishes the design-token scope. */
  return <div className="site">{children}</div>;
}
