import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RocketLaunch = () => {
  const [power, setPower] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [height, setHeight] = useState(0);

  const handleCharge = () => {
    if (launched) return;
    setPower(p => Math.min(p + 5, 100));
  };

  const launch = () => {
    if (power < 20 || launched) return;
    setLaunched(true);
    // Animate rocket based on power
  };

  const reset = () => {
    setLaunched(false);
    setPower(0);
    setHeight(0);
  };

  useEffect(() => {
    let interval;
    if (launched) {
      interval = setInterval(() => {
        setHeight(h => {
          if (h > 1000) {
            clearInterval(interval);
            return h;
          }
          return h + (power / 5);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [launched, power]);

  return (
    <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0a2a', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
        Power: {power}%
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '2px', height: '2px', background: 'white', borderRadius: '50%' }} />
        ))}

        {/* Rocket */}
        <motion.div
          animate={launched ? { y: -height, scale: [1, 1.1, 1] } : { y: 0 }}
          style={{ position: 'absolute', bottom: '40px', width: '100%', fontSize: '5rem', zIndex: 5 }}
        >
          🚀
          {launched && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1], scale: [1, 1.5, 1] }}
              style={{ position: 'absolute', bottom: '-40px', left: 'calc(50% - 20px)', fontSize: '2rem' }}
            >
              🔥
            </motion.div>
          )}
        </motion.div>
      </div>

      <div style={{ padding: '40px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        {!launched ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '100%', height: '20px', background: '#333', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${power}%`, height: '100%', background: 'linear-gradient(to right, #FF6B6B, #FFE66D)' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn" style={{ background: '#4ECDC4' }} onClick={handleCharge}>Charge Up!</button>
              <button className="btn btn-primary" onClick={launch} disabled={power < 20}>LAUNCH!</button>
            </div>
            <p style={{ color: 'white' }}>Tap charge to build power!</p>
          </div>
        ) : (
          <div>
            <h2 style={{ color: 'white' }}>Reached {Math.floor(height)}m!</h2>
            <button className="btn" style={{ background: '#eee' }} onClick={reset}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RocketLaunch;
