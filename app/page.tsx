'use client';

import ProgressiveText from '@/app/components/ProgressiveText';
import { useState, useEffect } from 'react';

type LoadingState = 'loading' | 'success' | 'error';

export default function Home() {

    const [btcValue, setBtcValue] = useState<string | null>(null);
    const [ethValue, setEthValue] = useState<string | null>(null);
    const [priceState, setPriceState] = useState<LoadingState>('loading');

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const resBtc = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                if(!resBtc.ok || cancelled) {
                    if (!cancelled) setPriceState('error');
                    return;
                }
                let data = await resBtc.json();
                if (cancelled) return;
                setBtcValue(data.bitcoin.usd);

                const resEth = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                if(!resEth.ok || cancelled) {
                    if (!cancelled) setPriceState('error');
                    return;
                }
                data = await resEth.json();
                if (cancelled) return;
                setEthValue(data.ethereum.usd);
                setPriceState('success');
            } catch {
                if (!cancelled) setPriceState('error');
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);


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

        {priceState === 'loading' && (
          <p className="mt-1 text-xs sm:text-base text-center text-gray-500">
            Loading prices...
          </p>
        )}
        {priceState === 'success' && btcValue && ethValue && (
          <ul className="mt-1 text-xs sm:text-base text-center space-y-1">
            <li>
              BTC at <span className="text-yellow-100">${btcValue}</span>
            </li>
            <li>
              ETH at <span className="text-yellow-100">${ethValue}</span>
            </li>
          </ul>
        )}
        {priceState === 'error' && (
          <p className="mt-1 text-xs sm:text-base text-center text-gray-500">
            Unable to load prices
          </p>
        )}
      </div>
    </div>
  );
} 
