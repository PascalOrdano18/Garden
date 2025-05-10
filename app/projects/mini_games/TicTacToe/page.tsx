'use client';

import { useState } from "react";

const values = {
    cross: "X",
    circle: "O",
    free: " "
}

class Grid {
    board: string[];
    lastValue: string;
    lastMoveX: number;
    lastMoveY: number;
    next: Grid | null;

    constructor(board: string[], lastValue: string, lastMoveX: number, lastMoveY: number, next: Grid | null) {
        this.board = board;
        this.lastValue = lastValue;
        this.lastMoveX = lastMoveX;
        this.lastMoveY = lastMoveY;
        this.next = next;
    }

    checkGame(): boolean {
        let isFinished = false;

        for(let x = 0; x < 2; x++){
            if(this.board[x + 3*this.lastMoveY] !== this.lastValue){
                break;
            } else {
                isFinished = true;
            }
        }
        if(isFinished){
            return true;
        }

        for(let y = this.lastMoveY; y < 2; y++){
            if(this.board[this.lastMoveX + 3*y] !== this.lastValue){
                break;   
            } else {
                isFinished = true;
            }
        }

        if(isFinished){
            return true;
        }
        
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 2; j++){
                if(this.board[i + 3*j] !== this.lastValue){
                    break;
                } else {
                    isFinished = true;
                }
            }
        }

        for(let i = 0; i < 2; i++){
            for(let j = 2; j > 0; j--){
                if(this.board[i + 3 * j] !== this.lastValue){
                    break;
                } else {
                    isFinished = true;
                }
            }
        }
        
        return isFinished;
    }
}

export default function TicTacToe() {
    const [matchType, setMatchType] = useState(true); // true for computer, false for human
    const [currentGrid, setCurrentGrid] = useState<Grid>(new Grid(Array(9).fill(values.free), values.free, 0, 0, null));
    const [gameFinished, setGameFinished] = useState(false);

    const handleMove = (index: number) => {
        if(currentGrid.board[index] !== values.free || gameFinished){
            return;
        }

        const x = index % 3;
        const y = Math.floor(index / 3);
        
        // Player's move
        const newBoard = [...currentGrid.board];
        newBoard[index] = values.cross;
        
        // Create new grid for player's move
        const playerGrid = new Grid(newBoard, values.cross, x, y, currentGrid);
        
        // Check if player won
        if(playerGrid.checkGame()){
            setGameFinished(true);
            setCurrentGrid(playerGrid);
            return;
        }

        if(matchType) {
            // Computer's move
            const freeCells = newBoard.reduce<number[]>((acc, cell, idx) => {
                if(cell === values.free){
                    acc.push(idx);
                }
                return acc;
            }, []);

            if(freeCells.length > 0){
                const randomIndex = Math.floor(Math.random() * freeCells.length);
                const computerMove = freeCells[randomIndex];
                newBoard[computerMove] = values.circle;
                
                const computerX = computerMove % 3;
                const computerY = Math.floor(computerMove / 3);
                
                const finalGrid = new Grid(newBoard, values.circle, computerX, computerY, playerGrid);
                
                // Check if computer won
                if(finalGrid.checkGame()){
                    setGameFinished(true);
                    setCurrentGrid(finalGrid);
                    return;
                }
                
                setCurrentGrid(finalGrid);
            }
        } else {
            setCurrentGrid(playerGrid);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Tic Tac Toe</h1>
            <div className="flex flex-row w-full justify-center">
                <p>Match Type: </p>
                <button onClick={() => {
                    setMatchType(!matchType);
                    setGameFinished(false);
                    setCurrentGrid(new Grid(Array(9).fill(values.free), values.free, 0, 0, null));
                }}>{matchType ? "computer" : "human"}</button>
            </div>

            <div className="grid grid-cols-3 grid-rows-3">
                {currentGrid.board.map((cell, index) => (
                    <div key={index} className="border border-gray-300 w-40 h-40 flex items-center justify-center">
                        <button 
                            className="w-40 h-40 text-yellow-100 font-bold text-4xl" 
                            onClick={() => handleMove(index)}
                        >
                            {cell}
                        </button>
                    </div>
                ))}

                <button onClick={() => {
                    setGameFinished(false);
                    setCurrentGrid(new Grid(Array(9).fill(values.free), values.free, 0, 0, null));
                }}>Reset</button>
            </div>
        </div>
    )
}



