'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useBackground } from '@/app/contexts/BackgroundContext';

// Importación dinámica para evitar problemas de SSR
const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gradient-to-br from-black to-white" />
  }
);

const shaderConfigs = [
  {
    shape: "dots" as const,
    colors: ["#ffffff", "#000000", "#ffffff", "#000000"],
    colorBack: "#000000",
    softness: 0.5,
    intensity: 0.8,
    noise: 0.4,
    speed: 1.2
  },
  {
    shape: "corners" as const,
    colors: ["#ffffff", "#000000", "#ffffff", "#000000"],
    colorBack: "#000000",
    softness: 0.8,
    intensity: 0.5,
    noise: 0.35,
    speed: 1.1
  },
  {
    shape: "ripple" as const,
    colors: ["#000000", "#ffffff", "#000000", "#ffffff"],
    colorBack: "#000000",
    softness: 0.9,
    intensity: 0.6,
    noise: 0.2,
    speed: 0.9
  }
];

export default function BackgroundShaders() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isFixed, isJournalPage } = useBackground();

  useEffect(() => {
    if (isFixed) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shaderConfigs.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isFixed]);

  // Use corners (index 1) as default for journal pages
  const getCurrentIndex = () => {
    if (isJournalPage && isFixed) {
      return 1; // corners effect (DEFAULT)
    }
    return currentIndex;
  };

  const currentConfig = shaderConfigs[getCurrentIndex()];

  return (
    <div className="fixed inset-0 -z-10">
      <GrainGradient
        width="100%"
        height="100%"
        colors={currentConfig.colors}
        colorBack={currentConfig.colorBack}
        softness={currentConfig.softness}
        intensity={currentConfig.intensity}
        noise={currentConfig.noise}
        shape={currentConfig.shape}
        speed={isFixed ? 0 : currentConfig.speed}
        fit="cover"
      />
    </div>
  );
}
