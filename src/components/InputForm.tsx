import React, { useState } from 'react';
import {
  User,
  Calendar,
  Phone,
  QrCode,
  Palette,
  Hash,
  Sparkles,
  RotateCcw,
  FileText,
  Users,
  Store,
  Compass,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { GuardDutySlipInput } from '../types';
import { getTomorrowDateString, getTodayDateString, getOffsetDateString, formatBengaliFullDate, toBengaliNumerals } from '../utils/bengaliUtils';
import { OFFICIAL_ROSTER_PAIRS, getScheduledPairForDate } from '../data/rosterData';
import { RosterCalendar } from './RosterCalendar';

interface InputFormProps {
  formData: GuardDutySlipInput;
  onChange: (updated: Partial<GuardDutySlipInput>) => void;
  onReset: () => void;
  onSaveToHistory: () => void;
  isSavedSuccess?: boolean;
  isSupabaseActive?: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  formData,
  onChange,
  onReset,
  onSaveToHistory,
  isSavedSuccess,
  isSupabaseActive,
}) => {
  const tomorrowDate = getTomorrowDateString();
  const todayDate = getTodayDateString();
  const [showCalendar, setShowCalendar] = useState(true);

  // Auto calculate when date changes
  const handleDateChange = (newDate: string) => {
    const scheduled = getScheduledPairForDate(newDate);
    onChange({
      dutyDate: newDate,
      roundNumber: scheduled.roundNumber,
      serialIndex: scheduled.serialNo,
      guard1Name: scheduled.pair.guard1Name,
      guard1BusinessType: scheduled.pair.guard1BusinessType,
      guard1ShopNo: scheduled.pair.guard1ShopNo || '',
      guard2Name: scheduled.pair.guard2Name,
      guard2BusinessType: scheduled.pair.guard2BusinessType,
      guard2ShopNo: scheduled.pair.guard2ShopNo || '',
    });
  };

  // Select pair from official 35 list
  const handleSelectRosterPair = (serialNo: number) => {
    const pair = OFFICIAL_ROSTER_PAIRS.find((p) => p.serialNo === serialNo);
    if (!pair) return;

    onChange({
      serialIndex: pair.serialNo,
      guard1Name: pair.guard1Name,
      guard1BusinessType: pair.guard1BusinessType,
      guard1ShopNo: pair.guard1ShopNo || '',
      guard2Name: pair.guard2Name,
      guard2BusinessType: pair.guard2BusinessType,
      guard2ShopNo: pair.guard2ShopNo || '',
    });
  };

  return (
    <div className="bg-slate-800/95 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm space-y-5 text-slate-100 font-['Hind_Siliguri',sans-serif]">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 flex-wrap">
              <span>ডিউটি স্লিপ ফরম</span>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1" title="প্রতিটি ফিল্ড পরিবর্তনের সাথে সাথে তথ্য সেভ হচ্ছে">
                <Save className="w-2.5 h-2.5 text-amber-400" />
                <span>অটো-সেভ চালু</span>
              </span>
              {isSupabaseActive && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-sans">
                  • Supabase Synced
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">একরাতে দুজন পাহারাদারের বিস্তারিত তথ্য প্রদান করুন</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-600/50 cursor-pointer"
          title="রিসেট করুন"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>রিসেট</span>
        </button>
      </div>

      {/* Duty Date Picker with Auto-Schedule */}
      <div className="bg-slate-900/60 border border-slate-700/70 p-3 rounded-xl space-y-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>ডিউটির তারিখ ও রাউন্ড নির্বাচন (Date & Round):</span>
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="text-[10px] px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <span>{showCalendar ? 'ক্যালেন্ডার লুকান' : '📅 মাসভিত্তিক ক্যালেন্ডার'}</span>
              {showCalendar ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => handleDateChange(getOffsetDateString(formData.dutyDate, -1))}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="পূর্ববর্তী দিনের পাহারাদার"
            >
              ◄ -১ দিন
            </button>
            <button
              type="button"
              onClick={() => handleDateChange(todayDate)}
              className={`text-[10px] px-2 py-1 rounded transition cursor-pointer font-medium ${
                formData.dutyDate === todayDate
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              আজকে
            </button>
            <button
              type="button"
              onClick={() => handleDateChange(tomorrowDate)}
              className={`text-[10px] px-2 py-1 rounded transition cursor-pointer font-medium ${
                formData.dutyDate === tomorrowDate
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              আগামীকাল
            </button>
            <button
              type="button"
              onClick={() => handleDateChange(getOffsetDateString(formData.dutyDate, 1))}
              className="text-[10px] px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border border-amber-300 shadow-xs transition cursor-pointer flex items-center gap-1"
              title="পরবর্তী দিনের পাহারাদার অটো-পরামর্শ"
            >
              <span>+১ দিন (পরবর্তী)</span>
              <Sparkles className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <input
              type="date"
              value={formData.dutyDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-600 focus:border-amber-400 text-white text-sm rounded-lg px-3 py-2 outline-none"
              required
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-300">
            <Compass className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              স্বয়ংক্রিয় রাউন্ড:{' '}
              <strong className="text-white bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                রাউন্ড-{toBengaliNumerals(formData.roundNumber)}
              </strong>
            </span>
          </div>
        </div>

        {/* Auto-Suggestion Roster Continuity Card */}
        {(() => {
          const autoScheduled = getScheduledPairForDate(formData.dutyDate);
          const isMatchingAuto =
            formData.guard1Name === autoScheduled.pair.guard1Name &&
            formData.guard2Name === autoScheduled.pair.guard2Name &&
            formData.roundNumber === autoScheduled.roundNumber;

          return (
            <div className="bg-slate-950/80 border border-amber-500/30 rounded-lg p-2.5 space-y-1 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    স্বয়ংক্রিয় রোস্টার পরামর্শ (ধারাবাহিকতা বজায় রাখা হয়েছে):
                  </span>
                </div>
                {!isMatchingAuto && (
                  <button
                    type="button"
                    onClick={() => handleDateChange(formData.dutyDate)}
                    className="text-[10px] text-amber-400 hover:underline bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 cursor-pointer"
                  >
                    পুনরায় অটো-পরামর্শ ব্যবহার করুন
                  </button>
                )}
              </div>
              <div className="text-slate-200 text-[11px] leading-relaxed">
                রাউন্ড-<strong>{toBengaliNumerals(autoScheduled.roundNumber)}</strong> • ক্রমিক #<strong>{toBengaliNumerals(autoScheduled.serialNo)}</strong>: <span className="text-amber-300 font-bold">{autoScheduled.pair.guard1Name || 'খালি'} ({autoScheduled.pair.guard1BusinessType || '-'})</span> এবং <span className="text-amber-300 font-bold">{autoScheduled.pair.guard2Name || 'খালি'} ({autoScheduled.pair.guard2BusinessType || '-'})</span>
              </div>
              <div className="text-[10px] text-slate-400">
                তারিখ পরিবর্তন করলে এই রোস্টার জোড়টি ফর্মের ঘরে স্বয়ংক্রিয়ভাবে সাজেস্ট ও লোড হয়।
              </div>
            </div>
          );
        })()}

        <p className="text-[11px] text-slate-300">
          তারিখ: <strong className="text-amber-300">{formatBengaliFullDate(formData.dutyDate)}</strong>
        </p>

        {/* Interactive Roster Calendar Visualization */}
        {showCalendar && (
          <div className="pt-1 animate-fade-in">
            <RosterCalendar
              selectedDate={formData.dutyDate}
              onSelectDate={handleDateChange}
            />
          </div>
        )}
      </div>

      {/* Official 35-Pair Quick Roster Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span>৩৫টি নির্ধারিত জোড়া থেকে নির্বাচন (Roster Pair 1-35):</span>
          </span>
          <span className="text-[10px] text-amber-400">ক্লিক করলে স্বয়ংক্রিয় নাম বসবে</span>
        </label>

        <div className="flex gap-1.5 overflow-x-auto pb-2 pt-1 custom-scrollbar">
          {OFFICIAL_ROSTER_PAIRS.map((pair) => {
            const isSelected = formData.guard1Name === pair.guard1Name && formData.guard2Name === pair.guard2Name;
            return (
              <button
                key={pair.serialNo}
                type="button"
                onClick={() => handleSelectRosterPair(pair.serialNo)}
                className={`shrink-0 text-left p-1.5 rounded-lg text-xs transition border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <div className="text-[10px] opacity-80">জোড়া #{toBengaliNumerals(pair.serialNo)}</div>
                <div className="text-[11px] font-bold">
                  {pair.guard1Name} + {pair.guard2Name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guard 1 & Guard 2 Detailed Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Guard 1 */}
        <div className="bg-slate-900/70 border border-amber-500/30 rounded-xl p-3.5 space-y-3">
          <div className="flex items-center gap-1.5 border-b border-amber-500/20 pb-2 text-amber-400 font-bold text-xs">
            <User className="w-4 h-4" />
            <span>১ম পাহারাদারের বিবরণ (Guard 1)</span>
          </div>

          <div>
            <label className="block text-[11px] text-slate-300 mb-1">নাম (Name) *</label>
            <input
              type="text"
              value={formData.guard1Name}
              onChange={(e) => onChange({ guard1Name: e.target.value })}
              placeholder="যেমন: খোরশেদ"
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs rounded-lg px-2.5 py-2 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">ব্যবসায়িক ধরন</label>
              <input
                type="text"
                value={formData.guard1BusinessType}
                onChange={(e) => onChange({ guard1BusinessType: e.target.value })}
                placeholder="যেমন: ওয়ার্কশপ"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs rounded-lg px-2.5 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">দোকান নং (Shop No)</label>
              <input
                type="text"
                value={formData.guard1ShopNo}
                onChange={(e) => onChange({ guard1ShopNo: e.target.value })}
                placeholder="যেমন: ১০২"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs rounded-lg px-2.5 py-2 outline-none"
              />
            </div>
          </div>

          {/* Guard 1 Attendance & Fee Status */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <label className="block text-[11px] font-bold text-amber-300">
              ১ম জনের উপস্থিতি ও পেমেন্ট স্ট্যাটাস:
            </label>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => onChange({ guard1Status: 'PRESENT' })}
                className={`p-1.5 rounded-lg text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                  (formData.guard1Status || 'PRESENT') === 'PRESENT'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>🟢 উপস্থিত</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ guard1Status: 'PAID_SUBSTITUTE' })}
                className={`p-1.5 rounded-lg text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                  formData.guard1Status === 'PAID_SUBSTITUTE'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 ring-1 ring-amber-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>🟡 টাকা পরিশোধিত</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ guard1Status: 'ABSENT_UNPAID' })}
                className={`p-1.5 rounded-lg text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                  formData.guard1Status === 'ABSENT_UNPAID'
                    ? 'bg-red-500/20 text-red-300 border-red-500 ring-1 ring-red-500/50 animate-pulse'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>🔴 বকেয়া (আসেনওনি)</span>
              </button>
            </div>

            {(formData.guard1Status === 'PAID_SUBSTITUTE' || formData.guard1Status === 'ABSENT_UNPAID') && (
              <input
                type="text"
                value={formData.guard1StatusNote || ''}
                onChange={(e) => onChange({ guard1StatusNote: e.target.value })}
                placeholder={
                  formData.guard1Status === 'PAID_SUBSTITUTE'
                    ? 'যেমন: ৩০০ টাকা পরিশোধ করেছেন / বদলি লোক রাখা হয়েছে'
                    : 'যেমন: একাধিকবার নোটিশ পাঠানো হলেও অনুপস্থিত'
                }
                className="w-full bg-slate-950 border border-slate-700 text-amber-300 text-[11px] rounded-lg px-2.5 py-1.5 outline-none mt-1"
              />
            )}
          </div>
        </div>

        {/* Guard 2 */}
        <div className="bg-slate-900/70 border border-blue-500/30 rounded-xl p-3.5 space-y-3">
          <div className="flex items-center gap-1.5 border-b border-blue-500/20 pb-2 text-blue-400 font-bold text-xs">
            <User className="w-4 h-4" />
            <span>২য় পাহারাদারের বিবরণ (Guard 2)</span>
          </div>

          <div>
            <label className="block text-[11px] text-slate-300 mb-1">নাম (Name) *</label>
            <input
              type="text"
              value={formData.guard2Name}
              onChange={(e) => onChange({ guard2Name: e.target.value })}
              placeholder="যেমন: কাজল"
              className="w-full bg-slate-950 border border-slate-700 focus:border-blue-400 text-white text-xs rounded-lg px-2.5 py-2 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">ব্যবসায়িক ধরন</label>
              <input
                type="text"
                value={formData.guard2BusinessType}
                onChange={(e) => onChange({ guard2BusinessType: e.target.value })}
                placeholder="যেমন: রেস্টুরেন্ট"
                className="w-full bg-slate-950 border border-slate-700 focus:border-blue-400 text-white text-xs rounded-lg px-2.5 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">দোকান নং (Shop No)</label>
              <input
                type="text"
                value={formData.guard2ShopNo}
                onChange={(e) => onChange({ guard2ShopNo: e.target.value })}
                placeholder="যেমন: ১০৫"
                className="w-full bg-slate-950 border border-slate-700 focus:border-blue-400 text-white text-xs rounded-lg px-2.5 py-2 outline-none"
              />
            </div>
          </div>

          {/* Guard 2 Attendance & Fee Status */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <label className="block text-[11px] font-bold text-blue-300">
              ২য় জনের উপস্থিতি ও পেমেন্ট স্ট্যাটাস:
            </label>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => onChange({ guard2Status: 'PRESENT' })}
                className={`p-1.5 rounded-lg text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                  (formData.guard2Status || 'PRESENT') === 'PRESENT'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>🟢 উপস্থিত</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ guard2Status: 'PAID_SUBSTITUTE' })}
                className={`p-1.5 rounded-lg text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                  formData.guard2Status === 'PAID_SUBSTITUTE'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 ring-1 ring-amber-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>🟡 টাকা পরিশোধিত</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ guard2Status: 'ABSENT_UNPAID' })}
                className={`p-1.5 rounded-lg text-[10px] font-bold border flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                  formData.guard2Status === 'ABSENT_UNPAID'
                    ? 'bg-red-500/20 text-red-300 border-red-500 ring-1 ring-red-500/50 animate-pulse'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>🔴 বকেয়া (আসেনওনি)</span>
              </button>
            </div>

            {(formData.guard2Status === 'PAID_SUBSTITUTE' || formData.guard2Status === 'ABSENT_UNPAID') && (
              <input
                type="text"
                value={formData.guard2StatusNote || ''}
                onChange={(e) => onChange({ guard2StatusNote: e.target.value })}
                placeholder={
                  formData.guard2Status === 'PAID_SUBSTITUTE'
                    ? 'যেমন: ৩০০ টাকা পরিশোধ করেছেন / বদলি লোক রাখা হয়েছে'
                    : 'যেমন: একাধিকবার নোটিশ পাঠানো হলেও অনুপস্থিত'
                }
                className="w-full bg-slate-950 border border-slate-700 text-blue-300 text-[11px] rounded-lg px-2.5 py-1.5 outline-none mt-1"
              />
            )}
          </div>
        </div>
      </div>

      {/* Contact & Meta Settings */}
      <div className="space-y-3 pt-2 border-t border-slate-700/60">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1">
            যোগাযোগের মোবাইল নম্বর (Contact Mobile) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => onChange({ mobileNumber: e.target.value })}
              placeholder="যেমন: 01947399752"
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs font-mono rounded-xl pl-9 pr-3 py-2.5 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1">
            রিপোর্টিং ফরম কিউআর কোড লিংক (QR Code Reporting URL)
          </label>
          <div className="relative">
            <QrCode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={formData.qrCodeUrl}
              onChange={(e) => onChange({ qrCodeUrl: e.target.value })}
              placeholder="https://gonimarket.org/report"
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-slate-200 text-xs font-mono rounded-xl pl-9 pr-3 py-2 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1">
            বিশেষ নির্দেশনা (Optional Custom Instruction)
          </label>
          <input
            type="text"
            value={formData.customInstruction || ''}
            onChange={(e) => onChange({ customInstruction: e.target.value })}
            placeholder="যেমন: ২ নং গলি বিশেষ সজাগ দৃষ্টি রাখুন"
            className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs rounded-xl px-3 py-2 outline-none"
          />
        </div>

        {/* Theme Selectors */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>স্লিপ থিম (Theme):</span>
            </label>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ theme: 'classic' })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition ${
                  formData.theme === 'classic'
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                    : 'bg-slate-700 text-slate-300 border-slate-600'
                }`}
              >
                লাল ক্লাসিক
              </button>
              <button
                type="button"
                onClick={() => onChange({ theme: 'navy' })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition ${
                  formData.theme === 'navy'
                    ? 'bg-slate-200 text-slate-950 font-bold border-slate-300'
                    : 'bg-slate-700 text-slate-300 border-slate-600'
                }`}
              >
                নেভি
              </button>
              <button
                type="button"
                onClick={() => onChange({ theme: 'emerald' })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition ${
                  formData.theme === 'emerald'
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-700 text-slate-300 border-slate-600'
                }`}
              >
                সবুজ
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-amber-400" />
              <span>সংখ্যা ফরম্যাট:</span>
            </label>
            <button
              type="button"
              onClick={() => onChange({ useBengaliNumerals: !formData.useBengaliNumerals })}
              className={`w-full py-1.5 px-2 rounded-lg text-xs font-medium border cursor-pointer transition flex items-center justify-center gap-1.5 ${
                formData.useBengaliNumerals
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-700 text-slate-300 border-slate-600'
              }`}
            >
              <span>{formData.useBengaliNumerals ? 'বাংলা সংখ্যা (০-৯)' : 'ইংরেজি সংখ্যা (0-9)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSaveToHistory}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isSavedSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isSavedSuccess ? 'সফলভাবে সংরক্ষিত হয়েছে!' : 'স্লিপ হিস্ট্রিতে ডাটাবেজে সংরক্ষণ করুন'}</span>
        </button>
      </div>
    </div>
  );
};

