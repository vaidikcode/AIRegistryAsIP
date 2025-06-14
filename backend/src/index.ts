import express, { Request, Response } from 'express';
import cors from 'cors';
import { StoryClient, StoryConfig } from '@story-protocol/core-sdk';
import { http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Initialize Story Protocol Client
if (!process.env.STORY_PROTOCOL_PRIVATE_KEY) {
  throw new Error('STORY_PROTOCOL_PRIVATE_KEY is required in .env file');
}

// Ensure private key is properly formatted (remove 0x if present and ensure it's a valid hex string)
const rawPrivateKey = process.env.STORY_PROTOCOL_PRIVATE_KEY.replace(/^0x/, '');
if (!/^[0-9a-fA-F]{64}$/.test(rawPrivateKey)) {
  throw new Error('STORY_PROTOCOL_PRIVATE_KEY must be a 64-character hex string');
}

const privateKey = `0x${rawPrivateKey}` as `0x${string}`;
const account = privateKeyToAccount(privateKey);

// Using type assertion to bypass transport type checking
const config = {
  account: account.address,
  transport: http(process.env.STORY_PROTOCOL_RPC_URL || 'https://aeneid.storyrpc.io'),
  chainId: 'aeneid',
} as StoryConfig;

const client = StoryClient.newClient(config);

// Register AI Agent as IP
app.post('/api/register-ai-agent', async (req: Request, res: Response) => {
  try {
    const { 
      name,
      description,
      ownerAddress,
      ownerName = "AI Agent Creator",
      imageUrl,
      imageHash,
      mediaUrl,
      mediaHash,
      mediaType = "image/webp",
      characterFileUrl,
      characterFileHash,
      tags = ["AI Agent"],
      additionalMetadata = {}
    } = req.body;

    if (!name || !description || !ownerAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create IP metadata for AI Agent following Story Protocol documentation
    const ipMetadata = {
      title: name,
      description: description,
      createdAt: Math.floor(Date.now() / 1000).toString(),
      creators: [{
        name: ownerName,
        address: ownerAddress,
        contributionPercent: 100
      }],
      // Optional media fields
      ...(imageUrl && { image: imageUrl }),
      ...(imageHash && { imageHash }),
      ...(mediaUrl && { mediaUrl }),
      ...(mediaHash && { mediaHash }),
      ...(mediaType && { mediaType }),
      // AI Agent specific metadata
      aiMetadata: {
        ...(characterFileUrl && { characterFileUrl }),
        ...(characterFileHash && { characterFileHash }),
        ...additionalMetadata
      },
      ipType: "AI Agent",
      tags: Array.isArray(tags) ? tags : ["AI Agent"]
    };

    // Register AI Agent as IP
    const response = await client.ipAsset.mintAndRegisterIp({
      spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc", // Public collection on Aeneid
      ipMetadata: {
        ipMetadataURI: `data:application/json;base64,${Buffer.from(JSON.stringify(ipMetadata)).toString('base64')}`,
        ipMetadataHash: `0x${Buffer.from(JSON.stringify(ipMetadata)).toString('hex')}`,
        nftMetadataURI: `data:application/json;base64,${Buffer.from(JSON.stringify({ name, description })).toString('base64')}`,
        nftMetadataHash: `0x${Buffer.from(JSON.stringify({ name, description })).toString('hex')}`
      }
    });

    return res.json({
      success: true,
      ipId: response.ipId,
      transactionHash: response.txHash,
      explorerUrl: `https://aeneid.explorer.story.foundation/ipa/${response.ipId}`
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
app.get('/api/ip-asset/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore - The method exists at runtime but TypeScript doesn't know about it
    const ipAsset = await client.ipAsset.getIpAsset(id);
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