import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import type { SafetyStatus } from '../types';

interface IOSSafetyIndicatorProps {
  status: SafetyStatus;
  message: string;
}

const IOSSafetyIndicator: React.FC<IOSSafetyIndicatorProps> = ({ status, message }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-[#34C759]',
          bgColor: 'bg-[#34C759]/10'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-[#FF9500]',
          bgColor: 'bg-[#FF9500]/10'
        };
      case 'danger':
        return {
          icon: AlertCircle,
          color: 'text-[#FF3B30]',
          bgColor: 'bg-[#FF3B30]/10'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl ${config.bgColor}`}>
      <Icon className={`w-5 h-5 ${config.color}`} />
      <span className="text-sm font-medium text-gray-900">{message}</span>
    </div>
  );
};

export default IOSSafetyIndicator;