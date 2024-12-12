import React from "react";
import { motion } from "framer-motion";

const Cell = ({ value, onClick }) => {
  return (
    <motion.div
      className="cell"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {value}
    </motion.div>
  );
};

export default Cell;