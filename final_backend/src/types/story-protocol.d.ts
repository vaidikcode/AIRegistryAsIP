declare module '@storyprotocol/sdk' {
  import { Wallet } from 'ethers';

  export class StoryProtocol {
    constructor(wallet: Wallet);
    ipAsset: {
      create(params: {
        name: string;
        description: string;
        metadata: Record<string, any>;
        owner: string;
      }): Promise<{
        id: string;
        txHash: string;
      }>;
      get(id: string): Promise<any>;
    };
  }
} 
