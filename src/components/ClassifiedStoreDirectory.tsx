import React, { useState, useMemo } from 'react';
import {
  Store,
  Pill,
  ShoppingCart,
  Wrench,
  Sprout,
  Smile,
  UtensilsCrossed,
  Scissors,
  Apple,
  Drumstick,
  Bed,
  Warehouse,
  HeartPulse,
  Recycle,
  Armchair,
  Bike,
  Utensils,
  Building2,
  Coffee,
  Wheat,
  Search,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Filter,
  CheckCircle2,
  X,
  Layers,
  PhoneCall,
  User,
  Info,
  PieChart as PieIcon,
  BarChart2,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import {
  CLASSIFIED_CATEGORIES,
  CLASSIFIED_SHOPS,
  ClassifiedCategory,
  ClassifiedShop
} from '../data/classifiedShopsData';
import { toBengaliNumerals } from '../utils/bengaliUtils';

// Distinct color palette for 19 categories in the Pie Chart
const CATEGORY_COLORS: Record<string, string> = {
  pharmacy: '#10b981',   // emerald-500
  grocery: '#f59e0b',    // amber-500
  auto_maker: '#3b82f6', // blue-500
  fertilizer: '#84cc16', // lime-500
  dental: '#06b6d4',     // cyan-500
  sweets: '#f97316',     // orange-500
  salon: '#a855f7',      // purple-500
  vegetables: '#22c55e', // green-500
  broiler: '#f43f5e',    // rose-500
  bedding: '#6366f1',    // indigo-500
  godown: '#64748b',     // slate-500
  veterinary: '#14b8a6', // teal-500
  scrap: '#d97706',      // amber-600
  furniture: '#b45309',  // amber-700
  cycle_maker: '#0ea5e9',// sky-500
  restaurant: '#ef4444', // red-500
  rod_cement: '#eab308', // yellow-500
  tea_stall: '#78716c',  // stone-500
  others: '#8b5cf6',     // violet-500
};

export const ClassifiedStoreDirectory: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeShopModal, setActiveShopModal] = useState<ClassifiedShop | null>(null);
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null);
  const [showChartSection, setShowChartSection] = useState<boolean>(true);

  // Map icon names to Lucide Icon Components
  const renderCategoryIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Pill':
        return <Pill className={className} />;
      case 'ShoppingCart':
        return <ShoppingCart className={className} />;
      case 'Wrench':
        return <Wrench className={className} />;
      case 'Sprout':
        return <Sprout className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className={className} />;
      case 'Scissors':
        return <Scissors className={className} />;
      case 'Apple':
        return <Apple className={className} />;
      case 'Drumstick':
        return <Drumstick className={className} />;
      case 'Bed':
        return <Bed className={className} />;
      case 'Warehouse':
        return <Warehouse className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'Recycle':
        return <Recycle className={className} />;
      case 'Armchair':
        return <Armchair className={className} />;
      case 'Bike':
        return <Bike className={className} />;
      case 'Utensils':
        return <Utensils className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'Coffee':
        return <Coffee className={className} />;
      default:
        return <Store className={className} />;
    }
  };

  // Compute total counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CLASSIFIED_SHOPS.forEach((shop) => {
      counts[shop.categoryId] = (counts[shop.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered Shops based on Category Selection & Search Query
  const filteredShops = useMemo(() => {
    return CLASSIFIED_SHOPS.filter((shop) => {
      // Category Filter
      if (selectedCategoryId !== 'all' && shop.categoryId !== selectedCategoryId) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchOwner = shop.ownerName.toLowerCase().includes(q);
        const matchTitle = shop.shopTitle.toLowerCase().includes(q);
        const matchShopNo = shop.shopNo.includes(q);
        const matchCategory = shop.categoryName.toLowerCase().includes(q);
        const matchLocation = shop.location.toLowerCase().includes(q);
        return matchOwner || matchTitle || matchShopNo || matchCategory || matchLocation;
      }
      return true;
    });
  }, [selectedCategoryId, searchQuery]);

  const activeCategoryObj = useMemo(() => {
    if (selectedCategoryId === 'all') return null;
    return CLASSIFIED_CATEGORIES.find((c) => c.id === selectedCategoryId) || null;
  }, [selectedCategoryId]);

  // Prepare data for Recharts Pie Chart
  const pieChartData = useMemo(() => {
    const totalShops = CLASSIFIED_SHOPS.length || 1;
    return CLASSIFIED_CATEGORIES.map((cat) => {
      const count = categoryCounts[cat.id] || 0;
      const percentage = Number(((count / totalShops) * 100).toFixed(1));
      return {
        id: cat.id,
        name: cat.name,
        categoryNumber: cat.number,
        value: count,
        percentage: percentage,
        color: CATEGORY_COLORS[cat.id] || '#f59e0b',
        iconName: cat.iconName,
      };
    }).filter((item) => item.value > 0);
  }, [categoryCounts]);

  // Custom Tooltip for Recharts Pie Chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-amber-500/50 p-3 rounded-xl shadow-2xl space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block shrink-0 shadow-sm"
              style={{ backgroundColor: data.color }}
            />
            <span className="font-extrabold text-white text-sm">{data.name}</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-bold">
              শ্রেণি #{toBengaliNumerals(data.categoryNumber)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-300 pt-1 border-t border-slate-800">
            <span>দোকান সংখ্যা:</span>
            <strong className="text-amber-300 font-bold">{toBengaliNumerals(data.value)} টি</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-300">
            <span>মার্কেট শেয়ার:</span>
            <strong className="text-emerald-400 font-bold">{toBengaliNumerals(data.percentage)}%</strong>
          </div>
          <p className="text-[10px] text-amber-400/90 italic pt-0.5">
            👉 স্লাইসে ক্লিক করে ক্যাটাগরি ফিল্টার করুন
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>শ্রেণিভিত্তিক দোকান ডিরেক্টরি</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <Layers className="w-3 h-3 text-sky-400" />
              <span>১৯টি মূল বাণিজ্যিক শ্রেণি</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>মোট {toBengaliNumerals(CLASSIFIED_SHOPS.length)} টি নিবন্ধিত দোকান</span>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2 pt-1">
            <span>গণিমার্কেট শ্রেণিভিত্তিক ব্যবসায়ী ও দোকান ক্যাটালগ</span>
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl">
            ফার্মেসী, মুদী, অটো মেকার, সার ডিলার সহ ১৯টি শ্রেণিতে বিভক্ত সকল দোকানের অবস্থান, মালিকের নাম, মোবাইল নম্বর ও নৈশ ডিউটি তথ্য।
          </p>
        </div>

        {/* Quick Search Input */}
        <div className="w-full sm:w-72 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="দোকান নং, মালিক বা ব্যবসার নাম..."
              className="w-full bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-amber-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recharts Pie Chart Category Distribution Visualizer */}
      <div className="bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 sm:p-5 relative space-y-4 shadow-lg transition">
        {/* Chart Card Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
              <PieIcon className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>১৯টি শ্রেণির দোকান ডিস্ট্রিবিউশন পাই চার্ট</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                  Recharts Pie Chart
                </span>
              </h4>
              <p className="text-[11px] text-slate-400">
                পাই চার্টের স্লাইস বা ডানপাশের শ্রেণির নামটিতে ক্লিক করে সরাসরি ক্যাটাগরি ফিল্টার করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowChartSection(!showChartSection)}
              className="text-[11px] font-bold text-slate-400 hover:text-white px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg transition cursor-pointer"
            >
              {showChartSection ? 'চার্ট লুকান' : 'চার্ট দেখুন'}
            </button>
            {selectedCategoryId !== 'all' && (
              <button
                onClick={() => setSelectedCategoryId('all')}
                className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
              >
                <span>ফিল্টার তুলুন</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {showChartSection && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Recharts Pie Chart Donut Container */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="w-full h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={2.5}
                      dataKey="value"
                      onMouseEnter={(_, index) => setHoveredPieIndex(index)}
                      onMouseLeave={() => setHoveredPieIndex(null)}
                      cursor="pointer"
                    >
                      {pieChartData.map((entry, index) => {
                        const isSelected = selectedCategoryId === entry.id;
                        const isHovered = hoveredPieIndex === index;
                        return (
                          <Cell
                            key={`cell-${entry.id}`}
                            fill={entry.color}
                            stroke={isSelected ? '#f59e0b' : '#0f172a'}
                            strokeWidth={isSelected ? 3 : 1.5}
                            onClick={() => setSelectedCategoryId(entry.id)}
                            opacity={
                              selectedCategoryId === 'all'
                                ? isHovered
                                  ? 1
                                  : 0.9
                                : isSelected
                                ? 1
                                : 0.4
                            }
                            style={{
                              filter: isSelected
                                ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))'
                                : 'none',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                            }}
                          />
                        );
                      })}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Center Donut Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                {activeCategoryObj ? (
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">নির্বাচিত শ্রেণি</p>
                    <p className="text-sm font-black text-white">{activeCategoryObj.name}</p>
                    <p className="text-[11px] font-bold text-emerald-400">
                      {toBengaliNumerals(categoryCounts[activeCategoryObj.id] || 0)} টি দোকান
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">মোট বাজার</p>
                    <p className="text-base font-black text-white">
                      {toBengaliNumerals(CLASSIFIED_SHOPS.length)} টি
                    </p>
                    <p className="text-[10px] text-amber-400 font-bold">১৯টি শ্রেণি</p>
                  </div>
                )}
              </div>
            </div>

            {/* Category Breakdown Legend Grid */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800">
                <span className="font-bold text-slate-300">শ্রেণিভিত্তিক দোকান সংখ্যা ও শেয়ার (%)</span>
                <span className="text-[11px] text-amber-400 font-medium">পছন্দের শ্রেণিতে ক্লিক করুন</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {pieChartData.map((item) => {
                  const isSelected = selectedCategoryId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCategoryId(item.id)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-between gap-1.5 border transition cursor-pointer text-left ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm'
                          : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate text-[11px]">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold shrink-0">
                        <span className="text-slate-300">{toBengaliNumerals(item.value)}টি</span>
                        <span className="text-slate-500">({toBengaliNumerals(item.percentage)}%)</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 19 Categories Scrollable / Grid Buttons */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-amber-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>দোকানের শ্রেণি ফিল্টার করুন (১৯টি বিভাগ):</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {selectedCategoryId === 'all'
              ? 'সব শ্রেণি প্রদর্শিত হচ্ছে'
              : `নির্বাচিত: ${activeCategoryObj?.name}`}
          </span>
        </div>

        {/* Category Buttons Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
          {/* 'All' Button */}
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between gap-1.5 border transition cursor-pointer active:scale-97 ${
              selectedCategoryId === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-950/50'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <Store className="w-3.5 h-3.5 shrink-0" />
              <span>সকল দোকান</span>
            </div>
            <span
              className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                selectedCategoryId === 'all'
                  ? 'bg-slate-950/30 text-slate-950'
                  : 'bg-slate-800 text-amber-300'
              }`}
            >
              {toBengaliNumerals(CLASSIFIED_SHOPS.length)}
            </span>
          </button>

          {/* 19 Category Items */}
          {CLASSIFIED_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between gap-1 border transition cursor-pointer active:scale-97 text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-950/80 border-slate-800/80 text-slate-300 hover:bg-slate-800/90 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className={isSelected ? 'text-slate-950' : cat.badgeText}>
                    {renderCategoryIcon(cat.iconName, 'w-3.5 h-3.5 shrink-0')}
                  </span>
                  <span className="truncate">
                    {toBengaliNumerals(cat.number)}. {cat.name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shrink-0 ${
                    isSelected
                      ? 'bg-slate-950/30 text-slate-950'
                      : 'bg-slate-800/80 text-slate-300'
                  }`}
                >
                  {toBengaliNumerals(count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Spotlight Header (When a category is active) */}
      {activeCategoryObj && (
        <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
              {renderCategoryIcon(activeCategoryObj.iconName, 'w-5 h-5')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm">
                  শ্রেণি: {activeCategoryObj.name}
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-bold">
                  মোট {toBengaliNumerals(categoryCounts[activeCategoryObj.id] || 0)} টি দোকান
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">{activeCategoryObj.description}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategoryId('all')}
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <span>সব দোকান দেখুন</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Shop Cards Grid Container */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            প্রদর্শিত দোকান: <strong className="text-amber-300">{toBengaliNumerals(filteredShops.length)}</strong> টি
          </span>
          {searchQuery && (
            <span className="text-slate-400 italic text-[11px]">
              খোঁজা হচ্ছে: "{searchQuery}"
            </span>
          )}
        </div>

        {filteredShops.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
            <Store className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">কোনো দোকান পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500">
              অনুগ্রহ করে সার্চ কীওয়ার্ড বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
            </p>
            <button
              onClick={() => {
                setSelectedCategoryId('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold rounded-xl transition cursor-pointer mt-2"
            >
              রিসেট ফিল্টার
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredShops.map((shop) => {
              const catMeta = CLASSIFIED_CATEGORIES.find((c) => c.id === shop.categoryId);

              return (
                <div
                  key={shop.id}
                  className="bg-slate-950/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-3 flex flex-col justify-between transition-all duration-200 shadow-md hover:shadow-xl group"
                >
                  {/* Top Bar: Shop No & Category Badge */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-amber-500/20 border border-amber-500/40 text-amber-300">
                        <Store className="w-3.5 h-3.5 text-amber-400" />
                        <span>দোকান #{toBengaliNumerals(shop.shopNo)}</span>
                      </span>

                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-lg border ${
                          catMeta ? catMeta.badgeBg : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {shop.categoryName}
                      </span>
                    </div>

                    {/* Shop Title & Owner Name */}
                    <div>
                      <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {shop.shopTitle}
                      </h4>
                      <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                        <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>স্বত্বাধিকারী: <strong className="text-white">{shop.ownerName}</strong></span>
                      </p>
                    </div>

                    {/* Details Note */}
                    <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      {shop.details}
                    </p>
                  </div>

                  {/* Bottom Location, Guard Duty & Phone Controls */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{shop.location}</span>
                      </span>

                      {shop.dutySerialNo && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                          ডিউটি জুটি #{toBengaliNumerals(shop.dutySerialNo)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <a
                        href={`tel:${shop.mobile}`}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{shop.mobile}</span>
                      </a>

                      <button
                        onClick={() => setActiveShopModal(shop)}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-xl transition cursor-pointer shrink-0"
                      >
                        বিস্তারিত
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Shop Details Modal */}
      {activeShopModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative text-xs">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  দোকান #{toBengaliNumerals(activeShopModal.shopNo)} • {activeShopModal.categoryName}
                </span>
                <h3 className="text-base font-extrabold text-white">{activeShopModal.shopTitle}</h3>
              </div>

              <button
                onClick={() => setActiveShopModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-3 text-slate-300">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">স্বত্বাধিকারী:</span>
                  <span className="font-bold text-white text-sm">{activeShopModal.ownerName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">যোগাযোগ নাম্বার:</span>
                  <a
                    href={`tel:${activeShopModal.mobile}`}
                    className="font-mono font-bold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>{activeShopModal.mobile}</span>
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">অবস্থান:</span>
                  <span className="font-medium text-amber-300">{activeShopModal.location}</span>
                </div>
              </div>

              {/* Duty Roster Info if available */}
              {activeShopModal.dutyPairInfo && (
                <div className="bg-emerald-950/60 border border-emerald-600/40 rounded-xl p-3 space-y-1">
                  <div className="font-bold text-emerald-300 text-xs flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>নৈশ পাহারা ডিউটি নিবন্ধন:</span>
                  </div>
                  <p className="text-xs text-emerald-200">{activeShopModal.dutyPairInfo}</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-amber-300 text-xs">পণ্য ও সেবা সম্পর্কিত তথ্য:</label>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed text-xs">
                  {activeShopModal.details}
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <a
                href={`tel:${activeShopModal.mobile}`}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>সরাসরি কল করুন</span>
              </a>

              <button
                onClick={() => setActiveShopModal(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
