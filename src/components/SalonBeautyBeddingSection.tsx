import React, { useState } from 'react';
import {
  Scissors,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Globe,
  CreditCard,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Crown,
  Heart,
  Store,
  MapPin,
  Send,
  Bed,
  Layers,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  DollarSign,
  X,
  Phone,
  Flame,
  Star,
  Check,
} from 'lucide-react';

export interface SalonBarberItem {
  id: string;
  shopNo: string;
  name: string;
  title: string;
  category: 'groom' | 'bridal' | 'unisex';
  ownerBarber: string;
  phone: string;
  whatsapp: string;
  imo: string;
  facebookUrl: string;
  bkashNagadNo: string;
  imageUrl: string;
  rating: number;
  services: { name: string; price: number; duration: string }[];
}

const SALONS_DATA: SalonBarberItem[] = [
  {
    id: 's1',
    shopNo: '৩২',
    name: 'স্টাইল জোন জেন্টলম্যান সেলুন অ্যান্ড স্পা',
    title: 'আধুনিক চুলকাটা, সেভিং ও পুরুষদের গ্রুমিং সেন্টার',
    category: 'groom',
    ownerBarber: 'উস্তাদ বাবুল বার্বার (১৫ বছরের অভিজ্ঞতা)',
    phone: '০১৭১২-১১২২৩৩',
    whatsapp: '০১৭১২-১১২২৩৩',
    imo: '০১৭১২-১১২২৩৩',
    facebookUrl: 'https://facebook.com/stylezone.gonimarket',
    bkashNagadNo: '০১৭১২-১১২২৩৩ (বিকাশ/নগদ পার্সোনাল)',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1000&auto=format&fit=crop&q=80',
    rating: 4.9,
    services: [
      { name: 'ট্রেন্ডি হেয়ার কাট ও ওয়াশ', price: 120, duration: '২০ মিনিট' },
      { name: 'স্পেশাল ফেস ট্রিম ও হট টাওয়েল সেভ', price: 80, duration: '১৫ মিনিট' },
      { name: 'গোল্ড ফেসিয়াল ও ফেস স্পা', price: 350, duration: '৩০ মিনিট' },
      { name: 'বিবাহের বিশেষ বর সাজ কম্বো প্যাকেজ', price: 1500, duration: '৯০ মিনিট' },
    ],
  },
  {
    id: 's2',
    shopNo: '৩৩',
    name: 'রূপসী বিউটি পার্লার ও ব্রাইডাল মেকওভার',
    title: 'মহিলাদের আধুনিক চুলকাটা, হেয়ার রিবন্ডিং ও মেকআপ',
    category: 'bridal',
    ownerBarber: 'বিউটিশিয়ান সুলতানা বেগম (ব্রাইডাল স্পেশালিস্ট)',
    phone: '০১৮১৯-৯৯৮৮৭৭',
    whatsapp: '০১৮১৯-৯৯৮৮৭৭',
    imo: '০১৮১৯-৯৯৮৮৭৭',
    facebookUrl: 'https://facebook.com/ruposhi.parlor.gonimarket',
    bkashNagadNo: '০১৮১৯-৯৯৮৮৭৭ (বিকাশ মার্চেন্ট)',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&auto=format&fit=crop&q=80',
    rating: 5.0,
    services: [
      { name: 'লেয়ার ও ইউ-কাট হেয়ার স্টাইলিং', price: 250, duration: '৩০ মিনিট' },
      { name: 'অরিজিনাল হেয়ার রিবন্ডিং স্পেশাল', price: 3500, duration: '১৮০ মিনিট' },
      { name: 'পার্টি মেকআপ ও ফেস পলিশ', price: 1200, duration: '৪৫ মিনিট' },
      { name: 'বিবাহের স্পেশাল রাজকীয় কনে/ব্রাইডাল সাজ', price: 4500, duration: '১২০ মিনিট' },
    ],
  },
  {
    id: 's3',
    shopNo: '৩১',
    name: 'রয়েল কাস্টম হেয়ার কাটিং অ্যান্ড বিউটি শপ',
    title: 'দ্রুত চুলকাটা, চুল কালারিং ও মেসেজ সেন্টার',
    category: 'unisex',
    ownerBarber: 'উস্তাদ সঞ্জয় বার্বার',
    phone: '০১৯১১-৪৪৫৫৬৬',
    whatsapp: '০১৯১১-৪৪৫৫৬৬',
    imo: '০১৯১১-৪৪৫৫৬৬',
    facebookUrl: 'https://facebook.com/royalcutting.gonimarket',
    bkashNagadNo: '০১৯১১-৪৪৫৫৬৬ (রকেট/নগদ)',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1000&auto=format&fit=crop&q=80',
    rating: 4.8,
    services: [
      { name: 'ক্লাসিক হেয়ার কাটিং', price: 100, duration: '১৫ মিনিট' },
      { name: 'অর্গানিক কালার ও ডাই', price: 250, duration: '২৫ মিনিট' },
      { name: 'হেড অ্যান্ড শোল্ডার হেড মাসাজ', price: 150, duration: '১৫ মিনিট' },
    ],
  },
];

