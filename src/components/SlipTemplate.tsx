import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Clock, AlertTriangle, Calendar, CheckSquare, Wrench, Users, Store, CheckCircle } from 'lucide-react';
import { GuardDutySlipInput } from '../types';
import { formatBengaliFullDate, toBengaliNumerals } from '../utils/bengaliUtils';
import { BarcodeSVG } from './BarcodeSVG';

interface SlipTemplateProps {
  data: GuardDutySlipInput;
  slipNumber?: string;
  copyLabel?: string; // e.g., "১ম পাহারাদারের কপি (১ম পার্টনার)" or "২য় পাহারাদারের কপি (২য় পার্টনার)"
  onVerifyClick?: () => void;
}

export const SlipTemplate: React.FC<SlipTemplateProps> = ({
  data,
  slipNumber = 'GMS-2026-001',
  copyLabel = '১ম পাহারাদারের কপি (১ম পার্টনার)',
  onVerifyClick,
}) => {
  const {
    guard1Name = 'খোরশেদ',
    guard1BusinessType = 'ওয়ার্কশপ',
    guard1ShopNo = '',
    guard2Name = 'কাজল',
    guard2BusinessType = 'রেস্টুরেন্ট',
    guard2ShopNo = '',
    dutyDate,
    roundNumber = 1,
    serialIndex,
    mobileNumber = '01947399752',
    qrCodeUrl = 'https://gonimarket.org/report',
    customInstruction,
    theme = 'classic',
    useBengaliNumerals = true,
  } = data;

  const formattedDate = formatBengaliFullDate(dutyDate);
  const displayPhone = useBengaliNumerals ? toBengaliNumerals(mobileNumber) : mobileNumber;
  const displaySlipNum = useBengaliNumerals ? toBengaliNumerals(slipNumber) : slipNumber;
  const displayRound = useBengaliNumerals ? toBengaliNumerals(roundNumber) : roundNumber;
  const displaySerialIdx = serialIndex ? (useBengaliNumerals ? toBengaliNumerals(serialIndex) : serialIndex) : '';

  // Theme border styling
  const getThemeClass = () => {
    switch (theme) {
      case 'navy':
        return 'border-2 border-slate-800 bg-slate-50 text-slate-900';
      case 'emerald':
        return 'border-2 border-emerald-900 bg-emerald-50/30 text-emerald-950';
      case 'classic':
      default:
        return 'border-2 border-neutral-900 bg-amber-50/20 text-neutral-900';
    }
  };

  const getHeaderBg = () => {
    switch (theme) {
      case 'navy':
        return 'bg-slate-900 text-white';
      case 'emerald':
        return 'bg-emerald-900 text-white';
      case 'classic':
      default:
        return 'bg-red-900 text-white';
    }
  };

  return (
    <div
      className={`relative w-full h-full p-2 flex flex-col justify-between overflow-hidden font-['Hind_Siliguri',sans-serif] ${getThemeClass()}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Outer Thin Border Frame */}
      <div className="absolute inset-1 border border-neutral-400 pointer-events-none rounded-xs opacity-60"></div>

      <div>
        {/* Header */}
        <div className={`p-1 text-center rounded-xs shadow-xs ${getHeaderBg()} mb-1.5`}>
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <h1 className="text-[12px] sm:text-[13px] font-bold leading-tight tracking-tight">
              গণি মার্কেট নৈশকালীন নিরাপত্তা পাহারাদার স্লিপ
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-[8.5px] mt-0.5">
            {copyLabel && (
              <span className="bg-white/20 text-amber-100 px-1 py-0.2 rounded font-medium">
                {copyLabel}
              </span>
            )}
            <span className="bg-amber-400 text-neutral-950 font-bold px-1.5 py-0.2 rounded">
              রাউন্ড-{displayRound} {displaySerialIdx ? `(ক্রমিক #${displaySerialIdx})` : ''}
            </span>
          </div>
        </div>

        {/* Date & Time Bar */}
        <div className="bg-neutral-900 text-white p-1 rounded-xs mb-1.5 text-[9.5px] flex items-center justify-between font-medium">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-400 shrink-0" />
            <span>তারিখ: <strong className="text-amber-200">{formattedDate}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>সময়: <strong className="text-emerald-200">রাত ১০টা - সকাল ৬টা</strong></span>
          </div>
        </div>

        {/* Two Guards Duty Block */}
        <div className="bg-white border border-neutral-300 rounded p-1.5 mb-1.5 shadow-2xs text-[10px] space-y-1">
          <div className="flex items-center gap-1 border-b border-neutral-200 pb-1 text-neutral-800 font-bold text-[10.5px]">
            <Users className="w-3.5 h-3.5 text-red-700 shrink-0" />
            <span>নৈশ পাহারাদার দ্বয় (Guard Duty Pair):</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[9.5px] pt-0.5">
            {/* Guard 1 */}
            <div className="bg-amber-50/60 border border-amber-200 p-1 rounded space-y-0.5">
              <div className="font-bold text-neutral-900 flex items-center justify-between">
                <span className="text-red-900">১ম পাহারাদার:</span>
                <span className="text-[8.5px] text-neutral-500 font-mono">
                  {guard1ShopNo ? `দোকান: ${guard1ShopNo}` : ''}
                </span>
              </div>
              <div className="text-neutral-950 font-bold text-[10.5px]">{guard1Name || '১ম জনের নাম'}</div>
              <div className="text-neutral-600 flex items-center gap-1 text-[8.5px]">
                <Store className="w-2.5 h-2.5 text-neutral-500" />
                <span>ব্যবসায়িক ধরন: <strong className="text-neutral-800">{guard1BusinessType || '—'}</strong></span>
              </div>
            </div>

            {/* Guard 2 */}
            <div className="bg-blue-50/60 border border-blue-200 p-1 rounded space-y-0.5">
              <div className="font-bold text-neutral-900 flex items-center justify-between">
                <span className="text-blue-900">২য় পাহারাদার:</span>
                <span className="text-[8.5px] text-neutral-500 font-mono">
                  {guard2ShopNo ? `দোকান: ${guard2ShopNo}` : ''}
                </span>
              </div>
              <div className="text-neutral-950 font-bold text-[10.5px]">{guard2Name || '২য় জনের নাম'}</div>
              <div className="text-neutral-600 flex items-center gap-1 text-[8.5px]">
                <Store className="w-2.5 h-2.5 text-neutral-500" />
                <span>ব্যবসায়িক ধরন: <strong className="text-neutral-800">{guard2BusinessType || '—'}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Body */}
        <div className="space-y-1 font-kalpurush text-neutral-900">
          {/* 1. জরুরি নির্দেশনা (Emergency Instructions Box) */}
          <div className="bg-red-50/90 border border-red-300 rounded p-1.5 space-y-1 text-[10px]">
            <div className="flex items-center gap-1 font-bold text-red-950 text-[11px] border-b border-red-200 pb-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-700 shrink-0" />
              <span>জরুরি নির্দেশনা:</span>
            </div>
            <ul className="space-y-0.5 leading-snug pl-1">
              <li className="flex items-start gap-1">
                <span className="text-red-700 font-bold">•</span>
                <span>
                  দায়িত্ব পালনে অপারগ হলে বিকল্প লোক নিতে <strong className="text-red-950 bg-red-100 px-1 rounded font-bold">৩০০ টাকা সহ</strong> বিকাল ৪টার মধ্যে{' '}
                  <strong className="bg-white border border-red-400 text-red-900 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]">
                    {displayPhone}
                  </strong>{' '}
                  নম্বরে যোগাযোগ করুন।
                </span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-red-700 font-bold">•</span>
                <span>
                  ডিউটির দিনে বদলির টাকা পরিশোধে বিলম্ব হলে বা বিকাল ৪টা পর্যন্ত পরিশোধ করে না থাকলে সর্বোচ্চ রাত ৯টা পর্যন্ত দেরি হয়ে গেলে <strong className="text-red-900 font-bold underline">আরও ১০০ টাকা জরিমানা</strong> ধার্য হবে।
                </span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-red-700 font-bold">•</span>
                <span>
                  রাত ১০টার মধ্যে কোনো দায়িত্ব গ্রহণ না করে থাকলে উক্ত ব্যক্তির দোকান বাজার কমিটি কর্তৃক <strong className="text-red-950 bg-red-200 px-1 rounded font-bold">সীলগালা/তালাবন্ধ হবে</strong>। এই আচরণটি উক্ত ব্যক্তির দ্বারা পুরো বাজারের নিরাপত্তা ঝুঁকি সৃষ্টি করা বলে বিবেচিত হবে এবং সেই দায়ে <strong className="text-red-950 underline font-bold">প্রতিদিন ১,০০০ টাকা করে জরিমানা</strong> হতে থাকবে।
                </span>
              </li>
            </ul>
          </div>

          {/* 2. প্রয়োজনীয় সরঞ্জাম & 3. নিরাপত্তা ও রিপোর্টিং Grid */}
          <div className="grid grid-cols-1 gap-1 text-[9.5px]">
            {/* প্রয়োজনীয় সরঞ্জাম */}
            <div className="bg-amber-50/90 border border-amber-300 p-1 rounded">
              <div className="flex items-center gap-1 font-bold text-amber-950 text-[10px] mb-0.5">
                <Wrench className="w-3 h-3 text-amber-800 shrink-0" />
                <span>প্রয়োজনীয় সরঞ্জাম:</span>
              </div>
              <p className="leading-tight text-neutral-900">
                ডিউটির সময় অবশ্যই সাথে <strong className="text-amber-950 font-bold bg-amber-200/80 px-1 rounded">বাঁশি, বল্লম, টর্চ লাইট এবং মোবাইল ফোন</strong> রাখুন।
              </p>
            </div>

            {/* নিরাপত্তা ও রিপোর্টিং */}
            <div className="bg-blue-50/80 border border-blue-300 p-1 rounded space-y-0.5">
              <div className="flex items-center gap-1 font-bold text-blue-950 text-[10px]">
                <CheckSquare className="w-3 h-3 text-blue-800 shrink-0" />
                <span>নিরাপত্তা ও রিপোর্টিং:</span>
              </div>
              <ul className="space-y-0.5 leading-snug text-neutral-900 text-[9px] pl-1">
                <li className="flex items-start gap-1">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>ডিউটি শুরুর সময় তালা চেক করার সময় যদি কেউ দোকানের ভেতরে থাকে, তবে তা তাৎক্ষণিকভাবে রিপোর্টে লিপিবদ্ধ করুন।</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>সন্দেহভাজন কাউকে দেখলে দ্রুত গ্রুপে জানান এবং প্রয়োজনে পাকরাও করুন।</span>
                </li>
              </ul>
            </div>

            {customInstruction && (
              <div className="bg-purple-50 border border-purple-300 p-1 rounded text-[9px] text-purple-950">
                <span className="font-bold text-purple-900">বিশেষ নির্দেশ:</span> {customInstruction}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section: QR Code, 1D Barcode, Dual Signatures, and Slogan */}
      <div className="mt-1 pt-1 border-t border-dashed border-neutral-300 space-y-1 font-kalpurush">
        <div className="flex items-center justify-between gap-1">
          {/* QR Code & 1D Barcode Combined Block */}
          <div className="flex items-center gap-1.5 bg-white border border-neutral-300 p-0.5 rounded shadow-2xs">
            {/* QR Code */}
            <div
              onClick={onVerifyClick}
              className="cursor-pointer hover:opacity-80 transition"
              title="ডিজিটাল স্লিপ যাচাইকরণে ক্লিক করুন বা স্ক্যান করুন"
            >
              <QRCodeSVG
                value={
                  qrCodeUrl && qrCodeUrl !== 'https://gonimarket.org/report'
                    ? qrCodeUrl
                    : typeof window !== 'undefined'
                    ? `${window.location.origin}${window.location.pathname}?verify=1&slip=${slipNumber}&date=${dutyDate}`
                    : `GMS-VERIFY:${slipNumber}`
                }
                size={34}
                level="M"
              />
            </div>

            {/* 1D Barcode & Verification Label */}
            <div className="flex flex-col items-start text-[7px] leading-tight text-neutral-700">
              <span className="font-bold text-neutral-900 flex items-center gap-0.5 text-[8px]">
                <CheckCircle className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                <span>যাচাইকরণ QR & বারকোড</span>
              </span>
              <BarcodeSVG value={slipNumber} height={14} showText={false} className="my-0.5" />
              <button
                type="button"
                onClick={onVerifyClick}
                className="text-[7px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-1 py-0.2 rounded transition cursor-pointer no-print"
              >
                🔍 সত্যতা যাচাই
              </button>
            </div>
          </div>

          {/* Signatures for Guard 1, Guard 2, and Secretary */}
          <div className="flex gap-2 text-[7.5px] text-neutral-600 text-center pr-0.5">
            <div className="flex flex-col items-center">
              <div className="w-12 border-b border-neutral-400 mb-0.5"></div>
              <span>১ম পাহারাদার</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 border-b border-neutral-400 mb-0.5"></div>
              <span>২য় পাহারাদার</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 border-b border-neutral-400 mb-0.5"></div>
              <span>সচিব/প্রশাসন</span>
            </div>
          </div>
        </div>

        {/* Motivational Slogan Box */}
        <div className="w-full bg-slate-900 text-amber-300 border-2 border-amber-400 p-1 px-2 rounded-md text-center text-[9px] sm:text-[9.5px] leading-tight font-bold tracking-tight shadow-xs font-kalpurush">
          &ldquo;আপনার দোকানের নিরাপত্তা যেমন আপনি কোন আপোষ করবেননা তেমনি পুরোবাজারের প্রতিটি দোকানের নিরাপত্তার বিষয়টি আপনার কাছে ততটাই গুরুত্বপূর্ণ&rdquo;
        </div>
      </div>
    </div>
  );
};

