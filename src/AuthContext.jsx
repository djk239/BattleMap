import { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, getUserProfile, removeTokens } from './services/api';
import { mockAccounts } from './mockdata/mockData';

// Create the context for auth
const AuthContext = createContext();

// Create provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!!token);
    };

    // Initial check on component mount
    checkTokenValidity();

    // Check token validity every minute
    const interval = setInterval(checkTokenValidity, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch the user profile
      getUserProfile()
        .then((userProfile) => {
          // Update the state
          setUser(userProfile);
        })
        .catch((error) => {
          console.error('Failed to fetch user profile:', error);
        });
    }
  }, [isLoggedIn]);

  // Functions to handle login/logout
  
  // Function to handle login
  const handleLog = async () => {
    try {
      // Fetch the user profile
      const userProfile = await getUserProfile();

      // Update the state
      setIsLoggedIn(true);
      setUser(userProfile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeTokens();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleLog, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}