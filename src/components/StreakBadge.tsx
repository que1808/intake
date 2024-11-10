import React from 'react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  days: number;
}

const StreakBadge: React.FC<StreakBadgeProps> = ({ days }) => {
  return (
    <div className="ios-card p-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          {days >= 7 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#007AFF] flex items-center justify-center">
              <span className="text-xs font-bold text-white">🔥</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-black">{days} Day Streak!</h3>
          <p className="text-xs text-[#8E8E93]">
            {days >= 7 ? "You're on fire! 🔥" : "Keep it up!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StreakBadge;