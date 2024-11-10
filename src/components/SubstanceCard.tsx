import React from 'react';
import { Clock, PlusCircle, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Substance } from '../types';

interface SubstanceCardProps {
  substance: Substance;
  onLogIntake: (id: string) => void;
}

const SubstanceCard: React.FC<SubstanceCardProps> = ({ substance, onLogIntake }) => {
  const getTimeStatus = () => {
    if (!substance.lastIntake) return 'text-gray-500';
    const minutesSinceLastIntake = (new Date().getTime() - substance.lastIntake.getTime()) / (1000 * 60);
    if (minutesSinceLastIntake < substance.minInterval) return 'text-red-500';
    return 'text-green-500';
  };

  const getDosageStatus = () => {
    const percentage = (substance.dailyTotal / substance.maxDailyDose) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{substance.name}</h3>
          <span className="text-sm text-gray-500 capitalize">{substance.category}</span>
        </div>
        <button
          onClick={() => onLogIntake(substance.id)}
          className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          title="Log intake"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${getTimeStatus()}`} />
          <span className="text-sm text-gray-600">
            {substance.lastIntake
              ? `Last taken ${formatDistanceToNow(substance.lastIntake)} ago`
              : 'No intake recorded'}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Daily usage</span>
            <span className="font-medium">
              {substance.dailyTotal}/{substance.maxDailyDose} {substance.dosageUnit}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${getDosageStatus()} transition-all`}
              style={{
                width: `${Math.min((substance.dailyTotal / substance.maxDailyDose) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        {substance.dailyTotal >= substance.maxDailyDose && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Daily limit reached</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubstanceCard;