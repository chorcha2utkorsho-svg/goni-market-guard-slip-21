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
    title: 'অনলাইন গণিমার্কেট ডিজিটাল পোর্টাল ও ব্যবসায়ী হাব',
    subtitle: 'আধুনিক প্রযুক্তিতে সুসজ্জিত সকল দোকান ও সামাজিক ফোরাম',
    tag: 'ডিজিটাল হাব',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'সকল ব্যবসায়ী ও ক্রেতাদের জন্য ডিজিটাল সেবা, অনলাইন ডিরেক্টরি ও ভিডিও পরিচিতি।',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeIcon: <Sparkles className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 's2',
    title: 'পুরো বাজার এখন হাতের মুঠোয় - সমন্বিত প্ল্যাটফর্ম',
    subtitle: 'উপ-শিরোনাম বা সংক্ষিপ্ত তথ্য ও দিকনির্দেশনা',
    tag: 'বাজার প্ল্যাটফর্ম',
    tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    description: 'বাজারের নিরাপত্তা, সার্বিক উন্নয়ন, জরুরি ঘোষণা এবং প্রতিটি দোকানের তথ্য এখন এক ছাতার নিচে।',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <Store className="w-4 h-4 text-sky-400" />,
  },
  {
    id: 's3',
    title: 'গনি চেয়ারম্যান, একজন মানবিক মহাসমাজ গঠনের পথিকৃৎ',
    subtitle: 'সৃজনশীল মন, সভ্যতার বিকাশ, ন্যায় প্রতিষ্ঠার আন্দোলনে গনি চেয়ারম্যান চিরকাল স্মরণীয়',
    tag: 'স্মরণীয় পথিকৃৎ',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'সত্য ন্যায় আর আত্মবিশ্বাসের মূর্তমান প্রতীক ছিলেন গনি চেয়ারম্যান। গ্রামের একজন হতদরিদ্র মানুষ যখন ধনী প্রভাবশালী মানুষের নির্যাতনের শিকার হতেন তখন তিনি ছিলেন একমাত্র ভরসাস্থল।',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <Users className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 's4',
    title: 'গণি মার্কেট নৈশ নিরাপত্তা ও সুরক্ষা ব্যবস্থা',
    subtitle: '২৪ ঘণ্টার নিশ্ছিদ্র নিরাপত্তা রোস্টার ও পাহারা পরিষদ',
    tag: 'নৈশ নিরাপত্তা',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'ব্যবসায়ীদের নিজস্ব রোস্টারভিত্তিক নিশ্ছিদ্র নৈশ ডিউটি। প্রতি রাতে ৩ জন পাহারা জুটি ও আধুনিক সিসিটিভি মনিটরিংয়ে ১০০% নিরাপদ মার্কেট।',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 's5',
    title: 'উত্তর ও দক্ষিণ গলির চালের পাইকারি আড়ৎ',
    subtitle: 'দিনাজপুর, পাবনা ও কুষ্টিয়ার অটো রাইস মিলের চালের কেন্দ্রবিন্দু',
    tag: 'চাউল ভান্ডার',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'নাজিরশাইল, মিনিকেট, আটাশ, পাইজাম ও সুগন্ধি পোলাও চালের পাইকারি ও খুচরা সরবরাহের জন্য দেশের নির্ভরযোগ্য চাউলের কেন্দ্র।',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600&auto=format&fit=crop&q=80',
    badgeIcon: <Wheat className="w-4 h-4 text-amber-400" />,
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
      <div className="relative h-[280px] xs:h-[320px] sm:h-[400px] md:h-[460px] w-full overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
            </div>
          );
        })}

        {/* Content Box Over Slide - Flexbox Responsive Layout */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-3.5 sm:p-6 md:p-10 max-w-4xl space-y-2 sm:space-y-4">
          <div className="flex items-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border backdrop-blur-md shadow-md ${currentSlide.tagColor}`}
            >
              {currentSlide.badgeIcon}
              <span>{currentSlide.tag}</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono bg-slate-900/90 text-amber-300 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-700/80 backdrop-blur-md">
              ছবি {currentIndex + 1} / {activeSlides.length}
            </span>
          </div>

          <div className="space-y-1 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <h2 className="text-base sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight sm:leading-snug drop-shadow-md line-clamp-2 sm:line-clamp-none">
              {currentSlide.title}
            </h2>
            <p className="text-[11px] sm:text-sm font-semibold text-amber-300 drop-shadow line-clamp-1 sm:line-clamp-none">
              {currentSlide.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl hidden sm:block drop-shadow animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentSlide.description}
          </p>

          {/* Action Links with Flexbox responsive alignment */}
          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            {onExploreDirectory && (
              <button
                onClick={onExploreDirectory}
                className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-amber-950/50 transition cursor-pointer active:scale-95"
              >
                <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                <span>দোকান ডিরেক্টরি</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-950" />
              </button>
            )}

            {onOpenFeed && (
              <button
                onClick={onOpenFeed}
                className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 border border-slate-700/80 backdrop-blur-md transition cursor-pointer active:scale-95"
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                <span>সোশ্যাল ফিড</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Navigation Arrows - Flexbox Centered Touch Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 backdrop-blur-md flex items-center justify-center transition cursor-pointer shadow-xl active:scale-95"
          title="পূর্ববর্তী ছবি"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 backdrop-blur-md flex items-center justify-center transition cursor-pointer shadow-xl active:scale-95"
          title="পরবর্তী ছবি"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
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
