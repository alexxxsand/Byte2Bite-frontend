import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
const [user, setUser] = useState(null)
const [token, setToken] = useState(() => localStorage.getItem('token'))

useEffect(() => {
if (token) {
// simple token check - in a real app, verify or fetch user
setUser({ name: localStorage.getItem('name') || 'User' })
api.setToken(token)
}
}, [token])

const login = async ({ identifier, password }) => {
// example backend expected: POST /auth/login { identifier, password }
const res = await api.post('/auth/login', { identifier, password })
if (res.ok) {
const data = await res.json()
localStorage.setItem('token', data.token)
localStorage.setItem('name', data.name || data.user?.name || '')
setToken(data.token)
setUser({ name: data.name || data.user?.name || identifier })
api.setToken(data.token)
return { ok: true }
}
return { ok: false, message: await res.text() }
}

const register = async ({ name, identifier, password }) => {
// example: POST /auth/register { name, identifier, password }
const res = await api.post('/auth/register', { name, identifier, password })
if (res.ok) {
const data = await res.json()
localStorage.setItem('token', data.token)
localStorage.setItem('name', name)
setToken(data.token)
setUser({ name })
api.setToken(data.token)
return { ok: true }
}
return { ok: false, message: await res.text() }
}

const logout = () => {
localStorage.removeItem('token')
localStorage.removeItem('name')
setToken(null)
setUser(null)
api.setToken(null)
}

return (
<AuthContext.Provider value={{ user, login, register, logout }}>
{children}
</AuthContext.Provider>
)
}

export function useAuth() {
return useContext(AuthContext)
}
