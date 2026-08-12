import React, { useState, useEffect } from 'react';
import {
  X,
  Edit3,
  Plus,
  Trash2,
  Image as ImageIcon,
  Video,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Layers,
  Link,
  Youtube,
  Type,
  FileText,
  AlertCircle,
  BarChart2,
} from 'lucide-react';
import {
  getDevSectionContent,
  saveDevSectionContent,
  resetDevSectionContent,
  parseYouTubeEmbedUrl,
  SectionContentOverride,
} from '../utils/devCustomContent';
import { SectionUsageD3Chart } from './SectionUsageD3Chart';

interface DeveloperContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSectionId?: string;
}

const SECTIONS_LIST = [
  { id: 'sec-1', name: '১ম সেকশন: হিরো ব্যানার স্লাইডার (Hero Slider)' },
  { id: 'sec-2', name: '২য় সেকশন: ভিডিও ভাষণ ও বক্তব্য স্লাইডার (Video Speeches)' },
  { id: 'sec-3', name: '৩য় সেকশন: ৩ডি ম্যাপ ও এরিয়াল মার্কেট ভিউ (3D Aerial View & Map)' },
  { id: 'sec-4', name: '৪র্থ সেকশন: শ্রেণীবদ্ধ দোকান ডিরেক্টরি (Classified Shop Directory)' },
  { id: 'sec-5', name: '৫ম সেকশন: মাছ, মাংস, মুরগি ও কাঁচাবাজার (Fish, Meat & Veg Market)' },
  { id: 'sec-6', name: '৬ষ্ঠ সেকশন: মুদিখানা ও ডিপার্টমেন্টাল স্টোর (Grocery Stores)' },
  { id: 'sec-7', name: '৭ম সেকশন: সেলুন, পার্লার, টেইলার্স ও বেডিং (Salon, Beauty & Bedding)' },
  { id: 'sec-8', name: '৮ম সেকশন: ফার্মেসী ও টেলিমেডিসিন স্বাস্থ্যসেবা (Pharmacies & Healthcare)' },
  { id: 'sec-9', name: '৯ম সেকশন: ভূমি সেবা ও পরামর্শদাতা চেম্বার (Land Services & Legal Chamber)' },
  { id: 'sec-10', name: '১০ম সেকশন: ব্যবসায়ী সামাজিক ফেসবুক পেজ ও প্ল্যাটফর্ম (Merchant Facebook Page/Wall)' },
];

