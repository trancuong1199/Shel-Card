import { useState } from 'react'
import CardUpload from './CardUpload'

const networks = [
  { id: 'base', name: 'Base', icon: '🔵', color: '#0052FF', hot: true },
  { id: 'ink', name: 'Ink', icon: '🌀', color: '#A855F7', hot: true },
  { id: 'sonelum', name: 'Sonelum', icon: '🌊', color: '#2DD4BF', hot: true },
  { id: 'ethereum', name: 'Ethereum', icon: '💎', color: '#64748B', hot: true },
  { id: 'unichain', name: 'UniChain', icon: '🦄', color: '#F472B6', hot: true },
  { id: 'megaeth', name: 'MegaETH', icon: '⚡', color: '#334155', hot: true },
  { id: 'plume', name: 'Plume Mainnet', icon: '🪶', color: '#F97316', hot: true },
  { id: 'superposition', name: 'Superposition', icon: '⚫', color: '#000000', hot: true },
]

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('All')
  const [toast, setToast] = useState<{ show: boolean, message: string } | null>(null)
  const [showUpload, setShowUpload] = useState(false)

  const handleConnect = (network: string) => {
    setToast({ show: true, message: `Connected to ${network} successfully!` })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '40px 24px',
      color: 'var(--text)',
      background: 'var(--bg)',
      minHeight: '100vh'
    }}>
      {/* Search & Header (Simplified as we're in Hero) */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 700,
          marginBottom: 32,
          letterSpacing: '-1px',
          userSelect: 'none',
          cursor: 'default'
        }}>
          Shelby is now available for Cards.
        </h1>

        {/* Filter Tabs */}
        <div style={{
          display: 'inline-flex',
          background: '#1a1e26',
          padding: 6,
          borderRadius: 12,
          gap: 4
        }}>
          {['All', 'Testnet', 'Dev'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeTab === tab ? 'var(--accent)' : 'transparent',
                color: activeTab === tab ? '#fff' : 'var(--muted)',
                border: 'none',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowUpload(true)}
          style={{
            marginTop: 32,
            marginLeft: 15,
            padding: '14px 32px',
            borderRadius: 12,
            background: 'var(--accent)',
            color: 'white',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 10px 25px var(--accent-lo)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          Upload your Card
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16
        }}>
          {networks.map(net => (
            <div key={net.id} style={{
              background: '#151921',
              border: '1px solid #262c36',
              borderRadius: 20,
              padding: 20,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {net.hot && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: '#ef4444',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: 6,
                  textTransform: 'uppercase'
                }}>
                  Hot
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#0b0d10',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  border: `2px solid ${net.color}40`
                }}>
                  {net.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, userSelect: 'none', cursor: 'default' }}>{net.name}</div>
                  <button style={{
                    background: `${net.color}30`,
                    color: net.color,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 4
                  }}>
                    Card ↗
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleConnect(net.name)}
                style={{
                  width: '100%',
                  background: net.color === '#000000' ? '#1e232e' : net.color,
                  color: 'white',
                  padding: '12px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  border: 'none'
                }}>
                Connect ⚡
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Connection Status Card */}
          <div style={{
            background: '#151921',
            border: '1px solid #262c36',
            borderRadius: 20,
            padding: 20,
            display: 'flex',
            gap: 16,
            alignItems: 'center'
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: '#1e232e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              📩
              <div style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 8,
                height: 8,
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid #1e232e'
              }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, userSelect: 'none', cursor: 'default' }}>Connect</div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>Connect your card</div>
            </div>
          </div>

          {/* Notifications Card */}
          <div style={{
            background: '#151921',
            border: '1px solid #262c36',
            borderRadius: 20,
            padding: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ color: '#f59e0b' }}>⚡</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, userSelect: 'none', cursor: 'default' }}>Notification</div>
                <div style={{ color: 'var(--muted)', fontSize: 11 }}>Latest updates and news</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'Update...', desc: 'Latest updates and news', color: '#3b82f6', icon: '🚀' },
                { title: 'Update...', desc: 'Latest updates and news', color: '#10b981', icon: '🌐' },
                { title: 'Update...', desc: 'Latest updates and news', color: '#06b6d4', icon: '🎁' },
              ].map((item, id) => (
                <div key={id} style={{
                  background: '#0b0d10',
                  border: '1px solid #262c36',
                  borderRadius: 16,
                  padding: 12,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `${item.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 16,
                    color: item.color
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 11, lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className="slide-in" style={{
          position: 'fixed',
          top: 24,
          right: 24,
          background: 'rgba(16, 185, 129, 0.95)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 12,
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontWeight: 600
        }}>
          <span style={{ fontSize: 20 }}>✅</span>
          {toast.message}
        </div>
      )}
      {showUpload && <CardUpload onClose={() => setShowUpload(false)} />}
    </div>
  )
}