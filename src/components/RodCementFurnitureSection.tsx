import React, { useState } from 'react';
import {
  Building2,
  Armchair,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Store,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Send,
  Truck,
  Check,
  Tag,
  Eye,
  Filter,
  DollarSign,
  Info,
  X,
  Plus,
  ShoppingBag,
  Award,
  Layers,
  Flame,
  ArrowRight,
  HelpCircle,
  PackageCheck,
} from 'lucide-react';

// Rod & Cement Item
export interface BuildingMaterial {
  id: string;
  category: 'rod' | 'cement';
  brandName: string;
  grade: string;
  pricePerUnit: string;
  stockStatus: string;
  badge: string;
}

const BUILDING_MATERIALS: BuildingMaterial[] = [
  {
    id: 'm1',
    category: 'rod',
    brandName: 'বিএসআরএম (BSRM) এক্সটিআরএ ৫০০ডব্লিউ',
    grade: '৬০ গ্রেড থার্মো মেকানিকালি ট্রিটেড',
    pricePerUnit: '৯৪,৫০০ টাকা / টন',
    stockStatus: 'ইন স্টোর (ট্রাক ডেলিভারি রেডি)',
    badge: '১ নম্বর বুয়েট টেস্টেড',
  },
  {
    id: 'm2',
    category: 'rod',
    brandName: 'কেএসআরএম (KSRM) ৫০০ডব্লিউ',
    grade: 'হাই ইয়েল্ড স্ট্রাকচারাল স্টিল',
    pricePerUnit: '৯১,০০০ টাকা / টন',
    stockStatus: 'রেডি স্টক (৫০০ টন সঞ্চিত)',
    badge: 'ভূমিকম্প সহনশীল',
  },
  {
    id: 'm3',
    category: 'cement',
    brandName: 'শাহ সিমেন্ট বিশেষ স্পেশাল (PCC)',
    grade: 'হাই স্পিড হাইড্রোলিক পিসি' ,
    pricePerUnit: '৫২০ টাকা / ব্যাগ',
    stockStatus: 'আজকের ফ্রেশ ফ্র্যাক্টরি লট',
    badge: 'দ্রুত সেটিং প্রযুক্তি',
  },
  {
    id: 'm4',
    category: 'cement',
    brandName: 'সেভেন রিং সিমেন্ট (Seven Rings)',
    grade: 'আন্ডারওয়াটার ও ফাউন্ডেশন স্পেশাল',
    pricePerUnit: '৪৯৫ টাকা / ব্যাগ',
    stockStatus: 'স্টক এভেলেবল',
    badge: 'পানি ও নোনা প্রতিরোধী',
  },
];

// Furniture Gallery Items
export interface FurnitureItem {
  id: string;
  title: string;
  category: 'bed' | 'sofa' | 'dining' | 'almirah' | 'office';
  woodType: string;
  shopName: string;
  shopNo: string;
  priceEstimate: string;
  originalPrice?: string;
  discountBadge?: string;
  imageUrl: string;
  description: string;
  warrantyYears: string;
}

