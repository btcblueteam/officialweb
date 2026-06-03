import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('wallet');

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('airdrop_claims')
      .select('email, tweet_url, tier1_referrals_count, tier2_referrals_count, total_reward, is_claimed, created_at')
      .eq('wallet_address', walletAddress)
      .single();

    if (error) {
      // If no rows found, Supabase returns PGRST116 for .single()
      if (error.code === 'PGRST116') {
         return NextResponse.json({ registered: false });
      }
      throw error;
    }

    return NextResponse.json({
      registered: true,
      userData: data
    });

  } catch (error: any) {
    console.error('Fetch User Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
