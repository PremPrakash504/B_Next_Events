import db from "../config/db.connect.js";

export const addbook = async (req, res) => {
  const { full_name, email, phone, service_required, message } = req.body;

  try {
    if (!full_name || !email || !phone || !service_required || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    
    const [existingbook] = await db.query(
      "SELECT * FROM booknow WHERE email=?",
      [email]
    );

    if (existingbook.length > 0) {
      return res.status(400).json({
        message: "This user already booked",
      });
    }

    
    await db.query(
      "INSERT INTO booknow(full_name,email,phone,service_required,message) VALUES(?,?,?,?,?)",
      [full_name, email, phone, service_required, message]
    );

    res.status(200).json({
      message: "Booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};