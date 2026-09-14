'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { redeemReward, useTicket, deleteReward } from '@/store/walletSlice';
import RewardModal from './RewardModal';
import { sound } from '@/lib/audioService';
import { RewardItem, RedeemedTicket } from '@/types';
import { 
  Gift, 
  Coins, 
  Ticket, 
  Plus, 
  CheckCircle, 
  Clock, 
  Trash2,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RewardShop() {
  const dispatch = useAppDispatch();
  const { coins, totalCoinsEarned, rewards, tickets } = useAppSelector((state) => state.wallet);
  const [activeTab, setActiveTab] = useState<'shop' | 'tickets'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'food' | 'leisure' | 'shopping' | 'rest'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTickets = tickets.filter((t) => !t.isUsed);
  const usedTickets = tickets.filter((t) => t.isUsed);

  const handleRedeem = (reward: RewardItem) => {
    if (coins < reward.costCoins) return;

    sound.playRedeem();
    dispatch(redeemReward(reward.id));

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#f59e0b'],
    });
  };

  const handleUseTicket = (ticketId: string) => {
    sound.playClick();
    dispatch(useTicket(ticketId));
  };

  const categoryIcons: Record<string, string> = {
    leisure: '🎮',
    food: '☕',
    rest: '🛌',
    shopping: '🛍️',
    custom: '🎁',
  };

  const getRewardIcon = (reward: RewardItem) => {
    if (reward.icon && /\p{Extended_Pictographic}/u.test(reward.icon)) {
      return reward.icon;
    }
    const iconMap: Record<string, string> = {
      tv: '🎬',
      stream: '📺',
      coffee: '☕',
      drink: '🥤',
      icecream: '🍦',
      snack: '🍿',
      latenight: '🌙',
      bed: '🛌',
      fastfood: '🍔',
      gamepad: '🎮',
      gamepass: '💎',
      buffet: '🥩',
      steam: '🕹️',
      'shopping-bag': '🛍️',
      gaminggear: '🎧',
      shoes: '👟',
      switch: '🌟',
      gift: '🎁',
    };
    return iconMap[reward.icon] || categoryIcons[reward.category] || '🎁';
  };

  const filteredRewards = rewards.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  return (
    <section className="space-y-5">
      {/* Wallet Banner */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                ร้านค้าแลกรางวัลชีวิต
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300">
                100% Guilt-Free
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              เปลี่ยนเหงื่อจากการออกกำลังกาย ให้กลายเป็นรางวัลที่คุณมีความสุขได้อย่างสบายใจ
            </p>
          </div>

          {/* Wallet Balance Summary */}
          <div className="flex items-center gap-3 bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-800 self-start sm:self-auto">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">เหรียญคงเหลือ</div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                {coins.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">Coins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('shop');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'shop'
                ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>ของรางวัล ({rewards.length})</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('tickets');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'tickets'
                ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>ตั๋วของฉัน</span>
            {activeTickets.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500 text-black">
                {activeTickets.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'shop' && (
          <button
            onClick={() => {
              sound.playClick();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-emerald-500/50 text-zinc-200 hover:text-emerald-300 text-xs font-medium transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มรางวัล</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      {activeTab === 'shop' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: 'ทั้งหมด', icon: '✨' },
            { id: 'food', label: 'ของกิน & เครื่องดื่ม', icon: '☕' },
            { id: 'leisure', label: 'เกม & บันเทิง', icon: '🎮' },
            { id: 'shopping', label: 'ช้อปปิ้ง & ไอที', icon: '🛍️' },
            { id: 'rest', label: 'พักผ่อน', icon: '🛌' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id as any);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-70 font-mono">
                (
                {cat.id === 'all'
                  ? rewards.length
                  : rewards.filter((r) => r.category === cat.id).length}
                )
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Tab: Shop Rewards */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRewards.map((reward) => {
            const canAfford = coins >= reward.costCoins;
            const diffCoins = reward.costCoins - coins;
            const isGrandTrophy = reward.id === 'rew-17' || reward.costCoins >= 3000;

            return (
              <div
                key={reward.id}
                className={`group relative rounded-2xl border p-5 transition-all flex flex-col justify-between gap-4 ${
                  isGrandTrophy
                    ? 'bg-gradient-to-b from-amber-500/10 via-zinc-900/80 to-zinc-900/60 border-amber-500/30 hover:border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.06)]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                        {getRewardIcon(reward)}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white text-sm sm:text-base">
                            {reward.title}
                          </h3>
                          {isGrandTrophy && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              บอสใหญ่
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-xs font-bold font-mono ${
                            isGrandTrophy ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            {reward.costCoins.toLocaleString()} Coins
                          </span>
                          {reward.timesRedeemed > 0 && (
                            <span className="text-[10px] text-zinc-500">
                              • แลกไปแล้ว {reward.timesRedeemed} ครั้ง
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {reward.isCustom && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          dispatch(deleteReward(reward.id));
                        }}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="ลบรางวัลนี้"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {reward.description && (
                    <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                      {reward.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {canAfford ? 'พร้อมแลกรับรางวัล' : `ขาดอีก ${diffCoins.toLocaleString()} Coins`}
                  </span>

                  <button
                    disabled={!canAfford}
                    onClick={() => handleRedeem(reward)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      canAfford
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-sm cursor-pointer'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>แลกรางวัล</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredRewards.length === 0 && (
            <div className="col-span-full text-center py-10 border border-dashed border-zinc-800 rounded-2xl">
              <p className="text-sm text-zinc-400">ไม่พบของรางวัลในหมวดหมู่นี้</p>
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory('all');
                }}
                className="mt-2 text-xs text-emerald-400 hover:underline font-medium"
              >
                ดูของรางวัลทั้งหมด
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Tickets Inventory */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
              <Ticket className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-400 font-medium">ยังไม่มีตั๋วรางวัลในคลัง</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                ออกกำลังกายสะสมเหรียญ แล้วนำมาแลกของรางวัลในแท็บ "ของรางวัล" ได้เลยครับ
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`rounded-2xl border p-4 transition-all ${
                    ticket.isUsed
                      ? 'bg-zinc-950/40 border-zinc-800/50 opacity-60'
                      : 'bg-zinc-900/80 border-emerald-500/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                          {ticket.id.slice(0, 14)}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          🪙 {ticket.costCoins} Coins
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-sm">{ticket.rewardTitle}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>แลกเมื่อ: {new Date(ticket.redeemedAt).toLocaleDateString('th-TH')}</span>
                      </p>
                    </div>

                    <div>
                      {ticket.isUsed ? (
                        <div className="px-3 py-1 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-medium flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-zinc-500" />
                          <span>ใช้แล้ว</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleUseTicket(ticket.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all shadow-sm"
                        >
                          กดใช้สิทธิ์
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reward Creator Modal */}
      <RewardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
