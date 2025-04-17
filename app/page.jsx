'use client';

import { useEffect, useState } from 'react';

function ProgressiveText({ text }) {
  const [mounted, setMounted] = useState(false);
  const [isForward, setIsForward] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsForward(Math.random() > 0.5);
  }, []);

  if (!mounted) return null;

  const maxSize = 7;
  const minSize = 1.5;
  const increment = 0.25;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold whitespace-nowrap flex items-start">
        {text.split('').map((char, index) => {
          const fontSize = isForward
            ? minSize + (index * increment)
            : maxSize - (index * increment);
          
          return (
            <span
              key={index}
              className="progressive-text inline-flex items-start"
              style={{
                fontSize: `${fontSize}rem`,
                animationDelay: `${index * 80}ms`,
                lineHeight: 0.8,
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

export default function Home() {
  return (
    <div className="fade-in">
      <div className="justify-items-start space-y-6">
        <ProgressiveText text="Pascal Ordano's Garden" />
        <p className="mt-4 text-lg slide-up">
          A place where I share what I create and things that interest me.
        </p>
        <p className="slide-up">
          I'm a software engineering student at Instituto Tecnologico de Buenos Aires (ITBA)
        </p>
      </div>
    </div>
  );
}
