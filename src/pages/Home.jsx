import React, { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Drawer from '../components/Drawer'

export default function Home() {
const [drawerOpen, setDrawerOpen] = useState(false)

const openCamera = () => {
// placeholder: in real app open camera, scan, then send to backend
alert('Camera feature placeholder — integrate getUserMedia or native camera API')
}

return (
<div className="page home-page">
<Header onMenu={() => setDrawerOpen(true)} />
<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

<main className="content center">
<h2>Your Pantry</h2>
<p>Scan an item to generate recipes. (Camera button below)</p>
</main>

<BottomNav onCamera={openCamera} />
</div>
)
}
