import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROWS = 6;
const COLS = 7;
const EMPTY = null;

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function checkWinner(board, row, col) {
  const player = board[row][col];
  if (!player) return null;

  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal \
    [1, -1],  // diagonal /
  ];

  for (const [dr, dc] of directions) {
    let count = 1;

    for (let i = 1; i < 4; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break;
      if (board[r][c] === player) count++;
      else break;
    }

    for (let i = 1; i < 4; i++) {
      const r = row - dr * i;
      const c = col - dc * i;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break;
      if (board[r][c] === player) count++;
      else break;
    }

    if (count >= 4) return player;
  }

  return null;
}

export default function Connect4() {
  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState("R");
  const [winner, setWinner] = useState(null);

  function dropDisc(col) {
    if (winner) return;

    const newBoard = board.map(row => [...row]);

    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === EMPTY) {
        newBoard[row][col] = player;

        const win = checkWinner(newBoard, row, col);
        if (win) setWinner(win);

        setBoard(newBoard);
        setPlayer(player === "R" ? "Y" : "R");
        return;
      }
    }
  }

  function reset() {
    setBoard(createBoard());
    setPlayer("R");
    setWinner(null);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1
        className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-9xl
             font-black uppercase text-center"
        style={{
          WebkitTextStroke: "5px black",
        }}
      >Connect 4</h1>

      <motion.div
        key={winner || player}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-lg"
      >
        <h2 className="text-4xl font-bold">
          {winner
            ? `Winner: ${winner === "R" ? "Red" : "Yellow"}`
            : `Turn: ${player === "R" ? "Red" : "Yellow"}`}
        </h2>
      </motion.div>

      {/* Board wrapper */}
      <div className="w-full overflow-x-auto flex justify-center">
        <div className="grid grid-rows-6 gap-1 sm:gap-2 bg-blue-700 p-2 sm:p-3 rounded-2xl">
          {board.map((row, r) => (
            <div key={r} className="grid grid-cols-7 gap-1 sm:gap-2">
              {row.map((cell, c) => (
                <div
                  key={c}
                  onClick={() => dropDisc(c)}
                  className="
                    w-10 h-10
                    sm:w-12 sm:h-12
                    md:w-14 md:h-14
                    rounded-full bg-white
                    flex items-center justify-center
                    cursor-pointer
                    active:scale-95
                  "
                >
                  <AnimatePresence>
                    {cell && (
                      <motion.div
                        initial={{ y: -80, scale: 0.6, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 18,
                        }}
                        className={`
                          w-8 h-8
                          sm:w-10 sm:h-10
                          md:w-12 md:h-12
                          rounded-full
                          ${cell === "R" ? "bg-red-500" : "bg-yellow-400"}
                        `}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        className="px-5 py-2 rounded-xl bg-gray-800 text-white font-bold"
      >
        Reset Game
      </motion.button>
    </div>
  );
}
