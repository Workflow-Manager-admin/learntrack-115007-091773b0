import React from 'react';

// PUBLIC_INTERFACE
/**
 * Navbar component for branding and theme toggle.
 *
 * Props:
 * - onToggleTheme: function for theme toggle button
 * - theme: current theme ("light" or "dark")
 */
function Navbar({ onToggleTheme, theme }) {
  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem 2.5rem',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
      <span className="navbar-brand" style={{fontWeight:'bold', fontSize: '1.25rem', letterSpacing:'0.04em', color:'var(--button-bg)'}}>Personal Learning Tracker</span>
      <button
        className="theme-toggle"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        onClick={onToggleTheme}
        style={{
          backgroundColor: 'var(--button-bg)',
          color: 'var(--button-text)',
          border: 'none',
          borderRadius: '6px',
          padding: '7px 18px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </nav>
  );
}

export default Navbar;
