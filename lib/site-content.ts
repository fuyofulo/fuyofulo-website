/* Content for the redesigned site. Mirrors the shelf/list data in the
   design handoff, with real cover art wired up from public/books/. */

export type ShelfBook = {
  num: string;
  title: string;
  /** Shorter label when the full title won't fit on a 300px spine. */
  spineTitle?: string;
  subtitle?: string;
  author: string;
  cover: string;
  notes?: string;
  spineColor: string;
  textColor: string;
};

export const shelf: ShelfBook[] = [
  {
    num: "01",
    title: "The Ascent of Money",
    subtitle: "A Financial History of the World",
    author: "Niall Ferguson",
    cover: "/books/ascent_of_money.png",
    notes:
      "money is trust, layered over centuries. banking, bonds, bubbles — each chapter is a system we take for granted, traced back to the moment someone invented it. reading this slowly, chapter by chapter.",
    spineColor: "#121212",
    textColor: "#F5F0E8",
  },
  {
    num: "02",
    title: "The Little Book of Data",
    subtitle: "Understanding the Powerful Analytics that Fuel AI",
    author: "Justin Evans",
    cover: "/books/the_little_book_of_data.png",
    spineColor: "#FAF7F2",
    textColor: "#C0392B",
  },
  {
    num: "03",
    title: "The School of Life",
    subtitle: "An Emotional Education",
    author: "Alain de Botton",
    cover: "/books/school_of_life.png",
    spineColor: "#0F9BD7",
    textColor: "#FFE800",
  },
  {
    num: "04",
    title: "Never Split the Difference",
    subtitle: "Negotiating As If Your Life Depended On It",
    author: "Chris Voss",
    cover: "/books/never_split.png",
    spineColor: "#FFD400",
    textColor: "#111111",
  },
  {
    num: "05",
    title: "Digital Cash",
    subtitle:
      "The Unknown History of the Anarchists, Utopians, and Technologists Who Created Cryptocurrency",
    author: "Finn Brunton",
    cover: "/books/digital_cash.png",
    spineColor: "#0E6B5C",
    textColor: "#D9F2EC",
  },
  {
    num: "06",
    title: "The Art of War",
    author: "Sun Tzu",
    cover: "/books/art_of_war.png",
    spineColor: "#171310",
    textColor: "#C9A96A",
  },
  {
    num: "07",
    title: "Zero to One",
    subtitle: "Notes on Startups, or How to Build the Future",
    author: "Peter Thiel",
    cover: "/books/zero_to_one.png",
    spineColor: "#F7D648",
    textColor: "#22303A",
  },
  {
    num: "08",
    title: "How to Win Friends and Influence People",
    spineTitle: "How to Win Friends",
    author: "Dale Carnegie",
    cover: "/books/how_to_win_friends.png",
    spineColor: "#C0392B",
    textColor: "#FFFFFF",
  },
  {
    num: "09",
    title: "Agar Ab Bhi Na Jage To",
    author: "Shams Naved Usmani",
    cover: "/books/agar_abhi_na_jaage_toh.png",
    spineColor: "#121212",
    textColor: "#D6392E",
  },
  {
    num: "10",
    title: "Why Zebras Don't Get Ulcers",
    spineTitle: "Why Zebras Don't Get Ulcers",
    subtitle: "The Acclaimed Guide to Stress and Coping",
    author: "Robert Sapolsky",
    cover: "/books/zebras_ulcers.png",
    spineColor: "#E8622C",
    textColor: "#FFFFFF",
  },
];

export type Program = {
  name: string;
  dates: string;
  description: string;
  href: string;
};

