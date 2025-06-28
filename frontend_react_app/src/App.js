import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

/**
 * Application root component.
 * Holds in-memory learning goal CRUD logic, theme switching, and top-level layout.
 *
 * (In a real full-stack scenario, would use API with useEffect/fetch)
 */
// PUBLIC_INTERFACE
function App() {
  // Load from localStorage as fake "backend"
  const loadGoals = () => {
    try {
      const str = window.localStorage.getItem("learning-goals");
      if (!str) return [];
      return JSON.parse(str);
    } catch {
      return [];
    }
  };
  // Save to localStorage
  const saveGoals = (data) => {
    window.localStorage.setItem("learning-goals", JSON.stringify(data));
  };

  const [theme, setTheme] = useState(() => {
    // Try to persist theme preference
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });
  const [goals, setGoals] = useState(loadGoals());
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ status: "", category: "" });

  // Effect to apply theme to document element and persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync localStorage for goals on changes
  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  // Add a new goal
  // PUBLIC_INTERFACE
  const addGoal = (goal) => {
    setGoals((gs) => [...gs, goal]);
  };

  // Edit/update a goal by id
  // PUBLIC_INTERFACE
  const editGoal = (goal) => {
    setGoals((gs) =>
      gs.map((g) => (g.id === goal.id ? { ...g, ...goal } : g))
    );
  };

  // Delete a goal by id
  // PUBLIC_INTERFACE
  const deleteGoal = (id) => {
    if (window.confirm("Delete this goal? This action cannot be undone.")) {
      setGoals((gs) => gs.filter((g) => g.id !== id));
    }
  };

  // On first load, insert a sample if empty
  useEffect(() => {
    if (goals.length === 0) {
      setGoals([
        {
          id: "demo1",
          topicName: "Learn React Basics",
          status: "In Progress",
          targetDate: "2024-06-25",
          notes: "Finish main docs and build a demo app.",
          category: "Programming"
        },
        {
          id: "demo2",
          topicName: "Read UI/UX Book",
          status: "Not Started",
          targetDate: "2024-07-05",
          notes: "",
          category: "Design"
        }
      ]);
    }
    // eslint-disable-next-line
    // (No dependency warning on purpose)
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <Navbar onToggleTheme={toggleTheme} theme={theme} />
      <Dashboard
        goals={goals}
        filters={filters}
        setFilters={setFilters}
        onAdd={addGoal}
        onEdit={editGoal}
        onDelete={deleteGoal}
        loading={loading}
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
        <span>Personal Learning Tracker Demo</span>
      </footer>
    </div>
  );
}

export default App;
