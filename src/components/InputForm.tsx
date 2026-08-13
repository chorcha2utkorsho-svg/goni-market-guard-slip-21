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
  MessageSquare,
  Copy,
  Send,
} from 'lucide-react';
import { GuardDutySlipInput } from '../types';
import { getTomorrowDateString, getTodayDateString, getOffsetDateString, formatBengaliFullDate, toBengaliNumerals } from '../utils/bengaliUtils';
import { OFFICIAL_ROSTER_PAIRS, getActiveRosterPairs, getScheduledPairForDate, getDateForPairAndRound } from '../data/rosterData';
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
  const [copiedSms, setCopiedSms] = useState(false);
  const [selectedRound, setSelectedRound] = useState<number>(formData.roundNumber || 3);
  const [rosterVersion, setRosterVersion] = useState<number>(0);

  // Sync selectedRound if formData.roundNumber changes
  React.useEffect(() => {
    if (formData.roundNumber && formData.roundNumber !== selectedRound) {
      setSelectedRound(formData.roundNumber);
    }
  }, [formData.roundNumber]);

  // Listen for global roster updates (e.g. from CSV Importer)
  React.useEffect(() => {
    const handleRosterUpdate = () => {
      setRosterVersion((v) => v + 1);
    };
    window.addEventListener('goni_market_roster_updated', handleRosterUpdate);
    return () => window.removeEventListener('goni_market_roster_updated', handleRosterUpdate);
  }, []);

  // Generate 18 2-day pair batches for the selected round
  const roundTwoDayBatches = React.useMemo(() => {
    const activePairs = getActiveRosterPairs();
    const batches = [];
    for (let s = 1; s <= 35; s += 2) {
      const s1 = s;
      const s2 = s + 1 <= 35 ? s + 1 : null;
      const date1 = getDateForPairAndRound(s1, selectedRound);
      const date2 = s2 ? getDateForPairAndRound(s2, selectedRound) : '';
      const pair1 = activePairs[s1 - 1] || OFFICIAL_ROSTER_PAIRS[s1 - 1];
      const pair2 = s2 ? (activePairs[s2 - 1] || OFFICIAL_ROSTER_PAIRS[s2 - 1]) : null;
      batches.push({
        batchIndex: Math.ceil(s / 2),
        s1,
        s2,
        date1,
        date2,
        pair1,
        pair2,
      });
    }
    return batches;
  }, [selectedRound, rosterVersion]);

  // Helper to construct 14th date string of current month
  const get14thDateString = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}-14`;
  };

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
        {/* Round & 2-Day Pair Direct Selector */}
        <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-950 border border-amber-500/50 rounded-xl p-3 space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>একপাতায় ৪টি স্লিপের জন্য ২-দিনের জোড়া সিলেক্টর:</span>
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
              ১টি A4 পাতায় ২ দিনের ৪টি স্লিপ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Step 1: Select Round */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                ১. রাউন্ড নম্বর সিলেক্ট করুন:
              </label>
              <select
                value={selectedRound}
                onChange={(e) => {
                  const r = Number(e.target.value);
                  setSelectedRound(r);
                  const firstDate = getDateForPairAndRound(1, r);
                  handleDateChange(firstDate);
                }}
                className="w-full bg-slate-950 border border-amber-500/40 text-amber-300 text-xs rounded-lg px-2.5 py-2 font-bold outline-none cursor-pointer"
              >
                <option value={3}>রাউন্ড-৩ (১৪ই আগস্ট - ১৭ই সেপ্টেম্বর)</option>
                <option value={4}>রাউন্ড-৪ (১৮ই সেপ্টেম্বর - ২২ই অক্টোবর)</option>
                <option value={5}>রাউন্ড-৫ (২৩ই অক্টোবর - ২৬ই নভেম্বর)</option>
                <option value={6}>রাউন্ড-৬ (২৭ই নভেম্বর - ৩১ই ডিসেম্বর)</option>
              </select>
            </div>

            {/* Step 2: Select 2-Day Pair / Set */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                ২. দুদিনের জোড়া সেট সিলেক্ট করুন (১ম ও ২য় দিন একসাথে):
              </label>
              <select
                value={formData.dutyDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/30 focus:border-amber-400 text-white text-xs rounded-lg px-2.5 py-2 font-medium outline-none cursor-pointer"
              >
                {roundTwoDayBatches.map((b) => (
                  <option key={b.date1} value={b.date1}>
                    {`জোড়া #${b.batchIndex}: ${formatBengaliFullDate(b.date1)} ${b.date2 ? '& ' + formatBengaliFullDate(b.date2) : ''} ➔ [${b.pair1.guard1Name} & ${b.pair1.guard2Name}] ${b.pair2 ? '+ [' + b.pair2.guard1Name + ' & ' + b.pair2.guard2Name + ']' : ''}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2">
          <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>অথবা সরাসরি নির্দিষ্ট তারিখ নির্বাচন করুন:</span>
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
              onClick={() => handleDateChange(getOffsetDateString(formData.dutyDate, -2))}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="আগের ২ দিন"
            >
              ◄ -২ দিন
            </button>
            <button
              type="button"
              onClick={() => handleDateChange(get14thDateString())}
              className={`text-[10px] px-2 py-1 rounded transition cursor-pointer font-bold border ${
                formData.dutyDate === get14thDateString()
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white border-amber-300 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-red-950/80 text-red-200 border-red-700 hover:bg-red-900'
              }`}
              title="১৪ ও ১৫ই আগস্ট ৩য় রাউন্ড শুরু (একচান্সে ২ দিনের ৪টি স্লিপ)"
            >
              ★ ১৪ ও ১৫ই আগস্ট (রাউন্ড-৩ শুরু)
            </button>
            <button
              type="button"
              onClick={() => handleDateChange(getOffsetDateString(formData.dutyDate, 2))}
              className="text-[10px] px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border border-amber-300 shadow-xs transition cursor-pointer flex items-center gap-1"
              title="পরবর্তী ২ দিন (+২ দিন)"
            >
              <span>+২ দিন ►</span>
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

        {/* Auto-Suggestion 2-Day Batch Roster Continuity Card */}
        {(() => {
          const autoScheduledDay1 = getScheduledPairForDate(formData.dutyDate);
          
          // Day 2 calculation (+1 day)
          const d1Obj = new Date(`${formData.dutyDate}T00:00:00`);
          d1Obj.setDate(d1Obj.getDate() + 1);
          const y2 = d1Obj.getFullYear();
          const m2 = String(d1Obj.getMonth() + 1).padStart(2, '0');
          const d2 = String(d1Obj.getDate()).padStart(2, '0');
          const day2DateStr = `${y2}-${m2}-${d2}`;
          const autoScheduledDay2 = getScheduledPairForDate(day2DateStr);

          return (
            <div className="bg-slate-950/90 border border-amber-500/40 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] border-b border-amber-500/20 pb-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    একচান্সে ২ দিনের ৪টি স্লিপ (A4 জিরো পেপার ওয়েস্টেজ):
                  </span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  ১টি A4 পেপারে ২টি দিন প্রিন্ট হবে
                </span>
              </div>

              {/* Day 1 & Day 2 Roster Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-0.5">
                {/* Day 1 Box */}
                <div className="bg-slate-900 border border-amber-500/30 p-2 rounded-lg space-y-0.5">
                  <div className="text-amber-400 font-bold flex items-center justify-between">
                    <span>🗓️ ১ম দিন ({formatBengaliFullDate(formData.dutyDate)})</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 rounded">রাউন্ড-{toBengaliNumerals(autoScheduledDay1.roundNumber)}</span>
                  </div>
                  <div className="text-slate-200">
                    ১ম: <strong className="text-amber-300">{autoScheduledDay1.pair.guard1Name}</strong> ({autoScheduledDay1.pair.guard1BusinessType || '-'})
                  </div>
                  <div className="text-slate-200">
                    ২য়: <strong className="text-amber-300">{autoScheduledDay1.pair.guard2Name}</strong> ({autoScheduledDay1.pair.guard2BusinessType || '-'} {autoScheduledDay1.pair.guard2ShopNo ? `• দোকান #${autoScheduledDay1.pair.guard2ShopNo}` : ''})
                  </div>
                </div>

                {/* Day 2 Box */}
                <div className="bg-slate-900 border border-sky-500/30 p-2 rounded-lg space-y-0.5">
                  <div className="text-sky-400 font-bold flex items-center justify-between">
                    <span>🗓️ ২য় দিন ({formatBengaliFullDate(day2DateStr)})</span>
                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1 rounded">রাউন্ড-{toBengaliNumerals(autoScheduledDay2.roundNumber)}</span>
                  </div>
                  <div className="text-slate-200">
                    ১ম: <strong className="text-sky-300">{autoScheduledDay2.pair.guard1Name}</strong> ({autoScheduledDay2.pair.guard1BusinessType || '-'})
                  </div>
                  <div className="text-slate-200">
                    ২য়: <strong className="text-sky-300">{autoScheduledDay2.pair.guard2Name}</strong> ({autoScheduledDay2.pair.guard2BusinessType || '-'} {autoScheduledDay2.pair.guard2ShopNo ? `• দোকান #${autoScheduledDay2.pair.guard2ShopNo}` : ''})
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 bg-slate-900/60 p-1.5 rounded border border-slate-800 flex items-center gap-1">
                <span>💡 ১টি A4 পেপারে ২ দিনের মোট ৪টি স্লিপ একসঙ্গে সুন্দরভাবে প্রিন্ট হয়ে দুইভাগে ভাগ হবে।</span>
              </div>
            </div>
          );
        })()}

        <p className="text-[11px] text-slate-300">
          বর্তমান ডিউটি শুরুর তারিখ: <strong className="text-amber-300">{formatBengaliFullDate(formData.dutyDate)}</strong>
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

      {/* Guard Duty Notification SMS / Message Generator Card (Morning before duty) */}
      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>পাহারাদারের এসএমএস ও নোটিশ বার্তা (Duty SMS Alert)</span>
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
            আগের দিন সকালে পাঠানোর জন্য
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <strong className="text-amber-300">{formatBengaliFullDate(formData.dutyDate)}</strong>-এর নৈশকালীন পাহারার জন্য দায়িত্বপ্রাপ্ত সদস্যকে আগের দিন সকালে নোটিশ পাঠানোর জন্য মেসেজটি কপি করুন:
        </p>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[11px] font-mono text-emerald-200 leading-relaxed select-all">
          {`সম্মানিত সদস্য, গণি মার্কেট নৈশকালীন নিরাপত্তা পাহারায় আপনার ডিউটি নির্ধারিত হয়েছে।\n• ডিউটির তারিখ: ${formatBengaliFullDate(formData.dutyDate)} (রাউন্ড-${toBengaliNumerals(formData.roundNumber)})\n• ১মে পাহারাদার: ${formData.guard1Name || 'অনির্ধারিত'} (${formData.guard1ShopNo ? 'দোকান #' + formData.guard1ShopNo : ''})\n• ২য় পাহারাদার: ${formData.guard2Name || 'অনির্ধারিত'} (${formData.guard2ShopNo ? 'দোকান #' + formData.guard2ShopNo : ''})\nঅনুগ্রহ করে সময়মতো পাহারার প্রস্তুতি গ্রহণ করুন।\n- গণি মার্কেট ব্যবসায়ী সমিতি`}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              const text = `সম্মানিত সদস্য, গণি মার্কেট নৈশকালীন নিরাপত্তা পাহারায় আপনার ডিউটি নির্ধারিত হয়েছে।\n• ডিউটির তারিখ: ${formatBengaliFullDate(formData.dutyDate)} (রাউন্ড-${toBengaliNumerals(formData.roundNumber)})\n• ১মে পাহারাদার: ${formData.guard1Name || 'অনির্ধারিত'} (${formData.guard1ShopNo ? 'দোকান #' + formData.guard1ShopNo : ''})\n• ২য় পাহারাদার: ${formData.guard2Name || 'অনির্ধারিত'} (${formData.guard2ShopNo ? 'দোকান #' + formData.guard2ShopNo : ''})\nঅনুগ্রহ করে সময়মতো পাহারার প্রস্তুতি গ্রহণ করুন।\n- গণি মার্কেট ব্যবসায়ী সমিতি`;
              navigator.clipboard.writeText(text);
              setCopiedSms(true);
              setTimeout(() => setCopiedSms(false), 2000);
            }}
            className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span>{copiedSms ? 'কপি হয়েছে! ✓' : '📋 মেসেজ কপি করুন'}</span>
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `সম্মানিত সদস্য, গণি মার্কেট নৈশকালীন নিরাপত্তা পাহারায় আপনার ডিউটি নির্ধারিত হয়েছে।\n• ডিউটির তারিখ: ${formatBengaliFullDate(formData.dutyDate)} (রাউন্ড-${toBengaliNumerals(formData.roundNumber)})\n• ১মে পাহারাদার: ${formData.guard1Name || 'অনির্ধারিত'} (${formData.guard1ShopNo ? 'দোকান #' + formData.guard1ShopNo : ''})\n• ২য় পাহারাদার: ${formData.guard2Name || 'অনির্ধারিত'} (${formData.guard2ShopNo ? 'দোকান #' + formData.guard2ShopNo : ''})\nঅনুগ্রহ করে সময়মতো পাহারার প্রস্তুতি গ্রহণ করুন।\n- গণি মার্কেট ব্যবসায়ী সমিতি`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>💬 WhatsApp-এ পাঠান</span>
          </a>
        </div>
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
              placeholder="যেমন: 01333601029"
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

