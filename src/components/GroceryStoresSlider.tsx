import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Award,
  PhoneCall,
  Store,
  MapPin,
  Flame,
  Zap,
  TrendingUp,
  Percent,
  Layers,
  ArrowRight,
  Package,
  Droplet,
  Wheat,
  Coffee,
} from 'lucide-react';

export interface GroceryProductItem {
  name: string;
  badge: string;
  badgeColor: string;
  price: string;
  discount: string;
  purityScore: number; // e.g. 100%
  iconType: 'oil' | 'ghee' | 'rice' | 'spice' | 'honey' | 'snack';
}

export interface GroceryStoreItem {
  id: string;
  shopNo: string;
  ownerName: string;
  shopTitle: string;
  locationTag: string;
  phone: string;
  imageUrl: string;
  caption: string;
  specialityHighlight: string;
  infographicProducts: GroceryProductItem[];
  weeklyOffer: string;
}

const GROCERY_STORES: GroceryStoreItem[] = [
  {
    id: 'g1',
    shopNo: '০৫',
    ownerName: 'হাজী মোবারক হোসেন',
    shopTitle: 'মোবারক জেনারেল ও কিচেন মুদি ভান্ডার',
    locationTag: 'প্রধান গেট সংলগ্ন, দোকান #০৫',
    phone: '০১৭১১-৯৮৭৬৫৪',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&auto=format&fit=crop&q=80',
    caption: 'গণি মার্কেটের অন্যতম প্রাচীন ও বিশ্বস্ত মুদির দোকান। নিত্যপ্রয়োজনীয় অর্গানিক তেল, ঘি ও ভোজ্যপণ্যের সমাহার।',
    specialityHighlight: 'ঘানি ভাঙা ১০০% খাঁটি কাঠের সরিষার তেল ও পাবনার গাওয়া ঘি-এর বিশ্বস্ত আড়ৎ!',
    weeklyOffer: '৫০ কেজি চালের বস্তায় ১০০ টাকা ক্যাশব্যাক অফার!',
    infographicProducts: [
      {
        name: 'কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল',
        badge: '১০০% ভেজালমুক্ত ঘানি',
        badgeColor: 'bg-amber-500 text-slate-950',
        price: '২৪০ টাকা/লিটার',
        discount: '১০% ছাড়',
        purityScore: 100,
        iconType: 'oil',
      },
      {
        name: 'পাবনার অরিজিনাল দেশি গাওয়া ঘি',
        badge: 'অর্গানিক প্রিমিয়াম',
        badgeColor: 'bg-emerald-500 text-slate-950',
        price: '১৪০০ টাকা/কেজি',
        discount: 'বিশেষ আড়ৎ দর',
        purityScore: 99,
        iconType: 'ghee',
      },
      {
        name: 'সুন্দরবনের একাফুলের প্রাকৃতিক মধু',
        badge: 'প্রাকৃতিক ও তাজা',
        badgeColor: 'bg-yellow-500 text-slate-950',
        price: '৮৫০ টাকা/কেজি',
        discount: '৫% ক্যাশব্যাক',
        purityScore: 100,
        iconType: 'honey',
      },
      {
        name: 'প্যাকেটজাত প্রিমিয়াম লাল মসুর ডাল',
        badge: 'ফাইন গ্রেড এ',
        badgeColor: 'bg-red-500 text-white',
        price: '১৩০ টাকা/কেজি',
        discount: 'পাইকারি রেট',
        purityScore: 98,
        iconType: 'snack',
      },
    ],
  },
  {
    id: 'g2',
    shopNo: '১১',
    ownerName: 'মো: জহিরুল ইসলাম',
    shopTitle: 'বিসমিল্লাহ ডিপার্টমেন্টাল ও গ্রোসারিজ',
    locationTag: 'দক্ষিণ গলি, দোকান #১১',
    phone: '০১৮১২-৩৪৫৬৭৮',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    caption: 'আধুনিক ডিসপ্লে র‍্যাক সম্বলিত স্বনামধন্য মুদি শপ। এখানে প্যাকেটজাত ড্রাই ফ্রুটস, মসলা ও স্ন্যাকস সুলভ মূল্যে পাওয়া যায়।',
    specialityHighlight: 'ইম্পোর্টেড ড্রাই ফ্রুটস, কাযু বাদাম, খেজুরি ও অর্গানিক সুগন্ধি মসলা কর্নার!',
    weeklyOffer: '৩ কেজি সয়াবিন তেলে ১টি ফ্রি প্লাস্টিক কন্টেইনার!',
    infographicProducts: [
      {
        name: 'সৌদি অরিজিনাল মরিয়ম খেজুর',
        badge: 'আমদানিকৃত প্রিমিয়াম',
        badgeColor: 'bg-amber-500 text-slate-950',
        price: '৯৫০ টাকা/কেজি',
        discount: '১২% ছাড়',
        purityScore: 100,
        iconType: 'snack',
      },
      {
        name: 'কাযু বাদাম ও পেস্তা বাদাম কম্বো',
        badge: 'হেলথি সুপারফুড',
        badgeColor: 'bg-teal-500 text-slate-950',
        price: '১২৫০ টাকা/কেজি',
        discount: 'কম্বো স্পেশাল',
        purityScore: 98,
        iconType: 'snack',
      },
      {
        name: 'রাঁধুনী স্পেশাল গুঁড়া মসলা সেট',
        badge: 'ফ্রেশ প্যাক',
        badgeColor: 'bg-sky-500 text-slate-950',
        price: '২৪০ টাকা/প্যাক',
        discount: 'ফিক্সড পাইকারি',
        purityScore: 99,
        iconType: 'spice',
      },
      {
        name: 'ফর্টিফাইড ভিটা প্লাস সয়াবিন তেল',
        badge: 'ভিটামিন এ ও ডি',
        badgeColor: 'bg-amber-400 text-slate-950',
        price: '১৮০ টাকা/লিটার',
        discount: 'কোম্পানি রেট',
        purityScore: 100,
        iconType: 'oil',
      },
    ],
  },
  {
    id: 'g3',
    shopNo: '১৫',
    ownerName: 'হাজী মতিউর রহমান',
    shopTitle: 'রহমানিয়া সুপার গ্রোসারিজ ও পাইকারি মুদি',
    locationTag: 'উত্তর গলি, দোকান #১৫',
    phone: '০১৯২৩-৪৫N৮৯০',
    imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=1200&auto=format&fit=crop&q=80',
    caption: 'বৃহত্তর চাল, ডাল, চিনি, আটা ও ময়দার প্রধান পাইকারি পয়েন্ট। পরিবার ও হোটেলের জন্য পাইকারি সাপ্লাই দেওয়া হয়।',
    specialityHighlight: 'দিনাজপুরের সুগন্ধি কাটারীভোগ চাল ও কুষ্টিয়ার মিনিকেট চালের ১ নম্বর পাইকারি সেন্টার!',
    weeklyOffer: '১০ কেজি আটা প্যাকের সাথে ১ কেজি লবণ ফ্রি!',
    infographicProducts: [
      {
        name: 'প্রিমিয়াম কাটারীভোগ সুগন্ধি চাল',
        badge: '১ নম্বর ফাইন রাইস',
        badgeColor: 'bg-amber-500 text-slate-950',
        price: '৮৮ টাকা/কেজি',
        discount: 'বস্তা ডিসকাউন্ট',
        purityScore: 100,
        iconType: 'rice',
      },
      {
        name: 'অর্গানিক লাল গম থেকে তৈরি আটা',
        badge: 'ফাইবার সমৃদ্ধ',
        badgeColor: 'bg-amber-600 text-white',
        price: '৫৫ টাকা/কেজি',
        discount: 'বিশেষ ছাড়',
        purityScore: 98,
        iconType: 'rice',
      },
      {
        name: 'দেশি দানা চিনি ও কেমিক্যালমুক্ত গুড়',
        badge: 'বিশুদ্ধ দেশি',
        badgeColor: 'bg-emerald-500 text-slate-950',
        price: '১২৫ টাকা/কেজি',
        discount: 'পাইকারি আড়ৎ দর',
        purityScore: 99,
        iconType: 'snack',
      },
      {
        name: 'আইওডিন যুক্ত আয়োডাইজড ক্রিস্টাল লবণ',
        badge: '১০০% বিশুদ্ধ লবণ',
        badgeColor: 'bg-sky-400 text-slate-950',
        price: '৩৮ টাকা/কেজি',
        discount: 'ব্যান্ডেল প্যাক',
        purityScore: 100,
        iconType: 'snack',
      },
    ],
  },
  {
    id: 'g4',
    shopNo: '২৭',
    ownerName: 'কামরুল হাসান',
    shopTitle: 'মা-বাবার দোয়া ট্রেডার্স ও গ্রোসারিজ',
    locationTag: 'কেন্দ্রীয় চত্বর, দোকান #২৭',
    phone: '০১৫৫৫-৬৬৭৭৮৮',
    imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&auto=format&fit=crop&q=80',
    caption: 'প্রতিদিনের টিফিন, স্ন্যাকস, চা-পাতা, গুড়া দুধ ও গৃহস্থালী কিচেন সামগ্রীর অন্যতম সেরা মুদি শপ।',
    specialityHighlight: 'শ্রীমঙ্গলের ব্ল্যাক টি ও অরিজিনাল ফুল ক্রিম মিল্ক পাউডারের সেরা শপ!',
    weeklyOffer: '১ কেজি ইস্পাহানি মির্জাপুর চা-পাতায় বিশেষ মগ ফ্রি!',
    infographicProducts: [
      {
        name: 'শ্রীমঙ্গলের স্পেশাল ব্ল্যাক টি প্রিমিয়াম',
        badge: 'গাঢ় লিকার ও স্বাদ',
        badgeColor: 'bg-amber-500 text-slate-950',
        price: '৪৭০ টাকা/কেজি',
        discount: '১০% ছাড়',
        purityScore: 100,
        iconType: 'snack',
      },
      {
        name: 'নিউজিল্যান্ডের ফুল ক্রিম গুঁড়া দুধ',
        badge: 'ক্যালসিয়াম সমৃদ্ধ',
        badgeColor: 'bg-cyan-500 text-slate-950',
        price: '৮৬০ টাকা/কেজি',
        discount: 'ফ্রি অফার',
        purityScore: 99,
        iconType: 'snack',
      },
      {
        name: 'সিলেটের খাঁটি গোলমরিচ ও লবঙ্গ',
        badge: 'সুগন্ধি মসলা',
        badgeColor: 'bg-violet-500 text-white',
        price: '১২০০ টাকা/কেজি',
        discount: 'আড়ৎ মূল্যে',
        purityScore: 98,
        iconType: 'spice',
      },
      {
        name: 'অর্গানিক নারকেল তেল ও অলিভ অয়েল',
        badge: 'প্রাকৃতিক ময়েশ্চার',
        badgeColor: 'bg-emerald-400 text-slate-950',
        price: '৩৫০ টাকা/বোতল',
        discount: 'বিশেষ উপহার',
        purityScore: 100,
        iconType: 'oil',
      },
    ],
  },
];

