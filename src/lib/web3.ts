import { ethers } from 'ethers';
import { PRESALE_ABI, AIRDROP_ABI, CONTRACT_ADDRESSES } from './abis';

export const BSC_TESTNET_PARAMS = {
  chainId: '0x61', // 97
  chainName: 'Binance Smart Chain Testnet',
  nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
};

export const HARDHAT_PARAMS = {
  chainId: '0x7a69', // 31337
  chainName: 'Hardhat Local',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['http://127.0.0.1:8545/'],
};

// Use Hardhat by default for local development
const TARGET_NETWORK = process.env.NODE_ENV === 'production' ? BSC_TESTNET_PARAMS : HARDHAT_PARAMS;

export async function connectWallet(): Promise<string | null> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    alert("Please install MetaMask to connect your wallet.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    
    // Switch to target network
    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(TARGET_NETWORK.chainId)) {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: TARGET_NETWORK.chainId }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [TARGET_NETWORK],
          });
        }
      }
    }

    const signer = await provider.getSigner();
    return await signer.getAddress();
  } catch (error) {
    console.error("Wallet connection failed:", error);
    return null;
  }
}

export async function getPresaleContract(withSigner = false) {
  if (typeof window === 'undefined' || !(window as any).ethereum) return null;
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const target = withSigner ? await provider.getSigner() : provider;
  return new ethers.Contract(CONTRACT_ADDRESSES.PRESALE, PRESALE_ABI, target);
}

export async function getAirdropContract(withSigner = false) {
  if (typeof window === 'undefined' || !(window as any).ethereum) return null;
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const target = withSigner ? await provider.getSigner() : provider;
  return new ethers.Contract(CONTRACT_ADDRESSES.AIRDROP, AIRDROP_ABI, target);
}

export async function getContract(address: string, abi: any, withSigner = false) {
  if (typeof window === 'undefined' || !(window as any).ethereum) return null;
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const target = withSigner ? await provider.getSigner() : provider;
  return new ethers.Contract(address, abi, target);
}

