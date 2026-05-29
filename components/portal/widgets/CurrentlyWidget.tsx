import { nowPlaying, statusBadges } from "../../../lib/site-data";

type CurrentlyItem = {
  glyph: string;
  kind: string;
  value: string;
};

function findBadge(kind: string) {
  return statusBadges.find((b) => b.kind === kind);
}

function buildItems(): CurrentlyItem[] {
  const list: CurrentlyItem[] = [];
  for (const kind of ["building", "reading"] as const) {
    const badge = findBadge(kind);
    if (badge) {
      list.push({ glyph: badge.glyph, kind: badge.kind, value: badge.value });
    }
  }
  list.push({ glyph: "♫", kind: "listening", value: nowPlaying.trackName });
  const mood = findBadge("mood");
  if (mood) {
    list.push({ glyph: mood.glyph, kind: mood.kind, value: mood.value });
  }
  return list;
}

const items = buildItems();

export function CurrentlyWidget() {
  return (
    <div className="widget currently-widget">
      <div className="widget__head">
        <span>☆ currently</span>
        <span className="widget__head-badge">live</span>
      </div>
      <div className="widget__body currently-widget__body">
        <ul className="currently-list">
          {items.map((item) => (
            <li key={item.kind} className="currently-item">
              <span className="currently-item__glyph" aria-hidden="true">
                {item.glyph}
              </span>
              <div className="currently-item__copy">
                <span className="currently-item__kind">{item.kind}</span>
                <span className="currently-item__value">{item.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
