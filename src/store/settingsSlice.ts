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

export function calculateStreak(history: Record<string, DailyHistory>): number {
  if (!history || Object.keys(history).length === 0) return 0;

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const todayEntry = history[todayStr];
  const hasCompletedToday = todayEntry && (todayEntry.questsCompletedCount || 0) > 0;

  // If completed today, count streak from today backwards
  // If not completed today yet, count streak from yesterday backwards (preserve streak for current day)
  const checkDate = new Date(today);
  if (!hasCompletedToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  let currentStreak = 0;
  // Maximum loop of 365 days to prevent any infinite loop
  for (let i = 0; i < 365; i++) {
    const dStr = checkDate.toISOString().split('T')[0];
    const entry = history[dStr];
    if (entry && (entry.questsCompletedCount || 0) > 0) {
      currentStreak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return currentStreak;
}

const initialState: SettingsState = {
  pin: '',
  soundEnabled: true,
  isSyncModalOpen: false,
  isRealtimeSyncing: false,
  lastSyncTime: '',
  streak: 0,
  lastActiveDate: '',
  history: {},
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
      state.streak = calculateStreak(state.history);
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
      state.streak = calculateStreak(state.history);
      state.lastActiveDate = date;
    },
    removeDailyHistory: (state, action: PayloadAction<{ date: string; questId: string; coins: number }>) => {
      const { date, questId, coins } = action.payload;
      if (state.history[date]) {
        state.history[date].completedQuestIds = state.history[date].completedQuestIds.filter((id) => id !== questId);
        state.history[date].coinsEarned = Math.max(0, state.history[date].coinsEarned - coins);
        state.history[date].questsCompletedCount = state.history[date].completedQuestIds.length;
        if (state.history[date].questsCompletedCount === 0) {
          delete state.history[date];
        }
      }
      state.streak = calculateStreak(state.history);
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
      state.history = action.payload.history || {};
      state.streak = calculateStreak(state.history);
      state.lastActiveDate = action.payload.lastActiveDate;
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
  removeDailyHistory,
  setSettingsState,
} = settingsSlice.actions;

export default settingsSlice.reducer;