export const GroceryStoresSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentStore = GROCERY_STORES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GROCERY_STORES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GROCERY_STORES.length) % GROCERY_STORES.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 7000); // 7 seconds slider
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentIndex]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-amber-800/50 bg-slate-950 shadow-2xl space-y-0 group">
      {/* Top Section Header */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 px-5 py-4 border-b border-amber-800/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-950/80 shrink-0">
            <ShoppingBag className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>বাজারের স্বনামধন্য মুদির দোকান ও বিশেষ পণ্য ইনফোগ্রাফি</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                ইনফোগ্রাফিক ভিউ
              </span>
            </h3>
            <p className="text-xs text-amber-200/80 mt-0.5">
              মুদি দোকানসমূহের তাজা ফটো স্লাইডার ও দারুন ইনফোগ্রাফির মাধ্যমে বিশেষ পণ্যের তালিকা
            </p>
          </div>
        </div>

        {/* Store Navigator Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-amber-800/40 overflow-x-auto shrink-0">
          {GROCERY_STORES.map((store, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={store.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white bg-slate-950/60'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>দোকান #{store.shopNo}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Photo Carousel + Right Product Infographic Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Grocery Store Photo Showcase */}
        <div className="lg:col-span-5 relative h-[300px] sm:h-[380px] lg:h-auto min-h-[350px] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={currentStore.imageUrl}
            alt={currentStore.shopTitle}
            className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

          {/* Shop Number Badge on Image */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-amber-500 text-slate-950 shadow-lg border border-amber-300 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-slate-950" />
              <span>দোকান নম্বর: #{currentStore.shopNo}</span>
            </span>

            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-slate-950/80 text-amber-300 border border-slate-700 backdrop-blur-md">
              {currentIndex + 1} / {GROCERY_STORES.length}
            </span>
          </div>

          {/* Weekly Offer Banner Overlay */}
          <div className="absolute bottom-16 left-4 right-4 z-20 bg-amber-500/20 border border-amber-500/50 p-2.5 rounded-xl backdrop-blur-md flex items-center justify-between text-xs text-amber-200">
            <span className="font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>সাপ্তাহিক অফার:</span>
            </span>
            <span className="font-extrabold text-white">{currentStore.weeklyOffer}</span>
          </div>

          {/* Shop Name & Owner Caption Overlay */}
          <div className="absolute bottom-3 left-4 right-4 z-20 bg-slate-950/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md shadow-2xl space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
              {currentStore.shopTitle}
            </h4>
            <p className="text-[11px] text-amber-300 font-medium">
              মালিক: {currentStore.ownerName} • {currentStore.locationTag}
            </p>
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
            title="আগের মুদির দোকান"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
            title="পরের মুদির দোকান"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Column: Infographic Special Products Dashboard */}
        <div className="lg:col-span-7 p-5 sm:p-6 bg-slate-900 border-t lg:border-t-0 lg:border-l border-amber-900/40 flex flex-col justify-between space-y-5">
          {/* Infographic Header */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  দোকানের সেরা স্পেশাল পণ্যসমূহ (Infographic List)
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {currentStore.shopTitle}
                </h4>
              </div>

              <a
                href={`tel:${currentStore.phone}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-amber-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-bold transition self-start sm:self-auto"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentStore.phone}</span>
              </a>
            </div>

            {/* Speciality Highlight Box */}
            <div className="p-3 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl space-y-0.5">
              <span className="text-[11px] text-amber-400 font-bold block flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                বিশেষ পরিচিতি ও স্পেশালিটি:
              </span>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {currentStore.specialityHighlight}
              </p>
            </div>
          </div>

          {/* 4-Grid Infographic Product Display Cards */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>বিশেষ পণ্যের তালিকা ইনফোগ্রাফি:</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                ১০০% বিশুদ্ধতা পরীক্ষার রেটিং সহ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStore.infographicProducts.map((prod, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 p-3.5 rounded-xl space-y-2.5 transition group/prod hover:shadow-lg hover:shadow-amber-950/30"
                >
                  {/* Top Badge & Purity Score */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold shadow-sm ${prod.badgeColor}`}
                    >
                      {prod.badge}
                    </span>

                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>বিশুদ্ধতা: {prod.purityScore}%</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h5 className="text-xs font-bold text-white leading-snug group-hover/prod:text-amber-300 transition">
                    {prod.name}
                  </h5>

                  {/* Price & Infographic Bar */}
                  <div className="pt-1 border-t border-slate-900 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">মূল্য রেট:</span>
                      <span className="font-extrabold text-amber-300 font-mono">
                        {prod.price}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {prod.discount}
                      </span>
                    </div>
                  </div>

                  {/* Infographic Visual Bar */}
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      style={{ width: `${prod.purityScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>প্রতিদিন তাজা অর্গানিক সামগ্রী সরবরাহ</span>
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
            >
              <span>পরবর্তী মুদির দোকান</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
