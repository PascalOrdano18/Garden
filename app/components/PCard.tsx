'use client';

import Image from "next/image";

interface PCardProps {
    projectTitle: string;
    imageSource: string;
    imageAlt: string;
    description: string;
}

export default function PCard({ projectTitle, imageSource, imageAlt, description }: PCardProps) {
    return (
        <div className="group w-full transition-all duration-300 active:scale-[0.98] touch-manipulation">
            <div className="mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight mb-1.5 sm:mb-2 leading-tight group-hover:text-yellow-100 group-active:text-yellow-100 transition-colors">
                    {projectTitle}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed line-clamp-2">{description}</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-800 bg-black/20 group-hover:border-gray-700 group-active:border-yellow-100/30 transition-colors">
                <div className="relative aspect-[16/9] w-full">
                    <Image
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={imageSource}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

                    {/* Always visible on mobile, hover reveal on desktop */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                        sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300">
                        <p className="text-white text-sm sm:text-base font-medium flex items-center gap-2">
                            View Project
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
