import React from "react";
import LearningGoalItem from "./LearningGoalItem";

// PUBLIC_INTERFACE
/**
 * Displays a list/grid of all learning goals.
 *
 * Props:
 * - goals: array of goal objects
 * - onEdit: (goal) => void
 * - onDelete: (goalId) => void
 * - loading: boolean
 */
function LearningGoalsList({ goals, onEdit, onDelete, loading }) {
  if (loading) {
    return <div style={{ margin: "2.2rem", textAlign: "center" }}>Loading...</div>;
  }
  if (!goals.length) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#666",
          margin: "2.5rem 0 0.7rem",
          opacity: 0.8,
          letterSpacing: '0.02em',
        }}
      >
        No learning goals found.
      </div>
    );
  }
  return (
    <div
      className="goals-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
        gap: "1.1rem",
        width: "100%",
        marginTop: 8
      }}
    >
      {goals.map((goal) => (
        <LearningGoalItem
          key={goal.id}
          goal={goal}
          onEdit={() => onEdit(goal)}
          onDelete={() => onDelete(goal.id)}
        />
      ))}
    </div>
  );
}

export default LearningGoalsList;
