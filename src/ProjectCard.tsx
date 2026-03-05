import React from 'react'
import SkillPill from './SkillPill'
import githubLogo from './assets/github2-142-svgrepo-com.svg'

type ProjectCardProps = {
  title: string
  description: string
  code?: string
  live?: string
  article?: string
  imageSrc?: string
  tags?: Array<{ label: string; imageSrc: string }>
  layout?: 'side' | 'stacked'
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  code,
  live,
  article,
  imageSrc,
  tags,
  layout = 'side',
}) => {
  return (
    <div className={`project-card${layout === 'stacked' ? ' project-card--stacked' : ''}`}>
      <div className="project-card__header">
        <h3>{title}</h3>
      </div>

      <div className="project-card__body">
        <div className="project-card__media">
          {imageSrc ? <img src={imageSrc} alt={`${title} preview`} className="project-card__img" /> : null}
        </div>
        <div className="project-card__meta">
          <p className="project-card__desc">{description}</p>
          {tags?.length ? (
            <div className="project-card__tags" aria-label={`${title} technology tags`}>
              {tags.map((tag) => (
                <SkillPill key={tag.label} label={tag.label} imageSrc={tag.imageSrc} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="project-card__links">
        {live && (
          <a className="project-card__link" href={live} target="_blank" rel="noreferrer">
            Live ↗
          </a>
        )}
        {code && (
          <a className="project-card__link" href={code} target="_blank" rel="noreferrer">
            <img src={githubLogo} alt="" className="project-card__link-icon" />
            <span>Code</span>
          </a>
        )}
        {article ? (
          <a className="project-card__link" href={article} target="_blank" rel="noreferrer">
            Article ↗
          </a>
        ) : null}
      </div>
    </div>
  )
}

export default ProjectCard
