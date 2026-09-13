'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleSound, setSyncModalOpen } from '@/store/settingsSlice';
import { sound } from '@/lib/audioService';
import { 
  Flame, 
  Coins, 
  Smartphone, 
  Volume2, 
  VolumeX, 
  Activity,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.wallet);
  const { streak, pin, soundEnabled, isRealtimeSyncing, lastSyncTime } = useAppSelector(
    (state) => state.settings
  );

  const handleToggleSound = () => {
    dispatch(toggleSound());
    sound.setMuted(soundEnabled);
    if (!soundEnabled) {
      sound.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-lg">
                Habit<span className="text-emerald-400">Fit</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-400">
                Daily Quests
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block">
              ทำเควสต์ออกกำลังกาย • สะสมเหรียญ • แลกของรางวัล
            </p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold"
            title={`ออกกำลังกายต่อเนื่อง ${streak} วัน`}
          >
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{streak}</span>
            <span className="hidden sm:inline text-amber-400/70 font-normal">วัน</span>
          </div>

          {/* Coins Wallet */}
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold"
            title="เหรียญสะสม (ใช้แลกของรางวัล)"
          >
            <Coins className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-sm">{coins.toLocaleString()}</span>
            <span className="text-emerald-400/70 font-normal">Coins</span>
          </div>

          {/* Sync Phone Button */}
          <button
            onClick={() => {
              sound.playClick();
              dispatch(setSyncModalOpen(true));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-emerald-500/50 text-zinc-200 hover:text-emerald-300 text-xs font-medium transition-all"
            title="สแกน QR Code เพื่อเชื่อมต่อกับมือถือ"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">เชื่อมมือถือ</span>
            <span className="sm:hidden">Sync</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={soundEnabled ? 'ปิดเสียง' : 'เปิดเสียง'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* PIN & Real-time Live Badge */}
          <button
            onClick={() => {
              sound.playClick();
              dispatch(setSyncModalOpen(true));
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              isRealtimeSyncing
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title={`รหัส PIN สำหรับซิงก์ (${isRealtimeSyncing ? 'กำลังซิงก์...' : 'ซิงก์ล่าสุด: ' + (lastSyncTime || 'เมื่อสักครู่')})`}
          >
            <span className={`w-2 h-2 rounded-full ${isRealtimeSyncing ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
            <span>PIN: <strong className="text-zinc-200">{pin || '...'}</strong></span>
          </button>
        </div>
      </div>
    </header>
  );
}
