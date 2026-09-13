'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import QuestList from '@/components/QuestList';
import RewardShop from '@/components/RewardShop';
import HistoryTracker from '@/components/HistoryTracker';
import BodyMetricsView from '@/components/BodyMetricsView';
import SyncModal from '@/components/SyncModal';
import { sound } from '@/lib/audioService';
import { 
  CheckSquare, 
  Gift, 
  CalendarDays, 
  Download, 
  Upload, 
  Scale,
  BarChart3,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setQuestsState, INITIAL_QUESTS } from '@/store/questSlice';
import { setWalletState, INITIAL_REWARDS } from '@/store/walletSlice';
import { setSettingsState, setPin } from '@/store/settingsSlice';
import { setMetricsState } from '@/store/metricsSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const [activeView, setActiveView] = useState<'quests' | 'shop' | 'metrics' | 'history'>('quests');
  const [formattedDate, setFormattedDate] = useState('');
  const fullState = useAppSelector((state) => state);

  useEffect(() => {
    const today = new Date();
    const dateText = today.toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setFormattedDate(dateText);
  }, []);

  // Backup Export
  const handleExportBackup = () => {
    sound.playClick();
    const backupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      quests: fullState.quest.quests,
      wallet: fullState.wallet,
      settings: fullState.settings,
      metrics: fullState.metrics,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habitfit-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.quests) dispatch(setQuestsState(data.quests));
        if (data.wallet) dispatch(setWalletState(data.wallet));
        if (data.settings) dispatch(setSettingsState(data.settings));
        if (data.metrics) dispatch(setMetricsState(data.metrics));
        sound.playComplete();
        alert('กู้คืนข้อมูลสำเร็จเรียบร้อยแล้ว');
      } catch {
        alert('ไฟล์ข้อมูลไม่ถูกต้อง');
      }
    };
    reader.readAsText(file);
  };

  // Reset to Clean Real State (Purge all mock / test data)
  const handleResetToCleanState = () => {
    if (
      confirm(
        'คุณต้องการรีเซ็ตเพื่อเริ่มใช้งานจริงใช่หรือไม่?\n\n' +
        '• ล้างประวัติน้ำหนัก สถิติ และเควสต์จำลองออกทั้งหมด\n' +
        '• รีเซ็ตเหรียญเป็น 0 และสร้าง PIN ประจำตัวใหม่\n' +
        '• เริ่มต้นบันทึกสถิติและความฟิตของคุณเองจริง 100%'
      )
    ) {
      sound.playClick();
      const newPin = `FIT-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.clear();
      localStorage.setItem('habitfit_pin', newPin);

      const freshQuests = INITIAL_QUESTS.map((q) => ({ ...q, completed: false }));
      dispatch(setQuestsState(freshQuests));
      dispatch(
        setWalletState({
          coins: 0,
          totalCoinsEarned: 0,
          rewards: INITIAL_REWARDS,
          tickets: [],
        })
      );
      dispatch(
        setSettingsState({
          pin: newPin,
          streak: 0,
          lastActiveDate: '',
          history: {},
        })
      );
      dispatch(setMetricsState({ records: [], userHeightCm: 170 }));
      dispatch(setPin(newPin));

      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: newPin,
          coins: 0,
          totalCoinsEarned: 0,
          streak: 0,
          lastActiveDate: '',
          quests: freshQuests,
          rewards: INITIAL_REWARDS,
          tickets: [],
          history: {},
          metrics: [],
          userHeightCm: 170,
        }),
      }).catch(() => {});

      alert('รีเซ็ตสู่ระบบข้อมูลจริงเรียบร้อยแล้ว! พร้อมให้คุณเริ่มบันทึกการออกกำลังกายจริงของคุณ');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Date & Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-4">
          <div>
            <span className="text-xs font-medium text-emerald-400">
              {formattedDate || 'ยินดีต้อนรับสู่วันใหม่'}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              HabitFit Dashboard
            </h1>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-2xl border border-zinc-800 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => {
                sound.playClick();
                setActiveView('quests');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeView === 'quests'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>เควสต์ประจำวัน</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveView('shop');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeView === 'shop'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>ร้านค้าแลกรางวัล</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveView('metrics');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeView === 'metrics'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>สัดส่วนร่างกาย</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveView('history');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeView === 'history'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>สรุปสัปดาห์ & สถิติ</span>
            </button>
          </div>
        </div>

        {/* View Switcher */}
        {activeView === 'quests' && <QuestList />}
        {activeView === 'shop' && <RewardShop />}
        {activeView === 'metrics' && <BodyMetricsView />}
        {activeView === 'history' && <HistoryTracker />}
      </main>

      {/* Sync Phone Modal */}
      <SyncModal />

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>HabitFit • Minimalist Daily Fitness & Rewards</span>
            <span className="text-zinc-700">|</span>
            <span className="font-mono text-[11px] text-zinc-400">v1.0.0</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="สำรองข้อมูลลงเครื่องเป็นไฟล์ JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>สำรองข้อมูล (JSON)</span>
            </button>

            <label
              className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="กู้คืนข้อมูลจากไฟล์สำรอง"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>กู้คืนข้อมูล</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>

            <span className="text-zinc-700">|</span>

            <button
              onClick={handleResetToCleanState}
              className="flex items-center gap-1 text-zinc-500 hover:text-rose-400 transition-colors"
              title="ล้างข้อมูลจำลองทั้งหมด และเริ่มต้นบันทึกข้อมูลจริงของคุณ"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>รีเซ็ตเริ่มต้นใช้งานจริง</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
