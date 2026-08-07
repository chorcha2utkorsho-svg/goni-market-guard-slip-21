import React, { useState } from 'react';
import {
  Store,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  Lock,
  User,
  Send,
  Sparkles,
  BarChart3,
  Lightbulb,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  LogIn,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { SavedSlipRecord, DutyComment } from '../types';
import { toBengaliNumerals, formatBengaliFullDate, getTomorrowDateString } from '../utils/bengaliUtils';
import { getScheduledPairForDate } from '../data/rosterData';
import { MerchantProfile } from './MerchantAuthModal';
import { AerialViewShowcase } from './AerialViewShowcase';
import { ClassifiedStoreDirectory } from './ClassifiedStoreDirectory';

interface ProposalItem {
  id: string;
  title: string;
  category: string;
  description: string;
  votes: number;
  votedBy: string[]; // shop numbers that voted
  status: 'সক্রিয় প্রস্তাবনা' | 'বিবেচনাধীন' | 'অনুমোদিত';
}

interface CommonMarketDashboardProps {
  records: SavedSlipRecord[];
  currentMerchant: MerchantProfile | null;
  onOpenMerchantAuth: () => void;
  onOpenDevAuth: () => void;
  isDevUnlocked: boolean;
  onGoToDevDashboard: () => void;
  onPostGlobalComment: (recordId: string, comment: DutyComment) => void;
}

export const CommonMarketDashboard: React.FC<CommonMarketDashboardProps> = ({
  records,
  currentMerchant,
  onOpenMerchantAuth,
  onOpenDevAuth,
  isDevUnlocked,
  onGoToDevDashboard,
  onPostGlobalComment,
}) => {
  const tomorrowDate = getTomorrowDateString();
  const todaySchedule = getScheduledPairForDate(tomorrowDate);

  // Default Proposals for Market Development & Prosperity
  const [proposals, setProposals] = useState<ProposalItem[]>([
    {
      id: 'p1',
      title: 'মার্কেটের চারপাশে নতুন হাই-পাওয়ার রাত্রিকালীন LED সোলার লাইট স্থাপন',
      category: 'নিরাপত্তা ও আলো',
      description: 'রাতের বেলা গলি ও পেছনের অংশে অন্ধকার দূর করতে ৮টি আধুনিক সোলার এলইডি লাইট বসানোর প্রস্তাবনা।',
      votes: 18,
      votedBy: ['64', '63'],
      status: 'অনুমোদিত',
    },
    {
      id: 'p2',
      title: 'মার্কেটের প্রবেশমুখে ৪টি নতুন HD CCTV ক্যামেরা নাইট ভিশন যুক্তকরণ',
      category: 'ডিজিটাল নজরদারি',
      description: 'নৈশকালীন পাহারাদারদের কাজের নির্ভুলতা এবং মালামাল সুরক্ষা নিশ্চিতে নতুন ক্যামেরা স্থাপন।',
      votes: 24,
      votedBy: ['64'],
      status: 'সক্রিয় প্রস্তাবনা',
    },
    {
      id: 'p3',
      title: 'জরুরি অগ্নিনির্বাপক সিকিউরিটি সিলিন্ডার ও বালু বক্স পুনঃস্থাপন',
      category: 'বাজার সুরক্ষা',
      description: 'প্রতিটি গলি ও প্রধান পয়েন্টে অগ্নিনির্বাপক বোতল প্রতিস্থাপন ও ব্যবসায়ীদের সচেতনতামূলক প্রশিক্ষণ।',
      votes: 15,
      votedBy: [],
      status: 'বিবেচনাধীন',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CLASSIFIED' | 'PROPOSALS' | 'COMMENTS' | 'SECURITY'>('OVERVIEW');
  const [newCommentInput, setNewCommentInput] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string>(records[0]?.id || 'global');

  // Handle Voting on Proposals
  const handleVoteProposal = (proposalId: string) => {
    if (!currentMerchant) {
      onOpenMerchantAuth();
      return;
    }

    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          const hasVoted = p.votedBy.includes(currentMerchant.shopNo);
          if (hasVoted) {
            return {
              ...p,
              votes: Math.max(0, p.votes - 1),
              votedBy: p.votedBy.filter((s) => s !== currentMerchant.shopNo),
            };
          } else {
            return {
              ...p,
              votes: p.votes + 1,
              votedBy: [...p.votedBy, currentMerchant.shopNo],
            };
          }
        }
        return p;
      })
    );
  };

  // Process monthly attendance data for Recharts
  const monthlyChartData = React.useMemo(() => {
    if (!records || records.length === 0) return [];

    const todayMonth = new Date().toISOString().substring(0, 7);
    const availableMonths = (Array.from(
      new Set(records.map((r) => (r.dutyDate ? r.dutyDate.substring(0, 7) : '')).filter(Boolean))
    ) as string[]).sort();

    let targetMonth = todayMonth;
    if (!availableMonths.includes(targetMonth) && availableMonths.length > 0) {
      targetMonth = availableMonths[availableMonths.length - 1];
    }

    const monthRecords = records
      .filter((r) => r.dutyDate && r.dutyDate.startsWith(targetMonth))
      .sort((a, b) => a.dutyDate.localeCompare(b.dutyDate));

    return monthRecords.map((r) => {
      let present = 0;
      let absent = 0;

      if ((r.guard1Status || 'PRESENT') === 'PRESENT') present += 1;
      else absent += 1;

      if ((r.guard2Status || 'PRESENT') === 'PRESENT') present += 1;
      else absent += 1;

      const [, m, d] = r.dutyDate.split('-');
      const dayNum = parseInt(d, 10);
      const shortMonths = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'];
      const displayDate = `${toBengaliNumerals(dayNum)} ${shortMonths[parseInt(m, 10) - 1] || m}`;

      return {
        displayDate,
        present,
        absent,
      };
    });
  }, [records]);

  // Handle Post Comment from Common Board
  const handlePostComment = () => {
    if (!newCommentInput.trim()) return;
    if (!currentMerchant) {
      onOpenMerchantAuth();
      return;
    }

    const comment: DutyComment = {
      id: 'comm_' + Date.now(),
      authorName: `${currentMerchant.ownerName} (দোকান #${currentMerchant.shopNo})`,
      commentText: newCommentInput.trim(),
      createdAt: new Date().toISOString(),
      userRole: `ব্যবসায়ী - ${currentMerchant.businessType}`,
    };

    const targetId = selectedRecordId || records[0]?.id || 'global_board';
    onPostGlobalComment(targetId, comment);
    setNewCommentInput('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Title */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span>ব্যবসায়ীদের কমন ড্যাশবোর্ড</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>সার্বিক উন্নয়ন ও সুরক্ষা পোর্টাল</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
              গণি মার্কেট নৈশ নিরাপত্তা ও ব্যবসায়ী সমৃদ্ধি পরিষদ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              বাজারের সার্বিক উন্নতি ও সমৃদ্ধির জন্য সকল ব্যবসায়ীদের যৌথ অংশগ্রহণ নিশ্চিতকরণ কেন্দ্র। নিরাপত্তা সুরক্ষার স্বার্থে যাবতীয় স্লিপ ও ডেটা ইনপুট-আউটপুট সুরক্ষিত ডেভেলপার ড্যাশবোর্ড থেকে নিয়ন্ত্রিত।
            </p>
          </div>

          {/* User Sign-In Badge & Dev Access Switch */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {currentMerchant ? (
              <div className="bg-slate-950/80 border border-amber-500/40 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                  #{currentMerchant.shopNo}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{currentMerchant.ownerName}</span>
                    <span className="text-[10px] text-amber-400">({currentMerchant.businessType})</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>ব্যবসায়ী সাইন-ইন সক্রিয়</span>
                  </div>
                </div>
                <button
                  onClick={onOpenMerchantAuth}
                  className="text-[10px] text-slate-400 hover:text-white underline ml-2 cursor-pointer"
                >
                  পরিবর্তন
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenMerchantAuth}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/40 cursor-pointer transition active:scale-97"
              >
                <LogIn className="w-4 h-4 text-slate-950" />
                <span>🔑 ব্যবসায়ী সাইন-ইন করুন</span>
              </button>
            )}

            {/* Developer Access Button */}
            {isDevUnlocked ? (
              <button
                onClick={onGoToDevDashboard}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-600 text-xs font-bold cursor-pointer transition shadow-md"
              >
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>⚡ ডেভেলপার স্লিপ ড্যাশবোর্ড</span>
              </button>
            ) : (
              <button
                onClick={onOpenDevAuth}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/80 text-xs font-bold cursor-pointer transition"
                title="কেবলমাত্র পিনধারী ডেভেলপার ও এডমিনের জন্য লকিং এক্সেস"
              >
                <Lock className="w-4 h-4 text-red-400" />
                <span>ডেভেলপার এক্সেস (🔒)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bird's Eye View Aerial Showcase Section */}
      <AerialViewShowcase />

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Today's Duty Pair */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 relative overflow-hidden shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              আজ রাতের ডিউটি তফসিল
            </span>
            <span className="text-[10px] bg-slate-800 text-amber-300 font-mono px-2 py-0.5 rounded">
              রাউন্ড-{toBengaliNumerals(todaySchedule.roundNumber)}
            </span>
          </div>
          <div className="text-base font-extrabold text-white flex items-center gap-1.5">
            <span className="text-amber-300">{todaySchedule.pair.guard1Name}</span>
            <span className="text-slate-500">+</span>
            <span className="text-amber-300">{todaySchedule.pair.guard2Name}</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>২য় পাহারাদার দোকান: #{toBengaliNumerals(todaySchedule.pair.guard2ShopNo || '৬৪')}</span>
            <span className="text-emerald-400 font-bold">ক্রমিক #{toBengaliNumerals(todaySchedule.serialNo)}</span>
          </div>
        </div>

        {/* Card 2: Market Safety Index */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 relative overflow-hidden shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              বাজারের সার্বিক নিরাপত্তা সূচক
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
              নিরাপদ
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-400 flex items-baseline gap-2">
            <span>৯৮.৫%</span>
            <span className="text-xs text-slate-400 font-normal">উচ্চ কার্যকারিতা</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
            <span>৩৫ জন পাহারাদারের নিয়মিত টহল</span>
            <span className="text-amber-400 font-medium">২৪/৭ কভারেজ</span>
          </div>
        </div>

        {/* Card 3: Proposals & Voting */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 relative overflow-hidden shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              বাজার সমৃদ্ধি প্রস্তাবনা
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
              {toBengaliNumerals(proposals.length)} টি
            </span>
          </div>
          <div className="text-2xl font-black text-amber-300 flex items-baseline gap-2">
            <span>{toBengaliNumerals(proposals.reduce((a, b) => a + b.votes, 0))}</span>
            <span className="text-xs text-slate-400 font-normal">মোট সমর্থক ভোট</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
            <span>ব্যবসায়ীদের সর্বসম্মতিক্রমে গ্রহণ</span>
            <button
              onClick={() => setActiveTab('PROPOSALS')}
              className="text-amber-400 hover:underline font-bold"
            >
              ভোট দিন &rarr;
            </button>
          </div>
        </div>

        {/* Card 4: Community Comments Count */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 relative overflow-hidden shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
              ব্যবসায়ীদের সরাসরি মতামত
            </span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-1.5 py-0.5 rounded">
              উন্মুক্ত ফোরাম
            </span>
          </div>
          <div className="text-2xl font-black text-sky-400 flex items-baseline gap-2">
            <span>
              {toBengaliNumerals(
                records.reduce((acc, r) => acc + (r.comments?.length || 0), 0)
              )}
            </span>
            <span className="text-xs text-slate-400 font-normal">টি রেজিস্টার্ড কমেন্ট</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
            <span>ব্যবসায়ী সাইন-ইন করে মন্তব্য করুন</span>
            <button
              onClick={() => setActiveTab('COMMENTS')}
              className="text-sky-400 hover:underline font-bold"
            >
              কমেন্ট লিখুন &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-slate-800 gap-2 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            activeTab === 'OVERVIEW'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>উপস্থিতি ও পাহাড়াদার ট্র্যাকার</span>
        </button>

        <button
          onClick={() => setActiveTab('CLASSIFIED')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            activeTab === 'CLASSIFIED'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>🏢 শ্রেণিভিত্তিক দোকান ডিরেক্টরি (১৯টি বিভাগ)</span>
        </button>

        <button
          onClick={() => setActiveTab('PROPOSALS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            activeTab === 'PROPOSALS'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>উন্নতি ও সমৃদ্ধি প্রস্তাবনা বোর্ড ({toBengaliNumerals(proposals.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('COMMENTS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            activeTab === 'COMMENTS'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>ব্যবসায়ীদের সরাসরি মুক্ত মতামত স্থান</span>
        </button>

        <button
          onClick={() => setActiveTab('SECURITY')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            activeTab === 'SECURITY'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>ডেভেলপার নিরাপত্তা ও ইনপুট নির্দেশিকা</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & MONTHLY CHART */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Recharts Monthly Attendance Trend */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>চলতি মাসের পাহারাদার উপস্থিতি বনাম অনুপস্থিতির সাপ্তাহিক গতিধারা</span>
                </h3>
                <p className="text-xs text-slate-400">
                  নৈশকালীন টহলে পাহারাদারদের সরাসরি উপস্থিতি (সবুজ) ও খেলাপী/অনুপস্থিতি (লাল) ভিজ্যুয়াল গ্রাফ
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  উপস্থিত (Present)
                </span>
                <span className="flex items-center gap-1.5 text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                  অনুপস্থিত (Absent)
                </span>
              </div>
            </div>

            {monthlyChartData.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 bg-slate-950/40 rounded-xl">
                কোনো তথ্য নিবন্ধিত হয়নি। ডেভেলপার ড্যাশবোর্ড থেকে স্লিপ সেভ করা হলে গ্রাফ প্রদর্শিত হবে।
              </div>
            ) : (
              <div className="w-full h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis
                      dataKey="displayDate"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      allowDecimals={false}
                      domain={[0, 2]}
                      ticks={[0, 1, 2]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        color: '#f8fafc',
                        fontSize: '12px',
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
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#10b981' }}
                      activeDot={{ r: 7, stroke: '#059669', strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      name="absent"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#ef4444' }}
                      activeDot={{ r: 7, stroke: '#dc2626', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Quick Notice & Security Policy Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Info className="w-4 h-4 text-amber-400" />
              <span>বাজারের সাধারণ ব্যবসায়ীদের জ্ঞাতার্থে নিরাপত্তা সুনির্দিষ্টকরণ</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>১. সুরক্ষিত ডাটাবেজ</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  প্রিন্টেড ও সংরক্ষিত সকল অফিশিয়াল ডিউটি স্লিপ জেনারেটর এবং জরিমানা সংশোধন নিরাপত্তা নিশ্চিত করে ডেভ প্যানেল থেকে ইনপুট হয়।
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-amber-400" />
                  <span>২. ব্যবসায়ীদের স্বতঃস্ফূর্ত অংশগ্রহণ</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  ব্যবসায়ীরা তাদের নিজস্ব দোকান নাম্বার সিলেক্ট করে সাইন-ইন করে বাজারে যেকোনো ধরণের সংস্কার ও মানোন্নয়ন পরামর্শ দিতে পারেন।
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>৩. বকেয়া ও অনুপস্থিতি ব্যবস্থা</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  অনুপস্থিতির ক্ষেত্রে বিকল্প পাহারাদারের খরচ বা ২০০ টাকা জরিমানা প্রদান নিশ্চিত করার স্বচ্ছ পাবলিক অডিট তালিকা নিয়মিত হালনাগাদ করা হয়।
                </p>
              </div>
            </div>
          </div>

          {/* Integrated Classified Store Directory inside Overview */}
          <ClassifiedStoreDirectory />
        </div>
      )}

      {/* TAB 2: CLASSIFIED STORE DIRECTORY */}
      {activeTab === 'CLASSIFIED' && (
        <div className="animate-in fade-in duration-200">
          <ClassifiedStoreDirectory />
        </div>
      )}

      {/* TAB 2: PROPOSALS FOR MARKET PROSPERITY */}
      {activeTab === 'PROPOSALS' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>বাজারের সার্বিক উন্নতি ও সমৃদ্ধির যৌথ প্রস্তাবনা পরিষদ</span>
              </h3>
              <p className="text-xs text-slate-400">
                ব্যবসায়ীরা সাইন-ইন করে প্রস্তাবনায় নিজের সমর্থক ভোট প্রদান করতে পারেন।
              </p>
            </div>

            {currentMerchant ? (
              <div className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-semibold">
                দোকান #{currentMerchant.shopNo} হিসেবে ভোট প্রদানে প্রস্তুত
              </div>
            ) : (
              <button
                onClick={onOpenMerchantAuth}
                className="text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 rounded-xl border border-amber-500/30 font-bold flex items-center gap-1.5 cursor-pointer transition"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>ভোট দিতে ব্যবসায়ি সাইন-ইন করুন</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proposals.map((p) => {
              const hasVoted = currentMerchant ? p.votedBy.includes(currentMerchant.shopNo) : false;
              return (
                <div
                  key={p.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between shadow-md hover:border-slate-700 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {p.category}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          p.status === 'অনুমোদিত'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : p.status === 'সক্রিয় প্রস্তাবনা'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug">{p.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{p.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <ThumbsUp className={`w-4 h-4 ${hasVoted ? 'text-emerald-400 fill-emerald-400' : 'text-amber-400'}`} />
                      <span>{toBengaliNumerals(p.votes)} টি সমর্থন</span>
                    </div>

                    <button
                      onClick={() => handleVoteProposal(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                        hasVoted
                          ? 'bg-emerald-500 text-slate-950 shadow-md'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{hasVoted ? 'সমর্থন দেওয়া হয়েছে' : 'সমর্থন দিন'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MERCHANT GENERAL DISCUSSION & COMMENTS */}
      {activeTab === 'COMMENTS' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>ব্যবসায়ীদের মুক্ত আলোচনা ও সরাসরি পরামর্শ ফোরাম</span>
                </h3>
                <p className="text-xs text-slate-400">
                  বাজারের যে কোনো সমস্যা, পরামর্শ বা নৈশ পাহারা সংক্রান্ত মতামত সরাসরি এখানে পোস্ট করুন।
                </p>
              </div>

              {currentMerchant ? (
                <div className="text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 font-bold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    সাইন-ইন: {currentMerchant.ownerName} (দোকান #{currentMerchant.shopNo})
                  </span>
                </div>
              ) : (
                <button
                  onClick={onOpenMerchantAuth}
                  className="text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 rounded-xl border border-amber-500/30 font-bold flex items-center gap-1.5 cursor-pointer transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>মন্তব্য করতে সাইন-ইন করুন</span>
                </button>
              )}
            </div>

            {/* Comment Post Box */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <label className="block text-xs font-semibold text-slate-300">
                নতুন মতামত / সংস্কার বার্তা লিখুন:
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newCommentInput}
                  onChange={(e) => setNewCommentInput(e.target.value)}
                  placeholder={
                    currentMerchant
                      ? `দোকান #${currentMerchant.shopNo} এর পক্ষে মতামত লিখুন...`
                      : "প্রথমে 'ব্যবসায়ী সাইন-ইন' করে কথা লিখুন..."
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostComment();
                  }}
                />
                <button
                  onClick={handlePostComment}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shrink-0 shadow-md"
                >
                  <span>মন্তব্য পোস্ট করুন</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {!currentMerchant && (
                <p className="text-[10.5px] text-amber-400/90 italic flex items-center gap-1">
                  <Info className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>মন্তব্য পোস্ট করার আগে অনুগ্রহ করে নিজের 'দোকান নম্বর' দিয়ে সাইন-ইন করুন।</span>
                </p>
              )}
            </div>

            {/* Existing Comments List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300">সাম্প্রতিক প্রকাশ্য মন্তব্যসমূহ:</h4>

              {records.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 bg-slate-950/40 rounded-xl">
                  এখনো কোনো রেজিস্টার্ড রেকর্ড নেই।
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {records.flatMap((r) => r.comments || []).length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-500 bg-slate-950/40 rounded-xl">
                      এখনো কোনো সাধারণ মন্তব্য জমা পড়েনি। আপনার মূল্যবান প্রস্তাবনা প্রথম লিখুন!
                    </div>
                  ) : (
                    records
                      .flatMap((r) => r.comments || [])
                      .map((comm) => (
                        <div
                          key={comm.id}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-amber-300 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-amber-400" />
                              {comm.authorName}
                            </span>
                            <span className="text-slate-500 text-[10px]">
                              {new Date(comm.createdAt).toLocaleString('bn-BD', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: 'short',
                              })}
                            </span>
                          </div>
                          <p className="text-slate-200 text-xs leading-relaxed pl-5 border-l-2 border-amber-500/40">
                            {comm.commentText}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEVELOPER SECURITY & ARCHITECTURE INFO */}
      {activeTab === 'SECURITY' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shadow-inner shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>ডেভেলপার ড্যাশবোর্ড নিরাপত্তা ও ইনপুট নির্দেশিকা</span>
                <span className="text-[10px] bg-red-500/20 text-red-300 font-extrabold px-2 py-0.5 rounded border border-red-500/30">
                  SECURITY GUARANTEED
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                বাজারের নৈশকালীন নিরাপত্তার শতভাগ গোপনীয়তা ও স্লিপের সত্যতা রক্ষার আর্কিটেকচার
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>১. ইনপুট ও আউটপুট এক্সেস কন্ট্রোল</span>
              </h4>
              <p className="text-slate-400">
                যাবতীয় স্লিপ তৈরি (A5 Dual & A4 Quad), পাহারাদারের নাম ও দোকান নির্বাচন, ৩৫ জোড়া রাউন্ড সিকোয়েন্স জেনারেশন, এবং বকেয়া/জরিমানা হালনাগাদ করার অধিকার শুধুমাত্র সিকিউরিটি PIN ভিত্তিক ডেভেলপার ড্যাশবোর্ডে সংরক্ষিত।
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-300 flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-400" />
                <span>২. সাধারণ ব্যবসায়ীদের ড্যাশবোর্ড সুবিধা</span>
              </h4>
              <p className="text-slate-400">
                বাজারের সাধারণ ব্যবসায়ীরা সহজ সাইন-ইন করে নিয়মিত ডিউটি তফসিল দেখতে পারবেন, বাজারে নতুন উন্নয়ন লাইট/ক্যামেরা সিসিটিভি ইনস্টলেশন প্রস্তাবে ভোট দিতে পারবেন, এবং উন্মুক্ত মতামত প্রদান করতে পারবেন।
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>৩. ডেভেলপার প্যানেল খোলার নিয়ম</span>
              </h4>
              <p className="text-slate-400">
                উপরে ডানদিকের <strong className="text-red-300">"ডেভেলপার এক্সেস (🔒)"</strong> বাটনে ক্লিক করে সিকিউরিটি পিন (ডিফল্ট: <code className="bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded font-mono">1234</code>) প্রদান করলেই মূল স্লিপ জেনারেটর ফর্ম সক্রিয় হবে।
              </p>
            </div>
          </div>

          <div className="pt-2 text-right">
            {isDevUnlocked ? (
              <button
                onClick={onGoToDevDashboard}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2 ml-auto cursor-pointer transition"
              >
                <span>ডেভেলপার স্লিপ জেনারেটরে প্রবেশ করুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenDevAuth}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-950/40 flex items-center gap-2 ml-auto cursor-pointer transition"
              >
                <Lock className="w-4 h-4" />
                <span>PIN দিয়ে ডেভেলপার এক্সেস আনলক করুন</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