export const DeveloperContentModal: React.FC<DeveloperContentModalProps> = ({
  isOpen,
  onClose,
  initialSectionId = 'sec-1',
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(initialSectionId);
  const [activeTabMode, setActiveTabMode] = useState<'editor' | 'analytics'>('editor');
  const [items, setItems] = useState<
    Array<{
      id: string;
      title: string;
      subtitle?: string;
      description?: string;
      imageUrl?: string;
      videoUrl?: string;
      phone?: string;
      price?: string;
      badge?: string;
      category?: string;
    }>
  >([]);

  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Load section content when section changes
  useEffect(() => {
    if (!isOpen) return;
    const existing = getDevSectionContent(selectedSectionId);
    if (existing && existing.items && existing.items.length > 0) {
      setItems(existing.items);
    } else {
      // Default items placeholder template based on section
      setItems(getDefaultItemsForSection(selectedSectionId));
    }
    setActiveItemIndex(0);
  }, [selectedSectionId, isOpen]);

  if (!isOpen) return null;

  function getDefaultItemsForSection(secId: string) {
    switch (secId) {
      case 'sec-1':
        return [
          {
            id: 'item-1',
            title: 'গণি মার্কেট ডিজিটাল পোর্টাল ও ব্যবসায়ী হাব',
            subtitle: 'আধুনিক প্রযুক্তিতে সুসজ্জিত সকল দোকান ও সামাজিক ফোরাম',
            description: 'সকল ব্যবসায়ী ও ক্রেতাদের জন্য ডিজিটাল সেবা ও অনলাইন ভিডিও পরিচিতি।',
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            badge: 'ডিজিটাল হাব',
          },
        ];
      case 'sec-2':
        return [
          {
            id: 'item-1',
            title: 'আলহাজ্ব মো: শামসুল হক',
            subtitle: 'সভাপতি, গণি মার্কেট ব্যবসায়ী সমিতি',
            description: 'আমাদের গণি মার্কেটকে একটি আদর্শ ও ডিজিটাল বাণিজ্যিক হাব হিসেবে গড়ে তুলতে আমরা বদ্ধপরিকর। নৈশ প্রহরা থেকে শুরু করে প্রতিটি ব্যবসায়ীর স্বার্থ রক্ষায় সমিতি সর্বদা পাশে আছে।',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            badge: 'সভাপতি ভাষণ',
          },
        ];
      case 'sec-3':
        return [
          {
            id: 'item-1',
            title: 'গণিমার্কেটের এরিয়াল ড্রোন ভিউ ও দোকানের অবস্থান',
            subtitle: 'উত্তর ও দক্ষিণ গলি সীমানা ম্যাপ',
            description: 'মার্কেটের মূল ফটক, পার্কিং এলাকা ও বিভিন্ন গলি ঘুরে দেখুন।',
            imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            badge: '৩ডি ম্যাপ',
          },
        ];
      default:
        return [
          {
            id: 'item-1',
            title: 'নতুন আইটেম / দোকান পরিচিতি',
            subtitle: 'উপ-শিরোনাম লিখুন...',
            description: 'বিস্তারিত তথ্য ও সেবা বিবরণী এখানে লিখুন...',
            imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            badge: 'নতুন সংযোজন',
          },
        ];
    }
  }

  const handleAddItem = () => {
    const newItem = {
      id: 'dev-item-' + Date.now(),
      title: 'নতুন আইটেম/তথ্য শিরোনাম',
      subtitle: 'উপ-শিরোনাম বা সংক্ষিপ্ত তথ্য',
      description: 'এখানে বিবরণ, যোগাযোগের নম্বর ও বিশেষ অফার বা সেবার কথা লিখুন...',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
      videoUrl: '',
      badge: 'ডেভেলপার সংযোজিত',
    };
    const updated = [...items, newItem];
    setItems(updated);
    setActiveItemIndex(updated.length - 1);
  };

  const handleDeleteItem = (index: number) => {
    if (items.length <= 1) {
      alert('কমপক্ষে একটি আইটেম থাকতে হবে!');
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    setActiveItemIndex(Math.max(0, index - 1));
  };

  const handleUpdateActiveItem = (field: string, value: string) => {
    if (activeItemIndex === null) return;
    const updated = [...items];
    updated[activeItemIndex] = {
      ...updated[activeItemIndex],
      [field]: value,
    };
    setItems(updated);
  };

  const handleSaveSection = () => {
    const overrideData: SectionContentOverride = {
      sectionId: selectedSectionId,
      items: items,
    };
    saveDevSectionContent(overrideData);
    setSaveSuccess('সফলভাবে সংরক্ষিত এবং লাইভ ড্যাশবোর্ডে আপডেট হয়েছে!');
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleResetSection = () => {
    if (confirm('আপনি কি এই সেকশনের সকল এডিটিং রিসেট করে ডিফল্ট কন্টেন্টে ফিরতে চান?')) {
      resetDevSectionContent(selectedSectionId);
      const defaults = getDefaultItemsForSection(selectedSectionId);
      setItems(defaults);
      setActiveItemIndex(0);
      setSaveSuccess('রিসেট সম্পন্ন হয়েছে!');
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const currentItem = activeItemIndex !== null ? items[activeItemIndex] : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl space-y-5 relative text-xs my-auto max-h-[92vh] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg shrink-0">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  🛠️ ডেভেলপার ড্যাশবোর্ড: কন্টেন্ট, টেক্সট, ছবি ও ভিডিও এডিটর
                </h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  ডেভেলপার মোড সক্রিয়
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                প্রতিটি সেকশনের লেখা পরিবর্তন, পিকচার URL ও ইউটিউব ভিডিও লিংক সরাসরি সেট করুন।
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs: Editor vs D3 Analytics */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTabMode('editor')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
              activeTabMode === 'editor'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>✏️ কন্টেন্ট এডিটর</span>
          </button>

          <button
            onClick={() => setActiveTabMode('analytics')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
              activeTabMode === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span>📊 সেকশন ইউজ ও ট্রাফিক অ্যানালিটিক্স (D3 Chart)</span>
          </button>
        </div>

        {activeTabMode === 'analytics' ? (
          <div className="space-y-4 my-auto overflow-y-auto">
            <SectionUsageD3Chart
              selectedSectionId={selectedSectionId}
              onSelectSection={(secId) => {
                setSelectedSectionId(secId);
                setActiveTabMode('editor');
              }}
            />
          </div>
        ) : (
          <>
            {/* Section Picker Bar */}
            <div className="space-y-2">
              <label className="block text-slate-300 font-bold flex items-center gap-2 text-xs">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>সম্পাদনা করার জন্য সেকশন নির্বাচন করুন:</span>
              </label>
              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/40 rounded-2xl px-4 py-2.5 text-white font-bold text-xs outline-none focus:border-amber-400"
              >
                {SECTIONS_LIST.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Success Alert Banner */}
            {saveSuccess && (
              <div className="bg-emerald-950/80 border border-emerald-500/60 p-3 rounded-2xl text-emerald-300 font-bold text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{saveSuccess}</span>
                </div>
              </div>
            )}

            {/* Content Layout: Item List (Left) + Editor Form & Preview (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 overflow-y-auto pr-1">
          {/* Left Column: Item Selector */}
          <div className="md:col-span-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-extrabold text-amber-300 text-xs">আইটেম তালিকা ({items.length})</span>
                <button
                  onClick={handleAddItem}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[10px] flex items-center gap-1 cursor-pointer transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>নতুন যোগ করুন</span>
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => setActiveItemIndex(idx)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                      activeItemIndex === idx
                        ? 'bg-amber-500/20 border-amber-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="truncate">
                      <span className="font-bold text-xs block truncate">{item.title || `আইটেম #${idx + 1}`}</span>
                      <span className="text-[10px] opacity-75 block truncate">{item.subtitle || 'কোনো উপ-শিরোনাম নেই'}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(idx);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      title="আইটেম মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleResetSection}
              className="w-full py-2 bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-800 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্ট রিসেট করুন</span>
            </button>
          </div>

          {/* Right Column: Editor Form for Selected Item */}
          <div className="md:col-span-8 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
            {currentItem ? (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-extrabold text-amber-300 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>আইটেম বিবরণ ও মিডিয়া সম্পাদনা করুন (আইটেম #{activeItemIndex! + 1})</span>
                  </h3>
                  {currentItem.badge && (
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] border border-amber-500/30">
                      {currentItem.badge}
                    </span>
                  )}
                </div>

                {/* Field 1: Title */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedSectionId === 'sec-2' ? 'বক্তার/সভাপতির নাম (Name):' : 'মূল শিরোনাম (Title):'}</span>
                    </span>
                    {selectedSectionId === 'sec-2' && <span className="text-[10px] text-amber-400 font-semibold">(এখানে সভাপতির নাম টাইপ করুন)</span>}
                  </label>
                  <input
                    type="text"
                    value={currentItem.title || ''}
                    onChange={(e) => handleUpdateActiveItem('title', e.target.value)}
                    placeholder={selectedSectionId === 'sec-2' ? 'যেমন: আলহাজ্ব মো: আব্দুল লতিফ' : 'শিরোনাম লিখুন...'}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                  />
                </div>

                {/* Field 2: Subtitle */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{selectedSectionId === 'sec-2' ? 'বক্তার পদবী/পরিচয় (Title/Role):' : 'উপ-শিরোনাম বা ট্যাগলাইন (Subtitle):'}</span>
                    </span>
                    {selectedSectionId === 'sec-2' && <span className="text-[10px] text-cyan-400 font-semibold">(যেমন: সভাপতি, গণি মার্কেট)</span>}
                  </label>
                  <input
                    type="text"
                    value={currentItem.subtitle || ''}
                    onChange={(e) => handleUpdateActiveItem('subtitle', e.target.value)}
                    placeholder={selectedSectionId === 'sec-2' ? 'যেমন: সভাপতি, গণি মার্কেট ব্যবসায়ী সমিতি' : 'উপ-শিরোনাম লিখুন...'}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Field 3: Description */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>বিবরণ বা মেসেজ (Description):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={currentItem.description || ''}
                    onChange={(e) => handleUpdateActiveItem('description', e.target.value)}
                    placeholder="বিস্তারিত লেখা লিখুন..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Field 4: Image URL */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5 text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>ছবির ওয়েব লিংক URL (Image Link):</span>
                  </label>
                  <input
                    type="url"
                    value={currentItem.imageUrl || ''}
                    onChange={(e) => handleUpdateActiveItem('imageUrl', e.target.value)}
                    placeholder="https://images.unsplash.com/photo-12345... বা অনলাইন পিকচার লিংক"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-400 font-mono text-[11px]"
                  />
                  {currentItem.imageUrl && (
                    <div className="mt-2 flex items-center gap-3 bg-slate-900 p-2 rounded-xl border border-slate-800">
                      <img
                        src={currentItem.imageUrl}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded-lg border border-slate-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                      <span className="text-[10px] text-slate-400">ছবি লাইভ প্রিভিউ</span>
                    </div>
                  )}
                </div>

                {/* Field 5: YouTube Video URL */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5 text-[11px]">
                    <Youtube className="w-3.5 h-3.5 text-rose-500" />
                    <span>ইউটিউব চ্যানেল / ভিডিও লিংক URL (YouTube Video Link):</span>
                  </label>
                  <input
                    type="url"
                    value={currentItem.videoUrl || ''}
                    onChange={(e) => handleUpdateActiveItem('videoUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID অথবা https://youtu.be/..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500 font-mono text-[11px]"
                  />
                  {currentItem.videoUrl && (
                    <div className="mt-2 space-y-1">
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <Video className="w-3 h-3 text-rose-500" />
                        <span>কনভার্টেড ইউটিউব এম্বেড লিংক:</span>
                      </span>
                      <p className="text-[10px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800 truncate">
                        {parseYouTubeEmbedUrl(currentItem.videoUrl)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto text-slate-600" />
                <p>আইটেম নির্বাচন করুন অথবা নতুন আইটেম যোগ করুন</p>
              </div>
            )}
          </div>
        </div>
        </>
        )}

        {/* Modal Footer Actions */}
        <div className="border-t border-slate-800 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>সংরক্ষণ বাটনে ক্লিক করার সাথে সাথে লাইভ অ্যাপে আপডেট হবে।</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
            >
              বন্ধ করুন
            </button>

            <button
              onClick={handleSaveSection}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>সেভ ও লাইভ আপডেট করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
