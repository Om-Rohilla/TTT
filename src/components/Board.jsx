import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/board.css";

const Board = ({ currentPlayer, setCurrentPlayer, handlePlantUpdate, declareWinner, isRestarting }) => {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [winningCells, setWinningCells] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    if (isRestarting) {
      setGameBoard(Array(9).fill(null));
      setIsGameOver(false);
      setMoveCount(0);
      setWinningCells([]);
    }
  }, [isRestarting]);

  const plantEmojis = {
    Tulsi: {
      icon: "🌿",
      rotateStart: -45,
      rotateEnd: 0,
      scale: 1.2
    },
    Neem: {
      icon: "🍃",
      rotateStart: 45,
      rotateEnd: 0,
      scale: 1.2
    }
  };

  const handleClick = (index) => {
    if (gameBoard[index] || isGameOver) return;

    const newBoard = [...gameBoard];
    newBoard[index] = currentPlayer;

    setGameBoard(newBoard);
    setMoveCount((prev) => prev + 1);

    const winResult = checkWinner(newBoard);
    if (winResult.hasWinner) {
      setWinningCells(winResult.combination);
      setIsGameOver(true);
      declareWinner(currentPlayer);
      handlePlantUpdate(currentPlayer);
      return;
    }

    if (moveCount === 8) {
      setIsGameOver(true);
      declareWinner("Draw");
      return;
    }

    setCurrentPlayer(currentPlayer === "Tulsi" ? "Neem" : "Tulsi");
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      if (combination.every((index) => board[index] === currentPlayer)) {
        return { hasWinner: true, combination };
      }
    }
    return { hasWinner: false, combination: [] };
  };

  return (
    <div className="board relative transform-gpu perspective-1000">
      {gameBoard.map((cell, index) => (
        <motion.div
          key={index}
          className={`cell relative ${winningCells.includes(index) ? 'winner' : ''}
                    ${hoveredCell === index && !cell ? 'hover:shadow-xl' : ''}`}
          onHoverStart={() => setHoveredCell(index)}
          onHoverEnd={() => setHoveredCell(null)}
          onClick={() => handleClick(index)}
          whileHover={{
            scale: cell ? 1 : 1.05,
            rotateX: cell ? 0 : 10,
            rotateY: cell ? 0 : 10,
            transition: { duration: 0.2 }
          }}
        >
          {cell && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: plantEmojis[cell].scale,
                opacity: 1,
                rotate: [plantEmojis[cell].rotateStart, plantEmojis[cell].rotateEnd]
              }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {plantEmojis[cell].icon}
            </motion.div>
          )}
          {hoveredCell === index && !cell && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="absolute inset-0 flex items-center justify-center text-gray-400"
            >
              {plantEmojis[currentPlayer].icon}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Board;