const API_BASE = "http://localhost:3000";

export async function login({ identifier, password }) {
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

export async function register({ name, identifier, password }) {
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
