import type { StaticImageData } from "next/image";
import devsLogo from "../images/100xdevs_logo.jpg";
import axoriaPreview from "../images/axoria.png";
import meteoraPreview from "../images/tui.png";
import mediumLogo from "../images/medium-logo.jpg";
import substackLogo from "../images/substack.png";
import superteamLogo from "../images/superteam_logo.jpg";
import tksLogo from "../images/tks_logo_2.jpg";
import rektoffLogo from "../images/rektoff_logo.png";
import raftPreview from "../images/raft-kv-ss-2.png";

export type Social = {
  label: string;
  href: string;
  icon?: string;
  glyph?: string;
};

export type Highlight = {
  title: string;
  timeline: string;
  description: string;
  logo: StaticImageData;
  href: string;
};

export type FeaturedProject = {
  label: string;
  title: string;
  description: string;
  tags: readonly string[];
  code: string;
  live?: string;
  article?: string;
  preview: StaticImageData;
};

export type ArchiveProject = {
  title: string;
  description: string;
  tags: readonly string[];
  code: string;
};

export type WritingChannel = {
  title: string;
  blurb: string;
  href: string;
  logo: StaticImageData;
};

export const hero = {
  eyebrow: "yo! I am",
  name: "fuyofulo",
  bio: "I'm a software engineer currently focused on indexing the Solana blockchain. My work spans Solana programs, distributed systems, and full-stack applications.",
} as const;

export const socials: Social[] = [
  {
    label: "github",
    href: "https://github.com/fuyofulo",
    icon: "/assets/github2-142-svgrepo-com.svg",
  },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/fuyofulo",
    icon: "/assets/linkedin-svgrepo-com.svg",
  },
  {
    label: "x",
    href: "https://x.com/fuyofulo",
    glyph: "𝕏",
  },
  {
    label: "email",
    href: "mailto:fuyofulo@gmail.com",
    icon: "/assets/gmail-svgrepo-com.svg",
  },
];

