import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Video,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  UserCheck,
  Zap,
  MapPin,
  Scale,
  Award,
  CreditCard,
  History,
  Download,
  Copy,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Search,
  Landmark,
  Compass,
  FileSpreadsheet,
  Building,
  HelpCircle,
  Youtube,
} from 'lucide-react';
import { getDevSectionContent, parseYouTubeEmbedUrl } from '../utils/devCustomContent';

export interface LandServiceItem {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
}

export interface LandConsultant {
  id: string;
  name: string;
  title: string;
  chamberNo: string;
  experience: string;
  specialty: string;
  minFee: number;
  availableTime: string;
  isOnline: boolean;
  avatarUrl: string;
  phone: string;
}

export interface LandConsultationRecord {
  id: string;
  consultantName: string;
  chamberNo: string;
  date: string;
  feePaid: number;
  trxId: string;
  mouzaName: string;
  khatianNo: string;
  dagNo: string;
  landAmount: string;
  disputeSummary: string;
  legalAdvice: string;
  requiredDocuments: string[];
  rawTranscript: string;
}

const LAND_SERVICES: LandServiceItem[] = [
  {
    title: 'অনলাইন ই-নামজারি (মিউটেশন) ও জমাভাগ আবেদন',
    badge: '২৮ দিনে মিউটেশন খতিয়ান',
    badgeColor: 'bg-emerald-500 text-slate-950',
    description: 'মিউটেটেড খতিয়ান, ডিসিআর ও খাজনা হোল্ডিং দ্রুততম সময়ে নিষ্পত্তির সরকারি আবেদন সুবিধা।',
  },
  {
    title: 'CS, SA, RS ও BS ই-খতিয়ান এবং দাগের তথ্য অনুসন্ধান',
    badge: 'ডিজিটাল ম্যাপ ও খতিয়ান',
    badgeColor: 'bg-cyan-500 text-slate-950',
    description: 'মৌজা ও দাগের সিএস, আরএস, বিএস খতিয়ানের মূল রেকর্ড ও পর্চা চেক করার সহায়তা।',
  },
  {
    title: 'অনলাইন ভূমি উন্নয়ন কর (খাজনা) পরিশোধ ও দাখিলা',
    badge: 'ইনস্ট্যান্ট দাখিলা রশিদ',
    badgeColor: 'bg-amber-500 text-slate-950',
    description: 'বকেয়া খাজনা হিসাব করে মোবাইল ব্যাংকিংয়ে সরকারি কোষাগারে জমাদান ও ই-দাখিলা গ্রহণ।',
  },
  {
    title: 'সাব-রেজিস্ট্রি দলিল নিরীক্ষা, হেবা ও বায়া দলিল যাচাই',
    badge: '১০০% ভেজালমুক্ত জমি',
    badgeColor: 'bg-rose-500 text-white',
    description: 'ক্রয়ের আগে দলিলের মালিকানা সত্যতা, বায়া দলিল লিঙ্ক ও পাওয়ার অফ অ্যাটর্নি পরীক্ষা।',
  },
];

const CONSULTANTS: LandConsultant[] = [
  {
    id: 'lc-1',
    name: 'অ্যাডভোকেট মো: জহিরুল ইসলাম',
    title: 'সিনিয়র ভূমি আইন পরামর্শক ও রেজিস্ট্রি দলিল বিশেষজ্ঞ',
    chamberNo: '০৫ (গণিমার্কেট ১ম তলা)',
    experience: '১৬ বছরের প্রাক্টিস অভিজ্ঞতা',
    specialty: 'জমি ক্রয়-বিক্রয় চুক্তি, বায়া দলিল ও দেওয়ানী মামলা পরামর্শ',
    minFee: 20,
    availableTime: 'সকাল ১০:০০ - রাত ৯:০০',
    isOnline: true,
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    phone: '০১৮১৮-১১২২৩৩',
  },
  {
    id: 'lc-2',
    name: 'সার্ভেয়ার মো: রফিকুল হোসেন (আমিন)',
    title: 'গভর্নমেন্ট সার্টিফাইড ডিজিটাল আমিন ও নকশা পরিমাপক',
    chamberNo: '০৬ (গণিমার্কেট ১ম তলা)',
    experience: '২০ বছরের মাঠপর্যায় অভিজ্ঞতা',
    specialty: 'ডিজিটাল জিপিএস মেশিন দ্বারা নিখুঁত জমি পরিমাপ ও নকশা সীমানা নিরূপণ',
    minFee: 20,
    availableTime: '২৪ ঘণ্টা অনলাইন পরামর্শ',
    isOnline: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    phone: '০১৭১২-৪৪৫৫৬৬',
  },
  {
    id: 'lc-3',
    name: 'আলহাজ্ব মো: আব্দুল কদ্দুস',
    title: 'সাবেক ইউনিয়ন ভূমি উপ-সহকারী ও মিউটেশন স্পেশালিস্ট',
    chamberNo: '০৭ (গণিমার্কেট ১ম তলা)',
    experience: '২৫ বছরের সরকারি অভিজ্ঞতা',
    specialty: 'ই-নামজারি, খতিয়ান সংশোধন, মিসকেস সমাধান ও খাজনা ডিসিআর',
    minFee: 20,
    availableTime: 'বিকাল ৪:০০ - রাত ১০:০০',
    isOnline: true,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    phone: '০১৯১১-৭৭৮৮৯৯',
  },
];

