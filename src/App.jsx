// src/App.jsx
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import { AuthProvider } from './AuthContext.jsx';
import Map from './components/Map/Map.jsx';
import Card from './components/Card/Card.jsx';



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
        <Header />
        <Map />
      </div>
      <Card state="CA" />
    </AuthProvider>
  );
}

export default App;