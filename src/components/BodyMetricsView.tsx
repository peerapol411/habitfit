'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addMetricRecord, deleteMetricRecord, setUserHeightCm } from '@/store/metricsSlice';
import { addCoins } from '@/store/walletSlice';
import { sound } from '@/lib/audioService';
import { BodyMetricRecord } from '@/types';
import { 
  Scale, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  Coins, 
  Plus, 
  Trash2, 
  Calendar, 
  Activity, 
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BodyMetricsView() {
  const dispatch = useAppDispatch();
  const { records, userHeightCm } = useAppSelector((state) => state.metrics);

  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<number>(userHeightCm || 170);
  const [waist, setWaist] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Latest record and previous record
  const latestRecord: BodyMetricRecord | undefined = records[0];
  const previousRecord: BodyMetricRecord | undefined = records[1];

  const weightDiff = latestRecord && previousRecord
    ? parseFloat((latestRecord.weightKg - previousRecord.weightKg).toFixed(1))
    : 0;

  // BMI Calculation
  const currentHeightM = (height || 170) / 100;
  const previewWeightNum = parseFloat(weight) || (latestRecord?.weightKg ?? 0);
  const previewBmi = previewWeightNum > 0
    ? parseFloat((previewWeightNum / (currentHeightM * currentHeightM)).toFixed(1))
    : latestRecord?.bmi ?? 0;

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'น้ำหนักน้อยกว่าเกณฑ์', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    if (bmi < 23) return { label: 'น้ำหนักปกติ / สมส่วน', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (bmi < 25) return { label: 'น้ำหนักเกิน (ท้วม)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'โรคอ้วน / มีความเสี่ยง', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };

  const bmiCat = getBmiCategory(latestRecord?.bmi || previewBmi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum <= 0) return;

    sound.playRedeem();

    const waistNum = waist ? parseFloat(waist) : undefined;
    const today = new Date().toISOString().split('T')[0];

    dispatch(setUserHeightCm(height));
    dispatch(
      addMetricRecord({
        date: today,
        weightKg: weightNum,
        heightCm: height,
        waistInch: waistNum,
        notes: notes.trim() || undefined,
      })
    );

    // Reward 50 bonus coins for recording metrics!
    dispatch(addCoins(50));

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#f59e0b'],
    });

    setWeight('');
    setWaist('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <section className="space-y-6">
      {/* Header Overview Card */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                บันทึกสัดส่วนร่างกาย (Body Metrics)
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              ติดตามน้ำหนักและรอบเอวสม่ำเสมอ พร้อมรับโบนัส +50 Coins ทุกครั้งที่บันทึก
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setShowAddForm(!showAddForm);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{showAddForm ? 'ปิดแบบฟอร์ม' : 'ชั่งน้ำหนักวันนี้'}</span>
          </button>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Latest Weight Card */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">น้ำหนักล่าสุด</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {latestRecord ? latestRecord.weightKg : '--'}
              </span>
              <span className="text-xs text-zinc-400">กก.</span>
            </div>
            <div className="mt-2 text-[11px] flex items-center gap-1">
              {previousRecord ? (
                weightDiff < 0 ? (
                  <span className="text-emerald-400 flex items-center gap-0.5 font-medium">
                    <TrendingDown className="w-3.5 h-3.5" />
                    ลดลง {Math.abs(weightDiff)} กก.
                  </span>
                ) : weightDiff > 0 ? (
                  <span className="text-amber-400 flex items-center gap-0.5 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    เพิ่มขึ้น {weightDiff} กก.
                  </span>
                ) : (
                  <span className="text-zinc-400 flex items-center gap-0.5">
                    <Minus className="w-3.5 h-3.5" />
                    เท่าเดิมกับครั้งก่อน
                  </span>
                )
              ) : (
                <span className="text-zinc-500">บันทึกแรก</span>
              )}
            </div>
          </div>

          {/* BMI Card */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">ดัชนีมวลกาย (BMI)</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {latestRecord?.bmi || '--'}
              </span>
              <span className="text-xs text-zinc-400">kg/m²</span>
            </div>
            <div className="mt-2">
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${bmiCat.color}`}>
                {bmiCat.label}
              </span>
            </div>
          </div>

          {/* Waist / Bonus Card */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 font-medium">รอบเอวล่าสุด</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {latestRecord?.waistInch || '--'}
              </span>
              <span className="text-xs text-zinc-400">นิ้ว</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>รับโบนัส +50 Coins แล้ว</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Record Form (Collapsible or visible) */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-zinc-900 border border-emerald-500/30 p-5 sm:p-6 shadow-md space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>ชั่งน้ำหนักและบันทึกสัดส่วนใหม่</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                +50 Coins
              </span>
            </h3>
            <span className="text-xs text-zinc-400">
              วันที่: {new Date().toLocaleDateString('th-TH')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Weight */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                น้ำหนักตัว (กก.) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="เช่น 68.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-base font-mono text-white placeholder-zinc-600"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                ส่วนสูง (ซม.) สำหรับคำนวณ BMI
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Math.max(50, parseInt(e.target.value) || 170))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-base font-mono text-white"
              />
            </div>

            {/* Waist */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                รอบเอว (นิ้ว) - ทางเลือก
              </label>
              <input
                type="number"
                step="0.5"
                placeholder="เช่น 31.0"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-base font-mono text-white placeholder-zinc-600"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              บันทึกย่อ (เช่น ชั่งตอนเช้าหลังตื่นนอน หรือ ท้องว่าง)
            </label>
            <input
              type="text"
              placeholder="เช่น ชั่งตอนเช้าหลังเข้าห้องน้ำ, รู้สึกตัวเบาขึ้น"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-xs text-white placeholder-zinc-600"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-medium transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>บันทึกและรับ +50 Coins</span>
            </button>
          </div>
        </form>
      )}

      {/* History Log Table */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 shadow-sm">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>ประวัติการชั่งน้ำหนักและสัดส่วน</span>
        </h3>

        {records.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 text-xs">
            ยังไม่มีประวัติการบันทึก กดปุ่ม "ชั่งน้ำหนักวันนี้" เพื่อเริ่มบันทึกครั้งแรก
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
                  <th className="pb-3 pl-2">วันที่</th>
                  <th className="pb-3">น้ำหนัก</th>
                  <th className="pb-3">BMI</th>
                  <th className="pb-3">รอบเอว</th>
                  <th className="pb-3">บันทึก</th>
                  <th className="pb-3 text-right pr-2">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 pl-2 font-mono text-zinc-300">
                      {new Date(rec.date).toLocaleDateString('th-TH')}
                    </td>
                    <td className="py-3 font-mono font-bold text-white">
                      {rec.weightKg} กก.
                    </td>
                    <td className="py-3 font-mono text-zinc-300">
                      {rec.bmi ? (
                        <span className="flex items-center gap-1.5">
                          <span>{rec.bmi}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] border ${getBmiCategory(rec.bmi).color}`}>
                            {getBmiCategory(rec.bmi).label.split(' ')[0]}
                          </span>
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 font-mono text-zinc-300">
                      {rec.waistInch ? `${rec.waistInch} นิ้ว` : '-'}
                    </td>
                    <td className="py-3 text-zinc-400 max-w-[200px] truncate">
                      {rec.notes || '-'}
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          dispatch(deleteMetricRecord(rec.id));
                        }}
                        className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="ลบรายการนี้"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
