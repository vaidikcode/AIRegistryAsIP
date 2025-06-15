"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./Header.css"

interface LiveStats {
  registeredAgents: number
  lastSync: string
  network: string
}

interface NavigationLink {
  href: string
  label: string
  icon: string
}

interface HeaderProps {
  isTransitioning?: boolean
}

const Header: React.FC<HeaderProps> = ({
  isTransitioning = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [liveStats, setLiveStats] = useState<LiveStats>({
    registeredAgents: 42847,
    lastSync: "12 sec ago",
    network: "Ethereum Mainnet",
  })

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setIsWalletConnected(true)
    setWalletAddress("0x1234...5678")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        registeredAgents: prev.registeredAgents + Math.floor(Math.random() * 3),
        lastSync: Math.floor(Math.random() * 60) + " sec ago",
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isTransitioning) {
      setIsMenuOpen(false)
      setIsProfileDropdownOpen(false)
    }
  }, [isTransitioning])

  const navigationLinks: NavigationLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/marketplace", label: "Explore Agents", icon: "🌐" },
    { href: "/services", label: "Services", icon: "⚙️" },
  ]

  const handleNavigation = (href: string) => {
    if (!isTransitioning) {
      navigate(href)
      setIsMenuOpen(false)
      setIsProfileDropdownOpen(false)
    }
  }

  const isActiveRoute = (href: string): boolean => location.pathname === href

  const connectWallet = () => {
    if (!isWalletConnected) {
      setIsWalletConnected(true)
      setWalletAddress("0x1234...5678")
    }
  }

  const handleProfileDropdownToggle = () => {
    if (!isTransitioning) {
      setIsProfileDropdownOpen(!isProfileDropdownOpen)
    }
  }

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
    setIsProfileDropdownOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""} ${isTransitioning ? "transitioning" : ""}`}>
      <div className="header-container">
        <div className="brand-section">
          <button
            className="brand-link"
            onClick={() => handleNavigation("/")}
          >
            <div className="logo">
              <div className="logo-icon">🧠</div>
              <div className="brand-text">
                <span className="brand-name">NeuroIP</span>
                <span className="version-badge">v1.0</span>
              </div>
            </div>
          </button>
        </div>

        <div className={`stats-ticker ${isTransitioning ? "loading" : ""}`}>
          <div className="ticker-content">
            {isTransitioning ? (
              <div className="loading-ticker">
                <div className="loading-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="loading-text">Navigating...</span>
              </div>
            ) : (
              <>
                <div className="stat-item">
                  <span className="stat-label">Registered Agents:</span>
                  <span className="stat-value">{liveStats.registeredAgents.toLocaleString()}</span>
                </div>
                <div className="stat-divider">|</div>
                <div className="stat-item">
                  <span className="stat-label">Last Sync:</span>
                  <span className="stat-value">{liveStats.lastSync}</span>
                </div>
                <div className="stat-divider">|</div>
                <div className="stat-item">
                  <span className="stat-label">Network:</span>
                  <span className="stat-value network">{liveStats.network}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <nav className="desktop-nav">
          {navigationLinks.map((link) => (
            <button
              key={link.href}
              className={`nav-link ${isActiveRoute(link.href) ? "active" : ""} ${isTransitioning ? "disabled" : ""}`}
              onClick={() => handleNavigation(link.href)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
            </button>
          ))}
          
        </nav>

        <div className="profile-section">
          {isWalletConnected ? (
            <div className="profile-dropdown">
              <button onClick={handleProfileDropdownToggle} className={`profile-button ${isTransitioning ? "disabled" : ""}`}>
                <div className="wallet-info">
                  <div className="wallet-address">{walletAddress}</div>
                  <div className="wallet-status">Connected</div>
                </div>
                <div className="profile-avatar">
                  <div className="avatar-gradient"></div>
                </div>
              </button>

              {isProfileDropdownOpen && !isTransitioning && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => handleNavigation("/settings")}>
                    <span className="dropdown-icon">⚙️</span> Settings
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item disconnect" onClick={handleDisconnectWallet}>
                    <span className="dropdown-icon">🔌</span> Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={connectWallet} className={`connect-wallet-btn ${isTransitioning ? "disabled" : ""}`}>
              <span className="wallet-icon">👛</span> Connect Wallet
            </button>
          )}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={`mobile-menu-btn ${isMenuOpen ? "open" : ""} ${isTransitioning ? "disabled" : ""}`}
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>

      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-content">
          <div className="mobile-stats">
            <div className="mobile-stat">
              <span className="mobile-stat-value">{liveStats.registeredAgents.toLocaleString()}</span>
              <span className="mobile-stat-label">Agents</span>
            </div>
            <div className="mobile-stat">
              <span className="mobile-stat-value">{liveStats.lastSync}</span>
              <span className="mobile-stat-label">Last Sync</span>
            </div>
          </div>

          <nav className="mobile-nav-links">
            {navigationLinks.map((link) => (
              <button
                key={link.href}
                className={`mobile-nav-link ${isActiveRoute(link.href) ? "active" : ""} ${isTransitioning ? "disabled" : ""}`}
                onClick={() => handleNavigation(link.href)}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span className="mobile-nav-label">{link.label}</span>
              </button>
            ))}

            
          </nav>
        </div>
      </div>

      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  )
}

export default Header
