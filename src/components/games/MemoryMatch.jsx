import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const icons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐯', '🐮', '🐷'];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameIcons = [...icons.slice(0, 6), ...icons.slice(0, 6)];
    const shuffled = gameIcons.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSolved([]);
    setFlipped([]);
  };

  const handleClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      width: '100%',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.8rem', color: '#1A1A4E' }}>
          Find the pairs! {solved.length / 2} / {cards.length / 2}
        </h3>
        {solved.length === cards.length && cards.length > 0 && (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="btn btn-primary" 
            style={{ marginTop: '10px' }}
            onClick={initializeGame}
          >
            Play Again! ✨
          </motion.button>
        )}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        maxWidth: '440px',
        width: '100%',
        margin: '0 auto'
      }}>
        {cards.map((icon, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index);
          return (
            <motion.div
              key={index}
              whileHover={!isFlipped ? { scale: 1.05 } : {}}
              onClick={() => handleClick(index)}
              style={{
                aspectRatio: '1',
                background: solved.includes(index) ? '#4ECDC4' : (flipped.includes(index) ? 'white' : '#FF6B6B'),
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2.5rem',
                cursor: 'pointer',
                boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                transition: 'background 0.3s ease',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
              }}
            >
              <div style={{ 
                transform: isFlipped ? 'rotateY(180deg)' : 'none',
                backfaceVisibility: 'hidden'
              }}>
                {isFlipped ? icon : '❓'}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ minHeight: '40px', marginTop: '20px' }}>
         {solved.length === cards.length && cards.length > 0 && (
           <h2 style={{ color: '#00B894', fontFamily: "'Fredoka One', cursive" }}>Amazing Memory! 🏆</h2>
         )}
      </div>
    </div>
  );
};

export default MemoryMatch;
