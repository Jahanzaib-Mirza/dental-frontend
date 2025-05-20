import { RouterProvider } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { router } from './routes';

// Create auth context to be used across the app
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

function App() {
  // For development/testing, start with isAuthenticated as true
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  
  // Check if user is already logged in on app load
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (email: string, password: string) => {
    // Here you would normally validate credentials with your API
    // For this example, we'll just accept any credentials
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    console.log('User logged in', email);
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
