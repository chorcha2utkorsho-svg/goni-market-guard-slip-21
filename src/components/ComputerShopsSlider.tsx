import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Cpu,
  Printer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Store,
  MapPin,
  Clock,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  FileText,
  Camera,
  Layers,
  ArrowRight,
  HardDrive,
  Users,
  Award,
} from 'lucide-react';

export interface ComputerServiceItem {
  title: string;
  priceTag: string;
  badge: string;
}

export interface ComputerShopItem {
  id: string;
  shopNo: string;
  shopTitle: string;
  ownerName: string;
  locationTag: string;
  phone: string;
  imageUrl: string;
  busyCaption: string;
  busyStatText: string;
  technicianCount: string;
  services: ComputerServiceItem[];
  speciality: string;
}

const COMPUTER_SHOPS: ComputerShopItem[] = [
  {
    id: 'c1',
    shopNo: '০৭',
    shopTitle: 'ডিজিটাল আইটি সমাধান ও কম্পিউটার ফটো স্টুডিও',
    ownerName: 'প্রকৌশলী মো: তারেক হাসান',
    locationTag: 'দ্বিতীয় তলা, দোকান #০৭',
    phone: '০১৭১৩-৫৫৬৬৭৭',
    imageUrl: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1200&auto=format&fit=crop&q=80',
    busyCaption: 'প্রতিদিন সকাল থেকে তরুণ কারিগররা অনলাইনে আবেদন, গ্রাফিক্স ডিজাইন, পাসপোর্ট ছবি ও আইডি কার্ড প্রসেসিংয়ে ব্যস্ত থাকেন।',
    busyStatText: 'দৈনিক ১৫০+ কাস্টমারের অনলাইন ফরম ও ডিজিটাল সেবা',
    technicianCount: '৪ জন অভিজ্ঞ আইটি টেকনিশিয়ান',
    speciality: 'সব ধরনের সরকারি চাকুরীর অনলাইন ফরম ফিলআপ, দ্রুত পাসপোর্ট সাইজ ছবি ও রঙিন প্রিন্ট সাপোর্ট!',
    services: [
      { title: 'অনলাইন ফরম ফিলআপ ও চাকুরীর আবেদন', priceTag: '৫০-১০০ টাকা', badge: 'ইনস্ট্যান্ট প্রসেসিং' },
      { title: 'জরুরী পাসপোর্ট সাইজ ছবি ও লেমিনেশন', priceTag: '৫০ টাকা (৪ কপি)', badge: '৫ মিনিটে তৈরি' },
      { title: 'এইচডি স্ক্যান ও হাই-স্পিড কালার প্রিন্ট', priceTag: '১০ টাকা/পৃষ্ঠা', badge: 'লেজার কোয়ালিটি' },
      { title: 'জন্ম নিবন্ধন, জাতীয় পরিচয়পত্র ও কার্ড প্রিন্ট', priceTag: '৫০ টাকা', badge: 'সরকারী ফরম্যাট' },
    ],
  },
  {
    id: 'c2',
    shopNo: '০৮',
    shopTitle: 'গণি টেক কম্পিউটার ওয়ার্ল্ড ও হার্ডওয়্যার ল্যাব',
    ownerName: 'ইঞ্জিনিয়ার রেজওয়ান আহমেদ',
    locationTag: 'দ্বিতীয় তলা, দোকান #০৮',
    phone: '০১৮১৮-৪৪৩২৩২',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1200&auto=format&fit=crop&q=80',
    busyCaption: 'ল্যাপটপ-ডেস্কটপ মাদারবোর্ড সার্ভিসিং, র‍্যাম/এসএসডি আপগ্রেড এবং উইন্ডোজ ইন্সটলেশনের জন্য সারাদিন কাস্টমারের ভিড় থাকে।',
    busyStatText: 'প্রতি মাসে ২০০+ ল্যাপটপ ও কম্পিউটার হার্ডওয়্যার মেরামতের বিশ্বস্ত ল্যাব',
    technicianCount: '৩ জন সার্টিফাইড হার্ডওয়্যার এক্সপার্ট',
    speciality: 'ল্যাপটপ ও কম্পিউটারের স্লো সমস্যা সমাধান, ডেটা রিকভারি ও আসল উইন্ডোজ সেটআপ ল্যাব!',
    services: [
      { title: 'ল্যাপটপ ও পিসি হার্ডওয়্যার রিপেয়ারিং', priceTag: '৩০০ টাকা থেকে', badge: '১০০% সার্ভিস গ্যারান্টি' },
      { title: 'হাই-স্পিড NVMe SSD ও RAM ইনস্টল', priceTag: 'পার্টস রেট অনুযায়ী', badge: 'বিনা মূল্যে ফিটিং' },
      { title: 'উইন্ডোজ ১১/১০ ও অ্যান্টিভাইরাস সেটআপ', priceTag: '২০০ টাকা', badge: 'অরিজিনাল লাইসেন্স' },
      { title: 'হার্ডডিস্ক ডেটা রিকভারি ও ভাইরাস ক্লিন', priceTag: '৫০০ টাকা', badge: 'নিরাপদ ডেটা ব্যাকআপ' },
    ],
  },
  {
    id: 'c3',
    shopNo: '০৯',
    shopTitle: 'আইটি ভিশন সিসিটিভি ক্যামেরা ও কম্পিউটার হাব',
    ownerName: 'মো: শরিফুল ইসলাম (রানা)',
    locationTag: 'দ্বিতীয় তলা, দোকান #০৯',
    phone: '০১৯১২-৯৯৮৮৭৭',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    busyCaption: 'দোকানের টেকনিশিয়ানরা বাজারের বিভিন্ন স্টল ও বাসাবাড়ির জন্য নাইট ভিশন সিসিটিভি ক্যামেরা ও আইপিএস ব্যাকআপ টেস্ট করছেন।',
    busyStatText: 'গণি মার্কেটের ৯০% স্টলের সিসিটিভি সেটআপ ও আইটি নেটওয়ার্ক মেইনটেইনার',
    technicianCount: '৫ জন সিসিটিভি ফিল্ড ইঞ্জিনিয়ার',
    speciality: 'নাইট ভিশন রঙিন সিসিটিভি ক্যামেরা, ওয়াইফাই রাউটার সেটআপ ও সিকিউরিটি সার্ভিস!',
    services: [
      { title: 'HD নাইট ভিশন সিসিটিভি সেটআপ প্যাকেজ', priceTag: '৮,৫০০ টাকা থেকে', badge: 'মোবাইলে দেখা যাবে' },
      { title: 'ওয়াইফাই রাউটার ও নেটওয়ার্ক ক্যাবলিং', priceTag: '১৫০০ টাকা থেকে', badge: 'হাই-স্পিড লিংক' },
      { title: 'অনলাইন ই-কমার্স ও ফেসবুক পেজ বুস্টিং', priceTag: 'বিশেষ প্যাকেজ', badge: 'ডিজিটাল মার্কেটিং' },
      { title: 'অফিস প্রজেক্টর ও সাউন্ড সিস্টেম সেটআপ', priceTag: 'দৈনিক/স্থায়ী ভাড়া', badge: 'প্রফেশনাল সাউন্ড' },
    ],
  },
];

