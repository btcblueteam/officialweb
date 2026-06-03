import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ethers } from 'ethers';

// Helper function to safely get environment variables
const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing critical environment variable: ${name}`);
    return '';
  }
  return value;
};

export async function POST(req: Request) {
  try {
    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    // 1. Fetch user's total_reward from airdrop_claims
    const { data: userData, error } = await supabase
      .from('airdrop_claims')
      .select('total_reward, is_claimed')
      .eq('wallet_address', walletAddress)
      .single();

    if (error || !userData) {
      return NextResponse.json(
        { error: 'User not registered for airdrop or verification pending.' },
        { status: 404 }
      );
    }

    if (userData.is_claimed) {
      return NextResponse.json(
        { error: 'Airdrop has already been claimed for this wallet.' },
        { status: 400 }
      );
    }

    const totalRewardAmountStr = userData.total_reward.toString();
    
    // Parse to 18 decimals precisely for the Smart Contract
    const amountInWei = ethers.parseUnits(totalRewardAmountStr, 18);

    // 2. Generate ECDSA Signature
    const privateKey = getEnvVar('SIGNER_PRIVATE_KEY');
    if (!privateKey) {
      return NextResponse.json({ error: 'Server configuration error: SIGNER_PRIVATE_KEY missing.' }, { status: 500 });
    }

    const wallet = new ethers.Wallet(privateKey);

    // This MUST exactly match the keccak256(abi.encodePacked(...)) in Airdrop.sol
    const messageHash = ethers.solidityPackedKeccak256(
      ['address', 'uint256'],
      [walletAddress, amountInWei]
    );

    // Sign the message hash
    const signature = await wallet.signMessage(ethers.getBytes(messageHash));

    return NextResponse.json({
      success: true,
      amount: amountInWei.toString(),
      signature: signature
    });

  } catch (error: any) {
    console.error('Signature Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate signature.' },
      { status: 500 }
    );
  }
}
