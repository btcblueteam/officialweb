"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Shield, Cpu, Zap, PieChart, Layers, Target, CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Whitepaper() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = async () => {
    // Dynamically import to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;
    
    // Create a clean, unstyled HTML string to avoid Tailwind 'oklab' parsing errors 
    // and format it like a standard white document (Docs-style).
    const printHtml = `
      <div style="padding: 20px 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; background: #FFF; line-height: 1.6;">
        <h1 style="text-align: center; color: #0066FF; font-size: 28px; margin-bottom: 5px;">Bitcoin Blue Whitepaper</h1>
        <p style="text-align: center; font-style: italic; color: #555; margin-bottom: 40px;">Architecting the Next Generation of AI-Driven Web3 Community Automation</p>
        
        <h2 style="color: #222; border-bottom: 2px solid #0066FF; padding-bottom: 5px; font-size: 20px;">1. Executive Summary</h2>
        <p>The Decentralized Finance (DeFi) market suffers from fragile infrastructure, weak economic systems, and a lack of technical utility. <strong>Bitcoin Blue (BTCBLUE)</strong> emerges as an independent software entity to solve this dilemma by integrating blockchain with Artificial Intelligence technologies to automate digital community management.</p>
        <p>With a hyper-scarce supply of only <strong>2.1 million tokens</strong>, and a smart contract architecturally fortified with offensive and defensive economic mechanisms, the project offers a safe haven for investors seeking sustainable growth protected from whale manipulation and sniper bots.</p>
        
        <h2 style="color: #222; border-bottom: 2px solid #0066FF; padding-bottom: 5px; margin-top: 30px; font-size: 20px;">2. The Utility: AI-Driven Automation</h2>
        <p>Bitcoin Blue does not rely on speculation; it derives its value from real technical infrastructure:</p>
        <ul>
          <li style="margin-bottom: 8px;"><strong>AI Community Automation:</strong> Developing smart automation algorithms and bots that manage Web3 communities, analyze investor sentiment, and respond to complex inquiries in real-time.</li>
          <li style="margin-bottom: 8px;"><strong>Zero-Install Architecture:</strong> Building advanced cloud-native dApp portals that allow investors to connect their wallets and use project tools directly via the browser.</li>
          <li style="margin-bottom: 8px;"><strong>Server Independence:</strong> The project's backend infrastructure relies on self-hosted environments and isolated containers, ensuring zero downtime.</li>
        </ul>

        <h2 style="color: #222; border-bottom: 2px solid #0066FF; padding-bottom: 5px; margin-top: 30px; font-size: 20px;">3. Economic Engineering</h2>
        <p>The economic system is designed to create continuous "supply shocks" and ensure digital asset scarcity.</p>
        <ul style="margin-bottom: 15px;">
          <li><strong>Name & Ticker:</strong> Bitcoin Blue (BTCBLUE)</li>
          <li><strong>Network:</strong> Binance Smart Chain</li>
          <li><strong>Total Supply:</strong> 2,100,000</li>
        </ul>
        <h3 style="font-size: 16px;">Supply Distribution</h3>
        <ul>
          <li>40% - Presale</li>
          <li>28% - Liquidity Pool</li>
          <li>15% - CEX & Marketing</li>
          <li>10% - Ecosystem & Dev</li>
          <li>7% - Staking & Airdrop</li>
        </ul>

        <h2 style="color: #222; border-bottom: 2px solid #0066FF; padding-bottom: 5px; margin-top: 30px; font-size: 20px;">4. The Economic Engine: Smart Taxes</h2>
        <p>The smart contract utilizes an asymmetric taxation system to fuel project growth without suffocating trading volume.</p>
        <h3 style="font-size: 16px;">Buy Tax (3%)</h3>
        <ul style="margin-bottom: 15px;">
          <li>1% Auto-Liquidity Pool</li>
          <li>1% Buyback & Burn Vault</li>
          <li>1% Marketing & AI Dev</li>
        </ul>
        <h3 style="font-size: 16px;">Sell Tax (5%)</h3>
        <ul>
          <li>2% Buyback & Burn Vault</li>
          <li>2% Marketing & Intervention</li>
          <li>1% Auto-Liquidity Pool</li>
        </ul>

        <h2 style="color: #222; border-bottom: 2px solid #0066FF; padding-bottom: 5px; margin-top: 30px; font-size: 20px;">5. Security & Anti-Manipulation Shield</h2>
        <ul>
          <li style="margin-bottom: 8px;"><strong>Auto-Buyback & Dual Burn:</strong> The contract automatically swallows red candles by purchasing tokens from the pool and burning them forever.</li>
          <li style="margin-bottom: 8px;"><strong>Protected Dynamic Limits:</strong> Protecting investors by restricting maxTx and maxWallet limits.</li>
          <li style="margin-bottom: 8px;"><strong>Dynamic Anti-Dump Tax:</strong> An algorithmic framework that penalizes wallets attempting to dump massive amounts at once.</li>
          <li style="margin-bottom: 8px;"><strong>Sell Cooldowns:</strong> Preventing wallets from executing consecutive sell operations to break panic sell momentum.</li>
          <li style="margin-bottom: 8px;"><strong>Anti-MEV & Anti-Sniper:</strong> Immediate protocol-level bans for bots attempting to steal liquidity.</li>
        </ul>

        <h2 style="color: #222; border-bottom: 2px solid #0066FF; padding-bottom: 5px; margin-top: 30px; font-size: 20px;">6. Roadmap</h2>
        <ul>
          <li style="margin-bottom: 8px;"><strong>Phase 1 (Foundation):</strong> Smart contract engineering, comprehensive security audit, launch of the presale dApp portal.</li>
          <li style="margin-bottom: 8px;"><strong>Phase 2 (Launch):</strong> Liquidity locking, public trading activation, deployment of the defensive arsenal.</li>
          <li style="margin-bottom: 8px;"><strong>Phase 3 (Expansion):</strong> Launching the Staking platform, listing on major tracking sites.</li>
          <li style="margin-bottom: 8px;"><strong>Phase 4 (Utility):</strong> Full deployment of AI bots and tools to automate Web3 communities.</li>
        </ul>
      </div>
    `;
    
    const opt: any = {
      margin:       10,
      filename:     'BitcoinBlue_Whitepaper.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(printHtml).save();
  };

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 max-w-4xl mx-auto px-6 lg:px-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors font-medium">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <button onClick={handleDownload} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF]/20 hover:bg-[#0066FF]/40 border border-[#0066FF]/30 rounded-lg text-white text-sm font-bold transition-colors">
          <Download size={16} />
          Download PDF
        </button>
      </div>

      <div id="whitepaper-content" className="p-4 rounded-xl">
        {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 border-b border-white/10 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00E5FF] text-xs font-semibold tracking-widest uppercase mb-6 w-max">
          <BookOpen size={14} />
          Official Documentation
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white font-[var(--font-space)] mb-6 leading-tight">
          Bitcoin Blue Whitepaper
        </h1>
        <p className="text-xl md:text-2xl text-[#8A93A6] font-[var(--font-inter)] leading-relaxed border-l-2 border-[#0066FF] pl-4">
          "Architecting the Next Generation of AI-Driven Web3 Community Automation"
        </p>
      </motion.div>

      <motion.article initial="hidden" animate="visible" variants={stagger} className="space-y-16 text-[#E2E8F0] font-[var(--font-inter)] leading-relaxed">
        
        {/* Section 1 */}
        <motion.section variants={fadeUp} className="glass-panel p-8 md:p-10 rounded-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center text-[#00E5FF]">
              <Target size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-space)]">1. Executive Summary</h2>
          </div>
          <p className="mb-4">
            The Decentralized Finance (DeFi) market suffers from fragile infrastructure, weak economic systems, and a lack of technical utility. <strong>Bitcoin Blue (BTCBLUE)</strong> emerges as an independent software entity to solve this dilemma by integrating blockchain with Artificial Intelligence technologies to automate digital community management.
          </p>
          <p>
            With a hyper-scarce supply of only <strong>2.1 million tokens</strong>, and a smart contract architecturally fortified with offensive and defensive economic mechanisms, the project offers a safe haven for investors seeking sustainable growth protected from whale manipulation and sniper bots.
          </p>
        </motion.section>

        {/* Section 2 */}
        <motion.section variants={fadeUp}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
              <Cpu size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-space)]">2. The Utility: AI-Driven Automation</h2>
          </div>
          <p className="mb-6 text-[#8A93A6]">
            Bitcoin Blue does not rely on speculation; it derives its value from real technical infrastructure:
          </p>
          <div className="grid gap-4">
            <div className="glass-panel p-6 rounded-2xl border-l-2 border-[#00ff88]/50">
              <h3 className="text-lg font-bold text-white mb-2">AI Community Automation</h3>
              <p className="text-sm text-[#8A93A6]">Developing smart automation algorithms and bots that manage Web3 communities, analyze investor sentiment, and respond to complex inquiries in real-time.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-2 border-[#00ff88]/50">
              <h3 className="text-lg font-bold text-white mb-2">Zero-Install Architecture</h3>
              <p className="text-sm text-[#8A93A6]">Building advanced cloud-native dApp portals that allow investors to connect their wallets and use project tools directly via the browser without installing complex software, significantly increasing the adoption rate.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-2 border-[#00ff88]/50">
              <h3 className="text-lg font-bold text-white mb-2">Server Independence</h3>
              <p className="text-sm text-[#8A93A6]">The project's backend infrastructure relies on self-hosted environments and isolated containers, ensuring zero downtime and complete system independence from centralized third-party services.</p>
            </div>
          </div>
        </motion.section>

        {/* Section 3 */}
        <motion.section variants={fadeUp} className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/5 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center text-[#00E5FF]">
              <PieChart size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-space)]">3. Economic Engineering</h2>
          </div>
          <p className="mb-8 text-[#8A93A6] relative z-10">
            The economic system is designed to create continuous "supply shocks" and ensure digital asset scarcity.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[#8A93A6]">Name & Ticker</span>
                <span className="font-bold text-white">Bitcoin Blue (BTCBLUE)</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[#8A93A6]">Network</span>
                <span className="font-bold text-white">Binance Smart Chain</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[#8A93A6]">Total Supply</span>
                <span className="font-bold text-[#00E5FF] font-mono">2,100,000</span>
              </div>
              <p className="text-xs text-[#8A93A6] italic mt-2">* Exactly 10% of the original Bitcoin supply.</p>
            </div>
            
            <div className="bg-[#070A11] p-5 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Supply Distribution</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0066FF]"></span> Presale</span>
                  <span className="font-mono text-white">40%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00A3FF]"></span> Liquidity Pool</span>
                  <span className="font-mono text-white">28%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span> CEX & Marketing</span>
                  <span className="font-mono text-white">15%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00ff88]"></span> Ecosystem & Dev</span>
                  <span className="font-mono text-white">10%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8A93A6]"></span> Staking & Airdrop</span>
                  <span className="font-mono text-white">7%</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 4 */}
        <motion.section variants={fadeUp}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#ff3366]/10 flex items-center justify-center text-[#ff3366]">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-space)]">4. The Economic Engine: Smart Taxes</h2>
          </div>
          <p className="mb-8 text-[#8A93A6]">
            The smart contract utilizes an asymmetric taxation system to fuel project growth without suffocating trading volume.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-lg font-bold text-white font-[var(--font-space)]">Buy Tax (3%)</span>
              </div>
              <p className="text-sm text-[#8A93A6] mb-4">Incentivizes rapid entry and builds liquidity.</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#00ff88] mt-0.5 shrink-0" /> 1% Auto-Liquidity Pool</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#00ff88] mt-0.5 shrink-0" /> 1% Buyback & Burn Vault</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#00ff88] mt-0.5 shrink-0" /> 1% Marketing & AI Dev</li>
              </ul>
            </div>

            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff3366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-lg font-bold text-white font-[var(--font-space)]">Sell Tax (5%)</span>
              </div>
              <p className="text-sm text-[#8A93A6] mb-4">Builds a firewall and absorbs profit-taking shocks.</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#ff3366] mt-0.5 shrink-0" /> 2% Buyback & Burn Vault</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#ff3366] mt-0.5 shrink-0" /> 2% Marketing & Intervention</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#ff3366] mt-0.5 shrink-0" /> 1% Auto-Liquidity Pool</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 5 */}
        <motion.section variants={fadeUp} className="glass-panel p-8 md:p-10 rounded-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-space)]">5. Security & Anti-Manipulation Shield</h2>
          </div>
          <p className="mb-8 text-[#8A93A6]">
            The smart contract has been programmatically audited to withstand the most severe market attacks and contains the following defensive layers:
          </p>
          <ul className="space-y-6">
            <li>
              <h4 className="text-lg font-bold text-white mb-2">Auto-Buyback & Dual Burn</h4>
              <p className="text-sm text-[#8A93A6]">The contract automatically swallows red candles by purchasing tokens from the pool and burning them forever (sending to 0xdead), reducing supply and increasing price.</p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-white mb-2">Protected Dynamic Limits</h4>
              <p className="text-sm text-[#8A93A6]">Protecting investors in the early days by restricting maxTx and maxWallet limits, with a programmed "hard floor" that prevents malicious trading halts, ensuring security check passage.</p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-white mb-2">Dynamic Anti-Dump Tax</h4>
              <p className="text-sm text-[#8A93A6]">An algorithmic framework that penalizes wallets attempting to dump massive amounts at once, acting as a direct shield for the liquidity pool.</p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-white mb-2">Sell Cooldowns</h4>
              <p className="text-sm text-[#8A93A6]">Preventing wallets from executing consecutive sell operations to break panic sell momentum.</p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-white mb-2">Anti-MEV & Anti-Sniper</h4>
              <p className="text-sm text-[#8A93A6]">Immediate protocol-level bans for bots attempting to steal liquidity or sandwich trades in the initial launch blocks.</p>
            </li>
          </ul>

          <div className="mt-10 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-[#00E5FF] font-[var(--font-space)] mb-6">Guaranteed Immunities (100/100 Audit Score)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00ff88] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">No Minting Functions</h4>
                  <p className="text-xs text-[#8A93A6]">The total supply is strictly hardcapped. It is impossible to print more tokens.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00ff88] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">No Upgradeable Proxies</h4>
                  <p className="text-xs text-[#8A93A6]">The contract logic is immutable. No malicious backdoor changes can be made.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00ff88] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">No Honeypot Risks</h4>
                  <p className="text-xs text-[#8A93A6]">Maximum tax is hardcoded. It is mathematically impossible to raise taxes to 100%.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00ff88] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">No Blacklist Abuse</h4>
                  <p className="text-xs text-[#8A93A6]">Anti-bot measures are purely algorithmic. Legitimate investors can never be frozen.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 6 */}
        <motion.section variants={fadeUp}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
              <Layers size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-space)]">6. Roadmap</h2>
          </div>
          
          <div className="relative border-l border-white/10 ml-4 space-y-12 pb-8">
            <div className="relative pl-8">
              <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]"></div>
              <h3 className="text-xl font-bold text-[#00E5FF] font-[var(--font-space)] mb-2">Phase 1: Foundation</h3>
              <p className="text-sm text-[#8A93A6]">Smart contract engineering, comprehensive security audit, launch of the presale dApp portal with a design reflecting the project's digital identity.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-[#0066FF]"></div>
              <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">Phase 2: Launch</h3>
              <p className="text-sm text-[#8A93A6]">Liquidity locking, public trading activation on PancakeSwap, deployment of the defensive arsenal (Buyback), and launching guerilla marketing campaigns.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-[#0066FF]"></div>
              <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">Phase 3: Expansion</h3>
              <p className="text-sm text-[#8A93A6]">Launching the Staking platform to create an additional supply shock, listing on major tracking sites (CoinMarketCap / CoinGecko).</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-[#0066FF]"></div>
              <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">Phase 4: Utility</h3>
              <p className="text-sm text-[#8A93A6]">Full deployment of AI bots and tools to automate Web3 communities for partner projects across the ecosystem.</p>
            </div>
          </div>
        </motion.section>

      </motion.article>
      </div>
    </main>
  );
}
