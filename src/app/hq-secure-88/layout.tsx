"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, Menu, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If we are on the login page, don't render the sidebar
  if (pathname === '/hq-secure-88/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/hq-secure-88/logout', { method: 'POST' });
    router.push('/hq-secure-88/login');
    router.refresh();
  };

  const navLinks = [
    { name: 'Overview', href: '/hq-secure-88', icon: LayoutDashboard },
    { name: 'Presale Whitelist', href: '/hq-secure-88/presale', icon: CreditCard },
    { name: 'Airdrop Claims', href: '/hq-secure-88/airdrop', icon: Users },
    { name: 'KOL Applications', href: '/hq-secure-88/kol', icon: ShieldAlert },
    { name: 'Settings', href: '/hq-secure-88/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0F1423] border-r border-white/10 w-64 p-6 shrink-0 relative z-50">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00E5FF] p-[1px]">
          <div className="w-full h-full bg-[#070A11] rounded-xl flex items-center justify-center">
            <ShieldAlert className="text-[#00E5FF]" size={20} />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white font-[var(--font-space)] tracking-wide">BTCBLUE</h2>
          <p className="text-[10px] text-[#8A93A6] uppercase tracking-widest">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#0066FF]/10 text-[#00E5FF] border border-[#0066FF]/20'
                  : 'text-[#8A93A6] hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent transition-all mt-auto"
      >
        <LogOut size={18} />
        Secure Logout
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#070A11] relative z-20">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0F1423] border-b border-white/10 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-[#00E5FF]" size={20} />
          <h2 className="font-bold text-white text-sm">Admin Portal</h2>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 text-white">
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] md:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="h-full w-64 absolute left-0"
            >
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-[-48px] p-2 bg-[#0F1423] rounded-xl text-white border border-white/10"
              >
                <X size={24} />
              </button>
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden min-w-0 pt-16 md:pt-0">
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
