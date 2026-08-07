import React from 'react';
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
} from 'lucide-react';
import { GuardDutySlipInput } from '../types';
import { getTomorrowDateString, getTodayDateString, formatBengaliFullDate, toBengaliNumerals } from '../utils/bengaliUtils';
import { OFFICIAL_ROSTER_PAIRS, getScheduledPairForDate } from '../data/rosterData';

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

  // Auto calculate when date changes
  const handleDateChange = (newDate: string) => {
    const scheduled = getScheduledPairForDate(newDate);
    onChange({
      dutyDate: newDate,
      roundNumber: scheduled.roundNumber,
      serialIndex: scheduled.serialNo,
      guard1Name: scheduled.pair.guard1Name,
      guard1BusinessType: scheduled.pair.guard1BusinessType,
      guard2Name: scheduled.pair.guard2Name,
      guard2BusinessType: scheduled.pair.guard2BusinessType,
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
      guard2Name: pair.guard2Name,
      guard2BusinessType: pair.guard2BusinessType,
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
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>ডিউটি স্লিপ ফরম</span>
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
      <div className="bg-slate-900/60 border border-slate-700/70 p-3 rounded-xl space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>ডিউটির তারিখ ও রাউন্ড নির্বাচন (Date & Round):</span>
          </label>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => handleDateChange(tomorrowDate)}
              className={`text-[10px] px-2 py-0.5 rounded transition cursor-pointer font-medium ${
                formData.dutyDate === tomorrowDate
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              আগামীকাল (Tomorrow)
            </button>
            <button
              type="button"
              onClick={() => handleDateChange(todayDate)}
              className={`text-[10px] px-2 py-0.5 rounded transition cursor-pointer font-medium ${
                formData.dutyDate === todayDate
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              আজকে (Today)
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
        <p className="text-[11px] text-slate-300">
          তারিখ: <strong className="text-amber-300">{formatBengaliFullDate(formData.dutyDate)}</strong>
        </p>
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

