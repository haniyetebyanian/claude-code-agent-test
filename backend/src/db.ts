import fs from "fs";
import pg from "pg";

const { Pool } = pg;

const inDocker = fs.existsSync("/.dockerenv");

export const pool = new Pool({
  host: process.env.DB_HOST ?? (inDocker ? "database" : "localhost"),
  port: Number(process.env.DB_PORT ?? (inDocker ? 5432 : 5433)),
  database: process.env.DB_NAME ?? "agent_test",
  user: process.env.DB_USER ?? "agent_user",
  password: process.env.DB_PASSWORD ?? "agent_password",
});

export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
}

export function rowToTask(row: {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
}): Task {
  return {
    id: row.id,
    title: row.title,
    completed: row.completed,
    created_at: row.created_at,
  };
}
