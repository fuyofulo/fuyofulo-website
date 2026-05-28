import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ClipboardButton } from "../components/clipboard-button";
import { ProjectCarousel } from "../components/project-carousel";
import { TechPill } from "../components/tech-pill";
import { WhiteFireSmiley } from "../components/white-fire-smiley";
import devsLogo from "../images/100xdevs_logo.jpg";
import axoriaPreview from "../images/axoria.png";
import meteoraPreview from "../images/tui.png";
import mediumLogo from "../images/medium-logo.jpg";
import substackLogo from "../images/substack.png";
import superteamLogo from "../images/superteam_logo.jpg";
import tksLogo from "../images/tks_logo_2.jpg";
import rektoffLogo from "../images/rektoff_logo.png";
import raftPreview from "../images/raft-kv-ss-2.png";

const socials = [
  {
    icon: "/assets/github2-142-svgrepo-com.svg",
    label: "GitHub",
    href: "https://github.com/fuyofulo",
  },
  {
    icon: "/assets/linkedin-svgrepo-com.svg",
    label: "LinkedIn",
    href: "https://linkedin.com/in/fuyofulo",
  },
  {
    icon: "/assets/icons8-x.svg",
    label: "X",
    href: "https://x.com/fuyofulo",
  },
] as const;

const mediumLink = "https://medium.com/@fuyofulo";

const highlights = [
  {
    title: "100xDevs - Super 30",
    timeline: "Sep 2025 – Mar 2026",
    description:
      "Hacker house style program at 100xSchool, Noida focused on backend projects, Solana, and distributed systems.",
    href: "https://x.com/100xSchool",
    logo: devsLogo,
  },
  {
    title: "Superteam - Solana India Fellowship",
    timeline: "Jul 2025 – Sep 2025",
    description:
      "Advanced Rust and Solana fellowship focused on system design, Solana infra, and Anchor development. Graduated top 20 with a $3000 stipend.",
    href: "https://x.com/superteam",
    logo: superteamLogo,
  },
  {
    title: "Rektoff - Cohort 3",
    timeline: "Jan 2026 – Mar 2026",
    description:
      "Focused on low-level Rust and Solana security with a final capstone project auditing a complex Solana program. Graduated with the strongest report in the entire cohort.",
    href: "https://x.com/rektoff_xyz",
    logo: rektoffLogo,
  },
  {
    title: "The Knowledge Society",
    timeline: "2022-2024",
    description:
      "Global Accelerator for the world's most ambitious teens. Pursued Brain Computer Interfaces alongside technical challenges from MasterCard, Shell, IKEA and more.",
    href: "https://www.tks.world/",
    logo: tksLogo,
  },
] as const;

const featuredProjects = [
  {
    label: "Stablecoin Infra",
    title: "Axoria",
    description:
      "Payouts and collections infrastructure for stablecoin teams, built around deterministic workflows, on-chain reconciliation, and proof-backed USDC movement on Solana.",
    code: "https://github.com/fuyofulo/stablecoin_infra",
    live: "https://axoria.fun",
    tags: ["Node.js", "TypeScript", "Prisma", "React", "Rust"],
    preview: axoriaPreview,
    previewClassName: "project-card__preview--axoria",
  },
  {
    label: "Solana Infra",
    title: "Meteora DLMM Indexer",
    description:
      "Real-time Meteora DLMM data platform with Yellowstone ingestion, IDL-driven decode and enrichment, ClickHouse storage, Redis flush signaling, and a Rust backend powering a live React dashboard.",
    code: "https://github.com/fuyofulo/meteora_dlmm_indexer",
    tags: ["Rust", "Solana", "gRPC"],
    preview: meteoraPreview,
  },
  {
    label: "Distributed Systems",
    title: "raft_kv",
    description:
      "Distributed key-value store in Rust using Raft consensus for replication, leader election, and fault-tolerant state synchronization.",
    code: "https://github.com/fuyofulo/raft_kv",
    article: "https://x.com/fuyofulo/status/2020674400404881615",
    tags: ["Rust", "gRPC"],
    preview: raftPreview,
  },
] as const;

