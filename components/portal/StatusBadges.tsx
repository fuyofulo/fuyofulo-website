import type { ReactNode } from "react";
import { statusBadges as defaultBadges, type StatusBadge } from "../../lib/site-data";

type StatusBadgesProps = {
  badges?: StatusBadge[];
  trailing?: ReactNode;
};

export function StatusBadges({ badges = defaultBadges, trailing }: StatusBadgesProps) {
  return (
    <div className="status-badges" aria-label="status">
      {badges.map((badge) => {
        const className = badge.modifier
          ? `status-badge status-badge--${badge.modifier}`
          : "status-badge";
        return (
          <span key={badge.kind} className={className}>
            <span className="status-badge__glyph" aria-hidden="true">
              {badge.glyph}
            </span>
            <span className="status-badge__kind">{badge.kind}</span>
            <span className="status-badge__sep" aria-hidden="true">
              ·
            </span>
            <span className="status-badge__value">{badge.value}</span>
          </span>
        );
      })}
      {trailing}
    </div>
  );
}
