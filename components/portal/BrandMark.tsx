"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BrandMark() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <Link href="/" className="brand-mark" aria-label="fuyofulo home">
        <span className="star" aria-hidden="true">
          ★
        </span>
        fuyofulo.com
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="brand-mark brand-mark--back"
      aria-label="back to homepage"
    >
      <span className="brand-mark__arrow" aria-hidden="true">
        ←
      </span>
      back to homepage
    </Link>
  );
}
