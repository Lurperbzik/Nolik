import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  password: process.env.DB_PASSWORD,
});

pool
  .connect()
  .then(() => {})
  .catch(() => {});

export default pool;
