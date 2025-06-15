"use client"

import type React from "react"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import "./Services.css"

interface APIService {
  id: string
  name: string
  provider: string
  description: string
  category: string
  status: "active" | "inactive" | "maintenance"
  version: string
  endpoint: string
  requestsToday: number
  responseTime: number
  uptime: number
  lastUsed: string
  metadata: Record<string, any>
  licenseType: string
  pricing: {
    model: string
    cost: number
    unit: string
  }
}

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "metadata" | "licensing">("overview")
  const [selectedService, setSelectedService] = useState<string>("huggingface-image")

  // Mock performance data
  const performanceData = [
    { time: "00:00", requests: 45, responseTime: 120 },
    { time: "04:00", requests: 32, responseTime: 98 },
    { time: "08:00", requests: 78, responseTime: 145 },
    { time: "12:00", requests: 156, responseTime: 167 },
    { time: "16:00", requests: 134, responseTime: 134 },
    { time: "20:00", requests: 89, responseTime: 112 },
  ]

  const usageData = [
    { date: "Mon", requests: 234 },
    { date: "Tue", requests: 456 },
    { date: "Wed", requests: 378 },
    { date: "Thu", requests: 567 },
    { date: "Fri", requests: 445 },
    { date: "Sat", requests: 234 },
    { date: "Sun", requests: 123 },
  ]

  // Mock API services data
  const apiServices: APIService[] = [
    {
      id: "huggingface-image",
      name: "Hugging Face Image Generation",
      provider: "Hugging Face",
      description: "Advanced AI image generation using FLUX.1-dev model with multiple API format support",
      category: "Image Generation",
      status: "active",
      version: "v1.0",
      endpoint: "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      requestsToday: 1247,
      responseTime: 2.3,
      uptime: 99.9,
      lastUsed: "2 minutes ago",
      metadata: {
        model: "black-forest-labs/FLUX.1-dev",
        supportedFormats: ["standard", "nebius-v1"],
        maxResolution: "1024x1024",
        responseFormats: ["binary", "b64_json"],
        rateLimits: {
          requestsPerMinute: 60,
          requestsPerHour: 1000,
        },
        authentication: "Bearer Token",
        contentTypes: ["application/json"],
      },
      licenseType: "Commercial",
      pricing: {
        model: "per-request",
        cost: 0.02,
        unit: "USD per image",
      },
    },
    {
      id: "nebius-image",
      name: "Nebius Image Generation API",
      provider: "Nebius",
      description: "High-performance image generation API with base64 JSON response format",
      category: "Image Generation",
      status: "active",
      version: "v1.0",
      endpoint: "https://router.huggingface.co/nebius/v1/images/generations",
      requestsToday: 892,
      responseTime: 1.8,
      uptime: 99.7,
      lastUsed: "5 minutes ago",
      metadata: {
        model: "black-forest-labs/flux-dev",
        responseFormat: "b64_json",
        maxPromptLength: 1000,
        supportedModels: ["black-forest-labs/flux-dev", "stabilityai/stable-diffusion-xl"],
        rateLimits: {
          requestsPerMinute: 30,
          requestsPerHour: 500,
        },
        authentication: "Bearer Token",
      },
      licenseType: "Commercial",
      pricing: {
        model: "per-request",
        cost: 0.025,
        unit: "USD per image",
      },
    },
  ]

  const currentService = apiServices.find((service) => service.id === selectedService) || apiServices[0]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#00f5d4"
      case "inactive":
        return "#6b7280"
      case "maintenance":
        return "#ffd23f"
      default:
        return "#6b7280"
    }
  }

  const renderPseudoCode = (serviceId: string) => {
    if (serviceId === "huggingface-image") {
      return (
        <div className="pseudo-code-section">
          <h4 className="pseudo-title">How This API Works (Simple Explanation)</h4>

          <div className="pseudo-block">
            <h5 className="pseudo-subtitle">Standard Hugging Face Format:</h5>
            <div className="pseudo-steps">
              <div className="pseudo-step">
                <span className="step-number">1.</span>
                <span className="step-text">
                  <strong>Connect to Hugging Face:</strong> Send a request to their image generation service
                </span>
              </div>
              <div className="pseudo-step">
                <span className="step-number">2.</span>
                <span className="step-text">
                  <strong>Provide Authorization:</strong> Include your secret API key to prove you have permission
                </span>
              </div>
              <div className="pseudo-step">
                <span className="step-number">3.</span>
                <span className="step-text">
                  <strong>Send Your Request:</strong> Tell the AI what image you want (e.g., "Astronaut riding a horse")
                </span>
              </div>
              <div className="pseudo-step">
                <span className="step-number">4.</span>
                <span className="step-text">
                  <strong>Receive Image:</strong> The AI creates and sends back your custom image
                </span>
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-title">Technical Implementation</span>
                <button
                  onClick={() =>
                    copyToClipboard(`const response = await fetch(
  "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
  {
    headers: {
      Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxx",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: "Astronaut riding a horse" }),
  }
);`)
                  }
                  className="copy-button"
                >
                  📋 Copy
                </button>
              </div>
              <pre className="code-content">
                {`const response = await fetch(
  "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
  {
    headers: {
      Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxx",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: "Astronaut riding a horse" }),
  }
);`}
              </pre>
            </div>
          </div>

          <div className="pseudo-block">
            <h5 className="pseudo-subtitle">Nebius v1 API Format:</h5>
            <div className="pseudo-steps">
              <div className="pseudo-step">
                <span className="step-number">1.</span>
                <span className="step-text">
                  <strong>Connect to Nebius Service:</strong> Use the specialized Nebius endpoint for faster processing
                </span>
              </div>
              <div className="pseudo-step">
                <span className="step-number">2.</span>
                <span className="step-text">
                  <strong>Specify Format:</strong> Request the image as base64 text (easier to handle in web apps)
                </span>
              </div>
              <div className="pseudo-step">
                <span className="step-number">3.</span>
                <span className="step-text">
                  <strong>Choose Model:</strong> Select which AI model to use for generation
                </span>
              </div>
              <div className="pseudo-step">
                <span className="step-number">4.</span>
                <span className="step-text">
                  <strong>Get Encoded Image:</strong> Receive image as text that can be directly displayed in browsers
                </span>
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-title">Technical Implementation</span>
                <button
                  onClick={() =>
                    copyToClipboard(`const response = await fetch(
  "https://router.huggingface.co/nebius/v1/images/generations",
  {
    headers: {
      Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxx",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      response_format: "b64_json",
      prompt: "Astronaut riding a horse",
      model: "black-forest-labs/flux-dev",
    }),
  }
);`)
                  }
                  className="copy-button"
                >
                  📋 Copy
                </button>
              </div>
              <pre className="code-content">
                {`const response = await fetch(
  "https://router.huggingface.co/nebius/v1/images/generations",
  {
    headers: {
      Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxx",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      response_format: "b64_json",
      prompt: "Astronaut riding a horse",
      model: "black-forest-labs/flux-dev",
    }),
  }
);`}
              </pre>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="pseudo-code-section">
        <h4 className="pseudo-title">How This API Works (Simple Explanation)</h4>
        <div className="pseudo-steps">
          <div className="pseudo-step">
            <span className="step-number">1.</span>
            <span className="step-text">
              <strong>Connect:</strong> Establish connection to the API service
            </span>
          </div>
          <div className="pseudo-step">
            <span className="step-number">2.</span>
            <span className="step-text">
              <strong>Authenticate:</strong> Provide credentials for access
            </span>
          </div>
          <div className="pseudo-step">
            <span className="step-number">3.</span>
            <span className="step-text">
              <strong>Request:</strong> Send your data and requirements
            </span>
          </div>
          <div className="pseudo-step">
            <span className="step-number">4.</span>
            <span className="step-text">
              <strong>Receive:</strong> Get the processed result
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">API Services</h1>
        <p className="services-subtitle">Manage and monitor your integrated API services</p>
      </div>

      {/* Service Selection */}
      <div className="service-selector">
        {apiServices.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`service-card ${selectedService === service.id ? "active" : ""}`}
          >
            <div className="service-info">
              <div className="service-header">
                <h3 className="service-name">{service.name}</h3>
                <div className="service-status" style={{ backgroundColor: getStatusColor(service.status) }}>
                  {service.status}
                </div>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-stats">
                <div className="stat">
                  <span className="stat-value">{service.requestsToday}</span>
                  <span className="stat-label">Requests Today</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{service.responseTime}s</span>
                  <span className="stat-label">Avg Response</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{service.uptime}%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs-header">
          {["overview", "metadata", "licensing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-content">
              <div className="overview-grid">
                <div className="overview-section">
                  <h3 className="section-title">Service Details</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Provider</span>
                      <span className="detail-value">{currentService.provider}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Category</span>
                      <span className="detail-value">{currentService.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Version</span>
                      <span className="detail-value">{currentService.version}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Last Used</span>
                      <span className="detail-value">{currentService.lastUsed}</span>
                    </div>
                    <div className="detail-item full-width">
                      <span className="detail-label">Endpoint</span>
                      <div className="endpoint-container">
                        <code className="endpoint-code">{currentService.endpoint}</code>
                        <button
                          onClick={() => copyToClipboard(currentService.endpoint)}
                          className="copy-button small"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overview-section">
                  <h3 className="section-title">Performance Metrics</h3>
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-value">{currentService.requestsToday.toLocaleString()}</div>
                      <div className="metric-label">Requests Today</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">{currentService.responseTime}s</div>
                      <div className="metric-label">Avg Response Time</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">{currentService.uptime}%</div>
                      <div className="metric-label">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Charts */}
              <div className="charts-section">
                <div className="chart-container">
                  <h3 className="chart-title">Response Time & Requests (24h)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(0,245,212,0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="requests" stroke="#00f5d4" strokeWidth={2} name="Requests" />
                      <Line type="monotone" dataKey="responseTime" stroke="#9b5de5" strokeWidth={2} name="Response Time (ms)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <h3 className="chart-title">Weekly Usage</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(199, 187, 187, 0.8)",
                          border: "1px solid rgba(0,245,212,0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="requests" fill="url(#usageGradient)" />
                      <defs>
                        <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#00f5d4" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pseudo Code Section */}
              {renderPseudoCode(currentService.id)}
            </div>
          )}

          {activeTab === "metadata" && (
            <div className="metadata-content">
              <div className="metadata-header">
                <h3 className="section-title">Service Metadata</h3>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(currentService.metadata, null, 2))}
                  className="copy-button"
                >
                  📋 Copy All Metadata
                </button>
              </div>

              <div className="json-container">
                <pre className="json-block">
                  <code>{JSON.stringify(currentService.metadata, null, 2)}</code>
                </pre>
              </div>

              <div className="metadata-breakdown">
                <h4 className="breakdown-title">Metadata Breakdown</h4>
                <div className="metadata-items">
                  {Object.entries(currentService.metadata).map(([key, value]) => (
                    <div key={key} className="metadata-item">
                      <div className="metadata-key">{key}</div>
                      <div className="metadata-value">
                        <code>{typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}</code>
                        <button
                          onClick={() =>
                            copyToClipboard(typeof value === "object" ? JSON.stringify(value, null, 2) : String(value))
                          }
                          className="copy-button small"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "licensing" && (
            <div className="licensing-content">
              <div className="license-overview">
                <h3 className="section-title">License Information</h3>
                <div className="license-grid">
                  <div className="license-item">
                    <span className="license-label">License Type</span>
                    <span className="license-value">{currentService.licenseType}</span>
                  </div>
                  <div className="license-item">
                    <span className="license-label">Pricing Model</span>
                    <span className="license-value">{currentService.pricing.model}</span>
                  </div>
                  <div className="license-item">
                    <span className="license-label">Cost</span>
                    <span className="license-value">
                      ${currentService.pricing.cost} {currentService.pricing.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="usage-limits">
                <h4 className="limits-title">Rate Limits & Usage</h4>
                <div className="limits-grid">
                  {currentService.metadata.rateLimits && (
                    <>
                      <div className="limit-item">
                        <div className="limit-label">Requests per Minute</div>
                        <div className="limit-value">{currentService.metadata.rateLimits.requestsPerMinute}</div>
                        <div className="limit-bar">
                          <div
                            className="limit-progress"
                            style={{ width: `${(currentService.requestsToday / 1440 / currentService.metadata.rateLimits.requestsPerMinute) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="limit-item">
                        <div className="limit-label">Requests per Hour</div>
                        <div className="limit-value">{currentService.metadata.rateLimits.requestsPerHour}</div>
                        <div className="limit-bar">
                          <div
                            className="limit-progress"
                            style={{ width: `${(currentService.requestsToday / 24 / currentService.metadata.rateLimits.requestsPerHour) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="license-terms">
                <h4 className="terms-title">Terms & Conditions</h4>
                <div className="terms-content">
                  <ul className="terms-list">
                    <li>Commercial use permitted under current license</li>
                    <li>Attribution required for public-facing applications</li>
                    <li>Rate limits apply as specified in metadata</li>
                    <li>Service availability subject to provider terms</li>
                    <li>Data retention policies apply per provider guidelines</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Services
