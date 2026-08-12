import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShieldCheck,
  Wheat,
  Store,
  Users,
  Sparkles,
  MapPin,
  ArrowRight,
  Video,
} from 'lucide-react';
import { getDevSectionContent, parseYouTubeEmbedUrl } from '../utils/devCustomContent';

export interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  badgeIcon?: React.ReactNode;
}

const SLIDES: SlideItem[] = [
  {
    id: 's1',
    title: 'গণি মার্কেট নৈশ নিরাপত্তা ও সুরক্ষা ব্যবস্থা',
    subtitle: '২৪ ঘণ্টার নিশ্ছিদ্র নিরাপত্তা রোস্টার ও পাহারা পরিষদ',
    tag: 'নৈশ নিরাপত্তা',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'ব্যবসায়ীদের নিজস্ব রোস্টারভিত্তিক নিশ্ছিদ্র নৈশ ডিউটি। প্রতি রাতে ৩ জন পাহারা জুটি ও আধুনিক সিসিটিভি মনিটরিংয়ে ১০০% নিরাপদ মার্কেট।',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 's2',
    title: 'উত্তর ও দক্ষিণ গলির চালের পাইকারি আড়ৎ',
    subtitle: 'দিনাজপুর, পাবনা ও কুষ্টিয়ার অটো রাইস মিলের চালের কেন্দ্রবিন্দু',
    tag: 'চাউল ভান্ডার',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'নাজিরশাইল, মিনিকেট, আটাশ, পাইজাম ও সুগন্ধি পোলাও চালের পাইকারি ও খুচরা সরবরাহের জন্য দেশের নির্ভরযোগ্য চাউলের কেন্দ্র।',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <Wheat className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 's3',
    title: 'ডিজিটাল সলিউশন, আইটি ও আধুনিক প্রযুক্তি কেন্দ্র',
    subtitle: 'সিসিটিভি, কম্পিউটার সেবা, নাইট ভিশন অ্যান্ড এলইডি হাব',
    tag: 'প্রযুক্তি ও ইলেকট্রনিক্স',
    tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    description: 'ব্যবসায়ীদের আধুনিকায়নে সিসিটিভি ক্যামেরা, আইপিএস, ব্যাকআপ পাওয়ার ও আইটি যন্ত্রাংশের পাইকারি সুব্যবস্থা।',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <Sparkles className="w-4 h-4 text-sky-400" />,
  },
  {
    id: 's4',
    title: 'ব্যবসায়ী সমিতির ঐক্য ও সমন্বিত সামাজিক হাব',
    subtitle: 'সকল ব্যবসায়ীর মতামত ও প্রস্তাবনার উন্মুক্ত ফোরাম',
    tag: 'ব্যবসায়ী সমৃদ্ধি',
    tagColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    description: 'বাজারের যেকোনো সংস্কার, নিরাপত্তা উন্নয়ন এবং নতুন ব্যবসার সম্ভাবনা নিয়ে ব্যবসায়ীদের সর্বসম্মত সিদ্ধান্ত গ্রহণ ও ফেসবুক-স্টাইল ওয়াল।',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <Users className="w-4 h-4 text-violet-400" />,
  },
  {
    id: 's5',
    title: 'টেইলার্স, ফ্যাশন, জুয়েলারী ও ঐতিহ্যবাহী সামগ্রী',
    subtitle: 'গণি মার্কেট সেন্ট্রাল শপিং কমপ্লেক্স ও সুসজ্জিত স্টল',
    tag: 'শপিং ও ঐতিহ্য',
    tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    description: 'দক্ষ কারিগরের তৈরি পাঞ্জাবি, প্যান্ট-শার্ট, সুবর্ণ অলঙ্কার ও বিচিত্র সামগ্রীর সুপরিচিত পাইকারি ও খুচরা দোকানসমূহ।',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <Store className="w-4 h-4 text-pink-400" />,
  },
  {
    id: 's6',
    title: 'পাখির চোখে গণি মার্কেট এর দৃষ্টিনন্দন সীমানা',
    subtitle: 'সুপ্রশস্ত উত্তর ও দক্ষিণ গলি এবং কেন্দ্রীয় চত্বর',
    tag: 'অ্যারিয়েল ভিউ',
    tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    description: 'ভৌগোলিকভাবে সুবিন্যস্ত দোকানপাট, প্রতিটি স্টলের সুস্পষ্ট নম্বর ও সহজে চলাচলের জন্য পরিচ্ছন্ন গলি ব্যবস্থা।',
    imageUrl: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <MapPin className="w-4 h-4 text-teal-400" />,
  },
];

