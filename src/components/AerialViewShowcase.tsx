import React, { useState } from 'react';
import {
  MapPin,
  Maximize2,
  X,
  Eye,
  ShieldCheck,
  Compass,
  Navigation,
  Layers,
  Sparkles,
  Radio,
  Copy,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import defaultAerialImg from '../assets/images/goni_market_aerial_1786112079418.jpg';
import hdMapImg from '../assets/images/goni_market_map_hd_1786113634394.jpg';

interface MarkerPin {
  id: string;
  name: string;
  category: string;
  topPct: number; // Y position in %
  leftPct: number; // X position in %
  color: string;
  description: string;
  details: string;
}

export const AerialViewShowcase: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [selectedPin, setSelectedPin] = useState<MarkerPin | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [activeImageSrc, setActiveImageSrc] = useState<string>(() => {
    try {
      return localStorage.getItem('goni_market_custom_aerial_img') || hdMapImg;
    } catch {
      return hdMapImg;
    }
  });

  const detailedEnglishPrompt = `Top-down 90-degree orthogonal satellite aerial photograph of "Goni Market" (গণি মার্কেট) and surrounding rural Bangladeshi village landscape in Google Maps / Google Earth high-resolution style.

Key Spatial Layout Details:
1. MAIN ROAD: A straight 2-lane dark asphalt highway (R313) passing horizontally from west to east through the center.
2. GONI MARKET COMPLEX (Center-Left): A cluster of silver corrugated tin-roofed shop blocks tightly built along the south side of R313, forming an L-shaped market alley.
3. NORTH OF ROAD (Top-Left): A large open grassy field/lawn with a long rectangular tin-roofed school building labeled "Abdul Goni Madrasa", bordered by dense tropical foliage, banana groves, and tall coconut palm trees.
4. HARDWARE STORE (Center-Right): A medium tin-roofed shop labeled "Joynal Traders" on the north side of R313 with a paved courtyard.
5. SOUTH OF ROAD (Center): A smaller tin-roofed store labeled "Al-Amin Store" next to the market, and further south a larger educational facility labeled "Euro Bangla Technical Training Center".
6. EAST REGION (Far-Right): Dense green tree canopy with a small red-roofed building labeled "Sonmania Mosque" near the edge of R313.
7. ATMOSPHERE: Bright natural sunlight, crisp 4K sharp satellite resolution, realistic soil, foliage, and tin-roof textures without artificial blur or camera angle tilt. No visual UI overlays or map icons burned into the photo.`;

  const detailedBengaliPrompt = `একটি ৯০-ডিগ্রি একদম সোজা পাখির চোখে (Top-Down Orthogonal Satellite Aerial View) তোলা হাই-রেজোলিউশন গুগল আর্থ স্যাটেলাইট ছবি:

১. মাঝখান দিয়ে পূর্ব-পশ্চিমে প্রসারিত একটি কালো অ্যাসফল্ট পাকা দুই লেনের আঞ্চলিক হাইওয়ে (R313)।
২. সড়কের দক্ষিণে মাঝ-বামে রূপালী ঢেউটিনের তৈরী 'গণি মার্কেট' (Goni Market) বাজার শেড ও দোকানপাটের ক্লাস্টার।
৩. সড়কের উত্তরে খোলা সবুজ মাঠ এবং কোণায় 'আব্দুল গণি মাদ্রাসা'র টিনের ঘর, চারিদিকে ঘন কলা বাগান ও নারকেল গাছের সবুজ সমারোহ।
৪. মার্কেটের পূর্বে সড়কের পাশে 'আল-আমীন স্টোর' ও 'জয়নাল ট্রেডার্স' এবং দক্ষিণে 'Euro Bangla Technical Training Center'।
৫. সুনির্দিষ্ট প্রাকৃতিক আলো, অতি-স্পষ্ট স্যাটেলাইট টেক্সচার, ৪K কোয়ালিটি, কোনো ঝাপসা অংশ ছাড়া।`;

  const handleCopyPrompt = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(label);
    setTimeout(() => setCopiedPrompt(null), 2500);
  };

  const handleApplyCustomImage = () => {
    if (!customImageUrl.trim()) return;
    setActiveImageSrc(customImageUrl.trim());
    try {
      localStorage.setItem('goni_market_custom_aerial_img', customImageUrl.trim());
    } catch {
      // ignore
    }
    setCustomImageUrl('');
    setIsPromptModalOpen(false);
  };

  const handleResetImage = () => {
    setActiveImageSrc(hdMapImg);
    try {
      localStorage.removeItem('goni_market_custom_aerial_img');
    } catch {
      // ignore
    }
  };

  // Landmark Pins reflecting actual labels on the uploaded Google Maps satellite view
  const landmarkPins: MarkerPin[] = [
    {
      id: 'abdul-goni-madrasa',
      name: 'আব্দুল গণি মাদ্রাসা ও মাঠ',
      category: 'শিক্ষা প্রতিষ্ঠান ও প্রাঙ্গণ',
      topPct: 20,
      leftPct: 35,
      color: 'bg-emerald-600 border-emerald-300 text-emerald-100',
      description: 'নূরিয়া মোহাম্মদিয়া আব্দুল গণি মাদ্রাসা ও সংলগ্ন সবুজ খেলার মাঠ।',
      details: 'R313 সড়কের উত্তরে অবস্থিত শিক্ষাঙ্গন।',
    },
    {
      id: 'goni-market',
      name: 'গণি মার্কেট (মূল মার্কেট কমপ্লেক্স)',
      category: 'প্রধান বাণিজ্যিক কেন্দ্র',
      topPct: 45,
      leftPct: 38,
      color: 'bg-sky-500 border-sky-300 text-sky-100',
      description: 'গুণিমার্কেটের ৩৫টি নিবন্ধিত দোকান ও নৈশ নিরাপত্তার মূল কেন্দ্রবিন্দু।',
      details: 'R313 আঞ্চলিক সড়কের পার্শ্ববর্তী প্রধান কাঁচা ও পাকা বাজার ভবন এলাকা।',
    },
    {
      id: 'al-amin',
      name: 'আল-আমীন স্টোর',
      category: 'দোকান সিকিউরিটি পোস্ট',
      topPct: 50,
      leftPct: 58,
      color: 'bg-amber-500 border-amber-300 text-amber-100',
      description: 'কেন্দ্রীয় ভ্যারাইটিজ স্টোর ও নিরাপত্তা পর্যবেক্ষন পয়েন্ট।',
      details: 'রাত্রিকালীন পাহারা চলাকালে নিরাপত্তা চেকপয়েন্ট হিসেবে ব্যবহৃত।',
    },
    {
      id: 'joynal-traders',
      name: 'জয়নাল ট্রেডার্স',
      category: 'হার্ডওয়্যার স্টোর',
      topPct: 34,
      leftPct: 62,
      color: 'bg-emerald-500 border-emerald-300 text-emerald-100',
      description: 'নির্মাণ সামগ্রী ও হার্ডওয়্যার মার্চেন্ট।',
      details: 'উত্তরাঞ্চলের প্রবেশদ্বার সংলগ্ন বাজার পয়েন্ট।',
    },
    {
      id: 'euro-bangla',
      name: 'Euro Bangla Technical Training Center',
      category: 'প্রশিক্ষণ ইনস্টিটিউট',
      topPct: 74,
      leftPct: 42,
      color: 'bg-purple-500 border-purple-300 text-purple-100',
      description: 'ভোকেশনাল ও কারিগরি শিক্ষা কেন্দ্র।',
      details: 'মার্কেটের দক্ষিণাঞ্চল সীমানা বেষ্টনী সংলগ্ন।',
    },
    {
      id: 'r313-road',
      name: 'R313 আঞ্চলিক মহাসড়ক',
      category: 'প্রধান যোগাযোগ সড়ক',
      topPct: 48,
      leftPct: 88,
      color: 'bg-red-500 border-red-300 text-red-100',
      description: 'গাজীপুর-কাপাসিয়া সংযোগকারী প্রধান আঞ্চলিক সড়ক।',
      details: 'মার্কেটের সম্মুখভাগ দিয়ে অতিক্রমকারী পাকা সড়ক।',
    },
    {
      id: 'sonmania-mosque',
      name: 'সনমানিয়া পশ্চিম পাড়া জামে মসজিদ',
      category: 'ধর্মীয় উপাসনালয়',
      topPct: 60,
      leftPct: 92,
      color: 'bg-teal-500 border-teal-300 text-teal-100',
      description: 'স্থানীয় জামে মসজিদ ও সামাজিক মিলনকেন্দ্র।',
      details: 'মার্কেটের পূর্বাঞ্চল সীমানা সংলগ্ন।',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden space-y-4">
      {/* Glow Effects */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>স্যাটেলাইট বার্ডস-আই ভিউ</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>লাইভ পেরিমিটার ম্যাপ</span>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
            <span>পাখির চোখে দেখা ঝলমলে গুণিমার্কেট ও চারপাশ</span>
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          </h3>
          <p className="text-xs text-slate-400">
            হাই-রেজোলিউশন স্যাটেলাইট ইমেজারির মাধ্যমে বাজারের দোকানপাট, R313 সড়ক এবং নৈশ পাহারা টহল রুট মানচিত্রায়িত।
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setIsPromptModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 border border-purple-400/40 shadow-md transition cursor-pointer active:scale-97"
            title="ChatGPT / Gemini দিয়ে একই কাঠামোর নতুন ছবি বানানোর প্রম্পট"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI ছবি প্রম্পট টুল</span>
          </button>

          <button
            onClick={() => setShowPins(!showPins)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
              showPins
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showPins ? 'চিহ্ন দৃশ্যমান' : 'চিহ্ন লুকানো'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-97"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>ফুল-স্ক্রিন</span>
          </button>
        </div>
      </div>

      {/* Main Image Viewer Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl group">
        {/* Top Overlay Badge */}
        <div className="absolute top-3 left-3 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-200 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>লোকেশন: গুণিমার্কেট, R313 রোড ক্যাটালগ</span>
        </div>

        {/* Satellite Image */}
        <img
          src={activeImageSrc}
          alt="Goni Market Bird Eye Aerial Satellite View"
          referrerPolicy="no-referrer"
          className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover transition-transform duration-500 group-hover:scale-102"
        />

        {/* Subtle Dark Gradient Overlay for Pins Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 pointer-events-none"></div>

        {/* Interactive Landmark Pins Overlay */}
        {showPins &&
          landmarkPins.map((pin) => (
            <div
              key={pin.id}
              style={{ top: `${pin.topPct}%`, left: `${pin.leftPct}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin"
            >
              <button
                onClick={() => setSelectedPin(pin)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-extrabold shadow-lg border transition-all duration-200 hover:scale-110 cursor-pointer ${pin.color}`}
              >
                <MapPin className="w-3 h-3 shrink-0 animate-bounce" />
                <span className="whitespace-nowrap max-w-[120px] sm:max-w-none truncate">{pin.name}</span>
              </button>

              {/* Hover Tooltip Card */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block w-48 sm:w-56 bg-slate-900 border border-amber-500/40 rounded-xl p-2.5 text-xs text-white shadow-2xl z-30 pointer-events-none">
                <div className="font-bold text-amber-300 text-[11px] flex items-center justify-between">
                  <span>{pin.name}</span>
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1 rounded">{pin.category}</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-1 leading-snug">{pin.description}</p>
              </div>
            </div>
          ))}

        {/* Bottom Legend Overlay Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 overflow-x-auto text-[11px]">
            <span className="text-amber-400 font-bold flex items-center gap-1 shrink-0">
              <Navigation className="w-3 h-3" />
              চিহ্নিত এলাকা:
            </span>
            <span className="text-slate-300 shrink-0">🛒 গুণিমার্কেট মূল ভবন</span>
            <span className="text-slate-300 shrink-0">🏪 আল-আমীন স্টোর</span>
            <span className="text-slate-300 shrink-0">🛠️ জয়নাল ট্রেডার্স</span>
            <span className="text-slate-300 shrink-0">🎓 Euro Bangla Tech</span>
            <span className="text-slate-300 shrink-0">🕌 সনমানিয়া মসজিদ</span>
          </div>

          <button
            onClick={() => setIsFullscreen(true)}
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer shrink-0 ml-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>বড় করে বিস্তারিত দেখুন &rarr;</span>
          </button>
        </div>
      </div>

      {/* Selected Pin Details Box */}
      {selectedPin && (
        <div className="bg-slate-950/90 border border-amber-500/40 rounded-xl p-3.5 text-xs text-slate-200 flex items-start justify-between gap-3 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                {selectedPin.category}
              </span>
              <h4 className="font-bold text-white text-sm">{selectedPin.name}</h4>
            </div>
            <p className="text-slate-300">{selectedPin.description}</p>
            <p className="text-[11px] text-slate-400 italic">{selectedPin.details}</p>
          </div>
          <button
            onClick={() => setSelectedPin(null)}
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* AI Prompt Generator & Image Replace Modal */}
      {isPromptModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-2xl w-full p-5 space-y-4 shadow-2xl relative text-xs">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    ChatGPT / Gemini-র জন্য হুবহু ম্যাপ ম্যাচিং AI প্রম্পট
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    মূল গুগল ম্যাপের ভেতরের কাঠামোর সাথে ১০০% মিল রেখে নতুন ছবি জেনারেট করার প্রম্পট
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prompt Box 1: English (Recommended for DALL-E 3 & Midjourney) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>ChatGPT / Midjourney / Gemini-র জন্য প্রম্পট (English)</span>
                </span>
                <button
                  onClick={() => handleCopyPrompt(detailedEnglishPrompt, 'ENG')}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedPrompt === 'ENG' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt === 'ENG' ? 'কপি হয়েছে!' : 'প্রম্পট কপি করুন'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={6}
                value={detailedEnglishPrompt}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-200 font-mono leading-relaxed focus:outline-none select-all"
              />
            </div>

            {/* Prompt Box 2: Bengali Summary */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-300 flex items-center gap-1.5">
                  <span>বাংলা সংক্ষেপ নির্দেশিকা (বাংলা জেমিনির জন্য)</span>
                </span>
                <button
                  onClick={() => handleCopyPrompt(detailedBengaliPrompt, 'BN')}
                  className="px-2.5 py-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedPrompt === 'BN' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt === 'BN' ? 'কপি হয়েছে!' : 'বাংলা কপি করুন'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={4}
                value={detailedBengaliPrompt}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-300 leading-relaxed focus:outline-none select-all"
              />
            </div>

            {/* Custom Image URL Update Section */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <label className="font-bold text-emerald-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>নতুন জেনারেট করা ছবির URL দিয়ে অ্যাপ রিফ্রেশ করুন:</span>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="https://... (জেনারেট করা ছবির লিংক এখানে পেস্ট করুন)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />

                <button
                  onClick={handleApplyCustomImage}
                  disabled={!customImageUrl.trim()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition cursor-pointer shrink-0"
                >
                  সেট করুন
                </button>
              </div>

              {activeImageSrc !== defaultAerialImg && (
                <div className="flex items-center justify-between text-[11px] text-amber-400 pt-1">
                  <span>আপনি একটি কাস্টম স্যাটেলাইট ছবি ব্যবহার করছেন।</span>
                  <button
                    onClick={handleResetImage}
                    className="underline hover:text-amber-300 cursor-pointer"
                  >
                    মূল ছবিতে ফিরে যান
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8 flex flex-col items-center justify-between overflow-y-auto animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="w-full max-w-6xl flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  পাখির চোখে গুণিমার্কেট ও আশেপাশের ভৌগোলিক মানচিত্র
                </h3>
                <p className="text-xs text-slate-400">
                  R313 সড়ক, বাজার ভবন, ট্রেডার্স, ট্রেনিং সেন্টার ও মসজিদ পয়েন্ট
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Lightbox Image */}
          <div className="relative my-6 max-w-6xl w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <img
              src={activeImageSrc}
              alt="Goni Market High Resolution Aerial View"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[75vh] object-contain bg-black"
            />

            {/* Pins in Fullscreen */}
            {showPins &&
              landmarkPins.map((pin) => (
                <div
                  key={'fs-' + pin.id}
                  style={{ top: `${pin.topPct}%`, left: `${pin.leftPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold shadow-2xl border ${pin.color}`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{pin.name}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Modal Footer Controls */}
          <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>গুণিমার্কেট বাজার সমিতি কর্তৃক অনুমোদিত নৈশ নিরাপত্তা সীমানা মানচিত্র</span>
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
