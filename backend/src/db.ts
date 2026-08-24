import { Pool } from 'pg';

/**
 * A single connection pool for the app.
 *
 * Connection settings come from the environment so the same code works both
 * inside the docker-compose network (host "database") and from the host
 * machine (localhost:5433). Defaults match the provided compose setup.
 */
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.PGHOST || 'database',
      port: Number(process.env.PGPORT) || 5432,
      user: process.env.PGUSER || 'agent_user',
      password: process.env.PGPASSWORD || 'agent_password',
      database: process.env.PGDATABASE || 'agent_test',
    });

/** Create the tasks table if it does not already exist. */
export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

export default pool;
