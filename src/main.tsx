import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { ShelbyClientProvider } from '@shelby-protocol/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { shelbyClient } from './lib/shelby'
import './index.css'
import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AptosWalletAdapterProvider autoConnect={true}>
          <ShelbyClientProvider client={shelbyClient}>
            <App />
          </ShelbyClientProvider>
        </AptosWalletAdapterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
