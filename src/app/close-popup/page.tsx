"use client";

import { useEffect } from 'react';
import { Rocket } from 'lucide-react';

export default function ClosePopup() {
  useEffect(() => {
    // Attempt to close the window
    window.close();
    
    // In case the browser blocks window.close() because it wasn't opened by JS directly (unlikely in our flow, but possible)
    setTimeout(() => {
      window.location.href = '/airdrop';
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#070A11] text-white">
      <Rocket className="text-[#00E5FF] animate-bounce mb-4" size={48} />
      <h1 className="text-2xl font-bold mb-2">Authentication Successful!</h1>
      <p className="text-[#8A93A6]">You can safely close this window.</p>
    </div>
  );
}
