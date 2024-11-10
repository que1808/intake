import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../types';
import Confetti from './Confetti';

interface AchievementCardProps {
  achievement: Achievement;
  onUnlock?: () => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const isUnlocked = !!achievement.unlockedAt;
  const isNewlyUnlocked = isUnlocked && 
    achievement.unlockedAt.getTime() > Date.now() - 5000;

  useEffect(() => {
    if (isNewlyUnlocked) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isNewlyUnlocked]);

  return (
    <motion.div
      initial={isNewlyUnlocked ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className={`ios-card p-4 relative overflow-hidden ${!isUnlocked ? 'opacity-50' : ''}`}
    >
      <AnimatePresence>
        {showCelebration && <Confetti />}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <motion.div
          whileHover={isUnlocked ? { scale: 1.05 } : {}}
          whileTap={isUnlocked ? { scale: 0.95 } : {}}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center"
        >
          <motion.span
            animate={isNewlyUnlocked ? {
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.2, 1.2, 1.2, 1.2, 1],
            } : {}}
            className="text-2xl"
          >
            {achievement.icon}
          </motion.span>
        </motion.div>
        <div>
          <h3 className="font-semibold text-black">{achievement.title}</h3>
          <p className="text-sm text-[#8E8E93]">{achievement.description}</p>
          {isUnlocked && (
            <motion.p
              initial={isNewlyUnlocked ? { y: 10, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              className="text-xs text-[#34C759] mt-1"
            >
              Unlocked {achievement.unlockedAt.toLocaleDateString()}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;