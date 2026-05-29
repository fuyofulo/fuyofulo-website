import Image from "next/image";
import { featuredProjects, type FeaturedProject } from "../../lib/site-data";
import { SectionCard } from "./SectionCard";
import { TagList } from "./TagList";

function FeaturedCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="feat-card">
      <div className="feat-card__prev">
        <Image
          src={project.preview}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
        />
      </div>
      <div className="feat-card__body">
        <div className="feat-card__top">
          <span className="feat-label">{project.label}</span>
          <span className="new-badge">featured</span>
        </div>
        <h3 className="feat-card__title">{project.title}</h3>
        <p className="feat-card__desc">{project.description}</p>
        <TagList tags={project.tags} />
      </div>
      <div className="feat-card__links">
        <a href={project.code} target="_blank" rel="noreferrer">
          code →
        </a>
        {project.live ? (
          <a href={project.live} target="_blank" rel="noreferrer">
            live →
          </a>
        ) : null}
        {project.article ? (
          <a href={project.article} target="_blank" rel="noreferrer">
            article →
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function FeaturedProjects() {
  return (
    <SectionCard
      title="★ featured projects"
      meta={`${featuredProjects.length} items`}
    >
      <div className="feat-row">
        {featuredProjects.map((project) => (
          <FeaturedCard key={project.title} project={project} />
        ))}
      </div>
    </SectionCard>
  );
}
