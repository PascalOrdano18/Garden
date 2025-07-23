import TicTacToeGame from "@/app/components/TicTacToeGame";


export default function Ultimate() {
    return (
        <div>
            {Array.from({ length: 9 }).map((_, i) => (
                <TicTacToeGame key={i} />
            ))}
        </div>
    );
}