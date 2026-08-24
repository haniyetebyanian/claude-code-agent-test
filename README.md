# Claude Code Agent Test

A small full-stack application used to evaluate AI coding agents in an Agentic Development workflow.

## Project Overview

This repository is used as a benchmark environment for evaluating AI coding agents in the implementation of a simple Task Manager application.

The project includes:

* Backend with Node.js, TypeScript, and Express
* Frontend with React, TypeScript, and Vite
* PostgreSQL database
* Docker Compose for local development

## Application

The Task Manager supports:

* Creating tasks
* Listing tasks
* Marking tasks as completed or uncompleted
* Deleting tasks
* Input validation

## API

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/tasks`     | List all tasks |
| POST   | `/api/tasks`     | Create a task  |
| PATCH  | `/api/tasks/:id` | Update a task  |
| DELETE | `/api/tasks/:id` | Delete a task  |

## Docker

The development environment uses Docker Compose.

Default services:

* PostgreSQL
* Node.js Backend
* Node.js Frontend

Default ports:

```text
PostgreSQL → 5433
Backend    → 8001
Frontend   → 5173
```

## Running the Project

Start the services:

```bash
docker compose up -d
```

Check service status:

```bash
docker compose ps
```

Open the frontend:

```text
http://localhost:5173
```

The backend API is available at:

```text
http://localhost:8001/api/tasks
```

## Purpose

The repository is intended as a controlled environment for evaluating AI-assisted software development, including:

* Autonomous implementation
* Testing and validation
* Debugging
* Build and type-check workflows
* Interaction with Docker and databases
* Human intervention requirements
