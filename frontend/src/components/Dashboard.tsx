"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import "./Dashboard.css"

interface DashboardStats {
  totalAgents: number
  totalViews: number
  totalLicenses: number
  monthlyRevenue: number
}

interface ChartData {
  name: string
  agents: number
  revenue: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAgents: 0,
    totalViews: 0,
    totalLicenses: 0,
    monthlyRevenue: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  // Mock data for charts
  const chartData: ChartData[] = [
    { name: "Jan", agents: 4, revenue: 2400 },
    { name: "Feb", agents: 3, revenue: 1398 },
    { name: "Mar", agents: 8, revenue: 9800 },
    { name: "Apr", agents: 12, revenue: 3908 },
    { name: "May", agents: 6, revenue: 4800 },
    { name: "Jun", agents: 15, revenue: 3800 },
  ]

  const recentActivity = [
    { id: 1, action: "Registered", agent: "GPT-Vision-Pro", time: "2 hours ago", status: "success" },
    { id: 2, action: "Licensed", agent: "Text-Analyzer-v2", time: "5 hours ago", status: "success" },
    { id: 3, action: "Updated", agent: "Image-Generator", time: "1 day ago", status: "pending" },
    { id: 4, action: "Registered", agent: "Code-Assistant", time: "2 days ago", status: "success" },
  ]

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats({
        totalAgents: 24,
        totalViews: 1847,
        totalLicenses: 12,
        monthlyRevenue: 0,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Manage your AI agent portfolio</p>
        </div>
        
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon agents-icon">🤖</div>
          <div className="stat-content">
            <div className="stat-value">{isLoading ? "..." : stats.totalAgents}</div>
            <div className="stat-label">Total Agents</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon views-icon">👁️</div>
          <div className="stat-content">
            <div className="stat-value">{isLoading ? "..." : stats.totalViews.toLocaleString()}</div>
            <div className="stat-label">Total Views</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon licenses-icon">📄</div>
          <div className="stat-content">
            <div className="stat-value">{isLoading ? "..." : stats.totalLicenses}</div>
            <div className="stat-label">Active Licenses</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">${isLoading ? "..." : stats.monthlyRevenue.toLocaleString()}</div>
            <div className="stat-label">Monthly Revenue(***ur broke twn***)</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3 className="chart-title">Agent Registration Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(0,245,212,0.3)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="agents" fill="url(#agentGradient)" />
              <defs>
                <linearGradient id="agentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00f5d4" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Revenue Growth....i jst made ts up btw :)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(155,93,229,0.3)",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#9b5de5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <div className="activity-header">
          <h3 className="activity-title">Recent Activity.....Me when when mock data :(</h3>
          
        </div>
        <div className="activity-list">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-status ${activity.status}`}></div>
              <div className="activity-content">
                <div className="activity-main">
                  <span className="activity-action">{activity.action}</span>
                  <span className="activity-agent">{activity.agent}</span>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
