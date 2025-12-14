'use client';

import { useEffect, useState } from "react";
import Link from "next/link";       

interface ProgressiveTextProps {
  text: string;
}

export default function ProgressiveText({ text }: ProgressiveTextProps) {
  const [isForward] = useState<boolean>(() => Math.random() > 0.5);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
      <h1 className="font-bold whitespace-normal sm:whitespace-nowrap flex items-start justify-center text-center overflow-hidden scrollbar-hide leading-tight">
        {text.split("").map((char, index) => {
          const fontSize = isForward
            ? minSize + index * increment
            : maxSize - index * increment;

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
                <Link href={'/projects/mini_games/GenerativeArt'}>{char}</Link>
              : char === 'P' ? 
                <Link href={'/projects'}>{char}</Link>
              : char === "'" ?
                <Link href={'/random-place'}>{char}</Link>
              : char
              }
            </span>
          );
        })}
      </h1>
    </div>
  );
} 
