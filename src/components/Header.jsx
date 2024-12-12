import React from "react";
import { motion } from "framer-motion";

const Header = ({ scores }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="header-card"
    >
      <motion.h1
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="game-title"
      >
        Plant Tic-Tac-Toe
      </motion.h1>
      {scores && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="score-board"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="score-item"
          >
            <span>Tulsi 🌿</span>
            <motion.span className="ml-2">{scores.Tulsi}</motion.span>
          </motion.div>
          <span className="score-divider">vs</span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="score-item"
          >
            <span>Neem 🍃</span>
            <motion.span className="ml-2">{scores.Neem}</motion.span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Header;