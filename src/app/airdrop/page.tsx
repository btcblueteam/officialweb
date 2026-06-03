"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Mail, CheckCircle2, ChevronRight, Trophy, AlertCircle, Copy, Check, Share2, Lock } from 'lucide-react';
import Link from 'next/link';
import { connectWallet, getAirdropContract } from '@/lib/web3';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const getRank = (amount: number) => {
  if (amount >= 10) return { name: 'Whale 🐳', color: 'text-[#00d2ff]', bg: 'bg-[#00d2ff]/20 border-[#00d2ff]/30' };
  if (amount >= 3) return { name: 'Shark 🦈', color: 'text-[#00ff88]', bg: 'bg-[#00ff88]/20 border-[#00ff88]/30' };
  if (amount >= 1) return { name: 'Dolphin 🐬', color: 'text-[#9d4edd]', bg: 'bg-[#9d4edd]/20 border-[#9d4edd]/30' };
  return { name: 'Shrimp 🦐', color: 'text-gray-400', bg: 'bg-gray-400/20 border-gray-400/30' };
};

interface LeaderboardUser {
  wallet_address: string;
  total_reward: number;
}

interface UserData {
  email: string;
  tweet_url: string;
  tier1_referrals_count: number;
  tier2_referrals_count: number;
  total_reward: number;
  is_claimed: boolean;
  created_at: string;
}

