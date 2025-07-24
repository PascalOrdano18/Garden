"use client"
import TicTacToeGame from "@/app/components/TicTacToeGame";
import { useState } from "react";


export default function Ultimate() {

    const [smallBoards, setSmallBoards] = useState<Board<Move>[]>(
        Array.from({length: 9}, () => createEmptyBoard())
    );

    const [activeBoardIndex, setActiveBoardIndex] = useState<number | null>(null);
    const [smallBoardWinners, setSmallBoardWinners] = useState<string[]>(
        Array(9).fill(values.free)
    );
    
    const [currentPlayer, setCurrentPlayer] = useState(values.cross);

    const handleMove = (boardIndex: number, row: number, col: number) => {
        const newSmallBoards = [...smallBoards];
        const newMove = new Move(currentPlayer, 0 , row, col);
        newSmallBoards[boardIndex][row][col] = newMove;
        setSmallBoards(newSmallBoards);

        if (checkUltimateWin(newWinners, currentPlayer)) {
            // Game over!
        return;
        }

        const nextBoardIndex = row * 3 + col;
        const nextActive = smallBoardWinners[nextBoardIndex] === values.free
        ? nextBoardIndex 
        : null;

        setActiveBoardIndex(nextActive);
        setCurrentPlayer(currentPlayer === values.cross ? values.circle : values.cross);
    }

    
    const checkUltimateWin = (winners: string[], player: number) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => winners[index] === player)
        );
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 m-20">
                {Array.from({ length: 9 }).map((_, i) => (
                    <TicTacToeGame 
                        key={i}
                        boardIndex={i}
                        isActive={activeBoardIndex === null || activeBoardIndex === i}
                        isWon={smallBoardWinners[i] !== values.free}
                        onMove={handleMove}
                        board={smallBoards[i]}
                        currentPlayer={currentPlayer}
                        showResetButton={false}
                    />
                ))}
            </div>
        </div>
    );
}