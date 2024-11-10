import React from 'react';
import { Clock, Plus, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Substance } from '../types';

interface IOSSubstanceCardProps {
  substance: Substance;
  onLogIntake: (id: string) => void;
}

const IOSSubstanceCard: React.FC<IOSSubstanceCardProps> = ({ substance, onLogIntake }) => {
  const getTimeStatus = () => {
    if (!substance.lastIntake) return 'text-[#8E8E93]';
    const minutesSinceLastIntake = (new Date().getTime() - substance.lastIntake.getTime()) / (1000 * 60);
    if (minutesSinceLastIntake < substance.minInterval) return 'text-[#FF3B30]';
    return 'text-[#34C759]';
  };

  const getDosageStatus = () => {
    const percentage = (substance.dailyTotal / substance.maxDailyDose) * 100;
    if (percentage >= 100) return 'bg-[#FF3B30]';
    if (percentage >= 80) return 'bg-[#FF9500]';
    return 'bg-[#34C759]';
  };

  return (
    <div className="ios-card p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-black">{substance.name}</h3>
          <span className="text-sm text-[#8E8E93] capitalize">{substance.category}</span>
        </div>
        <button
          onClick={() => onLogIntake(substance.id)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#007AFF] ios-button"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${getTimeStatus()}`} />
          <span className="text-sm text-[#8E8E93]">
            {substance.lastIntake
              ? `Last taken ${formatDistanceToNow(substance.lastIntake)} ago`
              : 'No intake recorded'}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#8E8E93]">Daily usage</span>
            <span className="font-medium text-black">
              {substance.dailyTotal}/{substance.maxDailyDose} {substance.dosageUnit}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${getDosageStatus()} transition-all`}
              style={{
                width: `${Math.min((substance.dailyTotal / substance.maxDailyDose) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        {substance.dailyTotal >= substance.maxDailyDose && (
          <div className="flex items-center gap-2 text-[#FF3B30] bg-[#FF3B30]/10 p-2 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Daily limit reached</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IOSSubstanceCard;