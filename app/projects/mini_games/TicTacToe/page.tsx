

import TicTacToeGame from "@/app/components/TicTacToeGame";

export default function TicTacToe() {
	return (
		<div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen">
			<h1 className="text-yellow-100 font-bold text-2xl sm:text-3xl lg:text-4xl text-center mb-4 sm:mb-6">
				Tic Tac Toe
			</h1>
			<div className="flex justify-center">
				<TicTacToeGame showResetButton={true} />
			</div>
		</div>
	);
}
