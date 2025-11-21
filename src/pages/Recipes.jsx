import React from 'react'
import Header from '../components/Header'

export default function Recipes() {
return (
<div className="page">
<Header onMenu={() => {}} />
<main className="card">
<h2>Recipes</h2>
<p>Generated recipes appear here. You can edit or remove them.</p>
</main>
</div>
)
}
