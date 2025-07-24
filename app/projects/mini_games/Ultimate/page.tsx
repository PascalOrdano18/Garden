"use client"

import { useState } from "react";
import TicTacToeGame, { Move, createEmptyBoard, checkWin, values, Board } from "@/app/components/TicTacToeGame";

function checkUltimateWin(winners: string[], player: string): boolean {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => winners[index] === player)
    );
}

export default function Ultimate() {
    // State for all 9 small tic-tac-toe boards
    const [smallBoards, setSmallBoards] = useState<Board<Move>[]>(
        Array.from({ length: 9 }, () => createEmptyBoard())
    );

    // Which board can be played on (null = any open board)
    const [activeBoardIndex, setActiveBoardIndex] = useState<number | null>(null);
    
    // Winners of each small board (values.free = not won yet)
    const [smallBoardWinners, setSmallBoardWinners] = useState<string[]>(
        Array(9).fill(values.free)
    );
    
    // Current player (X or O)
    const [currentPlayer, setCurrentPlayer] = useState(values.cross);
    
    // Winner of the overall Ultimate game
    const [gameWinner, setGameWinner] = useState<string>(values.free);

    const handleMove = (boardIndex: number, row: number, col: number) => {
        // Can't make moves if game is over
        if (gameWinner !== values.free) return;

        // 1. Update the specific small board
        const newSmallBoards = [...smallBoards];
        const newMove = new Move(currentPlayer, 0, row, col);
        newSmallBoards[boardIndex] = newSmallBoards[boardIndex].map((boardRow, r) =>
            boardRow.map((cell, c) => (r === row && c === col ? newMove : cell))
        );
        setSmallBoards(newSmallBoards);

        // 2. Check if this small board is now won
        const newSmallBoardWinners = [...smallBoardWinners];
        if (checkWin(newSmallBoards[boardIndex], newMove)) {
            newSmallBoardWinners[boardIndex] = currentPlayer;
            setSmallBoardWinners(newSmallBoardWinners);
            
            // 3. Check if overall game is won
            if (checkUltimateWin(newSmallBoardWinners, currentPlayer)) {
                setGameWinner(currentPlayer);
                return; // Game over!
            }
        }

        // 4. Determine next active board based on the move position
        const nextBoardIndex = row * 3 + col;
        const nextActive = newSmallBoardWinners[nextBoardIndex] === values.free
            ? nextBoardIndex  // Player must play in this specific board
            : null;           // If target board is won/full, player can choose any open board

        setActiveBoardIndex(nextActive);

        // 5. Switch to the other player
        setCurrentPlayer(currentPlayer === values.cross ? values.circle : values.cross);
    };

    const handleReset = () => {
        setSmallBoards(Array.from({ length: 9 }, () => createEmptyBoard()));
        setSmallBoardWinners(Array(9).fill(values.free));
        setCurrentPlayer(values.cross);
        setGameWinner(values.free);
        setActiveBoardIndex(null);
    };

    return (
        <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 min-h-screen">
            {/* Page Title */}
            <h1 className="text-yellow-100 font-bold text-2xl sm:text-3xl lg:text-4xl text-center mb-4 sm:mb-6">
                Ultimate Tic-Tac-Toe
            </h1>

            {/* Game Over Display */}
            {gameWinner !== values.free && (
                <div className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-100 text-center px-4">
                    🎉 {gameWinner} Wins Ultimate Tic-Tac-Toe! 🎉
                </div>
            )}
            
            {/* Current Game Status */}
            <div className="mb-4 sm:mb-6 text-center px-4">
                <div className="text-base sm:text-lg lg:text-xl text-yellow-100 mb-2">
                    Current Player: <span className="font-bold text-lg sm:text-xl lg:text-2xl">{currentPlayer}</span>
                </div>
                {activeBoardIndex !== null && gameWinner === values.free && (
                    <div className="text-sm sm:text-base text-orange-400">
                        Must play in board {activeBoardIndex + 1}
                    </div>
                )}
                {activeBoardIndex === null && gameWinner === values.free && (
                    <div className="text-sm sm:text-base text-green-400">
                        Can play in any open board
                    </div>
                )}
            </div>

            {/* The 3x3 grid of smaller tic-tac-toe games */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3 p-2 sm:p-4 lg:p-6 max-w-full overflow-hidden">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="relative">
                        {/* Board number indicator */}
                        <div className="absolute -top-5 sm:-top-6 lg:-top-7 left-1/2 transform -translate-x-1/2 text-yellow-100 font-bold text-xs sm:text-sm lg:text-base">
                            {i + 1}
                        </div>
                        
                        <TicTacToeGame 
                            boardIndex={i}
                            isActive={activeBoardIndex === null || activeBoardIndex === i}
                            isWon={smallBoardWinners[i] !== values.free}
                            winner={smallBoardWinners[i]}
                            onMove={handleMove}
                            board={smallBoards[i]}
                            currentPlayer={currentPlayer}
                            showResetButton={false}
                        />
                    </div>
                ))}
            </div>

            {/* Reset Button */}
            <button 
                onClick={handleReset}
                className="text-yellow-100 border border-yellow-100 px-4 py-2 sm:px-6 sm:py-3 rounded-md mt-4 sm:mt-6 hover:bg-yellow-100 hover:text-black transition-all text-sm sm:text-base touch-manipulation"
            >
                Reset Game
            </button>

            {/* Game Rules */}
            <div className="mt-4 sm:mt-6 max-w-xl text-yellow-100 text-center px-4">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Ultimate Tic-Tac-Toe Rules:</h3>
                <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2 text-left">
                    <li>• Win small boards to claim them for the big board</li>
                    <li>• Your move determines which board your opponent plays in next</li>
                    <li>• If sent to a won board, you can play anywhere</li>
                    <li>• Win 3 small boards in a row to win the ultimate game!</li>
                </ul>
            </div>
        </div>
    );
}