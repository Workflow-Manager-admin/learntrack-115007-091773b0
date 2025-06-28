import React, { useState } from "react";
import ProgressOverview from "./ProgressOverview";
import FilterSection from "./FilterSection";
import LearningGoalsList from "./LearningGoalsList";
import AddEditGoalForm from "./AddEditGoalForm";

// PUBLIC_INTERFACE
/**
 * Dashboard component combines summaries, filter, goals list, and handles add/edit modal.
 *
 * Props:
 * - goals: array of goal objects (from backend API)
 * - filters: { status, category }
 * - setFilters: function to update filters
 * - onAdd: handler to add goal (calls backend)
 * - onEdit: handler to update goal (calls backend)
 * - onDelete: handler to delete goal (calls backend)
 * - loading: boolean (API loading state)
 * - summary: progress summary (from backend /api/summary), optional
 */
function Dashboard({
  goals,
  filters,
  setFilters,
  onAdd,
  onEdit,
  onDelete,
  loading,
  summary, // now supplied by backend
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // Filter goals as per filters prop (already filtered in backend in real API scenario, but kept for client safety)
  const filteredGoals = goals.filter((g) => {
    const matchStatus =
      !filters.status || g.status.toLowerCase() === filters.status.toLowerCase();
    const matchCategory =
      !filters.category ||
      (g.category || "").toLowerCase() === filters.category.toLowerCase();
    return matchStatus && matchCategory;
  });

  // Extract all unique categories for dropdown filter
  const uniqueCategories = Array.from(
    new Set(goals.map((g) => (g.category || "").trim()).filter(Boolean))
  );

  // Open modal for Add or Edit
  const openAddModal = () => {
    setEditingGoal(null); // Add mode
    setShowForm(true);
  };
  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };
  const closeModal = () => setShowForm(false);

  // Add/Edit form callback
  const handleSubmitGoal = (goal) => {
    if (editingGoal) {
      onEdit(goal);
    } else {
      onAdd(goal);
    }
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth: 900, margin: "1.5rem auto", padding: "1.5rem" }}>
      <ProgressOverview summary={summary} loading={loading} />
      <div
        style={{
          margin: "1.5rem 0 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FilterSection
          filters={filters}
          setFilters={setFilters}
          categories={uniqueCategories}
        />
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: "1rem",
            padding: "10px 32px",
            margin: "10px 0px 0px 10px",
            cursor: "pointer",
            boxShadow: "0 1.5px 5px 0px rgba(25, 118, 210, 0.07)",
            letterSpacing: "0.03em",
          }}
          onClick={openAddModal}
        >
          + Add Goal
        </button>
      </div>
      <LearningGoalsList
        goals={filteredGoals}
        onEdit={openEditModal}
        onDelete={onDelete}
        loading={loading}
      />
      {showForm && (
        <AddEditGoalForm
          isOpen={showForm}
          onClose={closeModal}
          onSubmit={handleSubmitGoal}
          initialGoal={editingGoal}
        />
      )}
    </div>
  );
}

export default Dashboard;
