import { books } from "../../../lib/books";
import { Widget } from "./Widget";

export function LibraryWidget() {
  const count = books.length;
  const blurb =
    count > 0
      ? `${count} books on the shelf. notes on the ones that stuck.`
      : "a shelf in progress.";

  return (
    <Widget
      headTitle="✎ the library"
      icon={{ kind: "glyph", glyph: "✎", tone: "default" }}
      title="books I've read"
      description={blurb}
      cta={{
        kind: "link",
        label: "browse the library →",
        href: "/books",
        variant: "lime",
      }}
    />
  );
}
