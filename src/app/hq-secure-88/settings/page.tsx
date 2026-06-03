"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2, ShieldAlert, Wallet, Play, Square, Unlock, DollarSign } from 'lucide-react';
import { connectWallet, getContract } from '@/lib/web3';
import { CONTRACT_ADDRESSES, PRESALE_ABI } from '@/lib/abis';
import { updateMultipleSiteSettings } from '../actions';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Web3 Admin State
  const [adminWallet, setAdminWallet] = useState<string | null>(null);
  const [txLoading, setTxLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('key, value');
      if (error) throw error;
      
      const settingsObj: Record<string, string> = {};
      data?.forEach(item => {
        settingsObj[item.key] = item.value;
      });
      
      setSettings(settingsObj);
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    try {
      // For a production app, this should go through a secure API route
      // But since this is an admin panel, we can update directly if RLS allows
      // or we can just send it to a backend route.
      // Assuming RLS allows update from API for now as per setup.sql
      
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString()
      }));

      const result = await updateMultipleSiteSettings(updates);

      if (!result.success) throw new Error(result.error);
      
      setMessage({ text: 'Settings updated successfully!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to save settings.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleWeb3Action = async (action: string) => {
    if (!adminWallet) {
      setMessage({ text: 'Please connect your admin wallet first.', type: 'error' });
      return;
    }
    
    setTxLoading(true);
    setMessage({ text: 'Waiting for transaction confirmation...', type: 'success' });
    
    try {
      const contract = await getContract(CONTRACT_ADDRESSES.PRESALE, PRESALE_ABI, true);
      if (!contract) {
        throw new Error("Web3 provider not found. Please connect MetaMask.");
      }
      let tx;
      
      switch (action) {
        case 'start':
          tx = await contract.startPresale();
          break;
        case 'end':
          tx = await contract.endPresale();
          break;
        case 'claim':
          tx = await contract.enableClaim();
          break;
      }
      
      await tx.wait();
      setMessage({ text: `Transaction successful! (${action})`, type: 'success' });
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message || 'Transaction failed. Are you the owner?', type: 'error' });
    } finally {
      setTxLoading(false);
    }
  };

  const connectAdminWallet = async () => {
    const address = await connectWallet();
    if (address) setAdminWallet(address);
  };

  if (isLoading) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#00E5FF]" size={32} /></div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white font-[var(--font-space)] mb-2">System Settings</h1>
        <p className="text-[#8A93A6]">Dynamically configure the platform mechanics without touching code.</p>
      </div>

      {message.text && (
        <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 ${
          message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-[#00ff88]/10 border-[#00ff88]/20 text-[#00ff88]'
        }`}>
          <ShieldAlert size={18} />
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col gap-6">
        
        {/* Toggles */}
        <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">Presale UI Mode</label>
            <select 
              value={settings['presale_mode'] || 'whitelist'} 
              onChange={(e) => handleChange('presale_mode', e.target.value)}
              className="bg-[#0F1423] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#00E5FF]"
            >
              <option value="whitelist">Whitelist Mode (Email Form)</option>
              <option value="active">Active Mode (Web3 Buy Interface)</option>
            </select>
            <p className="text-xs text-[#8A93A6] mt-1">Controls what public users see at /presale</p>
          </div>
        </div>

        {/* Security / Sybil */}
        <h3 className="text-white font-bold font-[var(--font-space)] mt-2">Sybil Protections</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">Max Wallets Per IP</label>
            <input 
              type="number" 
              value={settings['max_wallets_per_ip'] || '1'} 
              onChange={(e) => handleChange('max_wallets_per_ip', e.target.value)}
              className="bg-[#0F1423] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#00E5FF]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">Min BNB Balance</label>
            <input 
              type="text" 
              value={settings['min_bnb_balance'] || '0.001'} 
              onChange={(e) => handleChange('min_bnb_balance', e.target.value)}
              className="bg-[#0F1423] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>



        <button 
          type="submit" 
          disabled={isSaving}
          className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save UI Configuration
        </button>
      </form>

      {/* Web3 Contract Controls */}
      <div className="mt-8 glass-panel p-8 rounded-2xl border border-red-500/20 bg-[#1A0A0A]/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-bold font-[var(--font-space)] text-xl text-red-400">Web3 Contract Controls</h3>
            <p className="text-[#8A93A6] text-sm mt-1">Directly interact with the Smart Contract. Requires Owner Wallet.</p>
          </div>
          <button 
            type="button"
            onClick={connectAdminWallet}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white flex items-center gap-2 transition-colors"
          >
            <Wallet size={16} />
            {adminWallet ? `${adminWallet.slice(0, 6)}...${adminWallet.slice(-4)}` : 'Connect Owner Wallet'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            type="button"
            onClick={() => handleWeb3Action('start')}
            disabled={!adminWallet || txLoading}
            className="p-4 rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 hover:bg-[#00ff88]/20 text-[#00ff88] font-bold flex flex-col items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Play size={24} />
            Start Presale
          </button>

          <button 
            type="button"
            onClick={() => handleWeb3Action('end')}
            disabled={!adminWallet || txLoading}
            className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold flex flex-col items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Square size={24} />
            End Presale
          </button>

          <button 
            type="button"
            onClick={() => handleWeb3Action('claim')}
            disabled={!adminWallet || txLoading}
            className="p-4 rounded-xl border border-[#00E5FF]/30 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] font-bold flex flex-col items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Unlock size={24} />
            Enable Claiming
          </button>
        </div>
      </div>
    </div>
  );
}
