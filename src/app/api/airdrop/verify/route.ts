import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Security Configurations
const MAX_CLAIMS_PER_IP = 3;

// Halving Tokenomics Config (Total Users -> Epoch)
const EPOCHS = [
  { maxUsers: 5000, base: 0.25, tier1: 1.5, tier2: 0.1 },
  { maxUsers: 15000, base: 0.125, tier1: 0.75, tier2: 0.05 },
  { maxUsers: Infinity, base: 0.0625, tier1: 0.375, tier2: 0.025 }
];

export async function POST(req: Request) {
  try {
    const { email, otpCode, tweetUrl, walletAddress, referredBy } = await req.json();
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';

    if (!email || !otpCode || !tweetUrl || !walletAddress) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Basic Tweet URL Validation
    if (!tweetUrl.includes('x.com/') && !tweetUrl.includes('twitter.com/')) {
      return NextResponse.json({ error: 'Invalid Tweet URL provided.' }, { status: 400 });
    }

    // ── 1. Validate OTP ──────────────────────────────────────────────
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('email', email)
      .eq('otp_code', otpCode)
      .single();

    if (otpError || !otpRecord) {
      return NextResponse.json({ error: 'Invalid OTP code.' }, { status: 400 });
    }

    if (new Date(otpRecord.expires_at) < new Date()) {
      return NextResponse.json({ error: 'OTP code has expired. Please request a new one.' }, { status: 400 });
    }

    // ── 2. Deduplication Checks ──────────────────────────────────────
    const { data: existingChecks } = await supabase
      .from('airdrop_claims')
      .select('email, tweet_url, wallet_address')
      .or(`email.eq.${email},tweet_url.eq.${tweetUrl},wallet_address.eq.${walletAddress}`);

    if (existingChecks && existingChecks.length > 0) {
      const match = existingChecks[0];
      if (match.email === email) return NextResponse.json({ error: 'Email already used.' }, { status: 400 });
      if (match.tweet_url === tweetUrl) return NextResponse.json({ error: 'Tweet URL already used by another wallet.' }, { status: 400 });
      if (match.wallet_address === walletAddress) return NextResponse.json({ error: 'Wallet already registered.' }, { status: 400 });
    }

    // ── 3. IP Sybil Shield ───────────────────────────────────────────
    const { count: ipCount } = await supabase
      .from('airdrop_claims')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ipAddress);

    if (ipCount !== null && ipCount >= MAX_CLAIMS_PER_IP) {
      return NextResponse.json({ error: 'IP Rate Limit Exceeded: Maximum 3 claims allowed per network.' }, { status: 429 });
    }

    // ── 4. Fractional Halving Tokenomics ─────────────────────────────
    const { count: totalUsers } = await supabase
      .from('airdrop_claims')
      .select('*', { count: 'exact', head: true });

    const currentTotal = totalUsers || 0;
    const epoch = EPOCHS.find(e => currentTotal < e.maxUsers) || EPOCHS[2];

    const baseReward = epoch.base;
    const tier1Bonus = epoch.tier1;
    const tier2Bonus = epoch.tier2;

    // ── 5. Process Referrals ─────────────────────────────────────────
    let tier1Referrer = referredBy || null;
    let tier2Referrer = null;

    if (tier1Referrer) {
      const { data: t1Data } = await supabase
        .from('airdrop_claims')
        .select('referrer_wallet')
        .eq('wallet_address', tier1Referrer)
        .single();
      
      if (t1Data && t1Data.referrer_wallet) {
        tier2Referrer = t1Data.referrer_wallet;
      }
    }

    // ── 6. Database Insertion ────────────────────────────────────────
    const { error: insertError } = await supabase
      .from('airdrop_claims')
      .insert([{
        wallet_address: walletAddress,
        email: email,
        tweet_url: tweetUrl,
        ip_address: ipAddress,
        referrer_wallet: tier1Referrer,
        tier1_referrals_count: 0,
        tier2_referrals_count: 0,
        base_reward: baseReward,
        total_reward: baseReward, // Starts with base reward, increases as others use their link
        is_claimed: false
      }]);

    if (insertError) throw insertError;

    // ── 7. Atomic RPC to Process Referral Bonuses for Upstream ───────
    if (tier1Referrer) {
      await supabase.rpc('process_referral_v2', {
        new_wallet: walletAddress,
        t1_wallet: tier1Referrer,
        t1_bonus: tier1Bonus,
        t2_wallet: tier2Referrer,
        t2_bonus: tier2Bonus
      });
    }

    // Cleanup OTP to prevent reuse
    await supabase.from('otp_verifications').delete().eq('email', email);

    return NextResponse.json({ 
      success: true, 
      message: 'Verification successful! You secured your allocation.' 
    });

  } catch (error: any) {
    console.error('Verify Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
