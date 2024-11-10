import React from 'react';
import { motion } from 'framer-motion';

const Confetti: React.FC = () => {
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: Math.random() * -200 - 100,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
    color: ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {pieces.map(piece => (
        <motion.div
          key={piece.id}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0
          }}
          animate={{
            x: piece.x,
            y: piece.y,
            rotate: piece.rotation,
            scale: piece.scale
          }}
          transition={{
            duration: 1,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="absolute left-1/2 top-1/2 w-2 h-2"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
};

export default Confetti;