export default function AirdropDashboard() {
  // Global State
  const [wallet, setWallet] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [tweetUrl, setTweetUrl] = useState('');
  const [taskUrl, setTaskUrl] = useState('');
  const [signatureData, setSignatureData] = useState<{ amount: string, signature: string } | null>(null);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (wallet) {
      setReferralLink(`${window.location.origin}/?ref=${wallet}`);
      checkUserRegistration(wallet);
    }
  }, [wallet]);

  const checkUserRegistration = async (address: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/airdrop/user?wallet=${address}`);
      const json = await res.json();
      if (json.registered) {
        setUserData(json.userData);
      } else {
        if (step === 1) setStep(2);
      }
    } catch (e) {
      console.error('Check registration failed:', e);
      if (step === 1) setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const json = await res.json();
      if (json.success) setLeaderboard(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleConnectWallet = async () => {
    setErrorMsg('');
    const address = await connectWallet();
    if (address) setWallet(address);
  };

  const handleSendOTP = async () => {
    if (!email || !email.includes('@')) return setErrorMsg('Invalid email address.');
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/airdrop/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
        setSuccessMsg('OTP Sent! Check your Inbox and Spam/Junk folder.');
      } else {
        setErrorMsg(data.error);
      }
    } catch (e) {
      setErrorMsg('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareX = () => {
    const templates = [
      `Just claimed my $BTCBLUE tokens! 🚀\n\nAirdrop is live. Join the revolution using my referral link and earn bonuses:\n\n${referralLink}\n\n#BitcoinBlue #CryptoAirdrop`,
      `Don't miss the $BTCBLUE Genesis Airdrop! Only 2.1M supply.\n\nSecure your allocation here:\n${referralLink}\n\n#Airdrop #BSC`,
      `I'm early to $BTCBLUE! 💎\n\nGet your free tokens before the next halving epoch cuts rewards.\nJoin my squad:\n${referralLink}\n\n#BitcoinBlue`
    ];
    const text = templates[Math.floor(Math.random() * templates.length)];
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    setStep(5);
    setSuccessMsg('');
  };

  const handleVerifyAndClaim = async () => {
    if (!tweetUrl) return setErrorMsg('Please provide your Tweet URL.');
    setErrorMsg('');
    setIsLoading(true);
    
    try {
      // 1. Verify Everything
      const referrer = localStorage.getItem('btcblue_referrer');
      const verifyRes = await fetch('/api/airdrop/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: otp, tweetUrl, walletAddress: wallet, referredBy: referrer })
      });
      
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error);

      // 2. Fetch Signature
      const sigRes = await fetch('/api/airdrop/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: wallet })
      });
      const sigData = await sigRes.json();
      if (!sigRes.ok) throw new Error(sigData.error);
      
      setSignatureData(sigData);
      setSuccessMsg('Verification successful! Ready to claim on-chain.');
      setStep(6);
      fetchLeaderboard();
      
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSmartContractClaim = async () => {
    if (!signatureData) return;
    setErrorMsg('');
    setIsLoading(true);
    try {
      const contract = await getAirdropContract(true);
      if (!contract) throw new Error("Wallet connection lost.");
      
      const tx = await contract.claimAirdrop(signatureData.amount, signatureData.signature);
      await tx.wait();
      
      setSuccessMsg('Airdrop Claimed Successfully! 🚀 Tokens are in your wallet.');
      setStep(7);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.reason || err.message || 'Transaction failed or rejected.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070a13] pt-24 pb-12 font-sans overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00d2ff]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Genesis Airdrop</h1>
          <p className="text-[#9ca3af] text-lg max-w-2xl">
            Complete the steps below to secure your $BTCBLUE fraction. The reward halves as more users join!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTION A: Claim Interface */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-2 space-y-6">
            
            {/* Scarcity Banner */}
            <div className="bg-[#111625] backdrop-blur-md border border-[#00d2ff]/20 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_20px_rgba(0,210,255,0.1)]">
              <div className="w-10 h-10 rounded-full bg-[#00d2ff]/20 flex items-center justify-center shrink-0">
                <Rocket className="text-[#00d2ff]" size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold">Only 2.1M Total Supply</h3>
                <p className="text-[#9ca3af] text-sm">Earn your fraction before the next Halving Epoch!</p>
              </div>
            </div>

            <div className="bg-[#111625] backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8">
              
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm">{errorMsg}</p>
                </div>
              )}
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 text-[#00d2ff] flex items-start gap-3">
                  <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm">{successMsg}</p>
                </div>
              )}

              {userData ? (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/50 flex items-center justify-center mx-auto mb-4 text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Registration Confirmed</h2>
                    <p className="text-[#9ca3af] text-sm">Your wallet is successfully registered for the Airdrop.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#070a13] border border-white/10 rounded-2xl p-5 text-center">
                      <p className="text-[#8A93A6] text-xs font-bold uppercase tracking-widest mb-2">Total Reward</p>
                      <p className="text-3xl font-bold text-[#00d2ff]">{Number(userData.total_reward).toFixed(4)}</p>
                      <p className="text-[#8A93A6] text-[10px] uppercase">BTCBLUE</p>
                    </div>
                    <div className="bg-[#070a13] border border-white/10 rounded-2xl p-5 text-center flex flex-col justify-center items-center">
                      <p className="text-[#8A93A6] text-xs font-bold uppercase tracking-widest mb-2">Rank Status</p>
                      <span className={`inline-block px-3 py-1 ${getRank(Number(userData.total_reward)).bg} ${getRank(Number(userData.total_reward)).color} rounded border font-bold text-sm mb-1`}>
                        {getRank(Number(userData.total_reward)).name}
                      </span>
                      {!userData.is_claimed && (
                        <p className="text-[9px] text-[#9ca3af] flex items-center gap-1 mt-1 font-medium">
                          <Lock size={10} /> Locked until Presale
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#070a13] border border-white/10 rounded-2xl p-5">
                    <p className="text-[#8A93A6] text-xs font-bold uppercase tracking-widest mb-4">Referral Analytics</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-white">Tier 1 Referrals (Direct)</span>
                      <span className="font-mono text-[#00d2ff] font-bold">{userData.tier1_referrals_count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Tier 2 Referrals (Indirect)</span>
                      <span className="font-mono text-[#00d2ff] font-bold">{userData.tier2_referrals_count}</span>
                    </div>
                  </div>

                  <div className="bg-[#070a13] border border-[#00d2ff]/30 shadow-[0_0_15px_rgba(0,210,255,0.05)] rounded-2xl p-5">
                    <p className="text-[#00d2ff] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><Rocket size={14} /> Bounty Tasks</p>
                    <p className="text-[#9ca3af] text-sm mb-4">Post a promotional tweet about $BTCBLUE and submit the link below to earn <strong className="text-white">+0.5 BTCBLUE</strong> per valid tweet!</p>
                    <div className="flex flex-col gap-3">
                      <input type="text" placeholder="https://x.com/..." value={taskUrl} onChange={e => setTaskUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00d2ff] text-sm" />
                      <button onClick={async () => {
                        if (!taskUrl) return setErrorMsg('Please enter a Tweet URL.');
                        setIsLoading(true);
                        try {
                          const res = await fetch('/api/airdrop/tasks', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ walletAddress: wallet, tweetUrl: taskUrl })
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.error);
                          setSuccessMsg(data.message);
                          setUserData({ ...userData, total_reward: data.newTotal });
                          setTaskUrl('');
                        } catch (err: any) {
                          setErrorMsg(err.message || 'Task submission failed.');
                        } finally {
                          setIsLoading(false);
                        }
                      }} disabled={isLoading} className="px-4 py-2 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 border border-[#00d2ff]/30 rounded-lg text-sm font-bold text-[#00d2ff] transition-colors w-full">
                        {isLoading ? "Submitting..." : "Submit Tweet for 0.5 BTCBLUE"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <label className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider mb-2 block">Your Viral Referral Link</label>
                    <div className="flex gap-2">
                      <input type="text" readOnly value={referralLink} className="flex-1 bg-[#070a13] border border-white/10 rounded-lg p-3 text-[#00d2ff] font-mono text-sm outline-none" />
                      <button onClick={copyReferral} className="px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center gap-2">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  {!userData.is_claimed && (
                    <button disabled className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-[#8A93A6] font-bold uppercase tracking-widest cursor-not-allowed transition-all flex items-center justify-center gap-2 opacity-70">
                      Activates Post-Presale
                    </button>
                  )}
                </div>
              ) : (
                <>
              <div className="space-y-4">
                {/* Step 1: Wallet */}
                <div className={`p-5 rounded-xl border transition-all ${wallet ? 'bg-[#00d2ff]/10 border-[#00d2ff]/30' : 'bg-[#070a13] border-white/10'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${wallet ? 'bg-[#00d2ff] text-[#070a13]' : 'bg-white/10 text-white'}`}>
                        {wallet ? <Check size={16} /> : "1"}
                      </div>
                      <span className={`font-bold ${wallet ? 'text-[#00d2ff]' : 'text-white'}`}>Connect Wallet</span>
                    </div>
                    {!wallet ? (
                      <button onClick={handleConnectWallet} className="px-4 py-2 bg-[#00d2ff] hover:bg-[#00b8e6] rounded-lg text-sm font-bold text-[#070a13] transition-colors">Connect</button>
                    ) : (
                      <span className="text-sm font-mono text-[#9ca3af]">{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
                    )}
                  </div>
                </div>

                {/* Step 2: Email */}
                <div className={`p-5 rounded-xl border transition-all ${step > 2 ? 'bg-[#00d2ff]/10 border-[#00d2ff]/30' : step === 2 ? 'bg-[#070a13] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-[#070a13] border-white/5 opacity-50'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 2 ? 'bg-[#00d2ff] text-[#070a13]' : 'bg-white/10 text-white'}`}>
                        {step > 2 ? <Check size={16} /> : "2"}
                      </div>
                      <span className={`font-bold ${step > 2 ? 'text-[#00d2ff]' : 'text-white'}`}>Email Address</span>
                    </div>
                    {step === 2 && (
                      <div className="flex items-center gap-2">
                        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00d2ff] text-sm" />
                        <button onClick={handleSendOTP} disabled={isLoading} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50 flex items-center gap-2">
                          <Mail size={16} /> Send OTP
                        </button>
                      </div>
                    )}
                    {step > 2 && <span className="text-sm text-[#9ca3af]">{email}</span>}
                  </div>
                </div>

                {/* Step 3: OTP */}
                <div className={`p-5 rounded-xl border transition-all ${step > 3 ? 'bg-[#00d2ff]/10 border-[#00d2ff]/30' : step === 3 ? 'bg-[#070a13] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-[#070a13] border-white/5 opacity-50'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 3 ? 'bg-[#00d2ff] text-[#070a13]' : 'bg-white/10 text-white'}`}>
                        {step > 3 ? <Check size={16} /> : "3"}
                      </div>
                      <span className={`font-bold ${step > 3 ? 'text-[#00d2ff]' : 'text-white'}`}>Verify OTP</span>
                    </div>
                    {step === 3 && (
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <input type="text" placeholder="6-digit code" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#00d2ff] text-sm font-mono" />
                          <button onClick={() => { if(otp.length === 6) setStep(4); else setErrorMsg("Enter 6 digits"); }} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold text-white transition-colors">
                            Verify
                          </button>
                        </div>
                        <button onClick={handleSendOTP} disabled={isLoading} className="text-xs text-[#9ca3af] hover:text-[#00d2ff] transition-colors disabled:opacity-50 underline mt-1 mr-1">
                          {isLoading ? "Sending..." : "Didn't receive it? Resend"}
                        </button>
                        <span className="text-[10px] text-yellow-500/80 mr-1 mt-1 font-medium">
                          * If you don't see the email, please check your Spam/Junk folder.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 4: Tweet */}
                <div className={`p-5 rounded-xl border transition-all ${step > 4 ? 'bg-[#00d2ff]/10 border-[#00d2ff]/30' : step === 4 ? 'bg-[#070a13] border-[#1DA1F2]/50 shadow-[0_0_15px_rgba(29,161,242,0.1)]' : 'bg-[#070a13] border-white/5 opacity-50'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 4 ? 'bg-[#00d2ff] text-[#070a13]' : 'bg-white/10 text-white'}`}>
                        {step > 4 ? <Check size={16} /> : "4"}
                      </div>
                      <span className={`font-bold ${step > 4 ? 'text-[#00d2ff]' : 'text-white'}`}>Share on X</span>
                    </div>
                    {step === 4 && (
                      <button onClick={handleShareX} className="px-5 py-2.5 bg-[#1DA1F2] hover:bg-[#1a91da] rounded-lg text-sm font-bold text-white transition-colors flex items-center gap-2">
                        <Share2 size={16} /> Post Viral Tweet
                      </button>
                    )}
                  </div>
                </div>

                {/* Step 5: Verify URL & Claim */}
                <div className={`p-5 rounded-xl border transition-all ${step > 5 ? 'bg-[#00d2ff]/10 border-[#00d2ff]/30' : step === 5 ? 'bg-[#070a13] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-[#070a13] border-white/5 opacity-50'}`}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 5 ? 'bg-[#00d2ff] text-[#070a13]' : 'bg-white/10 text-white'}`}>
                        {step > 5 ? <Check size={16} /> : "5"}
                      </div>
                      <span className={`font-bold ${step > 5 ? 'text-[#00d2ff]' : 'text-white'}`}>Verify URL & Finalize</span>
                    </div>
                    {step === 5 && (
                      <div className="flex flex-col gap-3 pl-11">
                        <input type="text" placeholder="Paste your Tweet URL here (https://x.com/...)" value={tweetUrl} onChange={e => setTweetUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00d2ff] text-sm" />
                        <button onClick={handleVerifyAndClaim} disabled={isLoading} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#0066FF] text-white font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                          {isLoading ? "Verifying..." : "Verify & Generate Signature"}
                        </button>
                      </div>
                    )}
                    {step === 6 && (
                      <div className="flex flex-col gap-3 pl-11">
                        <button onClick={handleSmartContractClaim} disabled={isLoading} className="w-full py-4 rounded-xl bg-[#00ff88] text-[#070a13] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                          {isLoading ? "Processing..." : "Claim Tokens via Web3"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Referral Box */}
              {wallet && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <label className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider mb-2 block">Your Viral Referral Link</label>
                  <div className="flex gap-2">
                    <input type="text" readOnly value={referralLink} className="flex-1 bg-[#070a13] border border-white/10 rounded-lg p-3 text-[#00d2ff] font-mono text-sm outline-none" />
                    <button onClick={copyReferral} className="px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center gap-2">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              )}
              </>
              )}
            </div>
          </motion.div>

          {/* SECTION B: Whale Leaderboard */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
            <div className="bg-[#111625] backdrop-blur-md border border-white/10 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy size={100} />
              </div>
              
              <div className="relative z-10 mb-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Trophy className="text-[#00d2ff]" size={20} /> Whale Leaderboard</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">
                  🏆 <strong className="text-white">Top 10 Referrers</strong> get an exclusive GUARANTEED spot in the Presale Whitelist!
                </p>
              </div>

              <div className="space-y-3">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-[#9ca3af] py-8 text-sm">No claims yet. Be the first!</p>
                ) : (
                  leaderboard.map((user, index) => {
                    let glowClass = "border-white/5 bg-[#070a13]";
                    let iconColor = "text-[#9ca3af]";
                    
                    if (index === 0) { glowClass = "border-[#FFD700]/40 bg-[#FFD700]/10 shadow-[0_0_15px_rgba(255,215,0,0.15)]"; iconColor = "text-[#FFD700]"; }
                    else if (index === 1) { glowClass = "border-[#C0C0C0]/40 bg-[#C0C0C0]/10 shadow-[0_0_15px_rgba(192,192,192,0.1)]"; iconColor = "text-[#C0C0C0]"; }
                    else if (index === 2) { glowClass = "border-[#CD7F32]/40 bg-[#CD7F32]/10 shadow-[0_0_15px_rgba(205,127,50,0.1)]"; iconColor = "text-[#CD7F32]"; }

                    return (
                      <div key={user.wallet_address} className={`p-3 rounded-xl border flex items-center justify-between ${glowClass} transition-all`}>
                        <div className="flex items-center gap-3">
                          <span className={`font-bold w-6 text-center ${iconColor}`}>#{index + 1}</span>
                          <span className="font-mono text-sm text-white">{user.wallet_address.slice(0,6)}...{user.wallet_address.slice(-4)}</span>
                        </div>
                        <span className="font-bold text-[#00d2ff]">{Number(user.total_reward).toFixed(4)} <span className="text-[10px]">BTCBLUE</span></span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
