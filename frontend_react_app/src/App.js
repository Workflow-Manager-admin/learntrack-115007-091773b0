import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import {
  apiAddGoal,
  apiGetGoals,
  apiEditGoal,
  apiDeleteGoal,
  apiGetSummary,
} from "./api";

// PUBLIC_INTERFACE
/**
 * Application root component.
 * Handles global theme switching, data fetching/mutation from backend API, and top-level error and loading logic.
 *
 * All learning goal operations (CRUD, filter, progress summary) are performed via backend API.
 * See src/api.js for endpoint details.
 */
function App() {
  // Theme preference: store in localStorage, not synced with backend
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });

  // State for learning goals, progress summary, loading UI, error
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState({ status: "", category: "" });
  const [error, setError] = useState("");

  // Effect: Apply theme variable to root + persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  /** Fetch goals (optionally with filters) and sync state */
  const fetchGoalsAndSummary = useCallback(async (activeFilters = filters) => {
    setLoading(true);
    setError("");
    try {
      // Fetch goals with filters (status, category), and summary
      const [goalsList, summaryRes] = await Promise.all([
        apiGetGoals(activeFilters),
        apiGetSummary(),
      ]);
      setGoals(goalsList);
      setSummary(summaryRes);
    } catch (err) {
      setError(`Failed to fetch goals: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // On mount and on filter change: fetch backend data
  useEffect(() => {
    fetchGoalsAndSummary(filters);
  }, [fetchGoalsAndSummary, filters]);

  // PUBLIC_INTERFACE
  /** Add a new goal via backend API */
  const addGoal = async (goal) => {
    setLoading(true);
    setError("");
    try {
      await apiAddGoal(goal);
      // Refetch goals after successful addition
      await fetchGoalsAndSummary();
    } catch (err) {
      setError(`Failed to add goal: ${err.message}`);
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  /** Update goal via backend API */
  const editGoal = async (goal) => {
    setLoading(true);
    setError("");
    try {
      await apiEditGoal(goal);
      await fetchGoalsAndSummary();
    } catch (err) {
      setError(`Failed to edit goal: ${err.message}`);
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  /** Delete a goal by id via backend API */
  const deleteGoal = async (id) => {
    if (!window.confirm("Delete this goal? This action cannot be undone.")) return;
    setLoading(true);
    setError("");
    try {
      await apiDeleteGoal(id);
      await fetchGoalsAndSummary();
    } catch (err) {
      setError(`Failed to delete goal: ${err.message}`);
      setLoading(false);
    }
  };

  // Theme toggle: light/dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <Navbar onToggleTheme={toggleTheme} theme={theme} />
      {error && (
        <div
          style={{
            background: "#ffe1e1",
            color: "#af2237",
            padding: "8px 11px",
            borderRadius: 7,
            margin: "1.5rem auto -1rem",
            fontWeight: 600,
            maxWidth: "690px",
            letterSpacing: "0.01em",
            border: "1.1px solid #e53935",
          }}
        >
          {error}
        </div>
      )}
      <Dashboard
        goals={goals}
        filters={filters}
        setFilters={setFilters}
        onAdd={addGoal}
        onEdit={editGoal}
        onDelete={deleteGoal}
        loading={loading}
        summary={summary}
      />
      <footer
        style={{
          margin: "2.7rem auto 0.6rem",
          textAlign: "center",
          color: "var(--text-secondary)",
          fontSize: "0.97rem",
          opacity: 0.7,
        }}
      >
        <a
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: "var(--button-bg)", fontWeight: 600, textDecoration: "none" }}
        >
          Made with React
        </a>
        <span style={{ margin: "0 8px" }}>&middot;</span>
        <span>Personal Learning Tracker</span>
      </footer>
    </div>
  );
}

export default App;
