import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useUploadBlobs } from '@shelby-protocol/react'
import { shelbyClient } from '../lib/shelby'

interface Props {
  onClose: () => void
}

export default function CardUpload({ onClose }: Props) {
  const navigate = useNavigate()
  const wallet = useWallet()
  const { mutateAsync: uploadBlobs } = useUploadBlobs({ client: shelbyClient })

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setName(selected.name.split('.')[0])
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    }
  }

  const handleUpload = async () => {
    if (!file || !preview) return

    // Check wallet connection for real upload
    if (!wallet.account) {
      alert('Vui lòng kết nối ví để tải lên Shelby Network!')
      return
    }

    setIsUploading(true)

    try {
      // 1. Convert to Uint8Array
      const arrayBuffer = await file.arrayBuffer()
      const blobData = new Uint8Array(arrayBuffer)

      // 2. Prepare Blob Name (path-style for S3 compatibility)
      const blobName = `cards/${wallet.account.address}/${Date.now()}-${file.name}`

      // 3. Upload to Shelby
      // Expiration: 30 days
      const expirationMicros = (Date.now() + 30 * 24 * 60 * 60 * 1000) * 1000

      await uploadBlobs({
        signer: wallet,
        blobs: [{ blobName, blobData }],
        expirationMicros,
      })

      // 4. Save to Local Library
      const newBadge = {
        id: Date.now(),
        name: name || 'New card',
        network: 'Shelby',
        dotColor: '#0091ff',
        image: preview,
        description: description || 'Securely stored on Shelby Protocol.',
        blobName, // Keep for deletion
      }

      const existing = JSON.parse(localStorage.getItem('user_badges') || '[]')
      localStorage.setItem('user_badges', JSON.stringify([newBadge, ...existing]))

      setIsUploading(false)
      setIsSuccess(true)
    } catch (error: any) {
      console.error('Shelby Upload failed:', error)
      setIsUploading(false)

      // Fallback for simulation if API Key is missing (only for development/demo)
      if (error.message?.includes('Unauthorized') || !import.meta.env.VITE_SHELBY_TESTNET_KEY) {
        alert('Note: Running in Demo mode (no API key). Data will be stored locally.')
        const newBadge = {
          id: Date.now(),
          name: name || 'Demo Card',
          network: 'Local (Demo)',
          dotColor: '#8e97a4',
          image: preview,
          description: description || 'Simulation mode active.',
        }
        const existing = JSON.parse(localStorage.getItem('user_badges') || '[]')
        localStorage.setItem('user_badges', JSON.stringify([newBadge, ...existing]))
        setIsSuccess(true)
      } else {
        alert(`Tải lên thất bại: ${error.message}`)
      }
    }
  }

  const handleDone = () => {
    onClose()
    navigate('/library')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(5, 8, 11, 0.9)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: 500, width: '100%',
        background: '#151921',
        border: '1px solid #262c36',
        borderRadius: 24,
        padding: 32,
        boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
        position: 'relative',
        animation: 'fadeUp 0.3s ease-out'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,0.05)', border: 'none',
          color: '#8e97a4', width: 32, height: 32, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: '#4ade8022',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Upload success</h2>
            <p style={{ color: '#8e97a4', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>Your card has been added to the library successfully.</p>
            <button
              onClick={handleDone}
              style={{
                width: '100%', padding: '16px', borderRadius: 16,
                background: '#4ade80', color: '#fff', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s', border: 'none'
              }}
            >
              Great, check now!
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Upload your new Card</h2>
            <p style={{ color: '#8e97a4', fontSize: 14, marginBottom: 24 }}>Create your own Trading Card on the blockchain.</p>

            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #262c36',
                borderRadius: 16,
                padding: preview ? '0' : '40px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: 24,
                transition: 'border-color 0.2s',
                overflow: 'hidden',
                position: 'relative'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#0091ff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#262c36'}
            >
              {preview ? (
                <img src={preview} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              ) : (
                <>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#0091ff1a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Choose image</div>
                  <div style={{ fontSize: 13, color: '#8e97a4' }}>PNG, JPG or GIF (Max 5MB)</div>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            </div>

            {/* Form Inputs */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#8e97a4', marginBottom: 8, textTransform: 'uppercase' }}>Name card</label>
              <input
                value={name} onChange={e => setName(e.target.value)}
                style={{
                  width: '100%', background: '#0b0d10', border: '1px solid #262c36',
                  borderRadius: 12, padding: '12px 16px', color: '#fff', outline: 'none'
                }}
                placeholder="Enter name..."
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#8e97a4', marginBottom: 8, textTransform: 'uppercase' }}>Description</label>
              <textarea
                value={description} onChange={e => setDescription(e.target.value)}
                style={{
                  width: '100%', background: '#0b0d10', border: '1px solid #262c36',
                  borderRadius: 12, padding: '12px 16px', color: '#fff', outline: 'none',
                  minHeight: 80, resize: 'none'
                }}
                placeholder="Write something..."
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              style={{
                width: '100%', padding: '16px', borderRadius: 16,
                background: isUploading ? '#1e232e' : '#0091ff',
                color: '#fff', fontSize: 16, fontWeight: 700,
                cursor: !file || isUploading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12
              }}
            >
              {isUploading ? (
                <>
                  <div style={{ width: 18, height: 18, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Uploading...
                </>
              ) : 'Upload now'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
