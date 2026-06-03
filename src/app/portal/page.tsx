"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, ShieldCheck, Lock, Activity, Bot, LineChart, Users, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PortalPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/10 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00E5FF] text-xs font-semibold tracking-widest uppercase mb-4 w-max">
              <Activity size={14} className="animate-pulse" />
              Mainnet Infrastructure
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-space)] mb-4">
              Decentralized <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00E5FF]">Portal</span>
            </h1>
            <p className="text-[#8A93A6] max-w-xl text-sm leading-relaxed">
              Access the entire suite of Bitcoin Blue applications. Core financial infrastructure is currently active, while advanced AI utility modules remain time-locked until post-presale deployment.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8A93A6] bg-[#0F1423] border border-white/10 px-4 py-2 rounded-lg shadow-inner">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
            System Status: <span className="text-white">Operational</span>
          </div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ACTIVE APPLICATIONS */}
          
          {/* 1. Presale Terminal */}
          <motion.div variants={fadeUp} className="group relative">
            <Link href="/presale" className="block w-full h-full glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 hover:border-[#00E5FF]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
                Active
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#00E5FF]/20 border border-white/10 flex items-center justify-center mb-6 text-[#00E5FF] group-hover:scale-110 transition-transform duration-300">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">Institutional Presale</h3>
              <p className="text-[#8A93A6] text-sm mb-6 min-h-[60px]">
                Secure your genesis allocation of BTCBLUE before DEX listing. Tiered contribution mechanics enabled.
              </p>
              <div className="flex items-center text-[#00E5FF] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                Enter Terminal <ChevronRight size={16} />
              </div>
            </Link>
          </motion.div>

          {/* 2. Viral Airdrop */}
          <motion.div variants={fadeUp} className="group relative">
            <Link href="/airdrop" className="block w-full h-full glass-panel p-6 rounded-3xl border border-[#00d2ff]/30 hover:border-[#00d2ff]/60 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all duration-300">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-[#00d2ff]/10 text-[#00d2ff] text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse"></span>
                Halving Live
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#00d2ff]/20 border border-white/10 flex items-center justify-center mb-6 text-[#00d2ff] group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">Genesis Airdrop</h3>
              <p className="text-[#8A93A6] text-sm mb-6 min-h-[60px]">
                Claim your free $BTCBLUE allocation. Verify via Email OTP and earn up to 2 tiers of referral bonuses before the Halving.
              </p>
              <div className="flex items-center text-[#00d2ff] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                Claim Now <ChevronRight size={16} />
              </div>
            </Link>
          </motion.div>

          {/* LOCKED / UPCOMING APPLICATIONS */}

          {/* 3. Staking Vaults */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="block w-full h-full glass-panel p-6 rounded-3xl border border-white/5 bg-[#070A11]/60 cursor-not-allowed">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 flex items-center gap-1.5">
                <Lock size={10} />
                Locked
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F1423] border border-white/5 flex items-center justify-center mb-6 text-[#8A93A6]">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#8A93A6] font-[var(--font-space)] mb-2">Zero-Install Staking</h3>
              <p className="text-[#475569] text-sm mb-6 min-h-[60px]">
                Lock BTCBLUE to earn passive yields. Highly secure auto-compounding vaults.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> Available Post-Presale
              </div>
            </div>
          </motion.div>

          {/* 4. AI Trading Bots */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="block w-full h-full glass-panel p-6 rounded-3xl border border-white/5 bg-[#070A11]/60 cursor-not-allowed">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 flex items-center gap-1.5">
                <Lock size={10} />
                Locked
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F1423] border border-white/5 flex items-center justify-center mb-6 text-[#8A93A6]">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#8A93A6] font-[var(--font-space)] mb-2">AI Trading Modules</h3>
              <p className="text-[#475569] text-sm mb-6 min-h-[60px]">
                Automated sentiment analysis and execution bots for Telegram and Discord ecosystems.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> Available Post-Presale
              </div>
            </div>
          </motion.div>

          {/* 5. Governance DAO */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="block w-full h-full glass-panel p-6 rounded-3xl border border-white/5 bg-[#070A11]/60 cursor-not-allowed">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 flex items-center gap-1.5">
                <Lock size={10} />
                Locked
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F1423] border border-white/5 flex items-center justify-center mb-6 text-[#8A93A6]">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#8A93A6] font-[var(--font-space)] mb-2">Community DAO</h3>
              <p className="text-[#475569] text-sm mb-6 min-h-[60px]">
                Propose and vote on protocol upgrades, treasury allocations, and future integrations.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> Phase 4 Deployment
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
