'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { addCustomReward } from '@/store/walletSlice';
import { sound } from '@/lib/audioService';
import { RewardCategory } from '@/types';
import { X, Plus, Coins, Gift } from 'lucide-react';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RewardModal({ isOpen, onClose }: RewardModalProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [costCoins, setCostCoins] = useState(150);
  const [category, setCategory] = useState<RewardCategory>('leisure');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sound.playClick();
    dispatch(
      addCustomReward({
        title: title.trim(),
        description: description.trim(),
        costCoins: Number(costCoins) || 100,
        category,
        icon: 'gift',
      })
    );

    setTitle('');
    setDescription('');
    setCostCoins(150);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-1">เพิ่มของรางวัลใหม่</h2>
        <p className="text-xs text-zinc-400 mb-5">
          สร้างรางวัลชีวิตให้ตัวเอง แล้วใช้เหรียญจากการออกกำลังกายมาแลก
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              ชื่อของรางวัล <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น ดูกอล์ฟ 1 แมตช์, ไปนวดอโรมา, ซื้อเค้กชิ้นโปรด"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              คำอธิบาย (ทางเลือก)
            </label>
            <textarea
              rows={2}
              placeholder="รายละเอียดของรางวัลที่จะให้ตัวเอง"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-zinc-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              หมวดหมู่รางวัล
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'leisure', label: 'ความบันเทิง', icon: '🎬' },
                { id: 'food', label: 'อาหาร/ขนม', icon: '☕' },
                { id: 'rest', label: 'พักผ่อน', icon: '🛌' },
                { id: 'shopping', label: 'ช้อปปิ้ง', icon: '🛍️' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as RewardCategory)}
                  className={`py-2 px-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                    category === cat.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="text-[10px]">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              ราคาเหรียญที่ต้องใช้ (Coins)
            </label>
            <div className="relative">
              <input
                type="number"
                min="10"
                max="5000"
                value={costCoins}
                onChange={(e) => setCostCoins(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-sm text-white font-mono"
              />
              <Coins className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
            </div>
          </div>

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
              <span>บันทึกรางวัล</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
