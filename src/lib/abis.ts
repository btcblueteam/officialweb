export const PRESALE_ABI = [
  "function buy() external payable",
  "function claimTokens() external",
  "function calculateTokensForBNB(uint256 bnbWei) view returns (uint256 tokensOut, uint256[3] memory tiersFilled)",
  "function allocation(address) view returns (uint256)",
  "function contributed(address) view returns (uint256)",
  "function presaleActive() view returns (bool)",
  "function claimEnabled() view returns (bool)",
  "function totalBNBRaised() view returns (uint256)",
  "function totalTokensCommitted() view returns (uint256)",
  "function startPresale() external",
  "function endPresale() external",
  "function enableClaim() external",
  "function withdrawBNB(address to) external",
  "function setBNBPrice(uint256 _priceUSD) external"
];

export const BITCOIN_BLUE_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export const AIRDROP_ABI = [
  "function claimAirdrop(uint256 amount, bytes calldata signature) external",
  "function hasClaimed(address) view returns (bool)",
  "function airdropActive() view returns (bool)"
];

// Fallback to local hardhat addresses if env vars are missing
export const CONTRACT_ADDRESSES = {
  TOKEN: process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "0x4b36be83351a9f05b13764d9e58bc21863999aa4",
  PRESALE: process.env.NEXT_PUBLIC_PRESALE_ADDRESS || "0xaacd81c14cc094b007bed59fe999158b46d6c57a",
  AIRDROP: process.env.NEXT_PUBLIC_AIRDROP_ADDRESS || "0x9882a63545864167c4d83dab266d6f1e1075fc55"
};
