'use client';

import Link from "next/link";

const games = [
    {
        name: "TicTacToe",
        description: "Classic game with win detection",
        icon: "⭕"
    },
    {
        name: "Ultimate",
        description: "Tic Tac Toe with a twist",
        icon: "🎯"
    },
    {
        name: "Type",
        description: "Test your typing speed",
        icon: "⌨️"
    },
    {
        name: "DSAA",
        description: "Data structures visualized",
        icon: "🔄"
    },
    {
        name: "WriteOrDie",
        description: "Keep writing or lose it all",
        icon: "✍️"
    },
];

export default function MiniGames() {
    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-100 mb-2 sm:mb-3 text-center">
                Mini Projects
            </h1>
            <p className="text-gray-400 mb-6 sm:mb-8 text-center text-sm sm:text-base max-w-md">
                A collection of interactive experiments and games
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-4xl w-full">
                {games.map((game) => (
                    <Link
                        key={game.name}
                        href={`/projects/mini_games/${game.name}`}
                        className="group block"
                    >
                        <div className="p-4 sm:p-5 rounded-xl border border-gray-800 bg-black/30 backdrop-blur-sm
                            hover:border-yellow-100/50 hover:bg-black/50
                            active:scale-[0.98] active:bg-yellow-100/5
                            transition-all duration-200 touch-manipulation">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <span className="text-2xl sm:text-3xl" role="img" aria-hidden="true">
                                    {game.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-100 transition-colors truncate">
                                        {game.name}
                                    </h2>
                                    <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                                        {game.description}
                                    </p>
                                </div>
                                <svg
                                    className="w-5 h-5 text-gray-600 group-hover:text-yellow-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
