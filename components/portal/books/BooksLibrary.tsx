"use client";

import { useEffect, useRef, useState } from "react";
import { books, findBookById, type Book } from "../../../lib/books";
import { BookCover } from "./BookCover";

const DEFAULT_COLS = 6;

export function BooksLibrary() {
  const libraryRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cols, setCols] = useState(DEFAULT_COLS);

  useEffect(() => {
    function readCols() {
      if (!libraryRef.current) return;
      const raw = window
        .getComputedStyle(libraryRef.current)
        .getPropertyValue("--books-cols")
        .trim();
      const parsed = Number.parseInt(raw, 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        setCols(parsed);
      }
    }
    readCols();
    window.addEventListener("resize", readCols);
    return () => window.removeEventListener("resize", readCols);
  }, []);

  useEffect(() => {
    if (selectedId && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedId]);

  const selected = selectedId ? findBookById(selectedId) : undefined;
  const selectedIdx = selected
    ? books.findIndex((b) => b.id === selected.id)
    : -1;
  const splitIdx =
    selectedIdx >= 0 ? (Math.floor(selectedIdx / cols) + 1) * cols : -1;

  const before = splitIdx > 0 ? books.slice(0, splitIdx) : [];
  const after = splitIdx >= 0 ? books.slice(splitIdx) : books;

  function handleSelect(id: string) {
    setSelectedId((current) => (current === id ? null : id));
  }

  function handleClose() {
    setSelectedId(null);
  }

  return (
    <div ref={libraryRef} className="books-library">
      {before.length > 0 ? (
        <BooksGrid
          books={before}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      ) : null}

      {selected ? (
        <div
          ref={panelRef}
          className="books-expanded"
          key={selected.id}
        >
          <button
            type="button"
            className="books-expanded__close"
            onClick={handleClose}
            aria-label="Close notes"
          >
            ×
          </button>
          <div className="books-expanded__cover">
            <BookCover book={selected} />
          </div>
          <div className="books-expanded__notes">
            <p className="eyebrow books-expanded__eyebrow">notes</p>
            <h2 className="books-expanded__title">{selected.title}</h2>
            {selected.subtitle ? (
              <p className="books-expanded__subtitle">{selected.subtitle}</p>
            ) : null}
            <p className="books-expanded__author">{selected.author}</p>

            {selected.takeaway ? (
              <p className="books-expanded__takeaway">
                <span className="books-expanded__takeaway-label">
                  takeaway
                </span>
                <span className="books-expanded__takeaway-text">
                  {selected.takeaway}
                </span>
              </p>
            ) : null}

            {selected.notes.length > 0 ? (
              <ul className="books-expanded__notes-list">
                {selected.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <p className="books-expanded__empty">
                no notes yet for this one — just enjoyed the read.
              </p>
            )}
          </div>
        </div>
      ) : null}

      {after.length > 0 ? (
        <BooksGrid
          books={after}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      ) : null}
    </div>
  );
}

type BooksGridProps = {
  books: Book[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function BooksGrid({ books, selectedId, onSelect }: BooksGridProps) {
  return (
    <div className="books-grid" role="list">
      {books.map((book) => {
        const isSelected = book.id === selectedId;
        return (
          <button
            key={book.id}
            type="button"
            role="listitem"
            className={`books-tile${isSelected ? " books-tile--selected" : ""}`}
            onClick={() => onSelect(book.id)}
            aria-pressed={isSelected}
            aria-label={`${book.title} by ${book.author}`}
          >
            <BookCover book={book} />
          </button>
        );
      })}
    </div>
  );
}