export const SalonBeautyBeddingSection: React.FC = () => {
  // Booking Modal State
  const [selectedSalon, setSelectedSalon] = useState<SalonBarberItem | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('আজকের জন্য');
  const [bookingTime, setBookingTime] = useState<string>('বিকেল ০৪:০০ মি.');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [advanceTrxId, setAdvanceTrxId] = useState<string>('');
  const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);

  // Hannan Bedding Order Form State
  const [beddingItem, setBeddingItem] = useState<'লেপ' | 'তোষক' | 'জাজিম' | 'বালিশ সেট' | 'বিয়ের সম্পূর্ণ সেট'>('লেপ');
  const [cottonType, setCottonType] = useState<'অরিজিনাল শিমুল তুলা' | 'গারো পাহাড়ি তুলা' | 'অর্গানিক তুলা'>('অরিজিনাল শিমুল তুলা');
  const [beddingSize, setBeddingSize] = useState<'ডাবল (৫x৭ ফিট)' | 'কিং সাইজ (৬x৭ ফিট)' | 'সিঙ্গেল (৪x৭ ফিট)'>('কিং সাইজ (৬x৭ ফিট)');
  const [beddingPhone, setBeddingPhone] = useState<string>('');
  const [beddingNotes, setBeddingNotes] = useState<string>('');
  const [beddingOrdered, setBeddingOrdered] = useState<boolean>(false);

  const handleOpenBooking = (salon: SalonBarberItem) => {
    setSelectedSalon(salon);
    setSelectedService(salon.services[0]?.name || '');
    setBookingSuccessCode(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('অনুগ্রহ করে নাম ও মোবাইল নম্বর লিখুন!');
      return;
    }

    const code = 'GONI-SLOT-' + Math.floor(100000 + Math.random() * 900000);
    setBookingSuccessCode(code);
  };

  const handleOrderBedding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beddingPhone) {
      alert('অনুগ্রহ করে আপনার ফোন নম্বর লিখুন!');
      return;
    }
    setBeddingOrdered(true);
    setTimeout(() => {
      setBeddingOrdered(false);
      setBeddingPhone('');
      setBeddingNotes('');
      alert('হন্নান বেডিং স্টোরে আপনার অর্ডারটি সফলভাবে পৌঁছেছে! আলহাজ্ব মো: হান্নান মিয়া সরাসরি আপনাকে কল করবেন।');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Fifth Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-pink-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-pink-950/60 shrink-0">
            <Scissors className="w-6 h-6 text-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white">
                পঞ্চম সেকশন: সেলুন, বিউটি পার্লার, বর-কনে সাজ ও হন্নান বেডিং স্টোর
              </h2>
              <span className="text-[10.5px] bg-pink-500/20 text-pink-300 font-extrabold px-2.5 py-0.5 rounded-full border border-pink-500/30">
                অগ্রিম সিট বুকিং ও অর্ডার হাব
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              ব্যস্ত সেলুনের নাপিতের সিট বুকিং, ব্রাইডাল মেকওভার এবং হন্নান বেডিং স্টোরের লেপ-তোষকের অর্ডার
            </p>
          </div>
        </div>

        <div className="text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-pink-300 font-bold flex items-center gap-2 self-start md:self-auto shrink-0">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>১০০% কনফার্মড সিট পেমেন্ট গ্যারান্টি</span>
        </div>
      </div>

      {/* Part 1: Salons, Beauty Parlors & Barber Booking Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
          <span className="flex items-center gap-2 text-pink-400 text-sm font-black">
            <Scissors className="w-4 h-4 text-pink-400" />
            <span>১. সেলুন, নাপিত ও বিউটি পার্লার সিট বুকিং হাব ({SALONS_DATA.length}টি মেম্বার শপ)</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            হোয়াটসঅ্যাপ, ইমু ও বিকাশ অগ্রিম পেমেন্ট সুবিধা
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SALONS_DATA.map((salon) => (
            <div
              key={salon.id}
              className="bg-slate-900 border border-slate-800 hover:border-pink-500/50 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-4 transition duration-300 group"
            >
              <div className="space-y-3">
                {/* Salon Image */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={salon.imageUrl}
                    alt={salon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black bg-pink-500 text-slate-950 shadow-md">
                    দোকান #{salon.shopNo}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{salon.rating}</span>
                  </span>

                  <div className="absolute bottom-2 left-3 right-3 text-xs text-white font-bold truncate">
                    {salon.ownerBarber}
                  </div>
                </div>

                {/* Salon Name & Title */}
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-pink-300 transition leading-snug">
                    {salon.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {salon.title}
                  </p>
                </div>

                {/* Services Checklist */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <span className="text-amber-400 font-bold block text-[11px]">সার্ভিস ও রেট:</span>
                  <div className="space-y-1 text-slate-300">
                    {salon.services.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11.5px]">
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{s.name}</span>
                        </span>
                        <span className="font-extrabold text-pink-300 font-mono">
                          ৳{s.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Contact Icons (Phone, WhatsApp, Imo, Facebook) */}
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10.5px] font-bold text-slate-400 block">
                    সরাসরি যোগাযোগ ও সামাজিক লিঙ্ক:
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    <a
                      href={`tel:${salon.phone}`}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-emerald-500/20 text-emerald-400 border border-slate-800 flex flex-col items-center gap-0.5 transition"
                      title="কল দিন"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>কল</span>
                    </a>

                    <a
                      href={`https://wa.me/88${salon.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-emerald-500/20 text-emerald-400 border border-slate-800 flex flex-col items-center gap-0.5 transition"
                      title="হোয়াটসঅ্যাপ মেসেজ"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>হোয়াটসঅ্যাপ</span>
                    </a>

                    <a
                      href={`tel:${salon.imo}`}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-sky-500/20 text-sky-400 border border-slate-800 flex flex-col items-center gap-0.5 transition"
                      title="ইমু বার্তা"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                      <span>ইমু</span>
                    </a>

                    <a
                      href={salon.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-blue-500/20 text-blue-400 border border-slate-800 flex flex-col items-center gap-0.5 transition"
                      title="ফেসবুক পেজ"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      <span>পেজ</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Button: Book Chair & Pay Advance */}
              <button
                onClick={() => handleOpenBooking(salon)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-950/50 transition cursor-pointer active:scale-95"
              >
                <Scissors className="w-4 h-4 text-slate-950" />
                <span>ব্যস্ত সিট বুকিং ও অগ্রিম পেমেন্ট করুন</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: HANNAN BEDDING STORE ADVERTISEMENT BANNER & ORDER SYSTEM */}
      <div className="bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Ad Title & Special Identity */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-xl shrink-0">
              <Bed className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-amber-500 text-slate-950">
                  বিশেষ বাণিজ্যিক বিজ্ঞাপন
                </span>
                <span className="text-xs text-amber-300 font-extrabold">
                  দোকান নম্বর #৪০ (দক্ষিণ ভবন)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                হন্নান বেডিং স্টোর — লেপ, তোষক, জাজিম ও বিছানা সামগ্রী বিতান
              </h2>
              <p className="text-xs text-amber-200/90 font-medium">
                মালিক: আলহাজ্ব মো: হান্নান মিয়া | মোবাইল: ০১৭২৪-৫৮৯৯৩০ (কল ও সরাসরি অর্ডার)
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-amber-500/40 text-right shrink-0">
            <span className="text-[11px] text-amber-400 font-bold block">
              অরিজিনাল শিমুল তুলার নিশ্চয়তা
            </span>
            <span className="text-sm font-black text-white">বিয়ের স্পেশাল তোশক সেট</span>
          </div>
        </div>

        {/* Ad Content & Interactive Order Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Ad Features Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-500/30 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>আমাদের প্রস্তুতকৃত পণ্যের তালিকা ও বৈশিষ্ট্যসমূহ:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="flex items-start gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">হাতে তৈরি শীতের শিমুল তুলার লেপ</span>
                    <span className="text-[11px] text-slate-400">উষ্ণ ও আরামদায়ক শতভাগ খাঁটি তুলা</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">কাস্টম সাইজের তোষক ও জাজিম</span>
                    <span className="text-[11px] text-slate-400">খাট ও খাটিয়ার সঠিক মাপে তৈরি</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">বিয়ের শুভ তোশক ও রেডিমেড সেট</span>
                    <span className="text-[11px] text-slate-400">নবদম্পতির জন্য আকর্ষণীয় তোশক সেট</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">মেডিকেল ফোম ও কোল বালিশ</span>
                    <span className="text-[11px] text-slate-400">মেরুদণ্ডের সুরক্ষায় ডাবল ডেনসিটি ফোম</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Phone & Payment Box */}
            <div className="p-4 bg-gradient-to-r from-amber-500/20 to-slate-950 rounded-2xl border border-amber-500/40 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[11px] text-amber-300 font-bold block">
                  সরাসরি কল করে মাপ ও অর্ডার দিন:
                </span>
                <span className="text-base font-black text-white font-mono">
                  ০১৭২৪-৫৮৯৯৩০ (আলহাজ্ব মো: হান্নান মিয়া)
                </span>
              </div>

              <a
                href="tel:01724589930"
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition"
              >
                <PhoneCall className="w-4 h-4 text-slate-950" />
                <span>সরাসরি কল দিন</span>
              </a>
            </div>
          </div>

          {/* Right: Quick Order Calculator & Request Form */}
          <div className="lg:col-span-5 bg-slate-950 border border-amber-500/40 p-5 rounded-2xl shadow-xl space-y-3.5">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Bed className="w-4 h-4 text-amber-400" />
                <span>অনলাইন লেপ-তোষক অর্ডার ফরম</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                মডেল বেছে নিয়ে তথ্য পাঠালে সরাসরি হন্নান ভাই আপনাকে কল করবেন
              </p>
            </div>

            <form onSubmit={handleOrderBedding} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  পণ্য নির্বাচন করুন:
                </label>
                <select
                  value={beddingItem}
                  onChange={(e) => setBeddingItem(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                >
                  <option value="লেপ">শীতের উষ্ণ লেপ</option>
                  <option value="তোষক">আরামদায়ক তোষক</option>
                  <option value="জাজিম">হেভি ডিউটি জাজিম</option>
                  <option value="বালিশ সেট">বালিশ ও কোল বালিশ সেট</option>
                  <option value="বিয়ের সম্পূর্ণ সেট">বিয়ের সম্পূর্ণ তোশক সেট</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    তুলার ধরন:
                  </label>
                  <select
                    value={cottonType}
                    onChange={(e) => setCottonType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white outline-none focus:border-amber-400 text-[11.5px]"
                  >
                    <option value="অরিজিনাল শিমুল তুলা">শিমুল তুলা</option>
                    <option value="গারো পাহাড়ি তুলা">গারো তুলা</option>
                    <option value="অর্গানিক তুলা">অর্গানিক তুলা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    সাইজ/মাপ:
                  </label>
                  <select
                    value={beddingSize}
                    onChange={(e) => setBeddingSize(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white outline-none focus:border-amber-400 text-[11.5px]"
                  >
                    <option value="কিং সাইজ (৬x৭ ফিট)">কিং (৬x৭ ফিট)</option>
                    <option value="ডাবল (৫x৭ ফিট)">ডাবল (৫x৭ ফিট)</option>
                    <option value="সিঙ্গেল (৪x৭ ফিট)">সিঙ্গেল (৪x৭ ফিট)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  আপনার ফোন নম্বর (বাধ্যতামূলক):
                </label>
                <input
                  type="tel"
                  required
                  value={beddingPhone}
                  onChange={(e) => setBeddingPhone(e.target.value)}
                  placeholder="০১৭১০-XXXXXX"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  বিশেষ সাইজ বা নোট (ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  value={beddingNotes}
                  onChange={(e) => setBeddingNotes(e.target.value)}
                  placeholder="যেমন: বিশেষ কভার ও কাস্টম কালার..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={beddingOrdered}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {beddingOrdered ? 'অর্ডার পাঠানো হচ্ছে...' : 'অর্ডার কনফার্ম করুন (হন্নান বেডিং)'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SALON SEAT BOOKING MODAL */}
      {selectedSalon && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-xs">
            <button
              onClick={() => setSelectedSalon(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold shrink-0">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  {selectedSalon.name}
                </h3>
                <p className="text-[11px] text-amber-300 font-semibold">
                  দোকান #{selectedSalon.shopNo} • {selectedSalon.ownerBarber}
                </p>
              </div>
            </div>

            {bookingSuccessCode ? (
              <div className="bg-emerald-950/80 border border-emerald-500/60 p-5 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg font-black">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-emerald-300">
                    আপনার সিট বুকিং সফল হয়েছে!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    সালুনের নাপিতের সময়সূচিতে আপনার বুকিং এন্ট্রি দেওয়া হয়েছে।
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">বুকিং রেফারেন্স কোড:</span>
                  <span className="text-base font-mono font-black text-amber-400">{bookingSuccessCode}</span>
                </div>

                <button
                  onClick={() => setSelectedSalon(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  ঠিক আছে, বন্ধ করুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    সার্ভিস পছন্দ করুন:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-500"
                  >
                    {selectedSalon.services.map((s, idx) => (
                      <option key={idx} value={s.name}>
                        {s.name} — ৳{s.price} ({s.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      বুকিং এর তারিখ:
                    </label>
                    <select
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white outline-none focus:border-pink-500 text-[11.5px]"
                    >
                      <option value="আজকের জন্য">আজকের জন্য</option>
                      <option value="আগামীকাল">আগামীকাল</option>
                      <option value="পরশু দিন">পরশু দিন</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      পছন্দের সময় (Slot):
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white outline-none focus:border-pink-500 text-[11.5px]"
                    >
                      <option value="সকাল ১০:০০ মি.">সকাল ১০:০০ মি.</option>
                      <option value="দুপুর ১২:৩০ মি.">দুপুর ১২:৩০ মি.</option>
                      <option value="বিকেল ০৪:০০ মি.">বিকেল ০৪:০০ মি.</option>
                      <option value="সন্ধ্যা ০৭:৩০ মি.">সন্ধ্যা ০৭:৩০ মি.</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    আপনার নাম:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="আপনার নাম লিখুন..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    মোবাইল নম্বর:
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="০১৭১০-XXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-500"
                  />
                </div>

                {/* Advance Payment Info */}
                <div className="p-3 bg-pink-950/40 border border-pink-500/30 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-pink-300 font-bold">
                    <span>অগ্রিম বিকাশ/নগদ পেমেন্ট:</span>
                    <span className="font-mono">{selectedSalon.bkashNagadNo}</span>
                  </div>
                  <input
                    type="text"
                    value={advanceTrxId}
                    onChange={(e) => setAdvanceTrxId(e.target.value)}
                    placeholder="পেমেন্ট TrxID (যদি অগ্রিম বিকাশ করে থাকেন)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-pink-500 text-[11px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
                >
                  বুকিং নিশ্চিত করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
