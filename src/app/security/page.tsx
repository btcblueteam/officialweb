"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Zap, Layers, Fingerprint, CheckCircle, Lock, Server, Code, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function SecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Heavy Cyberpunk/Security Ambience */}
      <div className="fixed top-0 left-0 w-full h-full bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none"></div>
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00ff88]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0066FF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#00ff88] blur-[100px] opacity-20 pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(0,255,136,0.2)]">
            <ShieldCheck size={16} />
            Audit Score: 100/100
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white font-[var(--font-space)] leading-tight mb-6 relative z-10">
            Anti-Manipulation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00E5FF]">Shield</span>
          </h1>
          
          <p className="text-[#8A93A6] text-lg max-w-3xl mx-auto leading-relaxed relative z-10">
            Institutional capital requires institutional-grade security. The Bitcoin Blue smart contracts are engineered with military-grade defenses, neutralizing whale manipulation, sniper bots, and MEV extraction. We protect our community unconditionally.
          </p>
        </motion.div>

        {/* Core Defense Systems */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          <motion.div variants={fadeUp} className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#00ff88]/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] mb-6 shadow-[0_0_20px_rgba(0,255,136,0.2)]">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-space)]">Auto-Buyback & Burn</h3>
            <p className="text-[#8A93A6] text-sm leading-relaxed mb-4">
              Our dynamic tax system automatically accumulates capital. When triggered, the contract buys tokens directly from the liquidity pool and burns them into a dead address, absorbing selling pressure and raising the floor price permanently.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#0066FF]/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0066FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center text-[#00E5FF] mb-6 shadow-[0_0_20px_rgba(0,102,255,0.2)]">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-space)]">Anti-MEV Protection</h3>
            <p className="text-[#8A93A6] text-sm leading-relaxed mb-4">
              Sandwich attacks steal money from retail traders. Bitcoin Blue utilizes private RPC relay logic and strict <code className="text-[#00E5FF] bg-white/5 px-1 rounded">maxTxAmount</code> barriers to mathematically prevent MEV bots from exploiting community transactions.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#ff3366]/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff3366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#ff3366]/10 border border-[#ff3366]/20 flex items-center justify-center text-[#ff3366] mb-6 shadow-[0_0_20px_rgba(255,51,102,0.2)]">
              <Fingerprint size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-space)]">Anti-Sniper Protocols</h3>
            <p className="text-[#8A93A6] text-sm leading-relaxed mb-4">
              During the genesis blocks of liquidity launch, our contract deploys dynamic scaling taxes and wallet cooldowns. This neutralizes predatory sniper bots and ensures early liquidity isn't drained by malicious actors.
            </p>
          </motion.div>
        </motion.div>

        {/* Immutable Guarantees Table */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
              <Code size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white font-[var(--font-space)]">Immutable Guarantees</h2>
              <p className="text-[#8A93A6] text-sm mt-1">Smart Contract Architecture Vulnerability Status</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "No Minting", desc: "Hardcapped at 2.1M BTCBLUE. It is mathematically impossible to print more tokens.", status: "Secured" },
              { title: "No Proxies", desc: "100% immutable logic. No upgradeable proxy backdoors exist.", status: "Secured" },
              { title: "No Honeypots", desc: "Max tax limits are hardcoded into the contract state.", status: "Secured" },
              { title: "No Blacklists", desc: "Protection algorithms cannot be manually abused to freeze wallets.", status: "Secured" }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#00ff88]">
                <div className="flex justify-between items-start mb-4">
                  <Lock size={20} className="text-[#00ff88]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 px-2 py-1 rounded">{item.status}</span>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-[#8A93A6] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Presale Escrow Security */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden border border-[#0066FF]/20 shadow-[0_0_50px_rgba(0,102,255,0.1)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0066FF]/20 to-transparent blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00E5FF] blur-2xl opacity-20 rounded-full animate-pulse"></div>
                <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center bg-[#070A11] relative z-10">
                  <Server size={64} className="text-[#00E5FF]" />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[#8A93A6] text-xs font-bold uppercase tracking-widest mb-4">
                Presale.sol Infrastructure
              </div>
              <h2 className="text-3xl font-bold text-white font-[var(--font-space)] mb-4">Decentralized Trustless Escrow</h2>
              <p className="text-[#8A93A6] leading-relaxed mb-6">
                Our institutional presale does not rely on third-party centralized platforms like PinkSale which charge exorbitant fees and hold user funds hostage. Instead, we deployed a custom, audited <code className="text-[#00E5FF]">Presale.sol</code> contract.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-[#E2E8F0]">
                  <CheckCircle size={16} className="text-[#00E5FF]" /> 
                  State-driven claim execution prevents early dumping.
                </li>
                <li className="flex items-center gap-3 text-sm text-[#E2E8F0]">
                  <CheckCircle size={16} className="text-[#00E5FF]" /> 
                  Strict Min/Max contribution limits enforce community decentralization.
                </li>
                <li className="flex items-center gap-3 text-sm text-[#E2E8F0]">
                  <CheckCircle size={16} className="text-[#00E5FF]" /> 
                  Direct on-chain execution with zero middleman risk.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
