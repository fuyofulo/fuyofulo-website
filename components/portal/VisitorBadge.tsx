"use client";

import { useEffect, useState } from "react";

export const VISITOR_COUNT_EVENT = "fuyo:visitor-count";

type Props = {
  initialCount: number;
};

export function VisitorBadge({ initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    function handler(event: Event) {
      const detail = (event as CustomEvent<number>).detail;
      if (typeof detail === "number" && Number.isFinite(detail)) {
        setCount(detail);
      }
    }
    window.addEventListener(VISITOR_COUNT_EVENT, handler);
    return () => window.removeEventListener(VISITOR_COUNT_EVENT, handler);
  }, []);

  return (
    <span
      className="status-badge status-badge--counter"
      aria-label={`${count} visitors`}
    >
      <span className="status-badge__glyph" aria-hidden="true">
        ♥
      </span>
      <span className="status-badge__kind">visitors</span>
      <span className="status-badge__sep" aria-hidden="true">
        ·
      </span>
      <span className="status-badge__value">{count}</span>
    </span>
  );
}
