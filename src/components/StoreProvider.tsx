'use client';

import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { setQuestsState, resetDailyQuests, checkAndResetForDate, forceResetQuestsForToday } from '@/store/questSlice';
import { setWalletState } from '@/store/walletSlice';
import { setMetricsState } from '@/store/metricsSlice';
import { 
  setPin, 
  setSoundEnabled, 
  setRealtimeSyncing, 
  setLastSyncTime,
  checkAndProcessStreak,
  setSettingsState
} from '@/store/settingsSlice';
import { sound } from '@/lib/audioService';
import { getLocalTodayKey, isDateBefore } from '@/lib/dateUtils';
import { Quest, RewardItem, RedeemedTicket, DailyHistory, BodyMetricRecord } from '@/types';

function serializeBusinessData(state: any): string {
  if (!state) return '';
  return JSON.stringify({
    q: (state.quest?.quests || []).map((q: any) => [q.id, q.completed]),
    qd: state.quest?.lastResetDate,
    c: state.wallet?.coins,
    e: state.wallet?.totalCoinsEarned,
    t: (state.wallet?.tickets || []).map((t: any) => [t.id, t.isUsed]),
    r: (state.wallet?.rewards || []).map((r: any) => [r.id, r.timesRedeemed]),
    h: state.settings?.history,
    m: (state.metrics?.records || []).map((m: any) => [m.id, m.weightKg]),
  });
}

