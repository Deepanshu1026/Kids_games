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
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                aspectRatio: '1',
                perspective: '1000px',
                cursor: 'pointer'
              }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Back of the card (Hidden face when not flipped) */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#FF6B6B',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2.5rem',
                  backfaceVisibility: 'hidden',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                  zIndex: 2
                }}>
                  ❓
                </div>

                {/* Front of the card (Visible face when flipped) */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: solved.includes(index) ? '#4ECDC4' : 'white',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2.5rem',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.08)'
                }}>
                  {icon}
                </div>
              </motion.div>
            </div>
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
