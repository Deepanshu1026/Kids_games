import React, { useRef, useState, useEffect } from 'react';

const DoodleWorld = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(12);

  const colors = [
    { name: 'Red', hex: '#FF6B6B' },
    { name: 'Teal', hex: '#4ECDC4' },
    { name: 'Yellow', hex: '#FFE66D' },
    { name: 'Purple', hex: '#A29BFE' },
    { name: 'Mint', hex: '#55E6C1' },
    { name: 'Midnight', hex: '#1A1A4E' },
    { name: 'Reset', hex: '#FFFFFF' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions based on parent container
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Re-handle resize if necessary
    const handleResize = () => {
      // In a real app we might want to save the image first
      // but for this simple version we just reset
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = (e) => {
    const coords = getCoordinates(e);
    if (!coords) return;
    const { offsetX, offsetY } = coords;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    if (!coords) return;
    const { offsetX, offsetY } = coords;
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches.length > 0) {
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    }

    return {
      offsetX: e.clientX ? e.clientX - rect.left : e.nativeEvent.offsetX,
      offsetY: e.clientY ? e.clientY - rect.top : e.nativeEvent.offsetY
    };
  };

  return (
    <div className="game-screen doodle-world-game" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden' }}>
      <div className="doodle-toolbar" style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        background: '#fcfcfc',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {colors.map(c => (
            <button
              key={c.hex}
              onClick={() => setColor(c.hex)}
              title={c.name}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: c.hex,
                border: color === c.hex ? '4px solid #1A1A4E' : '2px solid #ddd',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          ))}
        </div>
        <div style={{ height: '30px', width: '2px', background: '#eee', margin: '0 10px' }} />
        <button
          onClick={clearCanvas}
          style={{
            padding: '8px 20px',
            background: '#1A1A4E',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontFamily: "'Fredoka One', cursive",
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = '#FF6B6B'}
          onMouseLeave={e => e.target.style.background = '#1A1A4E'}
        >
          🗑️ Clear
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative', background: '#f5f5f5' }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', touchAction: 'none', cursor: 'url("https://cdn-icons-png.flaticon.com/32/589/589708.png"), auto' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(5px)',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#888',
          border: '1px solid #eee',
          pointerEvents: 'none'
        }}>
          🎨 Draw anything magical here!
        </div>
      </div>
    </div>
  );
};

export default DoodleWorld;
