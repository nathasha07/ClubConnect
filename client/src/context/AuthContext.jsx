import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("user");

      if (token && userInfo) {
        try {
          setUser(JSON.parse(userInfo));
        } catch (err) {
          console.error("Error parsing user info:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", { email, password });

      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Store user info
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
