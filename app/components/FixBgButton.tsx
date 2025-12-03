'use client'

import { useBackground } from '@/app/contexts/BackgroundContext';
import { useEffect } from 'react';

export default function FixBgButton() {
  const { isFixed, toggleFixed } = useBackground();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command K (Mac) o Ctrl K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggleFixed();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleFixed]);

  return (
    <button
      onClick={toggleFixed}
      className={`px-2.5 py-1 sm:px-4 sm:py-2 rounded-md text-[0.65rem] sm:text-sm font-medium transition-all duration-500 ${
        isFixed 
          ? 'bg-white text-black border border-white hover:bg-yellow-100 hover:text-black shadow-md sm:shadow-2xl shadow-white/60 sm:shadow-white/80 hover:shadow-yellow-100/90' 
          : 'bg-transparent text-white border border-white hover:bg-yellow-100 hover:text-black shadow-md sm:shadow-2xl shadow-white/40 sm:shadow-white/60 hover:shadow-yellow-100/90'
      }`}
      title={`${isFixed ? 'UNFIX BG' : 'FIX BG'} (⌘K)`}
    >
      {isFixed ? 'UNFIX BG' : 'FIX BG'} <span className="hidden sm:inline text-xs opacity-70">⌘K</span>
    </button>
  );
}
