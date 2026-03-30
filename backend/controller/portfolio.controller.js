import db from "../config/db.connect.js";
import fs from "fs";
import path from "path";
import compressImage from "../utils/sharpHandler.js";

export const addPortfolio = async (req, res) => {
  try {
    const { title, category_id, description } = req.body;
    const imgs = req.files;

    if (!title || !description || !category_id || !imgs || imgs.length === 0) {
      return res.status(400).json({
        message: "Title, description, image is required",
      });
    }

    await Promise.all(imgs.map(f => compressImage(f.path)));

    const imagePaths = imgs.map((f) => f.path).join(",");

    await db.query(
      "INSERT INTO portfolios (title, category_id, description, image) VALUES (?, ?, ?, ?)",
      [title, category_id, description, imagePaths],
    );

    res.status(200).json({ message: "Portfolio added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT portfolios.*, category.category_name
      FROM portfolios
      LEFT JOIN category ON portfolios.category_id = category.id
    `);

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deletePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query("SELECT * FROM portfolios WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const portfolio = existing[0];
    if (portfolio.image) {
      const images = portfolio.image.split(",");
      images.forEach((img) => {
        const imagePath = path.join(process.cwd(), img);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await db.query("DELETE FROM portfolios WHERE id = ?", [id]);
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;
    const imgs = req.files;

    const [existing] = await db.query("SELECT * FROM portfolios WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    let imagePaths = existing[0].image;

    if (imgs && imgs.length > 0) {
      await Promise.all(imgs.map(f => compressImage(f.path)));
      imagePaths = imgs.map((f) => f.path).join(",");
    }

    await db.query(
      "UPDATE portfolios SET title=?, category=?, description=?, image=? WHERE id=?",
      [title, category, description, imagePaths, id],
    );

    res.status(200).json({ message: "Portfolio updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
