import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/check-auth",
        { withCredentials: true }
      );
      setIsAuthenticated(true);

      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const updateAuthState = async () => {
    await checkAuth();
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/user/signout",
        {},
        { withCredentials: true }
      );
      //   Cookies.remove("token"); // Remove token
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, loading, updateAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
