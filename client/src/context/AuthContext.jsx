import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const DEV_MODE = true; // 🔥 Switch to false when backend ready

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEV_MODE) {
      const mockUser = {
        _id: "123",
        name: "Nathasha Vipin",
        email: "student@example.com",
        role: "admin",
      };
      setUser(mockUser);
      setLoading(false);
      return;
    }

    // Real backend logic will go here later
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
