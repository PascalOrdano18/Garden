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
      <div className="w-full max-w-md sm:max-w-none justify-items-center space-y-5 sm:space-y-6 text-xs sm:text-base">
        <ProgressiveText text="Pascal Ordano&apos;s Garden" />
        <p className="mt-2 text-base sm:text-lg slide-up text-center">
          A place where I share what I create and things that interest me.
        </p>
        <p className="slide-up text-center text-sm sm:text-base" style={{ animationDelay: '200ms' }}>
          Founding Engineer at <a href="https://roomix.ai" target="_blank" rel="noopener noreferrer" className="text-yellow-100 hover:underline">Roomix.ai</a> and
          studying software engineering at Instituto Tecnologico de Buenos Aires (ITBA)
        </p>

        <div className="w-32 mx-auto border-t border-gray-700/50 slide-up" style={{ animationDelay: '400ms' }} />

        {priceState === 'loading' && (
          <p className="mt-1 text-sm sm:text-base text-center text-gray-500 slide-up" style={{ animationDelay: '600ms' }}>
            Loading prices...
          </p>
        )}
        {priceState === 'success' && btcValue && ethValue && (
          <div className="flex flex-row gap-3 justify-center slide-up" style={{ animationDelay: '600ms' }}>
            <span className="border border-gray-700/50 rounded-full px-3 py-1 text-sm sm:text-base">
              BTC <span className="text-yellow-100">${btcValue}</span>
            </span>
            <span className="border border-gray-700/50 rounded-full px-3 py-1 text-sm sm:text-base">
              ETH <span className="text-yellow-100">${ethValue}</span>
            </span>
          </div>
        )}
        {priceState === 'error' && (
          <p className="mt-1 text-sm sm:text-base text-center text-gray-500 slide-up" style={{ animationDelay: '600ms' }}>
            Unable to load prices
          </p>
        )}
      </div>
    </div>
  );
} 
