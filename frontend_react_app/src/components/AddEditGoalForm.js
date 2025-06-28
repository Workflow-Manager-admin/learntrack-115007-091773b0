import React, { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * Modal/dialog for Add/Edit goal.
 * 
 * Props:
 * - isOpen: boolean
 * - initialGoal: goal (object) for edit, or null/undefined for add
 * - onClose: function
 * - onSubmit: function(goal) -> void
 */
function AddEditGoalForm({ isOpen, initialGoal, onClose, onSubmit }) {
  const isEdit = !!initialGoal;
  const [form, setForm] = useState({
    topicName: "",
    status: "Not Started",
    targetDate: "",
    notes: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setForm(
      initialGoal
        ? {
            topicName: initialGoal.topicName || "",
            status: initialGoal.status || "Not Started",
            targetDate: initialGoal.targetDate || "",
            notes: initialGoal.notes || "",
            category: initialGoal.category || "",
          }
        : {
            topicName: "",
            status: "Not Started",
            targetDate: "",
            notes: "",
            category: "",
          }
    );
    setTimeout(() => {
      firstInputRef.current && firstInputRef.current.focus();
    }, 120);
    setError(null);
  }, [isOpen, initialGoal]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Validate and submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.topicName.trim() || !form.status || !form.targetDate) {
      setError("Topic, status, and target date are required.");
      return;
    }
    // Add id for new goals
    const data = isEdit
      ? { ...initialGoal, ...form }
      : { ...form, id: Date.now().toString(36) + Math.random().toString(36).slice(2) };
    onSubmit(data);
  }

  // Modal closes on overlay click or esc
  function handleBackdrop(e) {
    if (e.target.dataset.role === "modal-backdrop") {
      onClose();
    }
  }
  useEffect(() => {
    if (!isOpen) return;
    function esc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-role="modal-backdrop"
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        zIndex: 2000,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        className="goal-form-modal"
        onSubmit={handleSubmit}
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          borderRadius: "12px",
          minWidth: 320,
          maxWidth: 385,
          width: "90vw",
          padding: "2rem 1.5rem",
          boxShadow: "0 2.5px 16px 2.5px rgba(20, 50, 120, .19)",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          position: "relative"
        }}
        aria-label={isEdit ? "Edit Goal Form" : "Add Goal Form"}
      >
        <span
          style={{
            position: "absolute",
            right: 14,
            top: 10,
            fontSize: 25,
            color: "#e53935",
            fontWeight: 600,
            opacity: 0.77,
            cursor: "pointer"
          }}
          title="Close"
          tabIndex={0}
          aria-label="Close"
          onClick={onClose}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClose()}
          role="button"
        >
          ×
        </span>
        <h3 style={{margin:0, marginBottom:7, fontWeight:700, fontSize:21, letterSpacing:'0.01em'}}>
          {isEdit ? "Edit Learning Goal" : "Add Learning Goal"}
        </h3>
        <label>
          Topic Name<span style={{ color: "#e53935" }}>*</span>
          <input
            ref={firstInputRef}
            type="text"
            name="topicName"
            value={form.topicName}
            onChange={handleChange}
            required
            maxLength={80}
            style={{
              width: "100%",
              padding: "8px",
              margin: "3px 0 0",
              borderRadius: "5px",
              border: "1.5px solid var(--border-color)"
            }}
          />
        </label>
        <label>
          Status<span style={{ color: "#e53935" }}>*</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              marginTop: "3px",
              padding: "7px 5px",
              borderRadius: "5px",
              border: "1.5px solid var(--border-color)"
            }}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Target Date<span style={{ color: "#e53935" }}>*</span>
          <input
            type="date"
            name="targetDate"
            value={form.targetDate}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "3px 0 0",
              borderRadius: "5px",
              border: "1.5px solid var(--border-color)"
            }}
          />
        </label>
        <label>
          Notes
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={2}
            maxLength={180}
            style={{
              width: "100%",
              padding: "7px",
              margin: "3px 0 0",
              borderRadius: "5px",
              border: "1.5px solid var(--border-color)"
            }}
          />
        </label>
        <label>
          Category
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            maxLength={30}
            style={{
              width: "100%",
              padding: "8px",
              margin: "3px 0 0",
              borderRadius: "5px",
              border: "1.5px solid var(--border-color)"
            }}
          />
        </label>
        {error && (
          <div style={{ color: "#e53935", fontWeight: 500, marginTop: 5 }}>
            {error}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 5 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "7px 22px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "7px 25px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              letterSpacing: "0.01em"
            }}
          >
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditGoalForm;
