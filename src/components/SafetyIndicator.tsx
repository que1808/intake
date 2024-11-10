import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { SafetyStatus } from '../types';

interface SafetyIndicatorProps {
  status: SafetyStatus;
  message: string;
}

const SafetyIndicator: React.FC<SafetyIndicatorProps> = ({ status, message }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'danger':
        return {
          icon: AlertCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <Icon className={`w-5 h-5 ${config.color}`} />
      <span className="text-sm font-medium text-gray-700">{message}</span>
    </div>
  );
};

export default SafetyIndicator;