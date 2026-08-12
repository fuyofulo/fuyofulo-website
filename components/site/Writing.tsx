/* Placeholder section — routes straight out to Substack/Medium until there
   are posts to feature. Will be rebuilt as a real writing index. */

export function Writing() {
  return (
    <section className="section writing" id="writing">
      <div className="section-inner">
        <h2 className="writing-title">Writing</h2>
        <p className="section-lede writing-lede">
          essays and notes — nothing published yet, but it&apos;s all going to live
          on substack. quick notes on medium.
        </p>

        <div className="writing-buttons">
          <a
            className="writing-button writing-button--substack"
            href="https://fuyofulo.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            all essays on substack →
          </a>
          <a
            className="writing-button writing-button--medium"
            href="https://medium.com/@fuyofulo"
            target="_blank"
            rel="noopener noreferrer"
          >
            quick notes on medium →
          </a>
        </div>
      </div>
    </section>
  );
}
