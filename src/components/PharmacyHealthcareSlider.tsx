import React, { useState, useEffect, useRef } from 'react';
import {
  HeartPulse,
  Activity,
  Plus,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Store,
  Clock,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Upload,
  Send,
  Truck,
  Award,
  AlertCircle,
  Pill,
  Stethoscope,
  Thermometer,
  Zap,
  X,
  Phone,
  Check,
  Search,
  Crosshair,
  Percent,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  CreditCard,
  History,
  Download,
  Copy,
  UserCheck,
  Volume2,
  FileSpreadsheet,
  MessageSquare,
  BadgeCheck,
  Sparkle,
} from 'lucide-react';

export interface PharmacyServiceItem {
  title: string;
  badge: string;
  description: string;
  badgeColor: string;
}

export interface VillageDoctor {
  id: string;
  name: string;
  degree: string;
  pharmacyName: string;
  shopNo: string;
  experience: string;
  minFee: number;
  availableTime: string;
  isOnline: boolean;
  avatarUrl: string;
  phone: string;
}

export interface PharmacyItem {
  id: string;
  shopNo: string;
  shopTitle: string;
  ownerName: string;
  pharmacistName: string;
  phone: string;
  emergencyPhone: string;
  imageUrl: string;
  discountRate: string;
  openHours: string;
  specialityBanner: string;
  specialServices: PharmacyServiceItem[];
  doctor: VillageDoctor;
}

export interface TelemedicineRecord {
  id: string;
  doctorName: string;
  pharmacyName: string;
  date: string;
  feePaid: number;
  trxId: string;
  patientSymptoms: string;
  doctorAdvice: string;
  prescribedMedicines: string[];
  rawTranscript: string;
}

