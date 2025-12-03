'use client';

import ProgressiveText from '@/app/components/ProgressiveText';
import { useState, useEffect } from 'react';

export default function Home() {
    
    const [btcValue, setBtcValue] = useState<string | null>(null);
    const [ethValue, setEthValue] = useState<string | null>(null);

    useEffect(() => {
        getCryptoValues();
    });
    

    const getCryptoValues = async () => {
        const resBtc = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'); 
        if(!resBtc.ok) return ;
        let data = await resBtc.json();
        setBtcValue(data.bitcoin.usd);

        const resEth = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        if(!resEth.ok) return ;
        data = await resEth.json();
        setEthValue(data.ethereum.usd);
    }


  return (
    <div className="fade-in flex sm:block items-center justify-center min-h-[calc(100vh-7rem)] sm:min-h-0 px-3 sm:px-4">
      <div className="w-full max-w-md sm:max-w-none justify-items-center space-y-3 sm:space-y-6 text-xs sm:text-base">
        <ProgressiveText text="Pascal Ordano&apos;s Garden" />
        <p className="mt-2 text-sm sm:text-lg slide-up text-center">
          A place where I share what I create and things that interest me.
        </p>
        <p className="slide-up text-center text-xs sm:text-base">
          I&apos;m a software engineering student at Instituto Tecnologico de Buenos
          Aires (ITBA)
        </p>

        {btcValue && ethValue && (
          <ul className="mt-1 text-xs sm:text-base text-center space-y-1">
            <li>
              BTC at <span className="text-yellow-100">${btcValue}</span>
            </li>
            <li>
              ETH at <span className="text-yellow-100">${ethValue}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
} 
