import { useState } from 'react'

const stats = [
  { label: 'TOTAL PROJECTS', value: '179', change: '+100%', subLabel: 'vs last week', color: '#82E006' },
  { label: 'ACTIVE AIRDROPS', value: '177', change: '+100%', subLabel: 'from yesterday', color: '#82E006' },
  { label: 'TOTAL RAISED', value: '$19.8B', change: '+100%', subLabel: 'this month', color: '#82E006' },
  { label: 'AVG DIFFICULTY', value: '64', color: '#0091ff' },
  { label: 'LOW COST', value: '94', color: '#4ade80' },
  { label: 'IN PROGRESS', value: '0', color: '#ffffff' },
]

const projects = [
  {
    name: 'ZugChain',
    logo: 'https://placehold.co/40x40/000000/ffffff?text=Z',
    joined: '844 Joined',
    pinned: true,
    tags: ['BLOCKCHAIN', 'ACTIVE'],
    cost: '$0',
    time: '10 min',
    fundraise: '$5.5M',
    tasks: '0/10 tasks',
    difficulty: 'Low',
    diffLevel: 20,
    about: 'ZUG Chain is an Enterprise-Grade...',
    xRating: 'Weak',
    xScore: 31,
    update: '3 days ago'
  },
  {
    name: 'Ink',
    logo: 'https://placehold.co/40x40/000000/ffffff?text=I',
    joined: '1,085 Joined',
    pinned: true,
    tags: ['BLOCKCHAIN', 'ACTIVE'],
    cost: '25 $',
    time: '60 min',
    fundraise: '$122.3M',
    tasks: '0/13 tasks',
    difficulty: 'Medium',
    diffLevel: 50,
    about: 'Ink is a Layer-2 blockchain developed...',
    xRating: 'Strong',
    xScore: 1193,
    update: '1 hour ago'
  }
]

export default function Airdrops() {
  const [search, setSearch] = useState('')

  return (
    <div style={{ background: '#000000', minHeight: '100vh', padding: '40px 20px', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, gap: 20, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Airdrop Hub — Track & Farm Verified Airdrops
          </h1>
          <p style={{ color: '#8e97a4', fontSize: 16 }}>
            Discover and master the latest opportunities in the crypto space with our curated guide and tracking tools.
          </p>
        </div>
        <div style={{ background: 'rgba(130, 224, 6, 0.05)', border: '1px solid rgba(130, 224, 6, 0.2)', padding: '8px 16px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#82E006', border: '3px solid rgba(130, 224, 6, 0.2)' }} />
          <span style={{ fontSize: 14, color: '#ffffff' }}>Want to get listed here?</span>
          <button style={{ background: '#1c1c1c', color: '#82E006', padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, border: 'none' }}>Contact us</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#111111', border: '1px solid #222222', borderRadius: 16, padding: '20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8e97a4', marginBottom: 12, letterSpacing: '0.05em' }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
              {s.change && (
                <div style={{ color: '#82E006', fontSize: 11, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
                  {s.change}
                </div>
              )}
            </div>
            {s.subLabel && <div style={{ fontSize: 11, color: '#444', marginTop: 8 }}>{s.subLabel}</div>}
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
          <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input 
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..." 
            style={{ width: '100%', background: '#111111', border: '1px solid #222222', borderRadius: 12, padding: '12px 12px 12px 40px', color: '#ffffff', outline: 'none' }} 
          />
        </div>
        {['All Types', 'All Status', 'All Difficulty'].map(f => (
          <div key={f} style={{ background: '#111111', border: '1px solid #222222', borderRadius: 12, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8e97a4', cursor: 'pointer' }}>
            {f}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        ))}
        <div style={{ background: '#111111', border: '1px solid #222222', borderRadius: 12, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8e97a4', cursor: 'pointer' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8e97a4' }} />
          Watchlist
        </div>
        <div style={{ background: '#111111', border: '1px solid #FFD700', borderRadius: 12, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#ffffff', cursor: 'pointer' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD700' }} />
          Minted - 8945 Pass
        </div>
      </div>

      {/* Table Container */}
      <div style={{ maxWidth: 1280, margin: '0 auto', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                <th style={{ padding: '20px 24px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase' }}>Project Joined</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase', textAlign: 'right' }}>Cost and Time</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase', textAlign: 'right' }}>Fundraise</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase', textAlign: 'center' }}>Tasks</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase' }}>Difficulty</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase' }}>About</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase' }}>X Rating</th>
                <th style={{ padding: '20px 24px', fontSize: 11, fontWeight: 700, color: '#82E006', textTransform: 'uppercase', textAlign: 'right' }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #141414' }}>
                  <td style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <img src={p.logo} alt={p.name} style={{ width: 40, height: 40, borderRadius: 10 }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</span>
                          {p.pinned && <span style={{ fontSize: 10, background: '#82E00622', color: '#82E006', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>📌 Pinned</span>}
                          <span style={{ fontSize: 12, color: '#555' }}>{p.joined}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                          {p.tags.map(t => (
                            <span key={t} style={{ fontSize: 9, background: t === 'ACTIVE' ? '#00A86B' : '#333', color: '#fff', padding: '2px 6px', borderRadius: 10, fontWeight: 800 }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '24px 12px', textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: p.cost.includes('$') ? '#ffffff' : '#ff9900' }}>{p.cost}</div>
                    <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{p.time}</div>
                  </td>
                  <td style={{ padding: '24px 12px', textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{p.fundraise}</div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                       <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', fontSize: 8, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>OP</div>
                    </div>
                  </td>
                  <td style={{ padding: '24px 12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#222', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</div>
                      <span style={{ fontSize: 13, color: '#8e97a4' }}>{p.tasks}</span>
                    </div>
                  </td>
                  <td style={{ padding: '24px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: p.difficulty === 'Low' ? '#82E006' : '#FFD700', marginBottom: 8 }}>{p.difficulty}</div>
                    <div style={{ width: '100%', maxWidth: 80, height: 3, background: '#222', borderRadius: 2 }}>
                      <div style={{ width: `${p.diffLevel}%`, height: '100%', background: p.difficulty === 'Low' ? '#82E006' : '#FFD700', borderRadius: 2 }} />
                    </div>
                  </td>
                  <td style={{ padding: '24px 12px', maxWidth: 200 }}>
                    <div style={{ fontSize: 13, color: '#8e97a4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.about}</div>
                  </td>
                  <td style={{ padding: '24px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, color: p.xRating === 'Weak' ? '#ff4d4d' : '#82E006', fontWeight: 600 }}>{p.xRating}</span>
                      <span style={{ fontSize: 13, fontWeight: 800 }}>{p.xScore}</span>
                    </div>
                    <div style={{ width: '100%', maxWidth: 80, height: 4, background: '#222', borderRadius: 2, marginTop: 8 }}>
                       <div style={{ width: '60%', height: '100%', background: 'linear-gradient(to right, #ff4d4d, #FFD700, #82E006)', borderRadius: 2 }} />
                    </div>
                  </td>
                  <td style={{ padding: '24px', textAlign: 'right' }}>
                    <div style={{ fontSize: 13, color: '#8e97a4' }}>{p.update}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
