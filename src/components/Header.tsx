import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import CardUpload from './CardUpload'

const navLinks = [
  { label: 'Home', path: '/', icon: <circle cx="12" cy="12" r="10" /> },
  { label: 'Leaderboard', path: '/leaderboard', icon: <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z" /> },
  { label: 'Upload', path: '#', icon: <path d="M12 2v10M12 2l-4 4M12 2l4 4M2 17l10 5 10-5" /> },
  { label: 'Library', path: '/library', icon: <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2M6 18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M6 18V9h12v9" /> },
  { label: 'Airdrops', path: '/airdrops', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
]

export default function Header() {
  const { connect, disconnect, connected, account, wallets } = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleWallet = () => {
    if (connected) disconnect()
    else {
      const petra = wallets?.find((w: any) => w.name === 'Petra')
      if (petra) connect((petra as any).name)
    }
  }

  const walletLabel = connected && account
    ? `${account.address.toString().slice(0, 6)}...${account.address.toString().slice(-4)}`
    : 'Connect Wallet'

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          height: 58, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16,
        }}>

          {/* Logo Section */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #2b3a4a 0%, #1a232e 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', letterSpacing: -0.2, lineHeight: 1.2 }}>
                ShelCard
              </span>
              <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 500 }}>
                Your Daily Web3 Ritual
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div style={{
            flex: 1, maxWidth: 360, position: 'relative',
            display: 'flex', alignItems: 'center'
          }} className="desktop-only">
            <svg style={{ position: 'absolute', left: 12, color: 'var(--muted)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Find something..."
              style={{
                width: '100%', padding: '9px 12px 9px 36px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border)',
                borderRadius: 10, color: 'var(--text)',
                fontSize: 13, outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--border2)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Nav links */}
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {navLinks.map(link => {
              const isBridge = link.label === 'Upload'
              return (
                <Link
                  key={link.label}
                  to={isBridge ? '#' : link.path}
                  onClick={(e) => {
                    if (isBridge) {
                      e.preventDefault()
                      setShowUpload(true)
                    }
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: location.pathname === link.path ? 'var(--text)' : 'var(--muted)',
                    textDecoration: 'none',
                    fontSize: 13, fontWeight: 600,
                    padding: '8px 14px', borderRadius: 10,
                    transition: 'all .15s', whiteSpace: 'nowrap' as const,
                    background: location.pathname === link.path ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    {link.icon}
                  </svg>
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Account Selector */}
            <div className="desktop-only" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)', cursor: 'pointer'
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: 'var(--text)', color: 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800
              }}>
                T
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {/* Wallet button */}
            <button onClick={handleWallet} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 10,
              fontSize: 13, fontWeight: 700,
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
            }}>
              {walletLabel}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Settings */}
            <button style={{
              width: 36, height: 36, borderRadius: 10,
              border: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>


            {/* Burger - mobile only */}
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
              display: 'none', width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--muted)', cursor: 'pointer',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            display: 'flex', flexDirection: 'column' as const, gap: 2,
            padding: '10px 16px 14px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg)', alignItems: 'center',
          }}>
            {navLinks.map(link => {
              const isBridge = link.label === 'Upload'
              return (
                <Link
                  key={link.label}
                  to={isBridge ? '#' : link.path}
                  onClick={(e) => {
                    setMenuOpen(false)
                    if (isBridge) {
                      e.preventDefault()
                      setShowUpload(true)
                    }
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    color: location.pathname === link.path ? 'var(--text)' : 'var(--muted)',
                    textDecoration: 'none', fontSize: 14, fontWeight: 500,
                    padding: '10px 20px', borderRadius: 8,
                    width: '100%', maxWidth: 280, justifyContent: 'center',
                    background: location.pathname === link.path ? 'var(--surface2)' : 'transparent',
                  }}>
                  {link.label}
                </Link>
              )
            })}
            <div style={{ height: 1, background: 'var(--border)', margin: '6px 0', width: '100%', maxWidth: 280 }} />
            <button onClick={() => { setMenuOpen(false); setShowUpload(true) }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              width: '100%', maxWidth: 280, padding: '10px 20px', borderRadius: 9,
              fontSize: 13, fontWeight: 600,
              background: 'transparent', color: 'var(--accent)',
              border: '1px solid var(--accent)', cursor: 'pointer', marginBottom: 8,
            }}>
              Tải lên File
            </button>
            <button onClick={() => { setMenuOpen(false); handleWallet() }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              width: '100%', maxWidth: 280, padding: '10px 20px', borderRadius: 9,
              fontSize: 13, fontWeight: 600,
              background: connected ? 'transparent' : 'var(--accent)',
              color: connected ? 'var(--accent)' : 'var(--on-accent)',
              border: connected ? '1px solid var(--accent)' : 'none',
              cursor: 'pointer',
            }}>
              {walletLabel}
            </button>
          </div>
        )}
      </nav>

      {showUpload && <CardUpload onClose={() => setShowUpload(false)} />}
    </>
  )
}
