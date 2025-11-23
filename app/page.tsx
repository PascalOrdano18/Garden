'use client';

import ProgressiveText from '@/app/components/ProgressiveText';
import { useState, useEffect } from 'react';

export default function Home() {
    
    const [btcValue, setBtcValue] = useState<string | null>(null);

    useEffect(() => {
        getBtcValue();
    });
    

    const getBtcValue = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'); 
        if(!res.ok) return ;
        const data = await res.json();
        setBtcValue(data.bitcoin.usd);
    }


  return (
    <div className="fade-in">
      <div className="justify-items-center space-y-6">
        <ProgressiveText text="Pascal Ordano&apos;s Garden" />
        <p className="mt-4 text-lg slide-up text-center">
          A place where I share what I create and things that interest me.
        </p>
        <p className="slide-up text-center">
          I&apos;m a software engineering student at Instituto Tecnologico de Buenos
          Aires (ITBA)
        </p>

        {btcValue && (
            <p className='text-center'>
                BTC at ${btcValue} usd btw
            </p>
        )}
        
      </div>
    </div>
  );
} 