const otherProjects = [
  {
    title: "Pumpswap Indexer",
    description:
      "Yellowstone gRPC indexer that parses raw on-chain streams and decodes buy/sell trades against program IDL definitions.",
    code: "https://github.com/fuyofulo/pumpswap-trades-indexer",
    tags: ["Rust", "Solana", "gRPC"],
  },
  {
    title: "Wide Sandwich Attack Detection",
    description:
      "Rust script that parses raw RPC transaction streams for pumpfun tokens and detects wide sandwich patterns within n+3 slots.",
    code: "https://github.com/fuyofulo/astra-assignment",
    tags: ["Rust", "Solana", "gRPC"],
  },
  {
    title: "Telegram Hedgefund Bot",
    description:
      "Centralized Telegram bot where groups can pool capital, vote for traders, and track strategy outcomes.",
    code: "https://github.com/fuyofulo/blink_bot",
    tags: ["Solana", "TypeScript", "Node.js", "Prisma"],
  },
  {
    title: "Solana Token TSS",
    description:
      "Extended ZenGo's solana-tss library to support SPL token transfers from a MuSig2 aggregated wallet.",
    code: "https://github.com/fuyofulo/solana-token-tss",
    tags: ["Rust", "Solana"],
  },
  {
    title: "Orderbook",
    description:
      "Single-threaded orderbook engine in Rust with deterministic matching flow.",
    code: "https://github.com/fuyofulo/single-threaded-orderbook",
    tags: ["Rust"],
  },
  {
    title: "SPL Token Launchpad",
    description:
      "Solana token launchpad for devnet airdrops, token creation, and mint flows.",
    code: "https://github.com/fuyofulo/axoria",
    tags: ["Solana", "React"],
  },
  {
    title: "Hedge Fund Solana Program",
    description:
      "Hedge-fund style Solana program for pooled capital, whitelisted asset trading, and keeper-driven execution for strategy rebalances and order automation.",
    code: "https://github.com/fuyofulo/hedgefund-as-a-service",
    tags: ["Solana", "Rust", "Anchor"],
  },
  {
    title: "CFD Platform",
    description:
      "Exness clone focused on market and account workflow replication.",
    code: "https://github.com/fuyofulo/exness",
    tags: ["TypeScript", "Node.js", "React", "Prisma"],
  },
  {
    title: "Escrow Programs",
    description:
      "Collection of baseline Solana escrow program implementations.",
    code: "https://github.com/fuyofulo/escrow-programs",
    tags: ["Solana", "Anchor", "Rust", "Redis"],
  },
  {
    title: "AI Agency Website",
    description:
      "Agency site integrating a Vapi voice agent and chatbot workflows.",
    code: "https://github.com/fuyofulo/agency01",
    tags: ["React"],
  },
  {
    title: "Restaurant Management System",
    description:
      "Built an MCP server from scratch and integrated it with a chat interface for operations.",
    code: "https://github.com/fuyofulo/booking-system",
    tags: ["TypeScript", "Node.js", "Prisma", "React"],
  },
  {
    title: "Room Chat",
    description:
      "Realtime room-based chat application written in TypeScript.",
    code: "https://github.com/fuyofulo/chat-application",
    tags: ["TypeScript", "Node.js", "React"],
  },
] as const;

function Window({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`window ${className}`.trim()}>
      <div className="window-title">
        <span>{title}</span>
        <div className="window-actions" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="window-body">{children}</div>
    </section>
  );
}

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="tag-list" aria-label="technologies">
      {tags.map((tag) => (
        <li key={tag}>
          <TechPill label={tag} />
        </li>
      ))}
    </ul>
  );
}

