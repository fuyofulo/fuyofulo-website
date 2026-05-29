import { BooksLibrary } from "../../components/portal/books/BooksLibrary";

export const metadata = {
  title: "books | fuyofulo",
  description: "Books I've read, with notes and takeaways.",
};

export default function BooksPage() {
  return (
    <section className="window section-window books-window">
      <div className="window-title">
        <span>the_library.htm</span>
        <div className="window-actions" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="window-body">
        <div className="section-heading books-heading">
          <h2>The Library</h2>
          <p className="books-intro">
            Books I&apos;ve read. Some have notes — click a cover to see what
            stuck.
          </p>
        </div>

        <BooksLibrary />
      </div>
    </section>
  );
}
