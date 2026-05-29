import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  meta?: string;
  children: ReactNode;
};

export function SectionCard({ title, meta, children }: SectionCardProps) {
  return (
    <section className="section">
      <div className="section__head">
        <span>{title}</span>
        {meta ? <span className="more">{meta}</span> : null}
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