const PHARMACIES: PharmacyItem[] = [
  {
    id: 'p1',
    shopNo: '০১',
    shopTitle: 'মেডিকেয়ার ২৪/৭ ফার্মেসী ও ইমার্জেন্সি ড্রাগ হাব',
    ownerName: 'হাজী ডা: রফিকুল ইসলাম',
    pharmacistName: 'ফার্মাসিস্ট মো: আনিসুর রহমান (A-Grade)',
    phone: '০১৭১১-২২৩৩৪৪',
    emergencyPhone: '০১৭১১-৯৯৮৮৭৭',
    imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1200&auto=format&fit=crop&q=80',
    discountRate: '১০% ফ্ল্যাট ডিসকাউন্ট',
    openHours: '২৪ ঘণ্টা খোলা (জরুরী নাইট সার্ভিস)',
    specialityBanner: '২৪ ঘণ্টা জরুরী লাইফ-সেভিং ইনজেকশন, ইনসুলিন, অক্সিজেন সিলিন্ডার সার্ভিস ও হোম ডেলিভারি!',
    specialServices: [
      {
        title: '২৪/৭ ইমার্জেন্সি ফ্রেশ মেডিসিন হোম ডেলিভারি',
        badge: 'জরুরী ৩ মিনিটে ডেলিভারি',
        badgeColor: 'bg-emerald-500 text-slate-950',
        description: 'প্রেসক্রিপশনের ছবি পাঠিয়ে দিলেই অভিজ্ঞ রাইডার সরাসরি বাসায় ওষুধ পৌঁছে দেবে।',
      },
      {
        title: 'মেডিকেল অক্সিজেন সিলিন্ডার ও নেবুলাইজার ভাড়া',
        badge: '২৪ ঘণ্টা জরুরি সাপোর্ট',
        badgeColor: 'bg-cyan-500 text-slate-950',
        description: 'শ্বাসকষ্ট রোগীদের জন্য রিফিল সহ অরিজিনাল অক্সিজেন সিলিন্ডার ও নেবুলাইজার সাপোর্ট।',
      },
      {
        title: 'ইনসুলিন কোল্ড-চেইন স্পেশাল ফ্রিজার স্টোরেজ',
        badge: '১০০% অরিজিনাল টেম্পারেচার',
        badgeColor: 'bg-amber-500 text-slate-950',
        description: 'ডায়াবেটিস রোগীদের ইনসুলিনের গুনগত মান অক্ষুন্ন রাখতে বিশেষ ফ্রিজার কোল্ড চেইন।',
      },
      {
        title: 'ফ্রি ব্লাড প্রেসার (BP) ও অক্সিজেন স্যাচুরেশন পরীক্ষা',
        badge: 'ফ্রি চেকআপ সার্ভিস',
        badgeColor: 'bg-rose-500 text-white',
        description: 'ফার্মেসীতে এসে বিনামূল্যে প্রেশার ও পালস অক্সিমিটার টেস্ট করার বিশেষ সুবিধা।',
      },
    ],
    doctor: {
      id: 'doc1',
      name: 'পল্লী চিকিৎসক ডা: সিরাজুল ইসলাম (RMP, LMAF)',
      degree: 'ডিপ্লোমা ইন পল্লী চিকিৎসা ও ফার্স্ট এইড বিশেষজ্ঞ',
      pharmacyName: 'মেডিকেয়ার ২৪/৭ ফার্মেসী',
      shopNo: '০১',
      experience: '১৫ বছরের অভিজ্ঞতা',
      minFee: 20,
      availableTime: 'সকাল ৯:০০ - রাত ১১:০০',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
      phone: '০১৭১১-২২৩৩৪৪',
    },
  },
  {
    id: 'p2',
    shopNo: '০২',
    shopTitle: 'জনসেবা মডেল ফার্মেসী ও ডায়াগনস্টিক সাপোর্ট কেন্দ্র',
    ownerName: 'ডা: তৌহিদ হোসাইন (মেডিসিন বিশেষজ্ঞ)',
    pharmacistName: 'ফার্মাসিস্ট ফারহানা আক্তার',
    phone: '০১৮১২-৫৫৮৮৯৯',
    emergencyPhone: '০১৮১২-৯৯০০১১',
    imageUrl: 'https://images.unsplash.com/photo-1631549912262-74e4472f883f?w=1200&auto=format&fit=crop&q=80',
    discountRate: '৮% ছাড় + ফ্রি ডায়াবেটিস টেস্ট',
    openHours: 'সকাল ০৭:০০ মি. - রাত ১২:০০ মি.',
    specialityBanner: 'অভিজ্ঞ এমবিবিএস ডাক্তারের ইভনিং চেম্বার, প্রেসক্রিপশন রিভিউ ও লাইভ সুগার টেস্ট!',
    specialServices: [
      {
        title: 'স্পেশালিস্ট এমবিবিএস ডাক্তারের অনলাইন ও অফলাইন চেম্বার',
        badge: 'দৈনিক ডাক্তার চেম্বার',
        badgeColor: 'bg-sky-500 text-slate-950',
        description: 'মেডিসিন ও শিশু রোগের অভিজ্ঞ ডাক্তারের সাথে দেখা ও চেম্বার সিরিয়াল বুকিং।',
      },
      {
        title: 'ইনস্ট্যান্ট ডায়াবেটিস (Blood Sugar) রক্ত পরীক্ষা',
        badge: 'মাত্র ১০ সেকেন্ডে রিপোর্ট',
        badgeColor: 'bg-amber-500 text-slate-950',
        description: 'জার্মান প্রযুক্তির ডিজিটাল গ্লুকোমিটারে ডায়াবেটিস মাত্রা নির্ভুল পরিমাপ।',
      },
      {
        title: 'লাইফটাইম পেশেন্ট কার্ড ও প্রেসক্রিপশন হিস্ট্রি ট্র্যাকিং',
        badge: 'ডিজিটাল রেকর্ড',
        badgeColor: 'bg-emerald-500 text-slate-950',
        description: 'নিয়মিত রোগীদের জন্য ডিজিটাল বারকোড কার্ডের মাধ্যমে ক্যাশব্যাক ও হিস্ট্রি সংরক্ষণ।',
      },
      {
        title: 'প্রথমিক ড্রেসিং, ইনজেকশন ও স্যালাইন পুশ সার্ভিস',
        badge: 'দক্ষ নার্সিং সার্ভিস',
        badgeColor: 'bg-teal-500 text-slate-950',
        description: 'ছোটখাটো কাটা-ছেঁড়া ড্রেসিং ও ফার্স্ট এইড সেবার জন্য অভিজ্ঞ মেল/ফিমেল নার্স।',
      },
    ],
    doctor: {
      id: 'doc2',
      name: 'গ্রাম্য ডাক্তার মো: আনোয়ার হোসেন (RMP, DMF)',
      degree: 'মেডিসিন ও শিশু রোগ পল্লী স্বাস্থ্য পরামর্শক',
      pharmacyName: 'জনসেবা মডেল ফার্মেসী',
      shopNo: '০২',
      experience: '১২ বছরের অভিজ্ঞতা',
      minFee: 20,
      availableTime: '২৪ ঘণ্টা অনলাইন সাপোর্ট',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
      phone: '০১৮১২-৫৫৮৮৯৯',
    },
  },
  {
    id: 'p3',
    shopNo: '০৩',
    shopTitle: 'লাইফ কেয়ার ফার্মাসিউটিক্যালস ও বেবি ড্রাগ সেন্টার',
    ownerName: 'হাজী মো: সাহাব উদ্দীন',
    pharmacistName: 'ফার্মাসিস্ট খন্দকার ইমরান',
    phone: '০১৯১১-৩৩৪৪৫৫',
    emergencyPhone: '০১৯১১-৮৮৯৯০০',
    imageUrl: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1200&auto=format&fit=crop&q=80',
    discountRate: '১২% মেগা মেম্বারশিপ ছাড়',
    openHours: 'সকাল ০৮:০০ মি. - রাত ১১:৩০ মি.',
    specialityBanner: 'নবজাতকের ইম্পোর্টেড ফুড, ডায়াপার, মাদার কেয়ার সামগ্রী ও ১০০% ক্যাবিনেট রেজিস্টার্ড ওষুধ!',
    specialServices: [
      {
        title: 'নবজাতক ও শিশুদের অর্গানিক ফুড ও কেয়ার কর্নার',
        badge: '১০০% অরিজিনাল বেবি প্রোডাক্ট',
        badgeColor: 'bg-pink-500 text-white',
        description: 'সেরেল্যাক, ইনফ্যান্ট মিল্ক, প্রিমিয়াম ডায়াপার ও স্কিন কেয়ার লোশনের বিশেষ আড়ৎ।',
      },
      {
        title: 'মাসিক প্রেসক্রিপশনের ওষুধ রিফিল প্যাকেজ (Monthly Auto-Refill)',
        badge: 'মাসিক ডিসকাউন্ট প্যাকেজ',
        badgeColor: 'bg-amber-500 text-slate-950',
        description: 'প্রতি মাসের ১ তারিখে প্রবীণদের দীর্ঘমেয়াদী প্রেসক্রিপশনের ওষুধ হোম ডেলিভারি।',
      },
      {
        title: 'ডিজিটাল ইসিজি (ECG) ও থার্মাল বডি স্ক্যানার',
        badge: 'হার্ট কেয়ার টেস্ট',
        badgeColor: 'bg-rose-500 text-white',
        description: 'জরুরী ক্ষেত্রে দ্রুত হৃৎপিন্ডের ছন্দ ও ইসিজি স্যাম্পলিং সাপোর্ট।',
      },
      {
        title: 'আন্ডার-প্রিভিলেজড রোগীদের জন্য বিশেষ ফার্স্ট এইড ও মেডিসিন ব্যাংক',
        badge: 'বিনামূল্যে ওষুধ তহবিল',
        badgeColor: 'bg-emerald-500 text-slate-950',
        description: 'অসহায় রোগীদের জন্য জাকাত ও সামাজিক কল্যাণ তহবিল থেকে ফ্রিতে ওষুধ বিতরণ।',
      },
    ],
    doctor: {
      id: 'doc3',
      name: 'ডিপ্লোমা পল্লী চিকিৎসক মো: শফিকুল আলম (LMAF, C-Card)',
      degree: 'প্রবীণ ও মাতৃত্বকালীন স্বাস্থ্যসেবা বিশেষজ্ঞ',
      pharmacyName: 'লাইফ কেয়ার ফার্মাসিউটিক্যালস',
      shopNo: '০৩',
      experience: '১৮ বছরের অভিজ্ঞতা',
      minFee: 20,
      availableTime: 'সকাল ১০:০০ - রাত ১০:০০',
      isOnline: true,
      avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
      phone: '০১৯১১-৩৩৪৪৫৫',
    },
  },
];

