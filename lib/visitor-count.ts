import { promises as fs } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");
const FILE = join(DATA_DIR, "visitor-count.json");
const SEED = 0;

type CounterShape = { count: number };

async function read(): Promise<number> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<CounterShape>;
    return typeof parsed.count === "number" && Number.isFinite(parsed.count)
      ? parsed.count
      : SEED;
  } catch {
    return SEED;
  }
}

async function write(count: number): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify({ count } satisfies CounterShape), "utf8");
}

export async function readVisitorCount(): Promise<number> {
  return read();
}

export async function incrementVisitorCount(): Promise<number> {
  const current = await read();
  const next = current + 1;
  await write(next);
  return next;
}
