import { useState, useEffect } from 'react'

const leaderboardData = [
  { rank: 1, user: '0xafad...4357', gm: 246, deploy: 728, total: 974, reward: '0.1 ETH' },
  { rank: 2, user: '0xa35a...7709', gm: 283, deploy: 413, total: 696, reward: '0.05 ETH' },
  { rank: 3, user: '0x102f...81a5', gm: 498, deploy: 22, total: 520, reward: '0.04 ETH' },
  { rank: 4, user: '0x9d57...65a5', gm: 237, deploy: 102, total: 339, reward: '0.035 ETH' },
  { rank: 5, user: '0x43cb...2fef', gm: 155, deploy: 140, total: 295, reward: '0.025 ETH' },
  { rank: 6, user: '0x9dc5...3ee8', gm: 220, deploy: 53, total: 273, reward: '0.02 ETH' },
  { rank: 7, user: '0xa6e6...6927', gm: 67, deploy: 171, total: 238, reward: '0.02 ETH' },
]

export default function Leaderboard() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 28px 48px', textAlign: 'center' }}>
        <h1 className="fade-up" style={{ color: 'var(--text)', fontSize: 42, fontWeight: 800, marginBottom: 12, letterSpacing: -0.8 }}>
          ShelCard Leaderboard
        </h1>
        <p className="fade-up" style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 800, margin: '0 auto', lineHeight: 1.6, userSelect: 'none', cursor: 'default' }}>
          Mar 10 - Apr 10, 2026 (UTC) Top 100 users ranked by total GM + Deploy across all mainnet networks will receive rewards listed in the reward section. Only mainnet transactions are counted (excluding testnet).
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
        {/* Main Card */}
        <div className="card fade-up" style={{ overflow: 'hidden' }}>

          {/* Card Header */}
          <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: -0.3, userSelect: 'none', cursor: 'default' }}>User Leaderboard</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-lo)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--accent-mid)' }}>Top 100</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, userSelect: 'none', cursor: 'default' }}>Campaign: Mar 10 - Apr 10, 2026 UTC</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent)', background: 'var(--accent-lo)', padding: '6px 14px', borderRadius: 20, fontWeight: 700 }}>
              <div className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              Updates every 15m
            </div>
          </div>

          {/* User Status Bar */}
          <div style={{ margin: '20px 28px', background: 'var(--accent-lo)', border: '1px solid var(--accent-mid)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent-lo)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', userSelect: 'none', cursor: 'default' }}>Leaderboard Status</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', userSelect: 'none', cursor: 'default' }}>You are currently not in the Top 100.</div>
              </div>
            </div>
            <button style={{ background: 'var(--accent-lo)', color: 'var(--accent)', border: '1px solid var(--accent-mid)', padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Unranked
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 28px', fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, userSelect: 'none', cursor: 'default' }}>#</th>
                  <th style={{ padding: '16px 12px', fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, userSelect: 'none', cursor: 'default' }}>User</th>
                  <th style={{ padding: '16px 12px', fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', userSelect: 'none', cursor: 'default' }}>GM</th>
                  <th style={{ padding: '16px 12px', fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', userSelect: 'none', cursor: 'default' }}>Deploy</th>
                  <th style={{ padding: '16px 12px', fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', userSelect: 'none', cursor: 'default' }}>Total</th>
                  <th style={{ padding: '16px 28px', fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'right', userSelect: 'none', cursor: 'default' }}>Reward</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row, i) => (
                  <tr key={row.rank} style={{ borderBottom: i === leaderboardData.length - 1 ? 'none' : '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 28px' }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 6,
                          background: row.rank === 1 ? 'var(--accent)' : row.rank === 2 ? '#8e97a4' : row.rank === 3 ? '#a66927' : 'var(--surface2)',
                          color: row.rank <= 3 ? '#ffffff' : 'var(--muted)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
                          userSelect: 'none', cursor: 'default'
                        }}>
                          {row.rank}
                        </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', fontFamily: 'monospace', cursor: 'default', userSelect: 'none' }}>{row.user}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8e97a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#10b981', fontSize: 13, fontWeight: 600, userSelect: 'none', cursor: 'default' }}>{row.gm}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: 'var(--accent)', fontSize: 13, fontWeight: 600, userSelect: 'none', cursor: 'default' }}>{row.deploy}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: 'var(--accent)', fontSize: 13, fontWeight: 800, userSelect: 'none', cursor: 'default' }}>{row.total}</td>
                    <td style={{ padding: '16px 28px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', userSelect: 'none', cursor: 'default' }}>{row.reward}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="card fade-up" style={{
        position: 'fixed', bottom: 24, right: 24,
        padding: '20px', width: 300,
        boxShadow: '0 12px 32px var(--shadow)',
        zIndex: 1000,
        background: 'var(--surface)'
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 8, lineHeight: 1.4, letterSpacing: -0.2 }}>
          Own your card, don't rent it.
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
          End all renewal fees. Protect your digital identity with a one-time payment.
        </div>
        <button style={{
          width: '100%', background: 'var(--accent)', color: '#fff',
          border: 'none', padding: '12px', borderRadius: 12,
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 12px var(--accent-lo)'
        }}>
          Get Domain
        </button>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
          position: 'fixed', bottom: 180, right: 24, zIndex: 100,
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--accent)', color: '#ffffff',
          border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px var(--accent-lo)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </div>
  )
}
