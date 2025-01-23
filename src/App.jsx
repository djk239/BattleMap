// src/App.jsx
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import { AuthProvider } from './AuthContext.jsx';
import Map from './components/Map/Map.jsx';
import Card from './components/Card/Card.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './components/Account/Account.jsx';



function App() {

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
    
  }, []);

  return (
    <AuthProvider>
      <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/account" element={<Account />} />

        </Routes>
      </Router>
      </div>
    </AuthProvider>
  );
}

export default App;