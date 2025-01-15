import React, { useEffect } from 'react';
import styles from './ToggleTheme.module.css';

function ToggleTheme() {
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button className={styles.toggleButton} onClick={toggleTheme}>
      Toggle Theme 🌙
    </button>
  );
}

export default ToggleTheme;
