'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { addCustomQuest } from '@/store/questSlice';
import { sound } from '@/lib/audioService';
import { Difficulty } from '@/types';
import { X, Plus, Coins } from 'lucide-react';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestModal({ isOpen, onClose }: QuestModalProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [rewardCoins, setRewardCoins] = useState(30);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sound.playClick();
    dispatch(
      addCustomQuest({
        title: title.trim(),
        description: description.trim(),
        difficulty,
        rewardCoins: Number(rewardCoins) || 20,
      })
    );

    setTitle('');
    setDescription('');
    setDifficulty('medium');
    setRewardCoins(30);
    onClose();
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    if (diff === 'easy') setRewardCoins(15);
    if (diff === 'medium') setRewardCoins(35);
    if (diff === 'hard') setRewardCoins(60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-1">สร้างเควสต์ออกกำลังกายใหม่</h2>
        <p className="text-xs text-zinc-400 mb-5">
          กำหนดเป้าหมายการออกกำลังกายส่วนตัว พร้อมกำหนดเหรียญรางวัลที่ได้รับ
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              ชื่อเควสต์ <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น วิ่งในสวน 3 กม., แพลงก์สะสม 2 นาที"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-zinc-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              คำอธิบาย (ทางเลือก)
            </label>
            <textarea
              rows={2}
              placeholder="ระบุรายละเอียดเพิ่มเติม หรือเทคนิคที่ใช้"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-zinc-500 resize-none"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              ระดับความยาก
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDifficultyChange('easy')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  difficulty === 'easy'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                🟢 ง่าย
              </button>
              <button
                type="button"
                onClick={() => handleDifficultyChange('medium')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  difficulty === 'medium'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                🟡 ปานกลาง
              </button>
              <button
                type="button"
                onClick={() => handleDifficultyChange('hard')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  difficulty === 'hard'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                🔴 ยาก
              </button>
            </div>
          </div>

          {/* Coin reward */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              จำนวนเหรียญรางวัล (Coins)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="500"
                value={rewardCoins}
                onChange={(e) => setRewardCoins(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-sm text-white font-mono"
              />
              <Coins className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-medium transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>บันทึกเควสต์</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
