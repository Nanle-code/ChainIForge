import { Shield, CheckCircle2, AlertTriangle, Eye, Users, FileText, Lock, Globe, BadgeCheck } from 'lucide-react'
import { useState } from 'react'

const Compliance = () => {
  const [selectedSchemes, setSelectedSchemes] = useState(['kyc', 'residency'])
  const [bridgeEnabled, setBridgeEnabled] = useState(true)
  const [amlEnabled, setAmlEnabled] = useState(false)

  const verificationSchemes = [
    {
      id: 'kyc',
      name: 'Identity Verification',
      desc: 'Standard KYC proof with government ID',
      icon: <Users size={16} />,
      required: true
    },
    {
      id: 'residency',
      name: 'Geographic Verification',
      desc: 'Proof of residency for jurisdictional compliance',
      icon: <Globe size={16} />,
      required: true
    },
    {
      id: 'accredited',
      name: 'Accredited Investor',
      desc: 'Financial status verification for securities compliance',
      icon: <FileText size={16} />,
      required: false
    },
    {
      id: 'business',
      name: 'Business Entity',
      desc: 'Corporate verification for enterprise users',
      icon: <BadgeCheck size={16} />,
      required: false
    },
    {
      id: 'sanctions',
      name: 'Sanctions Screening',
      desc: 'OFAC and international watchlist screening',
      icon: <Lock size={16} />,
      required: true
    }
  ]

  const toggleScheme = (schemeId) => {
    const scheme = verificationSchemes.find(s => s.id === schemeId)
    if (scheme?.required) return // Required schemes can't be toggled
    
    setSelectedSchemes(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId]
    )
  }

  return (
    <div className="compliance-container fade-in">
      <header className="section-header">
        <h2>Polygon ID Compliance Engine</h2>
        <p>Enterprise-grade identity verification and regulatory compliance using Polygon ID verification schemes.</p>
      </header>

      <div className="compliance-grid">
        <div className="compliance-card glass">
          <div className="card-header">
            <div className="card-icon"><Shield /></div>
            <div className={`status-indicator ${bridgeEnabled ? 'enabled' : 'disabled'}`}>
              {bridgeEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <h3>Verified Bridge with Polygon ID</h3>
          <p>Restricts asset transfers to users with verified Polygon ID credentials. Auto-deploys a compliance-aware bridge contract.</p>

          <div className="verification-schemes">
            <h4>Required Verification Schemes</h4>
            <div className="schemes-list">
              {verificationSchemes.map(scheme => (
                <div
                  key={scheme.id}
                  className={`scheme-item ${selectedSchemes.includes(scheme.id) ? 'active' : ''} ${scheme.required ? 'required' : ''}`}
                  onClick={() => toggleScheme(scheme.id)}
                >
                  <div className="scheme-icon">{scheme.icon}</div>
                  <div className="scheme-info">
                    <p className="scheme-name">{scheme.name}</p>
                    <p className="scheme-desc">{scheme.desc}</p>
                  </div>
                  <div className="scheme-status">
                    {selectedSchemes.includes(scheme.id) ? (
                      <CheckCircle2 size={16} className="text-success" />
                    ) : (
                      <AlertTriangle size={16} className="text-muted" />
                    )}
                    {scheme.required && <span className="required-badge">Required</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bridge-features">
            <h4>Bridge Capabilities</h4>
            <div className="feature-grid">
              <div className="feature-item">
                <CheckCircle2 size={16} className="text-success" />
                <div>
                  <strong>Zero-Knowledge Proofs</strong>
                  <p>Verify credentials without revealing personal data</p>
                </div>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="text-success" />
                <div>
                  <strong>Revocation Support</strong>
                  <p>Instantly revoke access for non-compliant users</p>
                </div>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="text-success" />
                <div>
                  <strong>Cross-Chain Compatibility</strong>
                  <p>Works with AggLayer unified bridge</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            className={`btn-secondary full-width ${bridgeEnabled ? 'configured' : ''}`}
            onClick={() => setBridgeEnabled(!bridgeEnabled)}
          >
            {bridgeEnabled ? 'Reconfigure Bridge Settings' : 'Enable Verified Bridge'}
          </button>
        </div>

        <div className="compliance-card glass">
          <div className="card-header">
            <div className="card-icon"><Eye /></div>
            <div className={`status-indicator ${amlEnabled ? 'enabled' : 'disabled'}`}>
              {amlEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <h3>AML Transaction Monitoring</h3>
          <p>Real-time transaction monitoring with AI-powered risk assessment. Blocks addresses on international watchlists before execution.</p>

          <div className="aml-features">
            <h4>Monitoring Capabilities</h4>
            <div className="feature-list">
              <div className={`feature-item ${amlEnabled ? 'enabled' : 'disabled'}`}>
                {amlEnabled ? <CheckCircle2 size={16} className="text-success" /> : <AlertTriangle size={16} className="text-muted" />}
                <div>
                  <strong>Chainalysis Integration</strong>
                  <p>Real-time address risk scoring</p>
                </div>
              </div>
              <div className={`feature-item ${amlEnabled ? 'enabled' : 'disabled'}`}>
                {amlEnabled ? <CheckCircle2 size={16} className="text-success" /> : <AlertTriangle size={16} className="text-muted" />}
                <div>
                  <strong>TRM Labs Sync</strong>
                  <p>Sanctions and watchlist screening</p>
                </div>
              </div>
              <div className={`feature-item ${amlEnabled ? 'enabled' : 'disabled'}`}>
                {amlEnabled ? <CheckCircle2 size={16} className="text-success" /> : <AlertTriangle size={16} className="text-muted" />}
                <div>
                  <strong>AI-Powered Pattern Detection</strong>
                  <p>Identify suspicious transaction patterns</p>
                </div>
              </div>
              <div className={`feature-item ${amlEnabled ? 'enabled' : 'disabled'}`}>
                {amlEnabled ? <CheckCircle2 size={16} className="text-success" /> : <AlertTriangle size={16} className="text-muted" />}
                <div>
                  <strong>Automated Freezing</strong>
                  <p>Instant blocking of high-risk addresses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="compliance-stats">
            <h4>Compliance Metrics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{amlEnabled ? '2,847' : '--'}</span>
                <span className="stat-label">Addresses Screened</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{amlEnabled ? '12' : '--'}</span>
                <span className="stat-label">Blocked Transactions</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{amlEnabled ? '99.8%' : '--'}</span>
                <span className="stat-label">Compliance Rate</span>
              </div>
            </div>
          </div>

          <button 
            className={`btn-primary full-width ${amlEnabled ? 'enabled' : ''}`}
            onClick={() => setAmlEnabled(!amlEnabled)}
          >
            {amlEnabled ? 'Configure Monitoring Rules' : 'Enable AML Monitoring'}
          </button>
        </div>
      </div>

      <div className="compliance-notice glass">
        <AlertTriangle size={20} className="text-warning" />
        <div>
          <h4>Regulatory Compliance Notice</h4>
          <p>This deployment includes Polygon ID-based identity verification and AML monitoring capabilities. Ensure your use case complies with local regulations and obtain proper legal counsel before processing user data.</p>
        </div>
      </div>
    </div>
  )
}

export default Compliance
