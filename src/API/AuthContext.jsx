import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Track login state

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/${decoded._id}`);

      setUser(res.data);
      setIsLoggedIn(true); // ✅ Update login state
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  useEffect(() => {
    fetchUser(); // ✅ Fetch user initially

    // ✅ Listen for changes in localStorage (for login/logout)
    const checkAuth = () => {
      if (localStorage.getItem("token")) {
        fetchUser();
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("storage", checkAuth); // ✅ Detect login/logout changes
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => useContext(AuthContext);
