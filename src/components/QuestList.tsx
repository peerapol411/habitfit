'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/store';
import QuestCard from './QuestCard';
import QuestModal from './QuestModal';
import { sound } from '@/lib/audioService';
import { Plus, CheckCircle2, ListFilter, Sparkles } from 'lucide-react';

export default function QuestList() {
  const { quests } = useAppSelector((state) => state.quest);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const completedCount = quests.filter((q) => q.completed).length;
  const totalCount = quests.length;
  const totalCoinsAvailable = quests
    .filter((q) => q.completed)
    .reduce((sum, q) => sum + q.rewardCoins, 0);

  const filteredQuests = quests.filter((q) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return q.completed;
    return q.difficulty === filter;
  });

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="space-y-5">
      {/* Header & Progress Banner */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                ภารกิจออกกำลังกายประจำวัน
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {completedCount}/{totalCount} เสร็จสิ้น
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              ทำเควสต์เพื่อรับเหรียญรางวัล ยิ่งยากยิ่งได้เหรียญมาก นำไปแลกของรางวัลที่คุณต้องการ
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              sound.playClick();
              setIsModalOpen(true);
            }}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>สร้างเควสต์เพิ่ม</span>
          </button>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between text-xs font-medium text-zinc-400">
            <span>ความคืบหน้าวันนี้ ({progressPercent}%)</span>
            <span className="text-emerald-400">รับแล้ว +{totalCoinsAvailable} Coins</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => {
            sound.playClick();
            setFilter('all');
          }}
          className={`px-3.5 py-2 rounded-xl border transition-all shrink-0 font-medium ${
            filter === 'all'
              ? 'bg-zinc-100 border-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          ทั้งหมด ({totalCount})
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setFilter('easy');
          }}
          className={`px-3 py-2 rounded-xl border transition-all shrink-0 font-medium ${
            filter === 'easy'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          🟢 ง่าย ({quests.filter((q) => q.difficulty === 'easy').length})
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setFilter('medium');
          }}
          className={`px-3 py-2 rounded-xl border transition-all shrink-0 font-medium ${
            filter === 'medium'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          🟡 ปานกลาง ({quests.filter((q) => q.difficulty === 'medium').length})
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setFilter('hard');
          }}
          className={`px-3 py-2 rounded-xl border transition-all shrink-0 font-medium ${
            filter === 'hard'
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          🔴 ยาก ({quests.filter((q) => q.difficulty === 'hard').length})
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setFilter('completed');
          }}
          className={`px-3 py-2 rounded-xl border transition-all shrink-0 font-medium ${
            filter === 'completed'
              ? 'bg-zinc-800 border-zinc-700 text-white font-semibold'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          ✓ สำเร็จแล้ว ({completedCount})
        </button>
      </div>

      {/* Quest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>

      {filteredQuests.length === 0 && (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
          <CheckCircle2 className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-400 font-medium">ไม่พบเควสต์ในหมวดหมู่นี้</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            คุณสามารถกดปุ่ม "สร้างเควสต์เพิ่ม" ด้านบนเพื่อเพิ่มเป้าหมายของคุณได้
          </p>
        </div>
      )}

      {/* Custom Quest Creator Modal */}
      <QuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