const INITIAL_RECORDS: LandConsultationRecord[] = [
  {
    id: 'l-rec-1',
    consultantName: 'অ্যাডভোকেট মো: জহিরুল ইসলাম',
    chamberNo: 'গণিমার্কেট চেম্বার #০৫',
    date: '১১ আগস্ট ২০২৬, বিকাল ০৫:৩০',
    feePaid: 20,
    trxId: 'BKASH99L3381',
    mouzaName: 'কৃষ্ণপুর (জেএল নম্বর: ১৪)',
    khatianNo: 'আরএস খতিয়ান #৪৫২, বিএস খতিয়ান #১৮০',
    dagNo: 'দাগ নম্বর #১২৮৫, ১২৮৬',
    landAmount: '১২.৫ শতক (কাদ জমি)',
    disputeSummary: 'ক্রয়কৃত জমির নামজারি করতে গেলে জানতে পারেন বায়া দলিলে ওয়ারিশান সনদের সাথে ১ জন ওয়ারিশের নামের বানানের গরমিল রয়েছে।',
    legalAdvice: 'প্রথমে স্থানীয় ইউপি চেয়ারম্যান কার্যালয় থেকে সংশোধিত ওয়ারিশ সনদ গ্রহণ করতে হবে। অতঃপর সহকারী কমিশনার (ভূমি) কার্যালয়ে মিসকেস ফাইল করে বায়া দলিলের সংশোধন দাখিল করতে হবে।',
    requiredDocuments: [
      '১. মূল সাফ-কবলা দলিল ও বায়া দলিল',
      '২. ইউপি চেয়ারম্যান কর্তৃক ওয়াারিশান সনদ',
      '৩. হাল সন পর্যন্ত ভূমি উন্নয়ন কর (খাজনা) দাখিলা রশিদ',
      '৪. এনআইডি কার্ডের সত্যয়িত ফটোকপি',
    ],
    rawTranscript: 'ক্লায়েন্ট: স্যার, আমাদের কৃষ্ণপুর মৌজার আরএস ৪৫২ খতিয়ানের ১২.৫ শতক জমির নামজারি আটকে আছে। পরামর্শক: বায়া দলিলের এনআইডি আর ওয়ারিশ সনদে বানান অমিল থাকলে আগে ইউপি চেয়ারম্যানের নিকট থেকে কারেকশন সার্টিফিকেট নিতে হবে। তারপর মিসকেস এসি ল্যান্ড অফিসে জমা দিন।',
  },
];