export const programs: Program[] = [
  {
    name: "100xDevs — Super 30",
    dates: "sep 25 – mar 26",
    description:
      "Hacker house style program at 100xSchool, Noida focused on backend projects, Solana, and distributed systems.",
    href: "https://x.com/100xSchool",
  },
  {
    name: "Superteam — Solana India Fellowship",
    dates: "jul 25 – sep 25",
    description:
      "Advanced Rust and Solana fellowship focused on system design, Solana infra, and Anchor development. Graduated top 20 with a $3000 stipend.",
    href: "https://x.com/superteam",
  },
  {
    name: "Rektoff — Cohort 3",
    dates: "jan 26 – mar 26",
    description:
      "Low-level Rust and Solana security, with a final capstone auditing a complex Solana program. Graduated with the strongest report in the cohort.",
    href: "https://x.com/rektoff_xyz",
  },
  {
    name: "The Knowledge Society",
    dates: "2022 – 2024",
    description:
      "Global accelerator for the world's most ambitious teens. Pursued Brain Computer Interfaces alongside technical challenges from MasterCard, Shell, IKEA and more.",
    href: "https://www.tks.world/",
  },
];

export type Project = {
  name: string;
  tags: string;
  description: string;
  href: string;
};

/* Order matters — this is the grid order in frame 12a. */
export const projects: Project[] = [
  {
    name: "Meteora DLMM Indexer",
    tags: "Rust · Solana · gRPC",
    description:
      "Real-time Meteora DLMM data platform — Yellowstone ingestion, IDL-driven decode, ClickHouse storage, live React dashboard.",
    href: "https://github.com/fuyofulo/meteora_dlmm_indexer",
  },
  {
    name: "raft_kv",
    tags: "Rust · gRPC",
    description:
      "Distributed key-value store in Rust using Raft consensus for replication, leader election, and fault-tolerant state sync.",
    href: "https://github.com/fuyofulo/raft_kv",
  },
  {
    name: "Pumpswap Indexer",
    tags: "Rust · Solana · gRPC",
    description:
      "Yellowstone gRPC indexer that parses raw on-chain streams and decodes buy/sell trades against program IDLs.",
    href: "https://github.com/fuyofulo/pumpswap-trades-indexer",
  },
  {
    name: "Orderbook",
    tags: "Rust",
    description:
      "Single-threaded orderbook engine in Rust with deterministic matching flow.",
    href: "https://github.com/fuyofulo/single-threaded-orderbook",
  },
  {
    name: "Wide Sandwich Detection",
    tags: "Rust · Solana · gRPC",
    description:
      "Rust script that parses raw RPC transaction streams for pumpfun tokens and detects wide sandwich patterns within n+3 slots.",
    href: "https://github.com/fuyofulo/astra-assignment",
  },
  {
    name: "Telegram Hedgefund Bot",
    tags: "Solana · TypeScript · Prisma",
    description:
      "Centralized Telegram bot where groups can pool capital, vote for traders, and track strategy outcomes.",
    href: "https://github.com/fuyofulo/blink_bot",
  },
  {
    name: "Solana Token TSS",
    tags: "Rust · Solana",
    description:
      "Extended ZenGo's solana-tss library to support SPL token transfers from a MuSig2 aggregated wallet.",
    href: "https://github.com/fuyofulo/solana-token-tss",
  },
  {
    name: "Hedge Fund Solana Program",
    tags: "Solana · Rust · Anchor",
    description:
      "Hedge-fund style Solana program for pooled capital, whitelisted asset trading, and keeper-driven execution.",
    href: "https://github.com/fuyofulo/hedgefund-as-a-service",
  },
  {
    name: "CFD Platform",
    tags: "TypeScript · Node.js · Redis",
    description:
      "Real-time CFD trading exchange with leverage, automated liquidation, and stop-loss / take-profit, built around Redis Streams.",
    href: "https://github.com/fuyofulo/exness",
  },
  {
    name: "SPL Token Launchpad",
    tags: "Solana · React",
    description:
      "Solana token launchpad for devnet airdrops, token creation, and mint flows.",
    href: "https://github.com/fuyofulo/axoria",
  },
];

export const heroContent = {
  name: "fuyofulo",
  role: "23, engineer",
  bio: "building decimal — teaching AI to pay the bills. everything else about me is scattered around this page.",
  email: "pheonixdiaz625@gmail.com",
} as const;
