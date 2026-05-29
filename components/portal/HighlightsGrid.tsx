import Image from "next/image";
import { highlights, type Highlight } from "../../lib/site-data";
import { SectionCard } from "./SectionCard";

function HighlightRow({ item }: { item: Highlight }) {
  return (
    <a
      className="high-row"
      href={item.href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="logo-stamp">
        <Image
          src={item.logo}
          alt={`${item.title} logo`}
          width={28}
          height={28}
        />
      </div>
      <div className="high-row__body">
        <div className="high-row__head">
          <strong className="t">{item.title}</strong>
          <span className="tl">{item.timeline}</span>
        </div>
        <p>{item.description}</p>
      </div>
    </a>
  );
}

export function HighlightsGrid() {
  return (
    <SectionCard
      title="★ programs & fellowships"
      meta={`${highlights.length} chapters`}
    >
      <div className="high-grid">
        {highlights.map((item) => (
          <HighlightRow key={item.title} item={item} />
        ))}
      </div>
    </SectionCard>
  );
}
