const express = require("express");
const db = require("./db");

// Define express app
const app = express();
app.use(express.json());
const port = 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});



// Middleware to parse JSON requests
app.use(express.json());

// Routes

app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'desconocido';
  res.json({ message: `¡Hola, ${name}!` });
});

app.post("/api/students", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    const result = await db.query("INSERT INTO students (name) VALUES ($1) RETURNING *", [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al agregar estudiante:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));
