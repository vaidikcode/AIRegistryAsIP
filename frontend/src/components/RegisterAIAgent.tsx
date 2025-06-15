"use client";

import React, { useState } from "react";
import axios from "axios";
import "./RegisterAIAgent.css";

interface RegisterAIAgentProps {
  onSuccess?: (data: any) => void;
}

const RegisterAIAgent: React.FC<RegisterAIAgentProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ownerAddress: "",
    ownerName: "",
    imageUrl: "",
    imageHash: "",
    mediaUrl: "",
    mediaHash: "",
    mediaType: "image/webp",
    characterFileUrl: "",
    characterFileHash: "",
    tags: ["AI Agent"],
    additionalMetadata: {},
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/register-ai-agent", formData);
      setResult(response.data);
      setStatus("success");
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err: any) {
      setStatus("error");
      setError(err.response?.data?.error || "Failed to register AI agent");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h2 className="register-title">Register AI Agent as IP</h2>
        <p className="register-subtitle">
          Register your AI agent as an Intellectual Property asset on Story Protocol. 
          This will create a unique digital identity for your AI agent on the blockchain.
        </p>
      </div>

      <div className="register-card">
        <div className="register-card-header">
          <h3>AI Agent Details</h3>
          <p>Fill in the details below to register your AI agent</p>
        </div>

        {status === "success" && result && (
          <div className="success-box">
            <div className="success-icon">
              <svg viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4>Registration Successful!</h4>
              <p>IP ID: {result.ipId}</p>
              <a href={result.explorerUrl} target="_blank" rel="noopener noreferrer">
                View on Explorer
                <svg viewBox="0 0 24 24">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="error-box">
            <div className="error-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4>Registration Failed</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="section">
            <h4>Required Information</h4>

            <div className="input-group">
              <label>AI Agent Name <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter a unique name" />
            </div>

            <div className="input-group">
              <label>Description <span style={{ color: "red" }}>*</span></label>
              <textarea name="description" required value={formData.description} onChange={handleChange} placeholder="Describe capabilities" />
            </div>

            <div className="input-group">
              <label>Owner Address <span style={{color:"red"}}>*</span></label>
              <input type="text" name="ownerAddress" required value={formData.ownerAddress} onChange={handleChange} placeholder="0x..." />
            </div>
          </div>

          <div className="section">
            <h4>Additional Information</h4>

            <div className="input-grid">
              <div className="input-group">
                <label>Owner Name</label>
                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Enter owner's name" />
              </div>

              <div className="input-group">
                <label>Tags</label>
                <input type="text" name="tags" value={formData.tags.join(", ")} onChange={handleTagsChange} placeholder="AI Agent, Bot" />
                <p className="help-text">Comma-separated tags</p>
              </div>

              <div className="input-group">
                <label>Image URL</label>
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
              </div>

              <div className="input-group">
                <label>Image Hash</label>
                <input type="text" name="imageHash" value={formData.imageHash} onChange={handleChange} placeholder="0x..." />
              </div>

              <div className="input-group">
                <label>Character File URL</label>
                <input type="url" name="characterFileUrl" value={formData.characterFileUrl} onChange={handleChange} placeholder="https://..." />
              </div>

              <div className="input-group">
                <label>Character File Hash</label>
                <input type="text" name="characterFileHash" value={formData.characterFileHash} onChange={handleChange} placeholder="0x..." />
              </div>
            </div>
          </div>

          <div className="submit-wrapper">
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <div className="loading">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M4 12a8 8 0 018-8V0" />
                  </svg>
                  Registering AI Agent...
                </div>
              ) : (
                "Register AI Agent"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAIAgent;
