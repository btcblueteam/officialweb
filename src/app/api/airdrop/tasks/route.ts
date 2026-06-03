import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { walletAddress, tweetUrl } = await req.json();

    if (!walletAddress || !tweetUrl) {
      return NextResponse.json({ error: 'Wallet address and Tweet URL are required.' }, { status: 400 });
    }

    if (!tweetUrl.includes('x.com/') && !tweetUrl.includes('twitter.com/')) {
      return NextResponse.json({ error: 'Invalid Tweet URL. Must be from x.com or twitter.com.' }, { status: 400 });
    }

    // 1. Check if the user is actually registered
    const { data: userData, error: userError } = await supabase
      .from('airdrop_claims')
      .select('total_reward')
      .eq('wallet_address', walletAddress)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User is not registered for the Airdrop.' }, { status: 404 });
    }

    // 2. Insert the task to ensure uniqueness of the tweet URL
    const rewardAmount = 0.5;

    const { error: insertError } = await supabase
      .from('airdrop_tasks')
      .insert([
        {
          wallet_address: walletAddress,
          tweet_url: tweetUrl,
          reward_amount: rewardAmount
        }
      ]);

    if (insertError) {
      // Postgres error code 23505 is unique violation
      if (insertError.code === '23505') {
        return NextResponse.json({ error: 'This Tweet URL has already been submitted.' }, { status: 400 });
      }
      throw insertError;
    }

    // 3. Update the user's total_reward in airdrop_claims
    const newTotal = Number(userData.total_reward) + rewardAmount;
    const { error: updateError } = await supabase
      .from('airdrop_claims')
      .update({ total_reward: newTotal })
      .eq('wallet_address', walletAddress);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      message: 'Task successfully submitted! 0.5 BTCBLUE added.',
      newTotal
    });

  } catch (error: any) {
    console.error('Task Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to process task submission. Please try again.' },
      { status: 500 }
    );
  }
}
