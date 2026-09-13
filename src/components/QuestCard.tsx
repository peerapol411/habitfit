'use client';

import React from 'react';
import { Quest } from '@/types';
import { useAppDispatch } from '@/store/store';
import { toggleQuest, deleteQuest } from '@/store/questSlice';
import { addCoins, subtractCoins } from '@/store/walletSlice';
import { recordDailyHistory, removeDailyHistory } from '@/store/settingsSlice';
import { sound } from '@/lib/audioService';
import { Check, Coins, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestCardProps {
  quest: Quest;
  onEdit?: (quest: Quest) => void;
}

export default function QuestCard({ quest, onEdit }: QuestCardProps) {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!quest.completed) {
      sound.playComplete();
      dispatch(toggleQuest(quest.id));
      dispatch(addCoins(quest.rewardCoins));
      dispatch(
        recordDailyHistory({
          date: today,
          questId: quest.id,
          coins: quest.rewardCoins,
          title: quest.title,
          difficulty: quest.difficulty,
        })
      );

      // Subtle confetti burst for hard quests
      if (quest.difficulty === 'hard') {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#f59e0b', '#3b82f6'],
        });
      }
    } else {
      sound.playClick();
      dispatch(toggleQuest(quest.id));
      dispatch(subtractCoins(quest.rewardCoins));
      dispatch(removeDailyHistory({ date: today, questId: quest.id, coins: quest.rewardCoins }));
    }
  };

  const difficultyConfig = {
    easy: {
      label: 'ง่าย',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      badge: '🟢',
    },
    medium: {
      label: 'ปานกลาง',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      badge: '🟡',
    },
    hard: {
      label: 'ยาก',
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      badge: '🔴',
    },
  };

  const conf = difficultyConfig[quest.difficulty] || difficultyConfig.easy;

  return (
    <div
      className={`group relative rounded-2xl border p-4 transition-all duration-200 ${
        quest.completed
          ? 'bg-zinc-950/40 border-zinc-800/60 opacity-60'
          : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Checkbox & Quest Details */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Custom Checkbox Button */}
          <button
            onClick={handleToggle}
            className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
              quest.completed
                ? 'bg-emerald-500 text-black shadow-sm'
                : 'border border-zinc-600 hover:border-emerald-400 bg-zinc-800/80 hover:bg-emerald-500/10'
            }`}
            aria-label={quest.completed ? 'ทำเสร็จแล้ว' : 'กดเพื่อให้สำเร็จเควสต์'}
          >
            {quest.completed && <Check className="w-4 h-4 stroke-[3]" />}
          </button>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${conf.color}`}
              >
                <span>{conf.badge}</span>
                <span>{conf.label}</span>
              </span>
              {quest.isCustom && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 font-medium">
                  กำหนดเอง
                </span>
              )}
            </div>

            <h3
              className={`font-semibold text-sm sm:text-base leading-snug transition-all ${
                quest.completed ? 'line-through text-zinc-400' : 'text-zinc-100'
              }`}
            >
              {quest.title}
            </h3>

            {quest.description && (
              <p
                className={`text-xs mt-1 leading-relaxed ${
                  quest.completed ? 'text-zinc-500 line-through' : 'text-zinc-400'
                }`}
              >
                {quest.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Coin reward & Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold font-mono ${
              quest.completed
                ? 'bg-zinc-800 text-zinc-400'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span>+{quest.rewardCoins}</span>
          </div>

          {quest.isCustom && (
            <button
              onClick={() => {
                sound.playClick();
                dispatch(deleteQuest(quest.id));
              }}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="ลบเควสต์นี้"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
