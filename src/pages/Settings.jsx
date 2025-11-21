import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import api from '../services/api'

const DEFAULT_TYPES = [
{ id: 'pro', key: 'Professional Chef', description: 'gourmet, refined, restaurant-quality' },
{ id: 'home', key: 'Home-Cook', description: 'simple, comforting, beginner-friendly' },
{ id: 'budget', key: 'Budget Chef', description: 'cheap ingredients, substitutions, minimal steps' },
{ id: 'healthy', key: 'Healthy/Fitness Chef', description: 'high-protein, balanced, low sugar/fat' }
]

export default function Settings() {
const [types, setTypes] = useState(DEFAULT_TYPES)
const [defaultType, setDefaultType] = useState('Professional Chef')

useEffect(() => {
// attempt to fetch from backend user settings
(async () => {
try {
const res = await api.get('/user/settings')
if (res.ok) {
const data = await res.json()
setDefaultType(data.defaultRecipeType || 'Professional Chef')
}
} catch (e) {
// ignore — use defaults
}
})()
}, [])

const save = async () => {
try {
await api.post('/user/settings', { defaultRecipeType: defaultType })
alert('Settings saved')
} catch (e) {
alert('Failed to save settings')
}
}

return (
<div className="page">
<Header onMenu={() => {}} />
<main className="card">
<h2>Settings</h2>
<p>Select the recipe type you want as your default. The backend default is <strong>Professional Chef</strong>.</p>
<div className="types">
{types.map(t => (
<label key={t.id} className="type-row">
<input type="radio" name="defaultType" value={t.key} checked={defaultType === t.key} onChange={() => setDefaultType(t.key)} />
<div>
<div className="type-title">{t.key}</div>
<div className="type-desc">{t.description}</div>
</div>
</label>
))}
</div>
<button className="primary" onClick={save}>Save</button>
</main>
</div>
)
}
