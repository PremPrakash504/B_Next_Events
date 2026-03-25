import db from "../config/db.connect.js";
export const addClientReview = async (req, res) => {
  try {
    const { name, desigination, feedback, rating } = req.body;
    const designation = desigination;

    const img = req.file; 

    if (!name || !feedback) {
      return res.status(400).json({
        message: "Name and feedback required"
      });
    }

    
    const imagePath = img ? img.path : null;

    await db.query(
      "INSERT INTO clients_say (name, designation, feedback, rating, image) VALUES (?, ?, ?, ?, ?)",
      [name, designation, feedback, rating || 5, imagePath]
    );

    res.status(200).json({
      message: "Review submitted (waiting for approval)"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAllReviewsByAdminBeforeApproval = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clients_say WHERE status = 'pending'");

    res.status(200).json(rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

   
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    await db.query(
      "UPDATE clients_say SET status = ? WHERE id = ?",
      [status, id]
    );

    res.status(200).json({
      message: `Review ${status} successfully`
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const getApprovedReviews = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM clients_say WHERE status = 'approved'"
    );

    res.status(200).json(rows);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM clients_say WHERE id = ?", [id]);

    res.status(200).json({
      message: "Review deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};