'use client';

import { useEffect, useState } from 'react';

export default function ClientReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = document.documentElement;
      const scrollTop = element.scrollTop || document.body.scrollTop;
      const scrollHeight = element.scrollHeight || document.body.scrollHeight;
      const clientHeight = element.clientHeight;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[98%] max-w-4xl h-1 sm:h-1.5 bg-gray-800/50 rounded-full overflow-hidden z-50">
      <div
        className="h-full bg-yellow-100 transition-all duration-150 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 