import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      fullName, 
      email, 
      telegram, 
      twitterLink, 
      primaryPlatform, 
      followersCount, 
      walletAddress, 
      proposal 
    } = body;

    // Basic Validation
    if (!fullName || !email || !telegram || !twitterLink || !followersCount) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    // Insert into database
    const { data, error } = await supabase
      .from('kol_applications')
      .insert([
        {
          full_name: fullName,
          email,
          telegram,
          twitter_link: twitterLink,
          primary_platform: primaryPlatform || 'Twitter',
          followers_count: followersCount,
          wallet_address: walletAddress || null,
          proposal: proposal || null
        }
      ]);

    if (error) {
      console.error('Supabase error inserting KOL:', error);
      return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 500 });
    }

    // Send Confirmation Email
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
      from: '"Bitcoin Blue Team" <team@btcblue.io>',
      to: email,
      subject: 'Partnership Application Received - Bitcoin Blue',
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
                <div style="display: inline-block; padding: 8px 16px; background-color: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 50px; color: #00E5FF; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 25px;">
                  Application Received
                </div>
                <h2 style="color: #ffffff; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px;">Hello ${fullName},</h2>
                <p style="color: #bfdbfe; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
                  Thank you for applying to join the <strong>Bitcoin Blue Strategic KOL Partnerships Program</strong>. We have received your application and our team is currently reviewing your profile.
                </p>
                
                <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 25px; margin-bottom: 30px; text-align: left;">
                  <p style="color: #60a5fa; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0; font-weight: 600;">Application Status</p>
                  <p style="color: #00E5FF; font-size: 18px; font-weight: 700; margin: 0 0 20px 0;">Under Review ⏳</p>

                  <p style="color: #60a5fa; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0; font-weight: 600;">Next Steps</p>
                  <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0;">We process applications carefully to ensure the highest quality partnerships. If selected, our team will reach out to you directly via our official email.</p>
                </div>
                
                <p style="color: #93c5fd; font-size: 15px; line-height: 1.6; margin-bottom: 0;">
                  Thank you for your interest in building the future of Web3 with Bitcoin Blue.
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

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP Credentials missing. Simulated KOL Confirmation Email for:", email);
    }

    return NextResponse.json({ success: true, message: 'Application submitted successfully.' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
