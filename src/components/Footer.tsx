export default function Footer() {
  return (
    <footer>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '20px 20px',
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
        gap: 8, borderTop: '1px solid var(--border)', textAlign: 'center' as const,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' as const }}>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>Built on Shelby Protocol</span>
        </div>
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>© 2026 ShelCard</span>
      </div>
    </footer>
  )
}