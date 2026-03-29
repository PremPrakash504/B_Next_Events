import sharp from "sharp";
import fs from "fs/promises";

const compressImage = async (filePath, maxSizeKB = 3072) => {
  const buffer = await fs.readFile(filePath);
  
  const compressed = await sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .toFormat(path.extname(file).replace('.', ''))
    .toBuffer();

  // if still over 3mb, reduce quality further
  if (compressed.length > maxSizeKB * 1024) {
    const smaller = await sharp(buffer)
      .resize({ width: 1280, withoutEnlargement: true })
      .jpeg({ quality: 60 })
      .toBuffer();
    await fs.writeFile(filePath, smaller);
    return;
  }

  await fs.writeFile(filePath, compressed);
};

export default compressImage;
