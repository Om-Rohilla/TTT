import React, { useState } from "react";
import Board from "./components/Board";
import PlantInfo from "./components/PlantInfo";
import Header from "./components/Header";
import WinnerAnnouncement from "./components/WinnerAnnouncement";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/index.css";

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState("Tulsi");
  const [plantDetails, setPlantDetails] = useState({
    name: "-",
    commonName: "-",
    habitat: "-",
    advantages: "-",
    disadvantages: "-",
  });
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ Tulsi: 0, Neem: 0 });
  const [isRestarting, setIsRestarting] = useState(false);

  const handlePlantUpdate = (player) => {
    const plantData = {
      Tulsi: {
        name: "Tulsi",
        commonName: "Holy Basil",
        habitat: "Tropical and Subtropical Regions",
        advantages: "Boosts immunity, reduces stress, improves digestion.",
        disadvantages: "May cause low blood sugar in some people.",
      },
      Neem: {
        name: "Neem",
        commonName: "Indian Lilac",
        habitat: "Dry and Arid Regions",
        advantages: "Antibacterial, improves skin health, aids dental care.",
        disadvantages: "Overuse may lead to liver damage.",
      },
    };
    setPlantDetails(plantData[player]);
  };

  const declareWinner = (player) => {
    setWinner(player);
    if (player !== "Draw") {
      setScores((prev) => ({
        ...prev,
        [player]: prev[player] + 1,
      }));
    }
  };

  const restartGame = () => {
    setIsRestarting(true);
    setWinner(null);
    setCurrentPlayer("Tulsi");
    setPlantDetails({
      name: "-",
      commonName: "-",
      habitat: "-",
      advantages: "-",
      disadvantages: "-",
    });
    setTimeout(() => {
      setIsRestarting(false);
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="game-container"
    >
      <Header scores={scores} />
      <AnimatePresence>
        {winner && <WinnerAnnouncement winner={winner} />}
      </AnimatePresence>
      <motion.div
        className={`game-area ${winner ? "game-over" : ""}`}
        animate={winner ? { opacity: 0.6, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Board
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          handlePlantUpdate={handlePlantUpdate}
          declareWinner={declareWinner}
          isRestarting={isRestarting}
        />
        <PlantInfo plantDetails={plantDetails} winner={winner} />
      </motion.div>
      <AnimatePresence>
        {winner && !isRestarting && (
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "var(--secondary-green)",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={restartGame}
            className="restart-button"
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
          >
            Play Again
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;