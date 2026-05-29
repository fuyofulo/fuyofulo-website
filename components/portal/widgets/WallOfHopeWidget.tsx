import { wall } from "../../../lib/site-data";
import { Widget } from "./Widget";

export function WallOfHopeWidget() {
  return (
    <Widget
      headTitle="♡ wall of hope"
      icon={{ kind: "glyph", glyph: "♡", tone: "pink" }}
      title={wall.title}
      description={wall.blurb}
      cta={{
        kind: "link",
        label: "visit the wall →",
        href: wall.href,
        variant: "pink",
      }}
    />
  );
}