// Sample past telemedicine consultation records
const SAMPLE_RECORDS: TelemedicineRecord[] = [
  {
    id: 'rec-101',
    doctorName: 'পল্লী চিকিৎসক ডা: সিরাজুল ইসলাম (RMP)',
    pharmacyName: 'মেডিকেয়ার ২৪/৭ ফার্মেসী (দোকান #০১)',
    date: '১১ আগস্ট ২০২৬, বিকাল ০৪:১৫',
    feePaid: 20,
    trxId: 'BKASH88A192X',
    patientSymptoms: 'গত ২ দিন ধরে তীব্র মাথাব্যথা, হালকা জ্বর (১০১°ফা) ও গায়ে ব্যথা। সকালে বমি বমি ভাব ছিল।',
    doctorAdvice: 'প্রচুর তরল খাবার ও বিশুদ্ধ পানি পান করবেন। ঠান্ডা লাগাবেন না। ৩ দিন পর জ্বর না কমলে রক্ত পরীক্ষা করতে হবে।',
    prescribedMedicines: [
      '১. Tab. Napa Extra (500mg) - ১+১+১ (খাবারের পর ৫ দিন)',
      '২. Cap. Seclo (20mg) - ১+০+১ (খাবারের ২০ মি. আগে)',
      '৩. Oral Saline (ORSaline N) - স্যালাইন পানিতে মিশিয়ে দিনে ২ লিটার',
    ],
    rawTranscript: 'রোগী: ডাক্তার সাহেব, ২ দিন ধরে ১০১ ডিগ্রি জ্বর আর শরীর ব্যথা। ডাক্তার: ঠিক আছে, ঠান্ডা লাগাবেন না। নাপা এক্সট্রা দিনে ৩ টা করে খাবেন, আর সিফলো ক্যাপসুল সকালে আর রাতে খাবারের আগে। প্রচুর পানি আর ওআরএস স্যালাইন খাবেন।',
  },
];

