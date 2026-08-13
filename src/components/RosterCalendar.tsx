import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Users,
  Compass,
} from 'lucide-react';
import { getScheduledPairForDate } from '../data/rosterData';
import { toBengaliNumerals, getTodayDateString } from '../utils/bengaliUtils';

interface RosterCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateString: string) => void;
  className?: string;
}

const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const BENGALI_WEEKDAYS = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

export const RosterCalendar: React.FC<RosterCalendarProps> = ({
  selectedDate,
  onSelectDate,
  className = '',
}) => {
  // Parse initial selected date or fallback to current date
  const parseDateStr = (dStr: string) => {
    if (!dStr) return new Date();
    const [y, m, d] = dStr.split('-').map((v) => parseInt(v, 10));
    if (isNaN(y) || isNaN(m) || isNaN(d)) return new Date();
    return new Date(y, m - 1, d);
  };

  const initialDate = parseDateStr(selectedDate);
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth()); // 0-indexed
  const [, setRosterVersion] = useState<number>(0);

  React.useEffect(() => {
    const handleUpdate = () => {
      setRosterVersion((v) => v + 1);
    };
    window.addEventListener('goni_market_roster_updated', handleUpdate);
    return () => window.removeEventListener('goni_market_roster_updated', handleUpdate);
  }, []);

  const todayStr = getTodayDateString();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleJumpToSelected = () => {
    const sDate = parseDateStr(selectedDate);
    setViewYear(sDate.getFullYear());
    setViewMonth(sDate.getMonth());
  };

  // Calendar calculations
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Format Helper YYYY-MM-DD
  const formatDayString = (day: number) => {
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    return `${viewYear}-${mStr}-${dStr}`;
  };

  // Helper for displaying guard name preview cleanly
  const formatGuardPreview = (g1: string, g2: string) => {
    if (!g1 && !g2) return 'খালি';
    if (!g2) return g1;
    if (!g1) return g2;
    // Shorten long names if necessary
    const short1 = g1.split(' ')[0];
    const short2 = g2.split(' ')[0];
    return `${short1} + ${short2}`;
  };

  return (
    <div
      className={`bg-slate-950/90 border border-amber-500/30 rounded-xl p-3 text-slate-100 shadow-lg ${className}`}
    >
      {/* Calendar Header with Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>
                {BENGALI_MONTHS[viewMonth]} {toBengaliNumerals(viewYear)}
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                ({viewYear})
              </span>
            </h3>
            <p className="text-[10px] text-amber-300/80">
              তারিখে ক্লিক করলে রোস্টার পাহারাদারের নাম স্বয়ংক্রিয়ভাবে বসবে
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleJumpToSelected}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 px-2 py-1 rounded transition cursor-pointer"
            title="নির্বাচিত তারিখে যান"
          >
            চলতি মাস
          </button>
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="পূর্ববর্তী মাস"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="পরবর্তী মাস"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 my-2 text-center">
        {BENGALI_WEEKDAYS.map((day, idx) => (
          <div
            key={day}
            className={`text-[11px] font-bold py-1 rounded ${
              idx === 5 ? 'text-red-400 bg-red-950/20' : 'text-slate-400 bg-slate-900/40'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Blank cells before day 1 */}
        {Array.from({ length: startDayOfWeek }).map((_, idx) => (
          <div
            key={`blank-${idx}`}
            className="h-14 sm:h-16 rounded bg-slate-900/20 border border-transparent opacity-30"
          />
        ))}

        {/* Days of current month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const dateStr = formatDayString(dayNum);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;

          // Fetch duty roster pair for this date
          const scheduled = getScheduledPairForDate(dateStr);
          const g1 = scheduled.pair.guard1Name;
          const g2 = scheduled.pair.guard2Name;
          const pairPreview = formatGuardPreview(g1, g2);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              className={`h-14 sm:h-16 p-1 rounded-lg text-left transition flex flex-col justify-between border cursor-pointer group relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400/50 shadow-md z-10'
                  : isToday
                  ? 'bg-slate-800 text-white border-emerald-500 hover:bg-slate-700'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-600'
              }`}
            >
              {/* Day Header (Number + Round Badge) */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] sm:text-xs font-bold leading-none ${
                    isSelected
                      ? 'text-slate-950 font-black'
                      : isToday
                      ? 'text-emerald-400 font-extrabold'
                      : 'text-slate-200'
                  }`}
                >
                  {toBengaliNumerals(dayNum)}
                </span>
                <span
                  className={`text-[8px] px-1 py-0.2 rounded font-mono font-semibold ${
                    isSelected
                      ? 'bg-slate-950 text-amber-300'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  রা-{toBengaliNumerals(scheduled.roundNumber)}
                </span>
              </div>

              {/* Guard names preview */}
              <div
                className={`text-[9.5px] sm:text-[10px] leading-tight font-medium truncate w-full ${
                  isSelected ? 'text-slate-950 font-bold' : 'text-slate-300 group-hover:text-amber-300'
                }`}
                title={`১ম: ${g1 || '-'} (${scheduled.pair.guard1BusinessType}), ২য়: ${g2 || '-'} (${scheduled.pair.guard2BusinessType}${scheduled.pair.guard2ShopNo ? ` - দোকান ${scheduled.pair.guard2ShopNo}` : ''})`}
              >
                {pairPreview}
              </div>

              {/* Serial # indicator */}
              <div
                className={`text-[7.5px] font-mono leading-none flex items-center justify-between w-full ${
                  isSelected ? 'text-slate-900 font-bold' : 'text-slate-500'
                }`}
              >
                <span>#{toBengaliNumerals(scheduled.serialNo)}</span>
                {isSelected && <CheckCircle2 className="w-2.5 h-2.5 text-slate-950" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Date Roster Summary Footer */}
      {selectedDate && (
        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              নির্বাচিত তারিখ (<strong className="text-amber-400">{toBengaliNumerals(selectedDate)}</strong>):
            </span>
          </div>
          {(() => {
            const currentSched = getScheduledPairForDate(selectedDate);
            return (
              <div className="text-right">
                <span className="font-bold text-amber-300">
                  {currentSched.pair.guard1Name || 'খালি'} + {currentSched.pair.guard2Name || 'খালি'}
                  {currentSched.pair.guard2ShopNo && (
                    <span className="text-[10px] text-amber-400 font-normal ml-1">
                      (দোকান {toBengaliNumerals(currentSched.pair.guard2ShopNo)})
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  রাউন্ড-{toBengaliNumerals(currentSched.roundNumber)} • ক্রমিক #{toBengaliNumerals(currentSched.serialNo)}
                </span>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
