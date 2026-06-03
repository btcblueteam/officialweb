"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Terminal, Shield, Cpu, Network, Zap } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function EcosystemPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00E5FF] text-xs font-semibold tracking-widest uppercase w-max mb-6">
            <Cpu size={14} />
            The Infrastructure
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-[var(--font-space)] leading-tight mb-6">
            Bitcoin Blue <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00E5FF]">Ecosystem</span>
          </h1>
          <p className="text-[#8A93A6] text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive suite of decentralized applications and AI-driven community tools designed to operate with zero friction. Explore the upcoming phases of our technological deployment.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-12">
          
          {/* Pillar 1 */}
          <motion.div variants={fadeUp} className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/5 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-[#0F1423] border border-white/10 flex items-center justify-center shrink-0 text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <Bot size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-[var(--font-space)] mb-3">AI Community Bots (Phase 4)</h2>
                <p className="text-[#8A93A6] leading-relaxed mb-6">
                  Traditional crypto communities rely on manual moderation. We are building custom Telegram and Discord bots powered by deep learning models to automate sentiment analysis, filter malicious links instantly, and dynamically reward active members through targeted airdrops without human intervention.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 p-3 rounded-xl border border-white/5">
                    <Zap size={16} className="text-[#00ff88]" /> Automated Moderation
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 p-3 rounded-xl border border-white/5">
                    <Network size={16} className="text-[#00ff88]" /> Smart Airdrop Targeting
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div variants={fadeUp} className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-[#0F1423] border border-white/10 flex items-center justify-center shrink-0 text-[#0066FF] shadow-[0_0_20px_rgba(0,102,255,0.1)]">
                <Terminal size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-[var(--font-space)] mb-3">Zero-Install dApps (Phase 3)</h2>
                <p className="text-[#8A93A6] leading-relaxed mb-6">
                  Investors should not need to download heavy applications or navigate complex interfaces to stake or claim tokens. Our Zero-Install architecture ensures that all Web3 interactions (Staking, Claiming, Voting) happen directly within this highly optimized Next.js frontend, bridging the gap between Web2 speed and Web3 security.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 p-3 rounded-xl border border-white/5">
                    <Zap size={16} className="text-[#00ff88]" /> Frictionless Staking
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 p-3 rounded-xl border border-white/5">
                    <Network size={16} className="text-[#00ff88]" /> Cloud-Native Execution
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div variants={fadeUp} className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-[#0F1423] border border-white/10 flex items-center justify-center shrink-0 text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.1)]">
                <Shield size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-[var(--font-space)] mb-3">Institutional Security Layer (Live)</h2>
                <p className="text-[#8A93A6] leading-relaxed mb-6">
                  The foundation of the entire ecosystem is the Bitcoin Blue Smart Contract. It acts as an unhackable core, featuring automated Buyback & Burn algorithms that trigger during market sell-offs, and MEV-protection protocols to safeguard users from predatory front-running bots.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 p-3 rounded-xl border border-white/5">
                    <Zap size={16} className="text-[#00E5FF]" /> Auto-Buyback Engine
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 p-3 rounded-xl border border-white/5">
                    <Network size={16} className="text-[#00E5FF]" /> Anti-MEV Protocols
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
