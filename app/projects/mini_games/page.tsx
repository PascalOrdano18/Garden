'use client';

import Link from "next/link";

export default function MiniGames() {

    const games = [
        {
            name: "TicTacToe"
        },
        {
            name: "Ultimate"
        },
        {
            name: "Type"
        },
        {
            name: "Graphs"
        }
    ]

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-100 mb-3 sm:mb-4 text-center">Mini Games</h1>
            <p className="text-yellow-100 mb-6 sm:mb-8 text-center text-sm sm:text-base">A collection of unbeatable retro games</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl w-full">
                {games.map((game) => (
                    <div key={game.name} className="flex flex-col items-center justify-center">
                        <Link href={`/projects/mini_games/${game.name}`} className="w-full">
                            <div className="p-4 sm:p-6 rounded-lg hover:border hover:border-yellow-100 transition-all duration-100 transform hover:scale-105">
                                <h2 className="text-xl sm:text-2xl font-bold text-yellow-100 text-center">{game.name}</h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}