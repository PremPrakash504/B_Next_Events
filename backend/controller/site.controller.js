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
export const getAllBookings = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM booknow");
    res.status(200).json({ success: true, total: rows.length, data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone, service_required, message } = req.body;

    const [result] = await db.query(
      "UPDATE booknow SET full_name = ?, email = ?, phone = ?, service_required = ?, message = ? WHERE id = ?",
      [full_name, email, phone, service_required, message, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM booknow WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};




