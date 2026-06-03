"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Network, Send, User, Mail, MessageSquare, Globe2, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PartnersPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    telegram: '',
    twitterLink: '',
    primaryPlatform: 'Twitter',
    followersCount: '',
    walletAddress: '',
    proposal: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070A11] relative overflow-hidden flex flex-col items-center pt-24 pb-20 px-6 lg:px-8">
      
      {/* Back to Home Link */}
      <div className="w-full max-w-6xl mx-auto mb-8 relative z-50">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8A93A6] hover:text-white transition-colors font-medium">
          <ArrowLeft size={18} />
          Back to Portal
        </Link>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#00E5FF]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Info & Benefits */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-bold uppercase tracking-widest w-max">
              <Network size={14} />
              Ambassador Program
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[var(--font-space)] leading-[1.1] tracking-tight">
              Strategic <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00E5FF]">KOL Partnerships</span>
            </h1>
            
            <p className="text-[#8A93A6] text-lg leading-relaxed max-w-lg mt-2">
              We are building a powerful network of visionary influencers and Web3 leaders to drive the global adoption of Bitcoin Blue. Apply now to join our exclusive inner circle.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F1423] border border-white/5 flex items-center justify-center shrink-0 text-[#00E5FF]">
                  <Globe2 size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Global Reach</h3>
                  <p className="text-[#8A93A6] text-sm leading-relaxed">Partner with a project designed for institutional-grade scaling and worldwide adoption.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F1423] border border-white/5 flex items-center justify-center shrink-0 text-[#0066FF]">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Exclusive Allocations</h3>
                  <p className="text-[#8A93A6] text-sm leading-relaxed">Gain access to private rounds, reserved ambassador tokens, and early ecosystem drops.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F1423] border border-white/5 flex items-center justify-center shrink-0 text-[#00ff88]">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Direct Team Access</h3>
                  <p className="text-[#8A93A6] text-sm leading-relaxed">Work directly with the core development team and influence the roadmap of Bitcoin Blue.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Application Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="glass-panel bg-[#070A11]/90 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/5 blur-[60px] rounded-full pointer-events-none"></div>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-6 relative z-10">
                  <div className="w-24 h-24 rounded-full bg-[#00E5FF]/10 flex items-center justify-center border border-[#00E5FF]/30 mb-2">
                    <CheckCircle2 size={48} className="text-[#00E5FF]" />
                  </div>
                  <h3 className="text-3xl font-bold text-white font-[var(--font-space)]">Application Sent!</h3>
                  <p className="text-[#8A93A6] text-lg max-w-sm leading-relaxed">
                    Thank you for applying. Our team will review your profile and contact you via Telegram if there is a strategic fit.
                  </p>
                  <p className="text-[#00E5FF] text-sm mt-2">A confirmation email has been sent to your inbox.</p>
                  <button 
                    onClick={() => { setIsSuccess(false); setForm({fullName:'', email:'', telegram:'', twitterLink:'', primaryPlatform:'Twitter', followersCount:'', walletAddress:'', proposal:''}); }}
                    className="mt-6 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-colors"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 font-[var(--font-space)]">KOL Application</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">Full Name / Alias *</label>
                      <input 
                        type="text" required
                        value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})}
                        className="bg-[#0F1423] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-[#00E5FF] outline-none transition-all" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">Email Address *</label>
                      <input 
                        type="email" required
                        value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                        className="bg-[#0F1423] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-[#00E5FF] outline-none transition-all" 
                        placeholder="contact@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">Telegram Handle *</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-[#8A93A6]">@</span>
                        <input 
                          type="text" required
                          value={form.telegram} onChange={(e) => setForm({...form, telegram: e.target.value.replace('@', '')})}
                          className="w-full bg-[#0F1423] border border-white/10 rounded-xl p-3.5 pl-9 text-white text-sm focus:border-[#00E5FF] outline-none transition-all" 
                          placeholder="username"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">Primary Platform *</label>
                      <select 
                        value={form.primaryPlatform} onChange={(e) => setForm({...form, primaryPlatform: e.target.value})}
                        className="bg-[#0F1423] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-[#00E5FF] outline-none transition-all appearance-none"
                      >
                        <option value="Twitter">Twitter / X</option>
                        <option value="YouTube">YouTube</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Telegram_Channel">Telegram Channel</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">Platform Link *</label>
                      <input 
                        type="url" required
                        value={form.twitterLink} onChange={(e) => setForm({...form, twitterLink: e.target.value})}
                        className="bg-[#0F1423] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-[#00E5FF] outline-none transition-all" 
                        placeholder="https://x.com/..."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">Followers / Audience Size *</label>
                      <input 
                        type="text" required
                        value={form.followersCount} onChange={(e) => setForm({...form, followersCount: e.target.value})}
                        className="bg-[#0F1423] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-[#00E5FF] outline-none transition-all" 
                        placeholder="e.g. 50k, 100k+"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">BSC Wallet Address (Optional)</label>
                    <input 
                      type="text"
                      value={form.walletAddress} onChange={(e) => setForm({...form, walletAddress: e.target.value})}
                      className="bg-[#0F1423] border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-[#00E5FF] outline-none transition-all" 
                      placeholder="0x..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#8A93A6] font-bold uppercase tracking-wider">How can you help Bitcoin Blue? *</label>
                    <textarea 
                      required rows={4}
                      value={form.proposal} onChange={(e) => setForm({...form, proposal: e.target.value})}
                      className="bg-[#0F1423] border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#00E5FF] outline-none transition-all resize-none" 
                      placeholder="Briefly describe your proposal or how you plan to promote the project..."
                    ></textarea>
                  </div>

                  {errorMsg && (
                    <div className="p-3 mt-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                      {errorMsg}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white font-bold text-lg hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : (
                      <>Submit Application <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
