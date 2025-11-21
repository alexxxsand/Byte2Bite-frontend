import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'

export default function Register() {
const { register } = useAuth()
const nav = useNavigate()
const [name, setName] = useState('')
const [identifier, setIdentifier] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)

const submit = async (e) => {
e.preventDefault()
try {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, identifier, password })
  });

  const data = await response.json();

  if (data.success) {
    nav('/home');   // go to home after successful sign-up
  } else {
    setError(data.message || "Registration failed");
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
<input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
<input placeholder="Email or phone" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
<input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<button className="primary" type="submit">Register</button>
</form>
{error && <p className="error">{error}</p>}
</main>
</div>
)
}
