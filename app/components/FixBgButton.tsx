'use client'

import { useBackground } from '@/app/contexts/BackgroundContext';

export default function FixBgButton() {
  const { isFixed, toggleFixed } = useBackground();

  return (
    <button
      onClick={toggleFixed}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
        isFixed 
          ? 'bg-yellow-100 text-black border border-yellow-100' 
          : 'bg-transparent text-yellow-100 border border-yellow-100 hover:bg-yellow-100 hover:text-black'
      }`}
    >
      {isFixed ? 'UNFIX BG' : 'FIX BG'}
    </button>
  );
}
