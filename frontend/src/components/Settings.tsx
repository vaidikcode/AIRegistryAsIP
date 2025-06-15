"use client"

import type React from "react"
import { useState } from "react"
import "./Settings.css"

interface UserProfile {
  name: string
  email: string
  walletAddress: string
  ensName?: string
  avatar?: string
  bio: string
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  marketingEmails: boolean
  securityAlerts: boolean
  agentUpdates: boolean
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends"
  showAgentStats: boolean
  allowDirectMessages: boolean
  showOnlineStatus: boolean
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "privacy" | "security" | "billing">(
    "profile",
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const [profile, setProfile] = useState<UserProfile>({
    name: "WHY DID YOU REDEEM IT",
    email: "anything_fors@example.com",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    ensName: "hello.eth",
    bio: "AI researcher and blockchain enthusiast. Building the future of decentralized AI.",
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    agentUpdates: true,
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "public",
    showAgentStats: true,
    allowDirectMessages: true,
    showOnlineStatus: false,
  })

  const handleSave = async () => {
    setIsLoading(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    
  }

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: keyof PrivacySettings, value: any) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }))
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
    { id: "security", label: "Security", icon: "🛡️" },
    { id: "billing", label: "Billing", icon: "💳" },
  ]

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your account preferences and security</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="theme-toggle">
            <label className="toggle-label">
              <span>Dark Mode</span>
              <div className="toggle-switch">
                <input type="checkbox" checked={isDarkMode} onChange={(e) => setIsDarkMode(e.target.checked)} />
                <span className="toggle-slider"></span>
              </div>
            </label>
          </div>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Profile Information</h2>
                <p className="section-description">Update your personal information and public profile</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Wallet Address</label>
                  <div className="wallet-input">
                    <input type="text" value={profile.walletAddress} readOnly className="form-input readonly" />
                    <button className="connect-wallet-btn">Change Wallet</button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">ENS Name</label>
                  <input
                    type="text"
                    value={profile.ensName || ""}
                    onChange={(e) => handleProfileChange("ensName", e.target.value)}
                    className="form-input"
                    placeholder="yourname.eth"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    className="form-textarea"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Notification Preferences</h2>
                <p className="section-description">Choose how you want to be notified about important updates</p>
              </div>

              <div className="notification-settings">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Email Notifications</h3>
                    <p className="notification-description">Receive important updates via email</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.emailNotifications}
                      onChange={(e) => handleNotificationChange("emailNotifications", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Push Notifications</h3>
                    <p className="notification-description">Get real-time notifications in your browser</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.pushNotifications}
                      onChange={(e) => handleNotificationChange("pushNotifications", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Marketing Emails</h3>
                    <p className="notification-description">Receive updates about new features and promotions</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.marketingEmails}
                      onChange={(e) => handleNotificationChange("marketingEmails", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Security Alerts</h3>
                    <p className="notification-description">Important security notifications (recommended)</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.securityAlerts}
                      onChange={(e) => handleNotificationChange("securityAlerts", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Agent Updates</h3>
                    <p className="notification-description">Notifications about your AI agents' performance</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.agentUpdates}
                      onChange={(e) => handleNotificationChange("agentUpdates", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Privacy Settings</h2>
                <p className="section-description">Control who can see your information and activity</p>
              </div>

              <div className="privacy-settings">
                <div className="privacy-item">
                  <div className="privacy-info">
                    <h3 className="privacy-title">Profile Visibility</h3>
                    <p className="privacy-description">Who can see your profile information</p>
                  </div>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                    className="privacy-select"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h3 className="privacy-title">Show Agent Statistics</h3>
                    <p className="privacy-description">Display your AI agent performance metrics publicly</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.showAgentStats}
                      onChange={(e) => handlePrivacyChange("showAgentStats", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h3 className="privacy-title">Allow Direct Messages</h3>
                    <p className="privacy-description">Let other users send you direct messages</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.allowDirectMessages}
                      onChange={(e) => handlePrivacyChange("allowDirectMessages", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h3 className="privacy-title">Show Online Status</h3>
                    <p className="privacy-description">Display when you're online to other users</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.showOnlineStatus}
                      onChange={(e) => handlePrivacyChange("showOnlineStatus", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Security & Authentication</h2>
                <p className="section-description">Manage your account security and authentication methods</p>
              </div>

              <div className="security-settings">
                <div className="security-item">
                  <div className="security-info">
                    <h3 className="security-title">Two-Factor Authentication</h3>
                    <p className="security-description">Add an extra layer of security to your account</p>
                    <span className="security-status enabled">Enabled</span>
                  </div>
                  <button className="security-button">Configure</button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h3 className="security-title">API Keys</h3>
                    <p className="security-description">Manage API keys for third-party integrations</p>
                  </div>
                  <button className="security-button">Manage Keys</button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h3 className="security-title">Login History</h3>
                    <p className="security-description">View recent login activity and sessions</p>
                  </div>
                  <button className="security-button">View History</button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h3 className="security-title">Connected Applications</h3>
                    <p className="security-description">Manage third-party app permissions</p>
                  </div>
                  <button className="security-button">Manage Apps</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Billing & Subscription</h2>
                <p className="section-description">Manage your subscription and payment methods</p>
              </div>

              <div className="billing-settings">
                <div className="current-plan">
                  <div className="plan-info">
                    <h3 className="plan-title">Current Plan: Pro</h3>
                    <p className="plan-description">$29/month • Unlimited AI agents • Priority support</p>
                    <p className="plan-renewal">Next billing date: January 15, 2024</p>
                  </div>
                  <button className="plan-button">Upgrade Plan</button>
                </div>

                <div className="billing-item">
                  <div className="billing-info">
                    <h3 className="billing-title">Payment Method</h3>
                    <p className="billing-description">•••• •••• •••• 4242 (Expires 12/25)</p>
                  </div>
                  <button className="billing-button">Update</button>
                </div>

                <div className="billing-item">
                  <div className="billing-info">
                    <h3 className="billing-title">Billing History</h3>
                    <p className="billing-description">View and download past invoices</p>
                  </div>
                  <button className="billing-button">View History</button>
                </div>

                <div className="billing-item">
                  <div className="billing-info">
                    <h3 className="billing-title">Usage & Limits</h3>
                    <p className="billing-description">Monitor your current usage and limits</p>
                  </div>
                  <button className="billing-button">View Usage</button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="settings-footer">
            <button onClick={handleSave} disabled={isLoading} className={`save-button ${isLoading ? "loading" : ""}`}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
