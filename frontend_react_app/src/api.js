//
// API Utility for Learning Tracker Frontend (React)
// Replaces all in-memory CRUD with backend Node.js/Express API calls.
//
// API Base URL (for development):
//   http://localhost:4000/api/
//
// API Endpoints used:
//   POST   /api/goals        — Add new goal
//   GET    /api/goals        — Get all/filter goals (query: status, category)
//   GET    /api/goals/:id    — Get goal by id (not needed in basic UI)
//   PUT    /api/goals/:id    — Update goal by id
//   DELETE /api/goals/:id    — Delete goal by id
//   GET    /api/summary      — Fetch progress summary
//

const API_BASE = "http://localhost:4000/api";

/**
 * Handle errors: parse JSON error or fallback to text/status
 */
async function handleError(res) {
  let errorMsg = "Unknown error";
  try {
    const data = await res.json();
    errorMsg = data.error || JSON.stringify(data);
  } catch {
    errorMsg = `${res.status} ${res.statusText}`;
  }
  return errorMsg;
}

// PUBLIC_INTERFACE
/** Add a new goal via POST /api/goals */
export async function apiAddGoal(goal) {
  // Remove "id" property if it exists (IDs generated server-side)
  const { id, ...payload } = goal;
  const res = await fetch(`${API_BASE}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await handleError(res));
  return res.json();
}

// PUBLIC_INTERFACE
/** Get all goals (with optional filters: status, category) via GET /api/goals? */
export async function apiGetGoals(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.category) params.append("category", filters.category);
  const res = await fetch(`${API_BASE}/goals?${params.toString()}`);
  if (!res.ok) throw new Error(await handleError(res));
  return res.json();
}

// PUBLIC_INTERFACE
/** Update a goal by ID via PUT /api/goals/:id */
export async function apiEditGoal(goal) {
  const { id, ...payload } = goal;
  if (!id) throw new Error("No goal id provided for update");
  const res = await fetch(`${API_BASE}/goals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await handleError(res));
  return res.json();
}

// PUBLIC_INTERFACE
/** Delete a goal by id via DELETE /api/goals/:id */
export async function apiDeleteGoal(id) {
  if (!id) throw new Error("No goal id provided for delete");
  const res = await fetch(`${API_BASE}/goals/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await handleError(res));
  return res.json();
}

// PUBLIC_INTERFACE
/** Fetch progress summary via GET /api/summary */
export async function apiGetSummary() {
  const res = await fetch(`${API_BASE}/summary`);
  if (!res.ok) throw new Error(await handleError(res));
  return res.json();
}
