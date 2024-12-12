import React from "react";
import { motion } from "framer-motion";

const WinnerAnnouncement = ({ winner }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", bounce: 0.5 }}
    className="winner-message"
  >
    {winner === "Draw" ? (
      <motion.div
        animate={{ y: [0, -5, 0] }}  // Reduced movement
        transition={{ duration: 1, repeat: Infinity }}
        className="space-y-2"
      >
        <div className="text-3xl">🌱 It's a Draw! 🌱</div>
        <div className="text-xl font-normal">Both plants grow together in harmony</div>
      </motion.div>
    ) : (
      <motion.div
        animate={{ y: [0, -5, 0] }}  // Reduced movement
        transition={{ duration: 1, repeat: Infinity }}
        className="space-y-2"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}  // Changed from rotation to gentle scaling
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {winner === "Tulsi" ? "🌿" : "🍃"}
        </motion.div>
        <div>{winner} Wins!</div>
        <div className="text-xl font-normal">Nature's champion!</div>
      </motion.div>
    )}
  </motion.div>
);

export default WinnerAnnouncement;