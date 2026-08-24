import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import pool, { initDb } from '../src/db';

beforeAll(async () => {
  await initDb();
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY');
});

afterAll(async () => {
  await pool.end();
});

describe('Tasks API', () => {
  it('GET /api/tasks returns an empty array initially', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/tasks creates a task and trims the title', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '  Buy milk  ' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Buy milk', completed: false });
    expect(typeof res.body.id).toBe('number');
    expect(res.body).toHaveProperty('created_at');
  });

  it('POST /api/tasks rejects a missing title with 400', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/tasks rejects a blank title with 400', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '   ' });
    expect(res.status).toBe(400);
  });

  it('GET /api/tasks returns created tasks newest first', async () => {
    await request(app).post('/api/tasks').send({ title: 'First' });
    await request(app).post('/api/tasks').send({ title: 'Second' });

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body.map((t: { title: string }) => t.title)).toEqual(['Second', 'First']);
  });

  it('PATCH /api/tasks/:id toggles completed and persists it', async () => {
    const created = await request(app).post('/api/tasks').send({ title: 'Toggle me' });
    const id = created.body.id;

    const patched = await request(app).patch(`/api/tasks/${id}`).send({ completed: true });
    expect(patched.status).toBe(200);
    expect(patched.body).toMatchObject({ id, completed: true });

    const list = await request(app).get('/api/tasks');
    expect(list.body[0].completed).toBe(true);
  });

  it('PATCH /api/tasks/:id updates the title', async () => {
    const created = await request(app).post('/api/tasks').send({ title: 'Old title' });
    const res = await request(app)
      .patch(`/api/tasks/${created.body.id}`)
      .send({ title: 'New title' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New title');
  });

  it('PATCH /api/tasks/:id rejects a non-boolean completed with 400', async () => {
    const created = await request(app).post('/api/tasks').send({ title: 'Task' });
    const res = await request(app)
      .patch(`/api/tasks/${created.body.id}`)
      .send({ completed: 'yes' });
    expect(res.status).toBe(400);
  });

  it('PATCH /api/tasks/:id returns 404 for a missing task', async () => {
    const res = await request(app).patch('/api/tasks/999999').send({ completed: true });
    expect(res.status).toBe(404);
  });

  it('DELETE /api/tasks/:id removes a task', async () => {
    const created = await request(app).post('/api/tasks').send({ title: 'Delete me' });
    const del = await request(app).delete(`/api/tasks/${created.body.id}`);
    expect(del.status).toBe(204);

    const list = await request(app).get('/api/tasks');
    expect(list.body).toEqual([]);
  });

  it('DELETE /api/tasks/:id returns 404 for a missing task', async () => {
    const res = await request(app).delete('/api/tasks/999999');
    expect(res.status).toBe(404);
  });
});
