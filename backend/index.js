const express = require("express");
const db = require("./db");

const app = express();
const port = 3000;

// Middleware – para poder leer JSON en el body
app.use(express.json());

/* --------- Rutas --------- */

// Ping básico
app.get("/api/ping", (_req, res) => res.json({ message: "pong" }));

// Saludo simple
app.get("/api/greet", (req, res) => {
  const name = req.query.name || "World";
  res.json({ message: `Hello, ${name}!` });
});

// Listar todos los estudiantes
app.get("/api/students", async (_req, res) => {
  try {
    const result = await db.query("SELECT * FROM students ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

/* 🚀 NUEVO — crear estudiante */
app.post("/api/students", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING id, name",
      [name]
    );
    // Devuelvo solo el nuevo registro
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

/* --------- Servidor --------- */
app.listen(port, () => console.log(`App running on port ${port}`));
