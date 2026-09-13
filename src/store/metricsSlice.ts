import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BodyMetricRecord } from '@/types';

interface MetricsState {
  records: BodyMetricRecord[];
  userHeightCm: number;
}

const initialState: MetricsState = {
  records: [],
  userHeightCm: 170,
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    addMetricRecord: (
      state,
      action: PayloadAction<Omit<BodyMetricRecord, 'id' | 'createdAt'>>
    ) => {
      const height = action.payload.heightCm || state.userHeightCm;
      let bmi: number | undefined = undefined;
      if (height && action.payload.weightKg) {
        const heightM = height / 100;
        bmi = parseFloat((action.payload.weightKg / (heightM * heightM)).toFixed(1));
      }

      const newRecord: BodyMetricRecord = {
        ...action.payload,
        id: `metric-${Date.now()}`,
        heightCm: height,
        bmi,
        createdAt: new Date().toISOString(),
      };

      // Insert at beginning, keep sorted by date descending
      state.records.unshift(newRecord);
      state.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    deleteMetricRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter((r) => r.id !== action.payload);
    },
    setUserHeightCm: (state, action: PayloadAction<number>) => {
      state.userHeightCm = action.payload;
    },
    setMetricsState: (
      state,
      action: PayloadAction<{ records: BodyMetricRecord[]; userHeightCm?: number }>
    ) => {
      state.records = action.payload.records || [];
      if (action.payload.userHeightCm) {
        state.userHeightCm = action.payload.userHeightCm;
      }
    },
  },
});

export const {
  addMetricRecord,
  deleteMetricRecord,
  setUserHeightCm,
  setMetricsState,
} = metricsSlice.actions;

export default metricsSlice.reducer;
