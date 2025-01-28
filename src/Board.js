import React from "react";
import Square from "./Square";
import { calculateWinner } from "./Helpers";

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
    <div className="board flex flex-col gap-4">
      {[0, 1, 2].map((row) => (
        <div className="board-row flex gap-4" key={row}>
          {[0, 1, 2].map((col) => (
            <Square
              key={row * 3 + col}
              value={squares[row * 3 + col]}
              onSquareClick={() => handleClick(row * 3 + col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
