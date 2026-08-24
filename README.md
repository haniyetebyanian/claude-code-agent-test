# AI Coding Agent Benchmark

A small full-stack project used to evaluate and compare AI coding agents in an Agentic Development workflow.

## Project Overview

This repository provides a controlled environment for evaluating AI coding agents such as **Cursor** and **Claude Code**.

The benchmark focuses on how much of a small software development task an AI coding agent can complete with minimal human intervention.

## Application

The benchmark application is a minimal **Task Manager** consisting of:

* Backend with Node.js, TypeScript, and Express
* Frontend with React, TypeScript, and Vite
* PostgreSQL database
* Docker Compose development environment

The application supports:

* Creating tasks
* Listing tasks
* Marking tasks as completed or uncompleted
* Deleting tasks
* Input validation

## API

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | List all tasks    |
| POST   | `/api/tasks`     | Create a new task |
| PATCH  | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

## Benchmark Scope

The benchmark evaluates AI coding agents based on criteria such as:

* Ability to understand an existing repository
* Autonomous implementation
* Backend and frontend development
* Database integration
* Automated testing
* Type-checking and builds
* Debugging and error resolution
* Runtime validation
* Required human intervention
* Development time

## Repository Structure

The repository uses separate branches/environments for the evaluated agents.

```text
main
├── cursor-agent
└── claude-agent
```

The `main` branch contains the shared project baseline. Agent-specific implementation and benchmark results are maintained separately.

## Docker

The project uses Docker Compose for local development and runtime testing.

The benchmark environments use isolated containers, volumes, and host ports to prevent interference between agent runs.

## Purpose

The purpose of this repository is not only to build a working Task Manager, but to evaluate whether an AI coding agent can take a clearly defined software task from requirements to a tested and runnable implementation with minimal human intervention.
