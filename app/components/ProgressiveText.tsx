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

  // Responsive font sizes
  const maxSize = {
    mobile: 3.5,
    tablet: 5.5, 
    desktop: 7
  };
  const minSize = {
    mobile: 1,
    tablet: 1.25,
    desktop: 1.5
  };
  const increment = {
    mobile: 0.15,
    tablet: 0.2,
    desktop: 0.25
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <h1 className="font-bold flex items-start overflow-x-auto scrollbar-hide">
        {text.split("").map((char, index) => {
          return (
            <span
              key={index}
              className="progressive-text inline-flex items-start flex-shrink-0"
              style={{
                fontSize: `clamp(${minSize.mobile + index * increment.mobile}rem, ${minSize.tablet + index * increment.tablet}rem, ${minSize.desktop + index * increment.desktop}rem)`,
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