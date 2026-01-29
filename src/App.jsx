import { useState, useEffect } from 'react'
import {
    Rocket,
    Settings,
    ShieldCheck,
    Coins,
    Activity,
    ChevronRight,
    ChevronLeft,
    Layers,
    Globe,
    Lock,
    Link2,
    CheckCircle2,
    Zap,
    Terminal as TerminalIcon,
    ShieldAlert,
    Code2,
    Database,
    Calculator as CalcIcon,
    LayoutDashboard
} from 'lucide-react'

// Components
import Compliance from './components/Compliance'
import Operations from './components/Operations'
import GasManagement from './components/GasManagement'
import DeploymentTerminal from './components/DeploymentTerminal'
import EconomicCalculator from './components/EconomicCalculator'
import GuardianMode from './components/GuardianMode'
import DeveloperSandbox from './components/DeveloperSandbox'

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        className={`sidebar-item ${active ? 'active' : ''}`}
        onClick={onClick}
    >
        <Icon size={20} />
        <span>{label}</span>
    </div>
)

const StepInfrastructure = ({ config, setConfig }) => (
    <div className="wizard-step fade-in">
        <h3>Infrastructure & Data Availability</h3>
        <p className="step-subtitle">Choose your architecture and where transaction data is stored to balance security and cost.</p>

        <div className="config-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '24px' }}>
            <div className="input-field">
                <label>Chain Name</label>
                <input
                    type="text"
                    placeholder="My Enterprise L2"
                    className="glass-input"
                    value={config.chainName || ''}
                    onChange={(e) => setConfig({ ...config, chainName: e.target.value })}
                />
            </div>
            <div className="input-field">
                <label>Chain ID</label>
                <input
                    type="number"
                    placeholder="12345"
                    className="glass-input"
                    value={config.chainId ?? ''}
                    onChange={(e) => setConfig({ ...config, chainId: Number(e.target.value) })}
                />
            </div>
            <div className="input-field">
                <label>RPC URL</label>
                <input
                    type="text"
                    placeholder="https://rpc.my-new-chain.com"
                    className="glass-input"
                    value={config.rpcUrl || ''}
                    onChange={(e) => setConfig({ ...config, rpcUrl: e.target.value })}
                />
            </div>
            <div className="input-field">
                <label>Explorer URL</label>
                <input
                    type="text"
                    placeholder="https://explorer.my-new-chain.com"
                    className="glass-input"
                    value={config.explorerUrl || ''}
                    onChange={(e) => setConfig({ ...config, explorerUrl: e.target.value })}
                />
            </div>
        </div>

        <div className="config-grid">
            <div
                className={`selectable-card glass ${config.infra === 'rollup' ? 'selected' : ''}`}
                onClick={() => setConfig({ ...config, infra: 'rollup' })}
            >
                <div className="card-icon"><Layers /></div>
                <div className="card-title">Rollup</div>
                <div className="card-description">
                    Highest security. Posts all transaction data to Ethereum L1. Ideal for financial applications.
                </div>
            </div>

            <div
                className={`selectable-card glass ${config.infra === 'validium' ? 'selected' : ''}`}
                onClick={() => setConfig({ ...config, infra: 'validium' })}
            >
                <div className="card-icon"><Zap /></div>
                <div className="card-title">Validium</div>
                <div className="card-description">
                    Ultra-high speed and low cost via off-chain data availability. Perfect for high-volume apps.
                </div>
            </div>
        </div>

        <div className="sub-config fade-in" style={{ marginTop: '32px' }}>
            <h4>Data Availability (DA) Tier</h4>
            <div className="da-options">
                {[
                    { id: 'eth', name: 'Ethereum L1', desc: 'Max Security ($$$)', icon: <Database size={16} /> },
                    { id: 'avail', name: 'Avail / Celestia', desc: 'Modular DA ($)', icon: <Layers size={16} /> },
                    { id: 'dac', name: 'Consortium (DAC)', desc: 'Private Group (Free)', icon: <Lock size={16} /> }
                ].map(da => (
                    <div
                        key={da.id}
                        className={`da-item glass-item ${config.da === da.id ? 'active' : ''}`}
                        onClick={() => setConfig({ ...config, da: da.id })}
                    >
                        {da.icon}
                        <div>
                            <p className="da-name">{da.name}</p>
                            <p className="da-desc">{da.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <EconomicCalculator daMode={config.da} onDaModeChange={(next) => setConfig({ ...config, da: next })} />
    </div>
)

const StepEconomy = ({ config, setConfig }) => (
    <div className="wizard-step fade-in">
        <h3>Network Economy</h3>
        <p className="step-subtitle">Define the native gas token for your chain. You can use ETH or your own brand token.</p>

        <div className="config-grid">
            <div
                className={`selectable-card glass ${config.token === 'eth' ? 'selected' : ''}`}
                onClick={() => setConfig({ ...config, token: 'eth', gasSymbol: 'ETH' })}
            >
                <div className="card-icon"><Coins /></div>
                <div className="card-title">Native ETH</div>
                <div className="card-description">
                    Standard Ethereum gas token. Simplest for users and better interoperability.
                </div>
            </div>

            <div
                className={`selectable-card glass ${config.token === 'custom' ? 'selected' : ''}`}
                onClick={() => setConfig({ ...config, token: 'custom', gasSymbol: config.gasSymbol && config.gasSymbol !== 'ETH' ? config.gasSymbol : 'GAS' })}
            >
                <div className="card-icon"><Rocket /></div>
                <div className="card-title">Custom Token</div>
                <div className="card-description">
                    Use your own ERC-20 token for gas. Perfect for enterprise loyalty points or ecosystem tokens.
                </div>
            </div>
        </div>

        {config.token === 'custom' && (
            <div className="input-field fade-in" style={{ marginTop: '24px' }}>
                <label>Gas Token Symbol</label>
                <input
                    type="text"
                    placeholder="GAS"
                    className="glass-input"
                    value={config.gasSymbol || ''}
                    onChange={(e) => setConfig({ ...config, gasSymbol: e.target.value.toUpperCase() })}
                />
                <div style={{ height: 12 }} />
                <label>Token Contract Address</label>
                <input
                    type="text"
                    placeholder="0x..."
                    className="glass-input"
                    value={config.tokenAddress}
                    onChange={(e) => setConfig({ ...config, tokenAddress: e.target.value })}
                />
            </div>
        )}
    </div>
)

const StepPermissions = ({ config, setConfig }) => (
    <div className="wizard-step fade-in">
        <h3>Permissions & Compliance</h3>
        <p className="step-subtitle">Determine who can interact with your network and how they are verified.</p>

        <div className="config-grid">
            <div
                className={`selectable-card glass ${config.permissions === 'public' ? 'selected' : ''}`}
                onClick={() => setConfig({ ...config, permissions: 'public' })}
            >
                <div className="card-icon"><Globe /></div>
                <div className="card-title">Public Network</div>
                <div className="card-description">
                    Permissionless access. Anyone can transact and deploy contracts.
                </div>
            </div>

            <div
                className={`selectable-card glass ${config.permissions === 'whitelist' ? 'selected' : ''}`}
                onClick={() => setConfig({ ...config, permissions: 'whitelist' })}
            >
                <div className="card-icon"><Lock /></div>
                <div className="card-title">Whitelisted / KYC</div>
                <div className="card-description">
                    Restricted access. Only users with verified Polygon ID schemes can transact.
                </div>
            </div>
        </div>

        {config.permissions === 'whitelist' && (
            <div className="sub-config fade-in" style={{ marginTop: '32px' }}>
                <h4>Required Polygon ID Schemes</h4>
                <div className="da-options">
                    {[
                        { id: 'kyc', name: 'Age / Residency', desc: 'Standard KYC proof' },
                        { id: 'accredited', name: 'Accredited Investor', desc: 'Financial compliance' },
                        { id: 'enterprise', name: 'Authorized Org', desc: 'Internal whitelisting' }
                    ].map(scheme => (
                        <div
                            key={scheme.id}
                            className={`da-item glass-item ${config.schemes?.includes(scheme.id) ? 'active' : ''}`}
                            onClick={() => {
                                const current = config.schemes || []
                                const next = current.includes(scheme.id)
                                    ? current.filter(id => id !== scheme.id)
                                    : [...current, scheme.id]
                                setConfig({ ...config, schemes: next })
                            }}
                        >
                            <ShieldCheck size={16} />
                            <div>
                                <p className="da-name">{scheme.name}</p>
                                <p className="da-desc">{scheme.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
)

const StepConnectivity = ({ config, setConfig }) => (
    <div className="wizard-step fade-in">
        <h3>Polygon AggLayer & Security</h3>
        <p className="step-subtitle">Connect to the AggLayer for unified liquidity and shared security across Polygon.</p>

        <div className={`selectable-card glass ${config.agglayer ? 'selected' : ''}`}
            onClick={() => setConfig({ ...config, agglayer: !config.agglayer })}
            style={{ maxWidth: '600px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="card-icon" style={{ marginBottom: 0 }}><Link2 /></div>
                <div className="toggle-switch">
                    <div className={`switch ${config.agglayer ? 'on' : ''}`}></div>
                </div>
            </div>
            <div className="card-title">Connect to AggLayer</div>
            <div className="card-description">
                Instantly share liquidity with the entire Polygon ecosystem and implement <strong>Pessimistic Proofs</strong> to prevent double-spending across chains.
            </div>
        </div>

        {config.agglayer && (
            <div className="sub-config fade-in" style={{ marginTop: '32px' }}>
                <h4>Security Mode</h4>
                <div className="da-options">
                    <div
                        className={`da-item glass-item ${config.security === 'pessimistic' ? 'active' : ''}`}
                        onClick={() => setConfig({ ...config, security: 'pessimistic' })}
                    >
                        <ShieldAlert size={16} />
                        <div>
                            <p className="da-name">Pessimistic Proofs (Unified)</p>
                            <p className="da-desc">Guarantee security across all connected AggLayer chains.</p>
                        </div>
                    </div>
                    <div
                        className={`da-item glass-item ${config.security === 'optimistic' ? 'active' : ''}`}
                        onClick={() => setConfig({ ...config, security: 'optimistic' })}
                    >
                        <Activity size={16} />
                        <div>
                            <p className="da-name">Optimistic Rollup</p>
                            <p className="da-desc">Faster finality with challenge period.</p>
                        </div>
                    </div>
                </div>

                {config.security === 'pessimistic' && (
                    <div className="security-info glass-item" style={{ marginTop: '16px' }}>
                        <h5>🔒 Unified Security Benefits</h5>
                        <ul>
                            <li><strong>Cross-Chain Double-Spend Protection</strong>: Prevents malicious transactions across AggLayer</li>
                            <li><strong>Shared Liquidity</strong>: Access to Polygon PoS and zkEVM user base</li>
                            <li><strong>Unified Bridge</strong>: Seamless asset transfers between connected chains</li>
                            <li><strong>Enhanced Finality</strong>: Faster settlement with cryptographic guarantees</li>
                        </ul>
                    </div>
                )}
            </div>
        )}
    </div>
)

const StepReview = ({ config, isDeploying, onDeploy }) => (
    <div className="wizard-step fade-in">
        <h3>Review & Launch</h3>
        <p className="step-subtitle">
            {isDeploying ? "Infrastructure is being provisioned. This includes a contract deployment on Polygon Amoy for governance." : "Final check. We will deploy your chain's Management Contract to Polygon Amoy for real on-chain tracking."}
        </p>

        {!isDeploying ? (
            <div className="review-container glass">
                <div className="review-grid">
                    <div className="review-item">
                        <span className="label">Architecture</span>
                        <span className="value capitalize">{config.infra} ({config.da})</span>
                    </div>
                    <div className="review-item">
                        <span className="label">Gas Settings</span>
                        <span className="value">{config.token === 'custom' ? `Custom ERC-20` : 'Native ETH'}</span>
                    </div>
                    <div className="review-item">
                        <span className="label">AggLayer Security</span>
                        <span className="value">{config.security === 'pessimistic' ? 'Pessimistic Proofs' : 'Standard'}</span>
                    </div>
                    <div className="review-item">
                        <span className="label">Compliance</span>
                        <span className="value capitalize">{config.permissions} ({config.schemes?.length || 0} schemes)</span>
                    </div>
                </div>
            </div>
        ) : (
            <DeploymentTerminal config={config} onComplete={onDeploy} />
        )}
    </div>
)

function App() {
    const [activeTab, setActiveTab] = useState('deploy')
    const [step, setStep] = useState(1)
    const [isDeploying, setIsDeploying] = useState(false)
    const [config, setConfig] = useState({
        chainName: 'My Enterprise L2',
        chainId: 12345,
        rpcUrl: 'https://rpc.my-new-chain.com',
        explorerUrl: 'https://explorer.my-new-chain.com',
        infra: 'rollup',
        da: 'eth',
        token: 'eth',
        gasSymbol: 'ETH',
        tokenAddress: '0x8247e5d44db55079a49934444444444444444444',
        permissions: 'public',
        schemes: ['kyc'],
        agglayer: true,
        security: 'pessimistic'
    })

    const nextStep = () => setStep(s => Math.min(s + 1, 5))
    const prevStep = () => setStep(s => Math.max(s - 1, 1))

    const handleStartDeployment = () => {
        setIsDeploying(true)
    }

    const handleDeploymentComplete = () => {
        setIsDeploying(false)
        setActiveTab('ops')
        setStep(1)
    }

    return (
        <div className="app-container">
            <nav className="sidebar glass">
                <div className="logo">
                    <Rocket className="logo-icon" />
                    <span>ChainiForge</span>
                </div>

                <div className="sidebar-menu">
                    <SidebarItem
                        icon={Rocket}
                        label="Deploy Network"
                        active={activeTab === 'deploy'}
                        onClick={() => setActiveTab('deploy')}
                    />
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Operations"
                        active={activeTab === 'ops'}
                        onClick={() => setActiveTab('ops')}
                    />
                    <SidebarItem
                        icon={ShieldCheck}
                        label="Compliance"
                        active={activeTab === 'compliance'}
                        onClick={() => setActiveTab('compliance')}
                    />
                    <SidebarItem
                        icon={Coins}
                        label="Gas & Fees"
                        active={activeTab === 'gas'}
                        onClick={() => setActiveTab('gas')}
                    />
                    <SidebarItem
                        icon={ShieldAlert}
                        label="Guardian Mode"
                        active={activeTab === 'guardian'}
                        onClick={() => setActiveTab('guardian')}
                    />
                    <SidebarItem
                        icon={Code2}
                        label="Dev Sandbox"
                        active={activeTab === 'sandbox'}
                        onClick={() => setActiveTab('sandbox')}
                    />
                </div>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">JD</div>
                        <div className="user-info">
                            <p className="username">Jane Docker</p>
                            <p className="role">Platform Admin</p>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="main-content">
                <header className="top-header fade-in">
                    <div>
                        <h1>Polygon CDK Deployer</h1>
                        <p>Enterprise-grade infrastructure for your L2 ecosystem</p>
                    </div>
                    <div className="header-actions">
                        <div className="status-badge glass">
                            <div className="pulse"></div>
                            <span>Network Status: Online</span>
                        </div>
                    </div>
                </header>

                <section className="content-area">
                    {activeTab === 'deploy' && (
                        <div className="deployment-wizard glass fade-in">
                            <div className="wizard-header">
                                <h2>{step === 5 ? (isDeploying ? 'Deploying Network...' : 'Deployment Summary') : 'Network Configuration'}</h2>
                                <div className="step-indicator">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <div key={s} className={`step-dot ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}>
                                            {s < step ? <CheckCircle2 size={14} /> : s}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="wizard-body">
                                {step === 1 && <StepInfrastructure config={config} setConfig={setConfig} />}
                                {step === 2 && <StepEconomy config={config} setConfig={setConfig} />}
                                {step === 3 && <StepPermissions config={config} setConfig={setConfig} />}
                                {step === 4 && <StepConnectivity config={config} setConfig={setConfig} />}
                                {step === 5 && <StepReview config={config} isDeploying={isDeploying} onDeploy={handleDeploymentComplete} />}
                            </div>

                            {!isDeploying && (
                                <div className="wizard-footer">
                                    <button
                                        className={`btn-secondary ${step === 1 ? 'hidden' : ''}`}
                                        onClick={prevStep}
                                    >
                                        <ChevronLeft size={20} /> Back
                                    </button>

                                    {step < 5 ? (
                                        <button className="btn-primary" onClick={nextStep}>
                                            Next Step <ChevronRight size={20} />
                                        </button>
                                    ) : (
                                        <button className="btn-primary" onClick={handleStartDeployment}>
                                            Launch Network <Rocket size={20} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'ops' && <Operations />}
                    {activeTab === 'compliance' && <Compliance />}
                    {activeTab === 'gas' && <GasManagement />}
                    {activeTab === 'guardian' && <GuardianMode />}
                    {activeTab === 'sandbox' && <DeveloperSandbox config={config} />}

                    {activeTab === 'settings' && (
                        <div className="glass fade-in" style={{ padding: '40px' }}>
                            <h2>General Settings</h2>
                            <p>Platform and account configuration.</p>
                        </div>
                    )}
                </section>
            </main>

        </div>
    )
}

export default App
