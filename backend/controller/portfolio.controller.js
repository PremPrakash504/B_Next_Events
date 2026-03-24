import db from "../config/db.connect.js";

export const addPortfolio = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const imgs = req.files;

    if (!title || !description || !imgs|| imgs ==0) {
      return res.status(400).json({
        message: "Title, description, image is required"
      });
    }

    const imagePaths = imgs.map(f => f.path).join(",");

    await db.query(
      "INSERT INTO portfolios (title, category, description, image) VALUES (?, ?, ?, ?)",
      [title, category, description, imagePaths]
    );

    res.status(200).json({
      message: "Portfolio added successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


export const getPortfolio = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM portfolios");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};