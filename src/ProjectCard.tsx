import React from 'react'

type ProjectCardProps = {
  title: string
  description: string
  code?: string
  live?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, code, live }) => {
  return (
    <div className="project-card">
      <div className="project-card__header">
        <h3>{title}</h3>
      </div>
      <p className="project-card__desc">{description}</p>
      <div className="project-card__links">
        {live && (
          <a className="project-card__link" href={live} target="_blank" rel="noreferrer">
            Live ↗
          </a>
        )}
        {code && (
          <a className="project-card__link" href={code} target="_blank" rel="noreferrer">
            Code ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard

