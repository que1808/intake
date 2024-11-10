import React from 'react';
import { Trophy } from 'lucide-react';

interface XPProgressProps {
  level: number;
  xp: number;
  nextLevelXp: number;
}

const XPProgress: React.FC<XPProgressProps> = ({ level, xp, nextLevelXp }) => {
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div className="ios-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-black">Level {level}</h3>
            <p className="text-xs text-[#8E8E93]">Keep tracking to level up!</p>
          </div>
        </div>
        <span className="text-sm font-medium text-[#8E8E93]">
          {xp}/{nextLevelXp} XP
        </span>
      </div>

      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-[#007AFF] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default XPProgress;