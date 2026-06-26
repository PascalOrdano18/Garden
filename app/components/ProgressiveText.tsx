'use client';

import { useEffect, useState } from "react";
import Link from "next/link";       

interface ProgressiveTextProps {
  text: string;
  fontVar?: string;
}

export default function ProgressiveText({ text, fontVar = 'var(--font-geist-sans)' }: ProgressiveTextProps) {
  const [isForward, setIsForward] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only randomization to avoid SSR hydration mismatch
    setIsForward(Math.random() > 0.5);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 640);
      }
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const maxSize = isMobile ? 2.5 : 12;
  const minSize = isMobile ? 1.3 : 3;
  const increment = isMobile ? 0.06 : 0.4;

  return (
    <div className="flex flex-col">
      <h1 style={{ fontFamily: fontVar, textTransform: 'uppercase' }} className="font-bold flex flex-wrap sm:flex-nowrap gap-y-1 sm:gap-y-0 items-start justify-center text-center overflow-hidden scrollbar-hide leading-tight">
        {text.split("").map((char, index) => {
          const fontSize = isForward
            ? minSize + index * increment
            : maxSize - index * increment;

          if (char === ' ') {
            // On mobile force a line break between words so the title never
            // overflows the viewport; on desktop keep a normal-width space.
            return isMobile
              ? <span key={index} aria-hidden style={{ flexBasis: '100%', height: 0 }} />
              : <span key={index} aria-hidden style={{ width: `${fontSize * 0.25}rem` }} />;
          }

          return (
            <span
              key={index}
              className="progressive-text inline-flex items-start hover:text-yellow-100 hover:cursor-pointer hover:text-4xl"
              style={{
                fontSize: isMobile
                  ? `${fontSize * 0.9}rem`
                  : `min(${fontSize}rem, ${fontSize * 0.6}vw)`,
                animationDelay: `${index * 80}ms`,
                lineHeight: 0.8,
                opacity: 0,
                animation: `simpleReveal 0.5s ease-out ${index * 80}ms forwards`,
                marginRight: `${fontSize * 0.05}rem`
              }}
            >
              {char === 'G' ?
                <Link href={'/projects/mini_games/GenerativeArt'} className="link-letter" style={{ animationDelay: '1.9s' }}>{char}</Link>
              : char === 'P' ?
                <Link href={'/projects'} className="link-letter" style={{ animationDelay: '1s' }}>{char}</Link>
              : char === "'" ?
                <Link href={'/random-place'} className="link-letter" style={{ animationDelay: '1.6s' }}>{char}</Link>
              : char === 'l' ?
                <Link href={'/links'} className="link-letter" style={{ animationDelay: '1.3s' }}>{char}</Link>
              : char === 'r' ?
                <Link href={'https://roomix.ai'} target="_blank" rel="noopener noreferrer" className="link-letter" style={{ animationDelay: '1.3s' }}>{char}</Link>
              : char
              }
            </span>
          );
        })}
      </h1>
    </div>
  );
} 
