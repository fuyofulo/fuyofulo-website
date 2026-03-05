import React from 'react'
import SkillPill from './SkillPill'
import githubLogo from './assets/github2-142-svgrepo-com.svg'

type SmallerProject = {
  title: string
  description: string
  code: string
  tags?: Array<{ label: string; imageSrc: string }>
}

type SmallProjectsCarouselProps = {
  projects: SmallerProject[]
  embedded?: boolean
}

const SmallProjectsCarousel: React.FC<SmallProjectsCarouselProps> = ({
  projects,
  embedded = false,
}) => {
  if (!projects.length) {
    return null
  }

  return (
    <article
      className={`small-projects-scroll${
        embedded ? ' small-projects-scroll--embedded' : ''
      }`}
      aria-label="Additional projects list"
    >
      <div className="small-projects-scroll__header">
        <h3>Other Projects</h3>
        <span className="small-projects-scroll__count">{projects.length}</span>
      </div>

      <div className="small-projects-scroll__list">
        {projects.map((project) => (
          <section className="small-projects-scroll__item" key={project.title}>
            <div className="small-projects-scroll__item-head">
              <h4>{project.title}</h4>
              <a className="project-card__link" href={project.code} target="_blank" rel="noreferrer">
                <img src={githubLogo} alt="" className="project-card__link-icon" />
                <span>Code</span>
              </a>
            </div>

            <p className="project-card__desc">{project.description}</p>

            {project.tags?.length ? (
              <div className="project-card__tags" aria-label={`${project.title} technology tags`}>
                {project.tags.map((tag) => (
                  <SkillPill
                    key={`${project.title}-${tag.label}`}
                    label={tag.label}
                    imageSrc={tag.imageSrc}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  )
}

export default SmallProjectsCarousel
