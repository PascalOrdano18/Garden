'use client'

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

const shaderConfig = {
  shape: "corners" as const,
  colors: ["#ffffff", "#000000", "#ffffff", "#000000"],
  colorBack: "#000000",
  softness: 0.8,
  intensity: 0.5,
  noise: 0.35,
  speed: 1.1
};

export default function BackgroundShaders() {
  const { isFixed } = useBackground();

  return (
    <div className="fixed inset-0 -z-10">
      <GrainGradient
        width="100%"
        height="100%"
        colors={shaderConfig.colors}
        colorBack={shaderConfig.colorBack}
        softness={shaderConfig.softness}
        intensity={shaderConfig.intensity}
        noise={shaderConfig.noise}
        shape={shaderConfig.shape}
        speed={isFixed ? 0 : shaderConfig.speed}
        fit="cover"
      />
    </div>
  );
}
