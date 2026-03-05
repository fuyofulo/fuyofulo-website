import './App.css'
import WhiteFireSmiley from './WhiteFireSmiley'
import { useState } from 'react'
import ProjectsExplorer, { type ExplorerProject } from './ProjectsExplorer'
import solanaLogo from './assets/solanaLogoMark.svg'
import rustcrab from './assets/rustacean-orig-noshadow.svg'
import anchorLogo from './assets/anchor-filled-heavy-svgrepo-com.svg'
import grpcLogo from './assets/Grpc--Streamline-Svg-Logos.svg'
import typescriptLogo from './assets/typescript-official-svgrepo-com.svg'
import reactLogo from './assets/react.svg'
import nodeLogo from './assets/nodejs-icon-logo-svgrepo-com.svg'
import prismaLogo from './assets/light-prisma-svgrepo-com.svg'
import redisLogo from './assets/redis-svgrepo-com.svg'
import githubLogo from './assets/github2-142-svgrepo-com.svg'
import linkedinLogo from './assets/linkedin-svgrepo-com.svg'
import xLogo from './assets/twitter-color-svgrepo-com.svg'
import gmailLogo from './assets/gmail-svgrepo-com.svg'
import raftKvPreview from './images/raft_kv.png'
import tksLogo from './images/tks_logo_2.jpg'
import superteamLogo from './images/superteam_logo.jpg'
import rektoffLogo from './images/rektoff_logo.png'
import super30Logo from './images/100xdevs_logo.jpg'
import substackLogo from './images/substack.png'

/*
import SkillPill from './SkillPill'
import solanaLogo from './assets/solanaLogoMark.svg'
import typescriptLogo from './assets/typescript-official-svgrepo-com.svg'
import reactLogo from './assets/react.svg'
import nodeLogo from './assets/nodejs-icon-logo-svgrepo-com.svg'
import nextLogo from './assets/nextjs-icon-svgrepo-com.svg'
import tailwindLogo from './assets/tailwind-svgrepo-com.svg'
import viteLogo from './assets/vite-svgrepo-com.svg'
import prismaLogo from './assets/light-prisma-svgrepo-com.svg'
import postgresLogo from './assets/postgresql-svgrepo-com.svg'
import redisLogo from './assets/redis-svgrepo-com.svg'
import bunLogo from './assets/Bun.svg'
import rustcrab from './assets/rustacean-orig-noshadow.svg'
import anchorLogo from './assets/anchor-filled-heavy-svgrepo-com.svg'
import grpcLogo from './assets/Grpc--Streamline-Svg-Logos.svg'
import scyllaLogo from './assets/scylladb-icon.svg'
*/

/*
const skills: { name: string; imageSrc?: string; iconText?: string }[] = [
  { name: 'Solana', imageSrc: solanaLogo },
  { name: 'Rust', imageSrc: rustcrab },
  { name: 'Anchor', imageSrc: anchorLogo },
  { name: 'gRPC', imageSrc: grpcLogo },
  { name: 'ScyllaDB', imageSrc: scyllaLogo },
  { name: 'TypeScript', imageSrc: typescriptLogo },
  { name: 'React', imageSrc: reactLogo },
  { name: 'Node.js', imageSrc: nodeLogo },
  { name: 'Next.js', imageSrc: nextLogo },
  { name: 'Tailwind', imageSrc: tailwindLogo },
  { name: 'Vite', imageSrc: viteLogo },
  { name: 'Prisma', imageSrc: prismaLogo },
  { name: 'PostgreSQL', imageSrc: postgresLogo },
  { name: 'Redis', imageSrc: redisLogo },
  { name: 'Bun', imageSrc: bunLogo },
]
*/

