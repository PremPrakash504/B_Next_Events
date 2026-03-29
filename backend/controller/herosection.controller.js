import db from "../config/db.connect.js";
import fs from "fs";
import path from "path";
import compressImage from "../utils/sharpHandler.js";

export const addHeroSection = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    let background_image = null;

    if (req.file) {
      background_image = req.file.filename;
    }
     if (req.file) {
  await compressImage(req.file.path);
}
    await db.query(
      `INSERT INTO hero_section (title, subtitle, description, background_image) VALUES (?, ?, ?, ?)`,
      [title, subtitle, description, background_image],
    );

    res.json({ message: "Hero section added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving hero section", error: error.message });
  }
};
export const getHeroSection = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM hero_section ORDER BY id DESC",
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Hero section not found" });

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ message: "Error fetching hero section", error });
  }
};

export const deleteHeroSection = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM hero_section WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    const hero = rows[0];

    if (hero.background_image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads/hero",
        hero.background_image,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.query("DELETE FROM hero_section WHERE id = ?", [id]);

    res.json({ message: "Hero section deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting hero section", error: error.message });
  }
};
