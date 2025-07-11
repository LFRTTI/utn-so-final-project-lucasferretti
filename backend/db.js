
import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
  user:     process.env.PGUSER,
  host:     process.env.PGHOST ?? 'postgres',
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port:     Number(process.env.PGPORT || 5432),
});

export default db;
