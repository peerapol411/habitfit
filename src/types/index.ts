export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  rewardCoins: number;
  completed: boolean;
  isCustom?: boolean;
  targetCount?: number;
  unit?: string;
}

export type RewardCategory = 'leisure' | 'food' | 'rest' | 'shopping' | 'custom';

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  costCoins: number;
  icon: string;
  category: RewardCategory;
  timesRedeemed: number;
  isCustom?: boolean;
}

export interface RedeemedTicket {
  id: string;
  rewardId: string;
  rewardTitle: string;
  costCoins: number;
  redeemedAt: string;
  isUsed: boolean;
  usedAt: string | null;
}

export interface DailyHistory {
  date: string; // YYYY-MM-DD
  completedQuestIds: string[];
  coinsEarned: number;
  questsCompletedCount: number;
}

export interface BodyMetricRecord {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  heightCm?: number;
  waistInch?: number;
  bmi?: number;
  notes?: string;
  createdAt: string;
}