export const ComputerShopsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentShop = COMPUTER_SHOPS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COMPUTER_SHOPS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + COMPUTER_SHOPS.length) % COMPUTER_SHOPS.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 6500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, currentIndex]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-sky-800/50 bg-slate-950 shadow-2xl space-y-0 group">
      {/* Top Header Label */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950/40 to-slate-950 px-5 py-4 border-b border-sky-800/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-sky-950/60 shrink-0">
            <Monitor className="w-5 h-5 text-slate-950 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>ষষ্ঠ সেকশন: ৩টি আইটি ও কম্পিউটার দোকানের স্লাইডার</span>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 font-extrabold px-2.5 py-0.5 rounded-full border border-sky-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                কর্মব্যস্ততার দৃশ্য ও সেবাসমূহ
              </span>
            </h3>
            <p className="text-xs text-sky-200/80 mt-0.5">
              গণি মার্কেটের ৩টি আধুনিক কম্পিউটার শপের লাইভ কাজের ছবি, প্রযুক্তি সেবা ও সার্ভিস চার্জ
            </p>
          </div>
        </div>

        {/* Shop Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-sky-800/40 shrink-0 overflow-x-auto">
          {COMPUTER_SHOPS.map((shop, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={shop.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white bg-slate-950/60'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>দোকান #{shop.shopNo}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Busy Shop Image Carousel + Right Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Busy Shop Atmosphere Photo */}
        <div className="lg:col-span-5 relative h-[320px] sm:h-[380px] lg:h-auto min-h-[350px] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={currentShop.imageUrl}
            alt={currentShop.shopTitle}
            className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-500 text-slate-950 shadow-lg border border-sky-300 flex items-center gap-1">
              <Store className="w-3.5 h-3.5" />
              <span>দোকান নম্বর #{currentShop.shopNo}</span>
            </span>

            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentShop.technicianCount}</span>
            </span>
          </div>

          {/* Busy Activity Stat Box */}
          <div className="absolute bottom-20 left-4 right-4 z-20 bg-slate-950/90 border border-sky-500/40 p-2.5 rounded-xl backdrop-blur-md flex items-center gap-2 text-xs text-sky-200">
            <Award className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-bold">{currentShop.busyStatText}</span>
          </div>

          {/* Caption Overlay */}
          <div className="absolute bottom-3 left-4 right-4 z-20 bg-slate-950/95 border border-slate-800 p-3 rounded-xl backdrop-blur-md shadow-2xl space-y-1">
            <h4 className="text-xs font-extrabold text-white truncate">
              📷 কর্মব্যস্ততার সরাসরি দৃশ্য:
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentShop.busyCaption}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-sky-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
            title="আগের দোকান"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-sky-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
            title="পরের দোকান"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Column: Detailed Services & Contact Card */}
        <div className="lg:col-span-7 p-5 sm:p-6 bg-slate-900 border-t lg:border-t-0 lg:border-l border-sky-900/40 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            {/* Header Title & Phone */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
                  কম্পিউটার ও আইটি সেবা কেন্দ্র
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {currentShop.shopTitle}
                </h4>
                <p className="text-xs text-amber-300 font-bold mt-0.5">
                  সত্ত্বাধিকারী: {currentShop.ownerName} • {currentShop.locationTag}
                </p>
              </div>

              <a
                href={`tel:${currentShop.phone}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-sky-300 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 font-bold transition self-start sm:self-auto shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentShop.phone}</span>
              </a>
            </div>

            {/* Speciality Box */}
            <div className="p-3 bg-sky-500/10 border-l-4 border-sky-400 rounded-r-xl space-y-0.5 text-xs">
              <span className="text-[11px] text-sky-300 font-bold block flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-sky-400" />
                প্রধান বৈশিষ্ট্য ও বিশেষ সার্ভিস:
              </span>
              <p className="text-slate-200 font-medium leading-relaxed">
                {currentShop.speciality}
              </p>
            </div>

            {/* Services Offered List (Grid) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
                <span className="flex items-center gap-1.5 text-sky-300">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>উপলব্ধ ডিজিটাল ও হার্ডওয়্যার সেবাসমূহ:</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  দ্রুত ও নির্ভরযোগ্য সার্ভিসিং
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentShop.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 hover:border-sky-500/50 p-3 rounded-xl space-y-2 transition group/srv"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {srv.badge}
                      </span>
                      <span className="text-xs font-black text-amber-300 font-mono">
                        {srv.priceTag}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white leading-snug group-hover/srv:text-sky-300 transition flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{srv.title}</span>
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Controller */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>প্রতিদিন সকাল ৯টা থেকে রাত ১০টা পর্যন্ত খোলা</span>
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
            >
              <span>পরবর্তী কম্পিউটার শপ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