const FURNITURE_GALLERY: FurnitureItem[] = [
  {
    id: 'f1',
    title: 'চিটাগাং অরিজিনাল সেগুন কাঠের রাজকীয় খাট (কিং সাইজ)',
    category: 'bed',
    woodType: '১০০% চট্টগ্রাম সিজনড সেগুন কাঠ',
    shopName: 'রয়েল উড ফার্নিচার মেলা',
    shopNo: '৫০',
    priceEstimate: '৪৫,০০০ টাকা',
    originalPrice: '৫২,০০০ টাকা',
    discountBadge: '১৫% মেলা ছাড়',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&auto=format&fit=crop&q=80',
    description: 'হাতে খোদাই করা ভিক্টোরিয়ান নকশা। ঘূর্ণি ও ঘুনে কখনো নষ্ট হবে না, সাথে ২৫ বছরের লিখিত গ্যারান্টি।',
    warrantyYears: '২৫ বছর',
  },
  {
    id: 'f2',
    title: 'বিলাসবহুল ৫-সিটার এক্সক্লুসিভ এল-শেপ সোফা সেট',
    category: 'sofa',
    woodType: 'মেহগনি কাঠ ও ইম্পোর্টেড ভেলভেট ফ্যাব্রিক',
    shopName: 'অভিজাত সেগুন ফার্নিচার গ্যালারি',
    shopNo: '৫১',
    priceEstimate: '৩৮,৫০০ টাকা',
    originalPrice: '৪৪,০০০ টাকা',
    discountBadge: 'বিশেষ গিফট সহ',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&auto=format&fit=crop&q=80',
    description: 'হাই-ডেনসিটি ফোম সম্বলিত পরম আরামদায়ক সোফা সেট। বসলে স্প্রিং ব্যাক কোয়ালিটি ও আধুনিক ওয়েভ ডিজাইন।',
    warrantyYears: '১৫ বছর',
  },
  {
    id: 'f3',
    title: '৬-চেয়ার বিশিষ্ট মার্বেল টপ ডাইনিং টেবিল সেট',
    category: 'dining',
    woodType: 'ন্যাচারাল ইতালিয়ান মার্বেল ও মেহগনি কাঠ',
    shopName: 'মডার্ন ফার্নিচার অ্যান্ড ডেকোর',
    shopNo: '৫২',
    priceEstimate: '৪২,০০০ টাকা',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000&auto=format&fit=crop&q=80',
    description: 'তাপ ও পানি প্রতিরোধী মার্বেল সারফেস। পরিবারের সাথে আনন্দের খাবার মুহূর্ত উপভোগের রাজকীয় ডাইনিং।',
    warrantyYears: '১০ বছর',
  },
  {
    id: 'f4',
    title: '৪-পাল্লার ল্যাকার ফিনিশ ড্রয়ার সহ সেগুন ওয়ারড্রেব',
    category: 'almirah',
    woodType: 'চট্টগ্রাম সেগুন কাঠ ও ল্যাকার বার্নিশ',
    shopName: 'রয়েল উড ফার্নিচার মেলা',
    shopNo: '৫০',
    priceEstimate: '৩২,০০০ টাকা',
    originalPrice: '৩৬,০০০ টাকা',
    discountBadge: 'ফ্রি হোম ডেলিভারি',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&auto=format&fit=crop&q=80',
    description: 'প্রচুর জায়গা সম্বলিত জামাকাপড় ও সিক্রেট লকার বক্স। ল্যাকার গ্লসি ফিনিশিংয়ের অনন্য কারুকাজ।',
    warrantyYears: '২০ বছর',
  },
  {
    id: 'f5',
    title: 'এক্সিকিউটিভ অফিস টেবিল ও হাই-ব্যাক রিভলভিং চেয়ার',
    category: 'office',
    woodType: 'প্রসেসড প্রিমিয়াম বোর্ড ও মেটাল ফ্রেম',
    shopName: 'মডার্ন ফার্নিচার অ্যান্ড ডেকোর',
    shopNo: '৫২',
    priceEstimate: '১৮,৫০০ টাকা',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&auto=format&fit=crop&q=80',
    description: 'কম্পিউটার, ফাইল ও ক্যাশ ড্রয়ার সহ অফিসিয়াল এক্সিকিউটিভ সেটআপ। দীর্ঘক্ষণ কাজ করার এরগোনোমিক চেয়ার।',
    warrantyYears: '৫ বছর',
  },
];

