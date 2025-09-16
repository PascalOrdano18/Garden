"use client"

import { useState } from "react";

type Board<T> = T[][];

interface TicTacToeGameProps {
    boardIndex: number;
    isActive: boolean;
    isWon: boolean;
    winner?: string;
    onMove: (boardIndex: number, row: number, col: number) => void;
    board: Board<Move>;
    currentPlayer: string;
    showResetButton?: boolean;
}

const values = {
    cross: "X",
    circle: "O",
    free: " ",
}

class Move {
    step?: number;
    value: string;
    row: number;
    col: number;
    lastMove?: Move | null;
    nextMove?: Move | null;

    constructor(value: string, step?: number | null, row?: number, col?: number, lastMove?: Move | null, nextMove?: Move | null) {
        this.value = value;
        this.step = step ?? 0;
        this.row = row ?? 0;
        this.col = col ?? 0;
        this.lastMove = lastMove ?? null;
        this.nextMove = nextMove ?? null;
    }
}

function createEmptyBoard(): Board<Move> {
    return Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => new Move(values.free, 0))
    );
}

function checkWin(board: Board<Move>, move: Move): boolean {
    // Check column
    let win: boolean = true;
    for (let y = 0; y < 3; y++) {
        if (board[y][move.col].value !== move.value) {
            win = false;
            break;
        }
    }
    if (win) return true;

    // Check row
    win = true;
    for (let x = 0; x < 3; x++) {
        if (board[move.row][x].value !== move.value) {
            win = false;
            break;
        }
    }
    if (win) return true;

    // Check diagonals (only if move is on a diagonal)
    if (move.row === move.col || move.row + move.col === 2) {
        win = true;
        for (let i = 0; i < 3; i++) {
            if (board[i][i].value !== move.value) {
                win = false;
                break;
            }
        }
        if (win) return true;

        // Anti-diagonal
        win = true;
        for (let i = 0; i < 3; i++) {
            if (board[i][2-i].value !== move.value) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }

    return false;
}

// Using Partial<TicTacToeGameProps> makes ALL props optional
// This allows the component to work in both standalone and controlled modes
export default function TicTacToe({
    boardIndex = 0,           // Default value for standalone mode
    isActive = true,          // Default value for standalone mode
    isWon = false,           // Default value for standalone mode
    winner,
    onMove,                  // undefined = standalone mode, function = controlled mode
    board: externalBoard,    // undefined = use internal state
    currentPlayer: externalCurrentPlayer, // undefined = use internal state
    showResetButton = true
}: Partial<TicTacToeGameProps>) {
    
    // Internal state for standalone mode
    const [internalBoard, setInternalBoard] = useState<Board<Move>>(createEmptyBoard());
    const [internalCurrentPlayer, setInternalCurrentPlayer] = useState(values.cross);
    const [internalIsWon, setInternalIsWon] = useState(false);
    const [internalWinner, setInternalWinner] = useState<string>(values.free);

    // Smart prop selection: use external props if provided, otherwise use internal state
    const board = externalBoard || internalBoard;
    const currentPlayer = externalCurrentPlayer || internalCurrentPlayer;
    const actualIsWon = isWon || internalIsWon;
    const actualWinner = winner || internalWinner;

    const handleCellClick = (rowIdx: number, colIdx: number) => {
        if (actualIsWon) return; // Game already won
        if (!isActive && externalBoard) return; // Only check isActive for controlled mode
        
        const cell = board[rowIdx][colIdx];
        if (cell.value !== values.free) return; // Cell already taken

        if (onMove) {
            // CONTROLLED MODE: Just notify the parent, don't update internal state
            onMove(boardIndex, rowIdx, colIdx);
        } else {
            // STANDALONE MODE: Manage own state
            const newMove = new Move(currentPlayer, 0, rowIdx, colIdx);
            const newBoard = board.map((row, r) =>
                row.map((m, c) => (r === rowIdx && c === colIdx ? newMove : m))
            );
            
            setInternalBoard(newBoard);
            
            if (checkWin(newBoard, newMove)) {
                setInternalIsWon(true);
                setInternalWinner(currentPlayer);
            } else {
                // Switch players
                setInternalCurrentPlayer(currentPlayer === values.cross ? values.circle : values.cross);
            }
        }
    };

    const handleReset = () => {
        setInternalBoard(createEmptyBoard());
        setInternalCurrentPlayer(values.cross);
        setInternalIsWon(false);
        setInternalWinner(values.free);
    };

    // Show winner display for won boards
    if (actualIsWon && actualWinner && actualWinner !== values.free) {
        return (
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-4 border-yellow-100 flex items-center justify-center">
                <div className="text-yellow-100 font-bold text-3xl sm:text-4xl md:text-5xl">{actualWinner}</div>
            </div>
        );
    }

    // Visual indicator: green border for active board in controlled mode
    const borderClass = isActive && externalBoard !== undefined 
        ? "border-4 border-green-400" 
        : "border-2 border-gray-400";

    return (
        <div>
            <div className={`${borderClass} p-1 sm:p-2`}>
                <div className="grid grid-cols-3 gap-0">
                    {board.map((row, rowIdx) => (
                        row.map((cellMove, colIdx) => (
                            <button
                                key={`${rowIdx}-${colIdx}`}
                                onClick={() => handleCellClick(rowIdx, colIdx)}
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border border-yellow-100 text-yellow-100 font-bold text-lg sm:text-xl md:text-2xl text-center hover:bg-yellow-100 hover:bg-opacity-10 disabled:hover:bg-transparent touch-manipulation"
                                disabled={actualIsWon || (!isActive && externalBoard !== undefined)}
                            >
                                {cellMove.value}
                            </button>
                        ))
                    ))}
                </div>
            </div>

            {/* Only show reset button in standalone mode */}
            {showResetButton && !externalBoard && (
                <button 
                    onClick={handleReset} 
                    className="text-yellow-100 border border-yellow-100 px-3 py-2 sm:px-4 sm:py-2 rounded-md mt-3 sm:mt-4 hover:bg-yellow-100 hover:text-black mx-auto block text-sm sm:text-base touch-manipulation"
                >
                    Reset
                </button>
            )}
        </div>
    );
}

// Export utilities for Ultimate component to use
export { Move, createEmptyBoard, checkWin, values };
export type { Board };