const featuredProjects: ExplorerProject[] = [
  {
    title: 'raft_kv',
    label: 'Distributed Systems',
    description:
      'Distributed key-value store in Rust using Raft consensus for replication, leader election, and fault-tolerant state synchronization.',
    code: 'https://github.com/fuyofulo/raft_kv',
    article: 'https://x.com/fuyofulo/status/2020674400404881615',
    imageSrc: raftKvPreview,
    tags: [
      { label: 'Rust', imageSrc: rustcrab },
      { label: 'gRPC', imageSrc: grpcLogo },
    ],
  },
  {
    title: 'Pumpswap Indexer',
    label: 'Solana Infra',
    description:
      'Yellowstone gRPC indexer that parses raw on-chain streams and decodes buy/sell trades against program IDL definitions.',
    code: 'https://github.com/fuyofulo/pumpswap-trades-indexer',
    article: '',
    imageSrc: raftKvPreview,
    tags: [
      { label: 'Rust', imageSrc: rustcrab },
      { label: 'Solana', imageSrc: solanaLogo },
      { label: 'gRPC', imageSrc: grpcLogo },
    ],
  },
  {
    title: 'Hedge Fund Solana Program',
    label: 'Solana Anchor Program',
    description:
      'Vault contract with flash-loan swap execution and hash-based approval flow for limit and DCA order automation on Jupiter.',
    code: 'https://github.com/fuyofulo/fund_contract',
    article: '',
    imageSrc: raftKvPreview,
    tags: [
      { label: 'Solana', imageSrc: solanaLogo },
      { label: 'Rust', imageSrc: rustcrab },
      { label: 'Anchor', imageSrc: anchorLogo },
    ],
  },
]

const otherProjects: ExplorerProject[] = [
  {
    title: 'Wide Sandwich Attack Detection',
    description:
      'Rust script that parses raw RPC transaction streams for pumpfun tokens and detects wide sandwich patterns within n+3 slots.',
    code: 'https://github.com/fuyofulo/astra-assignment',
    tags: [
      { label: 'Rust', imageSrc: rustcrab },
      { label: 'Solana', imageSrc: solanaLogo },
      { label: 'gRPC', imageSrc: grpcLogo },
    ],
  },
  {
    title: 'Telegram Hedgefund Bot',
    description:
      'Centralized Telegram bot where groups can pool capital, vote for traders, and track strategy outcomes.',
    code: 'https://github.com/fuyofulo/blink_bot',
    tags: [
      { label: 'Solana', imageSrc: solanaLogo },
      { label: 'TypeScript', imageSrc: typescriptLogo },
      { label: 'Node.js', imageSrc: nodeLogo },
      { label: 'Prisma', imageSrc: prismaLogo },
    ],
  },
  {
    title: 'Solana Token TSS',
    description:
      "Extended ZenGo's solana-tss library to support SPL token transfers from a MuSig2 aggregated wallet.",
    code: 'https://github.com/fuyofulo/solana-token-tss',
    tags: [
      { label: 'Rust', imageSrc: rustcrab },
      { label: 'Solana', imageSrc: solanaLogo },
    ],
  },
  {
    title: 'Orderbook',
    description: 'Single-threaded orderbook engine in Rust with deterministic matching flow.',
    code: 'https://github.com/fuyofulo/single-threaded-orderbook',
    tags: [
      { label: 'Rust', imageSrc: rustcrab },
    ],
  },
  {
    title: 'Axoria',
    description: 'Solana token launchpad for devnet airdrops, token creation, and mint flows.',
    code: 'https://github.com/fuyofulo/axoria',
    tags: [
      { label: 'Solana', imageSrc: solanaLogo },
      { label: 'React', imageSrc: reactLogo },
    ],
  },
  {
    title: 'CFD Platform',
    description: 'Exness clone focused on market and account workflow replication.',
    code: 'https://github.com/fuyofulo/exness',
    tags: [
      { label: 'TypeScript', imageSrc: typescriptLogo },
      { label: 'Node.js', imageSrc: nodeLogo },
      { label: 'React', imageSrc: reactLogo },
      { label: 'Prisma', imageSrc: prismaLogo },
    ],
  },
  {
    title: 'Escrow Programs',
    description: 'Collection of baseline Solana escrow program implementations.',
    code: 'https://github.com/fuyofulo/escrow-programs',
    tags: [
      { label: 'Solana', imageSrc: solanaLogo },
      { label: 'Anchor', imageSrc: anchorLogo },
      { label: 'Rust', imageSrc: rustcrab },
      { label: 'Redis', imageSrc: redisLogo },
    ],
  },
  {
    title: 'AI Agency Website',
    description: 'Agency site integrating a Vapi voice agent and chatbot workflows.',
    code: 'https://github.com/fuyofulo/agency01',
    tags: [
      { label: 'React', imageSrc: reactLogo },
    ],
  },
  {
    title: 'Restaurant Management System',
    description:
      'Built an MCP server from scratch and integrated it with a chat interface for operations.',
    code: 'https://github.com/fuyofulo/booking-system',
    tags: [
      { label: 'TypeScript', imageSrc: typescriptLogo },
      { label: 'Node.js', imageSrc: nodeLogo },
      { label: 'Prisma', imageSrc: prismaLogo },
      { label: 'React', imageSrc: reactLogo },
    ],
  },
  {
    title: 'Room Chat',
    description: 'Realtime room-based chat application written in TypeScript.',
    code: 'https://github.com/fuyofulo/chat-application',
    tags: [
      { label: 'TypeScript', imageSrc: typescriptLogo },
      { label: 'Node.js', imageSrc: nodeLogo },
      { label: 'React', imageSrc: reactLogo },
    ],
  },
]

