# ChainiForge Deployment Guide | 2026 Enterprise Edition

## 🌐 Live Demo
**Try ChainiForge now:** https://chainiforge.vercel.app

## 🚀 Quick Start

ChainiForge enables enterprises to deploy production-ready Polygon CDK chains with **one-click**. This guide covers the complete 2026 feature set including AggLayer integration, modular DA, and enterprise compliance.

### Prerequisites

- Node.js 18+ 
- AWS Account with EC2/EKS access
- Polygon MATIC for testnet deployment (optional for demo)
- Basic understanding of blockchain infrastructure

## 📋 2026 Feature Matrix

| Feature | Status | Description |
|---------|--------|-------------|
| **Modular DA Selection** | ✅ Implemented | Ethereum L1, Avail/Celestia, DAC support |
| **AggLayer Pessimistic Proofs** | ✅ Implemented | Unified security with cross-chain protection |
| **Polygon ID Compliance** | ✅ Implemented | Enterprise-grade identity verification |
| **ZKP Prover Monitoring** | ✅ Implemented | Real-time health alerts and metrics |
| **Developer SDK Generation** | ✅ Implemented | Complete boilerplate download |
| **Hybrid-Live Deployment** | ✅ Implemented | Real Polygon Amoy testnet integration |
| **Economic Calculator** | ✅ Implemented | DA cost breakdown and ROI analysis |
| **Guardian Dashboard** | ✅ Implemented | Emergency controls for enterprise safety |

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-org/ChainiForge.git
cd ChainiForge

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Deployment Architecture

### Step 1: Infrastructure & Data Availability

Choose your deployment mode based on enterprise requirements:

#### **Rollup Mode** (Maximum Security)
- **Use Case**: Financial applications, high-value transactions
- **DA Options**: Ethereum L1 ($15,000/GB), Avail/Celestia ($500/GB)
- **Security**: On-chain data availability with full Ethereum security

#### **Validium Mode** (High Performance)
- **Use Case**: Gaming, social platforms, high-volume applications
- **DA Options**: DAC (Free), Avail/Celestia ($500/GB)
- **Security**: Off-chain data availability with trusted operators

### Step 2: Network Economy Configuration

#### Native Gas Token Options
- **ETH**: Standard interoperability, best for DeFi integration
- **Custom Token**: Enterprise tokens, loyalty points, ecosystem tokens

#### Custom Token Setup
```javascript
// Example: Deploy custom ERC-20 gas token
const gasTokenAddress = "0x..." // Your ERC-20 contract
```

### Step 3: Polygon ID Compliance Engine

#### Verification Schemes
1. **Identity Verification** (Required) - Government ID KYC
2. **Geographic Verification** (Required) - Residency proof
3. **Accredited Investor** (Optional) - Financial compliance
4. **Business Entity** (Optional) - Corporate verification
5. **Sanctions Screening** (Required) - OFAC/watchlist filtering

#### Bridge Configuration
```javascript
// Verified Bridge with Polygon ID
const bridgeConfig = {
  requiredSchemes: ['kyc', 'residency', 'sanctions'],
  revocationEnabled: true,
  crossChainSupport: true
}
```

### Step 4: AggLayer Integration

#### Security Modes
- **Pessimistic Proofs**: Unified security across AggLayer chains
- **Optimistic Rollup**: Faster finality with challenge period

#### Benefits of Pessimistic Proofs
- Cross-chain double-spend protection
- Shared liquidity with Polygon PoS and zkEVM
- Enhanced finality guarantees
- Unified bridge infrastructure

## 🚀 Hybrid-Live Deployment Process

### Phase 1: Infrastructure Provisioning

ChainiForge automatically provisions:

1. **AWS EC2 Instances** for Sequencer and Aggregator
2. **EKS Cluster** for ZK-Prover orchestration
3. **RDS PostgreSQL** for state management
4. **Application Load Balancer** for RPC endpoints
5. **CloudWatch** for monitoring and alerts

### Phase 2: Smart Contract Deployment

#### Management Contract (Polygon Amoy)
```solidity
contract ChainiForgeManager {
    struct ChainInfo {
        string chainName;
        uint256 chainId;
        string daMode;
        bool agglayerEnabled;
        uint256 deployedAt;
    }
    
    mapping(address => ChainInfo) public chains;
    
    function initializeChain(
        string memory chainName,
        uint256 chainId,
        string memory daMode,
        bool agglayerEnabled
    ) external;
}
```

#### Bridge Contracts
- **Verified Bridge**: Polygon ID-compliant asset transfers
- **Unified Bridge**: AggLayer cross-chain compatibility

### Phase 3: Network Configuration

#### Genesis Block Generation
```json
{
  "chainId": 12345,
  "homesteadBlock": 0,
  "eip150Block": 0,
  "eip155Block": 0,
  "eip158Block": 0,
  "byzantiumBlock": 0,
  "constantinopleBlock": 0,
  "petersburgBlock": 0,
  "istanbulBlock": 0,
  "berlinBlock": 0,
  "londonBlock": 0,
  "clique": {
    "period": 5,
    "epoch": 30000
  }
}
```

## 📊 Monitoring & Operations

### ZKP Prover Health Monitoring

#### Real-time Metrics
- **Proof Generation Time**: Target < 45s
- **Cost per Proof**: Optimized at $0.008
- **Error Rate**: < 0.1%
- **Throughput**: 150+ txs/sec

