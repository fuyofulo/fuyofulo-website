/* One-shot: downscale sticker sources to ~2.5x their largest rendered layout
   width and emit WebP (alpha preserved). Pixel-art stickers are skipped —
   resampling would smear the pixel grid, and their PNGs are already small.

   Max rendered layout width per sticker (largest of chaos/clean pose, times
   the overhang factor for -baked images, across every page that uses it). */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";

const DIR = "public/stickers";
const FACTOR = 2.5; // retina + FitFrame upscale headroom

// name -> max rendered layout width (px)
const RENDERED = {
  "books-stack-baked": 392,      // 305 * 1.2854 overhang
  "typewriter-watercolor-baked": 330, // 245 * 1.344
  "camera-baked": 341,           // 250 * 1.3614
  "crt-tv": 175,
  "pinboard-baked": 315,
  "vinyl-player-baked": 220,     // 165 * 1.3312
  "fuyosmile-sticker": 140,
  "fuyosmile-pink": 52,
  "fuyosmile-green": 52,
  "mac-folder": 85,
  "magnifying-glass": 90,
  "iced-coffee": 90,
  "croissant": 105,
  "paper-globe": 113,
  "fountain-pen": 145,
  "keyboard": 120,
  "spiderman": 190,
  "sun": 110,
  "paper-ball": 100,
  "lightbulb": 100,
  "map-pin": 60,
  "rainbow": 182,
  "cat-book": 265,
  "letter-R": 60, "letter-E": 60, "letter-A": 60, "letter-D": 60,
  "letter-I": 60, "letter-N": 60, "letter-G": 60,
};

let before = 0, after = 0;
for (const file of readdirSync(DIR)) {
  if (!file.endsWith(".png")) continue;
  const name = file.replace(".png", "");
  if (name.startsWith("pixel-")) continue; // pixel art: leave alone
  const rendered = RENDERED[name];
  if (rendered == null) {
    console.log(`SKIP (no size known): ${name}`);
    continue;
  }
  const src = `${DIR}/${file}`;
  const out = `${DIR}/${name}.webp`;
  const meta = await sharp(src).metadata();
  const target = Math.min(meta.width, Math.ceil(rendered * FACTOR));
  await sharp(src)
    .resize({ width: target, kernel: "lanczos3" })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(out);
  before += statSync(src).size;
  after += statSync(out).size;
  console.log(
    `${name}: ${meta.width}px -> ${target}px, ` +
    `${(statSync(src).size / 1024).toFixed(0)}KB -> ${(statSync(out).size / 1024).toFixed(0)}KB`,
  );
}
console.log(`\nTOTAL: ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`);
