"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Terminal, Shield, Cpu, Sparkles, Bell, CheckCircle2, ArrowRight, Layers, Zap } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setEmail('');
    }
  };

  return (
    <main className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 lg:px-8 overflow-hidden flex flex-col justify-between">
      {/* Background Ambient Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#0066FF]/20 to-[#00E5FF]/10 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10 my-auto py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors mb-12 font-medium group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Hero Coming Soon Section */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00E5FF] text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(0,102,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping"></span>
            Ecosystem 2.0 • Under Development
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl md:text-7xl font-bold text-white font-[var(--font-space)] leading-[1.1] tracking-tight mb-6">
            The Future of Web3 AI is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00E5FF]">
              Arriving Soon.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[#8A93A6] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-[var(--font-inter)]">
            We are actively engineering a revolutionary zero-install ecosystem powered by deep learning models and institutional-grade smart contracts.
          </motion.p>

          {/* Notification Form */}
          <motion.div variants={fadeUp} className="max-w-md mx-auto mb-16">
            {submitted ? (
              <div className="glass-panel p-4 rounded-2xl border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center gap-3 font-semibold text-sm animate-fade-in">
                <CheckCircle2 size={20} />
                You&apos;re on the VIP priority list! We&apos;ll notify you at launch.
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access..."
                    className="w-full px-5 py-4 rounded-xl bg-[#0F1423]/80 border border-white/10 text-white placeholder-[#8A93A6] text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00A3FF] hover:from-[#0052CC] hover:to-[#008AE6] text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] flex items-center justify-center gap-2 shrink-0"
                >
                  <Bell size={16} /> Notify Me
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Development Progress Grid */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Module 1 */}
          <motion.div variants={fadeUp} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 blur-[40px] rounded-full"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88]">
                <Shield size={24} />
              </div>
              <span className="px-2.5 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-bold uppercase tracking-widest">
                100% Live
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">Core Smart Contracts</h3>
            <p className="text-[#8A93A6] text-sm leading-relaxed mb-6">
              Institutional-grade tokenomics, auto-buyback algorithms, and anti-MEV barriers deployed and verified on BSC.
            </p>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00ff88] h-full width-[100%] shadow-[0_0_10px_#00ff88]"></div>
            </div>
          </motion.div>

          {/* Module 2 */}
          <motion.div variants={fadeUp} className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#0066FF]/30 relative overflow-hidden group shadow-[0_0_30px_rgba(0,102,255,0.1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/10 blur-[40px] rounded-full"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-[#00E5FF]">
                <Bot size={24} />
              </div>
              <span className="px-2.5 py-1 rounded bg-[#0066FF]/20 text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest animate-pulse">
                In Progress (85%)
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">AI Community Bots</h3>
            <p className="text-[#8A93A6] text-sm leading-relaxed mb-6">
              Deep learning models training for automated moderation, sentiment tracking, and dynamic community reward targeting.
            </p>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#0066FF] to-[#00E5FF] h-full w-[85%] shadow-[0_0_10px_#0066FF]"></div>
            </div>
          </motion.div>

          {/* Module 3 */}
          <motion.div variants={fadeUp} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 blur-[40px] rounded-full"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8A93A6]">
                <Terminal size={24} />
              </div>
              <span className="px-2.5 py-1 rounded bg-white/5 text-[#8A93A6] text-[10px] font-bold uppercase tracking-widest">
                Upcoming Phase
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-[var(--font-space)] mb-2">Zero-Install Staking</h3>
            <p className="text-[#8A93A6] text-sm leading-relaxed mb-6">
              Cloud-native staking vaults allowing instant reward compounding directly via the web terminal without downloads.
            </p>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#8A93A6] h-full w-[25%]"></div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </main>
  );
}
