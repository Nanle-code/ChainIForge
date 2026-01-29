import { Activity, Server, Database, Globe, RefreshCcw, Cpu, BarChart3, Clock, AlertTriangle, CheckCircle2, TrendingUp, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const Operations = () => {
    const [proverHealth, setProverHealth] = useState('healthy')
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'warning', message: 'Prover node 3 showing increased latency', time: '2 mins ago' },
        { id: 2, type: 'info', message: 'DA throughput optimization completed', time: '15 mins ago' }
    ])

    const [metrics, setMetrics] = useState({
        blockHeight: 1245678,
        proofTime: 42,
        costPerProof: 0.008,
        throughput: 156,
        errorRate: 0.02
    })

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                blockHeight: prev.blockHeight + 1,
                proofTime: Math.max(35, prev.proofTime + (Math.random() - 0.5) * 5),
                throughput: Math.max(140, prev.throughput + (Math.random() - 0.5) * 10)
            }))
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const getHealthStatus = () => {
        if (metrics.proofTime > 60) return { status: 'critical', color: 'text-error', icon: AlertTriangle }
        if (metrics.proofTime > 50) return { status: 'warning', color: 'text-warning', icon: AlertTriangle }
        return { status: 'healthy', color: 'text-success', icon: CheckCircle2 }
    }

    const health = getHealthStatus()

    return (
        <div className="ops-container fade-in">
            <header className="section-header">
                <h2>Network Operations & Prover Health</h2>
                <p>Real-time monitoring of ZK-Prover performance and network health with intelligent alerts.</p>
            </header>

            {/* Health Status Banner */}
            <div className={`health-banner glass ${health.status}`}>
                <div className="health-icon">
                    <health.icon size={24} className={health.color} />
                </div>
                <div className="health-info">
                    <h3>Prover Cluster Status: {health.status.toUpperCase()}</h3>
                    <p>
                        {health.status === 'healthy' && 'All systems operating within optimal parameters'}
                        {health.status === 'warning' && 'Some nodes showing elevated response times - monitoring closely'}
                        {health.status === 'critical' && 'Immediate attention required - performance degradation detected'}
                    </p>
                </div>
                <div className="health-metrics">
                    <div className="health-metric">
                        <span className="metric-label">Avg Proof Time</span>
                        <span className={`metric-value ${health.color}`}>{metrics.proofTime}s</span>
                    </div>
                    <div className="health-metric">
                        <span className="metric-label">Error Rate</span>
                        <span className={`metric-value ${health.color}`}>{(metrics.errorRate * 100).toFixed(2)}%</span>
                    </div>
                </div>
            </div>

            {/* Active Alerts */}
            {alerts.length > 0 && (
                <div className="alerts-section glass">
                    <h3>Active Alerts</h3>
                    <div className="alerts-list">
                        {alerts.map(alert => (
                            <div key={alert.id} className={`alert-item ${alert.type}`}>
                                <AlertTriangle size={16} />
                                <div className="alert-content">
                                    <span className="alert-message">{alert.message}</span>
                                    <span className="alert-time">{alert.time}</span>
                                </div>
                                <button className="alert-dismiss" onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}>
                                    Dismiss
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="stats-grid">
                <div className="stat-card glass">
                    <div className="stat-label">Block Height</div>
                    <div className="stat-value">{metrics.blockHeight.toLocaleString()}</div>
                    <div className="stat-change positive">+1.2s avg</div>
                </div>
                <div className="stat-card glass">
                    <div className="stat-label">Proof Gen. Time</div>
                    <div className="stat-value">{metrics.proofTime}s</div>
                    <div className={`stat-change ${metrics.proofTime > 50 ? 'negative' : 'positive'}`}>
                        {metrics.proofTime > 50 ? '+' : '-'}{Math.abs(metrics.proofTime - 42).toFixed(1)}s from baseline
                    </div>
                </div>
                <div className="stat-card glass">
                    <div className="stat-label">Cost per Proof</div>
                    <div className="stat-value">${metrics.costPerProof.toFixed(3)}</div>
                    <div className="stat-status active">Optimized</div>
                </div>
                <div className="stat-card glass">
                    <div className="stat-label">Throughput</div>
                    <div className="stat-value">{metrics.throughput.toFixed(0)}</div>
                    <div className="stat-change positive">txs/sec</div>
                </div>
            </div>

            <div className="metrics-row">
                <div className="metric-box glass">
                    <div className="box-header">
                        <h3>ZKP Prover Performance</h3>
                        <BarChart3 size={18} className="text-primary" />
                    </div>
                    <div className="metric-content">
                        <div className="performance-viz">
                            {/* Mock visualization bars with real-time updates */}
                            {[45, 60, 42, 55, 48, 52, 40, metrics.proofTime].map((h, i) => (
                                <div key={i} className={`viz-bar ${i === 7 ? 'current' : ''}`} style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="viz-labels">
                            <span>Last 8 Hours</span>
                            <span>Avg: {((45 + 60 + 42 + 55 + 48 + 52 + 40 + metrics.proofTime) / 8).toFixed(1)}s / proof</span>
                        </div>
                    </div>
                </div>

                <div className="metric-box glass">
                    <div className="box-header">
                        <h3>DA Throughput & Cost</h3>
                        <Database size={18} className="text-primary" />
                    </div>
                    <div className="metric-stats">
                        <div className="m-stat">
                            <span className="m-label">Data Posted (L1)</span>
                            <span className="m-val">4.2 GB</span>
                        </div>
                        <div className="m-stat">
                            <span className="m-label">Est. DA Cost (Monthly)</span>
                            <span className="m-val text-success">$1,240</span>
                        </div>
                        <div className="m-stat">
                            <span className="m-label">DA Efficiency</span>
                            <span className="m-val text-success">94.2%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prover Node Details */}
            <div className="prover-nodes-section glass">
                <h3>Prover Cluster Health</h3>
                <div className="nodes-grid">
                    {[
                        { id: 1, name: 'Prover Node Alpha', status: 'healthy', load: 78, proofs: 1247 },
                        { id: 2, name: 'Prover Node Beta', status: 'healthy', load: 65, proofs: 1198 },
                        { id: 3, name: 'Prover Node Gamma', status: 'warning', load: 92, proofs: 1156 },
                        { id: 4, name: 'Prover Node Delta', status: 'healthy', load: 71, proofs: 1203 }
                    ].map(node => (
                        <div key={node.id} className={`node-card ${node.status}`}>
                            <div className="node-header">
                                <Cpu size={20} />
                                <div className="node-info">
                                    <p className="node-name">{node.name}</p>
                                    <p className="node-status">{node.status.toUpperCase()}</p>
                                </div>
                                <div className={`node-indicator ${node.status}`}></div>
                            </div>
                            <div className="node-metrics">
                                <div className="node-metric">
                                    <span className="metric-label">Load</span>
                                    <div className="load-bar">
                                        <div className="load-fill" style={{ width: `${node.load}%` }}></div>
                                    </div>
                                    <span className="metric-value">{node.load}%</span>
                                </div>
                                <div className="node-metric">
                                    <span className="metric-label">Proofs Today</span>
                                    <span className="metric-value">{node.proofs.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="infra-section glass">
                <h3>Infrastructure Status</h3>
                <div className="infra-list">
                    <div className="infra-item">
                        <div className="infra-info">
                            <Server size={20} />
                            <div>
                                <p className="infra-name">Sequencer Node (Primary)</p>
                                <p className="infra-meta">AWS us-east-1 • t3.xlarge</p>
                            </div>
                        </div>
                        <div className="infra-badge">Active</div>
                    </div>
                    <div className="infra-item">
                        <div className="infra-info">
                            <Cpu size={20} />
                            <div>
                                <p className="infra-name">ZK-Prover Cluster</p>
                                <p className="infra-meta">AWS c6g.4xlarge • 8 Nodes</p>
                            </div>
                        </div>
                        <div className={`infra-badge ${health.status}`}>{health.status}</div>
                    </div>
                    <div className="infra-item">
                        <div className="infra-info">
                            <Globe size={20} />
                            <div>
                                <p className="infra-name">RPC Endpoint</p>
                                <p className="infra-meta">https://rpc.mychain.com</p>
                            </div>
                        </div>
                        <div className="infra-badge">Healthy</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Operations
