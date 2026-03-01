import { useState } from 'react'
import { 
    Gamepad2, 
    Building2, 
    Coins, 
    Package, 
    Heart, 
    GraduationCap,
    ShoppingCart,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Search,
    Filter
} from 'lucide-react'

const templates = [
    {
        id: 'defi',
        name: 'DeFi Protocol',
        icon: Coins,
        category: 'Finance',
        description: 'Optimized for high-frequency trading and DeFi applications with maximum security.',
        popularity: 95,
        config: {
            chainName: 'DeFi Protocol Chain',
            infra: 'rollup',
            da: 'eth',
            token: 'eth',
            gasSymbol: 'ETH',
            permissions: 'public',
            agglayer: true,
            security: 'pessimistic'
        },
        features: ['Max Security', 'Ethereum DA', 'AggLayer', 'Public Access'],
        useCases: ['DEX', 'Lending', 'Yield Farming', 'Derivatives']
    },
    {
        id: 'gaming',
        name: 'Gaming & NFTs',
        icon: Gamepad2,
        category: 'Gaming',
        description: 'Ultra-low fees and high throughput for gaming transactions and NFT minting.',
        popularity: 88,
        config: {
            chainName: 'Gaming Chain',
            infra: 'validium',
            da: 'avail',
            token: 'custom',
            gasSymbol: 'GAME',
            permissions: 'public',
            agglayer: true,
            security: 'optimistic'
        },
        features: ['Low Cost', 'High Speed', 'Custom Token', 'NFT Optimized'],
        useCases: ['In-Game Assets', 'NFT Marketplace', 'Play-to-Earn', 'Tournaments']
    },
    {
        id: 'enterprise',
        name: 'Enterprise Private',
        icon: Building2,
        category: 'Enterprise',
        description: 'Private permissioned network with KYC/AML compliance for corporate use.',
        popularity: 82,
        config: {
            chainName: 'Enterprise Chain',
            infra: 'validium',
            da: 'dac',
            token: 'custom',
            gasSymbol: 'CORP',
            permissions: 'whitelist',
            schemes: ['kyc', 'enterprise'],
            agglayer: false,
            security: 'pessimistic'
        },
        features: ['Private', 'KYC Required', 'Zero DA Cost', 'Full Control'],
        useCases: ['Internal Payments', 'Supply Chain', 'Document Verification', 'Asset Tokenization']
    },
    {
        id: 'supply-chain',
        name: 'Supply Chain',
        icon: Package,
        category: 'Logistics',
        description: 'Track products and verify authenticity with immutable records.',
        popularity: 75,
        config: {
            chainName: 'Supply Chain Network',
            infra: 'validium',
            da: 'dac',
            token: 'eth',
            gasSymbol: 'ETH',
            permissions: 'whitelist',
            schemes: ['enterprise'],
            agglayer: true,
            security: 'optimistic'
        },
        features: ['Traceability', 'Partner Network', 'Low Cost', 'AggLayer'],
        useCases: ['Product Tracking', 'Authenticity Verification', 'Logistics', 'Compliance']
    },
    {
        id: 'healthcare',
        name: 'Healthcare Records',
        icon: Heart,
        category: 'Healthcare',
        description: 'HIPAA-compliant blockchain for secure medical records and patient data.',
        popularity: 70,
        config: {
            chainName: 'Healthcare Chain',
            infra: 'rollup',
            da: 'dac',
            token: 'eth',
            gasSymbol: 'ETH',
            permissions: 'whitelist',
            schemes: ['kyc', 'enterprise'],
            agglayer: false,
            security: 'pessimistic'
        },
        features: ['HIPAA Ready', 'Private DA', 'Max Security', 'Access Control'],
        useCases: ['Medical Records', 'Prescription Tracking', 'Insurance Claims', 'Research Data']
    },
    {
        id: 'education',
        name: 'Education & Credentials',
        icon: GraduationCap,
        category: 'Education',
        description: 'Issue and verify academic credentials, certificates, and achievements.',
        popularity: 68,
        config: {
            chainName: 'Education Network',
            infra: 'validium',
            da: 'avail',
            token: 'eth',
            gasSymbol: 'ETH',
            permissions: 'public',
            agglayer: true,
            security: 'optimistic'
        },
        features: ['Public Verification', 'Low Cost', 'AggLayer', 'Credential NFTs'],
        useCases: ['Diplomas', 'Certificates', 'Skill Badges', 'Academic Records']
    },
    {
        id: 'retail',
        name: 'Retail & Loyalty',
        icon: ShoppingCart,
        category: 'Retail',
        description: 'Customer loyalty programs and rewards with branded tokens.',
        popularity: 85,
        config: {
            chainName: 'Retail Rewards Chain',
            infra: 'validium',
            da: 'avail',
            token: 'custom',
            gasSymbol: 'POINTS',
            permissions: 'public',
            agglayer: true,
            security: 'optimistic'
        },
        features: ['Branded Token', 'Low Fees', 'Fast Transactions', 'Customer Friendly'],
        useCases: ['Loyalty Points', 'Gift Cards', 'Cashback', 'Member Rewards']
    },
    {
        id: 'social',
        name: 'Social & Creator',
        icon: Sparkles,
        category: 'Social',
        description: 'Decentralized social networks and creator monetization platforms.',
        popularity: 79,
        config: {
            chainName: 'Social Creator Chain',
            infra: 'validium',
            da: 'avail',
            token: 'custom',
            gasSymbol: 'SOCIAL',
            permissions: 'public',
            agglayer: true,
            security: 'optimistic'
        },
        features: ['Creator Economy', 'Micro-transactions', 'NFT Support', 'Community Tokens'],
        useCases: ['Content Monetization', 'Social Tokens', 'Tipping', 'Fan Engagement']
    }
]

