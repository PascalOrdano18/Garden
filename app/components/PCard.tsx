'use client';

import Image from "next/image";
import { useState } from "react";

interface PCardProps {
    projectTitle: string;
    imageSource: string;
    imageAlt: string;
    description: string;
}

export default function PCard({ projectTitle, imageSource, imageAlt, description }: PCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="group w-full transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="mb-8">
                <h2 className="text-5xl font-light tracking-wide mb-4">
                    {projectTitle}
                </h2>
                <p className="text-gray-400 text-xl">{description}</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="relative aspect-[16/9] w-full">
                    <Image 
                        className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                        src={imageSource}
                        alt={imageAlt}
                        fill
                        sizes="100vw"
                        priority
                        quality={95}
                    />
                    <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
                    
                    <div className={`absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-yellow-100/90 text-2xl font-light tracking-wide">
                            View Project →
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}