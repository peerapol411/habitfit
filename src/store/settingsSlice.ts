import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyHistory } from '@/types';

interface SettingsState {
  pin: string;
  soundEnabled: boolean;
  isSyncModalOpen: boolean;
  isRealtimeSyncing: boolean;
  lastSyncTime: string;
  streak: number;
  lastActiveDate: string;
  history: Record<string, DailyHistory>;
}

const getInitialHistory = (): Record<string, DailyHistory> => {
  const result: Record<string, DailyHistory> = {};
  const mockActivity = [
    { daysAgo: 5, count: 2, coins: 50 },
    { daysAgo: 4, count: 3, coins: 75 },
    { daysAgo: 3, count: 1, coins: 25 },
    { daysAgo: 2, count: 4, coins: 110 },
    { daysAgo: 1, count: 3, coins: 85 },
  ];
  mockActivity.forEach((item) => {
    const d = new Date();
    d.setDate(d.getDate() - item.daysAgo);
    const dateStr = d.toISOString().split('T')[0];
    result[dateStr] = {
      date: dateStr,
      completedQuestIds: ['q-easy-1', 'q-med-2'],
      coinsEarned: item.coins,
      questsCompletedCount: item.count,
    };
  });
  return result;
};

const initialState: SettingsState = {
  pin: 'FIT-1001',
  soundEnabled: true,
  isSyncModalOpen: false,
  isRealtimeSyncing: false,
  lastSyncTime: '',
  streak: 6,
  lastActiveDate: new Date().toISOString().split('T')[0],
  history: getInitialHistory(),
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload.toUpperCase();
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    setSoundEnabled: (state, action: PayloadAction<boolean>) => {
      state.soundEnabled = action.payload;
    },
    setSyncModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSyncModalOpen = action.payload;
    },
    setRealtimeSyncing: (state, action: PayloadAction<boolean>) => {
      state.isRealtimeSyncing = action.payload;
    },
    setLastSyncTime: (state, action: PayloadAction<string>) => {
      state.lastSyncTime = action.payload;
    },
    checkAndProcessStreak: (state) => {
      const today = new Date().toISOString().split('T')[0];
      if (!state.lastActiveDate) {
        state.lastActiveDate = today;
        state.streak = 1;
        return;
      }

      if (state.lastActiveDate === today) {
        return;
      }

      const lastDate = new Date(state.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        state.streak += 1;
      } else if (diffDays > 1) {
        // Missed days
        state.streak = 1;
      }
      state.lastActiveDate = today;
    },
    recordDailyHistory: (state, action: PayloadAction<{ date: string; questId: string; coins: number }>) => {
      const { date, questId, coins } = action.payload;
      if (!state.history[date]) {
        state.history[date] = {
          date,
          completedQuestIds: [questId],
          coinsEarned: coins,
          questsCompletedCount: 1,
        };
      } else {
        if (!state.history[date].completedQuestIds.includes(questId)) {
          state.history[date].completedQuestIds.push(questId);
          state.history[date].coinsEarned += coins;
          state.history[date].questsCompletedCount += 1;
        }
      }
    },
    setSettingsState: (
      state,
      action: PayloadAction<{
        pin: string;
        streak: number;
        lastActiveDate: string;
        history: Record<string, DailyHistory>;
      }>
    ) => {
      state.pin = action.payload.pin;
      state.streak = action.payload.streak;
      state.lastActiveDate = action.payload.lastActiveDate;
      state.history = action.payload.history;
    },
  },
});

export const {
  setPin,
  toggleSound,
  setSoundEnabled,
  setSyncModalOpen,
  setRealtimeSyncing,
  setLastSyncTime,
  checkAndProcessStreak,
  recordDailyHistory,
  setSettingsState,
} = settingsSlice.actions;

export default settingsSlice.reducer;