const socials = [
  { name: 'GitHub', imageSrc: githubLogo, iconText: 'GH', href: 'https://github.com/fuyofulo', type: 'link' },
  { name: 'LinkedIn', imageSrc: linkedinLogo, iconText: 'IN', href: 'https://linkedin.com/in/fuyofulo', type: 'link' },
  { name: 'X', imageSrc: xLogo, iconText: 'X', href: 'https://x.com/fuyofulo', type: 'link' },
  { name: 'Email', imageSrc: gmailLogo, iconText: '@', href: 'fuyofulo@gmail.com', type: 'copy' },
]

const highlights = [
  {
    logoSrc: tksLogo,
    logoAlt: 'The Knowledge Society logo',
    title: 'The Knowledge Society',
    ribbonTitle: 'TKS',
    detail: 'Alumni, 2022-2024',
    href: 'https://www.tks.world/',
  },
  {
    logoSrc: super30Logo,
    logoAlt: '100xDevs logo',
    title: '100xDevs',
    ribbonTitle: '100xDevs',
    detail: 'Student of Super 30 2.0',
    href: 'https://x.com/100xSchool',
  },
  {
    logoSrc: superteamLogo,
    logoAlt: 'Superteam logo',
    title: 'Superteam',
    ribbonTitle: 'Superteam',
    detail: 'Member, Graduated Superdevs 2025 in top 20',
    href: 'https://x.com/superteam',
  },
  {
    logoSrc: rektoffLogo,
    logoAlt: 'Rektoff logo',
    title: 'Rektoff',
    ribbonTitle: 'Rektoff',
    detail: 'Solana and Rust Security bootcamp',
    href: 'https://x.com/rektoff_xyz',
  },
]

