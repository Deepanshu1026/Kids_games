import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const animals = [
  { id: 1, icon: '🐘', shadow: '🐘' },
  { id: 2, icon: '🦒', shadow: '🦒' },
  { id: 3, icon: '🦁', shadow: '🦁' },
  { id: 4, icon: '🦉', shadow: '🦉' },
];

const ShadowMatch = () => {
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Match the animal to its shadow!');

  useEffect(() => {
    generateLevel();
  }, []);

  const generateLevel = () => {
    const randomTarget = animals[Math.floor(Math.random() * animals.length)];
    setTarget(randomTarget);
    setOptions([...animals].sort(() => Math.random() - 0.5));
  };

  const handleMatch = (animal) => {
    if (animal.id === target.id) {
      setScore(s => s + 1);
      setMessage('Correct! 🌟');
      setTimeout(() => {
        setMessage('Match the animal to its shadow!');
        generateLevel();
      }, 1000);
    } else {
      setMessage('Not quite! Try again.');
    }
  };

  return (
    <div className="game-screen shadow-match-game" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      width: '100%',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div className="game-score-pill" style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        fontSize: '1.4rem', 
        fontWeight: 'bold', 
        color: '#1A1A4E',
        background: '#FFD93D22',
        padding: '8px 20px',
        borderRadius: '20px'
      }}>
        Score: {score}
      </div>
      
      <div className="shadow-target-wrap" style={{ marginBottom: '50px' }}>
        <div className="shadow-target" style={{ 
          fontSize: '7rem', 
          filter: 'brightness(0)', 
          opacity: 0.15,
          background: '#f0f0f0',
          borderRadius: '50%',
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          border: '4px dashed #ddd'
        }}>
          {target?.icon}
        </div>
        <p style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: '800', color: '#666' }}>Whose shadow is this?</p>
      </div>

      <div className="shadow-options" style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        {options.map((animal) => (
          <motion.button
            key={animal.id}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMatch(animal)}
            style={{
              fontSize: '4rem',
              padding: '24px',
              borderRadius: '30px',
              border: '3px solid #f0e8ff',
              background: 'white',
              boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {animal.icon}
          </motion.button>
        ))}
      </div>
      
      <div style={{ minHeight: '60px', marginTop: '40px' }}>
        <h3 style={{ color: '#A29BFE', fontFamily: "'Fredoka One', cursive", fontSize: '1.6rem' }}>{message}</h3>
      </div>
    </div>
  );
};

export default ShadowMatch;
