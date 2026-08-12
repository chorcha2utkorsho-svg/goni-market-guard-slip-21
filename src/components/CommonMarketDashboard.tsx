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
  Share2,
  Image as ImageIcon,
  Video,
  Heart,
  MessageCircle,
  Tag,
  Globe,
  Plus,
  Edit3,
  Youtube,
  Settings,
} from 'lucide-react';
import { DeveloperContentModal } from './DeveloperContentModal';
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
import { MarketHeroSlider } from './MarketHeroSlider';
import { MarketVideoSpeechSlider } from './MarketVideoSpeechSlider';
import { FishVegMarketSlider } from './FishVegMarketSlider';
import { GroceryStoresSlider } from './GroceryStoresSlider';
import { SalonBeautyBeddingSection } from './SalonBeautyBeddingSection';
import { ComputerShopsSlider } from './ComputerShopsSlider';
import { RodCementFurnitureSection } from './RodCementFurnitureSection';
import { PharmacyHealthcareSlider } from './PharmacyHealthcareSlider';
import { LandServicesConsultantSection } from './LandServicesConsultantSection';

export interface SocialFeedPost {
  id: string;
  authorShopNo: string;
  authorName: string;
  authorShopTitle: string;
  category: 'সমস্যা ও সংস্কার' | 'ব্যবসার সম্ভাবনা' | 'পণ্যের খবর ও অফার' | 'সাধারণ আলোচনা';
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
  likes: number;
  likedBy: string[]; // shop numbers
  comments: {
    id: string;
    authorShopNo: string;
    authorName: string;
    content: string;
    createdAt: string;
  }[];
}

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

  const [isDevContentModalOpen, setIsDevContentModalOpen] = useState(false);
  const [devModalSectionId, setDevModalSectionId] = useState('sec-1');

  const openDevContentEditor = (sectionId: string = 'sec-1') => {
    if (!isDevUnlocked) {
      onOpenDevAuth();
      return;
    }
    setDevModalSectionId(sectionId);
    setIsDevContentModalOpen(true);
  };

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

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CLASSIFIED' | 'FEED' | 'PROPOSALS' | 'SECURITY'>('OVERVIEW');
  const [newCommentInput, setNewCommentInput] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string>(records[0]?.id || 'global');

  // Facebook-style Social Feed State
  const [feedPosts, setFeedPosts] = useState<SocialFeedPost[]>([
    {
      id: 'fp1',
      authorShopNo: '64',
      authorName: 'রফিক আহমেদ',
      authorShopTitle: 'মেসার্স রফিক ইলেকট্রনিক্স',
      category: 'পণ্যের খবর ও অফার',
      content: 'আমাদের ৬৪ নম্বর দোকানে নতুন হাই-পাওয়ার নাইট এলইডি লাইট, সিসিটিভি নাইট ভিশন ক্যামেরা ও আইপিএস ইনভার্টারের পাইকারি কালেকশন এসেছে। গণি মার্কেটের যেকোনো ব্যবসায়ী ভাইদের জন্য বিশেষ মূল্য ছাড় দেওয়া হবে!',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      likes: 15,
      likedBy: ['7'],
      comments: [
        {
          id: 'c1',
          authorShopNo: '7',
          authorName: 'সামসুল হুদা',
          content: 'সুন্দর কালেকশন! চালের গুদামের সামনে ১টি এলইডি সোলার লাইট লাগাবো, কাল সকালে আসছি।',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
    },
    {
      id: 'fp2',
      authorShopNo: '7',
      authorName: 'সামসুল হুদা',
      authorShopTitle: 'সামসুল হুদা চাউল ভান্ডার ও রাইস মিল',
      category: 'ব্যবসার সম্ভাবনা',
      content: 'আসন্ন মরসুমে বাজারে দূর-দূরান্তের পাইকারি ক্রেতারা আসছেন। মার্কেটের প্রধান গেটে একটি ডিজিটাল গাইডবোর্ড এবং আলোকসজ্জা থাকলে ব্যবসা আরও প্রসারিত হবে।',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      likes: 22,
      likedBy: ['64', '49'],
      comments: [
        {
          id: 'c2',
          authorShopNo: '49',
          authorName: 'মিজান রহমান',
          content: 'চমৎকার আইডিয়া! দোকান নম্বর ও ক্যাটাগরি লেখা থাকলে কাস্টমার সহজেই খুঁজে পাবে।',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
      ],
    },
    {
      id: 'fp3',
      authorShopNo: '49',
      authorName: 'মিজান রহমান',
      authorShopTitle: 'মেসার্স মিজান চাউলের আড়ৎ',
      category: 'সমস্যা ও সংস্কার',
      content: 'রাতের বেলায় উত্তর গলির ড্রেন ও আবর্জনা ফেলার বিন পরিস্কার রাখা দরকার। পাহারাদার ভাইদের সহায়তায় রাতের বর্জ্য সঠিক স্থানে ফেলার জন্য ব্যবসায়ীদের আহ্বান জানাচ্ছি।',
      createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      likes: 11,
      likedBy: ['64'],
      comments: [],
    },
  ]);

  // Social Feed Composer State
  const [postText, setPostText] = useState('');
  const [postCategory, setPostCategory] = useState<'সমস্যা ও সংস্কার' | 'ব্যবসার সম্ভাবনা' | 'পণ্যের খবর ও অফার' | 'সাধারণ আলোচনা'>('সাধারণ আলোচনা');
  const [postImageUrl, setPostImageUrl] = useState('');
  const [postVideoUrl, setPostVideoUrl] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [postCommentInputs, setPostCommentInputs] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateFeedPost = () => {
    if (!currentMerchant) {
      onOpenMerchantAuth();
      return;
    }
    if (!postText.trim()) {
      showToast('অনুগ্রহ করে কিছু লিখুন!');
      return;
    }

    const newPost: SocialFeedPost = {
      id: 'fp_' + Date.now(),
      authorShopNo: currentMerchant.shopNo,
      authorName: currentMerchant.ownerName,
      authorShopTitle: currentMerchant.shopTitle || `দোকান #${currentMerchant.shopNo}`,
      category: postCategory,
      content: postText.trim(),
      imageUrl: postImageUrl.trim() || undefined,
      videoUrl: postVideoUrl.trim() || undefined,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: [],
    };

    setFeedPosts([newPost, ...feedPosts]);
    setPostText('');
    setPostImageUrl('');
    setPostVideoUrl('');
    setShowMediaInput(false);
    showToast('আপনার পোস্ট সফলভাবে ওয়ালে প্রকাশিত হয়েছে!');
  };

  const handleToggleLikePost = (postId: string) => {
    if (!currentMerchant) {
      onOpenMerchantAuth();
      return;
    }

    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = p.likedBy.includes(currentMerchant.shopNo);
          if (hasLiked) {
            return {
              ...p,
              likes: Math.max(0, p.likes - 1),
              likedBy: p.likedBy.filter((s) => s !== currentMerchant.shopNo),
            };
          } else {
            return {
              ...p,
              likes: p.likes + 1,
              likedBy: [...p.likedBy, currentMerchant.shopNo],
            };
          }
        }
        return p;
      })
    );
  };

  const handleAddPostComment = (postId: string) => {
    if (!currentMerchant) {
      onOpenMerchantAuth();
      return;
    }
    const text = postCommentInputs[postId]?.trim();
    if (!text) return;

    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: 'c_' + Date.now(),
                authorShopNo: currentMerchant.shopNo,
                authorName: currentMerchant.ownerName,
                content: text,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        return p;
      })
    );

    setPostCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    showToast('মন্তব্য যুক্ত হয়েছে!');
  };

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
      {/* SECTION 1: Featured Market Photo Slider (Hero Carousel) */}
      <MarketHeroSlider
        onExploreDirectory={() => setActiveTab('CLASSIFIED')}
        onOpenFeed={() => setActiveTab('FEED')}
      />

      {/* SECTION 2: 20-Second Video Speech Slider (President, Key Merchants, My Speech) */}
      <MarketVideoSpeechSlider />

      {/* SECTION 3: Fish & Vegetable Market Exceptional Slider (Photos, Captions & Eye-Catchy Facts) */}
      <FishVegMarketSlider />

      {/* SECTION 4: Grocery Stores Slider with Product List & Infographics */}
      <GroceryStoresSlider />

      {/* SECTION 5: Salon, Beauty Parlors, Groom Dressing & Hannan Bedding Store Advertisement */}
      <SalonBeautyBeddingSection />

      {/* SECTION 6: 3 Computer Shops Slider with Busy Activity Photos & Digital Services */}
      <ComputerShopsSlider />

      {/* SECTION 7: Rod & Cement Depot Advertisement & All Furniture Shops Gallery with Order System */}
      <RodCementFurnitureSection />

      {/* SECTION 8: All Pharmacies Healthcare Slider with Special Services & Medicine Order System */}
      <PharmacyHealthcareSlider />

      {/* SECTION 9: Land Services & Legal Consultant Chamber with AI Voice Text Converter */}
      <LandServicesConsultantSection />

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
              ব্যবসায়ীদের সোশ্যাল পোস্ট ও ওয়াল
            </span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-1.5 py-0.5 rounded">
              ফেসবুক ইন্টারফেস
            </span>
          </div>
          <div className="text-2xl font-black text-sky-400 flex items-baseline gap-2">
            <span>
              {toBengaliNumerals(feedPosts.length)}
            </span>
            <span className="text-xs text-slate-400 font-normal">টি সামাজিক পোস্ট</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
            <span>পোস্ট প্রকাশ ও মত প্রকাশ করুন</span>
            <button
              onClick={() => setActiveTab('FEED')}
              className="text-sky-400 hover:underline font-bold cursor-pointer"
            >
              সোশ্যাল ওয়ালে যান &rarr;
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
          onClick={() => setActiveTab('FEED')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            activeTab === 'FEED'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-sky-400" />
          <span>📱 সামাজিক ফিড ও মতামত ওয়াল (Facebook Style)</span>
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
          onClick={() => setActiveTab('SECURITY')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            activeTab === 'SECURITY'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>ডেভেলপার নিরাপত্তা নির্দেশিকা</span>
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

      {/* TAB 3: FACEBOOK-STYLE MERCHANT SOCIAL FEED & WALL */}
      {activeTab === 'FEED' && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="fixed top-16 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-emerald-300 animate-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Facebook-style Create Post Composer Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md border border-amber-300">
                  {currentMerchant ? currentMerchant.shopNo : <User className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      {currentMerchant ? currentMerchant.ownerName : 'অতিথি ব্যবসায়ী / ভিজিটর'}
                    </h3>
                    {currentMerchant && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30">
                        দোকান #{currentMerchant.shopNo}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {currentMerchant
                      ? (currentMerchant.shopTitle || 'গণি মার্কেট সদস্য')
                      : 'পোস্ট ও সোশ্যাল ফিডে অংশ নিতে সাইন-ইন করুন'}
                  </p>
                </div>
              </div>

              {!currentMerchant && (
                <button
                  onClick={onOpenMerchantAuth}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold shadow-md hover:from-amber-400 hover:to-amber-500 transition cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>ব্যবসায়ী সাইন-ইন</span>
                </button>
              )}
            </div>

            {/* Post Input Textarea */}
            <div className="space-y-2">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                rows={3}
                placeholder={
                  currentMerchant
                    ? `দোকান #${currentMerchant.shopNo} হিসেবে ফেসবুকে যেমন পোস্ট দেন: আপনার নতুন পণ্যের খবর, বাজারের সমস্যা বা ব্যবসার সম্ভাবনা প্রকাশ করুন...`
                    : "প্রথমে 'ব্যবসায়ী সাইন-ইন' করে মনের কথা বা বাজারের আপডেট পোস্ট করুন..."
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition resize-none leading-relaxed"
              ></textarea>

              {/* Category Selector Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10.5px] text-slate-400 font-medium mr-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-400" />
                  বিভাগ:
                </span>
                {(
                  [
                    'সাধারণ আলোচনা',
                    'পণ্যের খবর ও অফার',
                    'ব্যবসার সম্ভাবনা',
                    'সমস্যা ও সংস্কার',
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPostCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition cursor-pointer ${
                      postCategory === cat
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Media Attachments Sub-box */}
              {showMediaInput && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between text-slate-400 font-medium text-[11px]">
                    <span className="flex items-center gap-1 text-amber-300 font-bold">
                      <ImageIcon className="w-3.5 h-3.5" />
                      মিডিয়া (ছবি ও ভিডিও) লিংক সংযোজন
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowMediaInput(false)}
                      className="text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      বন্ধ করুন ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="url"
                      value={postImageUrl}
                      onChange={(e) => setPostImageUrl(e.target.value)}
                      placeholder="ছবি লিংক URL (যেমন: https://...)"
                      className="bg-slate-900 border border-slate-800 text-white text-xs px-3 py-1.5 rounded-lg outline-none focus:border-amber-500"
                    />
                    <input
                      type="url"
                      value={postVideoUrl}
                      onChange={(e) => setPostVideoUrl(e.target.value)}
                      placeholder="ভিডিও/ইউটিউব লিংক URL"
                      className="bg-slate-900 border border-slate-800 text-white text-xs px-3 py-1.5 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  {/* Preset quick image choices */}
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                    <span>প্রিসেট ছবি বেছে নিন:</span>
                    <button
                      type="button"
                      onClick={() => setPostImageUrl('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80')}
                      className="text-amber-400 hover:underline cursor-pointer"
                    >
                      ইলেকট্রনিক্স
                    </button>
                    •
                    <button
                      type="button"
                      onClick={() => setPostImageUrl('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80')}
                      className="text-amber-400 hover:underline cursor-pointer"
                    >
                      চাল ও আড়ৎ
                    </button>
                    •
                    <button
                      type="button"
                      onClick={() => setPostImageUrl('https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&auto=format&fit=crop&q=80')}
                      className="text-amber-400 hover:underline cursor-pointer"
                    >
                      দোকান ও বাজার
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Composer Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowMediaInput(!showMediaInput)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold border border-slate-800 transition cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">ছবি/ভিডিও যুক্ত করুন</span>
                  <span className="sm:hidden">মিডিয়া</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCreateFeedPost}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/40 transition cursor-pointer active:scale-95"
              >
                <span>পোস্ট প্রকাশ করুন</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Facebook Feed Stream Posts */}
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Globe className="w-4 h-4" />
                <span>ব্যবসায়ীদের সর্বশেষ সামাজিক পোস্টসমূহ ({toBengaliNumerals(feedPosts.length)})</span>
              </span>
              <span className="text-[11px] font-normal text-slate-500">লাইভ ওয়াল</span>
            </div>

            {feedPosts.map((post) => {
              const isLikedByMe = currentMerchant ? post.likedBy.includes(currentMerchant.shopNo) : false;

              return (
                <div
                  key={post.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 hover:border-slate-700/80 transition"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-md border border-amber-300/60 shrink-0 text-sm">
                        {post.authorShopNo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-white">{post.authorShopTitle}</h4>
                          <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-md font-semibold border border-slate-700">
                            দোকান #{post.authorShopNo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{post.authorName}</span>
                          <span>•</span>
                          <span>
                            {new Date(post.createdAt).toLocaleTimeString('bn-BD', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/20 shrink-0">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Text Content */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line pt-1">
                    {post.content}
                  </p>

                  {/* Post Attached Media Image */}
                  {post.imageUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 max-h-80 flex items-center justify-center">
                      <img
                        src={post.imageUrl}
                        alt="Post media"
                        className="w-full h-full object-cover max-h-80 hover:scale-102 transition duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Post Attached Video Link */}
                  {post.videoUrl && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-semibold">
                        <Video className="w-4 h-4 text-red-400" />
                        <span>সংযুক্ত ভিডিও ক্লিপ রয়েছে</span>
                      </span>
                      <a
                        href={post.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-amber-400 underline font-bold"
                      >
                        ভিডিও দেখুন &rarr;
                      </a>
                    </div>
                  )}

                  {/* Post Stats & Reactions Bar */}
                  <div className="flex items-center justify-between text-xs text-slate-400 py-2 border-y border-slate-800/80">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      <span>{toBengaliNumerals(post.likes)} জন লাইক করেছেন</span>
                    </span>

                    <span className="text-slate-400 text-[11px]">
                      {toBengaliNumerals(post.comments.length)} টি মন্তব্য
                    </span>
                  </div>

                  {/* Post Action Buttons (Facebook Style) */}
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleToggleLikePost(post.id)}
                      className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        isLikedByMe
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isLikedByMe ? 'text-red-400 fill-red-400' : ''}`} />
                      <span>{isLikedByMe ? 'লাইক দেওয়া হয়েছে' : 'লাইক'}</span>
                    </button>

                    <button
                      type="button"
                      className="py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-sky-400" />
                      <span>মন্তব্য করুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.href);
                          showToast('পোস্টের লিংক কপি করা হয়েছে!');
                        }
                      }}
                      className="py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-amber-400" />
                      <span>শেয়ার</span>
                    </button>
                  </div>

                  {/* Comment Thread List */}
                  <div className="pt-2 space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                    {post.comments.length > 0 && (
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {post.comments.map((comm) => (
                          <div
                            key={comm.id}
                            className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl space-y-1 text-xs"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-amber-400" />
                                <span>{comm.authorName} (দোকান #{comm.authorShopNo})</span>
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {new Date(comm.createdAt).toLocaleTimeString('bn-BD', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <p className="text-slate-200 leading-relaxed pl-5 border-l-2 border-amber-500/40">
                              {comm.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Post Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={postCommentInputs[post.id] || ''}
                        onChange={(e) =>
                          setPostCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddPostComment(post.id);
                        }}
                        placeholder={
                          currentMerchant
                            ? `দোকান #${currentMerchant.shopNo} হিসেবে উত্তর দিন...`
                            : "মন্তব্য করতে 'ব্যবসায়ী সাইন-ইন' করুন..."
                        }
                        className="flex-1 bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddPostComment(post.id)}
                        className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shrink-0 transition cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* Developer Content Manager Modal */}
      <DeveloperContentModal
        isOpen={isDevContentModalOpen}
        onClose={() => setIsDevContentModalOpen(false)}
        initialSectionId={devModalSectionId}
      />
    </div>
  );
};
