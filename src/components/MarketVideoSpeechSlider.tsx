import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Video,
  UserCheck,
  Crown,
  Sparkles,
  Award,
  Timer,
  Clock,
  RotateCcw,
  Youtube,
} from 'lucide-react';
import { getDevSectionContent, parseYouTubeEmbedUrl } from '../utils/devCustomContent';

export interface SpeechVideoItem {
  id: string;
  speakerName: string;
  speakerTitle: string;
  roleTag: 'সভাপতি' | 'বিশেষ ব্যবসায়ী' | 'আমার বক্তব্য' | 'সাধারণ সম্পাদক';
  tagBg: string;
  topicTitle: string;
  speechSummary: string;
  subtitleQuote: string;
  avatarUrl: string;
  videoUrl: string; // HTML5 video MP4 URL
  posterUrl: string;
  durationSeconds: number; // 20 seconds
}

const SPEECHES: SpeechVideoItem[] = [
  {
    id: 'v1',
    speakerName: 'আলহাজ্ব মো: শামসুল হক',
    speakerTitle: 'সভাপতি, গণি মার্কেট ব্যবসায়ী সমিতি',
    roleTag: 'সভাপতি',
    tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    topicTitle: 'বাজারের নিরাপত্তা, ঐক্য ও ভবিষ্যৎ উন্নয়ন পরিকল্পনা',
    speechSummary:
      'আমাদের গণি মার্কেটকে একটি আদর্শ ও ডিজিটাল বাণিজ্যিক হাব হিসেবে গড়ে তুলতে আমরা বদ্ধপরিকর। নৈশ প্রহরা থেকে শুরু করে প্রতিটি ব্যবসায়ীর স্বার্থ রক্ষায় সমিতি সর্বদা পাশে আছে।',
    subtitleQuote:
      '“ব্যবসায়ীদের ঐক্যই আমাদের মূল শক্তি। প্রতিটি স্টলের নিরাপত্তা ও উন্নয়ন নিশ্চিত করাই আমাদের অঙ্গীকার।”',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 20,
  },
  {
    id: 'v2',
    speakerName: 'হাজী রফিকুল ইসলাম (রফিক)',
    speakerTitle: 'মালিক, মেসার্স রফিক ইলেকট্রনিক্স ও বিশিষ্ট ব্যবসায়ী',
    roleTag: 'বিশেষ ব্যবসায়ী',
    tagBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    topicTitle: 'পাইকারি ইলেকট্রনিক্স ও উত্তর-দক্ষিণ গলির আধুনিকায়ন',
    speechSummary:
      'দূর-দূরান্ত থেকে আসা ক্রেতাদের জন্য সিসিটিভি, নাইট এলইডি এবং সহজ চলাচলের সুবিধা থাকায় আমাদের বেচাকেনা দ্বিগুণ বেড়েছে। ডিজিটাল ক্যাটাগরি ডিরেক্টরি এক যুগান্তকারী পদক্ষেপ।',
    subtitleQuote:
      '“ডিজিটাল ড্যাশবোর্ডের মাধ্যমে এখন সাধারণ ক্রেতারাও ঘরে বসেই আমাদের সাথে যোগাযোগ করতে পারছেন।”',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 20,
  },
  {
    id: 'v3',
    speakerName: 'ডিজিটাল আর্কিটেক্ট ও সিস্টেমেটর',
    speakerTitle: 'প্রজেক্ট ডিরেক্টর ও প্ল্যানার (আমার বক্তব্য)',
    roleTag: 'আমার বক্তব্য',
    tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    topicTitle: 'ডিজিটাল পেপারলেস মার্কেট ও আধুনিক কমিউনিটি প্ল্যাটফর্ম',
    speechSummary:
      'আমার মূল ভিশন হলো গণি মার্কেটকে সম্পূর্ণ পেপারলেস ও স্মার্ট মার্কেটে রূপান্তর করা। এই কমন ড্যাশবোর্ড ও সোশ্যাল ফিডের মাধ্যমে প্রতিটি ব্যবসায়ী তাদের বক্তব্য প্রকাশ করতে পারবেন।',
    subtitleQuote:
      '“প্রযুক্তি ও ঐক্যের মেলবন্ধনে আমরা তৈরি করেছি একটি জবাবদিহিতামূলক ও বিশ্বস্ত ডিজিটাল বাজার।”',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 20,
  },
  {
    id: 'v4',
    speakerName: 'সামসুল হুদা',
    speakerTitle: 'সাধারণ সম্পাদক, চাউল ভান্ডার ব্যবসায়ী পরিষদ',
    roleTag: 'সাধারণ সম্পাদক',
    tagBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    topicTitle: 'সুষ্ঠু চাল সরবরাহ ও কৃত্রিম সংকট রোধে শক্ত অবস্থান',
    speechSummary:
      'আমরা নিশ্চিত করেছি যে প্রতিটি আড়তে ন্যায্যমূল্যে উন্নতমানের চাল পাওয়া যাবে। ব্যবসায়ীদের সোশ্যাল ফিডের মাধ্যমে সরাসরি কমপ্লেইন জানানোর সুবিধা রাখা হয়েছে।',
    subtitleQuote:
      '“ভোক্তা ও ব্যবসায়ী উভয়ের স্বার্থ রক্ষায় আমাদের চালের আড়ৎগুলো ১০০% স্বচ্ছতা বজায় রাখবে।”',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    durationSeconds: 20,
  },
];

