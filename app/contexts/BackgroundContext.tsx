'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundContextType {
  isFixed: boolean;
  toggleFixed: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [isFixed, setIsFixed] = useState(false);

  const toggleFixed = () => {
    setIsFixed(!isFixed);
  };

  return (
    <BackgroundContext.Provider value={{ isFixed, toggleFixed }}>
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
