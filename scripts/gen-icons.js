const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const SRC  = "c:/Users/ROHAN/OneDrive/Pictures/Screenshots/Screenshot 2026-04-30 230844.png";
const OUT  = path.join(__dirname, "../public");

async function main() {
  // Crop to square from center
  const { width, height } = await sharp(SRC).metadata();
  const size = Math.min(width, height);
  const left = Math.floor((width  - size) / 2);
  const top  = Math.floor((height - size) / 2);

  const base = sharp(SRC).extract({ left, top, width: size, height: size });

  // Sharpen for small sizes: increase contrast + sharpness
  const sharpen = (s, px) =>
    s.clone()
     .resize(px, px, { kernel: "lanczos3" })
     .sharpen({ sigma: 1.2, m1: 1.5, m2: 0.5 })
     .png({ compressionLevel: 9 });

  await sharpen(base, 180).toFile(path.join(OUT, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png (180x180)");

  await sharpen(base, 64).toFile(path.join(OUT, "logo.png"));
  console.log("✓ logo.png (64x64)");

  const buf32 = await sharpen(base, 32).toBuffer();
  fs.writeFileSync(path.join(OUT, "favicon-32x32.png"), buf32);
  console.log("✓ favicon-32x32.png (32x32)");

  const buf16 = await sharpen(base, 16).toBuffer();
  fs.writeFileSync(path.join(OUT, "favicon-16x16.png"), buf16);
  console.log("✓ favicon-16x16.png (16x16)");

  // Build favicon.ico containing 16x16 and 32x32 PNGs
  const images = [buf16, buf32];
  const sizes  = [16, 32];
  const headerSize   = 6;
  const entrySize    = 16;
  const dataOffset   = headerSize + entrySize * images.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = dataOffset;
  for (let i = 0; i < images.length; i++) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(sizes[i], 0);  // width
    entry.writeUInt8(sizes[i], 1);  // height
    entry.writeUInt8(0,        2);  // color count
    entry.writeUInt8(0,        3);  // reserved
    entry.writeUInt16LE(1,     4);  // planes
    entry.writeUInt16LE(32,    6);  // bit count
    entry.writeUInt32LE(images[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += images[i].length;
    entries.push(entry);
  }

  const ico = Buffer.concat([header, ...entries, ...images]);
  fs.writeFileSync(path.join(OUT, "favicon.ico"), ico);
  console.log("✓ favicon.ico (16+32px)");
}

main().catch(e => { console.error(e); process.exit(1); });
