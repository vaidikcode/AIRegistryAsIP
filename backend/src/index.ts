import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import { StoryProtocol } from '@story-protocol/core-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Initialize Story Protocol SDK
const provider = new ethers.JsonRpcProvider(process.env.STORY_PROTOCOL_RPC_URL);
const wallet = new ethers.Wallet(process.env.STORY_PROTOCOL_PRIVATE_KEY || '', provider);
const storyProtocol = new StoryProtocol(wallet);

// Register AI Agent as IP
app.post('/api/register-ai-agent', async (req, res) => {
  try {
    const { 
      name, 
      description, 
      metadata, 
      ownerAddress 
    } = req.body;

    if (!name || !description || !ownerAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create IP Asset using Story Protocol
    const ipAsset = await storyProtocol.ipAsset.create({
      name,
      description,
      metadata: {
        ...metadata,
        type: 'AI_AGENT',
        version: '1.0.0'
      },
      owner: ownerAddress
    });

    return res.json({
      success: true,
      ipAssetId: ipAsset.id,
      transactionHash: ipAsset.txHash
    });
  } catch (error) {
    console.error('Error registering AI agent:', error);
    return res.status(500).json({ 
      error: 'Failed to register AI agent',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get IP Asset details
app.get('/api/ip-asset/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ipAsset = await storyProtocol.ipAsset.get(id);
    return res.json(ipAsset);
  } catch (error) {
    console.error('Error fetching IP asset:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch IP asset',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 