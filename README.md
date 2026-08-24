# Task Manager

A minimal full-stack Task Manager used to evaluate AI-assisted development.

- **Backend**: Node.js + TypeScript + Express + PostgreSQL (`pg`)
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL 16 (provided by the Docker Compose `database` service)

## Layout

```
backend/             Express REST API (TypeScript)
frontend/            React + Vite single-page UI
docker-compose.yml   Provided services: database, node-backend, node-frontend
```

## API

| Method | Path           | Body                       | Success |
| ------ | -------------- | -------------------------- | ------- |
| GET    | /api/tasks     | –                          | 200     |
| POST   | /api/tasks     | `{ "title": string }`      | 201     |
| PATCH  | /api/tasks/:id | `{ title?, completed? }`   | 200     |
| DELETE | /api/tasks/:id | –                          | 204     |

Invalid input returns `400`; a missing task returns `404`. The `tasks` table
(`id`, `title`, `completed`, `created_at`) is created automatically when the
backend starts.

## Configuration (backend)

Database settings come from the environment; defaults match docker-compose:

| Variable   | Default        |
| ---------- | -------------- |
| PGHOST     | database       |
| PGPORT     | 5432           |
| PGUSER     | agent_user     |
| PGPASSWORD | agent_password |
| PGDATABASE | agent_test     |
| PORT       | 8000           |

`DATABASE_URL` overrides the individual `PG*` values. When running on the host
(outside the compose network) use `PGHOST=localhost PGPORT=5433`.

## Running

Backend:

```
cd backend
npm install
npm run dev        # tsx watch  (or: npm run build && npm start)
```

Frontend:

```
cd frontend
npm install
npm run dev        # Vite dev server on 0.0.0.0:5173
```

The frontend calls `/api/*`, which the Vite dev server proxies to the backend.
Inside docker the proxy target is `http://node-backend:8000`; on the host set
`VITE_PROXY_TARGET=http://localhost:8001`.

## Validation

```
cd backend  && npm test          # Vitest CRUD tests (requires the database)
cd backend  && npm run build     # tsc type-check + emit
cd frontend && npm run build     # tsc -b type-check + vite build
```
