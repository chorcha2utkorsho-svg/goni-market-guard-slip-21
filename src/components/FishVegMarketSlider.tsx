import React, { useState, useEffect } from 'react';
import {
  Fish,
  Utensils,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingDown,
  Flame,
  Zap,
  MapPin,
  Tag,
  ThumbsUp,
  Award,
  ArrowRight,
  PhoneCall,
  Info,
} from 'lucide-react';

export interface FishVegVendorItem {
  id: string;
  category: 'fish' | 'veg';
  typeTag: string;
  shopNo: string;
  vendorName: string;
  shopTitle: string;
  itemNames: string;
  priceHighlight: string;
  freshnessScore: number; // 98%, 100%
  imageUrl: string;
  caption: string;
  eyeCatchyFact: string;
  specialBadge: string;
  arrivedTime: string;
  phone: string;
}

const MARKET_ITEMS: FishVegVendorItem[] = [
  {
    id: 'fv1',
    category: 'fish',
    typeTag: 'নদী ও বিলের তাজা মাছ',
    shopNo: '১২',
    vendorName: 'হাজী কাশেম আলী',
    shopTitle: 'কাশেম মৎস্য আড়ৎ ও তাজা মাছ বিতান',
    itemNames: 'পদ্মার তাজা ইলিশ, মেঘনার বোয়াল, দেশি রুই ও তাজা কাতল',
    priceHighlight: 'আজকের ইলিশ পাইকারি ৭৫০-১২০০ টাকা/কেজি',
    freshnessScore: 100,
    imageUrl: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=1200&auto=format&fit=crop&q=80',
    caption: 'প্রতিদিন সকাল ৫টায় চাঁদপুর ও রূপসা থেকে তাজা পদ্মার ইলিশ ও নদীর দেশি মাছ সরাসরি ট্রাকে বাজারে পোঁছায়।',
    eyeCatchyFact: '⚡ আইক্যাচি ফ্যাক্ট: ১টি মাছও বরফজাত করা নয় — পানি ভরা জ্যান্ত ড্রামে জীবিত বোয়াল ও কাতল মাছ লাইভ কেটে দেওয়া হয়!',
    specialBadge: '১০০% জীবিত ও ফরমালিন মুক্ত',
    arrivedTime: 'আজ সকাল ০৫:১৫ মি.',
    phone: '০১৭১২-৩৮৪৯২০',
  },
  {
    id: 'fv2',
    category: 'veg',
    typeTag: 'কৃষকের জৈব খেতের সবজি',
    shopNo: '১৮',
    vendorName: 'আব্দুল জলিল মিয়া',
    shopTitle: 'জলিল ভান্ডার - টাটকা কাঁচাবাজার',
    itemNames: 'দেশি বেগুন, পটল, তাজা লাউ, কচি ফুলকপি, শিম ও কাঁচামরিচ',
    priceHighlight: 'লাল শাক ও পালং শাক মাত্র ২০ টাকা আঁটি',
    freshnessScore: 99,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80',
    caption: 'নরসিংদী ও বগুড়ার খেত থেকে রাত ১২টায় তোলা একদম তাজা শাক-সবজি সকাল ৬টায় সরাসরি খুচরা গ্রাহকদের হাতে।',
    eyeCatchyFact: '🌱 আইক্যাচি ফ্যাক্ট: খেতের শিশিরভেজা সজীব শাক-সবজি! কোনো কোল্ড স্টোরেজ নয় — সরাসরি মোটের ওপর খেতের সুবাস।',
    specialBadge: 'খেত থেকে সরাসরি ২৪ ঘণ্টা তাজা',
    arrivedTime: 'আজ সকাল ০৫:৪৫ মি.',
    phone: '০১৮১৯-৭৪৬৩১৫',
  },
  {
    id: 'fv3',
    category: 'fish',
    typeTag: 'দেশি শিং, পাবদা ও জ্যান্ত মাগুর',
    shopNo: '১৪',
    vendorName: 'মো: মোস্তফা কামাল',
    shopTitle: 'মোস্তফা লাইভ ফিশ অ্যান্ড মৎস্য কর্নার',
    itemNames: 'বিল ও হাওরের তাজা শিং, জ্যান্ত মাগুর, দেশি পাবদা ও চিতল',
    priceHighlight: 'শিং মাছ ৩৫০ টাকা/কেজি (জীবিত অবস্থা)',
    freshnessScore: 100,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&auto=format&fit=crop&q=80',
    caption: 'রোগী ও শিশুদের পুষ্টির জন্য একদম জ্যান্ত দেশি মাছের নিশ্চিত ঠাঁই। কাস্টমার নিজে দেখে জ্যান্ত মাছ নির্বাচন করেন।',
    eyeCatchyFact: '🩸 আইক্যাচি ফ্যাক্ট: পানি থেকে তুলে বাকেটে নিয়ে বাড়ি যাওয়া পর্যন্ত মাছ জীবিত থাকে — কোনো কেমিক্যাল নেই!',
    specialBadge: 'রোগীদের জন্য আদর্শ পুষ্টিকর',
    arrivedTime: 'আজ সকাল ০৬:০০ মি.',
    phone: '০১৯১১-২২৩৪৫৬',
  },
  {
    id: 'fv4',
    category: 'veg',
    typeTag: 'পাহাড় ও সমতলের তাজা ফল-সবজি',
    shopNo: '২২',
    vendorName: 'সোহেল রানা',
    shopTitle: 'সোহেল গ্রীন ভেজিটেবলস ও মসলা কর্নার',
    itemNames: 'দেশি লাল টমেটো, দেশি আলু, দেশি রসুন, আদা ও গাজর',
    priceHighlight: 'পাহাড়ি তাজা আদা ও মিষ্টি কুমড়া পাইকারি রেট',
    freshnessScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=1200&auto=format&fit=crop&q=80',
    caption: 'পাহাড়ি ও গ্রামীণ হাট থেকে সংগৃহীত অর্গানিক মসলা ও তাজা সবজি। গণি মার্কেটের ২২ নম্বর স্টলে বিশেষ পাইকারি মূল্য।',
    eyeCatchyFact: '🔥 আইক্যাচি ফ্যাক্ট: প্রতিটি টমেটো ও সবজি কিচেন টেস্টে ১০০% তাজা প্রমাণিত — প্রতি কেজিতে ৫ টাকা ছাড়!',
    specialBadge: 'সেরা পাইকারি বাজার মূল্য',
    arrivedTime: 'আজ সকাল ০৬:২০ মি.',
    phone: '০১৬৭৮-৯০১২৩৪',
  },
  {
    id: 'fv5',
    category: 'fish',
    typeTag: 'সাগরের রূপচাঁদা ও সামুদ্রিক কোরাল',
    shopNo: '০৯',
    vendorName: 'আনোয়ার হোসেন (বাচ্চু)',
    shopTitle: 'বাচ্চু সী-ফিশ অ্যান্ড ড্রাইড ফিশ কর্নার',
    itemNames: 'কক্সবাজারের তাজা রূপচাঁদা, ভেটকি, কোরাল ও চিংড়ি',
    priceHighlight: 'বড় গলদা ও বাগদা চিংড়ি ৮৫০ টাকা/কেজি',
    freshnessScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=1200&auto=format&fit=crop&q=80',
    caption: 'সাগরের বিশেষ কোরাল ও রূপচাঁদা মাছ সরাসরি আইস-বক্সে সুরক্ষার মাধ্যমে গণি মার্কেটে আমদানি করা হয়।',
    eyeCatchyFact: '🌊 আইক্যাচি ফ্যাক্ট: সামুদ্রিক অরিজিনাল সাধ্যের মধ্যে — প্রোটিন ও ওমেগা-৩ সমৃদ্ধ প্রিমিয়াম কোয়ালিটি!',
    specialBadge: 'কক্সবাজার থেকে সরাসরি আমদানিকৃত',
    arrivedTime: 'আজ সকাল ০৫:৩০ মি.',
    phone: '০১৭৫৫-৮৮৭৭৬৬',
  },
];

