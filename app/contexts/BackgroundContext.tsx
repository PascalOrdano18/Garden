'use client'

import { createContext, useContext, useState, ReactNode, useMemo, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface BackgroundContextType {
  isFixed: boolean;
  toggleFixed: () => void;
  isJournalPage: boolean;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isJournalPage = pathname?.startsWith('/blog') || false;
  const isWriteOrDiePage = pathname?.endsWith('/WriteOrDie') || false;
  const shouldBeFixed = useMemo(() => isJournalPage || isWriteOrDiePage, [isJournalPage, isWriteOrDiePage]);
  const [isFixed, setIsFixed] = useState(() => shouldBeFixed);
  const prevShouldBeFixedRef = useRef(shouldBeFixed);

  useEffect(() => {
    // Only update if the value actually changed
    if (prevShouldBeFixedRef.current !== shouldBeFixed) {
      prevShouldBeFixedRef.current = shouldBeFixed;
      // Use setTimeout to avoid synchronous setState in effect
      const timeoutId = setTimeout(() => {
        setIsFixed(shouldBeFixed);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [shouldBeFixed]);

  const toggleFixed = () => {
    setIsFixed(!isFixed);
  };

  return (
    <BackgroundContext.Provider value={{ isFixed, toggleFixed, isJournalPage }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}
