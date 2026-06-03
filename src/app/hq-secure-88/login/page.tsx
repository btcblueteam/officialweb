"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/hq-secure-88/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Success, redirect to dashboard
      router.push('/hq-secure-88');
      router.refresh(); // Force refresh to update middleware state in client router
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#070A11]">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative z-10 shadow-[0_0_50px_rgba(0,102,255,0.1)]"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00E5FF] p-[1px] mb-6">
            <div className="w-full h-full bg-[#0F1423] rounded-2xl flex items-center justify-center">
              <Lock className="text-[#00E5FF]" size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-space)] mb-2">Admin Portal</h1>
          <p className="text-[#8A93A6] text-sm">Restricted access. Enter the master password to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">Master Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0F1423] border border-white/10 rounded-xl p-4 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:shadow-none active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
