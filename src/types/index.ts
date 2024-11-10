export interface Substance {
  id: string;
  name: string;
  category: 'medication' | 'supplement' | 'other';
  dosageUnit: string;
  maxDailyDose: number;
  minInterval: number; // in minutes
  lastIntake?: Date;
  dailyTotal: number;
  streakDays: number;
  level: number;
  xp: number;
}

export interface IntakeLog {
  id: string;
  substanceId: string;
  timestamp: Date;
  quantity: number;
  notes?: string;
  mood?: 'good' | 'neutral' | 'bad';
}

export type SafetyStatus = 'safe' | 'warning' | 'danger';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: number;
  progress: number;
  target: number;
  type: 'tracking' | 'safety' | 'streak';
  expiresAt: Date;
  completed?: Date;
}

export interface UserProgress {
  level: number;
  xp: number;
  nextLevelXp: number;
  achievements: Achievement[];
  streakDays: number;
  perfectDays: number;
  challenges: Challenge[];
}