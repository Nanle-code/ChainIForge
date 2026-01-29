import { Coins, Plus } from 'lucide-react'

const GasManagement = () => {
    return (
        <div className="gas-container fade-in">
            <header className="section-header">
                <h2>Gas & Fee Management</h2>
                <p>Optimize the user experience with gas abstraction and custom fee models.</p>
            </header>

            <div className="gas-grid">
                <div className="paymaster-config glass">
                    <div className="card-header">
                        <h3>Enterprise Paymaster</h3>
                        <div className="toggle-switch">
                            <div className={`switch on`}></div>
                        </div>
                    </div>
                    <p className="description">Allow users to interact with your dapps without needing ETH. Your enterprise pays the gas in the background.</p>

                    <div className="balance-box glass">
                        <span className="label">Paymaster Balance</span>
                        <div className="val-row">
                            <span className="value">2.45 ETH</span>
                            <button className="btn-small">Top Up</button>
                        </div>
                    </div>

                    <div className="policies">
                        <p className="policy-title">Subsidy Policies</p>
                        <div className="policy-item">
                            <span>First 10 txs for new users</span>
                            <span className="status-tag">Active</span>
                        </div>
                        <div className="policy-item">
                            <span>Specific Contract: StarbucksNFT</span>
                            <span className="status-tag">Active</span>
                        </div>
                    </div>

                    <button className="btn-secondary full-width"><Plus size={16} /> Add New Policy</button>
                </div>

                <div className="gas-token-config glass">
                    <h3>Native Gas Token</h3>
                    <p className="description">Configuration for the token used to pay base network fees.</p>

                    <div className="token-card glass">
                        <div className="card-icon"><Coins /></div>
                        <div className="token-info">
                            <p className="token-symbol">STAR (Starbucks Points)</p>
                            <p className="token-address">0x1234...5678</p>
                        </div>
                        <div className="price-tag">1 STAR = 0.01 USD</div>
                    </div>

                    <div className="gas-logic">
                        <p>Fee burn rate: <strong>50%</strong></p>
                        <p>Min. Priority Fee: <strong>0.1 Gwei</strong></p>
                    </div>

                    <button className="btn-primary full-width">Update Genesis Config</button>
                </div>
            </div>
        </div>
    )
}

export default GasManagement
