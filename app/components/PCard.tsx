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
            className="group w-full transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="mb-6">
                <h2 className="text-3xl font-medium tracking-tight mb-2">
                    {projectTitle}
                </h2>
                <p className="text-gray-500 text-base">{description}</p>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-800 bg-black/20">
                <div className="relative aspect-[16/9] w-full">
                    <Image 
                        className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
                        src={imageSource}
                        alt={imageAlt}
                        fill
                        sizes="100vw"
                        priority
                        quality={95}
                    />
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
                    
                    <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-white text-lg font-medium">
                            View Project →
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}