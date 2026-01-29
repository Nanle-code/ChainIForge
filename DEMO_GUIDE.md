## ChainiForge Demo Guide

### 🌐 Live Demo
**Try ChainiForge now:** https://chainiforge.vercel.app

### 1. Local spin‑up (Optional)

```bash
cd ChainiForge        # project root
npm install           # first time only
npm run dev           # start Vite dev server
```

Open the printed URL (usually `http://localhost:5173`) in a browser with MetaMask (or another injected wallet) installed.

---

### 2. Demo flow (5–7 minutes) - Live at https://chainiforge.vercel.app

1. **Step 1 – Infrastructure & DA**
   - Set **Chain Name**, **Chain ID**, **RPC URL**, **Explorer URL**.
   - Choose **Rollup** vs **Validium**.
   - Pick a **DA tier** (Ethereum / Avail-Celestia / DAC).
   - Scroll to the **Economic Estimator** and:
     - Move **Monthly Transactions** and **Avg Gas (Gwei)**.
     - Toggle DA tiers and call out how **DA cost** and **total CDK cost** change vs **Ethereum L1**.

2. **Step 2 – Network Economy**
   - Choose **Native ETH** or **Custom Token**.
   - If custom, set **Gas Token Symbol** (e.g., `LOYAL`) and **Token Address**.

3. **Step 3 – Permissions & Compliance**
   - Choose **Public** or **Whitelisted / KYC**.
   - If Whitelisted, toggle Polygon ID schemes (Age/Residency, Accredited, Authorized Org) and explain this as **Polygon ID verification schemes**, not a simple KYC flag.

4. **Step 4 – AggLayer & Security**
   - Enable **Connect to AggLayer**.
   - Select **Pessimistic Proofs (Unified)** and read off:
     - Cross‑chain **double‑spend protection**,
     - **Shared liquidity** with Polygon PoS & zkEVM,
     - **Unified bridge** between connected chains.
   - Optional: contrast with **Optimistic** mode.

5. **Step 5 – Review & Launch**
   - Show the summary (architecture + DA, gas token, AggLayer mode, compliance).
   - Click **Launch Network**.
   - In the **Deployment Terminal**:
     - Narrate infra steps (Terraform, prover, DA, bridge).
     - Explain **Hybrid‑Live**:
       - If a wallet is available and funded on **Polygon Amoy**, a real **Management Contract** deployment is sent via `viem` (tx hash + Polygonscan link).
       - If not, the app clearly falls back to a **simulated deployment** (mock hash + address).
   - When it completes, it auto‑navigates to **Operations**.

6. **Operations (Observability)**
   - Highlight:
     - **Prover Health Banner**: Avg **Proof Generation Time**, **Error Rate**.
     - Cards for **Proof Gen. Time**, **Cost per Proof**, **Throughput**, **Block Height**.
     - **ZKP Prover Performance** chart (last 8 hours style).
     - **DA Throughput & Cost** (data posted, monthly DA cost, efficiency).
     - **Prover Nodes** grid (per‑node load & proofs).
     - **Infrastructure Status** (sequencer, prover cluster, RPC endpoint).

7. **Guardian Mode (Emergency Brake)**
   - Open **Guardian Mode** tab.
   - Toggle:
     - **Unified Bridge Guardian** – pause/resume bridge traffic.
     - **Sequencer Emergency Override** – halt/resume block production.
   - Frame this as the **Guardian Dashboard** enterprises expect during early‑stage rollout.

8. **Developer Sandbox (Post‑Deployment SDK)**
   - Open **Developer Sandbox** tab.
   - Show **Hardhat Suite**:
     - `hardhat.config.js` uses the configured **RPC URL** and **Chain ID**.
     - `scripts/deploy.js` deploys a sample `SimpleStorage` contract.
   - Show **React + Wagmi**:
     - `wagmiConfig.ts` uses your **Chain Name**, **Chain ID**, **RPC**, **Explorer URL**, and **Gas Symbol**.
   - Click **Download Complete SDK** and mention that the zip contains:
     - A pre‑configured project,
     - `.env.example`,
     - Sample contracts and deployment scripts,
     - Complete README with setup instructions.

---

## 🎯 Demo Complete

**ChainiForge successfully demonstrates:**
- ✅ One-click CDK deployment
- ✅ Modular DA selection with cost analysis
- ✅ AggLayer Pessimistic Proofs integration
- ✅ Enterprise compliance with Polygon ID
- ✅ Developer SDK generation
- ✅ Guardian emergency controls

**🌐 Try it yourself:** https://chainiforge.vercel.app

Close with: this is **not** just a rollup generator; it's a **full lifecycle control plane** for Polygon CDK chains (deployment, security, observability, and developer onboarding).
