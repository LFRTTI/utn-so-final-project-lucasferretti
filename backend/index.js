// backend/index.js
const express = require("express");
const db      = require("./db");
require("dotenv").config();              // ← si usás dotenv fuera de Docker

const app  = express();
const PORT = process.env.BACKEND_PORT || 4000;   // ← 1) puerto configurable

app.use(express.json());

// ───── Rutas GET ──────────────────────────────────────────
app.get("/api/ping",   (_req, res) => res.json({ message: "pong" }));
app.get("/api/greet",  (req,  res) => {
  const name = req.query.name || "Mundo";
  res.json({ message: `¡Hola, ${name}!` });
});
app.get("/api/students", async (_req, res) => {
  try {
    const { rows } = await db.query("SELECT id, name FROM students ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// ───── Ruta POST /api/students  ─────────────────────────── 2)
app.post("/api/students", async (req, res) => {
  const { name } = req.body;
  if (!name?.trim())
    return res.status(400).json({ error: "Nombre vacío" });

  try {
    const q       = "INSERT INTO students(name) VALUES($1) RETURNING id, name";
    const { rows } = await db.query(q, [name.trim()]);
    res.status(201).json(rows[0]);                // { id, name }
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// ───── Arranque ───────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => console.log(`App running on port ${PORT}`));