function App() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (value: string) => {
    navigator.clipboard?.writeText(value).then(
      () => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      },
      () => {
        setCopied(false)
      }
    )
  }

  return (
    <div className="app-shell">
      <div className="nebula-bg" aria-hidden>
        <div className="nebula__layer nebula__stars" />
        <div className="nebula__layer nebula__stars--slow" />
        <div className="nebula__layer nebula__glow" />
      </div>

      <div className="content-shell">
        <header className="navbar">
          <div className="nav-brand">fuyofulo</div>
        </header>

        <div className="intro-stack">
          <main className="hero" id="hero">
            <div className="hero__content">
              <p className="eyebrow mono">yo! I am </p>
              <h1>fuyofulo</h1>
              <p className="lede">
                I am 22 years old. I graduated university with a bachelors in computer science.
                I spend most of my time building distributed systems in Rust, experimenting on Solana, and shipping things that probably shouldn’t run in production (yet).
              </p>
              <div className="hero-socials" aria-label="Social links">
                {socials.map((item) =>
                  item.type === 'copy' ? (
                    <button
                      key={item.name}
                      className="hero-social social-pill--copy"
                      onClick={() => handleCopy(item.href)}
                      type="button"
                      aria-label={item.name}
                      title={item.name}
                    >
                      {item.imageSrc ? (
                        <img src={item.imageSrc} alt={item.name} className="hero-social__img" />
                      ) : (
                        <span className="hero-social__icon">{item.iconText}</span>
                      )}
                      {copied && item.name === 'Email' ? <div className="copy-toast">Email copied</div> : null}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      className="hero-social"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.name}
                      title={item.name}
                    >
                      {item.imageSrc ? (
                        <img src={item.imageSrc} alt={item.name} className="hero-social__img" />
                      ) : (
                        <span className="hero-social__icon">{item.iconText}</span>
                      )}
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="hero__visual" aria-hidden="true">
              <WhiteFireSmiley />
            </div>
          </main>

        {/* <section className="section skills" id="skills" aria-labelledby="skills-title">
          <div className="section__header">
            <p className="eyebrow eyebrow--bold" id="skills-title">Tech Stack</p>
            <p className="lede section__lede skills-subtext">
              These are the main technologies I have used to build projects so far. I simply learn and use whatever is needed to solve the problem at hand. 
            </p>
          </div>
          <div className="skills-pills">
            {skills.map((skill) => (
              <SkillPill
                key={skill.name}
                label={skill.name}
                imageSrc={skill.imageSrc}
                iconText={skill.iconText}
              />
            ))}
          </div>
        </section> */}

          <section className="section proof-ribbon" aria-label="Highlights ribbon (alternative)">
            <div className="proof-ribbon__layout">
              <div className="proof-ribbon__stack">
                {highlights.map((item) => (
                  <div className="proof-ribbon__item" key={`ribbon-${item.title}`}>
                    <img src={item.logoSrc} alt={item.logoAlt} className="proof-ribbon__logo" />
                    <p className="proof-ribbon__text">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="proof-ribbon__title-link"
                        aria-label={`${item.title} website`}
                      >
                        <span className="proof-ribbon__title">{item.ribbonTitle ?? item.title}</span>
                      </a>
                      <span className="proof-ribbon__sep" aria-hidden>·</span>
                      <span className="proof-ribbon__detail">{item.detail}</span>
                    </p>
                  </div>
                ))}
              </div>

              <aside className="newsletter-card" aria-label="Newsletter">
                <h3 className="newsletter-card__title">fuyo&apos;s public diary</h3>
                <p className="newsletter-card__copy">
                  subscribe to my newsletter to follow my journey
                </p>
                <div className="newsletter-card__cta-row">
                  <img src={substackLogo} alt="" className="newsletter-card__logo" aria-hidden="true" />
                  <a
                    className="newsletter-card__cta"
                    href="https://fuyofulo.substack.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="newsletter-card__cta-label">go to newsletter</span>
                  </a>
                </div>
              </aside>
            </div>
          </section>

          <section className="section projects" id="projects" aria-labelledby="projects-title">
            <div className="projects-panel">
              <div className="section__header">
                <p className="eyebrow eyebrow--bold" id="projects-title">Projects</p>
              </div>
              <ProjectsExplorer
                featuredProjects={featuredProjects}
                otherProjects={otherProjects}
              />
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default App
