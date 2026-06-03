"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Wallet, ChevronRight, CheckCircle2, Mail, Coins } from 'lucide-react';
import Link from 'next/link';
import { connectWallet, getContract } from '@/lib/web3';
import { CONTRACT_ADDRESSES, PRESALE_ABI } from '@/lib/abis';
import { ethers } from 'ethers';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PresaleRegistration() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', allocation: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [mode, setMode] = useState<'whitelist' | 'active' | 'loading'>('loading');
  const [presaleStats, setPresaleStats] = useState({ active: false, raised: '0', tokens: '0' });

  // Active Mode State
  const [bnbInput, setBnbInput] = useState('');
  const [expectedTokens, setExpectedTokens] = useState('0');
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMode();
  }, []);

  const fetchMode = async () => {
    try {
      const res = await fetch('/api/settings?key=presale_mode');
      const data = await res.json();
      setMode(data.value?.mode || 'whitelist');
      
      if (data.value?.mode === 'active') {
        fetchPresaleStats();
      }
    } catch (err) {
      setMode('whitelist');
    }
  };

  const fetchPresaleStats = async () => {
    try {
      // Connect read-only
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://bsc-dataseed.binance.org/');
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.PRESALE, PRESALE_ABI, provider);
      
      const isActive = await contract.presaleActive();
      setPresaleStats(prev => ({ ...prev, active: isActive }));
    } catch (err) {
      console.error("Failed to fetch presale stats", err);
    }
  };

  const handleBnbInputChange = async (val: string) => {
    setBnbInput(val);
    if (!val || isNaN(parseFloat(val)) || parseFloat(val) <= 0) {
      setExpectedTokens('0');
      return;
    }

    try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://bsc-dataseed.binance.org/');
      const contract = new ethers.Contract(CONTRACT_ADDRESSES.PRESALE, PRESALE_ABI, provider);
      const weiAmount = ethers.parseEther(val);
      
      // Calculate tokens
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
      if (!contract) throw new Error("Web3 provider not found");
      const weiAmount = ethers.parseEther(bnbInput);
      
      const tx = await contract.buy({ value: weiAmount });
      await tx.wait();
      
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.reason || err.message || 'Transaction failed. Minimum is $10.');
    } finally {
      setIsBuying(false);
    }
  };

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWallet(address);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) return;

    // Basic validation
    const bnbAmount = parseFloat(form.allocation);
    if (isNaN(bnbAmount) || bnbAmount < 0.1 || bnbAmount > 10) {
      setErrorMsg('Allocation must be between 0.1 and 10 BNB.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      const response = await fetch('/api/presale/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: wallet,
          email: form.email,
          allocation: form.allocation
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        if (data.error && data.error.includes('duplicate key value')) {
          setErrorMsg('This wallet is already registered for the presale.');
        } else {
          setErrorMsg(data.error || 'Registration failed');
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 lg:px-8 flex flex-col items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0066FF]/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {mode === 'loading' ? (
        <div className="flex items-center justify-center min-h-[50vh]">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00E5FF]"></div>
        </div>
      ) : mode === 'whitelist' ? (
        <div className="w-full max-w-5xl mx-auto relative z-10">
        <Link href="/portal" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft size={18} />
          Back to Portal
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00E5FF] text-xs font-semibold tracking-widest uppercase w-max">
              <Shield size={14} />
              Institutional Grade
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-space)] leading-tight">
              Presale <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00E5FF]">Whitelist</span>
            </h1>
            <p className="text-[#8A93A6] text-lg leading-relaxed">
              Register for exclusive early access to the Bitcoin Blue presale. Allocations are strictly limited to ensure a fair distribution model protecting against massive whale dominance.
            </p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#00ff88]" />
                <span className="text-sm text-white">Minimum Allocation: <strong className="text-[#00E5FF]">0.1 BNB</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#00ff88]" />
                <span className="text-sm text-white">Maximum Allocation: <strong className="text-[#00E5FF]">10 BNB</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#00ff88]" />
                <span className="text-sm text-white">Guaranteed Allocation for Whitelisted Wallets</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Web3 Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full">
            <div className="glass-panel bg-[#070A11]/90 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-[#00E5FF]/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 blur-[60px] rounded-full pointer-events-none"></div>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-6 relative z-10">
                  <div className="w-24 h-24 rounded-full bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
                    <CheckCircle2 size={48} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white font-[var(--font-space)] mb-3">Whitelist Secured!</h3>
                    <p className="text-[#8A93A6] leading-relaxed">
                      Your wallet has been successfully registered for the presale. You will receive an email shortly with the official launch date and instructions.
                    </p>
                  </div>
                  <Link href="/portal" className="mt-4 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors flex items-center gap-2">
                    Return to Portal
                  </Link>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-white font-[var(--font-space)] flex items-center gap-2">
                      <Wallet size={20} className="text-[#00E5FF]" />
                      Registration
                    </h3>
                  </div>

                  {!wallet ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center border-2 border-dashed border-white/10 rounded-2xl bg-[#0F1423]/50">
                      <Wallet size={40} className="text-[#8A93A6] mb-2" />
                      <p className="text-[#8A93A6] text-sm max-w-xs">You must connect your Web3 wallet to verify ownership before registering.</p>
                      <button 
                        onClick={handleConnect}
                        className="px-6 py-3 mt-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white font-bold hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider flex items-center gap-2">
                          <Wallet size={14} /> Connected Wallet
                        </label>
                        <input 
                          type="text" 
                          readOnly 
                          value={wallet} 
                          className="bg-[#0F1423] border border-[#00ff88]/30 rounded-xl p-4 text-[#00ff88] font-mono text-sm outline-none opacity-80 cursor-not-allowed" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider flex items-center gap-2">
                          <Mail size={14} /> Email Address *
                        </label>
                        <input 
                          type="email" 
                          required 
                          placeholder="investor@example.com" 
                          value={form.email} 
                          onChange={(e) => setForm({...form, email: e.target.value})} 
                          className="bg-[#0F1423] border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider flex justify-between">
                          <span className="flex items-center gap-2"><Coins size={14} /> Expected Allocation (BNB) *</span>
                          <span className="text-[#00E5FF]">Min: 0.1 | Max: 10</span>
                        </label>
                        <input 
                          type="number" 
                          required
                          min="0.1" 
                          max="10"
                          step="0.1" 
                          placeholder="e.g. 5.5" 
                          value={form.allocation} 
                          onChange={(e) => setForm({...form, allocation: e.target.value})} 
                          className="bg-[#0F1423] border border-white/10 rounded-xl p-4 text-white font-mono text-lg focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all" 
                        />
                      </div>

                      {errorMsg && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                          {errorMsg}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white font-bold text-lg hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 group"
                      >
                        {isSubmitting ? "Registering..." : "Submit Whitelist"}
                        {!isSubmitting && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      ) : (
        /* ACTIVE PRESALE UI */
        <div className="w-full max-w-5xl mx-auto relative z-10">
          <Link href="/portal" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium">
            <ArrowLeft size={18} />
            Back to Portal
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-xs font-semibold tracking-widest uppercase w-max">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
                Live Now
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-space)] leading-tight">
                Public <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00E5FF]">Presale</span>
              </h1>
              <p className="text-[#8A93A6] text-lg leading-relaxed">
                The Bitcoin Blue token presale is officially live. Connect your wallet to purchase tokens securely via the smart contract. Minimum contribution is $10.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00ff88]" />
                  <span className="text-sm text-white">Minimum Purchase: <strong className="text-[#00E5FF]">$10 USD</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#00ff88]" />
                  <span className="text-sm text-white">Instant Allocation into Smart Contract</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full">
              <div className="glass-panel bg-[#070A11]/90 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-[#00E5FF]/20">
                
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 gap-6 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
                      <CheckCircle2 size={48} className="text-[#00ff88]" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white font-[var(--font-space)] mb-3">Purchase Successful!</h3>
                      <p className="text-[#8A93A6] leading-relaxed">
                        Your tokens have been successfully allocated to your wallet address. You will be able to claim them when the presale ends.
                      </p>
                    </div>
                    <button onClick={() => setIsSuccess(false)} className="mt-4 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors">
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
                      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center border-2 border-dashed border-white/10 rounded-2xl bg-[#0F1423]/50">
                        <button 
                          onClick={handleConnect}
                          className="px-6 py-3 mt-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00E5FF] text-[#0F1423] font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
                        >
                          Connect Wallet
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={executeBuy} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">Pay with BNB</label>
                          <div className="relative">
                            <input 
                              type="number" 
                              required
                              step="any"
                              placeholder="0.0" 
                              value={bnbInput} 
                              onChange={(e) => handleBnbInputChange(e.target.value)} 
                              className="w-full bg-[#0F1423] border border-white/10 rounded-xl p-4 text-white font-mono text-xl focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all" 
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[#8A93A6] font-bold">
                              BNB
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">You Receive (Estimate)</label>
                          <div className="w-full bg-[#0F1423]/50 border border-white/5 rounded-xl p-4 text-[#00ff88] font-mono text-xl opacity-80 flex justify-between">
                            <span>{expectedTokens}</span>
                            <span>BTCBLUE</span>
                          </div>
                        </div>

                        {errorMsg && (
                          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {errorMsg}
                          </div>
                        )}

                        <button 
                          type="submit" 
                          disabled={isBuying || !presaleStats.active} 
                          className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00E5FF] text-[#0F1423] font-bold text-lg hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isBuying ? "Processing..." : !presaleStats.active ? "Presale Paused" : "Buy Now"}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
}