export const PharmacyHealthcareSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slider' | 'telemedicine' | 'records'>('slider');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Modal State for Booking Special Service / Ordering Medicine
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyItem | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [prescriptionText, setPrescriptionText] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [orderSuccessCode, setOrderSuccessCode] = useState<string | null>(null);

  // Telemedicine States
  const [selectedDoctor, setSelectedDoctor] = useState<VillageDoctor | null>(null);
  const [bkashStep, setBkashStep] = useState<boolean>(false);
  const [bkashNumber, setBkashNumber] = useState<string>('');
  const [bkashPin, setBkashPin] = useState<string>('');
  const [paidFee, setPaidFee] = useState<number>(20); // default min 20 BDT
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean>(false);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);

  // AI Voice Analyzer & Transcription State
  const [isAnalyzingVoice, setIsAnalyzingVoice] = useState<boolean>(false);
  const [currentLiveTranscript, setCurrentLiveTranscript] = useState<string>('');
  const [generatedRecord, setGeneratedRecord] = useState<TelemedicineRecord | null>(null);
  const [savedRecords, setSavedRecords] = useState<TelemedicineRecord[]>(SAMPLE_RECORDS);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentPharmacy = PHARMACIES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PHARMACIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PHARMACIES.length) % PHARMACIES.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoPlaying && activeTab === 'slider') {
      interval = setInterval(() => {
        handleNext();
      }, 7000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, currentIndex, activeTab]);

  // Video call timer effect
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

  // Simulated AI Voice Analyzer speech feed during video call
  useEffect(() => {
    if (!isCallActive) return;

    const transcriptPhrases = [
      'রোগী: "ডাক্তার সাহেব, আমার ২ দিন ধরে তীব্র কফ আর সাথে গলা ব্যথা করছে।"',
      'গ্রাম্য ডাক্তার: "আচ্ছা, জ্বর মেপেছেন? শরীরে কোনো খিঁচুনি বা ঠান্ডা লাগা ভাব আছে?"',
      'রোগী: "গতকাল ৯৯.৫° ছিল, কিন্তু গায়ের রগ ও পিঠে ব্যথা করছে।"',
      'গ্রাম্য ডাক্তার: "ঠিক আছে। ভয় পাওয়ার কারণ নেই। আমি গরম জলের ভাপ নিতে বলবো, আর সকালে-রাতে খাওয়ার পর তুসকা কফ সিরাপ খাবেন। গ্যসট্রিকের জন্য ওমিপ্রাজল চলবে।"',
      'এআই ভয়েস এনালাইজার: "কথা টেক্সটে রূপান্তর ও রোগীর লক্ষণ স্বয়ংক্রিয়ভাবে ক্লাসিফাই করা হচ্ছে..."',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < transcriptPhrases.length) {
        setCurrentLiveTranscript(transcriptPhrases[index]);
        index++;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isCallActive]);

  const handleOpenModal = (pharmacy: PharmacyItem, serviceTitle?: string) => {
    setSelectedPharmacy(pharmacy);
    setSelectedService(serviceTitle || pharmacy.specialServices[0]?.title || '');
    setOrderSuccessCode(null);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || !customerName) {
      alert('অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর লিখুন!');
      return;
    }
    const code = 'GONI-MED-' + Math.floor(100000 + Math.random() * 900000);
    setOrderSuccessCode(code);
  };

  // Start Telemedicine Flow with a specific doctor
  const handleInitiateDoctorCall = (doc: VillageDoctor) => {
    setSelectedDoctor(doc);
    setBkashStep(true);
    setIsPaymentVerified(false);
    setIsCallActive(false);
    setGeneratedRecord(null);
  };

  // Process bKash payment simulation
  const handleVerifyBkashPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bkashNumber || bkashNumber.length < 11) {
      alert('অনুগ্রহ করে ১১ ডিজিটের সঠিক বিকাশ নম্বর দিন!');
      return;
    }
    if (paidFee < 20) {
      alert('নূন্যতম বিকাশ ফি ২০ টাকা আবশ্যক!');
      return;
    }

    setIsPaymentVerified(true);
    setBkashStep(false);
    setIsCallActive(true);
    setIsAnalyzingVoice(true);
    setCurrentLiveTranscript('কল যুক্ত হচ্ছে... ভয়েস এনালাইজার রিয়েল-টাইমে সক্রিয় করা হয়েছে।');
  };

  // End Video Call & Trigger AI Voice Analysis
  const handleEndCallAndAnalyze = () => {
    setIsCallActive(false);
    setIsAnalyzingVoice(false);

    // Generate classified prescription text automatically
    const trx = 'BKASH' + Math.floor(100000 + Math.random() * 900000);
    const newRecord: TelemedicineRecord = {
      id: 'rec-' + Date.now(),
      doctorName: selectedDoctor?.name || 'পল্লী চিকিৎসক',
      pharmacyName: `${selectedDoctor?.pharmacyName} (দোকান #${selectedDoctor?.shopNo})`,
      date: new Date().toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' }),
      feePaid: paidFee,
      trxId: trx,
      patientSymptoms: '২ দিন ধরে তীব্র গলা ব্যথা, শুকনো কফ, বুকে হালকা চাপ ও গায়ে জ্বর জ্বর ভাব।',
      doctorAdvice: 'ঈষদুষ্ণ লবণ পানিতে দিনে ৩ বার কুলকুচি করবেন। ধুলাবালি ও ঠান্ডা খাবার বর্জন করবেন। কুসুম গরম পানি পান করুন।',
      prescribedMedicines: [
        '১. Tab. Ace Fast (500mg) - ১+১+১ (খাবারের পর ৪ দিন)',
        '২. Syr. Adrysol / TuskA (2 tsp) - ১+১+১ (খাবারের পর)',
        '৩. Cap. Omeprazole (20mg) - ১+০+১ (খাবারের আধা ঘণ্টা আগে)',
      ],
      rawTranscript: currentLiveTranscript || 'কথা স্বয়ংক্রিয়ভাবে প্রসেস করা হয়েছে।',
    };

    setGeneratedRecord(newRecord);
    setSavedRecords((prev) => [newRecord, ...prev]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Eighth Section Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950/60 to-slate-950 border border-emerald-800/50 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/60 shrink-0">
            <HeartPulse className="w-6 h-6 text-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white">
                অষ্টম সেকশন: ফার্মেসীসমূহের অত্যাধুনিক স্বাস্থ্যসেবা, স্লাইডার ও লাইভ টেলিমেডিসিন চেম্বার
              </h2>
              <span className="text-[10.5px] bg-pink-500/20 text-pink-300 font-extrabold px-2.5 py-0.5 rounded-full border border-pink-500/30">
                ২০ টাকা বিকাশ পরামর্শ ফি
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              গণি মার্কেটের মডেল ফার্মেসীসমূহ, ২০ টাকা বিকাশ ফি দিয়ে পল্লী চিকিৎসকের ভিডিও কল ও ভয়েস এনালাইজার প্রেসক্রিপশন সার্ভিস
            </p>
          </div>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('slider')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'slider'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>ফার্মেসী স্লাইডার</span>
          </button>

          <button
            onClick={() => setActiveTab('telemedicine')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 relative ${
              activeTab === 'telemedicine'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 animate-bounce" />
            <span>লাইভ টেলিমেডিসিন</span>
            <span className="absolute -top-2 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow">
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
            <span>সংরক্ষিত রেকর্ড ({savedRecords.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Main Pharmacy Carousel Container */}
      {activeTab === 'slider' && (
        <div className="relative w-full rounded-3xl overflow-hidden border-2 border-emerald-900/50 bg-slate-950 shadow-2xl space-y-0 group">
          {/* Pharmacy Selector Navigation Bar */}
          <div className="bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 px-5 py-4 border-b border-emerald-800/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-sm sm:text-base font-black text-white">
                {currentPharmacy.shopTitle}
              </h3>
            </div>

            {/* Pharmacy Selection Pills */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-emerald-800/40 overflow-x-auto shrink-0">
              {PHARMACIES.map((ph, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={ph.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                        : 'text-slate-300 hover:text-white bg-slate-950/60'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>দোকান #{ph.shopNo}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slide Stage Grid: Left Photo + Right Special Services */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Pharmacy Image & Emergency Highlight Box */}
            <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] lg:h-auto min-h-[360px] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={currentPharmacy.imageUrl}
                alt={currentPharmacy.shopTitle}
                className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 shadow-lg border border-emerald-300 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-slate-950" />
                  <span>দোকান নম্বর #{currentPharmacy.shopNo}</span>
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-slate-950 shadow-md">
                  {currentPharmacy.discountRate}
                </span>
              </div>

              {/* Open Hours Badge */}
              <div className="absolute top-4 right-4 z-20 bg-slate-950/90 border border-emerald-500/50 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-bold text-emerald-300 flex items-center gap-1.5 shadow-xl">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentPharmacy.openHours}</span>
              </div>

              {/* Speciality Ticker Banner Overlay */}
              <div className="absolute bottom-16 left-4 right-4 z-20 bg-emerald-950/90 border border-emerald-500/50 p-2.5 rounded-xl backdrop-blur-md text-xs text-emerald-200 shadow-2xl flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
                <span className="font-bold leading-snug">{currentPharmacy.specialityBanner}</span>
              </div>

              {/* Bottom Contact & Pharmacist Overlay */}
              <div className="absolute bottom-3 left-4 right-4 z-20 bg-slate-950/95 border border-slate-800 p-3 rounded-xl backdrop-blur-md shadow-2xl space-y-0.5">
                <h4 className="text-xs font-black text-white truncate">
                  {currentPharmacy.pharmacistName}
                </h4>
                <p className="text-[11px] text-amber-300 font-bold">
                  মালিক: {currentPharmacy.ownerName} • মোবাইল: {currentPharmacy.phone}
                </p>
              </div>

              {/* Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
                title="আগের ফার্মেসী"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
                title="পরের ফার্মেসী"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Advanced Healthcare Special Services Dashboard */}
            <div className="lg:col-span-7 p-5 sm:p-6 bg-slate-900 border-t lg:border-t-0 lg:border-l border-emerald-900/40 flex flex-col justify-between space-y-5">
              {/* Header & Emergency Phone Call */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                      ফার্মেসীর বিশেষ সেবা ও হেলথ অপশন
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      {currentPharmacy.shopTitle}
                    </h4>
                  </div>

                  <a
                    href={`tel:${currentPharmacy.emergencyPhone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-white bg-rose-600 hover:bg-rose-500 px-3.5 py-2 rounded-xl font-bold transition shadow-lg shrink-0 self-start sm:self-auto"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-white animate-bounce" />
                    <span>জরুরী কল: {currentPharmacy.emergencyPhone}</span>
                  </a>
                </div>

                {/* Special Services Options List */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <Stethoscope className="w-4 h-4 text-emerald-400" />
                      <span>বিশেষ স্বাস্থসেবা ও সুবিধাসমূহ (যে কোনো একটি নির্বাচন করুন):</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentPharmacy.specialServices.map((srv, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 p-3.5 rounded-2xl space-y-2 transition group/srv flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold shadow-sm ${srv.badgeColor}`}
                          >
                            {srv.badge}
                          </span>

                          <h5 className="text-xs font-bold text-white leading-snug group-hover/srv:text-emerald-300 transition mt-1">
                            {srv.title}
                          </h5>

                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {srv.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleOpenModal(currentPharmacy, srv.title)}
                          className="w-full mt-2 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>এই সেবাটি গ্রহণ করুন</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Telemedicine & Quick Prescription Banner */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-500/20 via-pink-500/10 to-slate-950 border border-pink-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <Video className="w-5 h-5 text-pink-400 shrink-0 animate-pulse" />
                  <div>
                    <span className="font-extrabold block text-pink-300">
                      ২০ টাকা বিকাশ ফি দিয়ে ডাক্তারের সাথে ভিডিও কলে কথা বলুন!
                    </span>
                    <span className="text-[11px] text-slate-300">
                      ভয়েস এনালাইজারের মাধ্যমে লিখিত প্রেসক্রিপশন ও পরামর্শ সংরক্ষণ করুন
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('telemedicine');
                    handleInitiateDoctorCall(currentPharmacy.doctor);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-black text-xs shadow-md transition cursor-pointer shrink-0 active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>ভিডিও কল চেম্বার</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TELEMEDICINE CHAMBER & BKASH PAYMENT SYSTEM */}
      {activeTab === 'telemedicine' && (
        <div className="space-y-6">
          {/* Top Info Banner for Telemedicine */}
          <div className="bg-slate-950 border border-pink-500/30 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-sm">
                  অনলাইন টেলিমেডিসিন পল্লী চিকিৎসক চেম্বার
                </h3>
                <p className="text-[11px] text-pink-300">
                  নূন্যতম ২০ টাকা বিকাশ পেমেন্ট করে যেকোনো ফার্মেসীর গ্রাম্য ডাক্তারের কাছে ঘরে বসেই ভিডিও চিকিৎসা নিন।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-emerald-400 font-bold self-start md:self-auto shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>স্বয়ংক্রিয় ভয়েস এনালাইজার ও ডিজিটাল প্রেসক্রিপশন</span>
            </div>
          </div>

          {/* List of Available Pharmacy Village Doctors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHARMACIES.map((ph) => {
              const doc = ph.doctor;
              return (
                <div
                  key={doc.id}
                  className="bg-slate-900 border border-slate-800 hover:border-pink-500/50 p-5 rounded-3xl space-y-4 transition shadow-xl relative overflow-hidden group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-pink-500/40 shrink-0">
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
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30 block w-fit mb-1">
                          দোকান #{doc.shopNo} • {ph.shopTitle.split(' ')[0]}
                        </span>
                        <h4 className="text-sm font-black text-white group-hover:text-pink-300 transition leading-snug">
                          {doc.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{doc.degree}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 bg-slate-950 p-3 rounded-2xl border border-slate-800/80 text-[11px]">
                      <div className="flex justify-between text-slate-300">
                        <span>অভিজ্ঞতা:</span>
                        <span className="font-bold text-white">{doc.experience}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>সময়সীমা:</span>
                        <span className="font-bold text-emerald-400">{doc.availableTime}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-1 mt-1">
                        <span className="font-bold text-pink-300">বিকাশ ফি:</span>
                        <span className="font-black text-amber-400">নূন্যতম ২০ টাকা</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInitiateDoctorCall(doc)}
                    className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-400 text-white font-black text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Video className="w-4 h-4" />
                    <span>২০৳ বিকাশ দিয়ে ভিডিও কল দিন</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* GENERATED CLINICAL RECORD (IF AVAILABLE) */}
          {generatedRecord && (
            <div className="bg-slate-900 border-2 border-emerald-500/50 p-6 rounded-3xl shadow-2xl space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      ভয়েস এনালাইজার ফিল্টারকৃত ডিজিটাল প্রেসক্রিপশন ও মেডিকেল রেকর্ড
                    </h3>
                    <p className="text-xs text-emerald-300">
                      {generatedRecord.doctorName} • {generatedRecord.date} (মেমো: {generatedRecord.trxId})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>প্রিন্ট/ডাউনলোড</span>
                  </button>
                </div>
              </div>

              {/* Categorized Prescription Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Patient Symptoms */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-extrabold border-b border-slate-800 pb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>১. রোগীর বর্ণিত সমস্যাসমূহ:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {generatedRecord.patientSymptoms}
                  </p>
                </div>

                {/* 2. Doctor Advice */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-extrabold border-b border-slate-800 pb-2">
                    <Stethoscope className="w-4 h-4" />
                    <span>২. ডাক্তারের স্বাস্থ্য পরামর্শ:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {generatedRecord.doctorAdvice}
                  </p>
                </div>

                {/* 3. Prescribed Medicines */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold border-b border-slate-800 pb-2">
                    <Pill className="w-4 h-4" />
                    <span>৩. প্রস্তাবিত ওষুধ ও সেবনবিধি:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-200 font-bold">
                    {generatedRecord.prescribedMedicines.map((med, idx) => (
                      <li key={idx} className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                        {med}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Raw Transcript Footer */}
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-2">
                <span className="font-mono">ভয়েস ট্রান্সক্রিপশন টেক্সট: "{generatedRecord.rawTranscript}"</span>
                <span className="text-emerald-400 font-bold shrink-0">বিকাশ পেমেন্ট সংসংরক্ষিত</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED TELEMEDICINE RECORDS ARCHIVE */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
            <h3 className="font-black text-white text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <span>পূর্বের টেলিমেডিসিন কথাপোকথন ও ডিজিটাল প্রেসক্রিপশন আর্কাইভ</span>
            </h3>
            <span className="text-slate-400">মোট রেকর্ড: {savedRecords.length} টি</span>
          </div>

          <div className="space-y-4">
            {savedRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5 text-xs">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{rec.doctorName}</h4>
                    <p className="text-emerald-400 font-semibold">{rec.pharmacyName}</p>
                  </div>
                  <div className="text-right text-[11px]">
                    <span className="text-slate-400 block">{rec.date}</span>
                    <span className="text-amber-400 font-mono font-bold">বিকাশ TRX: {rec.trxId} ({rec.feePaid}৳)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block mb-1">রোগীর সমস্যা:</span>
                    <p className="text-slate-300">{rec.patientSymptoms}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-sky-400 font-bold block mb-1">ডাক্তারের পরামর্শ:</span>
                    <p className="text-slate-300">{rec.doctorAdvice}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">ঔষধ নির্দেশিকা:</span>
                    <ul className="space-y-1 text-slate-300">
                      {rec.prescribedMedicines.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BKASH PAYMENT MODAL FOR TELEMEDICINE */}
      {bkashStep && selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-pink-500/50 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative text-xs text-white">
            <button
              onClick={() => setBkashStep(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* bKash Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white flex items-center justify-center font-black text-base shrink-0 shadow-lg">
                bKash
              </div>
              <div>
                <h3 className="text-sm font-black text-white">
                  বিকাশ গেটওয়ে - টেলিমেডিসিন পরামর্শ ফি
                </h3>
                <p className="text-[11px] text-pink-300 font-bold">
                  {selectedDoctor.name} ({selectedDoctor.pharmacyName})
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyBkashPayment} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  পরামর্শ ফি (নূন্যতম ২০ টাকা):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[20, 50, 100].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setPaidFee(amt)}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        paidFee === amt
                          ? 'bg-pink-600 text-white border-pink-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {amt} টাকা
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  আপনার বিকাশ মোবাইল নম্বর:
                </label>
                <input
                  type="tel"
                  required
                  value={bkashNumber}
                  onChange={(e) => setBkashNumber(e.target.value)}
                  placeholder="০১৮XX-XXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  বিকাশ পিন (PIN) সিমুলেশন:
                </label>
                <input
                  type="password"
                  required
                  value={bkashPin}
                  onChange={(e) => setBkashPin(e.target.value)}
                  placeholder="XXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-pink-500 font-mono"
                />
              </div>

              <div className="p-3 bg-pink-950/40 rounded-xl border border-pink-500/30 text-[11px] text-pink-200">
                পেমেন্ট সম্পন্ন হওয়া মাত্রই ভিডিও কল অন হবে এবং এআই ভয়েস এনালাইজার চালু হবে।
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-400 text-white font-black text-xs shadow-lg transition cursor-pointer"
              >
                {paidFee} টাকা বিকাশ পেমেন্ট নিশ্চিত করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LIVE VIDEO CALL CHAMBER & AI VOICE ANALYZER SCREEN */}
      {isCallActive && selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-slate-900 border-2 border-pink-500/50 rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col justify-between p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Top Video Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 absolute top-0 left-0" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    লাইভ ভিডিও চিকিৎসা: {selectedDoctor.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-bold">
                    {selectedDoctor.pharmacyName} (দোকান #{selectedDoctor.shopNo})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-amber-400">
                  {formatTime(callDuration)}
                </span>
              </div>
            </div>

            {/* Video Canvas Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-3 flex-1 relative overflow-hidden">
              {/* Doctor Video Display */}
              <div className="md:col-span-8 bg-black rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
                <img
                  src={selectedDoctor.avatarUrl}
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Doctor Overlay Label */}
                <div className="absolute bottom-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-white font-bold">
                  {selectedDoctor.name} (পল্লী চিকিৎসক)
                </div>

                {/* Patient Small Self View (PICTURE IN PICTURE) */}
                <div className="absolute top-4 right-4 z-20 w-28 h-36 bg-slate-900 border-2 border-pink-500/60 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                  {isVideoOff ? (
                    <div className="text-slate-500 text-[10px] text-center p-2">
                      ক্যামেরা বন্ধ
                    </div>
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-300 space-y-1">
                      <UserCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-bold">আপনার ভিডিও</span>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Voice Analyzer Live Subtitle/Transcript Feed */}
              <div className="md:col-span-4 bg-slate-950 p-4 rounded-2xl border border-pink-500/30 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-pink-400 text-xs font-black border-b border-slate-800 pb-2">
                    <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                    <span>ভয়েস এনালাইজার (লাইভ)</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 min-h-[140px] leading-relaxed animate-pulse">
                    {currentLiveTranscript || 'কথোপকথন শোনা হচ্ছে...'}
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-300 space-y-1">
                  <span className="font-bold block">এআই ক্লাসিফায়ার সক্রিয়:</span>
                  <span>কথোপকথন শেষে অটোমেটিক রোগীর সমস্যা, ডাক্তারের পরামর্শ ও ওষুধের তালিকা তৈরি হবে।</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-center gap-4 border-t border-slate-800 pt-3 z-10">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
                  isMicMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
                title={isMicMuted ? 'মাইক্রোফোন অন করুন' : 'মাইক্রোফোন মিউট করুন'}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
                  isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
                title={isVideoOff ? 'ক্যামেরা অন করুন' : 'ক্যামেরা অফ করুন'}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCallAndAnalyze}
                className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-xl transition cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <PhoneOff className="w-4 h-4" />
                <span>কল শেষ ও প্রেসক্রিপশন তৈরি করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SPECIAL SERVICE & MEDICINE ORDER MODAL */}
      {selectedPharmacy && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-xs">
            <button
              onClick={() => setSelectedPharmacy(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  {selectedPharmacy.shopTitle}
                </h3>
                <p className="text-[11px] text-emerald-300 font-semibold">
                  দোকান #{selectedPharmacy.shopNo} • {selectedPharmacy.pharmacistName}
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
                    আপনার রিকোয়েস্টটি সফলভাবে গ্রহণে করা হয়েছে!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    ফার্মাসিস্ট দ্রুততম সময়ে আপনার প্রেসক্রিপশন দেখে আপনাকে কল দেবেন।
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">ট্র্যাকিং মেমো কোড:</span>
                  <span className="text-base font-mono font-black text-amber-400">
                    {orderSuccessCode}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPharmacy(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  ঠিক আছে, বন্ধ করুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    কাঙ্খিত স্বাস্থ্যসেবা/সার্ভিস:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                  >
                    {selectedPharmacy.specialServices.map((srv, idx) => (
                      <option key={idx} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="সাধারণ ওষুধ অর্ডার ও হোম ডেলিভারি">
                      সাধারণ ওষুধ অর্ডার ও হোম ডেলিভারি
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    প্রেসক্রিপশন বা ওষুধের নামসমূহ (লিখুন):
                  </label>
                  <textarea
                    rows={2}
                    value={prescriptionText}
                    onChange={(e) => setPrescriptionText(e.target.value)}
                    placeholder="যেমন: নাপা ৫০০mg (১০টি), ইনসুলিন ল্যান্টাস ১টি, গ্যাসের ওষুধ..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    রোগী বা আপনার নাম:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="আপনার নাম লিখুন..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    ডেলিভারি ঠিকানা (জরুরী ডেলিভারির জন্য):
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="বাসা/হোল্ডিং নম্বর ও এলাকা..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
                >
                  রিকোয়েস্ট ও অর্ডার নিশ্চিত করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyHealthcareSlider;

