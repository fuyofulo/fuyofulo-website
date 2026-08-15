import { statusBadges } from "../../lib/site-data";
import { BrandClock } from "./BrandClock";
import { BrandMark } from "./BrandMark";
import { MuteToggle } from "./MuteToggle";
import { StatusBadges } from "./StatusBadges";

export function BrandBar() {
  const badges = statusBadges.filter((b) => b.kind !== "mood");

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
