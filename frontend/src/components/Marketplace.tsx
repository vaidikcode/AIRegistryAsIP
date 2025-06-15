"use client"

import type React from "react"
import { useState, useEffect } from "react"

import "./Marketplace.css"

interface MarketplaceAgent {
  id: string
  name: string
  description: string
  owner: string
  capabilities: string[]
  model: string
  version: string
  price: number
  currency: string
  category: string
  rating: number
  downloads: number
  ipAssetId: string
  isPublic: boolean
  licenseType: "commercial" | "personal" | "open-source"
  previewImage?: string
}

const Marketplace: React.FC = () => {
  const [agents, setAgents] = useState<MarketplaceAgent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price-low" | "price-high">("popular")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const categories = [
    "all",
    "text-generation",
    "image-analysis",
    "code-generation",
    "data-analysis",
    "healthcare",
    "finance",
    "education",
  ]

  // Mock daata
  const mockAgents: MarketplaceAgent[] = [
    {
      id: "mp1",
      name: "Medical Diagnosis Assistant",
      description: "AI agent specialized in medical image analysis and preliminary diagnosis suggestions",
      owner: "0x1234...5678",
      capabilities: ["medical-imaging", "diagnosis", "report-generation"],
      model: "MedVision-Pro",
      version: "3.2.1",
      price: 299,
      currency: "USD",
      category: "healthcare",
      rating: 4.8,
      downloads: 1247,
      ipAssetId: "0xmed1...2345",
      isPublic: true,
      licenseType: "commercial",
    },
    {
      id: "mp2",
      name: "Financial Risk Analyzer",
      description: "Advanced AI for financial risk assessment and portfolio optimization",
      owner: "0x2345...6789",
      capabilities: ["risk-analysis", "portfolio-optimization", "market-prediction"],
      model: "FinanceGPT-v4",
      version: "2.1.0",
      price: 599,
      currency: "USD",
      category: "finance",
      rating: 4.9,
      downloads: 892,
      ipAssetId: "0xfin1...3456",
      isPublic: true,
      licenseType: "commercial",
    },
    {
      id: "mp3",
      name: "Code Review Bot",
      description: "Automated code review and security vulnerability detection",
      owner: "0x3456...7890",
      capabilities: ["code-review", "security-analysis", "optimization"],
      model: "CodeGuard-AI",
      version: "1.8.5",
      price: 149,
      currency: "USD",
      category: "code-generation",
      rating: 4.6,
      downloads: 2156,
      ipAssetId: "0xcode1...4567",
      isPublic: true,
      licenseType: "personal",
    },
    {
      id: "mp4",
      name: "Educational Content Creator",
      description: "AI that generates personalized educational content and quizzes",
      owner: "0x4567...8901",
      capabilities: ["content-generation", "quiz-creation", "personalization"],
      model: "EduAI-Plus",
      version: "2.0.3",
      price: 0,
      currency: "USD",
      category: "education",
      rating: 4.4,
      downloads: 3421,
      ipAssetId: "0xedu1...5678",
      isPublic: true,
      licenseType: "open-source",
    },
    {
      id: "mp5",
      name: "Creative Writing Assistant",
      description: "Advanced text generation for creative writing and storytelling",
      owner: "0x5678...9012",
      capabilities: ["creative-writing", "story-generation", "character-development"],
      model: "CreativeGPT-v3",
      version: "3.1.2",
      price: 199,
      currency: "USD",
      category: "text-generation",
      rating: 4.7,
      downloads: 1876,
      ipAssetId: "0xcreate1...6789",
      isPublic: true,
      licenseType: "commercial",
    },
  ]

  useEffect(() => {
    // API call
    const timer = setTimeout(() => {
      setAgents(mockAgents)
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const filteredAndSortedAgents = agents
    .filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory
      const matchesPrice = agent.price >= priceRange[0] && agent.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.version.localeCompare(a.version)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "popular":
        default:
          return b.downloads - a.downloads
      }
    })

  const getLicenseColor = (license: string) => {
    switch (license) {
      case "commercial":
        return "#00f5d4"
      case "personal":
        return "#9b5de5"
      case "open-source":
        return "#00ff88"
      default:
        return "#6b7280"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? "filled" : ""}`}>
        ★
      </span>
    ))
  }

  if (isLoading) {
    return (
      <div className="marketplace-container">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Loading marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <div>
          <h1 className="marketplace-title">AI Agent Marketplace</h1>
          <p className="marketplace-subtitle">Discover, license, and deploy AI agents from the community</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search AI agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-button ${selectedCategory === category ? "active" : ""}`}
            >
              {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="sort-and-price">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="sort-select">
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <div className="price-range">
            <label>Price Range: $0 - $1000</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number.parseInt(e.target.value)])}
              className="price-slider"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span className="results-count">{filteredAndSortedAgents.length} agents found</span>
      </div>

      {/* Agents Grid */}
      <div className="marketplace-grid">
        {filteredAndSortedAgents.map((agent) => (
          <div key={agent.id} className="marketplace-card">
            <div className="card-header">
              <div className="agent-badge">
                <div className="license-indicator" style={{ backgroundColor: getLicenseColor(agent.licenseType) }}>
                  {agent.licenseType.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="card-actions">
                <button className="favorite-btn">♡</button>
                <button className="share-btn">↗</button>
              </div>
            </div>

            <div className="card-content">
              <h3 className="agent-title">{agent.name}</h3>
              <p className="agent-description">{agent.description}</p>

              <div className="agent-capabilities">
                {agent.capabilities.slice(0, 2).map((capability) => (
                  <span key={capability} className="capability-tag">
                    {capability}
                  </span>
                ))}
                {agent.capabilities.length > 2 && (
                  <span className="capability-more">+{agent.capabilities.length - 2}</span>
                )}
              </div>

              <div className="agent-stats">
                <div className="rating">
                  <div className="stars">{renderStars(agent.rating)}</div>
                  <span className="rating-value">{agent.rating}</span>
                </div>
                <div className="downloads">
                  <span className="download-count">{agent.downloads.toLocaleString()}</span>
                  <span className="download-label">downloads</span>
                </div>
              </div>

              <div className="agent-meta">
                <div className="model-info">
                  <span className="model-name">{agent.model}</span>
                  <span className="version">v{agent.version}</span>
                </div>
                <div className="owner-info">
                  <span className="owner-label">by</span>
                  <span className="owner-address">
                    {agent.owner.slice(0, 6)}...{agent.owner.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="price-section">
                {agent.price === 0 ? (
                  <span className="price-free">FREE</span>
                ) : (
                  <div className="price-info">
                    <span className="price-amount">${agent.price}</span>
                    <span className="price-currency">{agent.currency}</span>
                  </div>
                )}
              </div>

              <div className="action-buttons">
                <button className="btn-secondary">Preview</button>
                <button className="btn-primary">{agent.price === 0 ? "Download" : "License"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedAgents.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No agents found</h3>
          <p>Try adjusting your search criteria or browse different categories.</p>
        </div>
      )}
    </div>
  )
}

export default Marketplace
