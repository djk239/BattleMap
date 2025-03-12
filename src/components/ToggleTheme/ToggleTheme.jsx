// src/components/ToggleTheme/ToggleTheme.jsx
import { useEffect, useCallback, useState } from 'react';
import styles from './ToggleTheme.module.css';

// Custom hook for theme management
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or system preference
    return localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
};

// Theme toggle component
const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggleContainer}>
      <button 
        className={styles.toggleButton} 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default ToggleTheme;