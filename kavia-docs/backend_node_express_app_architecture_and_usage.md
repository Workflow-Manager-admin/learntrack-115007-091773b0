# Backend Architecture & Usage Documentation

## Overview

This document describes the architecture, API endpoints, data storage, and usage instructions for the **Personal Learning Tracker** backend service, implemented in Node.js with Express. This backend provides all server functionality for a learning goals tracker app, enabling management (CRUD), filtering, and summarization of user learning topics/goals.

---

## Architecture

The backend consists of a single Node.js/Express server, which exposes a RESTful API to manage learning goals. 

- **Storage:** Learning goals are stored persistently in a local JSON file (`learning_goals.json`) within the backend's directory. All operations are performed on this file using Node's synchronous filesystem methods.
- **In-Memory Cache:** Goals are loaded into memory (_array_) at server startup and after each update; all reads and writes are done in memory with explicit persistence to disk when changes occur for performance and simplicity.
- **API:** CRUD endpoints and summary endpoint as described below.

### Mermaid Diagram: Backend Architecture

```mermaid
graph TD
    Client[Client (Frontend or API Client)]
    subgraph Node.js/Express Backend
        App[Express App (server.js)]
        FileStorage[(learning_goals.json)]
    end
    Client -- HTTP/JSON --> App
    App -- Read/Write JSON --> FileStorage
```

---

## API Endpoints

All API endpoints are rooted at `/api`.

| Method   | Endpoint             | Description                              | Body/Params                       |
|----------|----------------------|------------------------------------------|------------------------------------|
| POST     | `/api/goals`         | Add a new learning goal                  | JSON: topicName, status, targetDate, notes, category (opt) |
| GET      | `/api/goals`         | List all goals — filter by status/category | Query: status, category (opt)     |
| GET      | `/api/goals/:id`     | Get a single goal by its ID              | URL param: id                     |
| PUT      | `/api/goals/:id`     | Update an existing goal                  | JSON: any fields to update        |
| DELETE   | `/api/goals/:id`     | Delete a goal by ID                      | URL param: id                     |
| GET      | `/api/summary`       | Get progress summary                     | None                              |

#### Detailed API Docs

##### POST `/api/goals`
- **Request Body Example:**
```json
{
  "topicName": "JavaScript",
  "status": "In Progress",
  "targetDate": "2024-06-30",
  "notes": "Learn ES6 features",
  "category": "Programming"
}
```
- **Response:** 201 + new goal object

##### GET `/api/goals`
- **Optional Filters:** `status`, `category`
- **Response:** Array of goal objects

##### GET `/api/goals/:id`
- **Response:** Single goal object, or 404 if not found

##### PUT `/api/goals/:id`
- **Request Body Example (partial or full):**
```json
{
  "status": "Completed",
  "notes": "Finished all modules"
}
```
- **Response:** Updated goal object

##### DELETE `/api/goals/:id`
- **Response:** Object containing the deleted goal

##### GET `/api/summary`
- **Response Example:**
```json
{
  "total": 8,
  "completed": 4,
  "inProgress": 2,
  "notStarted": 2,
  "percentComplete": 50
}
```

---

## Data Model

Learning goals are represented as plain objects with these properties:

```json
{
  "id": "string (unique id)",
  "topicName": "string",
  "status": "string",
  "targetDate": "string (ISO date)",
  "notes": "string",
  "category": "string"
}
```

- **id** — Unique identifier generated for each goal
- **topicName** — Name of the learning goal or topic
- **status** — Progress status, e.g., `Not Started`, `In Progress`, `Completed`
- **targetDate** — Target completion date (ISO format)
- **notes** — Optional notes about the goal
- **category** — Optional category for filtering (e.g., Programming, Design)

All learning goals are persisted in a single file: `learning_goals.json`.

---

## Data Storage

- **Method:** File-based, using Node.js' `fs` module.
- **Path:** `<project_root>/backend_node_express_app/learning_goals.json`
- All API mutations (`POST`, `PUT`, `DELETE`) write the new state back to file.
- Data is loaded into RAM on server startup and whenever the file is changed.

---

## Running the Backend Locally

### 1. Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (Node package manager)

### 2. Install dependencies

From the backend directory:
```bash
cd learntrack-115007-091773b0/backend_node_express_app
npm install
```

### 3. Start the server

```bash
npm start
```
The server runs on [http://localhost:4000](http://localhost:4000).

#### For auto-reload during development

```bash
npm run dev
```

### 4. Interacting with the API

You can use `curl`, Postman, or your preferred API client to interact with endpoints at `http://localhost:4000/api/...`.

---

## Development Notes

- **No external database** is required; the backend is suitable for development, testing, and small personal deployments.
- The endpoint structure supports easy connection to a future frontend, mobile app, or any REST client.
- Data loss may occur if the server process is killed during file writes; for production, consider migration to a database.

---

## Project File Structure (Simplified)

```
backend_node_express_app/
│
├── server.js            # Main Express server (API, file storage logic)
├── package.json         # Node dependencies & scripts
├── README.md            # Brief inline backend description
└── learning_goals.json  # (Created at runtime) File where learning goals are stored
```

---

## Example Usage

### Adding a new goal:
```bash
curl -X POST http://localhost:4000/api/goals \
  -H "Content-Type: application/json" \
  -d '{"topicName":"Python","status":"Not Started","targetDate":"2024-07-10","notes":"Use online course","category":"Programming"}'
```

### Getting all goals:
```bash
curl http://localhost:4000/api/goals
```

### Filtering by status:
```bash
curl http://localhost:4000/api/goals?status=In%20Progress
```

---

## Contact & Extending

For extending the backend—such as adding authentication, connecting to a database, or implementing user management—begin with `server.js` for route and storage architecture.

---
