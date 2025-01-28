import { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./Helpers";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showWinnerScreen, setShowWinnerScreen] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isTied = !winner && currentSquares.every((square) => square !== null);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (
      calculateWinner(nextSquares) ||
      nextSquares.every((square) => square !== null)
    ) {
      setShowWinnerScreen(true);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowWinnerScreen(false);
  }

  const moves = history
    .map((squares, move) => {
      if (move === 0) return null;
      return (
        <li key={move}>
          <button
            onClick={() => jumpTo(move)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mt-2"
          >
            {`Go to move #${move}`}
          </button>
        </li>
      );
    })
    .filter(Boolean);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="game-board p-4 bg-gray-900 rounded-lg shadow-lg">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      {currentMove > 0 && (
        <div className="game-info mt-4 mb-4 p-4 bg-gray-700 rounded-lg shadow-md w-full max-w-xs">
          <ol className="list-none flex flex-col items-center">{moves}</ol>
          <div className="mt-4 flex justify-center">
            <button
              onClick={resetGame}
              className="bg-green-500 px-6 py-2 rounded font-semibold text-white hover:bg-green-600 transition"
            >
              Replay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
