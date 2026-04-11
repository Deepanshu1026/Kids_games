import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const shapes = [
  { id: 1, type: 'square', color: '#FF6B6B', icon: '■' },
  { id: 2, type: 'circle', color: '#4ECDC4', icon: '●' },
  { id: 3, type: 'triangle', color: '#FFE66D', icon: '▲' },
  { id: 4, type: 'star', color: '#A29BFE', icon: '★' },
];

const ShapeKingdom = () => {
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Match the shape!');

  useEffect(() => {
    generateLevel();
  }, []);

  const generateLevel = () => {
    const randomTarget = shapes[Math.floor(Math.random() * shapes.length)];
    setTarget(randomTarget);
    setOptions([...shapes].sort(() => Math.random() - 0.5));
  };

  const handleMatch = (shape) => {
    if (shape.id === target.id) {
      setScore(s => s + 1);
      setMessage('Great Job! 🎉');
      setTimeout(() => {
        setMessage('Match the shape!');
        generateLevel();
      }, 1000);
    } else {
      setMessage('Try Again! 🤔');
      setTimeout(() => setMessage('Match the shape!'), 1000);
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
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px',
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        color: '#1A1A4E',
        background: '#f0f0f0',
        padding: '8px 20px',
        borderRadius: '20px'
      }}>
        Score: {score}
      </div>
      
      <div style={{ 
        background: '#ffffff', 
        padding: '50px', 
        borderRadius: '40px', 
        marginBottom: '50px',
        display: 'inline-block',
        border: '4px dashed #eee',
        boxShadow: '0 10px 25px rgba(0,0,0,0.03)'
      }}>
        <div style={{ fontSize: '1.2rem', color: '#888', marginBottom: '20px', fontWeight: '800' }}>Find this shape:</div>
        {target && (
          <motion.div
            key={target.id}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{ 
              fontSize: '8rem', 
              color: target.color,
              textShadow: '0 8px 15px rgba(0,0,0,0.1)'
            }}
          >
            {target.icon}
          </motion.div>
        )}
      </div>

      <div style={{ minHeight: '50px', marginBottom: '30px' }}>
        <h2 style={{ 
          color: score > 0 && message.includes('Great') ? '#00B894' : '#FF6B6B',
          fontFamily: "'Fredoka One', cursive",
          fontSize: '2rem'
        }}>
          {message}
        </h2>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '24px', 
        marginTop: '10px',
        flexWrap: 'wrap'
      }}>
        {options.map((shape) => (
          <motion.button
            key={shape.id}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMatch(shape)}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '28px',
              border: '3px solid #f8f8f8',
              background: 'white',
              boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
              fontSize: '3.5rem',
              color: shape.color,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            {shape.icon}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ShapeKingdom;
