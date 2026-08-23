import { Router, Request, Response } from "express";
import { pool, rowToTask } from "../db.js";
import { validateCompleted, validateTitle } from "../validation.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const result = await pool.query(
    "SELECT id, title, completed, created_at FROM tasks ORDER BY created_at DESC"
  );
  res.json(result.rows.map(rowToTask));
});

router.post("/", async (req: Request, res: Response) => {
  const error = validateTitle(req.body?.title);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const title = (req.body.title as string).trim();
  const result = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, completed, created_at",
    [title]
  );

  res.status(201).json(rowToTask(result.rows[0]));
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid task id" });
    return;
  }

  const { title, completed } = req.body ?? {};
  const updates: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (title !== undefined) {
    const titleError = validateTitle(title);
    if (titleError) {
      res.status(400).json({ error: titleError });
      return;
    }
    updates.push(`title = $${paramIndex++}`);
    values.push((title as string).trim());
  }

  if (completed !== undefined) {
    const completedError = validateCompleted(completed);
    if (completedError) {
      res.status(400).json({ error: completedError });
      return;
    }
    updates.push(`completed = $${paramIndex++}`);
    values.push(completed);
  }

  if (updates.length === 0) {
    res.status(400).json({ error: "No valid fields to update" });
    return;
  }

  values.push(id);
  const result = await pool.query(
    `UPDATE tasks SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING id, title, completed, created_at`,
    values
  );

  if (result.rowCount === 0) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(rowToTask(result.rows[0]));
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid task id" });
    return;
  }

  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(204).send();
});

export default router;
