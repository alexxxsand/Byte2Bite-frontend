import React from 'react'

export default function Header({ onMenu }) {
return (
<header className="header">
<button className="menu-btn" onClick={onMenu}>☰</button>
<div className="brand">
<span className="food">🍎</span>
<h1>Byte2Bite</h1>
<span className="food">🍞</span>
</div>
</header>
)
}
