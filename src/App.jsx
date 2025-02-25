import React, { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = [1, 2, 3, 4, 5, 6, 7, 8, null];
  const [board, setBoard] = useState(initialBoard);


  const shuffleBoard = () => {
    let shuffled = [...initialBoard];
    do {
      shuffled = [...shuffled];
      
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (!isSolvable(shuffled) || isSolved(shuffled));
    setBoard(shuffled);
  };

  const isSolvable = (array) => {
    let inversionCount = 0;
    const arr = array.filter((num) => num !== null);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) inversionCount++;
      }
    }
    return inversionCount % 2 === 0;
  };


  const isSolved = (currentBoard) => {
    for (let i = 0; i < currentBoard.length - 1; i++) {
      if (currentBoard[i] !== i + 1) return false;
    }
    return true;
  };

 
  const moveTile = (index) => {
    const emptyIndex = board.indexOf(null);
    const validMoves = getValidMoves(emptyIndex);
    if (validMoves.includes(index)) {
      const newBoard = [...board];
      newBoard[emptyIndex] = newBoard[index];
      newBoard[index] = null;
      setBoard(newBoard);
    }
  };

  const getValidMoves = (emptyIndex) => {
    const moves = [];
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    if (row > 0) moves.push(emptyIndex - 3); // up
    if (row < 2) moves.push(emptyIndex + 3); // down
    if (col > 0) moves.push(emptyIndex - 1); // left
    if (col < 2) moves.push(emptyIndex + 1); // right
    return moves;
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">8 Puzzle Game</h1>
      <div className="board mx-auto">
        <div className="row no-gutters">
          {board.map((tile, index) => (
            <div key={index} className="col-4 p-1">
              <div
                className={`tile ${tile ? "tile-number" : "tile-empty"}`}
                onClick={() => moveTile(index)}
              >
                {tile}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="shuffle" onClick={shuffleBoard}>
          Shuffle
        </button>
      </div>
    </div>
  );
}

export default App;
