# Learning Tracker Backend (Node.js/Express)

This backend provides RESTful APIs for a Personal Learning Tracker app, storing learning goals/topics with CRUD, filtering, and progress summary endpoints.

## Endpoints

- `POST   /api/goals`   — Add a new learning goal
- `GET    /api/goals`   — Get all goals (optionally filtered by `status` or `category`)
- `GET    /api/goals/:id` — Get goal by ID
- `PUT    /api/goals/:id` — Update goal by ID
- `DELETE /api/goals/:id` — Delete goal by ID
- `GET    /api/summary` — Get progress summary

## Data Model

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

Data is stored in `learning_goals.json` (file-based). For development/testing—no external DB needed.

## Scripts

- `npm install`    — install dependencies
- `npm start`      — start the server at http://localhost:4000
- `npm run dev`    — start with nodemon (auto-reload)

## Example

To add a learning goal (POST /api/goals):

```json
{
  "topicName": "JavaScript",
  "status": "In Progress",
  "targetDate": "2024-06-30",
  "notes": "Learn ES6 features",
  "category": "Programming"
}
```
