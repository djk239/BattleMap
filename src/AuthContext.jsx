import { createContext, useContext, useState, useEffect } from 'react';
//import { getAccessToken, removeTokens } from './api';
import { mockAccounts } from './mockdata/mockData';

// Create the context for auth
const AuthContext = createContext();

// Create provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate fetching the "Guest" user
  const fetchGuestUser = () => {
    const guestUser = mockAccounts.find((account) => account.username === "Guest");
    if (guestUser) {
      setUser(guestUser); // Set the Guest user data
      setIsLoggedIn(false); // Ensure the user is not logged in
    } else {
      console.error('Guest user not found');
    }
  };


  // Checks token on mount
  useEffect(() => {
    const checkTokenValidity = async () => {
      //const token = await getAccessToken();
      //const isValid = !!token;
      setIsLoggedIn(false);

      // If there's no valid token, fetch the Guest user
      //if (!isValid) {
        fetchGuestUser();
      //}
    };

    // Initial check on component mount
    checkTokenValidity();

    // Check token validity every minute
    const interval = setInterval(checkTokenValidity, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Functions to handle login/logout
  const handleLog = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    //removeTokens();
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