import React, { useState, useEffect } from 'react';

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
    <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Find the pairs! {solved.length / 2} / {cards.length / 2}</h3>
        {solved.length === cards.length && cards.length > 0 && (
          <button className="btn btn-primary" onClick={initializeGame}>Play Again!</button>
        )}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
        maxWidth: '500px',
        margin: '0 auto',
        flex: 1
      }}>
        {cards.map((icon, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              aspectRatio: '1',
              background: solved.includes(index) ? '#4ECDC4' : (flipped.includes(index) ? 'white' : '#FF6B6B'),
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '3rem',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              transform: flipped.includes(index) || solved.includes(index) ? 'rotateY(180deg)' : 'rotateY(0)'
            }}
          >
            {(flipped.includes(index) || solved.includes(index)) ? icon : '❓'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;
