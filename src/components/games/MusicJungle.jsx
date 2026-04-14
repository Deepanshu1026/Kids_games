import React, { useState } from 'react';
import { motion } from 'framer-motion';

const instruments = [
  { id: 1, name: 'Drum', emoji: '🥁', color: '#FF6B6B', sound: 'DOOM!' },
  { id: 2, name: 'Piano', emoji: '🎹', color: '#4ECDC4', sound: 'PLINK!' },
  { id: 3, name: 'Trumpet', emoji: '🎺', color: '#FFE66D', sound: 'TOOT!' },
  { id: 4, name: 'Guitar', emoji: '🎸', color: '#A29BFE', sound: 'TWANG!' },
];

const MusicJungle = () => {
  const [activeNote, setActiveNote] = useState(null);

  const playNote = (inst) => {
    setActiveNote(inst);
    setTimeout(() => setActiveNote(null), 300);
    // Real audio could be added here
  };

  return (
    <div className="game-screen music-jungle-game" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      width: '100%',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.8rem', color: '#1A1A4E', marginBottom: '10px' }}>Jungle Jam Session! 🎵</h3>
      <p style={{ color: '#666', fontWeight: '700', marginBottom: '40px' }}>Tap an instrument to create music!</p>
      
      <div className="music-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '24px', 
        maxWidth: '500px',
        width: '100%'
      }}>
        {instruments.map((inst) => (
          <motion.div
            className="instrument-card"
            key={inst.id}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playNote(inst)}
            style={{
              padding: '40px 20px',
              borderRadius: '32px',
              background: activeNote?.id === inst.id ? inst.color : 'white',
              boxShadow: activeNote?.id === inst.id 
                ? `0 15px 30px ${inst.color}55` 
                : '0 10px 25px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              border: `6px solid ${activeNote?.id === inst.id ? 'white' : '#f8f8f8'}`,
              transition: 'all 0.2s cubic-bezier(.34,1.56,.64,1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ fontSize: '5rem', marginBottom: '10px' }}>{inst.emoji}</div>
            <div style={{ 
              fontFamily: "'Fredoka One', cursive",
              fontSize: '1.2rem',
              color: activeNote?.id === inst.id ? 'white' : '#1A1A4E'
            }}>{inst.name}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ minHeight: '80px', marginTop: '30px', display: 'flex', alignItems: 'center' }}>
        {activeNote && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: 1 }}
            style={{ 
              fontSize: '3rem', 
              fontWeight: '900', 
              color: activeNote.color,
              fontFamily: "'Fredoka One', cursive",
              textShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            {activeNote.sound}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MusicJungle;
