import { ShieldAlert, Lock, Unlock, AlertOctagon } from 'lucide-react'
import { useState } from 'react'

const GuardianMode = () => {
    const [bridgePaused, setBridgePaused] = useState(false)
    const [sequencerPaused, setSequencerPaused] = useState(false)

    return (
        <div className="guardian-container fade-in">
            <header className="section-header">
                <div className="header-with-badge">
                    <h2>Guardian Dashboard</h2>
                    <span className="badge-warning">Early Stage L2</span>
                </div>
                <p>Emergency controls for network security. Only authorized Guardian addresses can trigger these actions.</p>
            </header>

            <div className="guardian-grid">
                <div className={`guardian-card glass ${bridgePaused ? 'active-threat' : ''}`}>
                    <div className="card-header">
                        <Lock size={24} className={bridgePaused ? 'text-error' : 'text-muted'} />
                        <div className={`status-pill ${bridgePaused ? 'paused' : 'live'}`}>
                            {bridgePaused ? 'PAUSED' : 'OPERATIONAL'}
                        </div>
                    </div>
                    <h3>Unified Bridge Guardian</h3>
                    <p>Instantly pause all asset transfers to and from Ethereum L1 and AggLayer chains in case of a detected exploit.</p>

                    <div className="warning-box">
                        <AlertOctagon size={16} />
                        <span>Emergency bridge pause will stop all user withdrawals.</span>
                    </div>

                    <button
                        className={`btn-guardian ${bridgePaused ? 'resume' : 'pause'}`}
                        onClick={() => setBridgePaused(!bridgePaused)}
                    >
                        {bridgePaused ? 'Resume Bridge Operations' : 'Trigger Emergency Pause'}
                    </button>
                </div>

                <div className={`guardian-card glass ${sequencerPaused ? 'active-threat' : ''}`}>
                    <div className="card-header">
                        <ShieldAlert size={24} className={sequencerPaused ? 'text-error' : 'text-muted'} />
                        <div className={`status-pill ${sequencerPaused ? 'paused' : 'live'}`}>
                            {sequencerPaused ? 'PAUSED' : 'OPERATIONAL'}
                        </div>
                    </div>
                    <h3>Sequencer Emergency Override</h3>
                    <p>Stop block production if the sequencer is compromised or if there's a consensus failure in the ZK-EVM.</p>

                    <div className="warning-box">
                        <AlertOctagon size={16} />
                        <span>Pausing the sequencer will halt all on-chain transactions.</span>
                    </div>

                    <button
                        className={`btn-guardian ${sequencerPaused ? 'resume' : 'pause'}`}
                        onClick={() => setSequencerPaused(!sequencerPaused)}
                    >
                        {sequencerPaused ? 'Resume Block Production' : 'Halt Block Production'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default GuardianMode
