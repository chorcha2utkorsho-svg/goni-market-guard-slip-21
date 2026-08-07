import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  X,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  MessageSquare,
  Send,
  User,
  Calendar,
  Filter,
  ShieldAlert,
  Search,
  Sparkles,
  Phone,
  Store,
  BarChart3,
  Copy,
  Check,
  Printer,
  Award,
  TrendingUp,
  FileSpreadsheet,
  ListFilter,
  ShieldCheck,
} from 'lucide-react';
import { SavedSlipRecord, DutyComment, GuardStatus } from '../types';
import { formatBengaliFullDate, toBengaliNumerals, formatBengaliShortDate } from '../utils/bengaliUtils';

interface PublicAuditBoardProps {
  isOpen: boolean;
  onClose: () => void;
  records: SavedSlipRecord[];
  onAddComment: (recordId: string, comment: DutyComment) => void;
  onUpdateGuardStatus?: (
    recordId: string,
    guardIndex: 1 | 2,
    status: GuardStatus,
    note?: string
  ) => void;
}

export const PublicAuditBoard: React.FC<PublicAuditBoardProps> = ({
  isOpen,
  onClose,
  records,
  onAddComment,
  onUpdateGuardStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'AUDIT_LOGS' | 'WEEKLY_REPORT'>('AUDIT_LOGS');
  const [timeframeDays, setTimeframeDays] = useState<number>(7);
  const [filter, setFilter] = useState<'ALL' | 'UNPAID' | 'PAID' | 'PRESENT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [activeCommentRecordId, setActiveCommentRecordId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  // Counts
  const unpaidCount = records.reduce((acc, r) => {
    let count = 0;
    if (r.guard1Status === 'ABSENT_UNPAID') count++;
    if (r.guard2Status === 'ABSENT_UNPAID') count++;
    return acc + count;
  }, 0);

  const paidCount = records.reduce((acc, r) => {
    let count = 0;
    if (r.guard1Status === 'PAID_SUBSTITUTE') count++;
    if (r.guard2Status === 'PAID_SUBSTITUTE') count++;
    return acc + count;
  }, 0);

  const presentCount = records.reduce((acc, r) => {
    let count = 0;
    if ((r.guard1Status || 'PRESENT') === 'PRESENT') count++;
    if ((r.guard2Status || 'PRESENT') === 'PRESENT') count++;
    return acc + count;
  }, 0);

  // Weekly summary filtering
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - timeframeDays);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  const weeklyRecords = records.filter((r) => r.dutyDate >= cutoffStr);

  interface GuardSummary {
    name: string;
    businessType: string;
    shopNo: string;
    totalShifts: number;
    presentShifts: number;
    paidShifts: number;
    unpaidShifts: number;
    notes: string[];
  }

  const guardSummaryMap: Record<string, GuardSummary> = {};

  weeklyRecords.forEach((r) => {
    // Guard 1
    const g1Key = (r.guard1Name || '১ম পাহারাদার').trim();
    if (!guardSummaryMap[g1Key]) {
      guardSummaryMap[g1Key] = {
        name: g1Key,
        businessType: r.guard1BusinessType || '',
        shopNo: r.guard1ShopNo || '',
        totalShifts: 0,
        presentShifts: 0,
        paidShifts: 0,
        unpaidShifts: 0,
        notes: [],
      };
    }
    guardSummaryMap[g1Key].totalShifts += 1;
    if (r.guard1Status === 'ABSENT_UNPAID') {
      guardSummaryMap[g1Key].unpaidShifts += 1;
    } else if (r.guard1Status === 'PAID_SUBSTITUTE') {
      guardSummaryMap[g1Key].paidShifts += 1;
    } else {
      guardSummaryMap[g1Key].presentShifts += 1;
    }
    if (r.guard1StatusNote) guardSummaryMap[g1Key].notes.push(r.guard1StatusNote);

    // Guard 2
    const g2Key = (r.guard2Name || '২য় পাহারাদার').trim();
    if (!guardSummaryMap[g2Key]) {
      guardSummaryMap[g2Key] = {
        name: g2Key,
        businessType: r.guard2BusinessType || '',
        shopNo: r.guard2ShopNo || '',
        totalShifts: 0,
        presentShifts: 0,
        paidShifts: 0,
        unpaidShifts: 0,
        notes: [],
      };
    }
    guardSummaryMap[g2Key].totalShifts += 1;
    if (r.guard2Status === 'ABSENT_UNPAID') {
      guardSummaryMap[g2Key].unpaidShifts += 1;
    } else if (r.guard2Status === 'PAID_SUBSTITUTE') {
      guardSummaryMap[g2Key].paidShifts += 1;
    } else {
      guardSummaryMap[g2Key].presentShifts += 1;
    }
    if (r.guard2StatusNote) guardSummaryMap[g2Key].notes.push(r.guard2StatusNote);
  });

  const guardSummaries = Object.values(guardSummaryMap).sort(
    (a, b) => b.unpaidShifts - a.unpaidShifts || b.totalShifts - a.totalShifts
  );

  const totalWeeklyShifts = weeklyRecords.length * 2;
  const totalWeeklyPresent = weeklyRecords.reduce(
    (acc, r) =>
      acc +
      (r.guard1Status !== 'ABSENT_UNPAID' && r.guard1Status !== 'PAID_SUBSTITUTE' ? 1 : 0) +
      (r.guard2Status !== 'ABSENT_UNPAID' && r.guard2Status !== 'PAID_SUBSTITUTE' ? 1 : 0),
    0
  );
  const totalWeeklyPaid = weeklyRecords.reduce(
    (acc, r) =>
      acc +
      (r.guard1Status === 'PAID_SUBSTITUTE' ? 1 : 0) +
      (r.guard2Status === 'PAID_SUBSTITUTE' ? 1 : 0),
    0
  );
  const totalWeeklyUnpaid = weeklyRecords.reduce(
    (acc, r) =>
      acc +
      (r.guard1Status === 'ABSENT_UNPAID' ? 1 : 0) +
      (r.guard2Status === 'ABSENT_UNPAID' ? 1 : 0),
    0
  );

  const overallComplianceRate =
    totalWeeklyShifts > 0
      ? Math.round(((totalWeeklyPresent + totalWeeklyPaid) / totalWeeklyShifts) * 100)
      : 100;

  const handleCopyReportText = () => {
    const marketName = records[0]?.marketName || 'গনি মার্কেট';
    const reportText = `📢 ${marketName} - সাপ্তাহিক নৈশ পাহারা ও পারফরম্যান্স রিপোর্ট
📅 সময়কাল: গত ${toBengaliNumerals(timeframeDays)} দিন (${toBengaliNumerals(weeklyRecords.length)} টি রাউন্ড)

📊 সামারি পরিসংখ্যান:
• মোট বরাদ্দকৃত শিফট: ${toBengaliNumerals(totalWeeklyShifts)} টি
• সরাসরি উপস্থিত: ${toBengaliNumerals(totalWeeklyPresent)} টি
• ফি দিয়ে বদলি: ${toBengaliNumerals(totalWeeklyPaid)} টি
• 🔴 বকেয়া/খেলাপী: ${toBengaliNumerals(totalWeeklyUnpaid)} টি
• নৈশ শৃঙ্খলার হার: ${toBengaliNumerals(overallComplianceRate)}%

👤 ব্যবসায়ী/পাহারাদার তালিকা:
${guardSummaries
  .map(
    (g, i) =>
      `${toBengaliNumerals(i + 1)}. ${g.name} (${g.businessType || 'ব্যবসায়ী'})${
        g.shopNo ? ` [দোকান: ${g.shopNo}]` : ''
      }
   - মোট ডিউটি: ${toBengaliNumerals(g.totalShifts)} | উপস্থিত: ${toBengaliNumerals(
        g.presentShifts
      )} | ফি প্রদান: ${toBengaliNumerals(g.paidShifts)} | বকেয়া: ${toBengaliNumerals(
        g.unpaidShifts
      )} ${g.unpaidShifts > 0 ? '⚠️ (খেলাপী)' : '✅'}`
  )
  .join('\n')}

📌 সর্বসাধারণ ও মার্কেট কমিটির অবগতির জন্য প্রকাশিত।`;

    navigator.clipboard.writeText(reportText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Filter logic
  const filteredRecords = records.filter((record) => {
    const searchMatch =
      record.guard1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.guard2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.dutyDate.includes(searchTerm) ||
      (record.guard1BusinessType && record.guard1BusinessType.includes(searchTerm)) ||
      (record.guard2BusinessType && record.guard2BusinessType.includes(searchTerm));

    if (!searchMatch) return false;

    if (filter === 'UNPAID') {
      return (
        record.guard1Status === 'ABSENT_UNPAID' ||
        record.guard2Status === 'ABSENT_UNPAID'
      );
    }
    if (filter === 'PAID') {
      return (
        record.guard1Status === 'PAID_SUBSTITUTE' ||
        record.guard2Status === 'PAID_SUBSTITUTE'
      );
    }
    if (filter === 'PRESENT') {
      return (
        (record.guard1Status || 'PRESENT') === 'PRESENT' &&
        (record.guard2Status || 'PRESENT') === 'PRESENT'
      );
    }
    return true;
  });

  // Helper for Bengali month names
  const getBengaliMonthName = (monthStr: string) => {
    if (!monthStr || !monthStr.includes('-')) return '';
    const monthMap: Record<string, string> = {
      '01': 'জানুয়ারি',
      '02': 'ফেব্রুয়ারি',
      '03': 'মার্চ',
      '04': 'এপ্রিল',
      '05': 'মে',
      '06': 'জুন',
      '07': 'জুলাই',
      '08': 'আগস্ট',
      '09': 'সেপ্টেম্বর',
      '10': 'অক্টোবর',
      '11': 'নভেম্বর',
      '12': 'ডিসেম্বর',
    };
    const [y, m] = monthStr.split('-');
    return `${monthMap[m] || m} ${toBengaliNumerals(parseInt(y, 10))}`;
  };

  // Monthly chart data for Present vs Absent frequency over the current month
  const monthlyChartData = React.useMemo(() => {
    if (!records || records.length === 0) return { data: [], monthLabel: '' };

    const todayMonth = new Date().toISOString().substring(0, 7);
    const availableMonths = (Array.from(
      new Set(records.map((r) => (r.dutyDate ? r.dutyDate.substring(0, 7) : '')).filter(Boolean))
    ) as string[]).sort();

    // Target month: prefer current month if available, else latest month in records
    let targetMonth = todayMonth;
    if (!availableMonths.includes(targetMonth) && availableMonths.length > 0) {
      targetMonth = availableMonths[availableMonths.length - 1];
    }

    const monthRecords = records
      .filter((r) => r.dutyDate && r.dutyDate.startsWith(targetMonth))
      .sort((a, b) => a.dutyDate.localeCompare(b.dutyDate));

    const monthLabel = getBengaliMonthName(targetMonth);

    const data = monthRecords.map((r) => {
      let present = 0;
      let absent = 0;
      let unpaid = 0;
      let paid = 0;

      // Guard 1
      if ((r.guard1Status || 'PRESENT') === 'PRESENT') {
        present += 1;
      } else {
        absent += 1;
        if (r.guard1Status === 'ABSENT_UNPAID') unpaid += 1;
        if (r.guard1Status === 'PAID_SUBSTITUTE') paid += 1;
      }

      // Guard 2
      if ((r.guard2Status || 'PRESENT') === 'PRESENT') {
        present += 1;
      } else {
        absent += 1;
        if (r.guard2Status === 'ABSENT_UNPAID') unpaid += 1;
        if (r.guard2Status === 'PAID_SUBSTITUTE') paid += 1;
      }

      const [, m, d] = r.dutyDate.split('-');
      const dayNum = parseInt(d, 10);
      const shortMonths = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'];
      const displayDate = `${toBengaliNumerals(dayNum)} ${shortMonths[parseInt(m, 10) - 1] || m}`;

      return {
        rawDate: r.dutyDate,
        displayDate,
        present,
        absent,
        unpaid,
        paid,
      };
    });

    return { data, monthLabel };
  }, [records]);

  const handlePostComment = (recordId: string) => {
    if (!newCommentText.trim()) return;
    const comment: DutyComment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      authorName: authorName.trim() || 'সাধারণ ব্যবসায়ী',
      commentText: newCommentText.trim(),
      createdAt: new Date().toISOString(),
      userRole: 'সদস্য',
    };
    onAddComment(recordId, comment);
    setNewCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl p-4 sm:p-6 text-slate-100 shadow-2xl space-y-4 my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>পাবলিক নৈশ ডিউটি ও বকেয়া ট্র্যাকার বোর্ড</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                  পাবলিক নিরীক্ষা
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                সকল পাহারাদারের উপস্থিতি, বিকল্প ফি পরিশোধ ও বকেয়া/খেলাপীর বিস্তারিত তথ্য ও মতামত
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-1 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('AUDIT_LOGS')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'AUDIT_LOGS'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>ডিউটি লগ ও জনমত</span>
            {unpaidCount > 0 && (
              <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                {toBengaliNumerals(unpaidCount)}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('WEEKLY_REPORT')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'WEEKLY_REPORT'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>📊 সাপ্তাহিক পারফরম্যান্স রিক্যাপ ও রিপোর্ট</span>
          </button>
        </div>

        {activeTab === 'WEEKLY_REPORT' ? (
          /* WEEKLY SUMMARY REPORT VIEW */
          <div className="space-y-4">
            {/* Report Top Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">সময়সীমা:</span>
                <div className="flex gap-1 overflow-x-auto">
                  {[
                    { label: 'গত ৭ দিন (১ সপ্তাহ)', days: 7 },
                    { label: 'গত ১৪ দিন (২ সপ্তাহ)', days: 14 },
                    { label: 'গত ৩০ দিন (১ মাস)', days: 30 },
                    { label: 'সমগ্র ইতিহাস', days: 365 },
                  ].map((t) => (
                    <button
                      key={t.days}
                      type="button"
                      onClick={() => setTimeframeDays(t.days)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        timeframeDays === t.days
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleCopyReportText}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm shrink-0"
                  title="নোটিশবোর্ড ও সোশ্যাল মিডিয়ায় শেয়ারের জন্য রিক্যাপ কপি করুন"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'কপি হয়েছে!' : '📋 রিক্যাপ কপি করুন'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-700 shrink-0"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>🖨️ প্রিন্ট</span>
                </button>
              </div>
            </div>

            {/* KPI Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Compliance Rating Card */}
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-1">
                <div className="text-[10.5px] text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-amber-400" />
                  <span>শৃঙ্খলার হার (Compliance)</span>
                </div>
                <div
                  className={`text-xl font-extrabold ${
                    overallComplianceRate >= 90
                      ? 'text-emerald-400'
                      : overallComplianceRate >= 70
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  {toBengaliNumerals(overallComplianceRate)}%
                </div>
                <div className="text-[9.5px] text-slate-400">
                  {totalWeeklyShifts} টি শিফটের মধ্যে {totalWeeklyPresent + totalWeeklyPaid} টি সফল
                </div>
              </div>

              {/* Direct Present */}
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-1">
                <div className="text-[10.5px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>উপস্থিত পাহারাদার</span>
                </div>
                <div className="text-xl font-extrabold text-emerald-300">
                  {toBengaliNumerals(totalWeeklyPresent)} জন
                </div>
                <div className="text-[9.5px] text-slate-400">
                  {totalWeeklyShifts > 0
                    ? toBengaliNumerals(Math.round((totalWeeklyPresent / totalWeeklyShifts) * 100))
                    : 0}
                  % সরাসরি উপস্থিত
                </div>
              </div>

              {/* Paid Substitutes */}
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-1">
                <div className="text-[10.5px] text-amber-300 font-bold flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-amber-400" />
                  <span>টাকা প্রদান (বদলি)</span>
                </div>
                <div className="text-xl font-extrabold text-amber-300">
                  {toBengaliNumerals(totalWeeklyPaid)} জন
                </div>
                <div className="text-[9.5px] text-slate-400">
                  {totalWeeklyShifts > 0
                    ? toBengaliNumerals(Math.round((totalWeeklyPaid / totalWeeklyShifts) * 100))
                    : 0}
                  % বিকল্প ফি দিয়ে অনুপস্থিত
                </div>
              </div>

              {/* Defaulter / Unpaid */}
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-1">
                <div className="text-[10.5px] text-red-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  <span>🔴 খেলাপী ও বকেয়া</span>
                </div>
                <div className="text-xl font-extrabold text-red-400">
                  {toBengaliNumerals(totalWeeklyUnpaid)} জন
                </div>
                <div className="text-[9.5px] text-red-300/80">
                  {totalWeeklyUnpaid > 0
                    ? '⚠️ একাধিক বকেয়া খেলাপী রেকর্ড!'
                    : '✅ কোনো বকেয়া নেই'}
                </div>
              </div>
            </div>

            {/* Monthly Present vs Absent Line Chart */}
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 sm:p-4 rounded-xl space-y-3 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span>চলতি মাসের পাহারাদার উপস্থিতি বনাম অনুপস্থিতির ট্রেন্ড</span>
                    {monthlyChartData.monthLabel && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                        {monthlyChartData.monthLabel}
                      </span>
                    )}
                  </h4>
                </div>
                <div className="flex items-center gap-2.5 text-[10px] font-medium">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    উপস্থিত (Present)
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                    অনুপস্থিত (Absent)
                  </span>
                </div>
              </div>

              {monthlyChartData.data.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  চলতি মাসের জন্য কোনো উপস্থিতি বা ডিউটি তথ্য পাওয়া যায়নি।
                </div>
              ) : (
                <div className="w-full h-52 sm:h-56 pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyChartData.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis
                        dataKey="displayDate"
                        stroke="#64748b"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#64748b"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        allowDecimals={false}
                        domain={[0, 2]}
                        ticks={[0, 1, 2]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '0.5rem',
                          color: '#f8fafc',
                          fontSize: '11px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                        }}
                        formatter={(value: any, name: any) => [
                          `${toBengaliNumerals(value)} জন`,
                          name === 'present' ? '🟢 উপস্থিত (Present)' : '🔴 অনুপস্থিত (Absent)',
                        ]}
                        labelFormatter={(label: any) => `তারিখ: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="present"
                        name="present"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        dot={{ r: 3.5, fill: '#10b981' }}
                        activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="absent"
                        name="absent"
                        stroke="#ef4444"
                        strokeWidth={2.5}
                        dot={{ r: 3.5, fill: '#ef4444' }}
                        activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Guard Performance Scorecard Table */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden space-y-2">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold text-white">
                    ব্যবসায়ী/পাহারাদারদের পারফরম্যান্স স্কোরকার্ড (গত {toBengaliNumerals(timeframeDays)} দিন)
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400">
                  মোট নিবন্ধিত পাহারাদার: {toBengaliNumerals(guardSummaries.length)} জন
                </span>
              </div>

              <div className="overflow-x-auto max-h-72">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-900 text-[10.5px] text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">ক্রমিক ও পাহারাদার</th>
                      <th className="py-2.5 px-3 text-center">মোট ডিউটি</th>
                      <th className="py-2.5 px-3 text-center">উপস্থিত</th>
                      <th className="py-2.5 px-3 text-center">টাকা পরিশোধ</th>
                      <th className="py-2.5 px-3 text-center text-red-400">বকেয়া</th>
                      <th className="py-2.5 px-3 text-right">পারফরম্যান্স স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-[11px]">
                    {guardSummaries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-slate-500">
                          মনোনীত সময়সীমায় কোনো ডিউটি রেকর্ড পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      guardSummaries.map((g, idx) => {
                        const isPerfect = g.unpaidShifts === 0 && g.paidShifts === 0;
                        const hasUnpaid = g.unpaidShifts > 0;

                        return (
                          <tr
                            key={g.name}
                            className={`hover:bg-slate-900/60 transition ${
                              hasUnpaid ? 'bg-red-950/20' : ''
                            }`}
                          >
                            <td className="py-2.5 px-3">
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <span className="text-slate-500 font-mono text-[10px]">
                                  #{toBengaliNumerals(idx + 1)}
                                </span>
                                <span>{g.name}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Store className="w-2.5 h-2.5 text-slate-500" />
                                <span>{g.businessType || 'ব্যবসায়িক প্রতিষ্ঠান'}</span>
                                {g.shopNo && <span>(দোকান: {g.shopNo})</span>}
                              </div>
                            </td>

                            <td className="py-2.5 px-3 text-center font-bold text-amber-300">
                              {toBengaliNumerals(g.totalShifts)} টি
                            </td>

                            <td className="py-2.5 px-3 text-center font-bold text-emerald-400">
                              {toBengaliNumerals(g.presentShifts)}
                            </td>

                            <td className="py-2.5 px-3 text-center font-bold text-amber-400">
                              {toBengaliNumerals(g.paidShifts)}
                            </td>

                            <td className="py-2.5 px-3 text-center font-black text-red-400">
                              {g.unpaidShifts > 0 ? (
                                <span className="bg-red-600 text-white px-2 py-0.5 rounded font-black text-[10px]">
                                  {toBengaliNumerals(g.unpaidShifts)} টি বকেয়া
                                </span>
                              ) : (
                                <span className="text-slate-600">০</span>
                              )}
                            </td>

                            <td className="py-2.5 px-3 text-right">
                              {hasUnpaid ? (
                                <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded shadow-2xs">
                                  🚨 খেলাপী/বকেয়া
                                </span>
                              ) : isPerfect ? (
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 px-2 py-0.5 rounded">
                                  🏆 শতভাগ সুশৃঙ্খল
                                </span>
                              ) : (
                                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 px-2 py-0.5 rounded">
                                  🟡 টাকা জমা দিয়ে ছাড়
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* AUDIT LOGS & COMMENTS VIEW */
          <div className="space-y-4">
            {/* Status Counters Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setFilter('ALL')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  filter === 'ALL'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] text-slate-400">মোট ডিউটি রেকর্ড</div>
                <div className="text-lg font-bold text-white">{toBengaliNumerals(records.length)} টি</div>
              </button>

              <button
                type="button"
                onClick={() => setFilter('UNPAID')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  filter === 'UNPAID'
                    ? 'bg-red-500/20 border-red-500 text-red-300 ring-1 ring-red-500/50'
                    : 'bg-slate-800/80 border-slate-700 text-red-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] text-red-300/80 flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  <span>🔴 বকেয়া ও খেলাপী</span>
                </div>
                <div className="text-lg font-bold text-red-400">{toBengaliNumerals(unpaidCount)} জন</div>
              </button>

              <button
                type="button"
                onClick={() => setFilter('PAID')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  filter === 'PAID'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                    : 'bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] text-amber-300/80 flex items-center gap-1 font-bold">
                  <DollarSign className="w-3 h-3 text-amber-400" />
                  <span>🟡 টাকা পরিশোধিত</span>
                </div>
                <div className="text-lg font-bold text-amber-300">{toBengaliNumerals(paidCount)} জন</div>
              </button>

              <button
                type="button"
                onClick={() => setFilter('PRESENT')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  filter === 'PRESENT'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                    : 'bg-slate-800/80 border-slate-700 text-emerald-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] text-emerald-300/80 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>🟢 সরাসরি উপস্থিত</span>
                </div>
                <div className="text-lg font-bold text-emerald-400">{toBengaliNumerals(presentCount)} জন</div>
              </button>
            </div>

            {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নাম, তারিখ বা ব্যবসার ধরন দিয়ে খুঁজুন..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-slate-400 text-[11px] shrink-0">ফিল্টার:</span>
            <div className="flex gap-1 overflow-x-auto custom-scrollbar w-full">
              {(['ALL', 'UNPAID', 'PAID', 'PRESENT'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                    filter === f
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {f === 'ALL'
                    ? 'সব'
                    : f === 'UNPAID'
                    ? '🔴 বকেয়া'
                    : f === 'PAID'
                    ? '🟡 টাকা পরিশোধিত'
                    : '🟢 উপস্থিত'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Records List */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800">
            {filter === 'UNPAID'
              ? '🎉 স্বস্তির খবর! কোনো বকেয়া বা খেলাপী রেকর্ড নেই।'
              : 'কোনো মিলযুক্ত ডিউটি রেকর্ড পাওয়া যায়নি।'}
          </div>
        ) : (
          <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
            {filteredRecords.map((record) => {
              const g1Unpaid = record.guard1Status === 'ABSENT_UNPAID';
              const g2Unpaid = record.guard2Status === 'ABSENT_UNPAID';
              const g1Paid = record.guard1Status === 'PAID_SUBSTITUTE';
              const g2Paid = record.guard2Status === 'PAID_SUBSTITUTE';

              const hasUnpaid = g1Unpaid || g2Unpaid;

              return (
                <div
                  key={record.id}
                  className={`border rounded-xl p-3.5 space-y-3 transition ${
                    hasUnpaid
                      ? 'bg-red-950/20 border-red-500/50 ring-1 ring-red-500/30'
                      : g1Paid || g2Paid
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Bar: Date, Round, Serial */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300">
                        {formatBengaliFullDate(record.dutyDate)}
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                        রাউন্ড-{toBengaliNumerals(record.roundNumber || 1)}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                        #{record.serialNumber}
                      </span>
                    </div>

                    {hasUnpaid && (
                      <span className="text-[11px] bg-red-600 text-white font-extrabold px-2.5 py-0.5 rounded-full animate-pulse flex items-center gap-1 shadow-sm">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                        <span>🚨 খেলাপী/বকেয়া সতর্কতা!</span>
                      </span>
                    )}
                  </div>

                  {/* Guard 1 & Guard 2 Status Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {/* Guard 1 */}
                    <div
                      className={`p-2.5 rounded-lg border space-y-1 ${
                        g1Unpaid
                          ? 'bg-red-950/60 border-red-500 text-red-200'
                          : g1Paid
                          ? 'bg-amber-950/50 border-amber-500/80 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start font-bold">
                        <span className="text-slate-300">১ম পাহারাদার:</span>
                        {g1Unpaid ? (
                          <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-black">
                            🔴 বকেয়া (আসেননি, টাকাও দেননি)
                          </span>
                        ) : g1Paid ? (
                          <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black">
                            🟡 টাকা পরিশোধিত (বদলি)
                          </span>
                        ) : (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                            🟢 সরাসরি উপস্থিত
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-extrabold text-white">
                        {record.guard1Name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Store className="w-3 h-3 text-slate-500" />
                        <span>ব্যবসা: <strong>{record.guard1BusinessType || '—'}</strong></span>
                        {record.guard1ShopNo && <span>(দোকান: {record.guard1ShopNo})</span>}
                      </div>
                      {record.guard1StatusNote && (
                        <div className="text-[10.5px] text-amber-300 italic bg-amber-950/80 border border-amber-500/30 p-1 rounded mt-1">
                          নোট: {record.guard1StatusNote}
                        </div>
                      )}
                    </div>

                    {/* Guard 2 */}
                    <div
                      className={`p-2.5 rounded-lg border space-y-1 ${
                        g2Unpaid
                          ? 'bg-red-950/60 border-red-500 text-red-200'
                          : g2Paid
                          ? 'bg-amber-950/50 border-amber-500/80 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start font-bold">
                        <span className="text-slate-300">২য় পাহারাদার:</span>
                        {g2Unpaid ? (
                          <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-black">
                            🔴 বকেয়া (আসেননি, টাকাও দেননি)
                          </span>
                        ) : g2Paid ? (
                          <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black">
                            🟡 টাকা পরিশোধিত (বদলি)
                          </span>
                        ) : (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                            🟢 সরাসরি উপস্থিত
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-extrabold text-white">
                        {record.guard2Name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Store className="w-3 h-3 text-slate-500" />
                        <span>ব্যবসা: <strong>{record.guard2BusinessType || '—'}</strong></span>
                        {record.guard2ShopNo && <span>(দোকান: {record.guard2ShopNo})</span>}
                      </div>
                      {record.guard2StatusNote && (
                        <div className="text-[10.5px] text-amber-300 italic bg-amber-950/80 border border-amber-500/30 p-1 rounded mt-1">
                          নোট: {record.guard2StatusNote}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Public Community Comments & Opinions Section */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 space-y-2">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-300">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                        <span>ব্যবসায়ীদের দ্রুত মতামত ও প্রতিক্রিয়া ({toBengaliNumerals(record.comments?.length || 0)}):</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCommentRecordId(
                            activeCommentRecordId === record.id ? null : record.id
                          )
                        }
                        className="text-[10px] text-amber-400 hover:underline cursor-pointer bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                      >
                        {activeCommentRecordId === record.id ? 'বক্স লুকান' : '✍️ নতুন মতামত লিখুন'}
                      </button>
                    </div>

                    {/* Comments List */}
                    {record.comments && record.comments.length > 0 ? (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {record.comments.map((c) => (
                          <div
                            key={c.id}
                            className="bg-slate-950 border border-slate-800 rounded p-2 text-xs space-y-0.5"
                          >
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span className="font-bold text-amber-300 flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-500" />
                                {c.authorName} ({c.userRole || 'ব্যবসায়ী'})
                              </span>
                              <span>{new Date(c.createdAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-slate-200 text-[11px] leading-relaxed">
                              {c.commentText}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10.5px] text-slate-500 italic">
                        এখনো কোনো প্রকাশ্য মতামত দেওয়া হয়নি। প্রথম মতামত দিন!
                      </p>
                    )}

                    {/* New Comment Input Box */}
                    {activeCommentRecordId === record.id && (
                      <div className="space-y-2 pt-2 border-t border-slate-800 animate-fade-in">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="আপনার নাম (ঐচ্ছিক)"
                            className="w-1/3 bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-400"
                          />
                          <input
                            type="text"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="আপনার বক্তব্য বা তথ্য লিখুন (যেমন: 'টাকা জমা প্রদান করেছেন')..."
                            className="w-2/3 bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-400"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handlePostComment(record.id);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handlePostComment(record.id)}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition shrink-0"
                          >
                            <span>পোস্ট</span>
                            <Send className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )}

        <div className="pt-2 border-t border-slate-800 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium cursor-pointer transition"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
