import { createContext, useContext } from "react";

const AuthContext = createContext();
const BASE_URL = "http://localhost:3000"; // Your backend

export function AuthProvider({ children }) {
  const login = async ({ identifier, password }) => {
    const body = identifier.includes("@")
      ? { email: identifier, password }
      : { phone: identifier, password };

    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return res.json();
  };

  const register = async ({ name, identifier, password }) => {
    const body = identifier.includes("@")
      ? { name, email: identifier, password }
      : { name, phone: identifier, password };

    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return res.json();
  };

  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
