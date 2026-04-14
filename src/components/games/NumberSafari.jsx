import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const animals = ['🦁', '🐘', '🦒', '🦓', '🐒', '🐢'];

const NumberSafari = () => {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentAnimals, setCurrentAnimals] = useState([]);

  useEffect(() => {
    generateLevel();
  }, []);

  const generateLevel = () => {
    const num = Math.floor(Math.random() * 5) + 1;
    setTargetCount(num);
    
    // Generate random animal display
    const animalChar = animals[Math.floor(Math.random() * animals.length)];
    const newAnimals = Array(num).fill(animalChar).map((a, i) => ({
      id: i,
      char: a,
      top: Math.random() * 60 + 20,
      left: Math.random() * 80 + 10
    }));
    setCurrentAnimals(newAnimals);

    // Generate options
    const correct = num;
    const others = new Set();
    while(others.size < 2) {
      const r = Math.floor(Math.random() * 6) + 1;
      if (r !== correct) others.add(r);
    }
    setOptions([correct, ...Array.from(others)].sort(() => Math.random() - 0.5));
  };

  const handleGuess = (guess) => {
    if (guess === targetCount) {
      setScore(s => s + 1);
      setTimeout(generateLevel, 1000);
    }
  };

  return (
    <div className="game-screen number-safari-game" style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
        Safari Score: {score}
      </div>
      
      <div className="safari-scene" style={{ 
        flex: 1, 
        background: '#E3F2FD', 
        borderRadius: '30px', 
        position: 'relative',
        margin: '10px',
        overflow: 'hidden',
        minHeight: '300px'
      }}>
        {currentAnimals.map((a) => (
          <motion.div
            key={a.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ 
              position: 'absolute', 
              top: `${a.top}%`, 
              left: `${a.left}%`,
              fontSize: '4rem'
            }}
          >
            {a.char}
          </motion.div>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#1976D2' }}>How many animals can you see?</h2>
        <div className="number-options" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {options.map((opt) => (
            <motion.button
              key={opt}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleGuess(opt)}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                border: 'none',
                background: '#FF9F43',
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 5px 0 #E67E22'
              }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberSafari;