export const RodCementFurnitureSection: React.FC = () => {
  // Filter for Furniture Gallery
  const [furnitureCategory, setFurnitureCategory] = useState<'all' | 'bed' | 'sofa' | 'dining' | 'almirah' | 'office'>('all');
  
  // Rod & Cement Order Form State
  const [materialType, setMaterialType] = useState<string>('BSRM 500W Rod');
  const [materialQty, setMaterialQty] = useState<string>('2');
  const [materialUnit, setMaterialUnit] = useState<string>('টন (Ton)');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [rodPhone, setRodPhone] = useState<string>('');
  const [rodOrderSuccess, setRodOrderSuccess] = useState<boolean>(false);

  // Selected Furniture Modal
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem | null>(null);
  const [furnitureCustomNotes, setFurnitureCustomNotes] = useState<string>('');
  const [furnitureCustomerPhone, setFurnitureCustomerPhone] = useState<string>('');
  const [furnitureOrderSuccessCode, setFurnitureOrderSuccessCode] = useState<string | null>(null);

  // Filtered Gallery
  const filteredFurniture = FURNITURE_GALLERY.filter((item) => {
    if (furnitureCategory === 'all') return true;
    return item.category === furnitureCategory;
  });

  const handleOrderRodCement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rodPhone || !deliveryAddress) {
      alert('অনুগ্রহ করে মোবাইল নম্বর ও ডেলিভারি ঠিকানা লিখুন!');
      return;
    }
    setRodOrderSuccess(true);
    setTimeout(() => {
      setRodOrderSuccess(false);
      setRodPhone('');
      setDeliveryAddress('');
      alert('মেসার্স গণি ট্রেডার্স (রড-সিমেন্ট আড়ৎ) থেকে আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে! দ্রুত চালানের জন্য আপনাকে ফোন দেওয়া হচ্ছে।');
    }, 1500);
  };

  const handleOrderFurniture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!furnitureCustomerPhone) {
      alert('অনুগ্রহ করে আপনার ফোন নম্বর লিখুন!');
      return;
    }
    const code = 'GONI-FURN-' + Math.floor(100000 + Math.random() * 900000);
    setFurnitureOrderSuccessCode(code);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section 7 Main Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/50 to-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-950/60 shrink-0">
            <Building2 className="w-6 h-6 text-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white">
                সপ্তম সেকশন: রড-সিমেন্টের আড়ৎ ও ফার্নিচার গ্যালারি
              </h2>
              <span className="text-[10.5px] bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                পাইকারি রেট ও অর্ডার অপশন
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              নির্মাণ সামগ্রীর রড-সিমেন্ট সরবরাহ এবং কাঠের রাজকীয় ফার্নিচারের চোখধাঁধানো গ্যালারি
            </p>
          </div>
        </div>

        <div className="text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-amber-300 font-bold flex items-center gap-2 self-start md:self-auto shrink-0">
          <Truck className="w-4 h-4 text-emerald-400" />
          <span>সারাদেশে সরাসরি ট্রাক ও পিকআপ ডেলিভারি</span>
        </div>
      </div>

      {/* PART 1: ROD & CEMENT ADVERTISEMENT & ORDERING SYSTEM */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950">
                  দোকান নম্বর #০৪
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  বাণিজ্যিক বিল্ডিং মেটেরিয়ালস
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                মেসার্স গণি রড, সিমেন্ট ও বিল্ডিং মেটেরিয়ালস আড়ৎ
              </h3>
              <p className="text-xs text-slate-400">
                মালিক: হাজী মো: এরশাদ উল্লাহ | ফোন: ০১৮১৯-৮৮৭৭৬৬ (সরাসরি ট্রাক বুকিং)
              </p>
            </div>
          </div>

          {/* Live Rates Ticker Box */}
          <div className="bg-slate-950 p-3 rounded-2xl border border-amber-500/30 flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">আজকের বিএসআরএম রড:</span>
              <span className="text-amber-400 font-mono font-black text-sm">৳৯৪,৫০০ / টন</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-[10px] text-slate-400 block font-semibold">শাহ সিমেন্ট:</span>
              <span className="text-emerald-400 font-mono font-black text-sm">৳৫২০ / ব্যাগ</span>
            </div>
          </div>
        </div>

        {/* Rod & Cement Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Materials Table & Photo Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>উপলব্ধ ব্র্যান্ড, গ্রেড ও বাজার দর তালিকা:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUILDING_MATERIALS.map((mat) => (
                  <div
                    key={mat.id}
                    className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2 hover:border-amber-500/40 transition"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {mat.badge}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        {mat.stockStatus}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-xs font-black text-white leading-snug">
                        {mat.brandName}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {mat.grade}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-slate-900 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[10px]">আজকের রেট:</span>
                      <span className="font-extrabold text-amber-300 font-mono">
                        {mat.pricePerUnit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Truck Delivery Guarantee Box */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
                <div>
                  <span className="font-extrabold text-white block">সরাসরি সাইটে ড্রাম ট্রাক ও কভার্ড ভ্যান ডেলিভারি</span>
                  <span className="text-[11px] text-slate-400">অর্ডার করার ২ ঘণ্টার মধ্যে গাড়ি ছাড়ার দ্রুত নিশ্চয়তা</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Instant Rod/Cement Order Calculator Form */}
          <div className="lg:col-span-5 bg-slate-950 border border-amber-500/40 p-5 rounded-2xl shadow-xl space-y-3.5 text-xs">
            <div className="border-b border-slate-800 pb-2">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>রড ও সিমেন্ট চালান বুকিং ফরম</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                সাইটের পরিমাপ লিখে পাঠালে ক্যাশ অন ডেলিভারিতে মাল পাঠানো হবে
              </p>
            </div>

            <form onSubmit={handleOrderRodCement} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  ব্র্যান্ড ও প্রোডাক্ট নির্বাচন করুন:
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                >
                  <option value="BSRM 500W Rod">বিএসআরএম (BSRM) ৫০০ডব্লিউ রড</option>
                  <option value="KSRM 500W Rod">কেএসআরএম (KSRM) ৫০০ডব্লিউ রড</option>
                  <option value="Shah Cement PCC">শাহ সিমেন্ট (Shah Cement)</option>
                  <option value="Seven Rings Cement">সেভেন রিং সিমেন্ট (Seven Rings)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">পরিমাণ (Qty):</label>
                  <input
                    type="number"
                    min="1"
                    value={materialQty}
                    onChange={(e) => setMaterialQty(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">একক (Unit):</label>
                  <select
                    value={materialUnit}
                    onChange={(e) => setMaterialUnit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white outline-none focus:border-amber-400 text-[11.5px]"
                  >
                    <option value="টন (Ton)">টন (Ton)</option>
                    <option value="ব্যাগ (Bag)">ব্যাগ (Bag)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">ডেলিভারি ঠিকানা (বিল্ডিং সাইট):</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="যেমন: গণি মার্কেট সংলগ্ন রোড, বাসা #৪..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">আপনার ফোন নম্বর:</label>
                <input
                  type="tel"
                  required
                  value={rodPhone}
                  onChange={(e) => setRodPhone(e.target.value)}
                  placeholder="০১৭১০-XXXXXX"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={rodOrderSuccess}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {rodOrderSuccess ? 'প্রসেস হচ্ছে...' : 'রড-সিমেন্ট অর্ডার কনফার্ম করুন'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* PART 2: ALL FURNITURE SHOPS ADVERTISEMENT & EXCLUSIVE GALLERY */}
      <div className="space-y-5">
        {/* Gallery Top Filter Header */}
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md shrink-0">
              <Armchair className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>সবগুলো ফার্নিচারের দোকান ও এক্সক্লুসিভ পণ্য গ্যালারি</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30">
                  {filteredFurniture.length}টি মেলা মডেল
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                রয়েল উড, অভিজাত সেগুন ও মডার্ন ফার্নিচার গ্যালারির রাজকীয় সেগুন কাঠের ডিজাইন
              </p>
            </div>
          </div>

          {/* Furniture Category Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto shrink-0">
            <button
              onClick={() => setFurnitureCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                furnitureCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              সব ফার্নিচার
            </button>
            <button
              onClick={() => setFurnitureCategory('bed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                furnitureCategory === 'bed'
                  ? 'bg-amber-500 text-slate-950 shadow font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              সেগুন খাট
            </button>
            <button
              onClick={() => setFurnitureCategory('sofa')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                furnitureCategory === 'sofa'
                  ? 'bg-amber-500 text-slate-950 shadow font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              সোফা সেট
            </button>
            <button
              onClick={() => setFurnitureCategory('dining')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                furnitureCategory === 'dining'
                  ? 'bg-amber-500 text-slate-950 shadow font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ডাইনিং টেবিল
            </button>
            <button
              onClick={() => setFurnitureCategory('almirah')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                furnitureCategory === 'almirah'
                  ? 'bg-amber-500 text-slate-950 shadow font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ওয়ারড্রেব
            </button>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFurniture.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-4 transition duration-300 group"
            >
              <div className="space-y-3">
                {/* Product Image */}
                <div className="relative h-48 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-md">
                    {item.shopName} (#{item.shopNo})
                  </span>

                  {item.discountBadge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-500 text-white shadow-md">
                      {item.discountBadge}
                    </span>
                  )}

                  <div className="absolute bottom-2 left-3 right-3 text-[11px] text-amber-300 font-bold truncate">
                    গ্যারান্টি: {item.warrantyYears} (লিখিত ওয়ারেন্টি)
                  </div>
                </div>

                {/* Furniture Title & Wood Specification */}
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-amber-400 font-medium flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>উপাদান: {item.woodType}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Price Box */}
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">বাজার ও মেলা রেট:</span>
                    <span className="text-base font-black text-white font-mono">
                      {item.priceEstimate}
                    </span>
                  </div>

                  {item.originalPrice && (
                    <span className="text-xs text-slate-500 line-through font-mono">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Select & Order Button */}
              <button
                onClick={() => {
                  setSelectedFurniture(item);
                  setFurnitureOrderSuccessCode(null);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition cursor-pointer active:scale-95"
              >
                <Eye className="w-4 h-4 text-slate-950" />
                <span>পছন্দ করে অর্ডার দিন</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FURNITURE ORDER MODAL */}
      {selectedFurniture && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-xs">
            <button
              onClick={() => setSelectedFurniture(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Armchair className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  {selectedFurniture.title}
                </h3>
                <p className="text-[11px] text-amber-300 font-semibold">
                  {selectedFurniture.shopName} (দোকান #{selectedFurniture.shopNo})
                </p>
              </div>
            </div>

            {furnitureOrderSuccessCode ? (
              <div className="bg-emerald-950/80 border border-emerald-500/60 p-5 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg font-black">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-emerald-300">
                    ফার্নিচার অর্ডারটি গ্রহণ করা হয়েছে!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    কাস্টমাইজেশন ও মেলা ছাড়ের অফারসহ দোকান থেকে আপনাকে ফোন দেওয়া হবে।
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">অর্ডার স্লিপ ট্র্যাকিং কোড:</span>
                  <span className="text-base font-mono font-black text-amber-400">
                    {furnitureOrderSuccessCode}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedFurniture(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  ঠিক আছে, বন্ধ করুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderFurniture} className="space-y-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">আনুমানিক মূল্য:</span>
                  <span className="text-base font-black text-amber-400 font-mono">
                    {selectedFurniture.priceEstimate}
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    আপনার ফোন নম্বর (বাধ্যতামূলক):
                  </label>
                  <input
                    type="tel"
                    required
                    value={furnitureCustomerPhone}
                    onChange={(e) => setFurnitureCustomerPhone(e.target.value)}
                    placeholder="০১৭১০-XXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    কাস্টমাইজ সাইজ, কাঠের পলিশ বা নোট (ঐচ্ছিক):
                  </label>
                  <textarea
                    rows={2}
                    value={furnitureCustomNotes}
                    onChange={(e) => setFurnitureCustomNotes(e.target.value)}
                    placeholder="যেমন: ডার্ক বার্নিশ পলিশ ও খাট ৫x৭ ফিট মাপে বানাতে চাই..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
                >
                  অর্ডার কনফার্ম করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
