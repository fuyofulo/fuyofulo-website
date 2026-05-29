import closedBookIcon from "../../../images/closed_book_3d.png";
import { Widget } from "./Widget";

export function LibraryWidget() {
  return (
    <Widget
      headTitle="✎ the library"
      icon={{
        kind: "image",
        src: closedBookIcon,
        alt: "book",
        style: "emoji",
      }}
      title="books I've read"
      description="Books I have read and some thoughts on them."
      cta={{
        kind: "link",
        label: "browse the library →",
        href: "/books",
        variant: "pink",
      }}
    />
  );
}
