const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

let _token = null

function setToken(token) {
_token = token
}

function _headers(isJson = true) {
const headers = {}
if (isJson) headers['Content-Type'] = 'application/json'
if (_token) headers['Authorization'] = `Bearer ${_token}`
return headers
}

async function request(path, options = {}) {
const url = `${API_BASE}${path}`
const res = await fetch(url, options)
return res
}

export default {
setToken,
get: (path) => request(path, { method: 'GET', headers: _headers() }),
post: (path, body) => request(path, { method: 'POST', headers: _headers(), body: JSON.stringify(body) }),
put: (path, body) => request(path, { method: 'PUT', headers: _headers(), body: JSON.stringify(body) }),
del: (path) => request(path, { method: 'DELETE', headers: _headers() })
}
