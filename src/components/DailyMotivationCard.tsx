'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Quote, Copy, Check, BookOpen, Dumbbell, Brain, Zap } from 'lucide-react';
import { getDailyQuote, MotivationQuote } from '@/data/quotes';
import { sound } from '@/lib/audioService';

export default function DailyMotivationCard() {
  const [quote, setQuote] = useState<MotivationQuote | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Automatically select the quote of the day based on the calendar date
    setQuote(getDailyQuote(new Date()));
  }, []);

  if (!quote) return null;

  const handleCopy = () => {
    sound.playClick();
    const textToCopy = `“${quote.quote}”\n\n— ${quote.author} (${quote.authorRole})\n#HabitFit #DailyMotivation`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'fitness':
        return {
          icon: Dumbbell,
          badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          accentColor: 'text-emerald-400',
          bgGlow: 'from-emerald-500/5 via-transparent to-transparent',
        };
      case 'habits':
        return {
          icon: Zap,
          badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          accentColor: 'text-cyan-400',
          bgGlow: 'from-cyan-500/5 via-transparent to-transparent',
        };
      case 'mindset':
        return {
          icon: Brain,
          badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          accentColor: 'text-amber-400',
          bgGlow: 'from-amber-500/5 via-transparent to-transparent',
        };
      case 'wisdom':
      default:
        return {
          icon: BookOpen,
          badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
          accentColor: 'text-violet-400',
          bgGlow: 'from-violet-500/5 via-transparent to-transparent',
        };
    }
  };

  const theme = getCategoryTheme(quote.category);
  const CategoryIcon = theme.icon;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-zinc-900/70 border border-zinc-800 p-5 sm:p-6 shadow-sm transition-all hover:border-zinc-700/80">
      {/* Background ambient gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.bgGlow} pointer-events-none`}
      />

      {/* Top Bar: Category, Daily Badge & Copy Button */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${theme.badgeColor}`}
          >
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{quote.categoryLabel}</span>
          </span>

          <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>สุ่มเปลี่ยนใหม่ทุกวันอัตโนมัติ</span>
          </span>
        </div>

        {/* Copy quote button */}
        <button
          onClick={handleCopy}
          title="คัดลอกคำคม"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium transition-all border border-zinc-700/60"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">คัดลอก</span>
            </>
          )}
        </button>
      </div>

      {/* Quote Body */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-start gap-3">
          <Quote className={`w-6 h-6 shrink-0 mt-0.5 opacity-40 ${theme.accentColor}`} />
          <div className="space-y-1.5 flex-1">
            <p className="text-sm sm:text-base font-medium text-zinc-100 leading-relaxed tracking-wide">
              {quote.quote}
            </p>
            {quote.quoteOriginal && (
              <p className="text-xs text-zinc-400 italic font-sans opacity-80">
                &ldquo;{quote.quoteOriginal}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Author Details */}
        <div className="pt-3 border-t border-zinc-800/70 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-bold text-xs text-zinc-300">
              {quote.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {quote.author}
              </div>
              <div className="text-[11px] text-zinc-400">
                {quote.authorRole}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
