import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import questReducer from './questSlice';
import walletReducer from './walletSlice';
import settingsReducer from './settingsSlice';
import metricsReducer from './metricsSlice';

export const store = configureStore({
  reducer: {
    quest: questReducer,
    wallet: walletReducer,
    settings: settingsReducer,
    metrics: metricsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
