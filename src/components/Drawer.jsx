import React from 'react'
import { Link } from 'react-router-dom'

export default function Drawer({ open, onClose }) {
return (
<div className={`drawer ${open ? 'open' : ''}`} onClick={onClose}>
<div className="drawer-content" onClick={(e) => e.stopPropagation()}>
<button className="close" onClick={onClose}>✕</button>
<nav className="drawer-nav">
<Link to="/pantry">Pantry</Link>
<Link to="/recipes">Recipes</Link>
<Link to="/recipes">Edit / Remove</Link>
</nav>
</div>
</div>
)
}