export const LandServicesConsultantSection: React.FC = () => {
  const [consultantsList, setConsultantsList] = useState<LandConsultant[]>(CONSULTANTS);
  const [activeTab, setActiveTab] = useState<'services' | 'teleconsultant' | 'records'>('services');
  const [selectedConsultant, setSelectedConsultant] = useState<LandConsultant | null>(null);

  useEffect(() => {
    const loadDevContent = () => {
      const devData = getDevSectionContent('sec-9');
      if (devData && devData.items && devData.items.length > 0) {
        const customConsultants: LandConsultant[] = devData.items.map((item, idx) => ({
          id: item.id || `dev-c-${idx}`,
          name: item.title,
          title: item.subtitle || 'ভূমি বিশেষজ্ঞ ও আইন পরামর্শক',
          specialty: item.badge || 'ভূমি সেবা বিশেষজ্ঞ',
          experience: '১০+ বছরের অভিজ্ঞতা',
          chamberNo: `${idx + 1}`,
          minFee: 20,
          availableTime: 'সকাল ১০:০০ - রাত ০৯:০০',
          isOnline: true,
          rating: '৪.৯ ★★★★★',
          avatarUrl: item.imageUrl || CONSULTANTS[0].avatarUrl,
          phone: item.phone || '০১৭১১-০০১১২২',
          about: item.description || 'ভূমি রেজিস্ট্রি, ই-নামজারি, খতিয়ান ও সার্ভে পরামর্শ।',
        }));
        setConsultantsList(customConsultants);
      } else {
        setConsultantsList(CONSULTANTS);
      }
    };

    loadDevContent();

    const handleContentUpdate = () => loadDevContent();
    window.addEventListener('goni_dev_content_updated', handleContentUpdate);
    return () => window.removeEventListener('goni_dev_content_updated', handleContentUpdate);
  }, []);

  // bKash Payment & Call States
  const [bkashStep, setBkashStep] = useState<boolean>(false);
  const [bkashNumber, setBkashNumber] = useState<string>('');
  const [bkashPin, setBkashPin] = useState<string>('');
  const [paidFee, setPaidFee] = useState<number>(20);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);

  // Live Speech & Transcription
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [generatedRecord, setGeneratedRecord] = useState<LandConsultationRecord | null>(null);
  const [savedRecords, setSavedRecords] = useState<LandConsultationRecord[]>(INITIAL_RECORDS);

  // Service Order Form Modal
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [landDetailsInput, setLandDetailsInput] = useState<string>('');
  const [orderSuccessCode, setOrderSuccessCode] = useState<string | null>(null);

  // Call timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCallActive]);

  // AI Voice Convert Text Phrases during Video Call
  useEffect(() => {
    if (!isCallActive) return;

    const phrases = [
      'ক্লায়েন্ট: "স্যার, আমাদের রূপপুর মৌজার দাগ নম্বর ৪০৫, বিএস খতিয়ান ২২ এর ৭ শতক জমির খাজনা অনলাইন পোর্টালে দেখাচ্ছে না।"',
      'ভূমি পরামর্শক: "আপনার বিএস খতিয়ানটি কি ইতোমধ্যে অনলাইন নামজারি ও হোল্ডিং ট্র্যাকিং সিস্টেমে এন্ট্রি হয়েছে?"',
      'ক্লায়েন্ট: "না স্যার, সাবেক মালিকের নামেই হোল্ডিং থেকে গেছে।"',
      'ভূমি পরামর্শক: "তাহলে প্রথমে আপনাকে নামজারির কপি ও সর্বশেষ দাখিলা নিয়ে স্থানীয় ইউনিয়ন ভূমি অফিসে এন্ট্রি আবেদন জমা দিতে হবে। এরপর ই-নামজারি পোর্টালে অনলাইন হোল্ডিং খুলবে।"',
      'এআই ভয়েস এনালাইজার: "কথোপকথন রিয়েল-টাইমে টেক্সটে রূপান্তর করে মৌজা, খতিয়ান, দাগ ও আইনি সিদ্ধান্ত পৃথক কলামে নথিভুক্ত হচ্ছে..."',
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < phrases.length) {
        setLiveTranscript(phrases[idx]);
        idx++;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isCallActive]);

  const handleInitiateCall = (consultant: LandConsultant) => {
    setSelectedConsultant(consultant);
    setBkashStep(true);
    setIsCallActive(false);
    setGeneratedRecord(null);
  };

  const handleVerifyBkash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bkashNumber || bkashNumber.length < 11) {
      alert('অনুগ্রহ করে ১১ ডিজিটের সঠিক বিকাশ নম্বর লিখুন!');
      return;
    }
    setBkashStep(false);
    setIsCallActive(true);
    setLiveTranscript('ভিডিও চেম্বার যুক্ত হচ্ছে... ভয়েস এনালাইজার টেক্সট রূপান্তরক চালু করা হয়েছে।');
  };

  const handleEndCallAndProcess = () => {
    setIsCallActive(false);

    const trx = 'BKASH' + Math.floor(100000 + Math.random() * 900000);
    const newRecord: LandConsultationRecord = {
      id: 'l-rec-' + Date.now(),
      consultantName: selectedConsultant?.name || 'ভূমি বিশেষজ্ঞ',
      chamberNo: `${selectedConsultant?.chamberNo}`,
      date: new Date().toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' }),
      feePaid: paidFee,
      trxId: trx,
      mouzaName: 'রূপপুর (জেএল #২১)',
      khatianNo: 'বিএস খতিয়ান #২২',
      dagNo: 'দাগ নম্বর #৪০৫',
      landAmount: '৭ শতক (নাল জমি)',
      disputeSummary: 'অনলাইন ভূমি উন্নয়ন কর পোর্টালে নামজারি খতিয়ানের নতুন হোল্ডিং নম্বর আপডেট না থাকা এবং সাবেক মালিকের নাম প্রদর্শন।',
      legalAdvice: 'সহকারী কমিশনার (ভূমি) এর অনুমোদিত নামজারি খতিয়ান, ডিসিআর ও খতিয়ানের কপি সহ ইউনিয়ন ভূমি সহকারী কর্মকর্তা (তহশিলদার) বরাবর হোল্ডিং ট্রান্সফার আবেদন করতে হবে।',
      requiredDocuments: [
        '১. এসি ল্যান্ড অনুমোদিত মিউটেশন খতিয়ান কপি',
        '২. নামজারি ডিসিআর দাখিলা রশিদ',
        '৩. মূল সাফ-কবলা রেজিস্ট্রি দলিল',
        '৪. আবেদনকারীর জাতীয় পরিচয়পত্র (NID)',
      ],
      rawTranscript: liveTranscript || 'কথা টেক্সট কনভার্টার দ্বারা স্বয়ংক্রিয়ভাবে প্রসেস করা হয়েছে।',
    };

    setGeneratedRecord(newRecord);
    setSavedRecords((prev) => [newRecord, ...prev]);
  };

  const handleServiceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone || !clientName) {
      alert('অনুগ্রহ করে নাম ও ফোন নম্বর পূরণ করুন!');
      return;
    }
    const code = 'GONI-LAND-' + Math.floor(100000 + Math.random() * 900000);
    setOrderSuccessCode(code);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/60 to-slate-950 border border-amber-800/50 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-950/60 shrink-0">
            <Landmark className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white">
                নবম সেকশন: গণিমার্কেট ভূমি সেবা ও বিশেষজ্ঞ ভূমি পরামর্শদাতা চেম্বার
              </h2>
              <span className="text-[10.5px] bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                ২০ টাকা বিকাশ পরামর্শ ফি
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              ডিজিটাল ই-নামজারি, খতিয়ান, অনলাইন খাজনা ও আইনজীবী-আমিনদের ভিডিও কনসালটেন্সি এবং এআই টেক্সট প্রসেসিং
            </p>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'services'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>ভূমি সেবা ও গ্যালারি</span>
          </button>

          <button
            onClick={() => setActiveTab('teleconsultant')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 relative ${
              activeTab === 'teleconsultant'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 animate-bounce" />
            <span>অনলাইন ভূমি চেম্বার</span>
            <span className="absolute -top-2 -right-1 bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow">
              ২০৳ ফি
            </span>
          </button>

          <button
            onClick={() => setActiveTab('records')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'records'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>সংরক্ষিত নথি ({savedRecords.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LAND SERVICES DIRECTORY & GALLERY */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LAND_SERVICES.map((srv, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-3xl space-y-3 transition shadow-xl group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${srv.badgeColor}`}>
                    {srv.badge}
                  </span>

                  <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedServiceTitle(srv.title);
                    setOrderSuccessCode(null);
                  }}
                  className="w-full mt-3 py-2 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>আবেদন বা পরামর্শ নিন</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Land Services Highlights & Physical Chamber Info */}
          <div className="bg-slate-950 border border-amber-900/40 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-amber-400" />
                  <span>গণিমার্কেট ভূমি সেবা কেন্দ্র ও আইনজীবী চেম্বার সুনির্দিষ্ট স্থান</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  গণিমার্কেট ১ম তলা (লিফট-২ সংলগ্ন), দোকান/চেম্বার নম্বর ০৫, ০৬ ও ০৭
                </p>
              </div>

              <div className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full font-bold flex items-center gap-2 self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4" />
                <span>সরকারি নিবন্ধিত প্রাক্টিশনার ও সার্ভেয়ার</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-extrabold text-amber-300 block">১. ই-মিউটেশন সাহায্য কেন্দ্র:</span>
                <p className="text-slate-400">
                  সহকারী কমিশনার (ভূমি) অফিসে জমা দেওয়ার জন্য আবেদন ফাইল প্রসেস ও শুনানি নোটিশ প্রদান।
                </p>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-extrabold text-amber-300 block">২. ডিজিটাল আমিন মাপজোপ:</span>
                <p className="text-slate-400">
                  মোটরাইজড ডিজিটাল আরটিকে টোটাল স্টেশন জিপিএস দিয়ে সিএস/আরএস ম্যাপ মিলিয়ে সীমানা পিলার স্থাপন।
                </p>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                <span className="font-extrabold text-amber-300 block">৩. টাইটেল সার্চ ও দলিল লিখন:</span>
                <p className="text-slate-400">
                  জমি কেনার আগে বিগত ২৫ বছরের বায়া দলিল চেইন বিশ্লেষণ ও হেবা/সাব-কবলা দলিল ড্রাফটিং।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAND CONSULTANTS TELEMEDICINE-STYLE CHAMBER */}
      {activeTab === 'teleconsultant' && (
        <div className="space-y-6">
          {/* Top Info Header */}
          <div className="bg-slate-950 border border-amber-500/30 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-sm">
                  অনলাইন ভিডিও ভূমি পরামর্শ চেম্বার (২০৳ বিকাশ পেমেন্ট)
                </h3>
                <p className="text-[11px] text-amber-300">
                  অনলাইনে ঘরে বসেই আইনজীবী ও সার্টিফাইড আমিনের পরামর্শ নিন। ভয়েস টু টেক্সট কনভার্টারে তথ্য সুরক্ষিত থাকবে।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-emerald-400 font-bold self-start md:self-auto shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>এআই কথা টু টেক্সট ফিল্টার অন</span>
            </div>
          </div>

          {/* Consultant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {consultantsList.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-3xl space-y-4 transition shadow-2xl relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/40 shrink-0">
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {doc.isOnline && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30 block w-fit mb-1">
                        চেম্বার #{doc.chamberNo}
                      </span>
                      <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition leading-snug">
                        {doc.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{doc.title}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-slate-950 p-3 rounded-2xl border border-slate-800/80 text-[11px]">
                    <div className="flex justify-between text-slate-300">
                      <span>অভিজ্ঞতা:</span>
                      <span className="font-bold text-white">{doc.experience}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>বিশেষজ্ঞতা:</span>
                      <span className="font-bold text-amber-300 truncate max-w-[170px]">{doc.specialty}</span>
                    </div>
                    <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-1 mt-1">
                      <span className="font-bold text-amber-400">বিকাশ পরামর্শ ফি:</span>
                      <span className="font-black text-emerald-400">নূন্যতম ২০ টাকা</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleInitiateCall(doc)}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <Video className="w-4 h-4 text-slate-950" />
                  <span>২০৳ বিকাশ দিয়ে ভিডিও পরামর্শ নিন</span>
                </button>
              </div>
            ))}
          </div>

          {/* GENERATED LAND CONSULTATION RECORD (IF AVAILABLE) */}
          {generatedRecord && (
            <div className="bg-slate-900 border-2 border-emerald-500/50 p-6 rounded-3xl shadow-2xl space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      ভয়েস টু টেক্সট ফিল্টারকৃত ডিজিটাল ভূমি রেকর্ড ও আইনি সিদ্ধান্ত
                    </h3>
                    <p className="text-xs text-emerald-300">
                      পরামর্শদাতা: {generatedRecord.consultantName} • {generatedRecord.date} (মেমো: {generatedRecord.trxId})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>প্রিন্ট / নথি সংরক্ষণ করুন</span>
                </button>
              </div>

              {/* Categorized Land Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">মৌজা নাম:</span>
                  <span className="font-extrabold text-amber-300 text-xs">{generatedRecord.mouzaName}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">খতিয়ান নম্বর:</span>
                  <span className="font-extrabold text-cyan-300 text-xs">{generatedRecord.khatianNo}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">দাগ নম্বর:</span>
                  <span className="font-extrabold text-emerald-300 text-xs">{generatedRecord.dagNo}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">জমির পরিমাণ:</span>
                  <span className="font-extrabold text-rose-300 text-xs">{generatedRecord.landAmount}</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Dispute Summary */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-extrabold border-b border-slate-800 pb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>১. বর্ণিত ভূমির সমস্যা/বিরোধ:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {generatedRecord.disputeSummary}
                  </p>
                </div>

                {/* 2. Legal Advice */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-extrabold border-b border-slate-800 pb-2">
                    <Scale className="w-4 h-4" />
                    <span>২. আইনজীবীর সিদ্ধান্ত ও পরবর্তী আইনি পদক্ষেপ:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {generatedRecord.legalAdvice}
                  </p>
                </div>

                {/* 3. Required Documents */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold border-b border-slate-800 pb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>৩. প্রয়োজনীয় কাগজপত্রের তালিকা:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-200 font-bold">
                    {generatedRecord.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Raw Transcript Footer */}
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-2">
                <span className="font-mono">ভয়েস কনভার্টার টেক্সট: "{generatedRecord.rawTranscript}"</span>
                <span className="text-emerald-400 font-bold shrink-0">বিকাশ পেমেন্ট ট্রানজেকশন সফল</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED LAND RECORDS ARCHIVE */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
            <h3 className="font-black text-white text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <span>পূর্বের ভূমি পরামর্শ ও টেক্সট কনভার্টকৃত রেকর্ডের ডিজিটাল আর্কাইভ</span>
            </h3>
            <span className="text-slate-400">মোট সংরক্ষিত রেকর্ড: {savedRecords.length} টি</span>
          </div>

          <div className="space-y-4">
            {savedRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl hover:border-amber-500/40 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/30 inline-block mb-1">
                      {rec.chamberNo}
                    </span>
                    <h4 className="text-sm font-black text-white">{rec.consultantName}</h4>
                    <p className="text-[11px] text-slate-400">তারিখ: {rec.date} • ট্রানজেকশন আইডি: {rec.trxId}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-xl inline-block">
                      বিকাশ ফি: ৳{rec.feePaid} পরিশোধিত
                    </span>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">মৌজা:</span>
                    <span className="font-bold text-amber-300">{rec.mouzaName}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">খতিয়ান:</span>
                    <span className="font-bold text-cyan-300">{rec.khatianNo}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">দাগ:</span>
                    <span className="font-bold text-emerald-300">{rec.dagNo}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">জমির পরিমাণ:</span>
                    <span className="font-bold text-rose-300">{rec.landAmount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-extrabold text-rose-400 block mb-1">বিরোধ/সমস্যা:</span>
                    <p className="text-slate-300">{rec.disputeSummary}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-extrabold text-sky-400 block mb-1">আইনজীবীর পরামর্শ:</span>
                    <p className="text-slate-300">{rec.legalAdvice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: BKASH PAYMENT FOR CONSULTANT CALL */}
      {bkashStep && selectedConsultant && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative text-xs">
            <button
              onClick={() => setBkashStep(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  বিকাশ পেমেন্ট গেটওয়ে (পরামর্শ ফি)
                </h3>
                <p className="text-[11px] text-pink-300">
                  {selectedConsultant.name} • {selectedConsultant.chamberNo}
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyBkash} className="space-y-3">
              <div className="p-3 bg-pink-950/40 border border-pink-500/30 rounded-2xl space-y-1">
                <span className="text-[11px] text-pink-200 block">নির্ধারিত বিকাশ পরামর্শ ফি:</span>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-amber-400">৳ ২০.০০ টাকা</span>
                  <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded">
                    ইনস্ট্যান্ট কানেক্ট
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  আপনার বিকাশ ওয়ালেট নম্বর:
                </label>
                <input
                  type="tel"
                  required
                  value={bkashNumber}
                  onChange={(e) => setBkashNumber(e.target.value)}
                  placeholder="০১৭XX-XXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  বিকাশ পিন (সিমুলেশন):
                </label>
                <input
                  type="password"
                  required
                  value={bkashPin}
                  onChange={(e) => setBkashPin(e.target.value)}
                  placeholder="XXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>২০ টাকা নিশ্চিত করুন ও কল স্টার্ট করুন</span>
                <Check className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: LIVE VIDEO CALL & AI VOICE ANALYZER INTERFACE */}
      {isCallActive && selectedConsultant && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl space-y-4 relative text-xs flex flex-col justify-between max-h-[92vh] overflow-y-auto">
            {/* Call Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <h3 className="font-black text-white text-sm">
                    অনলাইন ভূমি ভিডিও চেম্বার (লাইভ সংযোগ)
                  </h3>
                  <p className="text-[11px] text-amber-300 font-semibold">
                    {selectedConsultant.name} ({selectedConsultant.chamberNo})
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full text-amber-400 font-mono font-bold">
                সময়কাল: {formatTime(callDuration)}
              </div>
            </div>

            {/* Video Call Grid Stage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative min-h-[220px]">
              {/* Remote Consultant Stream Box */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 h-52 sm:h-60 flex items-center justify-center">
                {!isVideoOff ? (
                  <img
                    src={selectedConsultant.avatarUrl}
                    alt={selectedConsultant.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center space-y-2 text-slate-500">
                    <VideoOff className="w-8 h-8 mx-auto" />
                    <span>ভিডিও বন্ধ রয়েছে</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-white font-bold">
                  {selectedConsultant.name} (পরামর্শদাতা)
                </div>
              </div>

              {/* Client Self Stream Box */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-52 sm:h-60 flex items-center justify-center">
                <div className="text-center space-y-2 text-slate-400">
                  <UserCheck className="w-10 h-10 mx-auto text-amber-400 animate-pulse" />
                  <span className="font-extrabold text-white block">আপনার ডিভাইস ক্যামেরা</span>
                  <span className="text-[10px] text-slate-500">সংযোগ সুরক্ষিত ও এনক্রিপ্টেড</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-white font-bold">
                  আপনি (ক্লায়েন্ট)
                </div>
              </div>
            </div>

            {/* Real-time AI Voice Speech-to-Text Box */}
            <div className="bg-slate-950 border border-amber-500/40 p-3.5 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>লাইভ এআই ভয়েস এনালাইজার (টেক্সটে রূপান্তর হচ্ছে):</span>
                </span>
                <span className="text-emerald-400">অটো রেকর্ডার অন</span>
              </div>
              <p className="text-xs text-slate-200 font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 italic leading-relaxed">
                "{liveTranscript}"
              </p>
            </div>

            {/* Video Call Control Buttons */}
            <div className="flex items-center justify-center gap-4 border-t border-slate-800 pt-3">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3 rounded-2xl border transition cursor-pointer ${
                  isMicMuted ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-2xl border transition cursor-pointer ${
                  isVideoOff ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCallAndProcess}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <PhoneOff className="w-4 h-4" />
                <span>কল শেষ করুন ও এআই নোট সংরক্ষণ করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SERVICE APPLICATION MODAL */}
      {selectedServiceTitle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative text-xs">
            <button
              onClick={() => setSelectedServiceTitle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  {selectedServiceTitle}
                </h3>
                <p className="text-[11px] text-amber-300">
                  গণিমার্কেট ডিজিটাল ভূমি সেবা আবেদন কেন্দ্র
                </p>
              </div>
            </div>

            {orderSuccessCode ? (
              <div className="bg-emerald-950/80 border border-emerald-500/60 p-5 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg font-black">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-emerald-300">
                    আবেদনটি গ্রহণ করা হয়েছে!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    আমাদের ভূমি বিশেষজ্ঞ খুব দ্রুত আপনার নম্বরে যোগাযোগ করবেন।
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">আবেদন ট্র্যাকিং আইডি:</span>
                  <span className="text-base font-mono font-black text-amber-400">
                    {orderSuccessCode}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedServiceTitle(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  ঠিক আছে
                </button>
              </div>
            ) : (
              <form onSubmit={handleServiceOrderSubmit} className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">আপনার নাম:</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="আপনার পূর্ণ নাম লিখুন..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">মোবাইল নম্বর:</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="০১৭XX-XXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    মৌজা, খতিয়ান ও জমির বিবরণ (যদি থাকে):
                  </label>
                  <textarea
                    rows={2}
                    value={landDetailsInput}
                    onChange={(e) => setLandDetailsInput(e.target.value)}
                    placeholder="যেমন: মৌজা- কৃষ্ণপুর, খতিয়ান- ৪৫২, দাগ- ১২৮৫..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
                >
                  আবেদন সম্পন্ন করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandServicesConsultantSection;
