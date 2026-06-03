import { supabase } from '@/lib/supabase';
import { Users, Activity, Wallet, ShieldCheck, Database, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';

// Force dynamic rendering so stats are always fresh
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  // Fetch stats using the RPC function we created in setup.sql
  const { data: statsData, error } = await supabase.rpc('get_dashboard_stats');
  
  // Fetch KOL stats separately since it's a new table not in the original RPC
  const { count: kolCount } = await supabase
    .from('kol_applications')
    .select('*', { count: 'exact', head: true });

  // Fallback data if RPC fails or hasn't been created yet
  const stats = statsData || {
    total_airdrop_claims: 0,
    verified_claims: 0,
    total_referrals: 0,
    presale_registrations: 0,
    presale_approved: 0,
    unique_ips: 0
  };

  const statCards = [
    {
      title: "Total Airdrop Claims",
      value: stats.total_airdrop_claims,
      icon: Users,
      color: "from-[#0066FF] to-[#00E5FF]",
      textColor: "text-[#00E5FF]"
    },
    {
      title: "Verified & Approved",
      value: stats.verified_claims,
      icon: ShieldCheck,
      color: "from-[#00ff88] to-[#00cc66]",
      textColor: "text-[#00ff88]"
    },
    {
      title: "Presale Applications",
      value: stats.presale_registrations,
      icon: Wallet,
      color: "from-[#7000FF] to-[#B300FF]",
      textColor: "text-[#B300FF]"
    },
    {
      title: "KOL Partnerships",
      value: kolCount || 0,
      icon: TrendingUp,
      color: "from-[#FF007A] to-[#FF6B00]",
      textColor: "text-[#FF007A]"
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-[var(--font-space)] mb-2">Command Center</h1>
          <p className="text-[#8A93A6]">Real-time metrics for Airdrop and Presale operations.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1423] border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
          <span className="text-sm font-mono text-[#00ff88]">System Online</span>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          Warning: Could not fetch live database stats. Did you run the SQL setup script?
          <br/>
          <span className="font-mono text-xs mt-2 block opacity-80">Error: {error.message || JSON.stringify(error)}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
              
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#8A93A6] text-sm font-medium">{stat.title}</p>
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.textColor}`}>
                  <Icon size={16} />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white font-[var(--font-space)]">{stat.value.toLocaleString()}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Health */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-[#00E5FF]" size={20} />
            <h3 className="text-lg font-bold text-white font-[var(--font-space)]">Network Health</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0F1423] border border-white/5">
              <div className="flex items-center gap-3">
                <Database size={16} className="text-[#8A93A6]" />
                <span className="text-sm text-white">Unique IP Addresses</span>
              </div>
              <span className="font-mono text-[#00E5FF]">{stats.unique_ips}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0F1423] border border-white/5">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-[#8A93A6]" />
                <span className="text-sm text-white">Presale Approved</span>
              </div>
              <span className="font-mono text-[#00ff88]">{stats.presale_approved}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center">
           <BarChart3 className="text-[#8A93A6] w-12 h-12 mb-4 opacity-50" />
           <p className="text-[#8A93A6] max-w-sm text-sm">
             Use the sidebar navigation to manage specific airdrop claims, review presale whitelists, or adjust dynamic system settings.
           </p>
        </div>
      </div>
    </div>
  );
}
