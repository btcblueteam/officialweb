"use client";

import { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { Rocket } from 'lucide-react';

export default function AuthPopup() {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!hasTriggered.current) {
      hasTriggered.current = true;
      signIn('twitter', { callbackUrl: '/close-popup' });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#070A11] text-white">
      <Rocket className="text-[#00E5FF] animate-pulse mb-4" size={48} />
      <h1 className="text-xl font-bold mb-2">Redirecting to X (Twitter)...</h1>
      <p className="text-[#8A93A6] text-sm">Please wait while we establish a secure connection.</p>
    </div>
  );
}
