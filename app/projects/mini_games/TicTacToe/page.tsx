
'use client';

import { useState } from "react";


export default function TicTacToe() {

    const values = 
        {
            cross:"X",
            circle:"O",
            free:" "
        }
    const [matchType, setMatchType] = useState(true);
    const [board, setBoard] = useState<string[]>(Array(9).fill(values.free));
    const [gameFinished, setGameFinished] = useState(false);


    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Tic Tac Toe</h1>
            <div className="flex flex-row w-full justify-center">
                <p>Match Type: </p>
                <button onClick={() => setMatchType(!matchType)}>{matchType == true ? "computer" : "human"}</button>
            </div>

            <div className="grid grid-cols-3 grid-rows-3">
                {
                    matchType == true ? (
                        board.map((cell, index) => {
                            return (
                                <div key={index} className="border border-gray-300 w-10 h-10 flex items-center justify-center">
                                    <button className="w-10 h-10" onClick={() => {
                                        if(board[index] !== values.free){
                                            return ;
                                        }
                                        setBoard((previousBoard) => {
                                            const newBoard = [...previousBoard];
                                            newBoard[index] = values.cross;
                                            
                                            const freeCells = newBoard.reduce<number[]>((acc, cell, index) => {
                                                if(cell === values.free){
                                                    acc.push(index);
                                                }
                                                return acc;
                                            }, []);

                                            if(freeCells.length > 0){
                                                const randomIndex : number = freeCells[Math.floor(Math.random() * freeCells.length)];
                                                newBoard[randomIndex] = values.circle;
                                            }
                                            

                                            return newBoard;
                                        });
        
                                    }}>{cell}</button>
                                </div>
                            );
                        })
                    ) : (
                        board.map((cell, index) => {
                            return (
                                <div key={index} className="border border-gray-300 w-10 h-10 flex items-center justify-center">
                                    <button className="w-10 h-10" onClick={() => {
                                        if(board[index] !== values.free){
                                            return ;
                                        }
                                        setBoard((previousBoard) => {
                                            const newBoard = [...previousBoard];
                                            newBoard[index] = values.cross;
                                            return newBoard;
                                        });
        
                                    }}>{cell}</button>
                                </div>
                            );
                        })
                    )
                
                
                }

                <button onClick={() => {setBoard((previousBoard) => {
                    const newBoard = [...previousBoard];
                    newBoard.fill(values.free);
                    return newBoard;
                })}} >Reset</button>

            </div>
        </div>
    )
}

