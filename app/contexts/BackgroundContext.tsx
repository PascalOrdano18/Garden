'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface BackgroundContextType {
  isFixed: boolean;
  toggleFixed: () => void;
  isJournalPage: boolean;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [isFixed, setIsFixed] = useState(false);
  const pathname = usePathname();
  const isJournalPage = pathname?.startsWith('/blog') || false;
  const isWriteOrDiePage = pathname?.endsWith('/WriteOrDie') || false;

  useEffect(() => {
    // Auto-fix background when on journal pages
    if (isJournalPage || isWriteOrDiePage) {
      setIsFixed(true);
    }
  }, [isJournalPage, isWriteOrDiePage]);

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
