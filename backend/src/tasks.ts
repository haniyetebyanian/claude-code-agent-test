import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import pool from './db';

const router = Router();

type TaskRow = {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
};

const TASK_COLUMNS = 'id, title, completed, created_at';

/** Wrap an async handler so rejected promises reach the error middleware. */
const wrap =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };

/** Parse a positive integer id from a route param, or null if invalid. */
function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/** Validate and normalize a task title, or null if invalid. */
function validateTitle(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const title = value.trim();
  if (title.length === 0 || title.length > 255) return null;
  return title;
}

// GET /api/tasks — list all tasks, newest first
router.get(
  '/',
  wrap(async (_req, res) => {
    const result = await pool.query<TaskRow>(
      `SELECT ${TASK_COLUMNS} FROM tasks ORDER BY created_at DESC, id DESC`
    );
    res.json(result.rows);
  })
);

// POST /api/tasks — create a task
router.post(
  '/',
  wrap(async (req, res) => {
    const title = validateTitle(req.body?.title);
    if (title === null) {
      res
        .status(400)
        .json({ error: 'title is required and must be a non-empty string (max 255 characters)' });
      return;
    }
    const result = await pool.query<TaskRow>(
      `INSERT INTO tasks (title) VALUES ($1) RETURNING ${TASK_COLUMNS}`,
      [title]
    );
    res.status(201).json(result.rows[0]);
  })
);

// PATCH /api/tasks/:id — update title and/or completed
router.patch(
  '/:id',
  wrap(async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ error: 'invalid task id' });
      return;
    }

    const updates: string[] = [];
    const values: unknown[] = [];

    if (req.body?.title !== undefined) {
      const title = validateTitle(req.body.title);
      if (title === null) {
        res.status(400).json({ error: 'title must be a non-empty string (max 255 characters)' });
        return;
      }
      values.push(title);
      updates.push(`title = $${values.length}`);
    }

    if (req.body?.completed !== undefined) {
      if (typeof req.body.completed !== 'boolean') {
        res.status(400).json({ error: 'completed must be a boolean' });
        return;
      }
      values.push(req.body.completed);
      updates.push(`completed = $${values.length}`);
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'provide at least one field to update (title, completed)' });
      return;
    }

    values.push(id);
    const result = await pool.query<TaskRow>(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING ${TASK_COLUMNS}`,
      values
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'task not found' });
      return;
    }
    res.json(result.rows[0]);
  })
);

// DELETE /api/tasks/:id — delete a task
router.delete(
  '/:id',
  wrap(async (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ error: 'invalid task id' });
      return;
    }
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'task not found' });
      return;
    }
    res.status(204).send();
  })
);

export default router;
