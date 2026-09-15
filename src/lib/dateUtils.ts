/**
 * Centralized Date & Timezone Utilities for HabitFit
 * Guarantees date operations use the user's real local calendar date
 * (e.g. Asia/Bangkok UTC+7) rather than UTC date strings.
 */

/**
 * Returns YYYY-MM-DD string in the user's local timezone.
 * Example: 2026-09-15
 */
export function getLocalTodayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns yesterday's YYYY-MM-DD string in local timezone.
 */
export function getYesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalTodayKey(d);
}

/**
 * Formats a Date object into a readable Thai date string.
 * Example: วันอังคารที่ 15 กันยายน 2569
 */
export function formatThaiDate(date: Date = new Date()): string {
  return date.toLocaleDateString('th-TH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Returns true if dateStr1 is strictly earlier than dateStr2 (both YYYY-MM-DD).
 */
export function isDateBefore(dateStr1: string, dateStr2: string): boolean {
  if (!dateStr1 || !dateStr2) return false;
  return dateStr1 < dateStr2;
}

/**
 * Returns true if dateStr1 and dateStr2 represent the same calendar day.
 */
export function isSameDay(dateStr1: string, dateStr2: string): boolean {
  return dateStr1 === dateStr2;
}
