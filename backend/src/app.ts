import express, { Request, Response, NextFunction } from 'express';
import tasksRouter from './tasks';

const app = express();

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', tasksRouter);

// Unknown route
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'not found' });
});

// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

export default app;