export const MarketVideoSpeechSlider: React.FC = () => {
  const [speeches, setSpeeches] = useState<SpeechVideoItem[]>(SPEECHES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds timer
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const loadDevContent = () => {
      const devData = getDevSectionContent('sec-2');
      if (devData && devData.items && devData.items.length > 0) {
        // Merge saved custom dev items with default speeches so all 4 items remain active
        const merged: SpeechVideoItem[] = SPEECHES.map((defaultSpeech, idx) => {
          const devItem = devData.items[idx];
          if (!devItem) return defaultSpeech;
          return {
            ...defaultSpeech,
            speakerName: devItem.title || defaultSpeech.speakerName,
            speakerTitle: devItem.subtitle || defaultSpeech.speakerTitle,
            roleTag: (devItem.badge as any) || defaultSpeech.roleTag,
            topicTitle: devItem.title || defaultSpeech.topicTitle,
            speechSummary: devItem.description || defaultSpeech.speechSummary,
            subtitleQuote: devItem.subtitle ? `“${devItem.subtitle}”` : defaultSpeech.subtitleQuote,
            avatarUrl: devItem.imageUrl || defaultSpeech.avatarUrl,
            posterUrl: devItem.imageUrl || defaultSpeech.posterUrl,
            videoUrl: devItem.videoUrl || defaultSpeech.videoUrl,
          };
        });
        setSpeeches(merged);
      } else {
        setSpeeches(SPEECHES);
      }
    };

    loadDevContent();

    const handleContentUpdate = () => loadDevContent();
    window.addEventListener('goni_dev_content_updated', handleContentUpdate);
    return () => window.removeEventListener('goni_dev_content_updated', handleContentUpdate);
  }, []);

  const activeSpeeches = speeches.length > 0 ? speeches : SPEECHES;
  const currentSpeech = activeSpeeches[currentIndex] || activeSpeeches[0];

  // 20 Seconds Timer Countdown & Auto-Advance logic
  useEffect(() => {
    setTimeLeft(20);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Auto-play prevented fallback
        });
      }
    }

    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // 20 seconds completed -> switch to next speech!
            setCurrentIndex((idx) => (idx + 1) % activeSpeeches.length);
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentIndex, activeSpeeches.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSpeeches.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSpeeches.length) % activeSpeeches.length);
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (videoRef.current) videoRef.current.pause();
    } else {
      setIsPlaying(true);
      if (videoRef.current) videoRef.current.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Convert numbers to Bengali numerals
  const toBengali = (num: number) => {
    return num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl space-y-0">
      {/* Top Header Label */}
      <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-md">
            <Video className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>ব্যবসায়ী নেতাদের ২০ সেকেন্ডের ভিডিও বক্তব্য</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 font-extrabold px-2 py-0.5 rounded-full border border-red-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                লাইভ স্পিচ
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              সভাপতি, বিশেষ ব্যবসায়ী ও আমার (ডিজিটাল আর্কিটেক্ট) বক্তব্য অটো-প্লে হচ্ছে
            </p>
          </div>
        </div>

        {/* 20 Second Live Countdown Bar */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span className="text-slate-300 font-medium">পরিবর্তিত হতে বাকি:</span>
          <span className="font-mono font-black text-amber-400 text-sm">
            {toBengali(timeLeft)} সে.
          </span>
        </div>
      </div>

      {/* Main Video Stage Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-slate-950">
        {/* Left/Main Player Box */}
        <div className="lg:col-span-8 relative bg-black min-h-[300px] sm:min-h-[380px] flex items-center justify-center overflow-hidden group">
          {/* HTML5 Video Element or Photo Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 z-10 bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={currentSpeech.posterUrl || currentSpeech.avatarUrl}
                alt={currentSpeech.speakerName}
                className="w-full h-full object-cover object-center animate-in fade-in duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />
              
              {/* Center Play Button Prompt */}
              <button
                onClick={togglePlay}
                className="absolute z-20 px-5 py-3 rounded-2xl bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2.5 backdrop-blur-md cursor-pointer border border-amber-300 transform transition hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-slate-950 text-slate-950" />
                <span>২০ সেকেন্ডের বক্তব্য শুনুন</span>
              </button>
            </div>
          )}

          <video
            ref={videoRef}
            src={currentSpeech.videoUrl}
            poster={currentSpeech.posterUrl || currentSpeech.avatarUrl}
            muted={isMuted}
            playsInline
            loop
            className="w-full h-full object-cover max-h-[420px]"
          />

          {/* Video Overlay Top Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${currentSpeech.tagBg}`}
            >
              {currentSpeech.roleTag === 'সভাপতি' && <Crown className="w-3.5 h-3.5 inline mr-1 text-amber-300" />}
              {currentSpeech.roleTag === 'আমার বক্তব্য' && <Sparkles className="w-3.5 h-3.5 inline mr-1 text-emerald-300" />}
              {currentSpeech.roleTag === 'বিশেষ ব্যবসায়ী' && <Award className="w-3.5 h-3.5 inline mr-1 text-sky-300" />}
              <span>{currentSpeech.roleTag}</span>
            </span>

            <span className="bg-slate-950/80 text-amber-300 px-2.5 py-1 rounded-full text-[11px] font-mono border border-slate-700 backdrop-blur-md">
              {currentIndex + 1} / {SPEECHES.length}
            </span>
          </div>

          {/* Subtitle Floating Caption Overlay */}
          <div className="absolute bottom-12 left-4 right-4 z-20 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/80 shadow-2xl space-y-1 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs sm:text-sm text-amber-200 font-serif italic leading-relaxed">
              {currentSpeech.subtitleQuote}
            </p>
          </div>

          {/* Video Control Bar Bottom */}
          <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 flex items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 transition cursor-pointer"
                title={isPlaying ? 'বিরতি দিন' : 'প্লে করুন'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer text-slate-300"
                title={isMuted ? 'শব্দ শুনুন' : 'মিউট করুন'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <span className="text-[11px] text-slate-300 hidden sm:inline">
                {isMuted ? '(শব্দ বন্ধ আছে, ক্লিক করে চালুকরুন)' : '(শব্দ চালু আছে)'}
              </span>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                title="আগের বক্তব্য"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition cursor-pointer"
                title="পরের বক্তব্য (২০ সে.)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 20 Seconds Timer Visual Bar */}
          <div className="absolute top-0 inset-x-0 z-30 h-1 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            />
          </div>
        </div>

        {/* Right Info & Speaker Playlist Box */}
        <div className="lg:col-span-4 p-5 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-4">
          {/* Active Speaker Info Card - Responsive Flexbox Layout */}
          <div className="space-y-3.5">
            <div className="flex flex-row items-center gap-3 sm:gap-4 p-3 bg-slate-950/80 rounded-2xl border border-amber-500/30 shadow-md">
              <img
                src={currentSpeech.avatarUrl}
                alt={currentSpeech.speakerName}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl object-cover object-center border-2 border-amber-400 shadow-md shrink-0 bg-slate-800"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-sm sm:text-base font-black text-white truncate">{currentSpeech.speakerName}</h4>
                  {currentSpeech.roleTag === 'সভাপতি' && (
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-500/40">
                      👑 সভাপতি
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-300 font-semibold leading-snug truncate mt-0.5">{currentSpeech.speakerTitle}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5">
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentSpeech.topicTitle}</span>
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentSpeech.speechSummary}
              </p>
            </div>
          </div>

          {/* Speeches Playlist Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>বক্তব্যের তালিকা:</span>
              <button
                onClick={() => setTimeLeft(20)}
                className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>পুনরায় প্লে</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {activeSpeeches.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                          isActive
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {toBengali(idx + 1)}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold truncate text-slate-200">{item.speakerName}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.roleTag}</div>
                      </div>
                    </div>

                    {isActive ? (
                      <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded-md shrink-0">
                        ২০ সে.
                      </span>
                    ) : (
                      <Play className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
