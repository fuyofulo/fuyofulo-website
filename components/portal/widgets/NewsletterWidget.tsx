import { newsletter } from "../../../lib/site-data";
import { Widget } from "./Widget";

export function NewsletterWidget() {
  return (
    <Widget
      headTitle="✦ public diary"
      headBadge="NEW"
      headVariant="orange"
      icon={{ kind: "image", src: newsletter.logo, alt: "Substack logo" }}
      title={newsletter.title}
      description={newsletter.blurb}
      cta={{
        kind: "link",
        label: "subscribe →",
        href: newsletter.href,
        variant: "lime",
        external: true,
      }}
    />
  );
}
