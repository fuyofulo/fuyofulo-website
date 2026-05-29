import sparklingHeartIcon from "../../../images/sparkling_heart_3d.png";
import { wall } from "../../../lib/site-data";
import { Widget } from "./Widget";

export function WallOfHopeWidget() {
  return (
    <Widget
      headTitle="♡ wall of hope"
      icon={{
        kind: "image",
        src: sparklingHeartIcon,
        alt: "sparkling heart",
        style: "emoji",
      }}
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
