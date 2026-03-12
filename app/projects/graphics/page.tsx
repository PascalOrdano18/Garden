
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Graphic {
    title: string;
    image: string;
    alt: string;
    description?: string;
    codePath: string;
}

const graphics: Graphic[] = [
    {
        title: "Ray Tracer",
        image: "/rays.png",
        alt: "Ray Tracer using C",
        description: "A very simple ray tracer using SDL. My very first SDL project",
        codePath: "raytracer/raytracing.c"
    },
    {
        title: "Mandelbrot Set Plot",
        image: "/graphics.png",
        alt: "Mandelbrot set plot using C",
        description: "The mandelbrot set is a fractal plotted into the X (real) and Y (complex) axis.",
        codePath: "mandelbrotSet/mandelbrotPlot.c"
    },
    {
        title: "Sand Simulation",
        image: "/sand.jpeg",
        alt: "Sand simulation using C",
        description: "Just some falling sand",
        codePath: "sand/sand_simulation.c"
    },
    {
        title: "Game of Life",
        image: "/game_of_life.jpeg",
        alt: "Conways Game of Life",
        description: "Conways Game Of Life",
        codePath: "game_of_life/main.c"
    },
    {
        title: "Fractal Trees",
        image: "/trees.png",
        alt: "Fractal Trees in C",
        description: "Basic trees no description needed",
        codePath: "fractal_tree/tree.c"
    }
];

export default function Graphics() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [openCode, setOpenCode] = useState<string | null>(null);
    const [codeCache, setCodeCache] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<string | null>(null);

    const handleImageClick = (image: string, title: string) => {
        setSelectedImage(image);
        setSelectedTitle(title);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSelectedTitle(null);
    };

    const handleCodeClick = async (codePath: string) => {
        if (openCode === codePath) {
            setOpenCode(null);
            return;
        }

        if (codeCache[codePath]) {
            setOpenCode(codePath);
            return;
        }

        setLoading(codePath);
        try {
            const res = await fetch(
                `https://api.github.com/repos/PascalOrdano18/C-Graphics/contents/${codePath}`
            );
            const data = await res.json();
            const decoded = atob(data.content);
            setCodeCache(prev => ({ ...prev, [codePath]: decoded }));
            setOpenCode(codePath);
        } catch {
            setOpenCode(null);
        } finally {
            setLoading(null);
        }
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
                            No graphics, weird. Revisa todo.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
                        {graphics.map((graphic, index) => (
                            <div
                                key={index}
                                className="group w-full transition-all duration-300"
                            >
                                <div className="mb-4 sm:mb-6">
                                    <div className='flex flex-row items-center'>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight mb-2 leading-tight text-white transition-colors">
                                            {graphic.title}
                                        </h2>
                                        <button
                                            onClick={() => handleCodeClick(graphic.codePath)}
                                            className='bg-transparent border border-white mx-4 px-2 rounded hover:cursor-pointer hover:bg-yellow-100 hover:text-black hover:border-white transition-all'>
                                            {loading === graphic.codePath ? '...' : openCode === graphic.codePath ? 'Hide' : 'Code'}
                                        </button>
                                    </div>
                                    {graphic.description && (
                                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                            {graphic.description}
                                        </p>
                                    )}
                                </div>

                                {openCode === graphic.codePath && codeCache[graphic.codePath] && (
                                    <div className="mb-4 sm:mb-6 overflow-x-auto rounded-lg border border-gray-800 bg-black/60">
                                        <pre className="p-4 text-sm text-gray-300 font-mono leading-relaxed">
                                            <code>{codeCache[graphic.codePath]}</code>
                                        </pre>
                                    </div>
                                )}

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
