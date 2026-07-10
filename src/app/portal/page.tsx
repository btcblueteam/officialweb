"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Activity, LineChart, Users, Sparkles, Rocket, Gift, Share2, LayoutGrid } from 'lucide-react';
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
          
          {/* 1. Genesis Airdrop (Locked) */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="block w-full h-full glass-panel p-6 rounded-3xl border border-white/5 bg-[#070A11]/60 cursor-not-allowed">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 flex items-center gap-1.5">
                <Lock size={10} />
                Locked
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F1423] border border-white/5 flex items-center justify-center mb-6 text-[#8A93A6]">
                <Gift size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#8A93A6] font-[var(--font-space)] mb-2">Genesis Airdrop</h3>
              <p className="text-[#475569] text-sm mb-6 min-h-[60px]">
                Claim token rewards for early ecosystem participants, community supporters, and active testnet contributors.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> Upcoming Distribution
              </div>
            </div>
          </motion.div>

          {/* 2. Marketer Partnerships (Locked) */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="block w-full h-full glass-panel p-6 rounded-3xl border border-white/5 bg-[#070A11]/60 cursor-not-allowed">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 flex items-center gap-1.5">
                <Lock size={10} />
                Locked
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F1423] border border-white/5 flex items-center justify-center mb-6 text-[#8A93A6]">
                <Share2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#8A93A6] font-[var(--font-space)] mb-2">Marketer Partnerships</h3>
              <p className="text-[#475569] text-sm mb-6 min-h-[60px]">
                Decentralized affiliate portal offering multi-tier referral rewards and promotional bounty programs for growth leaders.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> Partner Application Portal
              </div>
            </div>
          </motion.div>

          {/* 3. Institutional Presale (Locked) */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="block w-full h-full glass-panel p-6 rounded-3xl border border-white/5 bg-[#070A11]/60 cursor-not-allowed">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 flex items-center gap-1.5">
                <Lock size={10} />
                Locked
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F1423] border border-white/5 flex items-center justify-center mb-6 text-[#8A93A6]">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#8A93A6] font-[var(--font-space)] mb-2">Institutional Presale</h3>
              <p className="text-[#475569] text-sm mb-6 min-h-[60px]">
                Secure your genesis allocation of BTCBLUE before DEX listing. Tiered contribution mechanics and vesting vaults.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> Available at Launch
              </div>
            </div>
          </motion.div>

          {/* 4. SaaS AI Ecosystem Modules (Locked) */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="block w-full h-full glass-panel p-6 rounded-3xl border border-white/5 bg-[#070A11]/60 cursor-not-allowed">
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 flex items-center gap-1.5">
                <Lock size={10} />
                Locked
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F1423] border border-white/5 flex items-center justify-center mb-6 text-[#8A93A6]">
                <LayoutGrid size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#8A93A6] font-[var(--font-space)] mb-2">SaaS AI Ecosystem</h3>
              <p className="text-[#475569] text-sm mb-6 min-h-[60px]">
                Expandable Web3 Software-as-a-Service suite including institutional analytics, wallet scoring, and automated compliance tools.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> In Development
              </div>
            </div>
          </motion.div>

          {/* 5. Staking Vaults (Locked) */}
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
                Lock BTCBLUE to earn passive yields. Highly secure auto-compounding vaults operating directly in the cloud.
              </p>
              <div className="flex items-center text-[#475569] text-xs font-bold uppercase tracking-wider gap-2">
                <Sparkles size={14} /> Available Post-Presale
              </div>
            </div>
          </motion.div>

          {/* 6. Governance DAO (Locked) */}
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
                Propose and vote on protocol upgrades, treasury allocations, and future token utility integrations.
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
