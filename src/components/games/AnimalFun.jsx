import React, { useState } from 'react';

const animals = [
  { emoji: '🐶', name: 'Dog', sound: 'Woof Woof!', color: '#FF9F43' },
  { emoji: '🐱', name: 'Cat', sound: 'Meow!', color: '#FF6B6B' },
  { emoji: '🦁', name: 'Lion', sound: 'Roar!', color: '#FBC531' },
  { emoji: '🐘', name: 'Elephant', sound: 'Pawoo!', color: '#487EB0' },
  { emoji: '🐮', name: 'Cow', sound: 'Moo!', color: '#CED6E0' },
  { emoji: '🐷', name: 'Pig', sound: 'Oink!', color: '#FF9FF3' },
  { emoji: '🐵', name: 'Monkey', sound: 'Oooh Aaah!', color: '#A29BFE' },
  { emoji: '🦆', name: 'Duck', sound: 'Quack!', color: '#FECA57' },
];

const AnimalFun = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="game-screen animal-fun-game" style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '20px' }}>Tap an animal to hear them!</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '20px',
        flex: 1
      }}>
        {animals.map((animal) => (
          <div
            key={animal.name}
            onClick={() => setSelected(animal)}
            style={{
              padding: '20px',
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: selected?.name === animal.name ? `4px solid ${animal.color}` : '4px solid transparent',
              transform: selected?.name === animal.name ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{animal.emoji}</div>
            <div style={{ fontWeight: '800', fontSize: '1.2rem', color: animal.color }}>{animal.name}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          borderRadius: '20px',
          background: selected.color,
          color: 'white',
          animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <h2 style={{ color: 'white', margin: 0 }}>The {selected.name} says "{selected.sound}"</h2>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AnimalFun;