#### Alert System
```javascript
// Prover Health Alerts
const alerts = {
  warning: "Prover node showing increased latency",
  critical: "Proof generation time exceeded threshold",
  info: "DA throughput optimization completed"
}
```

### Infrastructure Monitoring

#### CloudWatch Integration
- **EC2 Instance Health**: CPU, memory, network metrics
- **EKS Cluster**: Pod health, resource utilization
- **RDS Performance**: Query latency, connection counts
- **Application Load Balancer**: Request counts, error rates

## 🛡️ Security & Compliance

### Guardian Dashboard Features

#### Emergency Controls
1. **Bridge Pause**: Stop all asset transfers immediately
2. **Sequencer Halt**: Stop block production if compromised
3. **Access Control**: Multi-signature governance for critical operations

#### Security Best Practices
- Multi-signature wallet for admin operations
- Regular security audits of smart contracts
- Network access controls and VPC configuration
- Encrypted data at rest and in transit

### Polygon ID Integration

#### Zero-Knowledge Proofs
- Verify credentials without revealing personal data
- Revocation support for non-compliant users
- Cross-chain compatibility with AggLayer

#### Regulatory Compliance
- GDPR-compliant identity verification
- OFAC sanctions screening
- KYC/AML integration with Chainalysis and TRM Labs

## 💰 Economic Analysis

### Cost Calculator Features

#### DA Cost Breakdown
- **Ethereum L1**: $15,000/GB (maximum security)
- **Avail/Celestia**: $500/GB (cost-optimized)
- **DAC**: $0/GB (private consortium)

#### ROI Metrics
- Cost reduction percentage vs Ethereum L1
- Savings per 1,000 transactions
- Monthly and annual cost projections
- DA efficiency analysis

### Example Calculation
```
Monthly Transactions: 100,000
Average Gas Price: 25 Gwei
DA Mode: Avail/Celestia

Ethereum L1 Cost: $1,312,500/year
ChainiForge Cost: $6,000/year
Savings: 99.5% ($1,306,500/year)
```

## 👨‍💻 Developer Experience

### SDK Generation

#### Hardhat Suite
- Complete project structure
- Sample smart contracts included
- Deployment scripts configured
- Test environment setup

#### React + Wagmi Kit
- Frontend DApp boilerplate
- Wallet connection components
- Contract interaction hooks
- TypeScript support

#### Quick Start Commands
```bash
# Using generated Hardhat SDK
npm install
npm run compile
npm run deploy --network custom_chain

# Using generated React SDK
npm install
npm run dev
```

## 🔧 Advanced Configuration

### Custom DA Integration

#### Adding New DA Providers
```javascript
const customDAProvider = {
  name: "Custom DA",
  costPerGB: 200,
  endpoint: "https://da.custom.com",
  authentication: "bearer-token"
}
```

### AggLayer Customization

#### Security Parameters
```javascript
const agglayerConfig = {
  securityMode: "pessimistic",
  proofVerification: "zero-knowledge",
  finalityTime: 30, // seconds
  crossChainEnabled: true
}
```

## 📈 Scaling & Performance

### Horizontal Scaling

#### Prover Cluster Scaling
- Auto-scaling based on proof generation queue
- Load balancing across multiple availability zones
- Graceful degradation during high load

#### Database Optimization
- Read replicas for improved query performance
- Connection pooling for high concurrency
- Automated backups and point-in-time recovery

### Performance Benchmarks

#### Target Metrics
- **Block Time**: 2 seconds
- **Finality**: 30 seconds (with AggLayer)
- **TPS**: 2,000+ transactions per second
- **Proof Time**: < 45 seconds average

## 🚨 Troubleshooting

### Common Issues

#### Deployment Failures
1. **AWS Permissions**: Ensure IAM roles have EC2/EKS access
2. **MATIC Balance**: Add testnet MATIC for contract deployment
3. **Network Configuration**: Check VPC and security group settings

#### Performance Issues
1. **Prover Latency**: Scale EKS cluster or optimize instance types
2. **DA Throughput**: Upgrade to higher-performance DA provider
3. **Network Congestion**: Implement proper load balancing

### Debug Commands
```bash
# Check deployment status
kubectl get pods -n chainiforge

# Monitor prover performance
kubectl logs -f deployment/prover-cluster

# Check contract deployment
npx hardhat verify --network amoy <contract-address>
```

## 📞 Support & Documentation

### Getting Help
- **Documentation**: [docs.chainiforge.com](https://docs.chainiforge.com)
- **GitHub Issues**: [github.com/your-org/ChainiForge/issues](https://github.com/your-org/ChainiForge/issues)
- **Community**: [Discord](https://discord.gg/chainiforge)
- **Enterprise Support**: enterprise@chainiforge.com

### Contributing
We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

## 🎯 Production Deployment Checklist

### Pre-Deployment
- [ ] AWS credentials configured
- [ ] Security groups and VPC setup
- [ ] SSL certificates obtained
- [ ] Monitoring and alerting configured
- [ ] Backup strategy implemented

### Deployment
- [ ] Infrastructure provisioned via Terraform
- [ ] Smart contracts deployed and verified
- [ ] Network genesis generated
- [ ] AggLayer connection established
- [ ] Polygon ID verification configured

### Post-Deployment
- [ ] Performance benchmarks met
- [ ] Security audits completed
- [ ] Documentation updated
- [ ] Team training conducted
- [ ] Support channels established

---

**ChainiForge | Enterprise Polygon CDK Deployment Platform**  
*Built for the 2026 AggLayer ecosystem*  
🌐 **Live:** https://chainiforge.vercel.app
