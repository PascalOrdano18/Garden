'use client';

import { useEffect, useState } from "react";
import Link from "next/link";       

interface ProgressiveTextProps {
  text: string;
}

export default function ProgressiveText({ text }: ProgressiveTextProps) {
  const [isForward, setIsForward] = useState<boolean>(true);

  useEffect(() => {
    setIsForward(Math.random() > 0.5);
  }, []);

  const maxSize = 12;
  const minSize = 3;
  const increment = 0.4;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold whitespace-nowrap flex items-start overflow-hidden scrollbar-hide">
        {text.split("").map((char, index) => {
          const fontSize = isForward
            ? minSize + index * increment
            : maxSize - index * increment;

          return (
            <span
              key={index}
              className="progressive-text inline-flex items-start hover:text-yellow-100 hover:cursor-pointer hover:text-4xl"
              style={{
                fontSize: `min(${fontSize}rem, ${fontSize * 0.6}vw)`,
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
              : char
              }
            </span>
          );
        })}
      </h1>
    </div>
  );
} 
