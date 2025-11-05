import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        inputs,
        { withCredentials: true }
      );
      // server may return { user } or user directly — prefer .user when available
      const user = res.data?.user ?? res.data;
      setCurrentUser(user);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch { }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
