"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import "./RegisterAIAgent.css"

interface FormData {
  name: string
  description: string
  metadata: string
  ownerAddress: string
}

const RegisterAIAgent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    metadata: "",
    ownerAddress: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateJSON = (jsonString: string): boolean => {
    if (!jsonString.trim()) return true 
    try {
      JSON.parse(jsonString)
      return true
    } catch {
      return false
    }
  }

  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      setSuccess(message)
      setError("")
      setTimeout(() => setSuccess(""), 5000)
    } else {
      setError(message)
      setSuccess("")
      setTimeout(() => setError(""), 5000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    
    if (!formData.name || !formData.description || !formData.ownerAddress) {
      showToast("Please fill in all required fields", "error")
      setIsLoading(false)
      return
    }

    
    if (formData.metadata && !validateJSON(formData.metadata)) {
      showToast("Invalid JSON format in metadata field", "error")
      setIsLoading(false)
      return
    }

    try {
      // Parse metadata if it's a JSON string
      let metadata = {}
      if (formData.metadata.trim()) {
        try {
          metadata = JSON.parse(formData.metadata)
        } catch (e) {
          metadata = { additionalInfo: formData.metadata }
        }
      }

      const response = await axios.post("http://localhost:3001/api/register-ai-agent", {
        ...formData,
        metadata,
      })

      showToast(`AI Agent registered successfully! IP Asset ID: ${response.data.ipAssetId}`, "success")

      // Reset form
      setFormData({
        name: "",
        description: "",
        metadata: "",
        ownerAddress: "",
      })
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to register AI agent"
      const errorDetails = err.response?.data?.details || "An error occurred while registering the AI agent"
      showToast(`${errorMessage}: ${errorDetails}`, "error")
    } finally {
      setIsLoading(false)
    }
  }

  const isMetadataValid = !formData.metadata || validateJSON(formData.metadata)

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="header-section">
          <h1 className="main-title">Register AI Agent as IP</h1>
          <p className="subtitle">Register your AI agent as an Intellectual Property asset using Story Protocol</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <div className="alert-icon">⚠️</div>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <div className="alert-icon">✅</div>
            <span>{success}</span>
          </div>
        )}

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">AI Agent Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter AI agent name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label required">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your AI agent's capabilities and purpose"
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Metadata (JSON)
              <span className="form-hint">Optional - Additional information about your AI agent</span>
            </label>
            <textarea
              name="metadata"
              value={formData.metadata}
              onChange={handleChange}
              placeholder='{"capabilities": ["text-generation", "image-analysis"], "model": "GPT-4", "version": "1.0"}'
              className={`form-textarea ${!isMetadataValid ? "error" : ""}`}
              rows={4}
            />
            {!isMetadataValid && <span className="error-text">Invalid JSON format</span>}
          </div>

          <div className="form-group">
            <label className="form-label required">
              Owner Address
              <span className="form-hint">Ethereum wallet address</span>
            </label>
            <input
              type="text"
              name="ownerAddress"
              value={formData.ownerAddress}
              onChange={handleChange}
              placeholder="0x..."
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading || !isMetadataValid}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Registering...
              </>
            ) : (
              "Register AI Agent"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterAIAgent
