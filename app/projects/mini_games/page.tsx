'use client';

import Link from "next/link";

export default function MiniGames() {

    const games = [
        {
            name: "TicTacToe"
        },
        {
            name: "Pong"
        }
    ]

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold text-yellow-100 mb-4">Mini Games</h1>
            <p className="text-yellow-100 mb-8">A collection of unbeatable retro games</p>
            
            <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
                {games.map((game) => (
                    <div key={game.name} className="flex flex-col items-center justify-center">
                        <Link href={`/projects/mini_games/${game.name}`} className="w-full">
                            <div className="p-6 rounded-lg hover:border hover:border-yellow-100 transition-all duration-100 transform">
                                <h2 className="text-2xl font-bold text-yellow-100 text-center">{game.name}</h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}