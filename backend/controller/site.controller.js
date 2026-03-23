import db from "../config/db.connect.js";

export const addEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, category, ticket_link, is_featured, status } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const image = req.file ? req.file.filename : null;

    await db.execute(
      `INSERT INTO events (title, description, date, time, venue, category, image, ticket_link, is_featured, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, date, time, venue, category, image, ticket_link, is_featured === "true" ? 1 : 0, status ?? "upcoming"]
    );

    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = "SELECT * FROM events";
    const params = [];

    if (status || category) {
      const conditions = [];
      if (status) { conditions.push("status = ?"); params.push(status); }
      if (category) { conditions.push("category = ?"); params.push(category); }
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY date DESC";
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Event not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, category, ticket_link, is_featured, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const [existing] = await db.execute("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Event not found" });

    await db.execute(
      `UPDATE events SET title=?, description=?, date=?, time=?, venue=?, category=?,
       image=?, ticket_link=?, is_featured=?, status=? WHERE id=?`,
      [
        title ?? existing[0].title,
        description ?? existing[0].description,
        date ?? existing[0].date,
        time ?? existing[0].time,
        venue ?? existing[0].venue,
        category ?? existing[0].category,
        image ?? existing[0].image,
        ticket_link ?? existing[0].ticket_link,
        is_featured !== undefined ? (is_featured === "true" ? 1 : 0) : existing[0].is_featured,
        status ?? existing[0].status,
        req.params.id,
      ]
    );

    res.json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const [existing] = await db.execute("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Event not found" });

    await db.execute("DELETE FROM events WHERE id = ?", [req.params.id]);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
