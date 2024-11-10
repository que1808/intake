import React, { useState } from 'react';
import IOSHeader from './components/IOSHeader';
import IOSTabBar from './components/IOSTabBar';
import IOSSubstanceCard from './components/IOSSubstanceCard';
import IOSSafetyIndicator from './components/IOSSafetyIndicator';
import XPProgress from './components/XPProgress';
import StreakBadge from './components/StreakBadge';
import AchievementCard from './components/AchievementCard';
import IntakeGraph from './components/IntakeGraph';
import DailyChallenges from './components/DailyChallenges';
import type { Substance, SafetyStatus, Achievement, UserProgress, IntakeLog, Challenge } from './types';

function App() {
  const [substances] = useState<Substance[]>([
    {
      id: '1',
      name: 'Ibuprofen',
      category: 'medication',
      dosageUnit: 'mg',
      maxDailyDose: 1200,
      minInterval: 240,
      lastIntake: new Date(Date.now() - 1000 * 60 * 180),
      dailyTotal: 800,
      streakDays: 5,
      level: 2,
      xp: 150
    },
    {
      id: '2',
      name: 'Vitamin D3',
      category: 'supplement',
      dosageUnit: 'IU',
      maxDailyDose: 4000,
      minInterval: 1440,
      lastIntake: new Date(Date.now() - 1000 * 60 * 60 * 12),
      dailyTotal: 2000,
      streakDays: 12,
      level: 3,
      xp: 280
    }
  ]);

  const [userProgress] = useState<UserProgress>({
    level: 4,
    xp: 750,
    nextLevelXp: 1000,
    streakDays: 7,
    perfectDays: 15,
    achievements: [
      {
        id: '1',
        title: 'Perfect Week',
        description: 'Maintained safe intake for 7 days straight',
        icon: '🌟',
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        id: '2',
        title: 'Early Bird',
        description: 'Log morning intake for 5 days',
        icon: '🌅',
        unlockedAt: new Date()
      },
      {
        id: '3',
        title: 'Safety First',
        description: 'Stay within safe limits for 30 days',
        icon: '🛡️'
      }
    ],
    challenges: [
      {
        id: '1',
        title: 'Tracking Master',
        description: 'Log all intakes within 15 minutes today',
        icon: '⚡️',
        reward: 50,
        progress: 3,
        target: 5,
        type: 'tracking',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8)
      },
      {
        id: '2',
        title: 'Safety Guardian',
        description: 'Keep all substances under 80% of daily limit',
        icon: '🛡️',
        reward: 100,
        progress: 1,
        target: 1,
        type: 'safety',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8),
        completed: new Date()
      },
      {
        id: '3',
        title: 'Consistency King',
        description: 'Log intakes at regular intervals',
        icon: '👑',
        reward: 75,
        progress: 2,
        target: 3,
        type: 'streak',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8)
      }
    ]
  });

  const [intakeLogs] = useState<IntakeLog[]>([]);

  const handleLogIntake = (id: string) => {
    console.log('Logging intake for substance:', id);
  };

  const handleClaimReward = (challengeId: string) => {
    console.log('Claiming reward for challenge:', challengeId);
  };

  const getOverallSafetyStatus = (): { status: SafetyStatus; message: string } => {
    const hasReachedLimit = substances.some(s => s.dailyTotal >= s.maxDailyDose);
    if (hasReachedLimit) {
      return { status: 'danger', message: 'Daily limit reached for one or more substances' };
    }

    const hasRecentIntake = substances.some(s => {
      if (!s.lastIntake) return false;
      const minutesSinceLastIntake = (new Date().getTime() - s.lastIntake.getTime()) / (1000 * 60);
      return minutesSinceLastIntake < s.minInterval;
    });

    if (hasRecentIntake) {
      return { status: 'warning', message: 'Minimum interval not met for some substances' };
    }

    return { status: 'safe', message: 'All substances within safe limits' };
  };

  const safetyStatus = getOverallSafetyStatus();

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20">
      <IOSHeader />
      
      <main className="px-4 py-4 space-y-6">
        <XPProgress
          level={userProgress.level}
          xp={userProgress.xp}
          nextLevelXp={userProgress.nextLevelXp}
        />

        <StreakBadge days={userProgress.streakDays} />

        <IOSSafetyIndicator status={safetyStatus.status} message={safetyStatus.message} />

        <DailyChallenges
          challenges={userProgress.challenges}
          onClaimReward={handleClaimReward}
        />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-black px-1">Quick Add</h2>
          <div className="space-y-4">
            {substances.map(substance => (
              <IOSSubstanceCard
                key={substance.id}
                substance={substance}
                onLogIntake={handleLogIntake}
              />
            ))}
          </div>
        </div>

        {substances.map(substance => (
          <IntakeGraph
            key={substance.id}
            substance={substance}
            logs={intakeLogs.filter(log => log.substanceId === substance.id)}
          />
        ))}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-black px-1">Achievements</h2>
          <div className="space-y-4">
            {userProgress.achievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </main>

      <IOSTabBar />
    </div>
  );
}

export default App;