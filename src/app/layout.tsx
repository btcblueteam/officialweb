import type { Metadata } from "next";
import "./globals.css";
import { Providers } from '@/components/Providers';
import { Suspense } from 'react';
import ReferralCatcher from '@/components/ReferralCatcher';

export const metadata: Metadata = {
  title: "Bitcoin Blue — Automating the Web3 Future",
  description: "Zero-install architecture, AI-driven community management, and a hyper-deflationary economic engine built for institutional-grade scaling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#0066FF] selection:text-white overflow-x-hidden relative min-h-screen bg-[#070A11] text-[#E2E8F0]">
        {/* Lightweight ambient background — no GPU blur */}
        <div className="fixed inset-0 bg-mesh z-0 pointer-events-none opacity-40"></div>
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 10% 20%, rgba(0,102,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(0,229,255,0.04) 0%, transparent 70%)'
        }}></div>
        
        <Providers>
          <Suspense fallback={null}>
            <ReferralCatcher />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
