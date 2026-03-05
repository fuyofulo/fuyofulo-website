import { useEffect, useRef, useState } from 'react'
import SmallProjectsCarousel from './SmallProjectsCarousel'
import githubLogo from './assets/github2-142-svgrepo-com.svg'

export type ExplorerProject = {
  title: string
  description: string
  code: string
  article?: string
  imageSrc?: string
  label?: string
  tags?: Array<{ label: string; imageSrc: string }>
}

type ProjectsExplorerProps = {
  featuredProjects: ExplorerProject[]
  otherProjects: ExplorerProject[]
}

const OTHER_WORK_KEY = '__other_work__'

type ProjectDetailPanelProps = {
  project: ExplorerProject
  isFeatured: boolean
  inline?: boolean
  desktopHeight?: number | null
}

type OtherWorkPanelProps = {
  projects: ExplorerProject[]
  inline?: boolean
  desktopHeight?: number | null
}

function ProjectTechList({ tags }: { tags?: ExplorerProject['tags'] }) {
  if (!tags?.length) {
    return null
  }

  return (
    <div className="projects-explorer__tech" aria-label="Project technology">
      {tags.map((tag) => (
        <span className="projects-explorer__tech-item" key={tag.label}>
          <img src={tag.imageSrc} alt="" className="projects-explorer__tech-logo" />
          <span className="projects-explorer__tech-label">{tag.label}</span>
        </span>
      ))}
    </div>
  )
}

function ProjectDetailPanel({
  project,
  isFeatured,
  inline = false,
  desktopHeight = null,
}: ProjectDetailPanelProps) {
  return (
    <article
      className={`projects-explorer__detail${
        inline ? ' projects-explorer__detail--inline' : ''
      }`}
      style={!inline && desktopHeight ? { height: `${desktopHeight}px` } : undefined}
    >
      <div className="projects-explorer__detail-inner">
        {isFeatured && project.imageSrc ? (
          <div className="projects-explorer__media">
            <img
              src={project.imageSrc}
              alt={`${project.title} preview`}
              className="projects-explorer__image"
            />
          </div>
        ) : null}

        <div className="projects-explorer__meta">
          {project.label || !isFeatured ? (
            <p className="projects-explorer__detail-label">
              {project.label ?? 'Other work'}
            </p>
          ) : null}
          <h3 className="projects-explorer__detail-title">{project.title}</h3>
          <p className="projects-explorer__detail-description">{project.description}</p>
          <ProjectTechList tags={project.tags} />

          <div className="projects-explorer__links">
            <a
              className="projects-explorer__link"
              href={project.code}
              target="_blank"
              rel="noreferrer"
            >
              <img src={githubLogo} alt="" className="project-card__link-icon" />
              <span>Code</span>
            </a>
            {project.article ? (
              <a
                className="projects-explorer__link"
                href={project.article}
                target="_blank"
                rel="noreferrer"
              >
                Article ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function OtherWorkPanel({
  projects,
  inline = false,
  desktopHeight = null,
}: OtherWorkPanelProps) {
  return (
    <div
      className={`projects-explorer__detail${
        inline ? ' projects-explorer__detail--inline' : ''
      }`}
      style={!inline && desktopHeight ? { height: `${desktopHeight}px` } : undefined}
    >
      <div className="projects-explorer__detail-inner">
        <SmallProjectsCarousel projects={projects} embedded />
      </div>
    </div>
  )
}

const ProjectsExplorer = ({ featuredProjects, otherProjects }: ProjectsExplorerProps) => {
  const allProjects = [...featuredProjects, ...otherProjects]
  const [activeTitle, setActiveTitle] = useState(featuredProjects[0]?.title ?? OTHER_WORK_KEY)
  const [desktopHeight, setDesktopHeight] = useState<number | null>(null)
  const railRef = useRef<HTMLElement | null>(null)

  if (!allProjects.length) {
    return null
  }

  useEffect(() => {
    const rail = railRef.current

    if (!rail) {
      return
    }

    const updateHeight = () => {
      if (window.innerWidth <= 1024) {
        setDesktopHeight(null)
        return
      }

      setDesktopHeight(Math.ceil(rail.getBoundingClientRect().height))
    }

    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })

    resizeObserver.observe(rail)
    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  const showingOtherWork = activeTitle === OTHER_WORK_KEY
  const activeProject =
    allProjects.find((project) => project.title === activeTitle) ?? featuredProjects[0]
  const isFeatured = activeProject
    ? featuredProjects.some((project) => project.title === activeProject.title)
    : false

  const renderListItem = (project: ExplorerProject, compact = false) => {
    const active = activeProject.title === project.title
    const itemIsFeatured = featuredProjects.some((featured) => featured.title === project.title)

    return (
      <div className="projects-explorer__item-block" key={project.title}>
        <button
          type="button"
          className={`projects-explorer__item${compact ? ' projects-explorer__item--compact' : ''}${
            active ? ' projects-explorer__item--active' : ''
          }`}
          onClick={() => setActiveTitle(project.title)}
        >
          {project.label ? (
            <span className="projects-explorer__item-label">{project.label}</span>
          ) : null}
          <span className="projects-explorer__item-title">{project.title}</span>
          <span className="projects-explorer__item-description">{project.description}</span>
        </button>
        {active ? (
          <ProjectDetailPanel
            project={project}
            isFeatured={itemIsFeatured}
            inline
          />
        ) : null}
      </div>
    )
  }

  return (
    <div className="projects-explorer">
      <aside className="projects-explorer__rail" aria-label="Projects list" ref={railRef}>
        <div className="projects-explorer__group">
          <div className="projects-explorer__list">
            {featuredProjects.map((project) => renderListItem(project))}
          </div>
        </div>

        <div className="projects-explorer__divider" aria-hidden="true" />

        <div className="projects-explorer__group">
          <div className="projects-explorer__list">
            <div className="projects-explorer__item-block">
              <button
                type="button"
                className={`projects-explorer__item${
                  showingOtherWork ? ' projects-explorer__item--active' : ''
                }`}
                onClick={() => setActiveTitle(OTHER_WORK_KEY)}
              >
                <span className="projects-explorer__item-title">Other Projects</span>
                <span className="projects-explorer__item-description">
                  Browse the rest of the work in a scroll list on the right.
                </span>
              </button>
              {showingOtherWork ? <OtherWorkPanel projects={otherProjects} inline /> : null}
            </div>
          </div>
        </div>
      </aside>

      {showingOtherWork ? (
        <OtherWorkPanel projects={otherProjects} desktopHeight={desktopHeight} />
      ) : activeProject ? (
        <ProjectDetailPanel
          project={activeProject}
          isFeatured={isFeatured}
          desktopHeight={desktopHeight}
        />
      ) : null}
    </div>
  )
}

export default ProjectsExplorer
