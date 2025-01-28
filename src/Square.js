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

export default Square;
