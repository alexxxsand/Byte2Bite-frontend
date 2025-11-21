import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'

export default function Login() {
const { login } = useAuth()
const nav = useNavigate()
const [identifier, setIdentifier] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)

const submit = async (e) => {
e.preventDefault()
try {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password })
  });

  const data = await response.json();

  if (data.success) {
    nav('/home');   // go to home page after successful login
  } else {
    setError(data.message || "Invalid login information");
  }
} catch (err) {
  console.error(err);
  setError("Something went wrong. Try again.");
}
}

return (
<div className="page auth-page">
<Header onMenu={() => {}} />
<main className="card center">
<h2>Welcome!</h2>
<form onSubmit={submit} className="form">
<input placeholder="Email or phone" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
<input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<button className="primary" type="submit">Login</button>
</form>
{error && <p className="error">{error}</p>}
<p>New here? <Link to="/register">Create an account</Link></p>
</main>
</div>
)
}
