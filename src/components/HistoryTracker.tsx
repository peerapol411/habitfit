'use client';

import React, { useState } from 'react';
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
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Info
} from 'lucide-react';
import { INITIAL_QUESTS } from '@/store/questSlice';
import { sound } from '@/lib/audioService';

export default function HistoryTracker() {
  const { streak, history } = useAppSelector((state) => state.settings);
  const { quests } = useAppSelector((state) => state.quest);

  // Month navigation state
  const [selectedMonthDate, setSelectedMonthDate] = useState(() => new Date());
  // Selected date for drill-down modal
  const [selectedDateModal, setSelectedDateModal] = useState<string | null>(null);

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

  // Month calculation variables
  const selectedYear = selectedMonthDate.getFullYear();
  const selectedMonth = selectedMonthDate.getMonth(); // 0-11
  const todayStr = new Date().toISOString().split('T')[0];
  const isCurrentMonth =
    new Date().getFullYear() === selectedYear && new Date().getMonth() === selectedMonth;

  // Month navigation handlers
  const handlePrevMonth = () => {
    sound.playClick();
    setSelectedMonthDate(new Date(selectedYear, selectedMonth - 1, 1));
  };
  const handleNextMonth = () => {
    sound.playClick();
    setSelectedMonthDate(new Date(selectedYear, selectedMonth + 1, 1));
  };
  const handleTodayMonth = () => {
    sound.playClick();
    setSelectedMonthDate(new Date());
  };

  const monthNameThai = selectedMonthDate.toLocaleDateString('th-TH', {
    month: 'long',
    year: 'numeric',
  });

  // Days in month & day of week for 1st
  const totalDaysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 = Sun, 1 = Mon ...

  // Monthly statistics
  let monthTotalQuests = 0;
  let monthTotalCoins = 0;
  let monthActiveDays = 0;

  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const entry = history[dStr];
    if (entry && entry.questsCompletedCount > 0) {
      monthActiveDays += 1;
      monthTotalQuests += entry.questsCompletedCount;
      monthTotalCoins += entry.coinsEarned;
    }
  }

  const monthConsistencyRate = Math.round((monthActiveDays / totalDaysInMonth) * 100);

  // Month days array
  const monthDays = Array.from({ length: totalDaysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    const entry = history[dateStr];
    const hasActivity = Boolean(entry && entry.questsCompletedCount > 0);
    const count = entry?.questsCompletedCount || 0;
    const coins = entry?.coinsEarned || 0;
    const isToday = dateStr === todayStr;
    return {
      dayNum,
      dateStr,
      entry,
      hasActivity,
      count,
      coins,
      isToday,
    };
  });

  // Selected date modal data
  const selectedModalEntry = selectedDateModal ? history[selectedDateModal] : null;
  const selectedModalDateFormatted = selectedDateModal
    ? new Date(selectedDateModal + 'T00:00:00').toLocaleDateString('th-TH', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const getCompletedQuestListForModal = () => {
    if (!selectedModalEntry) return [];
    if (selectedModalEntry.completedQuests && selectedModalEntry.completedQuests.length > 0) {
      return selectedModalEntry.completedQuests;
    }
    return (selectedModalEntry.completedQuestIds || []).map((id) => {
      const found = quests.find((q) => q.id === id) || INITIAL_QUESTS.find((q) => q.id === id);
      return {
        id,
        title: found?.title || 'เควสต์ออกกำลังกาย',
        difficulty: found?.difficulty || 'easy',
        rewardCoins: found?.rewardCoins || 15,
      };
    });
  };

  const completedQuestsList = getCompletedQuestListForModal();

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'hard':
        return { label: 'ยาก', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20', icon: '🔴' };
      case 'medium':
        return { label: 'ปานกลาง', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: '🟡' };
      default:
        return { label: 'ง่าย', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: '🟢' };
    }
  };

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

      {/* 1-Month Calendar Consistency & History Tracker */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm space-y-5">
        {/* Calendar Header with Month Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                ปฏิทินบันทึกสถานะรายเดือน (1-Month Calendar)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              เลือกดูสถิติย้อนหลังในแต่ละเดือน และคลิกที่ช่องวันที่เพื่อดูรายละเอียดเควสต์ที่ทำสำเร็จ
            </p>
          </div>

          {/* Month Switcher Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors border border-zinc-700"
              title="เดือนก่อนหน้า"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="min-w-[140px] text-center font-bold text-sm sm:text-base text-white font-mono px-2">
              {monthNameThai}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors border border-zinc-700"
              title="เดือนถัดไป"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {!isCurrentMonth && (
              <button
                onClick={handleTodayMonth}
                className="ml-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500 hover:text-black transition-all"
              >
                เดือนนี้
              </button>
            )}
          </div>
        </div>

        {/* Monthly Summary Statistics Bar */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center">
          <div>
            <span className="text-[11px] text-zinc-400 block font-medium">วันที่ออกกำลังกาย</span>
            <span className="text-base sm:text-lg font-bold font-mono text-white mt-0.5 block">
              {monthActiveDays} <span className="text-xs text-zinc-400 font-normal">/ {totalDaysInMonth} วัน</span>
            </span>
            <span className="text-[10px] text-amber-400 block mt-0.5">
              ความสม่ำเสมอ {monthConsistencyRate}%
            </span>
          </div>
          <div className="border-x border-zinc-800/80 px-2">
            <span className="text-[11px] text-zinc-400 block font-medium">เควสต์สำเร็จในเดือนนี้</span>
            <span className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5 block">
              {monthTotalQuests} <span className="text-xs text-zinc-400 font-normal">เควสต์</span>
            </span>
            <span className="text-[10px] text-emerald-400/70 block mt-0.5">
              สำเร็จจริง 100%
            </span>
          </div>
          <div>
            <span className="text-[11px] text-zinc-400 block font-medium">เหรียญสะสมในเดือนนี้</span>
            <span className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5 block">
              +{monthTotalCoins.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">Coins</span>
            </span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">
              พร้อมแลกรางวัล
            </span>
          </div>
        </div>

        {/* Calendar 7-Day Columns Header */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-semibold text-zinc-400">
          <div className="text-rose-400/80">อา.</div>
          <div>จ.</div>
          <div>อ.</div>
          <div>พ.</div>
          <div>พฤ.</div>
          <div>ศ.</div>
          <div className="text-amber-400/80">ส.</div>
        </div>

        {/* Calendar Day Grid (7 Columns) */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {/* Empty cells before Day 1 */}
          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="min-h-[70px] sm:min-h-[82px] rounded-xl bg-zinc-950/20 border border-zinc-900/40 opacity-30"
            />
          ))}

          {/* Actual Month Days */}
          {monthDays.map((day) => (
            <button
              key={day.dateStr}
              onClick={() => {
                sound.playClick();
                setSelectedDateModal(day.dateStr);
              }}
              className={`group relative flex flex-col justify-between p-2 sm:p-2.5 rounded-xl border text-left transition-all min-h-[70px] sm:min-h-[82px] ${
                day.isToday
                  ? 'border-emerald-500 bg-zinc-900 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : day.hasActivity
                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/30'
                  : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-800/40'
              }`}
            >
              {/* Top: Day number & Today Tag */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-xs sm:text-sm font-bold font-mono ${
                    day.isToday
                      ? 'text-emerald-400'
                      : day.hasActivity
                      ? 'text-white'
                      : 'text-zinc-400'
                  }`}
                >
                  {day.dayNum}
                </span>

                {day.isToday && (
                  <span className="text-[9px] font-semibold px-1 rounded bg-emerald-500/20 text-emerald-300">
                    วันนี้
                  </span>
                )}
              </div>

              {/* Middle: Activity Badge / Count */}
              <div className="my-1">
                {day.hasActivity ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-emerald-300">
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                      <span>{day.count} เควสต์</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400/80 font-medium">
                      +{day.coins}
                    </span>
                  </div>
                ) : (
                  <span className="text-zinc-600 text-xs pl-1">•</span>
                )}
              </div>

              {/* Bottom: Click hint */}
              <div className="w-full text-right opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] text-zinc-400 underline">ดูรายละเอียด</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Day Detail Drill-Down Modal */}
      {selectedDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedDateModal(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  รายละเอียดการออกกำลังกาย
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                {selectedModalDateFormatted}
              </p>
            </div>

            {/* Day Summary Cards */}
            {selectedModalEntry && selectedModalEntry.questsCompletedCount > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 font-medium">เควสต์สำเร็จในวันนี้</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-bold font-mono text-emerald-400">
                        {selectedModalEntry.questsCompletedCount}
                      </span>
                      <span className="text-xs text-zinc-400">เควสต์</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 font-medium">เหรียญรางวัลที่ได้รับ</span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-bold font-mono text-emerald-400">
                        +{selectedModalEntry.coinsEarned}
                      </span>
                      <span className="text-xs text-zinc-400">Coins</span>
                    </div>
                  </div>
                </div>

                {/* Quests List */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      รายการเควสต์ที่ทำสำเร็จ ({completedQuestsList.length})
                    </h4>
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      สำเร็จทั้งหมด
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {completedQuestsList.map((q, idx) => {
                      const diff = getDifficultyBadge(q.difficulty);
                      return (
                        <div
                          key={q.id || idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium border ${diff.color}`}>
                                  {diff.icon} {diff.label}
                                </span>
                              </div>
                              <h5 className="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
                                {q.title}
                              </h5>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold shrink-0">
                            <Coins className="w-3 h-3 text-emerald-400" />
                            <span>+{q.rewardCoins}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Empty State for Inactive Days */
              <div className="py-10 text-center space-y-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto text-zinc-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300">
                    ไม่มีประวัติการทำเควสต์ในวันนี้
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                    เป็นวันพักผ่อน หรือยังไม่ได้เริ่มทำเควสต์ในวันนี้ เริ่มต้นสะสมสตรีคของคุณได้เสมอ!
                  </p>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-2 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedDateModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-medium transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
