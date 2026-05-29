import { statusBadges } from "../../lib/site-data";
import { BrandClock } from "./BrandClock";
import { BrandMark } from "./BrandMark";
import { MuteToggle } from "./MuteToggle";
import { StatusBadges } from "./StatusBadges";
import { VisitorBadge } from "./VisitorBadge";

type BrandBarProps = {
  visitorCount: number;
};

export function BrandBar({ visitorCount }: BrandBarProps) {
  const safeCount = Math.max(0, Math.floor(visitorCount));
  const badges = statusBadges.filter((b) => b.kind !== "mood");

  return (
    <div className="brand-bar">
      <BrandMark />
      <StatusBadges
        badges={badges}
        trailing={<VisitorBadge initialCount={safeCount} />}
      />
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
