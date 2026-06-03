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
      <body className="antialiased selection:bg-[#0066FF] selection:text-white overflow-x-hidden relative min-h-screen bg-[#070A11] text-[#E2E8F0]">
        {/* Ambient Glows */}
        <div className="fixed inset-0 bg-mesh z-0 pointer-events-none opacity-40"></div>
        <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
        
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
