"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReferralCatcher() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref && /^0x[a-fA-F0-9]{40}$/.test(ref)) {
      // Basic validation for EVM addresses
      localStorage.setItem('btcblue_referrer', ref);
      console.log('Referrer captured:', ref);
    }
  }, [searchParams]);

  return null;
}