interface MarketHeroSliderProps {
  onExploreDirectory?: () => void;
  onOpenFeed?: () => void;
}

export const MarketHeroSlider: React.FC<MarketHeroSliderProps> = ({
  onExploreDirectory,
  onOpenFeed,
}) => {
  const [slides, setSlides] = useState<SlideItem[]>(SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadDevContent = () => {
      const devData = getDevSectionContent('sec-1');
      if (devData && devData.items && devData.items.length > 0) {
        const customSlides: SlideItem[] = devData.items.map((item, idx) => ({
          id: item.id || `dev-s-${idx}`,
          title: item.title,
          subtitle: item.subtitle || '',
          tag: item.badge || 'ডেভেলপার কন্টেন্ট',
          tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          description: item.description || '',
          imageUrl: item.imageUrl || SLIDES[0].imageUrl,
          videoUrl: item.videoUrl,
          badgeIcon: <Sparkles className="w-4 h-4 text-amber-400" />,
        }));
        setSlides(customSlides);
      } else {
        setSlides(SLIDES);
      }
    };

    loadDevContent();

    const handleContentUpdate = () => loadDevContent();
    window.addEventListener('goni_dev_content_updated', handleContentUpdate);
    return () => window.removeEventListener('goni_dev_content_updated', handleContentUpdate);
  }, []);

  const activeSlides = slides.length > 0 ? slides : SLIDES;
  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, activeSlides.length]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group">
      {/* Background Image Carousel with Overlay */}
      <div className="relative h-[320px] sm:h-[400px] md:h-[460px] w-full overflow-hidden">
        {activeSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              } transition-transform duration-1000`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Overlays for High Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
            </div>
          );
        })}

        {/* Content Box Over Slide */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8 md:p-10 max-w-4xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${currentSlide.tagColor}`}
            >
              {currentSlide.badgeIcon}
              <span>{currentSlide.tag}</span>
            </span>
            <span className="text-[11px] font-mono bg-slate-900/80 text-amber-300 px-2.5 py-1 rounded-full border border-slate-700/80 backdrop-blur-md">
              ছবি {currentIndex + 1} / {activeSlides.length}
            </span>
          </div>

          <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
              {currentSlide.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-amber-300 drop-shadow">
              {currentSlide.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl hidden sm:block drop-shadow animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentSlide.description}
          </p>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {onExploreDirectory && (
              <button
                onClick={onExploreDirectory}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/50 transition cursor-pointer active:scale-95"
              >
                <Store className="w-4 h-4 text-slate-950" />
                <span>দোকান ডিরেক্টরি দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            )}

            {onOpenFeed && (
              <button
                onClick={onOpenFeed}
                className="px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-white font-bold text-xs flex items-center gap-2 border border-slate-700/80 backdrop-blur-md transition cursor-pointer active:scale-95"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>সোশ্যাল ফিডে যুক্ত হোন</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 backdrop-blur-md flex items-center justify-center transition cursor-pointer opacity-80 hover:opacity-100 shadow-xl"
          title="পূর্ববর্তী ছবি"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 backdrop-blur-md flex items-center justify-center transition cursor-pointer opacity-80 hover:opacity-100 shadow-xl"
          title="পরবর্তী ছবি"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause Toggle Floating Controller */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-4 top-4 z-30 px-3 py-1.5 rounded-full bg-slate-950/80 text-amber-300 hover:text-white border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5 text-xs font-bold transition cursor-pointer shadow-lg"
          title={isPlaying ? 'অটো-স্লাইড বিরতি দিন' : 'অটো-স্লাইড চালু করুন'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          <span className="hidden sm:inline">{isPlaying ? 'বিরতি' : 'চালু'}</span>
        </button>
      </div>

      {/* Progress Bar for Auto-Play Timer */}
      {isPlaying && (
        <div className="w-full bg-slate-900 h-1 relative overflow-hidden">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-[5000ms] linear w-full origin-left animate-progress"
          />
        </div>
      )}

      {/* Slide Thumbnails & Pagination Indicators */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          {SLIDES.map((slide, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-lg overflow-hidden border transition cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-500/50 scale-105'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
                title={slide.title}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-12 h-8 sm:w-16 sm:h-10 object-cover"
                  referrerPolicy="no-referrer"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white bg-slate-950/80 px-1 rounded">
                      #{idx + 1}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>অটো-স্লাইড চিত্রশালা</span>
        </div>
      </div>
    </div>
  );
};
