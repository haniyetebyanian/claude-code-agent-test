import { beforeAll, afterAll, beforeEach, describe, it, expect } from "vitest";
import request from "supertest";
import type { Express } from "express";
import { createApp } from "../src/index.js";
import { pool } from "../src/db.js";

let app: Express;

beforeAll(async () => {
  app = await createApp();
});

beforeEach(async () => {
  await pool.query("DELETE FROM tasks");
});

afterAll(async () => {
  await pool.end();
});

describe("Tasks API", () => {
  it("GET /api/tasks returns empty list initially", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/tasks creates a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Buy milk" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Buy milk");
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeTypeOf("number");
    expect(res.body.created_at).toBeDefined();
  });

  it("POST /api/tasks rejects empty title", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "   " });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("GET /api/tasks returns created tasks", async () => {
    await request(app).post("/api/tasks").send({ title: "Task one" });
    await request(app).post("/api/tasks").send({ title: "Task two" });

    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("PATCH /api/tasks/:id toggles completion", async () => {
    const createRes = await request(app)
      .post("/api/tasks")
      .send({ title: "Toggle me" });
    const id = createRes.body.id;

    const patchRes = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ completed: true });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.completed).toBe(true);
  });

  it("PATCH /api/tasks/:id returns 404 for missing task", async () => {
    const res = await request(app)
      .patch("/api/tasks/99999")
      .send({ completed: true });

    expect(res.status).toBe(404);
  });

  it("DELETE /api/tasks/:id removes a task", async () => {
    const createRes = await request(app)
      .post("/api/tasks")
      .send({ title: "Delete me" });
    const id = createRes.body.id;

    const deleteRes = await request(app).delete(`/api/tasks/${id}`);
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get("/api/tasks");
    expect(listRes.body).toHaveLength(0);
  });

  it("DELETE /api/tasks/:id returns 404 for missing task", async () => {
    const res = await request(app).delete("/api/tasks/99999");
    expect(res.status).toBe(404);
  });
});