function AppInitializer({ children }: { children: React.ReactNode }) {
  const isHydrated = useRef(false);
  const lastKnownServerUpdatedAt = useRef<string | null>(null);
  const isSyncingInFlight = useRef<boolean>(false);
  const isApplyingRemoteUpdate = useRef<boolean>(false);
  const lastLocalChangeTime = useRef<number>(0);
  const lastSyncedHash = useRef<string>('');

  useEffect(() => {
    if (isHydrated.current) return;
    isHydrated.current = true;

    const today = getLocalTodayKey();

    // 1. Hydrate from LocalStorage
    let activePin = '';
    try {
      // Check PIN from URL query param or LocalStorage first
      const urlParams = new URLSearchParams(window.location.search);
      const pinFromUrl = urlParams.get('pin');
      const existingPin = localStorage.getItem('habitfit_pin');

      if (pinFromUrl) {
        activePin = pinFromUrl.toUpperCase();
        localStorage.setItem('habitfit_pin', activePin);
      } else if (existingPin && existingPin !== 'FIT-1001') {
        activePin = existingPin;
      } else {
        activePin = `FIT-${Math.floor(1000 + Math.random() * 9000)}`;
        localStorage.setItem('habitfit_pin', activePin);
      }
      store.dispatch(setPin(activePin));

      let todayCompletedQuestIds: string[] = [];

      const savedSettings = localStorage.getItem('habitfit_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        let cleanHistory = parsed.history || {};
        const entries = Object.values(cleanHistory) as DailyHistory[];
        const hasMockStructure = entries.some(
          (e) =>
            e.completedQuestIds &&
            e.completedQuestIds.length === 2 &&
            e.completedQuestIds[0] === 'q-easy-1' &&
            e.completedQuestIds[1] === 'q-med-2'
        );
        if (hasMockStructure) {
          cleanHistory = {};
        }
        if (cleanHistory[today]?.completedQuestIds) {
          todayCompletedQuestIds = cleanHistory[today].completedQuestIds;
        }
        store.dispatch(
          setSettingsState({
            pin: activePin,
            streak: 0,
            lastActiveDate: parsed.lastActiveDate || '',
            history: cleanHistory,
          })
        );
      }

      const savedQuests = localStorage.getItem('habitfit_quests');
      const savedLastResetDate = localStorage.getItem('habitfit_last_reset_date') || '';
      if (savedQuests) {
        store.dispatch(
          setQuestsState({
            quests: JSON.parse(savedQuests),
            lastResetDate: savedLastResetDate,
          })
        );
      }

      // Automatically check and reset quests for today
      store.dispatch(
        checkAndResetForDate({
          todayDate: today,
          completedQuestIds: todayCompletedQuestIds,
        })
      );
      localStorage.setItem('habitfit_last_reset_date', today);

      const savedWallet = localStorage.getItem('habitfit_wallet');
      if (savedWallet) {
        store.dispatch(setWalletState(JSON.parse(savedWallet)));
      }

      const savedMetrics = localStorage.getItem('habitfit_metrics');
      if (savedMetrics) {
        const parsed = JSON.parse(savedMetrics);
        const cleanRecords = (parsed.records || []).filter(
          (r: BodyMetricRecord) => !r.id?.startsWith('metric-init')
        );
        store.dispatch(
          setMetricsState({
            records: cleanRecords,
            userHeightCm: parsed.userHeightCm || 170,
          })
        );
      }

      const savedSound = localStorage.getItem('habitfit_sound_enabled');
      if (savedSound !== null) {
        const soundOn = savedSound === 'true';
        store.dispatch(setSoundEnabled(soundOn));
        sound.setMuted(!soundOn);
      }

      // Initial hash after local hydration
      lastSyncedHash.current = serializeBusinessData(store.getState());
    } catch (err) {
      console.error('LocalStorage hydration error:', err);
    }

    // 2. Daily Streak & Midnight Reset Processing
    store.dispatch(checkAndProcessStreak());

    // 3. Heartbeat Real-time Sync Engine
    const checkServerSync = async () => {
      if (isSyncingInFlight.current) return;
      // Do not poll or overwrite if the user just interacted within 1500ms
      if (Date.now() - lastLocalChangeTime.current < 1500) return;

      const state = store.getState();
      const currentPin = state.settings.pin || activePin;
      if (!currentPin) return;

      isSyncingInFlight.current = true;
      try {
        const res = await fetch(`/api/sync?pin=${encodeURIComponent(currentPin)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.found && data.updatedAt) {
            const serverTime = new Date(data.updatedAt).getTime();
            const lastTime = lastKnownServerUpdatedAt.current
              ? new Date(lastKnownServerUpdatedAt.current).getTime()
              : 0;

            // Protect against race condition: if user touched UI while fetch was in-flight
            if (Date.now() - lastLocalChangeTime.current < 1500) {
              return;
            }

            if (serverTime > lastTime) {
              lastKnownServerUpdatedAt.current = data.updatedAt;
              isApplyingRemoteUpdate.current = true;

              try {
                const currentToday = getLocalTodayKey();

                let cleanServerHistory = data.history || {};
                if (data.history) {
                  const sEntries = Object.values(cleanServerHistory) as DailyHistory[];
                  if (
                    sEntries.some(
                      (e) =>
                        e.completedQuestIds &&
                        e.completedQuestIds.length === 2 &&
                        e.completedQuestIds[0] === 'q-easy-1' &&
                        e.completedQuestIds[1] === 'q-med-2'
                    )
                  ) {
                    cleanServerHistory = {};
                  }
                  store.dispatch(
                    setSettingsState({
                      pin: data.pin,
                      streak: 0,
                      lastActiveDate: data.lastActiveDate || currentToday,
                      history: cleanServerHistory,
                    })
                  );
                }

                if (data.quests) {
                  const serverTodayCompleted = cleanServerHistory[currentToday]?.completedQuestIds || [];
                  const isServerPastDate = isDateBefore(data.lastActiveDate, currentToday);

                  store.dispatch(setQuestsState(data.quests as Quest[]));
                  if (isServerPastDate) {
                    // Server data is from a past date: reset all quests for today
                    store.dispatch(
                      checkAndResetForDate({
                        todayDate: currentToday,
                        completedQuestIds: serverTodayCompleted,
                      })
                    );
                  } else {
                    // Server data is from today: sync completed quests
                    store.dispatch(
                      checkAndResetForDate({
                        todayDate: currentToday,
                        completedQuestIds:
                          serverTodayCompleted.length > 0
                            ? serverTodayCompleted
                            : (data.quests as Quest[]).filter((q) => q.completed).map((q) => q.id),
                      })
                    );
                  }
                }

                if (data.coins !== undefined) {
                  store.dispatch(
                    setWalletState({
                      coins: data.coins,
                      totalCoinsEarned: data.totalCoinsEarned || data.coins,
                      rewards: data.rewards || [],
                      tickets: data.tickets || [],
                    })
                  );
                }
                if (data.metrics) {
                  const cleanMetrics = (data.metrics as BodyMetricRecord[]).filter(
                    (m) => !m.id?.startsWith('metric-init')
                  );
                  store.dispatch(
                    setMetricsState({
                      records: cleanMetrics,
                      userHeightCm: data.userHeightCm,
                    })
                  );
                }

                // Update hash to prevent echo save
                lastSyncedHash.current = serializeBusinessData(store.getState());
              } finally {
                isApplyingRemoteUpdate.current = false;
              }

              store.dispatch(setRealtimeSyncing(true));
              store.dispatch(setLastSyncTime(new Date(data.updatedAt).toLocaleTimeString('th-TH')));
              sound.playClick();

              setTimeout(() => {
                store.dispatch(setRealtimeSyncing(false));
              }, 800);
            }
          } else if (!data.found && !lastKnownServerUpdatedAt.current) {
            // First time registration on server
            triggerImmediateServerSave();
          }
        }
      } catch (err) {
        console.debug('Sync heartbeat poll error:', err);
      } finally {
        isSyncingInFlight.current = false;
      }
    };

    const triggerImmediateServerSave = () => {
      const state = store.getState();
      lastSyncedHash.current = serializeBusinessData(state);
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: state.settings.pin || activePin,
          coins: state.wallet.coins,
          totalCoinsEarned: state.wallet.totalCoinsEarned,
          streak: state.settings.streak,
          lastActiveDate: state.settings.lastActiveDate,
          quests: state.quest.quests,
          rewards: state.wallet.rewards,
          tickets: state.wallet.tickets,
          history: state.settings.history,
          metrics: state.metrics.records,
          userHeightCm: state.metrics.userHeightCm,
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.updatedAt) {
            lastKnownServerUpdatedAt.current = res.updatedAt;
            store.dispatch(setLastSyncTime(new Date(res.updatedAt).toLocaleTimeString('th-TH')));
          }
        })
        .catch(() => {});
    };

    // Midnight Rollover Watcher (automatically resets quests when date changes)
    const checkMidnightRollover = () => {
      const currentToday = getLocalTodayKey();
      const state = store.getState();
      if (state.quest.lastResetDate && state.quest.lastResetDate !== currentToday) {
        const todayCompleted = state.settings.history[currentToday]?.completedQuestIds || [];
        store.dispatch(
          checkAndResetForDate({
            todayDate: currentToday,
            completedQuestIds: todayCompleted,
          })
        );
        store.dispatch(checkAndProcessStreak());
        localStorage.setItem('habitfit_last_reset_date', currentToday);
        sound.playComplete();
      }
    };

    // Initial sync
    checkServerSync();

    // Heartbeat Polling Loop (every 2.5 seconds)
    const heartbeatInterval = setInterval(() => {
      checkMidnightRollover();
      checkServerSync();
    }, 2500);

    // Sync on tab focus & visibility change
    const handleFocus = () => {
      checkMidnightRollover();
      checkServerSync();
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkMidnightRollover();
        checkServerSync();
        store.dispatch(checkAndProcessStreak());
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    // 4. Auto-save store subscriber
    let saveTimeout: NodeJS.Timeout | null = null;
    const unsubscribeStore = store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem('habitfit_quests', JSON.stringify(state.quest.quests));
        localStorage.setItem('habitfit_last_reset_date', state.quest.lastResetDate || getLocalTodayKey());
        localStorage.setItem(
          'habitfit_wallet',
          JSON.stringify({
            coins: state.wallet.coins,
            totalCoinsEarned: state.wallet.totalCoinsEarned,
            rewards: state.wallet.rewards,
            tickets: state.wallet.tickets,
          })
        );
        localStorage.setItem(
          'habitfit_settings',
          JSON.stringify({
            pin: state.settings.pin,
            streak: state.settings.streak,
            lastActiveDate: state.settings.lastActiveDate,
            history: state.settings.history,
          })
        );
        localStorage.setItem(
          'habitfit_metrics',
          JSON.stringify({
            records: state.metrics.records,
            userHeightCm: state.metrics.userHeightCm,
          })
        );
        localStorage.setItem('habitfit_sound_enabled', String(state.settings.soundEnabled));
        sound.setMuted(!state.settings.soundEnabled);

        // If we are currently applying a remote server update, DO NOT save back
        if (isApplyingRemoteUpdate.current) {
          return;
        }

        // Compare business data hash: If only UI changed (modal, audio, sync indicator), DO NOT POST
        const currentHash = serializeBusinessData(state);
        if (currentHash === lastSyncedHash.current) {
          return;
        }

        // User genuinely made a local change (e.g. check or uncheck quest)
        lastLocalChangeTime.current = Date.now();
        lastSyncedHash.current = currentHash;

        if (saveTimeout) clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pin: state.settings.pin,
              coins: state.wallet.coins,
              totalCoinsEarned: state.wallet.totalCoinsEarned,
              streak: state.settings.streak,
              lastActiveDate: state.settings.lastActiveDate,
              quests: state.quest.quests,
              rewards: state.wallet.rewards,
              tickets: state.wallet.tickets,
              history: state.settings.history,
              metrics: state.metrics.records,
              userHeightCm: state.metrics.userHeightCm,
            }),
          })
            .then((r) => r.json())
            .then((res) => {
              if (res && res.updatedAt) {
                lastKnownServerUpdatedAt.current = res.updatedAt;
                store.dispatch(setLastSyncTime(new Date(res.updatedAt).toLocaleTimeString('th-TH')));
                store.dispatch(setRealtimeSyncing(true));
                setTimeout(() => {
                  store.dispatch(setRealtimeSyncing(false));
                }, 800);
              }
            })
            .catch(() => {});
        }, 250);
      } catch (err) {
        console.error('Failed to auto-save store:', err);
      }
    });

    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      unsubscribeStore();
    };
  }, []);

  return <>{children}</>;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
