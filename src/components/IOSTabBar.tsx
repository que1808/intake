import React from 'react';
import { Home, Clock, BarChart2, User } from 'lucide-react';

const IOSTabBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 safe-area-bottom">
      <div className="flex justify-around py-2">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: Clock, label: 'History' },
          { icon: BarChart2, label: 'Stats' },
          { icon: User, label: 'Profile' }
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className="flex flex-col items-center px-3 py-1 ios-button"
          >
            <Icon
              className={`w-6 h-6 ${
                active ? 'text-[#007AFF]' : 'text-[#8E8E93]'
              }`}
            />
            <span
              className={`text-xs mt-1 ${
                active ? 'text-[#007AFF] font-medium' : 'text-[#8E8E93]'
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default IOSTabBar;