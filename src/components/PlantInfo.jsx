import React from "react";
import { motion } from "framer-motion";
import "../styles/plantInfo.css";

const PlantInfo = ({ plantDetails, winner }) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="plant-info-card"
    >
      <motion.h2
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-center"
      >
        Plant Information
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {winner ? (
          <>
            {Object.entries(plantDetails).map(([key, value], index) => (
              <motion.p
                key={key}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <strong>{key}:</strong> {value}
              </motion.p>
            ))}
          </>
        ) : (
          <div className="space-y-6 opacity-50">
            <p><strong>Name:</strong> Select a winner to reveal</p>
            <p><strong>Common Name:</strong> ?</p>
            <p><strong>Habitat:</strong> ?</p>
            <p><strong>Benefits:</strong> ?</p>
            <p><strong>Cautions:</strong> ?</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PlantInfo;