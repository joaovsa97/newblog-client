import { useEffect } from "react";
import { createContext, useState } from "react";
import Cookies from "js-cookie"

import { api } from "../services/api.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await api.post("/login", inputs, {
      body: JSON.stringify(inputs),
      header: { "Content-Type": "application/json" },
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    localStorage.setItem("user", null)
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
