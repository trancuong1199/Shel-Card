import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useDeleteBlobs } from '@shelby-protocol/react'
import { shelbyClient } from '../lib/shelby'

const defaultBadges = [
  {
    id: 1,
    name: 'Soneium Badge',
    network: 'Soneium',
    dotColor: '#8e97a4',
    image: 'https://placehold.co/600x400/151921/ffffff?text=Soneium+Badge',
    description: 'Exclusive collectible badge for Soneium community members. Show your support for the ecosystem.',
  },
  {
    id: 2,
    name: 'Base Badge',
    network: 'Base',
    dotColor: '#0052ff',
    image: 'https://placehold.co/600x400/151921/ffffff?text=Base+Badge',
    description: 'Exclusive collectible badge for Base community members. Show your support for the ecosystem.',
  },
  {
    id: 3,
    name: 'MegaETH Badge',
    network: 'MegaETH',
    dotColor: '#ffffff',
    image: 'https://placehold.co/600x400/151921/ffffff?text=MegaETH+Badge',
    description: 'Exclusive collectible badge for MegaETH community members. Show your support for the ecosystem.',
  },
]

export default function Library() {
  const wallet = useWallet()
  const { connect, wallets, connected } = wallet
  const [allBadges, setAllBadges] = useState(defaultBadges)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const { mutateAsync: deleteBlobs } = useDeleteBlobs({ client: shelbyClient })

  const location = useLocation()

  useEffect(() => {
    const userBadges = JSON.parse(localStorage.getItem('user_badges') || '[]')
    setAllBadges([...userBadges, ...defaultBadges])
  }, [location.key])

  const handleMint = (badgeName: string) => {
    setToastMsg(`Successfully minted ${badgeName}!`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  const handleDelete = async (badge: any) => {
    setIsDeleting(badge.id)
    
    try {
      // 1. If it's a Shelby blob, delete on-chain
      if (badge.blobName && wallet.account) {
        setToastMsg('Deleting from Shelby Network...')
        setShowToast(true)
        
        await deleteBlobs({
          signer: wallet,
          blobNames: [badge.blobName]
        })
      }

      // 2. Remove from Local Storage
      const userBadges = JSON.parse(localStorage.getItem('user_badges') || '[]')
      const updatedUserBadges = userBadges.filter((b: any) => b.id !== badge.id)
      localStorage.setItem('user_badges', JSON.stringify(updatedUserBadges))
      
      setAllBadges(allBadges.filter((b: any) => b.id !== badge.id))
      
      setToastMsg(`Successfully deleted!`)
      setShowToast(true)
    } catch (error: any) {
      console.error('Delete failed:', error)
      alert(`Xóa thất bại: ${error.message}`)
    } finally {
      setIsDeleting(null)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  if (!connected) {
    const handleConnect = () => {
      const petra = wallets?.find((w: any) => w.name === 'Petra') as any
      if (petra) connect(petra.name)
    }

    return (
      <div style={{
        background: 'var(--bg)', minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '0 20px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background Decorations */}
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 145, 255, 0.15) 0%, transparent 70%)',
          top: '20%', left: '10%', filter: 'blur(60px)', animation: 'floatA 10s infinite'
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.1) 0%, transparent 70%)',
          bottom: '10%', right: '5%', filter: 'blur(50px)', animation: 'floatC 8s infinite'
        }} />

        <div className="card fade-up" style={{
          maxWidth: 480, width: '100%', padding: '48px 32px',
          background: 'var(--surface)', backdropFilter: 'blur(24px)',
          border: '1px solid var(--border)', borderRadius: 32,
          textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          position: 'relative', zIndex: 10
        }}>
          {/* Animated Icon Container */}
          <div style={{
            width: 88, height: 88, borderRadius: 24,
            background: 'linear-gradient(135deg, #1e232e 0%, #151921 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px', position: 'relative'
          }}>
            <div className="pulse" style={{
              position: 'absolute', inset: -8, borderRadius: 32,
              background: 'rgba(0, 145, 255, 0.1)', zIndex: -1
            }} />
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
            </svg>
          </div>

          <h2 style={{ color: 'var(--text)', fontSize: 28, fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
            Connect your wallet
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>
            Join the OnChainGM community to unlock and collect exclusive blockchain badges today.
          </p>

          <button
            onClick={handleConnect}
            className="glow"
            style={{
              width: '100%', padding: '16px', borderRadius: 16,
              background: '#0091ff', color: '#ffffff', fontSize: 16, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1 0-4h14v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
            </svg>
            Connect Petra Wallet
          </button>

          <div style={{ marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
            By connecting, you agree to our Terms of Service.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 120 }}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fade-up" style={{
          position: 'fixed', top: 32, left: '50%', transform: 'translateX(-50%)',
          background: '#4ade80', color: '#fff', padding: '12px 28px', borderRadius: 100,
          zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 8px 32px rgba(74, 222, 128, 0.3)', fontWeight: 700
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px 64px', textAlign: 'center' }}>
        <h1 className="fade-up" style={{ color: 'var(--text)', fontSize: 56, fontWeight: 900, marginBottom: 20, letterSpacing: -2 }}>
          Your card
        </h1>
        <p className="fade-up" style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
          Collect exclusive badges across multiple blockchain networks. Support your favorite ecosystems and build your digital legacy.
        </p>
      </div>

      {/* Grid */}
      <div className="badge-grid" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 28px' }}>
        {allBadges.map((badge: any) => (
          <div key={badge.id} className="card fade-up" style={{ overflow: 'hidden' }}>
            {/* Image Container */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: 'var(--surface2)' }}>
              <img src={badge.image} alt={badge.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, var(--surface))' }} />
              
              {/* Delete Button (only for user-uploaded badges) */}
              {badge.id > 1000 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(badge);
                  }}
                  disabled={isDeleting === badge.id}
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    width: 32, height: 32, borderRadius: 8,
                    background: isDeleting === badge.id ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: isDeleting === badge.id ? '#8e97a4' : '#ef4444',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: isDeleting === badge.id ? 'not-allowed' : 'pointer', transition: 'all 0.2s', zIndex: 10
                  }}
                  onMouseEnter={e => { if (isDeleting !== badge.id) e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)' }}
                  onMouseLeave={e => { if (isDeleting !== badge.id) e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)' }}
                >
                  {isDeleting === badge.id ? (
                    <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: badge.dotColor }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{badge.network}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase' }}>Available</span>
                </div>
              </div>

              <h3 style={{ color: 'var(--text)', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{badge.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 24, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {badge.description}
              </p>

              <div
                onClick={() => handleMint(badge.name)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
              >
                Mint Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating CTA */}
      <div className="card fade-up" style={{
        position: 'fixed', bottom: 24, right: 24,
        padding: '24px', width: 320,
        boxShadow: '0 12px 48px var(--shadow)',
        zIndex: 1000,
        background: '#151921'
      }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 8, lineHeight: 1.4, letterSpacing: -0.3 }}>
          Own your card, don't rent it.
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>
          Zero renewal fees. Secure your digital identity with a one-time payment.
        </div>
        <button style={{
          width: '100%', background: 'var(--accent)', color: '#fff',
          border: 'none', padding: '14px', borderRadius: 14,
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 8px 20px var(--accent-lo)'
        }}>
          Register card
        </button>
      </div>
    </div>
  )
}
