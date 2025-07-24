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

  // More conservative responsive font sizes for better mobile experience
  const minSize = {
    mobile: 0.8,
    tablet: 1,
    desktop: 1.2
  };
  const increment = {
    mobile: 0.08,
    tablet: 0.12,
    desktop: 0.18
  };

  return (
    <div className="flex flex-col overflow-hidden w-full">
      <h1 className="font-bold flex flex-wrap items-center justify-start leading-tight">
        {text.split("").map((char, index) => {
          // Calculate responsive font size with forward/backward logic
          const baseSize = isForward ? index : (text.length - 1 - index);
          const mobileSize = minSize.mobile + baseSize * increment.mobile;
          const tabletSize = minSize.tablet + baseSize * increment.tablet;
          const desktopSize = minSize.desktop + baseSize * increment.desktop;

          // Add word break after spaces for better wrapping
          const isSpace = char === ' ';

          return (
            <span
              key={index}
              className={`progressive-text inline-flex items-center ${isSpace ? 'flex-shrink-0' : 'flex-shrink-0'}`}
              style={{
                fontSize: `clamp(${mobileSize}rem, ${tabletSize}rem, ${desktopSize}rem)`,
                animationDelay: `${index * 60}ms`,
                lineHeight: 1,
                opacity: 0,
                animation: `simpleReveal 0.4s ease-out ${index * 60}ms forwards`,
                wordBreak: isSpace ? 'break-all' : 'normal'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </h1>
    </div>
  );
} 