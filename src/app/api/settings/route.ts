import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET the current site settings (public)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Setting key is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('setting_value')
    .eq('setting_key', key)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Row not found, return default for presale_mode
      if (key === 'presale_mode') {
        return NextResponse.json({ value: { mode: 'whitelist' } });
      }
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ value: data.setting_value });
}

// POST update the site settings (protected by JWT admin token)
export async function POST(request: Request) {
  try {
    // Verify admin authentication via cookie
    const cookieHeader = request.headers.get('cookie') || '';
    const adminToken = cookieHeader.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1];
    
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized — no admin session found.' }, { status: 401 });
    }

    const { key, value } = await request.json();

    if (!key || !value) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('site_settings')
      .upsert({ 
        setting_key: key, 
        setting_value: value,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'setting_key'
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
