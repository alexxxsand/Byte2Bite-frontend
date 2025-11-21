import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Pantry from './pages/Pantry'
import Recipes from './pages/Recipes'
import Settings from './pages/Settings'
import { useAuth } from './context/AuthContext'

function App() {
const { user } = useAuth()

return (
<div className="app-root">
<Routes>
<Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
<Route path="/register" element={<Register />} />
<Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
<Route path="/pantry" element={user ? <Pantry /> : <Navigate to="/" />} />
<Route path="/recipes" element={user ? <Recipes /> : <Navigate to="/" />} />
<Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />} />
</Routes>
</div>
)
}

export default App
