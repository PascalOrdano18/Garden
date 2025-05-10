'use client';

import { useState } from "react";
import Link from "next/link";

export default function MiniGames() { 

    const [start, setStart] = useState(false);


    const games = [
        {
            name: "TicTacToe"
        },
        {
            name: "Pong"
        }
    ]

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Mini Games</h1>
            <p>A collection of unbeatable retro games</p>
            <button className="text-white font-bold text-2xl hover:text-yellow-100 transition px-4 py-2 rounded-md" onClick={() => setStart(true)}>PLAY</button>

            {games.map((game) => {
                return (
                    <div key={game.name} className="flex flex-col items-center justify-center">
                        <Link href={`/projects/mini_games/${game.name}`}>
                        <h2>{game.name}</h2>
                        </Link>
                    </div>
                )
            })}


        </div>
    )
}