# AI Coding Agent Benchmark

A small full-stack project for evaluating and comparing AI coding agents in an Agentic Development workflow.

This repository provides a controlled environment for assessing how effectively AI coding agents can understand requirements, implement software, run tests, resolve errors, and deliver a working application with minimal human intervention.

## Project Overview

The benchmark is designed to evaluate AI coding agents such as:

- Cursor
- Claude Code

The main goal is to measure how much of a small software development task an AI coding agent can complete autonomously.

The evaluation focuses on the transition from the traditional development model—where a human developer writes and manages the code—to an Agentic Development model in which a project manager or technical lead defines the requirements and constraints while the AI coding agent performs most of the implementation and validation work.

## Application

The benchmark application is a minimal Task Manager consisting of:

- Backend built with Node.js, TypeScript, and Express
- Frontend built with React, TypeScript, and Vite
- PostgreSQL database
- Docker Compose development and runtime environment

The application supports the following operations:

- Creating tasks
- Listing tasks
- Updating task status
- Marking tasks as completed or uncompleted
- Deleting tasks
- Validating user input

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | List all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Example API Responses

- `POST /api/tasks` → `201 Created`
- `GET /api/tasks` → `200 OK`
- `PATCH /api/tasks/:id` → `200 OK`
- `DELETE /api/tasks/:id` → `204 No Content`

## Benchmark Scope

The benchmark evaluates AI coding agents based on the following criteria:

- Ability to understand an existing repository
- Understanding of project requirements and constraints
- Autonomous implementation
- Backend development
- Frontend development
- Database integration
- CRUD API implementation
- Input validation
- Automated testing
- Type-checking
- Backend and frontend builds
- Runtime validation
- Debugging and error resolution
- Docker interaction
- Required human intervention
- Time required to reach a runnable result
- Quality of project documentation

## Agentic Development Workflow

The benchmark follows a PM-as-Lead workflow.

In this model:

1. The project manager or technical lead defines the requirements.
2. The architecture, technical constraints, and validation requirements are provided to the AI coding agent.
3. The AI coding agent implements the application.
4. The AI coding agent runs tests, type-checks, and builds.
5. The AI coding agent identifies and resolves implementation errors.
6. The final application is validated in a runtime environment.

The objective is to determine whether an AI coding agent can manage most of the development lifecycle without direct human implementation of the application code.

## Repository Structure

The repository uses separate branches or environments for the evaluated agents:

```text
main
├── cursor-agent
└── claude-agent
```

The `main` branch contains the shared project baseline.

Agent-specific implementations, configuration changes, and benchmark results are maintained separately to keep the evaluation environments isolated and comparable.

## Docker and Environment Isolation

The project uses Docker Compose for local development and runtime testing.

To prevent interference between agent runs, each benchmark environment uses separate:

- Containers
- PostgreSQL volumes
- Container names
- Host ports
- Runtime configuration

Example environment separation:

### Cursor Environment

```text
Frontend  → 5173
Backend   → 8001
Database  → 5433
```

### Claude Code Environment

```text
Frontend  → 5174
Backend   → 8002
Database  → 5434
```

The infrastructure configuration is isolated between environments so that both agents can be evaluated independently.

## Validation Requirements

Each implementation is expected to satisfy the following validation requirements:

- Backend tests must be written and executed.
- Backend type-check must pass.
- Backend build must pass.
- Frontend type-check must pass.
- Frontend build must pass.
- PostgreSQL integration must work at runtime.
- CRUD operations must be validated.
- Invalid input must be handled correctly.
- Application errors must be identified and resolved.
- The application must be runnable in the configured environment.

## Evaluation Results

The benchmark compares the agents based on execution time, implementation completeness, testing, validation, debugging, and human intervention.

### Summary

- Cursor reached a runnable full-stack result faster.
- Claude Code performed broader testing and runtime validation.
- Both agents implemented the application without manually written or manually modified application code.
- Both agents successfully implemented the backend, frontend, PostgreSQL integration, CRUD operations, type-checking, and builds.
- Claude Code demonstrated broader validation and debugging activity in this benchmark.
- Cursor demonstrated a shorter time to reach a usable MVP.

> Detailed benchmark results should be documented in the relevant branch or benchmark report.

## Human Intervention

The benchmark aims to minimize direct human intervention.

Human involvement was primarily limited to:

- Approving agent commands when required
- Preparing the runtime environment
- Isolating Docker environments
- Performing infrastructure-level configuration

No application code was manually written or modified by a human during the evaluated implementations.

## Limitations

This benchmark is based on a small Task Manager application and should not be considered a complete measure of overall AI coding agent performance.

The current evaluation does not fully measure:

- Large-scale application architecture
- Long-term maintainability
- Production-level security
- Authentication and authorization
- Performance under load
- Scalability
- Complex business logic
- Cost efficiency across multiple tasks
- Long-term reliability
- Code quality across large repositories

Additional benchmarks with more complex applications and repeated test runs are required before making organization-wide tool selection decisions.

## Purpose

The purpose of this repository is not only to build a working Task Manager.

It is also intended to evaluate whether an AI coding agent can take a clearly defined software task from requirements to a tested and runnable implementation with minimal human intervention.

The project can be used as a starting point for further experiments involving:

- Agentic software development
- PM-as-Lead workflows
- AI-assisted engineering
- Autonomous coding agents
- Software development process automation
- Comparative evaluation of AI coding tools

## License

Add the appropriate license for your project.

For example:

```text
MIT License
```

## Status

This repository is an experimental benchmark and is intended for evaluation and research purposes.
