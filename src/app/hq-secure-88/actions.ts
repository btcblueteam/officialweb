"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

// Initialize a Supabase client with the SERVICE_ROLE_KEY to bypass RLS.
// WARNING: This client should ONLY be used in server actions that are protected
// by the admin authentication layer. Do not expose this to the client.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function updatePresaleStatus(wallet: string, status: 'pending' | 'approved' | 'rejected') {
  const { error } = await supabaseAdmin
    .from('presale_whitelist')
    .update({ status })
    .eq('wallet', wallet);

  if (error) {
    console.error('Failed to update presale status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/hq-secure-88/presale');
  return { success: true };
}

export async function updateKolStatus(id: number, status: 'pending' | 'approved' | 'rejected') {
  const { error } = await supabaseAdmin
    .from('kol_applications')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Failed to update KOL status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/hq-secure-88/kol');
  return { success: true };
}

export async function deleteAirdropClaim(wallet: string) {
  const { error } = await supabaseAdmin
    .from('airdrop_claims')
    .delete()
    .eq('wallet_address', wallet);

  if (error) {
    console.error('Failed to delete airdrop claim:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/hq-secure-88/airdrop');
  return { success: true };
}

export async function updateSiteSetting(key: string, value: string) {
  const { error } = await supabaseAdmin
    .from('site_settings')
    .update({ value })
    .eq('key', key);

  if (error) {
    console.error('Failed to update site setting:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/hq-secure-88/settings');
  revalidatePath('/hq-secure-88');
  return { success: true };
}

export async function updateMultipleSiteSettings(updates: { key: string; value: string }[]) {
  const { error } = await supabaseAdmin
    .from('site_settings')
    .upsert(updates);

  if (error) {
    console.error('Failed to update multiple site settings:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/hq-secure-88/settings');
  revalidatePath('/hq-secure-88');
  return { success: true };
}
