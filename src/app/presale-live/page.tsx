"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Wallet, ChevronRight, CheckCircle2, Coins, Activity, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { connectWallet, getContract } from '@/lib/web3';
import { CONTRACT_ADDRESSES, PRESALE_ABI } from '@/lib/abis';
import { ethers } from 'ethers';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PresaleLive() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Presale Stats
  const [stats, setStats] = useState({
    active: false,
    raisedBNB: '0',
    tokensSold: '0',
    totalSupply: '840000',
    progress: 0
  });

  // Buy State
  const [bnbInput, setBnbInput] = useState('');
  const [expectedTokens, setExpectedTokens] = useState('0');
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPresaleStats();
    // Auto-refresh stats every 10 seconds
    const interval = setInterval(fetchPresaleStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchPresaleStats = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.ankr.com/bsc');
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.PRESALE, PRESALE_ABI, provider);
      
      const isActive = await contract.presaleActive();
      const raised = await contract.totalBNBRaised();
      const sold = await contract.totalTokensCommitted();
      
      const soldFormatted = ethers.formatEther(sold);
      const prog = (parseFloat(soldFormatted) / 840000) * 100;

      setStats({
        active: isActive,
        raisedBNB: ethers.formatEther(raised),
        tokensSold: soldFormatted,
        totalSupply: '840000',
        progress: prog > 100 ? 100 : prog
      });
    } catch (err) {
      console.error("Failed to fetch presale stats", err);
    }
  };

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) setWallet(address);
  };

  const handleBnbInputChange = async (val: string) => {
    setBnbInput(val);
    if (!val || isNaN(parseFloat(val)) || parseFloat(val) <= 0) {
      setExpectedTokens('0');
      return;
    }

    try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.ankr.com/bsc');
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.PRESALE, PRESALE_ABI, provider);
      const weiAmount = ethers.parseEther(val);
      
      const [tokensOut] = await contract.calculateTokensForBNB(weiAmount);
      setExpectedTokens(ethers.formatEther(tokensOut));
    } catch (err) {
      console.error(err);
      setExpectedTokens('Error calculating');
    }
  };

  const executeBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !bnbInput) return;
    
    setIsBuying(true);
    setErrorMsg('');
    
    try {
      const contract = await getContract(CONTRACT_ADDRESSES.PRESALE, PRESALE_ABI, true);
      if (!contract) throw new Error("Please connect MetaMask");
      
      const weiAmount = ethers.parseEther(bnbInput);
      const tx = await contract.buy({ value: weiAmount });
      
      setMessage("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      
      setIsSuccess(true);
      fetchPresaleStats(); // Refresh stats immediately
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.reason || err.message || 'Transaction failed. Minimum is $10.');
    } finally {
      setIsBuying(false);
    }
  };

  const setMessage = (msg: string) => {
    setErrorMsg(msg);
  }

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 lg:px-8 flex flex-col items-center justify-center font-[var(--font-inter)]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff88]/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <Link href="/portal" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft size={18} />
          Back to Portal
        </Link>

        {/* Top Banner (Status) */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full mb-10 p-1 rounded-2xl bg-gradient-to-r from-[#00ff88]/20 via-[#00E5FF]/20 to-transparent">
          <div className="bg-[#070A11] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-white/5">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="relative flex h-4 w-4">
                {stats.active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-4 w-4 ${stats.active ? 'bg-[#00ff88]' : 'bg-red-500'}`}></span>
              </div>
              <h2 className="text-xl font-bold text-white font-[var(--font-space)] tracking-wide">
                {stats.active ? 'PRESALE IS LIVE' : 'PRESALE IS PAUSED'}
              </h2>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-xs text-[#8A93A6] uppercase tracking-wider mb-1">Total Raised</p>
                <p className="text-xl font-bold text-white">{parseFloat(stats.raisedBNB).toFixed(2)} <span className="text-[#00E5FF] text-sm">BNB</span></p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#8A93A6] uppercase tracking-wider mb-1">Tokens Sold</p>
                <p className="text-xl font-bold text-white">{parseInt(stats.tokensSold).toLocaleString()} <span className="text-[#00ff88] text-sm">BTCBLUE</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Info & Progress */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white font-[var(--font-space)] leading-tight">
              Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00E5FF]">Allocation</span>
            </h1>
            <p className="text-[#8A93A6] text-lg leading-relaxed max-w-2xl">
              Connect your wallet to purchase BTCBLUE tokens directly from the smart contract. Funds are securely locked in the contract to ensure 100% transparency.
            </p>
            
            {/* Progress Bar */}
            <div className="mt-6 p-8 rounded-3xl bg-[#0F1423]/80 border border-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">Presale Progress</h3>
                  <p className="text-[#8A93A6] text-sm">Hardcap: 840,000 BTCBLUE</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#00ff88]">{stats.progress.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="w-full h-4 bg-[#070A11] rounded-full overflow-hidden border border-white/5 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0066FF] via-[#00E5FF] to-[#00ff88] rounded-full relative"
                >
                  <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]"></div>
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                <div>
                  <div className="text-xs text-[#8A93A6] uppercase">Tier 1 Price</div>
                  <div className="text-lg font-bold text-white">$0.10</div>
                </div>
                <div>
                  <div className="text-xs text-[#8A93A6] uppercase">Tier 2 Price</div>
                  <div className="text-lg font-bold text-white">$0.15</div>
                </div>
                <div>
                  <div className="text-xs text-[#8A93A6] uppercase">Tier 3 Price</div>
                  <div className="text-lg font-bold text-white">$0.20</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Web3 Terminal */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-5 w-full">
            <div className="glass-panel bg-[#070A11]/90 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-[#00ff88]/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/10 blur-[60px] rounded-full pointer-events-none"></div>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-6 relative z-10">
                  <div className="w-24 h-24 rounded-full bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
                    <CheckCircle2 size={48} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-[var(--font-space)] mb-2">Purchase Successful!</h3>
                    <p className="text-[#8A93A6] text-sm leading-relaxed">
                      Tokens are allocated to your wallet. You can claim them once the presale concludes.
                    </p>
                  </div>
                  <button onClick={() => setIsSuccess(false)} className="mt-4 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors border border-white/10">
                    Buy More
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-white font-[var(--font-space)] flex items-center gap-2">
                      <Wallet size={20} className="text-[#00ff88]" />
                      Buy BTCBLUE
                    </h3>
                  </div>

                  {!wallet ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center border-2 border-dashed border-[#00ff88]/20 rounded-2xl bg-[#0F1423]/50">
                      <Wallet size={40} className="text-[#00ff88]/50 mb-2" />
                      <p className="text-[#8A93A6] text-sm">Connect your Web3 wallet to participate in the live presale.</p>
                      <button 
                        onClick={handleConnect}
                        className="px-8 py-4 mt-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00E5FF] text-[#070A11] font-bold tracking-wide hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={executeBuy} className="flex flex-col gap-6">
                      
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                        <span className="text-xs text-[#8A93A6] uppercase tracking-wider">Connected</span>
                        <span className="font-mono text-sm text-[#00ff88]">{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider flex justify-between">
                          <span>Pay with BNB</span>
                          <span className="text-white">Min: $10</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="number" 
                            required
                            step="any"
                            placeholder="0.0" 
                            value={bnbInput} 
                            onChange={(e) => handleBnbInputChange(e.target.value)} 
                            className="w-full bg-[#0F1423] border border-[#00ff88]/20 rounded-xl p-5 text-white font-mono text-2xl focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] outline-none transition-all pl-16" 
                          />
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg" alt="BNB" className="w-6 h-6" />
                          </div>
                          <button type="button" onClick={() => handleBnbInputChange('0.1')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors">
                            MIN
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">You Receive (Estimate)</label>
                        <div className="w-full bg-[#0F1423]/50 border border-white/5 rounded-xl p-5 text-[#00E5FF] font-mono text-2xl flex justify-between items-center">
                          <span>{parseFloat(expectedTokens).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                          <span className="text-sm font-bold tracking-wider">BTCBLUE</span>
                        </div>
                      </div>

                      {errorMsg && (
                        <div className={`p-4 rounded-xl border text-sm text-center ${errorMsg.includes('Waiting') || errorMsg.includes('submitted') ? 'bg-[#00ff88]/10 border-[#00ff88]/20 text-[#00ff88]' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                          {errorMsg}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isBuying || !stats.active} 
                        className="w-full py-5 mt-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00E5FF] text-[#070A11] font-bold text-lg uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isBuying ? (
                          <span className="flex items-center gap-2"><Activity className="animate-spin" size={20} /> Processing...</span>
                        ) : !stats.active ? (
                          "Presale Paused"
                        ) : (
                          "Buy BTCBLUE Now"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