export const highlights: Highlight[] = [
  {
    title: "100xDevs - Super 30",
    timeline: "Sep 2025 – Mar 2026",
    description:
      "Hacker house style program at 100xSchool, Noida focused on backend projects, Solana, and distributed systems.",
    logo: devsLogo,
    href: "https://x.com/100xSchool",
  },
  {
    title: "Superteam - Solana India Fellowship",
    timeline: "Jul 2025 – Sep 2025",
    description:
      "Advanced Rust and Solana fellowship focused on system design, Solana infra, and Anchor development. Graduated top 20 with a $3000 stipend.",
    logo: superteamLogo,
    href: "https://x.com/superteam",
  },
  {
    title: "Rektoff - Cohort 3",
    timeline: "Jan 2026 – Mar 2026",
    description:
      "Focused on low-level Rust and Solana security with a final capstone project auditing a complex Solana program. Graduated with the strongest report in the entire cohort.",
    logo: rektoffLogo,
    href: "https://x.com/rektoff_xyz",
  },
  {
    title: "The Knowledge Society",
    timeline: "2022 – 2024",
    description:
      "Global Accelerator for the world's most ambitious teens. Pursued Brain Computer Interfaces alongside technical challenges from MasterCard, Shell, IKEA and more.",
    logo: tksLogo,
    href: "https://www.tks.world/",
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    label: "Stablecoin Infra",
    title: "Axoria",
    description:
      "Payouts and collections infrastructure for stablecoin teams, built around deterministic workflows, on-chain reconciliation, and proof-backed USDC movement on Solana.",
    tags: ["Node.js", "TypeScript", "Prisma", "React", "Rust"],
    code: "https://github.com/fuyofulo/stablecoin_infra",
    live: "https://axoria.fun",
    preview: axoriaPreview,
  },
  {
    label: "Solana Infra",
    title: "Meteora DLMM Indexer",
    description:
      "Real-time Meteora DLMM data platform with Yellowstone ingestion, IDL-driven decode and enrichment, ClickHouse storage, Redis flush signaling, and a Rust backend powering a live React dashboard.",
    tags: ["Rust", "Solana", "gRPC"],
    code: "https://github.com/fuyofulo/meteora_dlmm_indexer",
    preview: meteoraPreview,
  },
  {
    label: "Distributed Systems",
    title: "raft_kv",
    description:
      "Distributed key-value store in Rust using Raft consensus for replication, leader election, and fault-tolerant state synchronization.",
    tags: ["Rust", "gRPC"],
    code: "https://github.com/fuyofulo/raft_kv",
    article: "https://x.com/fuyofulo/status/2020674400404881615",
    preview: raftPreview,
  },
];

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Pumpswap Indexer",
    description:
      "Yellowstone gRPC indexer that parses raw on-chain streams and decodes buy/sell trades against program IDL definitions.",
    tags: ["Rust", "Solana", "gRPC"],
    code: "https://github.com/fuyofulo/pumpswap-trades-indexer",
  },
  {
    title: "Wide Sandwich Detection",
    description:
      "Rust script that parses raw RPC transaction streams for pumpfun tokens and detects wide sandwich patterns within n+3 slots.",
    tags: ["Rust", "Solana", "gRPC"],
    code: "https://github.com/fuyofulo/astra-assignment",
  },
  {
    title: "Telegram Hedgefund Bot",
    description:
      "Centralized Telegram bot where groups can pool capital, vote for traders, and track strategy outcomes.",
    tags: ["Solana", "TypeScript", "Node.js", "Prisma"],
    code: "https://github.com/fuyofulo/blink_bot",
  },
  {
    title: "Solana Token TSS",
    description:
      "Extended ZenGo's solana-tss library to support SPL token transfers from a MuSig2 aggregated wallet.",
    tags: ["Rust", "Solana"],
    code: "https://github.com/fuyofulo/solana-token-tss",
  },
  {
    title: "Orderbook",
    description:
      "Single-threaded orderbook engine in Rust with deterministic matching flow.",
    tags: ["Rust"],
    code: "https://github.com/fuyofulo/single-threaded-orderbook",
  },
  {
    title: "SPL Token Launchpad",
    description:
      "Solana token launchpad for devnet airdrops, token creation, and mint flows.",
    tags: ["Solana", "React"],
    code: "https://github.com/fuyofulo/axoria",
  },
  {
    title: "Hedge Fund Solana Program",
    description:
      "Hedge-fund style Solana program for pooled capital, whitelisted asset trading, and keeper-driven execution.",
    tags: ["Solana", "Rust", "Anchor"],
    code: "https://github.com/fuyofulo/hedgefund-as-a-service",
  },
  {
    title: "CFD Platform",
    description: "Exness clone focused on market and account workflow replication.",
    tags: ["TypeScript", "Node.js", "React", "Prisma"],
    code: "https://github.com/fuyofulo/exness",
  },
  {
    title: "Escrow Programs",
    description:
      "Collection of baseline Solana escrow program implementations.",
    tags: ["Solana", "Anchor", "Rust", "Redis"],
    code: "https://github.com/fuyofulo/escrow-programs",
  },
  {
    title: "AI Agency Website",
    description: "Agency site integrating a Vapi voice agent and chatbot workflows.",
    tags: ["React"],
    code: "https://github.com/fuyofulo/agency01",
  },
  {
    title: "Restaurant Management System",
    description:
      "Built an MCP server from scratch and integrated it with a chat interface for operations.",
    tags: ["TypeScript", "Node.js", "Prisma", "React"],
    code: "https://github.com/fuyofulo/booking-system",
  },
  {
    title: "Room Chat",
    description: "Realtime room-based chat application written in TypeScript.",
    tags: ["TypeScript", "Node.js", "React"],
    code: "https://github.com/fuyofulo/chat-application",
  },
];

export const newsletter: WritingChannel = {
  title: "fuyo's public diary",
  blurb: "Notes on what I'm building, learning, and figuring out in public.",
  href: "https://fuyofulo.substack.com",
  logo: substackLogo,
};

export const medium: WritingChannel = {
  title: "deep dives",
  blurb:
    "Technical deep dive articles into distributed systems, brain computer interfaces, and computer vision.",
  href: "https://medium.com/@fuyofulo",
  logo: mediumLogo,
};

export const wall = {
  title: "wall of hope",
  blurb:
    "A quiet corner of pictures I return to when things feel heavy.",
  href: "/wall-of-hope",
} as const;

export const nowPlaying = {
  trackName: "one way — cutie pie (instrumental)",
  caption: "soundtrack for shipping code at 2am. press play any time.",
} as const;

export type StatusBadge = {
  kind: string;
  value: string;
  glyph: string;
  modifier?: string;
};

export const statusBadges: StatusBadge[] = [
  { kind: "building", value: "decimal", glyph: "⚒" },
  { kind: "reading", value: "the ascent of money", glyph: "✎" },
  { kind: "mood", value: "deep-focus", glyph: "✦" },
];

