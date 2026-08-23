import express from "express";
import cors from "cors";
import { initDb } from "./db.js";
import tasksRouter from "./routes/tasks.js";

export async function createApp() {
  await initDb();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api/tasks", tasksRouter);

  return app;
}

async function main() {
  const app = await createApp();
  const port = Number(process.env.PORT ?? 8000);

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

import { fileURLToPath } from "url";

const isDirectRun =
  process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}
