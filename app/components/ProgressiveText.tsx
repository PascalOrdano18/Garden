'use client';

import { useEffect, useState } from "react";

interface ProgressiveTextProps {
  text: string;
}

export default function ProgressiveText({ text }: ProgressiveTextProps) {
  const [isForward, setIsForward] = useState<boolean>(true);

  useEffect(() => {
    setIsForward(Math.random() > 0.5);
  }, []);

  const maxSize = 7;
  const minSize = 1.5;
  const increment = 0.25;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold whitespace-nowrap flex items-start overflow-x-auto scrollbar-hide">
        {text.split("").map((char, index) => {
          const fontSize = isForward
            ? minSize + index * increment
            : maxSize - index * increment;

          return (
            <span
              key={index}
              className="progressive-text inline-flex items-start"
              style={{
                fontSize: `${fontSize}rem`,
                animationDelay: `${index * 80}ms`,
                lineHeight: 0.8,
                opacity: 0,
                animation: `simpleReveal 0.5s ease-out ${index * 80}ms forwards`
              }}
            >
              {char}
            </span>
          );
        })}
      </h1>
    </div>
  );
} 