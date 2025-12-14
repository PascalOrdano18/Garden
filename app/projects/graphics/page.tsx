
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Graphic {
    title: string;
    image: string;
    alt: string;
    description?: string;
}

// Add your graphics here - images should be in the /public folder
const graphics: Graphic[] = [
    {
        title: "Ray Tracer",
        image: "/rays.png",
        alt: "Ray Tracer using C",
        description: "A very simple ray tracer using SDL. My very first SDL project"
    },
    {
        title: "Mandelbrot Set Plot",
        image: "/graphics.png",
        alt: "Mandelbrot set plot using C",
        description: "The mandelbrot set is a fractal plotted into the X (real) and Y (complex) axis."
    },
    {
        title: "Sand Simulation",
        image: "/sand.jpeg",
        alt: "Sand simulation using C",
        description: "Just some falling sand"
    },
];

export default function Graphics() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

    const handleImageClick = (image: string, title: string) => {
        setSelectedImage(image);
        setSelectedTitle(title);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSelectedTitle(null);
    };

    return (
        <div className="min-h-screen w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="mb-8 sm:mb-12 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
                        C Graphics
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl">
                        A collection of graphics created using C and SDL.
                        <br />
                        More at{' '}
                        <Link 
                            href="https://github.com/PascalOrdano18/C-Graphics"
                            className="text-white hover:text-yellow-100 transition-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </Link>
                    </p>
                </div>

                {graphics.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No graphics added yet. Add them to the graphics array in the page component.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 sm:gap-12">
                        {graphics.map((graphic, index) => (
                            <div
                                key={index}
                                className="group w-full transition-all duration-300"
                            >
                                <div className="mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight mb-2 leading-tight text-white transition-colors">
                                        {graphic.title}
                                    </h2>
                                    {graphic.description && (
                                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                            {graphic.description}
                                        </p>
                                    )}
                                </div>

                                <div className="overflow-hidden rounded-lg border border-gray-800 bg-black/20 w-full">
                                    <div className="relative aspect-[16/9] w-full cursor-pointer" onClick={() => handleImageClick(graphic.image, graphic.title)}>
                                        <Image
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                            src={graphic.image}
                                            alt={graphic.alt}
                                            fill
                                            sizes="100vw"
                                            quality={95}
                                        />
                                        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Full-screen image modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-400 transition-colors z-10"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        {selectedTitle && (
                            <h2 className="text-white text-2xl sm:text-3xl font-medium tracking-tight mb-4 text-center">
                                {selectedTitle}
                            </h2>
                        )}
                        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                            <Image
                                src={selectedImage}
                                alt={selectedTitle || "Full size graphic"}
                                fill
                                className="object-contain"
                                quality={100}
                                sizes="100vw"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
