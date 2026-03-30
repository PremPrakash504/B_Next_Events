import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const compressImage = async (filePath, maxSizeKB = 3072) => {
  const buffer = await fs.readFile(filePath);
  const ext = path.extname(filePath).replace(".", "").toLowerCase();
  const format = ext === "jpg" ? "jpeg" : ["jpeg", "png", "webp"].includes(ext) ? ext : "jpeg";

  const compressed = await sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .toFormat(format, { quality: 80 })
    .toBuffer();

  if (compressed.length > maxSizeKB * 1024) {
    const smaller = await sharp(buffer)
      .resize({ width: 1280, withoutEnlargement: true })
      .toFormat(format, { quality: 60 })
      .toBuffer();
    await fs.writeFile(filePath, smaller);
    return;
  }

  await fs.writeFile(filePath, compressed);
};

export default compressImage;
