import { supabase } from '@/lib/supabase';
import { Wallet, CheckCircle, XCircle } from 'lucide-react';
import { updatePresaleStatus } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminPresalePage() {
  const { data: presales, error } = await supabase
    .from('presale_whitelist')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white font-[var(--font-space)] mb-2">Presale Whitelist</h1>
        <p className="text-[#8A93A6]">Manage presale applications and their statuses.</p>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          Failed to load data: {error.message}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0F1423] text-[#8A93A6] border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Wallet Address</th>
                  <th className="px-6 py-4 font-medium">Email / Contact</th>
                  <th className="px-6 py-4 font-medium">Requested (BNB)</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {presales?.map((presale) => (
                  <tr key={presale.wallet} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-white">
                      {presale.wallet.slice(0, 8)}...{presale.wallet.slice(-6)}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {presale.email}
                      {presale.telegram && <div className="text-xs text-[#8A93A6] mt-1">TG: {presale.telegram}</div>}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-[#00E5FF]">
                      {presale.allocation} BNB
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        presale.status === 'approved' ? 'bg-[#00ff88]/10 text-[#00ff88]' :
                        presale.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {presale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#8A93A6] text-xs">
                      {new Date(presale.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <form action={updatePresaleStatus.bind(null, presale.wallet, 'approved')}>
                          <button type="submit" className="p-2 rounded-lg bg-white/5 hover:bg-[#00ff88]/20 hover:text-[#00ff88] transition-colors text-[#8A93A6]" title="Approve">
                            <CheckCircle size={16} />
                          </button>
                        </form>
                        <form action={updatePresaleStatus.bind(null, presale.wallet, 'rejected')}>
                          <button type="submit" className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors text-[#8A93A6]" title="Reject">
                            <XCircle size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!presales || presales.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#8A93A6]">
                      <Wallet size={32} className="mx-auto mb-3 opacity-50" />
                      No presale applications found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
