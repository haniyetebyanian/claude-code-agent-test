import app from './app';
import { initDb } from './db';

const port = Number(process.env.PORT) || 8000;

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Task Manager backend listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database', err);
    process.exit(1);
  });
