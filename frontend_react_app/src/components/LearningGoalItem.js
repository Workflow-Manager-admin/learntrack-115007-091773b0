import React from "react";

// PUBLIC_INTERFACE
/**
 * Card/list row for one learning goal, with edit/delete.
 *
 * Props:
 * - goal: goal object
 * - onEdit: callback
 * - onDelete: callback
 */
function LearningGoalItem({ goal, onEdit, onDelete }) {
  const statusColor =
    goal.status.toLowerCase() === "completed"
      ? "#388e3c"
      : goal.status.toLowerCase() === "in progress"
      ? "#1976d2"
      : "#e53935";
  return (
    <div
      className="goal-item"
      style={{
        background: "var(--bg-secondary)",
        border: "1.5px solid var(--border-color)",
        borderRadius: 11,
        padding: "1.1rem 1rem 1.2rem",
        boxShadow: "0 2px 10px 0px rgba(25, 118, 210, 0.04)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minHeight: "185px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 19, color: "#282c34", marginBottom: 2 }}>
            {goal.topicName}
          </div>
          <span
            style={{
              fontSize: 13.7,
              fontWeight: 700,
              color: statusColor,
              background: "#f3f3f3",
              borderRadius: "5px",
              padding: "2px 10px",
              marginRight: "0.6rem"
            }}
            title={goal.status}
          >
            {goal.status}
          </span>
          {goal.category && (
            <span
              style={{
                fontSize: 12.5,
                color: "#777",
                background: "#e0e7ef",
                borderRadius: "4px",
                padding: "2.5px 8px",
                marginLeft: 4
              }}
              title={goal.category}
            >
              {goal.category}
            </span>
          )}
        </div>
        <div>
          <button
            aria-label="Edit"
            title="Edit"
            onClick={onEdit}
            style={{
              background: "none",
              border: "none",
              color: "#1976d2",
              fontSize: "1.1rem",
              cursor: "pointer",
              marginRight: "1px"
            }}
          >
            ✎
          </button>
          <button
            aria-label="Delete"
            title="Delete"
            onClick={onDelete}
            style={{
              background: "none",
              border: "none",
              color: "#e53935",
              fontSize: "1.13rem",
              cursor: "pointer"
            }}
          >
            🗑️
          </button>
        </div>
      </div>
      <div style={{ margin: "10px 0px 3px 0", color: "#556", fontSize: 15 }}>
        <strong style={{ fontWeight: 600 }}>Target date:</strong>{" "}
        <span>{goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : "—"}</span>
      </div>
      <div
        style={{
          color: "#444",
          fontSize: 14,
          margin: "2px 0 0 0",
          whiteSpace: "pre-line",
          opacity: 0.95
        }}
      >
        <span style={{ fontWeight: 600, color: "#1976d2" }}>Notes:</span> &nbsp;
        {goal.notes || <em style={{ color: "#aaa" }}>No notes.</em>}
      </div>
    </div>
  );
}

export default LearningGoalItem;
