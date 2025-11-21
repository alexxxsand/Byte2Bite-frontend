const API_BASE = "http://localhost:3000";

// No tokens needed for your current backend.
function _headers() {
  return {
    "Content-Type": "application/json"
  };
}

async function request(method, path, body = null) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: _headers(),
    body: body ? JSON.stringify(body) : null
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, ...data };
}

export default {
  login: (body) => request("POST", "/login", body),
  register: (body) => request("POST", "/register", body),
  generateRecipes: (body) => request("POST", "/generate-recipes", body),
  saveRecipes: (body) => request("POST", "/recipes/save", body),
  getRecipes: (userId) => request("GET", `/recipes/${userId}`)
};
