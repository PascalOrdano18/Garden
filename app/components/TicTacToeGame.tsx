"use client"

import { useState } from "react";


type Board<T> = T[][];   // Board contiene Moves

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
	let win: boolean = true;
	for (let y = 0; y < 3; y++) {
		if (board[y][move.col].value !== move.value) {
			win = false;
		}
	}
	if (win) {
		return win;
	}

	win = true;
	for (let x = 0; x < 3; x++) {
		if (board[move.row][x].value !== move.value) {
			win = false;
		}
	}
	if (win) {
		return win;
	}

	win = true;
	if ((((move.col == 0 || move.col == 2) && (move.row == 0 || move.row == 2)) || (move.col == 1 && move.row == 1))) {
		let x: number = 0;
		let y: number = 0;
		while (x <= 2 && y <= 2) {
			if (board[x][y].value !== move.value) {
				win = false;
			}
			x++;
			y++;
		}
		if (win) {
			return win;
		}
		win = true;
		let x2: number = 2;
		let y2: number = 0;

		while (x2 >= 0 && y2 <= 2) {
			if (board[x2][y2].value !== move.value) {
				win = false;
			}
			x2--;
			y2++;
		}
		if (win) {
			return win;
		}
	}


	if(move.step == 10) {
		return true;
	}

	return false;

}



export default function TicTacToe({
    boardIndex,
    isActive,
    isWon,
    winner,
    onMove,
    board,
    currentPlayer,
    showResetButton = true
    }: TicTacToeGameProps
 ) {

	const [lastMove, setLastMove] = useState<Move | null>(null);
	const [changeVal, setChangeVal] = useState(true);

	const [currentStep, setCurrentStep] = useState(0);
	const [tie, setTie] = useState(false);

	const handleCellClick = (rowIdx: number, colIdx: number) => {
        if(!isActive || isWon) return ;

		const cell = board[rowIdx][colIdx];
		if (cell.value !== values.free) return;

        onMove(boardIndex, rowIdx, colIdx);

		const newValue = (changeVal ? values.cross : values.circle);
		setChangeVal(!changeVal);

		// Create new move with incremented step

		const newStep = currentStep + 1;
		const newMove = new Move(newValue, newStep, rowIdx, colIdx, lastMove, null);
		if (lastMove) {
			lastMove.nextMove = newMove;
		}
		setLastMove(newMove);
		setCurrentStep(newStep);

	}

	const handleReset = () => {
		setBoard(createEmptyBoard());
		setLastMove(null);
		setChangeVal(true);
		setWinner(values.free);
		setTie(false);
		setCurrentStep(0);
	}

    if(isWon && winner){
        return (
            <div className="w-96 h-96 border-4 border-yellow-100 flex items-center justify-center">
                <div className="text-yellow-100 font-bold text-8xl">{winner}</div>
            </div>
        )
    }

    const borderClass = isActive ? "border-4 border-green-400" : "border-2 border-gray-400";

	return (
		<div>
			<div className={`${borderClass} p-2`}>
				<div className="grid grid-cols-3">
                    {board.map((row, rowIdx) => (
                        row.map((cellMove, colIdx) => (
                            <button
                                key={`${rowIdx} - ${colIdx}`}
                                onClick={() => handleCellClick(rowIdx, colIdx)}
                                className="w-32 h-32 border border-yellow-100 text-yellow-100 font-bold text-4xl text-center"
                                disabled={!isActive || isWon}
                            >
                                {cellMove.value}
                            </button>
                        ))
                    ))}
                </div>
			</div>

			{/* {showResetButton && <button onClick={handleReset} className="text-yellow-100 border border-yellow-100 px-4 py-2 rounded-md mt-4 hover:bg-yellow-100 hover:text-black mx-auto block">Reset</button>} */}
		</div>
	)
}
