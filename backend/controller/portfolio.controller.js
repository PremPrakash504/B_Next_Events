import db from "../config/db.connect.js";
import fs from "fs";
import path from "path";
import compressImage from "../utils/sharpHandler.js";

export const addPortfolio = async (req, res) => {
  try {
    const { title, category_id, description, details } = req.body;
    const imgs = req.files;

    if (!title || !description || !category_id || !imgs || imgs.length === 0) {
      return res.status(400).json({ message: "Title, description, category_id and image are required" });
    }

    await Promise.all(imgs.map(f => compressImage(f.path)));
    const imagePaths = imgs.map((f) => f.path).join(",");

    await db.query(
      "INSERT INTO portfolios (title, category_id, description, image, details) VALUES (?, ?, ?, ?, ?)",
      [title, category_id, description, imagePaths, details || null],
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

export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`
      SELECT portfolios.*, category.category_name
      FROM portfolios
      LEFT JOIN category ON portfolios.category_id = category.id
      WHERE portfolios.id = ?
    `, [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Portfolio not found" });

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deletePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query("SELECT * FROM portfolios WHERE id = ?", [id]);

    if (existing.length === 0)
      return res.status(404).json({ message: "Portfolio not found" });

    const portfolio = existing[0];
    if (portfolio.image) {
      const images = portfolio.image.split(",");
      images.forEach((img) => {
        const imagePath = path.join(process.cwd(), img);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
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
    const { title, category_id, description, details } = req.body;
    const imgs = req.files;

    const [existing] = await db.query("SELECT * FROM portfolios WHERE id = ?", [id]);

    if (existing.length === 0)
      return res.status(404).json({ message: "Portfolio not found" });

    let imagePaths = existing[0].image;

    if (imgs && imgs.length > 0) {
      await Promise.all(imgs.map(f => compressImage(f.path)));
      imagePaths = imgs.map((f) => f.path).join(",");
    }

    await db.query(
      "UPDATE portfolios SET title=?, category_id=?, description=?, image=?, details=? WHERE id=?",
      [title, category_id, description, imagePaths, details || null, id],
    );

    res.status(200).json({ message: "Portfolio updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
