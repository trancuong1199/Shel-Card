import { useState, useEffect } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

export default function Faucet() {
  const { account } = useWallet()
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (account?.address) {
      setAddress(account.address.toString())
    }
  }, [account?.address])

  const handleFaucet = (token: 'shelbyusd' | 'aptos') => {
    if (!address) {
      alert('Please enter your wallet address!')
      return
    }
    const url = `https://docs.shelby.xyz/apis/faucet/${token}?address=${address}`
    window.open(url, '_blank')
  }

  return (
    <div style={{
      padding: '80px 20px',
      maxWidth: 800,
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 12, background: 'linear-gradient(135deg, var(--text) 0%, var(--muted) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Testnet Faucet
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Receive testnet tokens (Aptos & ShelbyUSD) to experience the features of the Shelby Protocol.
        </p>
      </div>

      <div style={{
        width: '100%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        padding: 40,
        boxShadow: '0 20px 40px var(--shadow)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)', marginLeft: 4 }}>
            Aptos Wallet Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            style={{
              width: '100%',
              padding: '16px 20px',
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              color: 'var(--text)',
              fontSize: 15,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <button
            onClick={() => handleFaucet('aptos')}
            style={{
              padding: '16px',
              borderRadius: 14,
              border: '1px solid var(--border)',
              background: 'var(--surface2)',
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Faucet Aptos
          </button>

          <button
            onClick={() => handleFaucet('shelbyusd')}
            style={{
              padding: '16px',
              borderRadius: 14,
              border: 'none',
              background: 'var(--accent)',
              color: 'var(--on-accent)',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" />
            </svg>
            Faucet ShelbyUSD
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, color: 'var(--muted)', fontSize: 13, alignItems: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>The faucet link will open a new tab for you to verify the captcha.</span>
      </div>
    </div>
  )
}
