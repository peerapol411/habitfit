'use client';

import React from 'react';
import { useAppSelector } from '@/store/store';
import { 
  Flame, 
  Calendar, 
  Check, 
  Coins, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  Lightbulb
} from 'lucide-react';

export default function HistoryTracker() {
  const { streak, history } = useAppSelector((state) => state.settings);
  const { quests } = useAppSelector((state) => state.quest);

  // Generate last 7 days dates (from 6 days ago to today)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('th-TH', { weekday: 'short' });
    const dayFullName = d.toLocaleDateString('th-TH', { weekday: 'long' });
    const dayNum = d.getDate();
    return {
      dateStr,
      dayName,
      dayFullName,
      dayNum,
      isToday: i === 6,
    };
  });

  // Calculate Weekly Totals
  let weeklyTotalQuests = 0;
  let weeklyTotalCoins = 0;
  let activeDaysCount = 0;
  let maxQuestsInDay = 1;

  days.forEach((day) => {
    const entry = history[day.dateStr];
    if (entry) {
      weeklyTotalQuests += entry.questsCompletedCount || 0;
      weeklyTotalCoins += entry.coinsEarned || 0;
      if (entry.questsCompletedCount > 0) {
        activeDaysCount += 1;
        if (entry.questsCompletedCount > maxQuestsInDay) {
          maxQuestsInDay = entry.questsCompletedCount;
        }
      }
    }
  });

  const weeklyConsistencyRate = Math.round((activeDaysCount / 7) * 100);

  // Smart Motivation Insight based on performance
  const getWeeklyInsight = () => {
    if (weeklyConsistencyRate >= 85) {
      return {
        badge: 'ยอดเยี่ยมระดับ Champion 🌟',
        message: 'ความสม่ำเสมอของคุณอยู่ในเกณฑ์สมบูรณ์แบบ! คุณออกกำลังกายเกือบทุกวันในสัปดาห์นี้ รักษาวินัยนี้ไว้จะช่วยเพิ่มอัตราการเผาผลาญระยะยาว',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      };
    }
    if (weeklyConsistencyRate >= 55) {
      return {
        badge: 'ทำได้ดีมาก รักษาความฟิตต่อเนื่อง 👍',
        message: 'คุณออกกำลังกายไปได้มากกว่าครึ่งสัปดาห์แล้ว! วันนี้ลองเพิ่มเควสต์ง่ายๆ เช่น ดื่มน้ำ 2 ลิตร หรือเดินเร็ว เพื่อดันสถิติให้สูงขึ้น',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      };
    }
    return {
      badge: 'เริ่มต้นก้าวเล็กๆ วันนี้ 💪',
      message: 'การสร้างนิสัยไม่จำเป็นต้องหักโหม เริ่มต้นวันใหม่ด้วยเควสต์เบาๆ 1-2 อย่าง เช่น ดื่มน้ำหรือยืดเหยียดกล้ามเนื้อ เพื่อสะสมคอมโบ',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    };
  };

  const insight = getWeeklyInsight();

  return (
    <section className="space-y-6">
      {/* Overview & KPI Cards */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                สรุปสถิติประจำสัปดาห์ & ความต่อเนื่อง
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              ติดตามภาพรวมการออกกำลังกาย 7 วันล่าสุด วิเคราะห์ความสม่ำเสมอและเหรียญที่ทำได้
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold self-start sm:self-auto">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>ออกกำลังกายต่อเนื่อง {streak} วัน</span>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Total Quests Done */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">เควสต์สำเร็จสัปดาห์นี้</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {weeklyTotalQuests}
              </span>
              <span className="text-xs text-zinc-400">เควสต์</span>
            </div>
            <span className="text-[11px] text-emerald-400 mt-2 flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" />
              สำเร็จแล้ว
            </span>
          </div>

          {/* Total Coins Earned */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">เหรียญที่ได้สัปดาห์นี้</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                +{weeklyTotalCoins}
              </span>
              <span className="text-xs text-zinc-400">Coins</span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1">
              <Coins className="w-3 h-3 text-emerald-400" />
              พร้อมนำไปแลกรางวัล
            </span>
          </div>

          {/* Active Days */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">วันที่ออกกำลังกาย</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {activeDaysCount}
              </span>
              <span className="text-xs text-zinc-400">/ 7 วัน</span>
            </div>
            <span className="text-[11px] text-amber-400 mt-2 font-medium">
              สม่ำเสมอ {weeklyConsistencyRate}%
            </span>
          </div>

          {/* Current Streak */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">คอมโบความสม่ำเสมอ</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-300">
                {streak}
              </span>
              <span className="text-xs text-zinc-400">วันติด</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-2 flex items-center gap-0.5">
              <Flame className="w-3 h-3 text-amber-400" />
              ไฟลุกต่อเนื่อง
            </span>
          </div>
        </div>
      </div>

      {/* Apple-style Weekly Activity Bar Chart */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              กราฟกิจกรรม 7 วันล่าสุด (Weekly Activity Chart)
            </h3>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            แท่งกราฟแสดงจำนวนเควสต์ที่ทำในแต่ละวัน
          </span>
        </div>

        {/* The Bar Chart */}
        <div className="pt-6 pb-2 px-2 sm:px-6 bg-zinc-950/80 rounded-xl border border-zinc-800">
          <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-48 sm:h-52">
            {days.map((day) => {
              const entry = history[day.dateStr];
              const count = entry?.questsCompletedCount || 0;
              const coins = entry?.coinsEarned || 0;
              const heightPercent = maxQuestsInDay > 0
                ? Math.max(8, Math.round((count / maxQuestsInDay) * 100))
                : 8;

              return (
                <div key={day.dateStr} className="flex flex-col items-center h-full justify-end group relative">
                  {/* Hover Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-[10px] sm:text-xs py-1 px-2 rounded-lg pointer-events-none shadow-lg whitespace-nowrap z-20 border border-zinc-700">
                    <div className="font-semibold">{day.dayFullName}</div>
                    <div className="text-emerald-400">{count} เควสต์ (+{coins} Coins)</div>
                  </div>

                  {/* Quest Count Number above bar */}
                  <span
                    className={`text-[11px] font-mono mb-2 transition-colors ${
                      count > 0 ? 'text-zinc-200 font-semibold' : 'text-zinc-600'
                    }`}
                  >
                    {count > 0 ? count : '-'}
                  </span>

                  {/* Vertical Bar */}
                  <div className="w-full max-w-[36px] bg-zinc-800/80 rounded-t-xl overflow-hidden flex items-end">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        day.isToday
                          ? 'bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                          : count > 0
                          ? 'bg-emerald-500/80 group-hover:bg-emerald-400'
                          : 'bg-zinc-800'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Day Label at bottom */}
                  <div className="mt-3 text-center">
                    <div
                      className={`text-xs font-semibold ${
                        day.isToday ? 'text-emerald-400' : 'text-zinc-400'
                      }`}
                    >
                      {day.dayName}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {day.dayNum}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smart Motivation Insight Card */}
      <div className={`rounded-2xl border p-5 sm:p-6 shadow-sm ${insight.color}`}>
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-zinc-950/60 border border-white/10 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5 text-amber-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm sm:text-base text-white">
                {insight.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {insight.message}
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Consistency Circles Status Row */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>บันทึกสถานะรายวัน (7-Day Consistency Row)</span>
        </h3>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {days.map((day) => {
            const entry = history[day.dateStr];
            const hasActivity = entry && entry.questsCompletedCount > 0;

            return (
              <div
                key={day.dateStr}
                className={`flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                  day.isToday
                    ? 'bg-zinc-800/80 border-emerald-500/40 shadow-sm'
                    : 'bg-zinc-950/60 border-zinc-800/80'
                }`}
              >
                <span className="text-[11px] font-medium text-zinc-400">{day.dayName}</span>
                <span className="text-xs sm:text-sm font-bold text-zinc-200 mt-0.5 mb-2">
                  {day.dayNum}
                </span>

                {/* Status Circle */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    hasActivity
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : 'border border-zinc-700 bg-zinc-900 text-zinc-600'
                  }`}
                >
                  {hasActivity ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="text-xs">•</span>
                  )}
                </div>

                <span className="text-[10px] font-mono text-zinc-500 mt-2">
                  {hasActivity ? `+${entry.coinsEarned}` : '-'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
