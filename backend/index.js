import express from 'express';
import db from './db/pool.js';          // export default pool

const app  = express();
const PORT = process.env.BACKEND_PORT || 4000;

app.use(express.json());

app.get('/api/ping', (_req, res) => res.json({ message: 'pong' }));

app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'Mundo';
  res.json({ message: `¡Hola, ${name}!` });
});

app.get('/api/students', async (_req, res) => {
  const { rows } = await db.query('SELECT id, name FROM students ORDER BY id');
  res.json(rows);
});

app.post('/api/students', async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'Nombre vacío' });

  const q = 'INSERT INTO students(name) VALUES($1) RETURNING id, name';
  const { rows } = await db.query(q, [name.trim()]);
  res.status(201).json(rows[0]);
});

app.listen(PORT, '0.0.0.0', () => console.log(`App running on port ${PORT}`));


// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));
