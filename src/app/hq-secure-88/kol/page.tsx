import { supabase } from '@/lib/supabase';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { updateKolStatus } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminKolPage() {
  const { data: kols, error } = await supabase
    .from('kol_applications')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white font-[var(--font-space)] mb-2">KOL Applications</h1>
        <p className="text-[#8A93A6]">Manage influencer and ambassador partnership requests.</p>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          Failed to load data: {error.message}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {kols?.map((kol) => (
            <div key={kol.id} className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{kol.full_name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="text-[#00E5FF] font-medium">{kol.primary_platform}</span>
                    <span className="text-[#8A93A6]">•</span>
                    <span className="text-white">{kol.followers_count} Followers</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    kol.status === 'approved' ? 'bg-[#00ff88]/10 text-[#00ff88]' :
                    kol.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {kol.status}
                  </span>
                  
                  <div className="flex gap-2">
                    <form action={updateKolStatus.bind(null, kol.id, 'approved')}>
                      <button type="submit" className="p-2 rounded-lg bg-white/5 hover:bg-[#00ff88]/20 hover:text-[#00ff88] transition-colors text-[#8A93A6]" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                    </form>
                    <form action={updateKolStatus.bind(null, kol.id, 'rejected')}>
                      <button type="submit" className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors text-[#8A93A6]" title="Reject">
                        <XCircle size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0F1423]/50 rounded-xl p-5 border border-white/5">
                <div>
                  <p className="text-xs text-[#8A93A6] uppercase tracking-wider font-bold mb-1">Contact Info</p>
                  <p className="text-white text-sm">{kol.email}</p>
                  <p className="text-[#00E5FF] text-sm mt-1">@{kol.telegram}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8A93A6] uppercase tracking-wider font-bold mb-1">Social Link</p>
                  <a href={kol.twitter_link} target="_blank" rel="noreferrer" className="text-[#0066FF] hover:underline text-sm truncate block">
                    {kol.twitter_link}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[#8A93A6] uppercase tracking-wider font-bold mb-1">Wallet Address</p>
                  <p className="text-white font-mono text-xs opacity-80 break-all">
                    {kol.wallet_address || 'Not Provided'}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs text-[#8A93A6] uppercase tracking-wider font-bold mb-2">Proposal</p>
                <div className="p-4 rounded-xl bg-white/5 text-sm text-white/90 whitespace-pre-wrap leading-relaxed border border-white/5">
                  {kol.proposal}
                </div>
              </div>
            </div>
          ))}

          {(!kols || kols.length === 0) && (
            <div className="py-12 text-center text-[#8A93A6] glass-panel rounded-2xl border border-white/10">
              <ShieldAlert size={32} className="mx-auto mb-3 opacity-50" />
              No KOL applications found yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
