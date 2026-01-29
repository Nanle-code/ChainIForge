import { useEffect, useMemo, useState } from 'react'
import { Calculator, TrendingDown, ArrowRight, Database, Layers, Lock, BarChart3 } from 'lucide-react'

const EconomicCalculator = ({ daMode: daModeProp, onDaModeChange }) => {
  const [volume, setVolume] = useState(100000) // Monthly transactions
  const [avgGasL1, setAvgGasL1] = useState(25) // Gwei
  const [daModeInternal, setDaModeInternal] = useState('eth') // DA mode

  const daMode = daModeProp ?? daModeInternal

  useEffect(() => {
    if (daModeProp) return
    // keep internal state valid if caller doesn't control it
    setDaModeInternal((m) => (m ? m : 'eth'))
  }, [daModeProp])

  // DA cost configurations
  const daCosts = {
    eth: { name: 'Ethereum L1', costPerGB: 15000, icon: <Database size={16} /> },
    avail: { name: 'Avail / Celestia', costPerGB: 500, icon: <Layers size={16} /> },
    dac: { name: 'Consortium (DAC)', costPerGB: 0, icon: <Lock size={16} /> }
  }

  // Calculate costs
  const {
    avgTxSize,
    monthlyDataGB,
    costL1,
    costCDK,
    daCost,
    totalCostCDK,
    savings,
    savingsPercent
  } = useMemo(() => {
    const avgTxSizeLocal = 0.00005 // GB per transaction (50KB)
    const monthlyDataGBLocal = volume * avgTxSizeLocal

    const costL1Local = (volume * avgGasL1 * 21000 * 0.000000001 * 2500).toFixed(2)
    const costCDKLocal = (volume * 0.005).toFixed(2) // Base CDK ops cost
    const daCostLocal = (monthlyDataGBLocal * daCosts[daMode].costPerGB).toFixed(2)
    const totalCostCDKLocal = (parseFloat(costCDKLocal) + parseFloat(daCostLocal)).toFixed(2)

    const savingsLocal = (parseFloat(costL1Local) - parseFloat(totalCostCDKLocal)).toFixed(2)
    const savingsPercentLocal = ((parseFloat(savingsLocal) / parseFloat(costL1Local)) * 100).toFixed(1)

    return {
      avgTxSize: avgTxSizeLocal,
      monthlyDataGB: monthlyDataGBLocal,
      costL1: costL1Local,
      costCDK: costCDKLocal,
      daCost: daCostLocal,
      totalCostCDK: totalCostCDKLocal,
      savings: savingsLocal,
      savingsPercent: savingsPercentLocal
    }
  }, [avgGasL1, daMode, volume])

  const setDaMode = (next) => {
    if (onDaModeChange) onDaModeChange(next)
    if (daModeProp == null) setDaModeInternal(next)
  }

  return (
    <div className="economic-calculator glass fade-in">
      <div className="calculator-header">
        <Calculator className="text-primary" />
        <h3>L2 Economic Estimator with DA Analysis</h3>
      </div>

      <div className="calc-inputs">
        <div className="input-group">
          <label>Monthly Transactions</label>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
          <span className="val-display">{volume.toLocaleString()} txs</span>
        </div>

        <div className="input-group">
          <label>Avg Gas Price (Gwei)</label>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={avgGasL1}
            onChange={(e) => setAvgGasL1(parseInt(e.target.value))}
          />
          <span className="val-display">{avgGasL1} Gwei</span>
        </div>

        <div className="da-selection">
          <label>Data Availability Mode</label>
          <div className="da-options">
            {Object.entries(daCosts).map(([key, config]) => (
              <div
                key={key}
                className={`da-option ${daMode === key ? 'active' : ''}`}
                onClick={() => setDaMode(key)}
              >
                {config.icon}
                <div>
                  <p className="da-name">{config.name}</p>
                  <p className="da-cost">${config.costPerGB.toLocaleString()}/GB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cost-breakdown">
        <h4>Monthly Cost Breakdown</h4>
        <div className="breakdown-grid">
          <div className="breakdown-item">
            <span className="label">Base CDK Operations</span>
            <span className="value">${parseFloat(costCDK).toLocaleString()}</span>
          </div>
          <div className="breakdown-item">
            <span className="label">Data Availability ({daCosts[daMode].name})</span>
            <span className="value">${parseFloat(daCost).toLocaleString()}</span>
          </div>
          <div className="breakdown-item total">
            <span className="label">Total CDK Cost</span>
            <span className="value">${parseFloat(totalCostCDK).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="calc-results">
        <div className="result-item">
          <span className="label">Est. Cost on Ethereum (L1)</span>
          <span className="value text-error">${parseFloat(costL1).toLocaleString()}</span>
        </div>
        <div className="result-divider"><ArrowRight size={16} /></div>
        <div className="result-item">
          <span className="label">Est. Cost on ChainiForge (CDK)</span>
          <span className="value text-success">${parseFloat(totalCostCDK).toLocaleString()}</span>
        </div>
      </div>

      <div className="savings-banner">
        <TrendingDown size={20} />
        <div>
          <span>Annual Savings: <strong>${(parseFloat(savings) * 12).toLocaleString()}</strong> ({savingsPercent}% reduction)</span>
          <small>Data posted: {monthlyDataGB.toFixed(2)} GB/month via {daCosts[daMode].name}</small>
        </div>
      </div>

      <div className="roi-metrics">
        <h4>ROI Analysis</h4>
        <div className="metrics-grid">
          <div className="metric-item">
            <BarChart3 size={16} />
            <div>
              <span className="metric-value">{savingsPercent}%</span>
              <span className="metric-label">Cost Reduction</span>
            </div>
          </div>
          <div className="metric-item">
            <Calculator size={16} />
            <div>
              <span className="metric-value">${(parseFloat(savings) / volume * 1000).toFixed(4)}</span>
              <span className="metric-label">Savings per 1K txs</span>
            </div>
          </div>
          <div className="metric-item">
            <Database size={16} />
            <div>
              <span className="metric-value">${(parseFloat(daCost) / monthlyDataGB).toFixed(2)}</span>
              <span className="metric-label">DA Cost per GB</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EconomicCalculator
