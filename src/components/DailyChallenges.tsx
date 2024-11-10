import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, Star } from 'lucide-react';
import type { Challenge } from '../types';

interface DailyChallengesProps {
  challenges: Challenge[];
  onClaimReward?: (challengeId: string) => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({ challenges, onClaimReward }) => {
  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getChallengeIcon = (type: Challenge['type']) => {
    switch (type) {
      case 'tracking':
        return Star;
      case 'safety':
        return Trophy;
      case 'streak':
        return Timer;
      default:
        return Star;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-semibold text-black">Daily Challenges</h2>
        <span className="text-sm text-[#8E8E93]">Refreshes in {getTimeRemaining(challenges[0].expiresAt)}</span>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence>
          {challenges.map(challenge => {
            const Icon = getChallengeIcon(challenge.type);
            const progress = (challenge.progress / challenge.target) * 100;
            const isCompleted = !!challenge.completed;

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="ios-card p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCompleted ? 'bg-[#34C759]' : 'bg-[#007AFF]'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{challenge.title}</h3>
                      <p className="text-sm text-[#8E8E93]">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-[#007AFF]">+{challenge.reward}</span>
                    <span className="text-sm text-[#8E8E93]">XP</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8E8E93]">Progress</span>
                    <span className="font-medium text-black">
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${isCompleted ? 'bg-[#34C759]' : 'bg-[#007AFF]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {isCompleted && !challenge.completed && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full py-2 bg-[#34C759] rounded-lg text-white font-medium ios-button"
                    onClick={() => onClaimReward?.(challenge.id)}
                  >
                    Claim Reward
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DailyChallenges;