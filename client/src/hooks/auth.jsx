import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/check-auth', { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user);  // Assume user info is in the response
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  return { isAuthenticated, user };
};

export default useAuthStatus;
