import './App.css'
import WhiteFireSmiley from './WhiteFireSmiley'
import { useState } from 'react'
import SkillPill from './SkillPill'
import ProjectCard from './ProjectCard'
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
import rustcrab from './assets/rustacean-orig-noshadow.svg';
import anchorLogo from './assets/anchor-filled-heavy-svgrepo-com.svg'
import grpcLogo from './assets/Grpc--Streamline-Svg-Logos.svg'
import scyllaLogo from './assets/scylladb-icon.svg'
import githubLogo from './assets/github2-142-svgrepo-com.svg'
import linkedinLogo from './assets/linkedin-svgrepo-com.svg'
import xLogo from './assets/twitter-color-svgrepo-com.svg'
import gmailLogo from './assets/gmail-svgrepo-com.svg'
import vscoLogo from './assets/vsco2-svgrepo-com.svg'
import instagramLogo from './assets/instagram-1-svgrepo-com.svg'

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

const projects = [
  {
    title: "Hedge Fund Solana Program",
    description: "Vault Contract: Implements flash loan for swaps and hash based approval for limit and DCA orders on jupiter",
    code: "https://github.com/fuyofulo/fund_contract",
  },
  {
    title: 'Wide Sandwich Attack Detection',
    description: 'Rust script to parse raw rpc transactions for pumpfun tokens and detect for wide sandwich attacks within n+3 slots',
    code: 'https://github.com/fuyofulo/astra-assignment',
  },
  {
    title: "Telegram Hedgefund Bot",
    description: "A centralized telegram bot where gcs can pool in their money, vote for traders and enjoy the profits",
    code: "https://github.com/fuyofulo/blink_bot"
  },
  {
    title: "Pumpswap Trade Indexer",
    description: "indexer that uses yellowstone grpc to get raw data and parse buy and sell trades according to the IDL",
    code: "https://github.com/fuyofulo/pumpswap-trades-indexer"
  },
  {
    title: 'Solana Token TSS',
    description: "Extended ZenGo's solana-tss library to allow transfer of spl tokens from a MuSig2 aggregated wallet",
    code: 'https://github.com/fuyofulo/solana-token-tss',
  },
  {
    title: 'Orderbook',
    description: 'Single threaded orderbook in rust',
    code: "https://github.com/fuyofulo/single-threaded-orderbook"
  },
  {
    title: 'Axoria',
    description: 'Token launchpad on solana. Airdrop SOL on devnet, create and mint new tokens',
    code: 'https://github.com/fuyofulo/axoria',
    live: 'https://axoria.vercel.app/',
  },
  {
    title: "CFD Platform",
    description: "Exness clone",
    code: "https://github.com/fuyofulo/exness"
  },
  {
    title: "Escrow Programs",
    description: "Basic solana escrow programs",
    code: "https://github.com/fuyofulo/escrow-programs",
  },
  {
    title: "AI Agency Website",
    description: "Imtegrated Vapi Voice Agent and Chatbot",
    code: "https://github.com/fuyofulo/agency01",
    link: "https://www.elarialabs.com/"
  },
  {
    title: "Restaurant Management System",
    description: "Wrote MCP server from scratch and integrated with chat interface for operations",
    code: "https://github.com/fuyofulo/booking-system",
  },
  {
    title: "Room Chat",
    description: "Chat Application in typescript",
    code: "https://github.com/fuyofulo/chat-application",
    live: "https://roomchat123.vercel.app/"
  },
]

const socials = [
  { name: 'GitHub', imageSrc: githubLogo, iconText: 'GH', href: 'https://github.com/fuyofulo', type: 'link' },
  { name: 'LinkedIn', imageSrc: linkedinLogo, iconText: 'IN', href: 'https://linkedin.com/in/fuyofulo', type: 'link' },
  {
    name: 'Instagram',
    imageSrc: instagramLogo,
    iconText: 'IG',
    href: 'https://www.instagram.com/fuyofulo?igsh=MWZ1MTM5Zmdwd2FteQ==',
    type: 'link',
  },
  { name: 'X', imageSrc: xLogo, iconText: 'X', href: 'https://x.com/fuyofulo', type: 'link' },
  { name: 'VSCO', imageSrc: vscoLogo, iconText: 'VS', href: 'https://vsco.co/fuyofulo', type: 'link' },
  { name: 'Email', imageSrc: gmailLogo, iconText: '@', href: 'fuyofulo@gmail.com', type: 'copy' },
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
          <nav className="nav-links" aria-label="Primary">
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#socials">Socials</a>
          </nav>
        </header>

        <main className="hero" id="hero">
          <div className="hero__content">
            <p className="eyebrow mono">yo! I am </p>
            <h1>fuyofulo</h1>
            <p className="lede">
              I am a software engineer cranking out projects in the Solana ecosystem. I studied computer science in university and am an alumni of the knowledge society. 
            </p>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <WhiteFireSmiley />
          </div>
        </main>

        <section className="section skills" id="skills" aria-labelledby="skills-title">
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
        </section>

        <section className="section projects" id="projects" aria-labelledby="projects-title">
          <div className="projects-panel">
            <div className="section__header">
              <p className="eyebrow eyebrow--bold" id="projects-title">Projects</p>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </section>

        <section className="section socials" id="socials" aria-labelledby="socials-title">
          <div className="socials-panel">
            <div className="section__header">
              <p className="eyebrow" id="socials-title">Socials</p>
            </div>
            <div className="socials-row">
              {socials.map((item) => (
                item.type === 'copy' ? (
                  <button
                    key={item.name}
                    className="social-pill social-pill--copy"
                    onClick={() => handleCopy(item.href)}
                    type="button"
                  >
                    {item.imageSrc ? (
                      <img src={item.imageSrc} alt={item.name} className="social-pill__img" />
                    ) : (
                      <span className="social-pill__icon">{item.iconText}</span>
                    )}
                    <span className="social-pill__label">{item.name}</span>
                    {copied && item.name === 'Email' ? <div className="copy-toast">Email copied</div> : null}
                  </button>
                ) : (
                  <a
                    key={item.name}
                    className="social-pill"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.imageSrc ? (
                      <img src={item.imageSrc} alt={item.name} className="social-pill__img" />
                    ) : (
                      <span className="social-pill__icon">{item.iconText}</span>
                    )}
                    <span className="social-pill__label">{item.name}</span>
                  </a>
                )
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
