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

        {btcValue && ethValue && (
            <ul>
                <li>BTC at <span className='text-yellow-100'>${btcValue}</span></li>
                <li>ETH at <span className='text-yellow-100'>${ethValue}</span></li>
            </ul>
        )}
        
      </div>
    </div>
  );
} 