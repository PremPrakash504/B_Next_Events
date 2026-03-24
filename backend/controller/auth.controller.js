import db from "../config/db.connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const [rows] = await db.execute("SELECT * FROM admin WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE }
    );

    res.cookie("token", token, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "signout successful" });
  } catch (error) {
    res.status(400).json({ message: "server error", error });
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