const TemplateLibrary = ({ onSelectTemplate }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const categories = ['all', ...new Set(templates.map(t => t.category))]

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleUseTemplate = (template) => {
        if (onSelectTemplate) {
            onSelectTemplate(template.config)
        }
    }

    return (
        <div className="template-library-container fade-in">
            <header className="section-header">
                <h2>Template Library</h2>
                <p>Pre-built industry-specific configurations to get started in seconds.</p>
            </header>

            {/* Search and Filter */}
            <div className="template-controls glass">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="category-filters">
                    <Filter size={16} />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat === 'all' ? 'All' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Templates Grid */}
            <div className="templates-grid">
                {filteredTemplates.map(template => {
                    const Icon = template.icon
                    return (
                        <div
                            key={template.id}
                            className={`template-card glass ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                            onClick={() => setSelectedTemplate(template)}
                        >
                            <div className="template-header">
                                <div className="template-icon">
                                    <Icon size={24} />
                                </div>
                                <div className="template-meta">
                                    <h3>{template.name}</h3>
                                    <span className="category-badge">{template.category}</span>
                                </div>
                            </div>

                            <p className="template-description">{template.description}</p>

                            <div className="template-features">
                                {template.features.map((feature, idx) => (
                                    <span key={idx} className="feature-tag">
                                        <CheckCircle2 size={12} />
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            <div className="template-use-cases">
                                <p className="use-cases-label">Use Cases:</p>
                                <div className="use-cases-list">
                                    {template.useCases.slice(0, 3).map((useCase, idx) => (
                                        <span key={idx} className="use-case-item">{useCase}</span>
                                    ))}
                                    {template.useCases.length > 3 && (
                                        <span className="use-case-more">+{template.useCases.length - 3} more</span>
                                    )}
                                </div>
                            </div>

                            <div className="template-footer">
                                <div className="popularity-bar">
                                    <div className="popularity-fill" style={{ width: `${template.popularity}%` }}></div>
                                </div>
                                <span className="popularity-label">{template.popularity}% match</span>
                            </div>

                            <button
                                className="btn-primary full-width"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleUseTemplate(template)
                                }}
                            >
                                Use Template <ArrowRight size={16} />
                            </button>
                        </div>
                    )
                })}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="no-results glass">
                    <Search size={48} className="text-muted" />
                    <h3>No templates found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}

            {/* Selected Template Detail */}
            {selectedTemplate && (
                <div className="template-detail glass fade-in">
                    <h3>Configuration Preview: {selectedTemplate.name}</h3>
                    <div className="config-preview">
                        <div className="config-row">
                            <span className="config-label">Architecture:</span>
                            <span className="config-value capitalize">{selectedTemplate.config.infra}</span>
                        </div>
                        <div className="config-row">
                            <span className="config-label">Data Availability:</span>
                            <span className="config-value uppercase">{selectedTemplate.config.da}</span>
                        </div>
                        <div className="config-row">
                            <span className="config-label">Gas Token:</span>
                            <span className="config-value">{selectedTemplate.config.gasSymbol}</span>
                        </div>
                        <div className="config-row">
                            <span className="config-label">Permissions:</span>
                            <span className="config-value capitalize">{selectedTemplate.config.permissions}</span>
                        </div>
                        <div className="config-row">
                            <span className="config-label">AggLayer:</span>
                            <span className="config-value">{selectedTemplate.config.agglayer ? 'Enabled' : 'Disabled'}</span>
                        </div>
                        <div className="config-row">
                            <span className="config-label">Security:</span>
                            <span className="config-value capitalize">{selectedTemplate.config.security}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TemplateLibrary
