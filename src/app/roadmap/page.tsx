"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Shield, LineChart, Cpu, CheckCircle, ArrowRight, Activity, Globe } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function RoadmapPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roadmapData = [
    {
      phase: "Phase 1: Foundation",
      status: "completed",
      icon: <Shield size={24} />,
      title: "Protocol Architecture & Security",
      date: "Q1 2026",
      items: [
        "Smart Contract Development (Hardcapped, Anti-MEV)",
        "Comprehensive Security Audit & Formal Verification",
        "KYC of Core Development Team",
        "Community Bootstrapping & Initial Marketing",
        "Deployment of V1 Landing Page"
      ]
    },
    {
      phase: "Phase 2: Launch",
      status: "active",
      icon: <Rocket size={24} />,
      title: "Genesis Distribution & Liquidity",
      date: "Q2 2026",
      items: [
        "Institutional Presale Launch (Tiered Allocation)",
        "Early Supporter Airdrop Distribution",
        "PancakeSwap (DEX) Listing & Liquidity Lock",
        "Tokenomics Enactment (Burn & Buyback activation)",
        "Marketing Campaign Scale-up (Global PR)"
      ]
    },
    {
      phase: "Phase 3: Expansion",
      status: "upcoming",
      icon: <LineChart size={24} />,
      title: "Market Penetration & Staking",
      date: "Q3 2026",
      items: [
        "CoinMarketCap & CoinGecko Fast-Track Listings",
        "CEX Tier-2 Exchange Listings",
        "Release of Zero-Install Staking dApp",
        "Strategic Partnerships in Web3 AI Sector",
        "Launch of Community Governance Portal"
      ]
    },
    {
      phase: "Phase 4: Utility",
      status: "upcoming",
      icon: <Cpu size={24} />,
      title: "Ecosystem Integration & AI",
      date: "Q4 2026",
      items: [
        "AI Telegram/Discord Bots Beta Release",
        "Zero-Install Ecosystem Fully Live",
        "Targeting Tier-1 Centralized Exchanges (Binance, OKX)",
        "Cross-Chain Bridge Exploration",
        "V2 Protocol Upgrades & DAO Handover"
      ]
    }
  ];

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Background Glows */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00E5FF] text-xs font-semibold tracking-widest uppercase w-max mb-6">
            <Activity size={14} />
            Master Plan
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-[var(--font-space)] leading-tight mb-6">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00E5FF]">Roadmap</span>
          </h1>
          <p className="text-[#8A93A6] text-lg max-w-2xl mx-auto leading-relaxed">
            Our comprehensive deployment timeline. From core smart contract architecture to cross-chain AI integration, track the evolution of the Bitcoin Blue protocol.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0066FF] via-[#00E5FF]/50 to-transparent md:-translate-x-1/2"></div>

          {roadmapData.map((phase, index) => {
            const isCompleted = phase.status === 'completed';
            const isActive = phase.status === 'active';
            
            return (
              <motion.div key={index} variants={fadeUp} className={`relative flex items-center justify-between mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:flex-row`}>
                
                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block w-[45%]"></div>
                
                {/* Center Node */}
                <div className="absolute left-[32px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#070A11] z-10 
                  ${isCompleted ? 'bg-[#00ff88]' : isActive ? 'bg-[#00E5FF] shadow-[0_0_20px_#00E5FF]' : 'bg-[#0F1423] border-[#334155]'}
                ">
                  {isCompleted ? <CheckCircle size={20} className="text-[#070A11]" /> : 
                   isActive ? <div className="w-4 h-4 rounded-full bg-[#070A11] animate-pulse"></div> : 
                   <div className="w-3 h-3 rounded-full bg-[#334155]"></div>}
                </div>

                {/* Content Card */}
                <div className="w-full pl-24 md:pl-0 md:w-[45%] relative">
                  {/* Small arrow connecting to timeline */}
                  <div className={`hidden md:block absolute top-6 w-8 h-px bg-white/10 ${index % 2 === 0 ? '-left-8' : '-right-8'}`}></div>
                  
                  <div className={`glass-panel p-8 rounded-3xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] border ${isActive ? 'border-[#00E5FF]/30' : 'border-white/10'}`}>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold uppercase tracking-widest ${isCompleted ? 'text-[#00ff88]' : isActive ? 'text-[#00E5FF]' : 'text-[#8A93A6]'}`}>
                        {phase.phase}
                      </span>
                      <span className="text-[#8A93A6] text-sm font-mono bg-[#0F1423] px-3 py-1 rounded-full border border-white/5">
                        {phase.date}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white font-[var(--font-space)] mb-6 flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-white/5 ${isCompleted ? 'text-[#00ff88]' : isActive ? 'text-[#00E5FF]' : 'text-[#8A93A6]'}`}>
                        {phase.icon}
                      </div>
                      {phase.title}
                    </h3>
                    
                    <ul className="space-y-4 relative z-10">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[#E2E8F0] text-sm leading-relaxed">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isCompleted ? 'bg-[#00ff88]' : isActive ? 'bg-[#00E5FF]' : 'bg-[#8A93A6]'}`}></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 p-4 pr-6 rounded-2xl bg-[#0F1423]/80 border border-white/10 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <Globe className="text-[#8A93A6]" size={24} />
            </div>
            <p className="text-[#8A93A6] text-sm text-left">
              This roadmap is a strategic guideline. The development team reserves the right to adjust timelines based on market conditions, technological advancements, and community governance voting.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
