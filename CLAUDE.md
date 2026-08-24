# CLAUDE.md

## Project

This repository is a small full-stack Task Manager application.

The project is intentionally minimal and is used to evaluate AI-assisted
software development.

## Architecture

The application consists of:

- Backend: Node.js + TypeScript + Express
- Frontend: React + TypeScript + Vite
- Database: PostgreSQL 16
- Local environment: Docker Compose

## Docker Constraints

The existing Docker Compose setup must be preserved.

Do not change, remove, replace, or reconfigure the existing services unless
required for the implementation.

The following host ports are fixed:

- PostgreSQL: 5433
- Backend: 8001
- Frontend: 5173

Do not change these ports.

The existing PostgreSQL configuration must remain unchanged.

## Development Principles

- Keep the implementation small and simple.
- Do not over-engineer the application.
- Prefer existing project infrastructure over introducing new infrastructure.
- Do not add unnecessary dependencies or technologies.
- Inspect the repository before making changes.
- Make implementation decisions autonomously when the requirements are clear.
- Do not ask the user to manually write or modify code unless absolutely necessary.

## Validation

After making changes:

- Run relevant tests.
- Run type checks.
- Run production builds.
- If a command fails, investigate the error and attempt to fix it.
- Re-run the failed validation after fixing the issue.

Do not consider the task complete while known build or test failures remain.

## Scope

Keep the application intentionally small.

Do not introduce authentication, complex authorization, unnecessary routing,
state-management libraries, design systems, external services, or unrelated
features unless explicitly required.

## Reporting

When the task is complete, report:

- Files created or modified
- Commands executed
- Tests and builds performed
- Problems encountered and fixes applied
- Final application status

