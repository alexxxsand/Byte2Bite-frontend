import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BottomNav({ onCamera }) {
const nav = useNavigate()
return (
<nav className="bottom-nav">
<button onClick={() => nav('/home')}>Home</button>
<button onClick={onCamera}>Camera</button>
<button onClick={() => nav('/settings')}>Settings</button>
</nav>
)
}
