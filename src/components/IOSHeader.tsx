import React from 'react';
import { Plus, Settings } from 'lucide-react';

const IOSHeader: React.FC = () => {
  return (
    <header className="bg-[#F2F2F7] safe-area-top">
      <div className="px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">IntakeTracker</h1>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm ios-button">
            <Settings className="w-5 h-5 text-[#007AFF]" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#007AFF] shadow-sm ios-button">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default IOSHeader;