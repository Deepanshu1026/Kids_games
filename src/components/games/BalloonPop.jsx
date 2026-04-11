import React, { useState, useEffect, useCallback } from 'react';

const BalloonPop = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8E8E', '#A29BFE', '#55E6C1'];

  const createBalloon = useCallback(() => {
    const id = Date.now() + Math.random();
    const size = Math.floor(Math.random() * 40) + 60;
    const left = Math.floor(Math.random() * 90);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const speed = Math.random() * 4 + 2;

    return { id, size, left, color, speed, bottom: -100 };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) => [...prev, createBalloon()].slice(-15));
    }, 1200);

    return () => clearInterval(interval);
  }, [createBalloon]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setBalloons((prev) => 
        prev
          .map(b => ({ ...b, bottom: b.bottom + b.speed }))
          .filter(b => b.bottom < 1000)
      );
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const popBalloon = (id) => {
    setBalloons((prev) => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
    // Add pop sound if available
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden',
      background: 'skyblue',
      borderRadius: '20px'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        zIndex: 10
      }}>
        🎈 Score: {score}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: '1.2rem',
        zIndex: 10
      }}>
        Pop the balloons!
      </div>

      {balloons.map(balloon => (
        <div
          key={balloon.id}
          onClick={() => popBalloon(balloon.id)}
          style={{
            position: 'absolute',
            left: `${balloon.left}%`,
            bottom: `${balloon.bottom}px`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.2}px`,
            backgroundColor: balloon.color,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'inset -10px -10px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.1s',
          }}
          className="balloon"
        >
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            width: '2px',
            height: '40px',
            background: 'white',
            left: '50%'
          }} />
        </div>
      ))}

      <style>{`
        .balloon:hover {
          transform: scale(1.1);
        }
        .balloon:active {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};

export default BalloonPop;
