import React, { useState } from 'react';
import { motion } from 'framer-motion';

const colors = [
  { name: 'Red', hex: '#FF6B6B' },
  { name: 'Blue', hex: '#487EB0' },
  { name: 'Yellow', hex: '#FFE66D' },
];

const mixMap = {
  '#FF6B6B-#487EB0': { name: 'Purple', hex: '#A29BFE' },
  '#487EB0-#FF6B6B': { name: 'Purple', hex: '#A29BFE' },
  '#FF6B6B-#FFE66D': { name: 'Orange', hex: '#FF9F43' },
  '#FFE66D-#FF6B6B': { name: 'Orange', hex: '#FF9F43' },
  '#487EB0-#FFE66D': { name: 'Green', hex: '#55E6C1' },
  '#FFE66D-#487EB0': { name: 'Green', hex: '#55E6C1' },
};

const ColorMixer = () => {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);

  const handleSelect = (color) => {
    if (selected.length === 2) {
        setSelected([color]);
        setResult(null);
        return;
    }
    
    const newSelected = [...selected, color];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const key = `${newSelected[0].hex}-${newSelected[1].hex}`;
      setResult(mixMap[key] || { name: 'Grayish', hex: '#636E72' });
    }
  };

  return (
    <div className="game-screen color-mixer-game" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      width: '100%',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Pick two colors to mix!</h3>
      
      <div className="color-palette-row" style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
        {colors.map((c) => (
          <motion.div
            className="color-choice"
            key={c.name}
            onClick={() => handleSelect(c)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: c.hex,
              cursor: 'pointer',
              border: selected.some(s => s.name === c.name) ? '6px solid #1A1A4E' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            {c.name}
          </motion.div>
        ))}
      </div>

      <div className="color-equation-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
        <div className="mix-swatch" style={{ width: '110px', height: '110px', borderRadius: '28px', background: selected[0]?.hex || '#f5f5f5', border: '3px dashed #ddd', transition: 'all 0.3s' }}></div>
        <span style={{ fontSize: '3rem', color: '#666' }}>+</span>
        <div className="mix-swatch" style={{ width: '110px', height: '110px', borderRadius: '28px', background: selected[1]?.hex || '#f5f5f5', border: '3px dashed #ddd', transition: 'all 0.3s' }}></div>
        <span style={{ fontSize: '3rem', color: '#666' }}>=</span>
        <motion.div 
          className="mix-result"
          animate={result ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
          style={{ width: '130px', height: '130px', borderRadius: '35px', background: result?.hex || '#f5f5f5', border: '3px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1.4rem' }}
        >
          {result?.name || '?'}
        </motion.div>
      </div>

      <div style={{ minHeight: '80px', marginTop: '30px', display: 'flex', alignItems: 'center' }}>
        {result && (
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ color: result.hex, fontFamily: "'Fredoka One', cursive" }}>
            Magic! You made {result.name}! ✨
          </motion.h2>
        )}
      </div>
    </div>
  );
};

export default ColorMixer;
