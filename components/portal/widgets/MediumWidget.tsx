import { medium } from "../../../lib/site-data";
import { Widget } from "./Widget";

export function MediumWidget() {
  return (
    <Widget
      headTitle="✎ medium"
      headVariant="black"
      icon={{ kind: "image", src: medium.logo, alt: "Medium logo" }}
      title={medium.title}
      description={medium.blurb}
      cta={{
        kind: "link",
        label: "go to medium →",
        href: medium.href,
        variant: "black",
        external: true,
      }}
    />
  );
}
