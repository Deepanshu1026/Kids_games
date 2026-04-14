import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pets = [
  { id: 1, type: 'Puppy', icon: '🐶', color: '#FF9F43' },
  { id: 2, type: 'Kitten', icon: '🐱', color: '#FF6B6B' },
  { id: 3, type: 'Bunny', icon: '🐰', color: '#A29BFE' },
];

const PetParade = () => {
  const [pet, setPet] = useState(null);
  const [happiness, setHappiness] = useState(50);
  const [action, setAction] = useState(null);

  const handleAction = (type) => {
    setAction(type);
    setHappiness(h => Math.min(h + 10, 100));
    setTimeout(() => setAction(null), 1000);
  };

  if (!pet) {
    return (
      <div className="game-screen pet-parade-game pet-select-screen" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        width: '100%',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '2.5rem', marginBottom: '30px', color: '#1A1A4E' }}>Choose a friend!</h2>
        <div className="pet-options" style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          {pets.map(p => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPet(p)}
              style={{ 
                padding: '40px 30px', 
                borderRadius: '32px', 
                background: 'white', 
                boxShadow: '0 15px 30px rgba(0,0,0,0.06)', 
                cursor: 'pointer', 
                border: `4px solid ${p.color}`,
                transition: 'all 0.3s'
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '15px' }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.4rem', fontWeight: '800' }}>{p.type}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen pet-parade-game pet-care-screen" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      width: '100%',
      padding: '20px',
      position: 'relative',
      textAlign: 'center'
    }}>
      <button 
        onClick={() => setPet(null)} 
        style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          background: '#f0f0f0', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '15px', 
          cursor: 'pointer',
          fontFamily: "'Fredoka One', cursive",
          color: '#666',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => e.target.style.background = '#e0e0e0'}
        onMouseLeave={e => e.target.style.background = '#f0f0f0'}
      >
        ← Back
      </button>
      
      <div style={{ marginBottom: '40px' }}>
        <div className="happiness-bar" style={{ width: '250px', height: '14px', background: '#f0f0f0', borderRadius: '10px', margin: '0 auto 12px', overflow: 'hidden', border: '2px solid #eee' }}>
          <motion.div 
            animate={{ width: `${happiness}%` }} 
            style={{ height: '100%', background: 'linear-gradient(to right, #4ECDC4, #00B894)', borderRadius: '5px' }} 
          />
        </div>
        <span style={{ fontWeight: '800', color: '#666' }}>Happiness: {happiness}%</span>
      </div>

      <div className="pet-stage" style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <AnimatePresence>
            {action && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, y: 0 }}
                    animate={{ scale: 2, opacity: 1, y: -80 }}
                    exit={{ opacity: 0, scale: 2.5 }}
                    style={{ position: 'absolute', fontSize: '4rem', zIndex: 10 }}
                >
                    {action === 'feed' ? '🦴' : action === 'wash' ? '🧼' : '❤️'}
                </motion.div>
            )}
        </AnimatePresence>
        
        <motion.div
          animate={action ? { 
            scale: [1, 1.15, 1], 
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0] 
          } : {}}
          className="pet-emoji"
          style={{ fontSize: '10rem', cursor: 'pointer' }}
          onClick={() => handleAction('love')}
        >
          {pet.icon}
        </motion.div>
      </div>

      <div className="pet-actions" style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '50px' }}>
        <button className="btn" style={{ background: '#FFE66D', padding: '16px 32px' }} onClick={() => handleAction('feed')}>Feed</button>
        <button className="btn" style={{ background: '#4ECDC4', padding: '16px 32px' }} onClick={() => handleAction('wash')}>Wash</button>
        <button className="btn" style={{ background: '#FF6B6B', color: 'white', padding: '16px 32px' }} onClick={() => handleAction('love')}>Love</button>
      </div>
      
      <p style={{ marginTop: '30px', color: '#888', fontWeight: '600', fontSize: '1.1rem' }}>Your {pet.type.toLowerCase()} is so happy! ✨</p>
    </div>
  );
};

export default PetParade;
