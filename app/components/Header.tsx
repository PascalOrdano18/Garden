'use client';

import Link from "next/link";
import { useState } from "react";
import FixBgButton from "./FixBgButton";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <header className="text-white fixed top-0 left-0 w-full z-50">
            {/* Main header bar */}
            <div className="h-14 sm:h-16 flex items-center px-4 sm:px-6">
                <div className="flex-1">
                    {/* Hamburger button - mobile only */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="sm:hidden p-2 -ml-2 hover:text-yellow-100 active:text-yellow-100 transition-colors touch-manipulation"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop navigation */}
                <nav className="hidden sm:flex space-x-6 md:space-x-8 text-xl md:text-2xl lg:text-3xl font-bold">
                    <Link href="/" className="hover:text-yellow-100 transition-colors">HOME</Link>
                    <Link href="/blog" className="hover:text-yellow-100 transition-colors">JOURNAL</Link>
                    <Link href="/projects" className="hover:text-yellow-100 transition-colors">PROJECTS</Link>
                </nav>

                <div className="flex-1 flex justify-end">
                    <FixBgButton />
                </div>
            </div>

            {/* Mobile navigation menu */}
            <nav
                className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-black/90 backdrop-blur-md border-t border-gray-800">
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-6 py-4 text-lg font-bold hover:text-yellow-100 active:bg-white/5 transition-colors border-b border-gray-800/50"
                    >
                        HOME
                    </Link>
                    <Link
                        href="/blog"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-6 py-4 text-lg font-bold hover:text-yellow-100 active:bg-white/5 transition-colors border-b border-gray-800/50"
                    >
                        JOURNAL
                    </Link>
                    <Link
                        href="/projects"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-6 py-4 text-lg font-bold hover:text-yellow-100 active:bg-white/5 transition-colors"
                    >
                        PROJECTS
                    </Link>
                </div>
            </nav>
        </header>
    );
}
