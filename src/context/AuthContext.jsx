import { createContext, useContext } from "react";

const AuthContext = createContext();
const API_BASE = "http://localhost:3000";

async function loginRequest({ identifier, password }) {
  const body = identifier.includes("@")
    ? { email: identifier, password }
    : { phone: identifier, password };

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json().then(data => ({ ok: res.ok, ...data }));
}

async function registerRequest({ name, identifier, password }) {
  const body = identifier.includes("@")
    ? { name, email: identifier, password }
    : { name, phone: identifier, password };

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json().then(data => ({ ok: res.ok, ...data }));
}

export function AuthProvider({ children }) {
  const value = {
    login: loginRequest,
    register: registerRequest,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
