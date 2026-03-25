import db from "../config/db.connect.js";
import fs from "fs";
import path from "path";



export const addHeroSection = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    let background_image = null;


    
    
    if (req.file) {
      background_image = req.file.path;
    }

    
    const [existing] = await db.query("SELECT * FROM hero_section LIMIT 1");

    if (existing.length > 0) {
      
      await db.query(
        `UPDATE hero_section SET title=?, subtitle=?, description=?, background_image=? WHERE id=?`,
        [
          title,
          subtitle,
          description,
          background_image || existing[0].background_image, 
          existing[0].id,
        ]
      );
      return res.json({ message: "Hero section added successfully" });
    } else {
    
      await db.query(
        `INSERT INTO hero_section (title, subtitle, description, background_image) VALUES (?, ?, ?, ?)`,
        [title, subtitle, description, background_image]
      );
      return res.json({ message: "Hero section created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving hero section", error: error.message });
  }
};

export const getHeroSection = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM hero_section LIMIT 1");
    if (rows.length === 0)
      return res.status(404).json({ message: "Hero section not found" });
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching hero section", error });
  }
};

export const deleteHeroSection = async (req, res) => {
  try {
    
    const [rows] = await db.query("SELECT * FROM hero_section LIMIT 1");

    if (rows.length === 0) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    const hero = rows[0];

    
    if (hero.background_image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads/hero",
        hero.background_image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    
    await db.query("DELETE FROM hero_section WHERE id = ?", [hero.id]);

    res.json({ message: "Hero section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hero section", error: error.message });
  }
};