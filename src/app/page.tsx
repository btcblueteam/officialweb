"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Menu, X, Globe, Bot, Layers, Zap, ShieldAlert, ArrowRight,
  Terminal, Fingerprint, Copy, Check, ExternalLink,
  Gift, Send, CheckCircle, AtSign, Shield, Wallet, ChevronRight
} from 'lucide-react';

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  // Contract Address
  const contractAddress = "0x1a7d99E07DaecD6A325e312e865f821C6D08d064"; // Official Token Address

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative z-10 w-full">
      {/* --- 1. NAVIGATION BAR --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#070A11]/80 backdrop-blur-xl border-b border-white/[0.05]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img src="/logo.webp" alt="Bitcoin Blue Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="text-xl font-bold tracking-wider text-white font-[var(--font-space)]">
              BTC<span className="text-[#0066FF] ml-1">Blue</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Ecosystem', path: '/ecosystem' },
              { name: 'Partners', path: '/partners' },
              { name: 'Tokenomics', path: '/#tokenomics' },
              { name: 'Security', path: '/security' },
              { name: 'Roadmap', path: '/roadmap' },
              { name: 'Airdrop', path: '/airdrop' },
              { name: 'Docs', path: '/docs' }
            ].map((item) => (
              <Link key={item.name} href={item.path} className="text-sm font-medium text-[#8A93A6] hover:text-white transition-colors tracking-wide">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/portal" className="relative block px-6 py-2.5 rounded-lg bg-[#0066FF] text-white font-semibold text-sm tracking-wide overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              <span className="relative z-10">Launch App</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00A3FF] z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-panel border-t-0">
              <div className="flex flex-col px-6 py-4 gap-4">
                {[
                  { name: 'Ecosystem', path: '/ecosystem' },
                  { name: 'Partners', path: '/partners' },
                  { name: 'Tokenomics', path: '/#tokenomics' },
                  { name: 'Security', path: '/security' },
                  { name: 'Roadmap', path: '/roadmap' },
                  { name: 'Docs', path: '/docs' }
                ].map((item) => (
                  <Link key={item.name} href={item.path} className="text-[#8A93A6] hover:text-white py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
                <Link href="/portal" className="w-full py-3 rounded-lg bg-[#0066FF] text-white font-semibold mt-2 block text-center">
                  Launch App
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- 2. CONTRACT ADDRESS BANNER (TOP FOR BSCSCAN) --- */}
      <section className="relative pt-28 lg:pt-36 pb-8 max-w-5xl mx-auto px-6 lg:px-8 z-40">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="p-[1px] rounded-2xl bg-gradient-to-r from-[#0066FF]/40 via-white/10 to-[#00E5FF]/40 shadow-[0_0_30px_rgba(0,102,255,0.15)]">
          <div className="glass-panel bg-[#070A11]/90 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-none">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full bg-[#1A2235] border border-white/10 flex items-center justify-center shrink-0">
                <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=026" alt="BSC" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold font-[var(--font-space)] text-lg">Official BSC Contract</h3>
                <p className="text-[#8A93A6] text-xs font-medium uppercase tracking-wider">Verified on BscScan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto bg-[#0F1423] border border-white/10 rounded-xl p-2 sm:p-3 overflow-hidden">
              <span className="text-[#00E5FF] font-mono text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none px-2">
                {contractAddress}
              </span>
              <div className="flex items-center gap-2 border-l border-white/10 pl-3 shrink-0">
                <button onClick={handleCopy} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8A93A6] hover:text-white transition-colors" title="Copy Address">
                  {copied ? <Check size={16} className="text-[#00ff88]" /> : <Copy size={16} />}
                </button>
                <a href={`https://bscscan.com/address/${contractAddress}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8A93A6] hover:text-[#00E5FF] transition-colors" title="View on BscScan">
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- 3. HERO SECTION --- */}
      <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-32 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        <motion.div className="flex-1 flex flex-col gap-8" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00E5FF] text-xs font-semibold tracking-widest uppercase w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
            Version: 1.0.0
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white font-[var(--font-space)]">
            Automating the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00E5FF]">
              Web3 Future
            </span> <br />
            with AI.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[#8A93A6] text-lg sm:text-xl max-w-xl font-[var(--font-inter)] leading-relaxed">
            Zero-install architecture, AI-driven community management, and a hyper-deflationary economic engine built for institutional-grade scaling.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/presale" className="px-8 py-4 rounded-xl bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Join Presale
              <ArrowRight size={16} />
            </Link>
            <Link href="/whitepaper" className="px-8 py-4 rounded-xl glass-panel text-white font-bold text-sm tracking-widest uppercase hover:bg-white/[0.1] transition-colors text-center">
              Read Whitepaper
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="flex-1 relative w-full max-w-xs sm:max-w-sm lg:max-w-lg mx-auto flex items-center justify-center aspect-square">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/15 to-[#00E5FF]/15 rounded-full blur-2xl"></div>
          <div className="relative w-64 h-64 border-[0.5px] border-[#0066FF]/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="absolute w-full h-full border-[0.5px] border-[#00E5FF]/20 rounded-full rotate-45 scale-110"></div>
            <div className="absolute w-full h-full border-[0.5px] border-[#0066FF]/40 rounded-full -rotate-45 scale-90"></div>
          </div>
          <img src="/logo.webp" alt="Bitcoin Blue Logo" className="absolute w-28 h-28 object-contain drop-shadow-[0_0_25px_rgba(0,229,255,0.4)] animate-pulse" />
        </motion.div>
      </section>



      {/* --- 3. THE UTILITY --- */}
      <section id="ecosystem" className="relative py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white font-[var(--font-space)] mb-4">Zero-Install Ecosystem</h2>
          <p className="text-[#8A93A6] max-w-2xl mx-auto mb-8">Access powerful Web3 tools instantly. No downloads, no complex setups.</p>
          <Link href="/ecosystem" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">
            Explore Ecosystem Phases <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Bot, title: "AI Community Bots", desc: "Automated moderation, sentiment analysis, and dynamic airdrop targeting powered by deep learning." },
            { icon: Terminal, title: "Zero-Install dApps", desc: "Execute complex smart contracts directly through a frictionless, cloud-native terminal interface." },
            { icon: Shield, title: "Unhackable Core", desc: "Institutional-grade multi-sig security with real-time on-chain threat monitoring and pausing." }
          ].map((feature, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0066FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-6 text-[#00E5FF]">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-space)]">{feature.title}</h3>
              <p className="text-[#8A93A6] text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 4. TOKENOMICS MAP --- */}
      <section id="tokenomics" className="relative py-24 bg-[#0F1423]/30 border-y border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white font-[var(--font-space)] mb-4">The Economic Engine</h2>
            <div className="flex flex-col items-center gap-2 mt-6">
              <span className="text-[#8A93A6] text-sm uppercase tracking-widest font-semibold">Total Supply</span>
              <span className="text-3xl sm:text-4xl lg:text-6xl font-mono font-bold text-[#00E5FF] tracking-tight drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">2,100,000</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col gap-6">
              {[
                { label: 'Presale Allocation', pct: 40, color: 'bg-[#0066FF]' },
                { label: 'Liquidity Pool', pct: 28, color: 'bg-[#00A3FF]' },
                { label: 'CEX & Marketing', pct: 15, color: 'bg-[#00E5FF]' },
                { label: 'Ecosystem & Dev', pct: 10, color: 'bg-[#00ff88]' },
                { label: 'Staking & Airdrop', pct: 7, color: 'bg-white/70' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-white font-[var(--font-space)] tracking-wide">{item.label}</span>
                    <span className="text-[#8A93A6] font-mono">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full ${item.color} shadow-[0_0_10px_currentColor]`} />
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold text-white font-[var(--font-space)]">Buy Tax</span>
                  <span className="text-3xl font-mono font-bold text-[#00ff88]">3%</span>
                </div>
                <ul className="space-y-3 text-sm text-[#8A93A6]">
                  <li className="flex justify-between"><span>Auto-LP</span> <span className="text-white font-mono">1%</span></li>
                  <li className="flex justify-between"><span>Buyback & Burn</span> <span className="text-white font-mono">1%</span></li>
                  <li className="flex justify-between"><span>Marketing & Eco</span> <span className="text-white font-mono">1%</span></li>
                </ul>
              </div>

              <div className="flex-1 glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-[#ff3366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold text-white font-[var(--font-space)]">Sell Tax</span>
                  <span className="text-3xl font-mono font-bold text-[#ff3366]">5%</span>
                </div>
                <ul className="space-y-3 text-sm text-[#8A93A6]">
                  <li className="flex justify-between"><span>Auto-LP</span> <span className="text-white font-mono">1%</span></li>
                  <li className="flex justify-between"><span>Buyback & Burn</span> <span className="text-white font-mono">2%</span></li>
                  <li className="flex justify-between"><span>Marketing & Eco</span> <span className="text-white font-mono">2%</span></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 5. SECURITY ARSENAL --- */}
      {/* --- SECURITY BANNER --- */}
      <section className="relative py-24 max-w-7xl mx-auto px-6 lg:px-8 border-y border-white/[0.05] bg-[#0F1423]/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3">
            <h2 className="text-3xl lg:text-5xl font-bold text-white font-[var(--font-space)] mb-6">Anti-Manipulation Shield</h2>
            <p className="text-[#8A93A6] text-lg leading-relaxed max-w-2xl">
              Institutional capital requires institutional security. Our smart contracts employ advanced auto-buybacks, MEV barriers, and zero-proxy architecture to protect our community unconditionally.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-start md:justify-end w-full">
            <Link href="/security" className="px-8 py-4 rounded-xl bg-white/5 hover:bg-[#00ff88]/10 border border-white/10 hover:border-[#00ff88]/30 text-white hover:text-[#00ff88] font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-auto group">
              View Audit & Security <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>


      {/* --- AIRDROP BANNER --- */}
      <section className="relative py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="p-[1px] rounded-3xl bg-gradient-to-r from-[#00d2ff]/40 via-white/10 to-[#0066FF]/40 shadow-[0_0_30px_rgba(0,210,255,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d2ff]/5 to-[#0066FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="glass-panel bg-[#070A11]/90 rounded-3xl p-8 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border-none relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#00d2ff]/10 border border-[#00d2ff]/20 text-[#00d2ff] font-bold text-xs uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse"></span>
                Halving Epoch 1 Live
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white font-[var(--font-space)] mb-4">Genesis Airdrop</h2>
              <p className="text-[#8A93A6] max-w-lg leading-relaxed">
                Secure your fraction of the 2.1M total supply before the next halving epoch. Join the Whale Leaderboard and guarantee your Whitelist spot.
              </p>
            </div>
            
            <div className="w-full md:w-auto shrink-0">
              <Link href="/airdrop" className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#0066FF] text-[#070a13] font-bold tracking-wide uppercase hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                Access Claim Terminal <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- ROADMAP BANNER --- */}
      <section className="relative py-24 max-w-7xl mx-auto px-6 lg:px-8 border-y border-white/[0.05] bg-[#0F1423]/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3">
            <h2 className="text-3xl lg:text-5xl font-bold text-white font-[var(--font-space)] mb-6">Strategic Roadmap</h2>
            <p className="text-[#8A93A6] text-lg leading-relaxed max-w-2xl">
              From foundation to institutional integration, track our complete deployment timeline. See exactly how and when we are building the future of Bitcoin Blue.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-start md:justify-end w-full">
            <Link href="/roadmap" className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-auto">
              View Full Timeline <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- 7. FOOTER --- */}
      <footer className="relative pt-16 pb-8 max-w-7xl mx-auto px-6 lg:px-8 border-t border-white/[0.05]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="Bitcoin Blue Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-wider text-white font-[var(--font-space)]">BTC<span className="text-[#0066FF]">Blue</span></span>
          </div>
          <div className="flex gap-6">
            {[
              { name: 'X (Twitter)', url: 'https://x.com/btcblueofficial' },
              { name: 'Telegram', url: 'https://t.me/btcblueofficial' },
              { name: 'Github', url: 'https://github.com/btcblueofficial' },
              { name: 'Docs', url: '/docs' }
            ].map(link => (
              <a key={link.name} href={link.url} target={link.url.startsWith('http') ? "_blank" : "_self"} rel="noreferrer" className="text-sm font-medium text-[#8A93A6] hover:text-[#00E5FF] transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 border-t border-white/[0.05] pt-8">
          <p>© 2026 Bitcoin Blue Protocol. All rights reserved.</p>
          <p className="max-w-lg text-center md:text-right">
            Disclaimer: Cryptocurrency investments carry a high degree of risk. The information provided on this platform does not constitute investment advice. Please conduct your own research.
          </p>
        </div>
      </footer>
    </main>
  );
}
