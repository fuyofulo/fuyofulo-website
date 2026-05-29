"use client";

import { useMemo, useState } from "react";
import { archiveProjects, type ArchiveProject } from "../../lib/site-data";
import { TagList } from "./TagList";

const PER_PAGE = 4;

function ArchiveCard({ item }: { item: ArchiveProject }) {
  return (
    <article className="archive-card">
      <div className="archive-card__head">
        <h3 className="archive-card__title">{item.title}</h3>
        <a
          className="archive-card__code"
          href={item.code}
          target="_blank"
          rel="noreferrer"
        >
          code →
        </a>
      </div>
      <p className="archive-card__desc">{item.description}</p>
      <TagList tags={item.tags} />
    </article>
  );
}

export function ArchiveCarousel() {
  const totalPages = Math.max(1, Math.ceil(archiveProjects.length / PER_PAGE));
  const [page, setPage] = useState(0);

  const visible = useMemo(() => {
    const start = page * PER_PAGE;
    return archiveProjects.slice(start, start + PER_PAGE);
  }, [page]);

  const atStart = page === 0;
  const atEnd = page === totalPages - 1;

  return (
    <div className="archive-carousel">
      <div className="archive-carousel__grid">
        {visible.map((item) => (
          <ArchiveCard key={item.title} item={item} />
        ))}
      </div>
      <div className="archive-carousel__controls">
        <button
          type="button"
          className="carousel-button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={atStart}
          aria-label="Previous page"
        >
          ‹
        </button>
        <span className="carousel-page-indicator">
          page {page + 1} / {totalPages}
        </span>
        <button
          type="button"
          className="carousel-button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={atEnd}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
