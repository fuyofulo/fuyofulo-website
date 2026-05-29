import { statusBadges, type StatusBadge } from "../../lib/site-data";
import { BrandClock } from "./BrandClock";
import { BrandMark } from "./BrandMark";
import { MuteToggle } from "./MuteToggle";
import { StatusBadges } from "./StatusBadges";

type BrandBarProps = {
  visitorCount: number;
};

export function BrandBar({ visitorCount }: BrandBarProps) {
  const safeCount = Math.max(0, Math.floor(visitorCount));

  // Drop mood from the top strip; replace with a live visitor counter
  // sourced from the persisted JSON file via layout.tsx.
  const badges: StatusBadge[] = [
    ...statusBadges.filter((b) => b.kind !== "mood"),
    {
      kind: "visitors",
      value: String(safeCount),
      glyph: "♥",
      modifier: "counter",
    },
  ];

  return (
    <div className="brand-bar">
      <BrandMark />
      <StatusBadges badges={badges} />
      <div className="brand-clock">
        <BrandClock />
        <span className="brand-clock__sep" aria-hidden="true">
          ·
        </span>
        <MuteToggle />
      </div>
    </div>
  );
}
