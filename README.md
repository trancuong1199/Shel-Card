# ShelCard 🎴

**ShelCard** is a premium Web3 platform for collecting, managing, and showcasing your on-chain identity through unique blockchain badges and trading cards. Built on the **Shelby Protocol** and high-speed **Aptos** network, ShelCard offers a seamless "Daily Web3 Ritual" for enthusiasts.

---

## ✨ Features

- 🏆 **Leaderboard** — Track the top collectors and earners across the ecosystem. Updated live every 15 minutes.
- 📁 **Library** — Your personal collection of exclusive badges and cards. Manage and delete your own uploads.
- 🎁 **Airdrops** — Discover and participate in the latest verified airdrop opportunities from top Web3 projects.
- 📤 **Card Upload** — Create your own custom trading cards and store them permanently on the decentralized Shelby network.
- ⚡ **Wallet Integration** — Securely connect with Petra Wallet using the Aptos Wallet Adapter.

## 🛠 Tech Stack

- **Frontend:** [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Vanilla CSS with a customized Dark Theme System
- **Blockchain:** [Aptos](https://aptoslabs.com)
- **Protocol:** [Shelby Protocol](https://shelby.xyz) for decentralized hot storage
- **Icons:** Lucide-inspired SVG components

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/shelcard.git
   cd shelcard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to see the application in action.

## 📁 Project Structure

```text
src/
├── components/
│   ├── Header.tsx        # Responsive navigation and wallet connect
│   ├── HeroSection.tsx   # Main landing page content
│   ├── MarketStats.tsx   # Live protocol statistics bar
│   ├── CardUpload.tsx    # Upload modal with local storage support
│   └── Footer.tsx        # Branded footer
├── pages/
│   ├── Leaderboard.tsx   # Ranking system for users
│   ├── Library.tsx       # User collection and management
│   └── Airdrops.tsx      # Reward tracking hub
└── lib/
    └── shelby.ts         # Shelby Protocol SDK initialization
```

## 🌐 Built on
- [Shelby Protocol](https://shelby.xyz)
- [Aptos Labs](https://aptoslabs.com)
- [Jump Crypto](https://jumpcrypto.com)
- [DoubleZero](https://doublezero.xyz)

---

© 2026 ShelCard. Your Daily Web3 Ritual.
