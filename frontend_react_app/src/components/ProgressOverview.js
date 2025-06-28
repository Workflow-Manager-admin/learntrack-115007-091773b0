import React from "react";

// PUBLIC_INTERFACE
/**
 * ProgressOverview component for displaying progress stats and percent bar.
 *
 * Props:
 * - summary: { total, completed, inProgress, notStarted, percentComplete }
 * - loading: boolean
 */
function ProgressOverview({ summary, loading }) {
  const {
    total = 0,
    completed = 0,
    inProgress = 0,
    notStarted = 0,
    percentComplete = 0,
  } = summary || {};
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        borderRadius: "9px",
        padding: "2.2rem 1rem 1.2rem",
        marginBottom: "1rem",
        boxShadow: "0 2px 11px 0px rgba(25, 118, 210, 0.08)",
        textAlign: "center",
      }}
      aria-label="Progress Summary"
    >
      <h2
        style={{
          margin: 0,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.02em",
          color: "var(--button-bg)",
        }}
      >
        {loading ? "Loading..." : "Overall Progress"}
      </h2>
      {!loading && (
        <>
          <div
            style={{
              width: "90%",
              height: "1.15rem",
              margin: "1.1rem auto",
              background: "var(--border-color)",
              borderRadius: 6,
              position: "relative",
            }}
          >
            <div
              style={{
                width: percentComplete + "%",
                height: "100%",
                background: "linear-gradient(90deg, #1976d2, #388e3c)",
                borderRadius: 6,
                transition: "width 0.6s cubic-bezier(0.42,0,0.58,1)",
                minWidth: 6
              }}
              aria-label={`Progress: ${percentComplete}%`}
            />
            <span
              style={{
                position: "absolute",
                right: 8,
                top: 0,
                fontWeight: "bold",
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
              }}
            >
              {percentComplete}%
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 35 }}>
            <span>
              <span
                style={{
                  fontWeight: 700,
                  color: "#1976d2",
                  fontSize: 18,
                }}
              >
                {completed}
              </span>{" "}
              <span style={{ color: "#222", opacity: 0.7 }}>Completed</span>
            </span>
            <span>
              <span
                style={{
                  fontWeight: 700,
                  color: "#388e3c",
                  fontSize: 18,
                }}
              >
                {inProgress}
              </span>{" "}
              <span style={{ color: "#222", opacity: 0.7 }}>In Progress</span>
            </span>
            <span>
              <span
                style={{
                  fontWeight: 700,
                  color: "#e53935",
                  fontSize: 18,
                }}
              >
                {notStarted}
              </span>{" "}
              <span style={{ color: "#222", opacity: 0.7 }}>Not Started</span>
            </span>
          </div>
          <div style={{ marginTop: 9, color: "var(--text-secondary)" }}>
            Total goals: {total}
          </div>
        </>
      )}
    </section>
  );
}

export default ProgressOverview;
