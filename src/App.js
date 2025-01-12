import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-16 h-16 bg-gray-600 text-2xl font-bold text-white rounded hover:bg-gray-500 transition duration-300"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <div>
      <div className="board flex flex-col gap-4">
        <div className="board-row flex gap-4">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row flex gap-4">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row flex gap-4">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showWinnerScreen, setShowWinnerScreen] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (calculateWinner(nextSquares)) {
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

  if (!showWinnerScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className="game-board p-4 bg-gray-900 rounded-lg shadow-lg">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>

        {currentMove > 0 && (
          <div className="game-info mt-4 mb-4 p-4 bg-gray-700 rounded-lg shadow-md w-full max-w-xs">
            <ol className="list-none flex flex-col items-center">{moves}</ol>

            {winner && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={resetGame}
                  className="bg-green-500 px-6 py-2 rounded font-semibold text-white hover:bg-green-600 transition"
                >
                  Replay
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Winner is: <span className="text-yellow-400">{winner}</span>
      </h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={resetGame}
          className="bg-green-500 px-6 py-2 rounded font-semibold text-white hover:bg-green-600 transition"
        >
          Replay
        </button>
        <button
          onClick={() => setShowWinnerScreen(false)}
          className="bg-blue-500 px-6 py-2 rounded font-semibold text-white hover:bg-blue-600 transition"
        >
          Back to Moves
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
