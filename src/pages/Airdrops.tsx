import { useState } from 'react'

const stats = [
  { label: 'TOTAL PROJECTS', value: '179', change: '+100%', subLabel: 'vs last week', color: 'var(--accent)' },
  { label: 'ACTIVE AIRDROPS', value: '177', change: '+100%', subLabel: 'from yesterday', color: 'var(--accent)' },
  { label: 'TOTAL RAISED', value: '$19.8B', change: '+100%', subLabel: 'this month', color: 'var(--accent)' },
  { label: 'AVG DIFFICULTY', value: '64', color: 'var(--accent)' },
  { label: 'LOW COST', value: '94', color: '#10b981' },
  { label: 'IN PROGRESS', value: '0', color: 'var(--text)' },
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
  const [activeType, setActiveType] = useState('All Types')
  const [activeStatus, setActiveStatus] = useState('All Status')
  const [activeDiff, setActiveDiff] = useState('All Difficulty')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const filterOptions = {
    types: ['All Types', 'Blockchain', 'DeFi', 'NFT', 'Social'],
    status: ['All Status', 'Active', 'Ended', 'Upcoming'],
    difficulty: ['All Difficulty', 'Low', 'Medium', 'High']
  }

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.about.toLowerCase().includes(search.toLowerCase())
    const matchesType = activeType === 'All Types' || p.tags.some(t => t.toLowerCase() === activeType.toLowerCase())
    const matchesStatus = activeStatus === 'All Status' || p.tags.some(t => t.toLowerCase() === activeStatus.toLowerCase())
    const matchesDiff = activeDiff === 'All Difficulty' || p.difficulty.toLowerCase() === activeDiff.toLowerCase()
    
    return matchesSearch && matchesType && matchesStatus && matchesDiff
  })

  // Lint fix: removed unused 'label' from Dropdown props
  const Dropdown = ({ options, activeValue, setter, id }: any) => (
    <div style={{ position: 'relative' }}>
      <div 
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        style={{ 
          background: 'var(--surface)', 
          border: `1px solid ${openDropdown === id ? 'var(--accent)' : 'var(--border)'}`, 
          borderRadius: 12, 
          padding: '0 16px', 
          height: 44,
          display: 'flex', 
          alignItems: 'center', 
          gap: 8, 
          fontSize: 13, 
          color: activeValue.includes('All') ? 'var(--muted)' : 'var(--text)', 
          cursor: 'pointer',
          transition: 'all 0.2s',
          minWidth: 140,
        }}
      >
        <span style={{ flex: 1 }}>{activeValue}</span>
        <svg 
          style={{ transform: openDropdown === id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} 
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      
      {openDropdown === id && (
        <div style={{ 
          position: 'absolute', 
          top: 'calc(100% + 8px)', 
          left: 0, 
          right: 0, 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: 12, 
          zIndex: 100, 
          overflow: 'hidden',
          boxShadow: '0 10px 25px var(--shadow)',
          animation: 'fadeUp 0.2s ease-out'
        }}>
          {options.map((opt: string) => (
            <div 
              key={opt}
              onClick={() => {
                setter(opt)
                setOpenDropdown(null)
              }}
              style={{ 
                padding: '10px 16px', 
                fontSize: 13, 
                color: activeValue === opt ? '#82E006' : '#8e97a4',
                cursor: 'pointer',
                background: activeValue === opt ? 'rgba(130, 224, 6, 0.1)' : 'transparent',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = activeValue === opt ? 'rgba(130, 224, 6, 0.1)' : 'transparent'}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 20px', color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}>
      
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
        <div style={{ background: 'var(--accent-lo)', border: '1px solid var(--accent-mid)', padding: '8px 16px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', border: '3px solid var(--accent-lo)' }} />
          <span style={{ fontSize: 14, color: 'var(--text)' }}>Want to get listed here?</span>
          <button style={{ background: 'var(--surface)', color: 'var(--accent)', padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' }}>Contact us</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px' }}>
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
          <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: search ? '#82E006' : '#444' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input 
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..." 
            style={{ 
              width: '100%', 
              background: 'var(--surface)', 
              border: search ? '1px solid var(--accent)' : '1px solid var(--border)', 
              borderRadius: 12, 
              padding: '12px 12px 12px 40px', 
              color: 'var(--text)', 
              outline: 'none',
              transition: 'border-color 0.2s'
            }} 
          />
        </div>
        
        <Dropdown id="types" options={filterOptions.types} activeValue={activeType} setter={setActiveType} />
        <Dropdown id="status" options={filterOptions.status} activeValue={activeStatus} setter={setActiveStatus} />
        <Dropdown id="difficulty" options={filterOptions.difficulty} activeValue={activeDiff} setter={setActiveDiff} />

        <div style={{ background: '#111111', border: '1px solid #222222', borderRadius: 12, padding: '0 16px', height: 44, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8e97a4', cursor: 'pointer' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8e97a4' }} />
          Watchlist
        </div>
        <div style={{ background: 'rgba(255, 215, 0, 0.05)', border: '1px solid #FFD700', borderRadius: 12, padding: '0 16px', height: 44, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#ffffff', cursor: 'pointer' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD700' }} />
          Minted - 8945 Pass
        </div>
      </div>

      {/* Table Container */}
      <div style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                <th style={{ padding: '20px 24px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>Project Joined</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', textAlign: 'right' }}>Cost and Time</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', textAlign: 'right' }}>Fundraise</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', textAlign: 'center' }}>Tasks</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>Difficulty</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>About</th>
                <th style={{ padding: '20px 12px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>X Rating</th>
                <th style={{ padding: '20px 24px', fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', textAlign: 'right' }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p, i) => (
                  <tr 
                    key={i} 
                    style={{ borderBottom: '1px solid #141414', transition: 'background 0.2s', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#ff4d4d'} onMouseLeave={e => e.currentTarget.style.color = '#444'}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        <img src={p.logo} alt={p.name} style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #222' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</span>
                            {p.pinned && <span style={{ fontSize: 10, background: '#82E00622', color: '#82E006', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>📌 Pinned</span>}
                            <span style={{ fontSize: 12, color: '#555' }}>{p.joined}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                            {p.tags.map(t => (
                              <span key={t} style={{ fontSize: 9, background: t === 'ACTIVE' ? '#00A86B' : '#333', color: '#fff', padding: '2px 6px', borderRadius: 10, fontWeight: 800, textTransform: 'uppercase' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '24px 12px', textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: p.cost.includes('$') && p.cost !== '$0' ? '#ffffff' : p.cost === '$0' ? '#82E006' : '#ff9900' }}>{p.cost}</div>
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
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#222', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8e97a4' }}>0</div>
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
                         <div style={{ width: p.xRating === 'Strong' ? '80%' : '30%', height: '100%', background: p.xRating === 'Strong' ? '#82E006' : '#ff4d4d', borderRadius: 2 }} />
                      </div>
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right' }}>
                      <div style={{ fontSize: 13, color: '#8e97a4' }}>{p.update}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: '60px', textAlign: 'center', color: '#8e97a4' }}>
                    <div style={{ fontSize: 16, marginBottom: 8 }}>No projects found</div>
                    <div style={{ fontSize: 13 }}>Try adjusting your filters or search terms</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
