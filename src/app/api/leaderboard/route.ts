import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const revalidate = 60; // Cache this route for 60 seconds

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('airdrop_claims')
      .select('wallet_address, tier1_referrals_count, tier2_referrals_count, total_reward')
      .order('total_reward', { ascending: false })
      .limit(50);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Leaderboard fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
