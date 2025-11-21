import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const API_BASE = "http://localhost:3000";

// -------------- LOGIN REQUEST ----------------
async function loginRequest({ identifier, password }) {
  const body = identifier.includes("@")
    ? { email: identifier, password }
    : { phone: identifier, password };

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return { ok: res.ok, ...data };
}

// -------------- REGISTER REQUEST ----------------
async function registerRequest({ name, identifier, password }) {
  const body = identifier.includes("@")
    ? { name, email: identifier, password }
    : { name, phone: identifier, password };

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return { ok: res.ok, ...data };
}

// -------------- AUTH PROVIDER ----------------
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (creds) => {
    const res = await loginRequest(creds);
    if (res.ok && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const register = async (creds) => {
    const res = await registerRequest(creds);
    if (res.ok && res.user) {
      setUser(res.user);
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
