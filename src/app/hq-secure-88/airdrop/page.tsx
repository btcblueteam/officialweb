import { supabase } from '@/lib/supabase';
import { Users, Trash2, ShieldAlert } from 'lucide-react';
import { deleteAirdropClaim } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminAirdropPage() {
  const { data: claims, error } = await supabase
    .from('airdrop_claims')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-[var(--font-space)] mb-2">Airdrop Claims</h1>
          <p className="text-[#8A93A6]">Monitor all airdrop participants and detect Sybil attacks.</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
          <ShieldAlert size={16} /> Anti-Sybil Active
        </div>
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
                  <th className="px-6 py-4 font-medium">IP Address</th>
                  <th className="px-6 py-4 font-medium">Referrals (T1/T2)</th>
                  <th className="px-6 py-4 font-medium">Tokens Earned</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {claims?.map((claim) => (
                  <tr key={claim.wallet_address} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-white">
                      {claim.wallet_address.slice(0, 8)}...{claim.wallet_address.slice(-6)}
                    </td>
                    <td className="px-6 py-4 text-[#00E5FF] font-mono text-xs">
                      {claim.ip_address}
                    </td>
                    <td className="px-6 py-4 text-white">
                      <span className="text-[#00ff88]">{claim.tier1_referrals_count}</span> / <span className="text-[#0066FF]">{claim.tier2_referrals_count}</span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-[#FF007A]">
                      {claim.total_tokens_earned} BTCBLUE
                    </td>
                    <td className="px-6 py-4 text-[#8A93A6] text-xs">
                      {new Date(claim.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end">
                        <form action={deleteAirdropClaim.bind(null, claim.wallet_address)}>
                          <button 
                            type="submit" 
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-colors text-red-400" 
                            title="Delete Claim (Fraud)"
                          >
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!claims || claims.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#8A93A6]">
                      <Users size={32} className="mx-auto mb-3 opacity-50" />
                      No airdrop claims found.
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
