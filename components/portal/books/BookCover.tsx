"use client";

import { useEffect, useRef, useState } from "react";
import type { Book } from "../../../lib/books";

const PALETTE = [
  { bg: "linear-gradient(180deg, #2a4480 0%, #1a2a55 100%)", accent: "#ffe170" },
  { bg: "linear-gradient(180deg, #67072e 0%, #3c0418 100%)", accent: "#ffd0e2" },
  { bg: "linear-gradient(180deg, #0b6366 0%, #062f31 100%)", accent: "#b9ffd8" },
  { bg: "linear-gradient(180deg, #5e2a06 0%, #2b1303 100%)", accent: "#ffe170" },
  { bg: "linear-gradient(180deg, #243100 0%, #121800 100%)", accent: "#e4f883" },
  { bg: "linear-gradient(180deg, #2a1c5b 0%, #150d34 100%)", accent: "#ff7aae" },
];

function paletteFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

type Props = {
  book: Book;
};

export function BookCover({ book }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const palette = paletteFor(book.id);

  // Catch images that errored before React hydrated so we render the
  // fallback instead of an empty colored box.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) {
      setImageFailed(true);
    }
  }, []);

  return (
    <div className="book-cover" style={{ background: palette.bg }}>
      {imageFailed ? (
        <div className="book-cover__fallback">
          <div
            className="book-cover__fallback-rule"
            style={{ background: palette.accent }}
          />
          <div className="book-cover__fallback-title">{book.title}</div>
          <div
            className="book-cover__fallback-rule"
            style={{ background: palette.accent }}
          />
          <div className="book-cover__fallback-author">{book.author}</div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          className="book-cover__img"
          src={book.cover}
          alt={`${book.title} by ${book.author}`}
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
