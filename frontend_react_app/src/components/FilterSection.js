import React from "react";

// PUBLIC_INTERFACE
/**
 * FilterSection component - allows filtering by status and category.
 * 
 * Props:
 * - filters: { status, category }
 * - setFilters: function({ status, category })
 * - categories: array of available categories
 */
function FilterSection({ filters, setFilters, categories }) {
  return (
    <div
      className="filter-section"
      style={{
        display: "flex",
        alignItems: "center",
        background: "var(--bg-secondary)",
        borderRadius: "6px",
        padding: "7px 20px",
        gap: "18px",
        boxShadow: "0 1px 5px 0 rgba(25, 118, 210, 0.07)",
        marginBottom: "0.6rem"
      }}
    >
      <label>
        Status:&nbsp;
        <select
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
          style={{ margin: 0, padding: "3px 9px", borderRadius: 5 }}
        >
          <option value="">All</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Category:&nbsp;
        <select
          value={filters.category}
          onChange={e =>
            setFilters(f => ({ ...f, category: e.target.value }))
          }
          style={{ margin: 0, padding: "3px 9px", borderRadius: 5 }}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FilterSection;
