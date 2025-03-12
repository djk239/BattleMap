// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { AuthProvider } from './AuthContext';
import Map from './components/Map/Map';
import Account from './components/Account/Account';
import SignupLogin from './components/Login/SignupLogin';
import About from './components/AboutPage/About';
import Leaderboard from './components/Leaderboards/Leaderboard';
import Tutorial from './components/Tutorial/Tutorial';

function App() {
  useEffect(() => {
    // Theme preference logic
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<SignupLogin />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboards" element={<Leaderboard />} />
            <Route path="/tutorial" element={<Tutorial />} />


          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;