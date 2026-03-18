import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Market from './components/Market'
import Footer from './components/Footer'
import Leaderboard from './pages/Leaderboard'
import Library from './pages/Library'
import Airdrops from './pages/Airdrops'

import Faucet from './pages/Faucet'

function Home() {
  return (
    <>
      <HeroSection />
      <Market />
    </>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)' }}>
      <Header />
      <main style={{ flex: '1 1 0%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/airdrops" element={<Airdrops />} />
          <Route path="/library" element={<Library />} />
          <Route path="/faucet" element={<Faucet />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}