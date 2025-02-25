import { useState } from "react";

const goalState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
];

const shuffleArray = (arr) => {
    let flatArr = arr.flat();
    for (let i = flatArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flatArr[i], flatArr[j]] = [flatArr[j], flatArr[i]];
    }
    return [
        flatArr.slice(0, 3),
        flatArr.slice(3, 6),
        flatArr.slice(6, 9),
    ];
};

export default function PuzzleGame() {
    // Start with a shuffled grid
    const [grid, setGrid] = useState(shuffleArray(goalState));

    const findEmptyCell = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (grid[r][c] === 0) return { r, c };
            }
        }
    };

    const moveTile = (r, c) => {
        const { r: emptyR, c: emptyC } = findEmptyCell();
        const isAdjacent =
            (Math.abs(emptyR - r) === 1 && emptyC === c) ||
            (Math.abs(emptyC - c) === 1 && emptyR === r);

        if (isAdjacent) {
            const newGrid = grid.map((row) => [...row]);
            [newGrid[emptyR][emptyC], newGrid[r][c]] = [newGrid[r][c], newGrid[emptyR][emptyC]];
            setGrid(newGrid);
        }
    };

    const isSolved = JSON.stringify(grid) === JSON.stringify(goalState);

    return (
        <div className="app-container">
            <div className="game-card">
                <h1 className="game-title">8-Puzzle Game</h1>
                <div className="puzzle-container">
                    {grid.map((row, r) =>
                        row.map((num, c) => (
                            <button
                                key={`${r}-${c}`}
                                onClick={() => moveTile(r, c)}
                                className={`tile ${num === 0 ? "empty" : ""}`}
                            >
                                {num !== 0 ? num : ""}
                            </button>
                        ))
                    )}
                </div>
                {isSolved && <p className="solved-message">Congratulations! Puzzle Solved 🎉</p>}
            </div>
        </div>
    );
}
