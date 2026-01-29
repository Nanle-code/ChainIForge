import { Terminal, Copy, Download, Code2, Rocket, Package, FileText, GitBranch } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import JSZip from 'jszip'

const DeveloperSandbox = ({ config }) => {
  const [selectedTools, setSelectedTools] = useState('hardhat')
  const [isGenerating, setIsGenerating] = useState(false)

  const chainName = config?.chainName || 'My Custom Chain'
  const chainId = Number.isFinite(config?.chainId) ? config.chainId : 12345
  const rpcUrl = config?.rpcUrl || 'https://rpc.my-new-chain.com'
  const explorerUrl = config?.explorerUrl || 'https://explorer.my-new-chain.com'
  const gasSymbol = config?.token === 'custom' ? (config?.gasSymbol || 'GAS') : (config?.gasSymbol || 'ETH')

  const sdkTemplates = useMemo(() => ({
    hardhat: {
      files: {
        'hardhat.config.js': `// hardhat.config.js
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    custom_chain: {
      url: "${rpcUrl}",
      accounts: [process.env.PRIVATE_KEY],
      chainId: ${chainId},
      gasPrice: 20000000000
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};`,
        'contracts/SimpleStorage.sol': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 private storedData;
    
    event DataStored(uint256 indexed newValue, address indexed storedBy);
    
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x, msg.sender);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`,
        'scripts/deploy.js': `// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SimpleStorage to your ChainiForge chain...");
  
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  
  await simpleStorage.deployed();
  
  console.log("SimpleStorage deployed to:", simpleStorage.address);
  
  // Test the contract
  const tx = await simpleStorage.set(42);
  await tx.wait();
  
  console.log("Stored value:", await simpleStorage.get());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });`,
        'package.json': `{
  "name": "chainiforge-dapp",
  "version": "1.0.0",
  "description": "DApp for ChainiForge deployed chain",
  "scripts": {
    "compile": "hardhat compile",
    "test": "hardhat test",
    "deploy": "hardhat run scripts/deploy.js --network custom_chain"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^3.0.0",
    "hardhat": "^2.17.0"
  },
  "dependencies": {
    "ethers": "^6.7.0"
  }
}`,
        '.env.example': `PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here`
      }
    },
    wagmi: {
      files: {
        'src/wagmiConfig.ts': `import { createConfig, http } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Your custom ChainiForge chain
export const myCustomChain = {
  id: ${chainId},
  name: '${chainName}',
  nativeCurrency: {
    decimals: 18,
    name: '${gasSymbol}',
    symbol: '${gasSymbol}',
  },
  rpcUrls: {
    public: { http: ['${rpcUrl}'] },
    default: { http: ['${rpcUrl}'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: '${explorerUrl}' },
  },
  testnet: false,
}

export const config = createConfig({
  chains: [mainnet, polygon, myCustomChain],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: 'your_project_id' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [myCustomChain.id]: http(),
  },
})`,
        'src/App.tsx': `import React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './wagmiConfig'
import { ConnectWallet } from './components/ConnectWallet'
import { ContractInteraction } from './components/ContractInteraction'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header>
            <h1>My ChainiForge DApp</h1>
          </header>
          <main>
            <ConnectWallet />
            <ContractInteraction />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App`,
        'src/components/ConnectWallet.tsx': `import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      <h3>Connect Wallet</h3>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={!connector.ready}
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}`,
        'package.json': `{
  "name": "chainiforge-react-dapp",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "viem": "^2.45.0",
    "wagmi": "^1.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}`
      }
    }
  }), [chainId, chainName, explorerUrl, gasSymbol, rpcUrl])

  const generateSDK = async () => {
    setIsGenerating(true)
    
    // Simulate SDK generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const template = sdkTemplates[selectedTools]
    const zip = new JSZip()
    
    // Add files to zip
    Object.entries(template.files).forEach(([filename, content]) => {
      zip.file(filename, content)
    })
    
    // Add README
    const readme = `# ChainiForge DApp Starter Kit

This is a pre-configured development environment for your new ChainiForge-deployed chain.

## Chain Configuration

- Chain name: ${chainName}
- Chain ID: ${chainId}
- RPC URL: ${rpcUrl}
- Explorer: ${explorerUrl}
- Gas token: ${gasSymbol}

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Configure your environment:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your private key
   \`\`\`

3. Deploy your first contract:
   \`\`\`bash
   ${selectedTools === 'hardhat' ? 'npm run deploy' : 'npm run dev'}
   \`\`\`

## Features

- ✅ Pre-configured RPC connection to your chain
- ✅ Sample smart contract included
- ✅ Deployment scripts ready
- ✅ Development environment setup
- ✅ Chain-specific configurations

## Next Steps

- Modify the sample contracts for your use case
- Add your business logic to the frontend
- Deploy to production when ready

## Support

For support with your ChainiForge deployment, visit our documentation.
`
    
    zip.file('README.md', readme)
    
    // Generate and download zip
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = `chainiforge-${selectedTools}-sdk.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setIsGenerating(false)
  }

  const currentTemplate = sdkTemplates[selectedTools]
  const [selectedFile, setSelectedFile] = useState(Object.keys(currentTemplate.files)[0])

  useEffect(() => {
    setSelectedFile(Object.keys(currentTemplate.files)[0])
  }, [selectedTools])

  return (
    <div className="sandbox-container fade-in">
      <header className="section-header">
        <h2>Developer Sandbox</h2>
        <p>Generate a complete SDK with pre-configured development environment for your new network.</p>
      </header>

      <div className="sandbox-grid">
        <div className="tool-selector glass">
          <h3>SDK Generator</h3>
          <p className="description">Download a complete development environment with contracts, scripts, and configurations.</p>

          <div className="tool-options">
            <div
              className={`tool-card ${selectedTools === 'hardhat' ? 'active' : ''}`}
              onClick={() => setSelectedTools('hardhat')}
            >
              <Code2 size={24} />
              <span>Hardhat Suite</span>
              <small>Smart Contracts + Scripts</small>
            </div>
            <div
              className={`tool-card ${selectedTools === 'wagmi' ? 'active' : ''}`}
              onClick={() => setSelectedTools('wagmi')}
            >
              <Rocket size={24} />
              <span>React + Wagmi</span>
              <small>Frontend DApp Kit</small>
            </div>
          </div>

          <div className="sdk-features">
            <div className="feature-item">
              <Package size={16} />
              <span>Complete Project Structure</span>
            </div>
            <div className="feature-item">
              <FileText size={16} />
              <span>Sample Contracts & Components</span>
            </div>
            <div className="feature-item">
              <GitBranch size={16} />
              <span>Deployment Scripts Included</span>
            </div>
          </div>

          <button 
            className={`btn-primary full-width ${isGenerating ? 'loading' : ''}`}
            onClick={generateSDK}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="spinner"></div>
                Generating SDK...
              </>
            ) : (
              <>
                <Download size={18} /> Download Complete SDK
              </>
            )}
          </button>
        </div>

        <div className="code-viewer glass">
          <div className="code-header">
            <div className="file-tabs">
              {Object.keys(currentTemplate.files).map(filename => (
                <button
                  key={filename}
                  className={`file-tab ${selectedFile === filename ? 'active' : ''}`}
                  onClick={() => setSelectedFile(filename)}
                >
                  {filename}
                </button>
              ))}
            </div>
            <button className="btn-icon"><Copy size={16} /></button>
          </div>
          <pre className="code-block">
            <code>{currentTemplate.files[selectedFile]}</code>
          </pre>
        </div>
      </div>

    </div>
  )
}

export default DeveloperSandbox