function LogoStamp({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) {
  return (
    <div className="logo-stamp">
      <Image src={src} alt={alt} width={44} height={44} />
    </div>
  );
}

function FeaturedProjectCard({
  project,
}: {
  project: (typeof featuredProjects)[number];
}) {
  return (
    <article className="project-card">
      {project.preview ? (
        <div
          className={[
            "project-card__preview",
            "previewClassName" in project ? project.previewClassName : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Image
            src={project.preview}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="project-card__preview project-card__preview--fallback">
          <span>vault contract</span>
          <span>flash-loan swap execution</span>
          <span>jupiter automation</span>
        </div>
      )}

      <div className="project-card__content">
        <div className="project-card__top">
          <span className="project-label">{project.label}</span>
          <span className="new-badge">featured</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <TagList tags={project.tags} />
        <div className="project-links">
          <a href={project.code} target="_blank" rel="noreferrer">
            code
          </a>
          {"live" in project && project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer">
              live
            </a>
          ) : null}
          {"article" in project && project.article ? (
            <a href={project.article} target="_blank" rel="noreferrer">
              article
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="wallpaper" />
      <div className="page">
        <div className="top-strip">
          <div className="top-strip__badge">building and learning</div>
          <div className="marquee" aria-label="site ticker">
            <span>
              welcome to fuyo&apos;s corner of the internet // i reply fast on x
              and email //
            </span>
          </div>
          <div className="top-strip__badge blink">online now</div>
        </div>

        <header>
          <Window title="homepage.exe" className="hero-window">
            <div className="hero-layout">
              <div className="hero-copy-panel">
                <p className="eyebrow">yo! I am</p>
                <h1>fuyofulo</h1>
                <p className="hero-copy">
                  I’m a software engineer currently focused on indexing the Solana blockchain. 
                  My work spans Solana programs, distributed systems, and full-stack applications.
                </p>

                <div className="hero-actions">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      className="micro-button micro-button--lime"
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="micro-button__icon"
                        src={social.icon}
                        alt=""
                        aria-hidden="true"
                      />
                      {social.label}
                    </a>
                  ))}
                  <ClipboardButton
                    className="micro-button--lime"
                    iconSrc="/assets/gmail-svgrepo-com.svg"
                    label="email"
                    value="fuyofulo@gmail.com"
                  />
                </div>

                <div className="status-row">
                  <div>
                    <span className="status-label">status</span>
                    <strong>open for work</strong>
                  </div>
                  <div>
                    <span className="status-label">location</span>
                    <strong>internet, mostly</strong>
                  </div>
                </div>
              </div>

              <div className="hero-smiley">
                <WhiteFireSmiley />
                <p className="hero-smiley__label">fuyosmile.gif</p>
              </div>
            </div>
          </Window>
        </header>

        <section className="content-grid">
          <Window title="highlights.webring" className="highlights-window">
            <div className="highlight-list">
              {highlights.map((item) => (
                <a
                  key={item.title}
                  className="highlight-experience"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LogoStamp src={item.logo} alt={`${item.title} logo`} />
                  <div className="highlight-experience__copy">
                    <div className="highlight-experience__meta">
                      <strong className="highlight-experience__title">
                        {item.title}
                      </strong>
                      {"timeline" in item && item.timeline ? (
                        <span className="highlight-experience__timeline">
                          {item.timeline}
                        </span>
                      ) : null}
                    </div>
                    <p>{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </Window>

          <div className="content-side">
            <Window title="newsletter_signup.htm">
              <div className="newsletter-box">
                <div className="newsletter-box__header">
                  <LogoStamp src={substackLogo} alt="Substack logo" />
                  <p className="newsletter-box__title">fuyo&apos;s public diary</p>
                </div>
                <p className="newsletter-box__description">
                  Notes on what I’m building, learning, and figuring out in
                  public.
                </p>
                <a
                  className="micro-button micro-button--lime"
                  href="https://fuyofulo.substack.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  go to newsletter
                </a>
              </div>
            </Window>

            <Window title="medium_articles.htm">
              <div className="newsletter-box">
                <div className="newsletter-box__header">
                  <LogoStamp src={mediumLogo} alt="Medium logo" />
                  <p className="newsletter-box__title">Medium</p>
                </div>
                <p className="newsletter-box__description">
                  Technical deep dive articles into various fields like distributed systems, brain computer interfaces and computer vision.
                </p>
                <a
                  className="micro-button micro-button--lime"
                  href={mediumLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  go to medium
                </a>
              </div>
            </Window>

            <Window title="wall_of_hope.gif">
              <div className="newsletter-box">
                <div className="newsletter-box__header">
                  <div className="logo-stamp logo-stamp--glyph" aria-hidden="true">
                    ♡
                  </div>
                  <p className="newsletter-box__title">wall of hope</p>
                </div>
                <p className="newsletter-box__description">
                  Pictures that give me hope. A quiet corner I come back to when things feel heavy.
                </p>
                <Link
                  className="micro-button micro-button--lime"
                  href="/wall-of-hope"
                >
                  visit the wall
                </Link>
              </div>
            </Window>
          </div>
        </section>

        <Window title="projects/featured" className="section-window">
          <div className="section-heading">
            <h2>featured projects</h2>
          </div>

          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Window>

        <Window title="projects/archive" className="section-window">
          <ProjectCarousel projects={otherProjects} title="other projects" />
        </Window>
      </div>
    </main>
  );
}