export const FishVegMarketSlider: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'fish' | 'veg'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const filteredItems = MARKET_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const activeItem = filteredItems[currentIndex % filteredItems.length] || MARKET_ITEMS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
      }, 6000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, filteredItems.length]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-900/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl space-y-0 group">
      {/* Eye-catching Top Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-cyan-950 px-5 py-4 border-b border-emerald-800/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/60 shrink-0">
            <Fish className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>মাছ ও কাঁচাবাজারের জমজমাট গলি</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  ১০\%$ তাজা গ্যারান্টি
                </span>
              </h3>
            </div>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              প্রতিটি মাছ ও সবজি বিক্রেতার তাজা ছবি, স্টল নম্বর ও বিষমুক্ত আইক্যাচি ফ্যাক্টস
            </p>
          </div>
        </div>

        {/* Category Filters Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-emerald-800/40 shrink-0 self-start md:self-auto">
          <button
            onClick={() => {
              setFilter('all');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>সব পণ্য</span>
          </button>

          <button
            onClick={() => {
              setFilter('fish');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filter === 'fish'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Fish className="w-3.5 h-3.5" />
            <span>তাজা মাছের আড়ৎ</span>
          </button>

          <button
            onClick={() => {
              setFilter('veg');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filter === 'veg'
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>খেতের কাঁচাবাজার</span>
          </button>
        </div>
      </div>

      {/* Exceptional Visual Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: High Resolution Photo Stage */}
        <div className="lg:col-span-7 relative h-[320px] sm:h-[400px] bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src={activeItem.imageUrl}
            alt={activeItem.vendorName}
            className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

          {/* Floating Badges on Photo */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 shadow-lg border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{activeItem.specialBadge}</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>আগমন: {activeItem.arrivedTime}</span>
            </span>
          </div>

          {/* Freshness Score Badge */}
          <div className="absolute top-4 right-4 z-20 bg-slate-950/90 border border-emerald-500/50 p-2.5 rounded-2xl backdrop-blur-md text-center shadow-xl">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">তাজাত্বের মান</div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              {activeItem.freshnessScore}%
            </div>
          </div>

          {/* Photo Bottom Caption Tag */}
          <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md shadow-2xl space-y-1">
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              <span className="text-amber-400 font-bold mr-1.5">📷 দৃশ্যমান ছবি:</span>
              {activeItem.caption}
            </p>
          </div>

          {/* Arrow Controllers */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Vendor Details & Eye-Catchy Fact Card */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-slate-900 border-t lg:border-t-0 lg:border-l border-emerald-900/40 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            {/* Header Tag & Shop Number */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {activeItem.typeTag}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-amber-500 text-slate-950">
                  দোকান #{activeItem.shopNo}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 font-mono">
                আইটেম {currentIndex + 1} / {filteredItems.length}
              </span>
            </div>

            {/* Shop Title & Vendor Name */}
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                {activeItem.shopTitle}
              </h4>
              <p className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>মালিক: {activeItem.vendorName} (উত্তর কাঁচাবাজার গলি)</span>
              </p>
            </div>

            {/* Items Included */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
              <span className="text-slate-400 font-semibold block text-[11px]">উপলব্ধ তাজা সামগ্রী:</span>
              <p className="text-emerald-300 font-bold leading-snug">{activeItem.itemNames}</p>
            </div>

            {/* Price Ticker Highlight */}
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <Tag className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-emerald-300 font-semibold block">আজকের বিশেষ মূল্য:</span>
                  <span className="text-white font-extrabold">{activeItem.priceHighlight}</span>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-1 rounded-lg shrink-0">
                সাশ্রয়ী রেট
              </span>
            </div>

            {/* Eye-Catchy Fact Highlight Box (VERY IMPORTANT REQUIREMENT) */}
            <div className="p-3.5 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-l-4 border-amber-400 rounded-r-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                <Flame className="w-4 h-4 text-amber-400 animate-bounce shrink-0" />
                <span>আইক্যাচি ফ্যাক্ট ও হাইলাইটস:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {activeItem.eyeCatchyFact}
              </p>
            </div>
          </div>

          {/* Footer Contact & Quick Action */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <a
              href={`tel:${activeItem.phone}`}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 font-bold transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeItem.phone}</span>
            </a>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
            >
              <span>পরবর্তী স্টল দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          {filteredItems.map((item, idx) => {
            const isSelected = idx === currentIndex % filteredItems.length;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>
                  {item.category === 'fish' ? '🐟' : '🥬'} দোকান #{item.shopNo}
                </span>
                <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">
                  ({item.vendorName})
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-emerald-400/90 font-semibold shrink-0 hidden md:flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>দৈনিক তাজা ইনভেন্টরি আপডেট</span>
        </div>
      </div>
    </div>
  );
};
