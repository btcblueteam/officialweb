import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address provided.' }, { status: 400 });
    }

    // 1. Check if email is already registered in airdrop_claims
    const { data: existingUser } = await supabase
      .from('airdrop_claims')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'This email has already claimed the airdrop.' }, { status: 400 });
    }

    // 2. Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

    // 3. Save to Supabase
    const { error: dbError } = await supabase
      .from('otp_verifications')
      .upsert({ 
        email, 
        otp_code: otpCode, 
        expires_at: expiresAt 
      });

    if (dbError) throw dbError;

    // 4. Send Email via Nodemailer (Hostinger SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Bitcoin Blue" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verify Your Bitcoin Blue Airdrop Allocation',
      html: `
        <div style="background-color: #001f4d; color: #ffffff; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 50px 20px; margin: 0;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #002966; border: 1px solid #004499; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 102, 255, 0.25);">
            <tr>
              <td align="center" style="padding: 40px 0; background: linear-gradient(180deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 41, 102, 1) 100%);">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">BTC<span style="color: #00E5FF;">Blue</span></h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 30px 40px; text-align: center;">
                <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 15px;">Verify Your Email Address</h2>
                <p style="color: #bfdbfe; font-size: 16px; line-height: 1.6; margin-bottom: 35px;">
                  You are one step away from securing your Genesis allocation of <strong style="color: #00E5FF;">$BTCBLUE</strong>. Use the verification code below to complete your Airdrop claim process.
                </p>
                
                <div style="background: linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(0, 229, 255, 0.05) 100%); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 16px; padding: 25px; margin-bottom: 35px; text-align: center;">
                  <span style="font-size: 38px; font-weight: 800; letter-spacing: 12px; color: #ffffff; text-shadow: 0 0 20px rgba(255, 255, 255, 0.6); margin-left: 12px;">${otpCode}</span>
                </div>
                
                <p style="color: #93c5fd; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
                  This code expires in <strong style="color: #ffffff;">5 minutes</strong>.<br>If you did not request this code, please ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 40px; background-color: #001A4D; border-top: 1px solid #003380; text-align: center;">
                <p style="color: #bfdbfe; font-size: 14px; margin-top: 0; margin-bottom: 20px; font-weight: 500;">Join Our Official Channels</p>
                <table align="center" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 0 10px;">
                      <a href="https://x.com/btcblueofficial" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600;">X (Twitter)</a>
                    </td>
                    <td style="padding: 0 10px;">
                      <a href="https://t.me/btcblueofficial" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600;">Telegram</a>
                    </td>
                    <td style="padding: 0 10px;">
                      <a href="https://github.com/btcblueofficial" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600;">Github</a>
                    </td>
                  </tr>
                </table>
                <p style="color: #60a5fa; font-size: 12px; margin-top: 30px; margin-bottom: 0;">
                  &copy; ${new Date().getFullYear()} Bitcoin Blue. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    // Only attempt to send if SMTP credentials are provided, otherwise simulate success for local dev if missing
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP Credentials missing. OTP not sent.");
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully.' });

  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 500 });
  }
}
