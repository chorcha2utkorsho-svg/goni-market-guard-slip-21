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
    guard1Status = 'PRESENT',
    guard1StatusNote = '',
    guard2Name = 'কাজল',
    guard2BusinessType = 'রেস্টুরেন্ট',
    guard2ShopNo = '',
    guard2Status = 'PRESENT',
    guard2StatusNote = '',
    dutyDate,
    roundNumber = 1,
    serialIndex,
    mobileNumber = '01333601029',
    qrCodeUrl = 'https://gonimarket.org/report',
    customInstruction,
    theme = 'classic',
    useBengaliNumerals = true,
  } = data;

  const formattedDate = formatBengaliFullDate(dutyDate);
  const displayPhone = useBengaliNumerals ? toBengaliNumerals(mobileNumber) : mobileNumber;
  const displayRound = useBengaliNumerals ? toBengaliNumerals(roundNumber) : roundNumber;
  const displaySerialIdx = serialIndex ? (useBengaliNumerals ? toBengaliNumerals(serialIndex) : serialIndex) : '';

  // Theme header color
  const getHeaderBgStyle = () => {
    switch (theme) {
      case 'navy':
        return '#0f172a';
      case 'emerald':
        return '#064e3b';
      case 'classic':
      default:
        return '#991b1b';
    }
  };

  return (
    <div
      className="relative w-full h-full p-2 flex flex-col justify-between overflow-hidden font-['Hind_Siliguri',sans-serif] bg-white text-slate-900 border-2 border-slate-800 rounded-sm select-none"
      style={{
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        color: '#0f172a',
      }}
    >
      {/* Outer Thin Inner Border Frame */}
      <div className="absolute inset-0.5 border border-slate-300 pointer-events-none rounded-xs opacity-60"></div>

      <div className="space-y-1">
        {/* Header Banner */}
        <div
          className="p-1.5 rounded-xs shadow-xs text-white"
          style={{ backgroundColor: getHeaderBgStyle(), color: '#ffffff' }}
        >
          <div className="flex items-center justify-center gap-1 text-center">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: '#fde047' }} />
            <h1 className="text-[12px] font-bold leading-tight tracking-tight" style={{ color: '#ffffff' }}>
              গণি মার্কেট নৈশকালীন নিরাপত্তা পাহারাদার স্লিপ
            </h1>
          </div>
          <div className="flex items-center justify-between gap-1 text-[8.5px] mt-1 pt-1 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
            <span
              className="px-1.5 py-0.5 rounded font-medium truncate max-w-[55%]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fef3c7' }}
            >
              {copyLabel}
            </span>
            <span
              className="font-bold px-1.5 py-0.5 rounded shrink-0"
              style={{ backgroundColor: '#fbbf24', color: '#000000' }}
            >
              রাউন্ড-{displayRound} {displaySerialIdx ? `(#${displaySerialIdx})` : ''}
            </span>
          </div>
        </div>

        {/* Date & Time Bar */}
        <div
          className="px-1.5 py-1 rounded-xs text-[9px] flex items-center justify-between font-medium"
          style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
        >
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 shrink-0" style={{ color: '#fbbf24' }} />
            <span>তারিখ: <strong style={{ color: '#fef08a' }}>{formattedDate}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 shrink-0" style={{ color: '#34d399' }} />
            <span>সময়: <strong style={{ color: '#a7f3d0' }}>রাত ১০টা - সকাল ৬টা</strong></span>
          </div>
        </div>

        {/* Status Highlight Banner if Paid Substitute or Absent Unpaid */}
        {(guard1Status === 'ABSENT_UNPAID' || guard2Status === 'ABSENT_UNPAID') && (
          <div
            className="p-1 rounded-xs text-[8.5px] font-bold text-center shadow-2xs flex items-center justify-center gap-1"
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
          >
            <AlertTriangle className="w-3 h-3 shrink-0" style={{ color: '#fde047' }} />
            <span>সতর্কবার্তা: পাহারাদার অনুপস্থিত এবং ফি পরিশোধ করেননি (বকেয়া)!</span>
          </div>
        )}
        {(guard1Status === 'PAID_SUBSTITUTE' || guard2Status === 'PAID_SUBSTITUTE') && guard1Status !== 'ABSENT_UNPAID' && guard2Status !== 'ABSENT_UNPAID' && (
          <div
            className="p-0.5 rounded-xs text-[8.5px] font-bold text-center border"
            style={{ backgroundColor: '#fef3c7', borderColor: '#f59e0b', color: '#78350f' }}
          >
            💰 বিশেষ নোটিশ: পাহারাদার নিজে অনুপস্থিত থেকে বিকল্প টাকা পরিশোধ করেছেন।
          </div>
        )}

        {/* Two Guards Duty Block */}
        <div
          className="border rounded p-1.5 shadow-2xs text-[9.5px] space-y-1"
          style={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a' }}
        >
          <div className="flex items-center gap-1 border-b pb-0.5 font-bold text-[10px]" style={{ color: '#1e293b', borderColor: '#e2e8f0' }}>
            <Users className="w-3.5 h-3.5 shrink-0" style={{ color: '#b91c1c' }} />
            <span>নৈশ পাহারাদার দ্বয় (Guard Duty Pair):</span>
          </div>

          <div className="grid grid-cols-2 gap-1 text-[9px]">
            {/* Guard 1 */}
            <div
              className="p-1 rounded space-y-0.5 border"
              style={{
                backgroundColor: guard1Status === 'ABSENT_UNPAID' ? '#fee2e2' : guard1Status === 'PAID_SUBSTITUTE' ? '#fef3c7' : '#fffbeb',
                borderColor: guard1Status === 'ABSENT_UNPAID' ? '#ef4444' : guard1Status === 'PAID_SUBSTITUTE' ? '#f59e0b' : '#fde68a',
                color: '#0f172a',
              }}
            >
              <div className="font-bold flex items-center justify-between text-[8.5px]">
                <span style={{ color: '#991b1b' }}>১ম পাহারাদার:</span>
                <span className="font-mono" style={{ color: '#475569' }}>
                  {guard1ShopNo ? `দোকান: ${guard1ShopNo}` : ''}
                </span>
              </div>
              <div className="font-bold text-[10px] flex items-center justify-between gap-0.5 flex-wrap" style={{ color: '#000000' }}>
                <span>{guard1Name || '১ম জনের নাম'}</span>
                {guard1Status === 'PAID_SUBSTITUTE' && (
                  <span className="text-[7px] px-1 py-0.2 rounded font-black" style={{ backgroundColor: '#fbbf24', color: '#000000' }}>
                    💰 টাকা পরিশোধিত
                  </span>
                )}
                {guard1Status === 'ABSENT_UNPAID' && (
                  <span className="text-[7px] px-1 py-0.2 rounded font-black" style={{ backgroundColor: '#dc2626', color: '#ffffff' }}>
                    🚨 বকেয়া/অনুপস্থিত
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[8px]" style={{ color: '#475569' }}>
                <Store className="w-2.5 h-2.5 shrink-0" style={{ color: '#64748b' }} />
                <span>ধরন: <strong style={{ color: '#0f172a' }}>{guard1BusinessType || '—'}</strong></span>
              </div>
              {guard1StatusNote && (
                <div className="text-[7.5px] font-medium px-1 rounded mt-0.5" style={{ backgroundColor: '#fef3c7', color: '#78350f' }}>
                  নোট: {guard1StatusNote}
                </div>
              )}
            </div>

            {/* Guard 2 */}
            <div
              className="p-1 rounded space-y-0.5 border"
              style={{
                backgroundColor: guard2Status === 'ABSENT_UNPAID' ? '#fee2e2' : guard2Status === 'PAID_SUBSTITUTE' ? '#fef3c7' : '#eff6ff',
                borderColor: guard2Status === 'ABSENT_UNPAID' ? '#ef4444' : guard2Status === 'PAID_SUBSTITUTE' ? '#f59e0b' : '#bfdbfe',
                color: '#0f172a',
              }}
            >
              <div className="font-bold flex items-center justify-between text-[8.5px]">
                <span style={{ color: '#1e3a8a' }}>২য় পাহারাদার:</span>
                <span className="font-mono" style={{ color: '#475569' }}>
                  {guard2ShopNo ? `দোকান: ${guard2ShopNo}` : ''}
                </span>
              </div>
              <div className="font-bold text-[10px] flex items-center justify-between gap-0.5 flex-wrap" style={{ color: '#000000' }}>
                <span>{guard2Name || '২য় জনের নাম'}</span>
                {guard2Status === 'PAID_SUBSTITUTE' && (
                  <span className="text-[7px] px-1 py-0.2 rounded font-black" style={{ backgroundColor: '#fbbf24', color: '#000000' }}>
                    💰 টাকা পরিশোধিত
                  </span>
                )}
                {guard2Status === 'ABSENT_UNPAID' && (
                  <span className="text-[7px] px-1 py-0.2 rounded font-black" style={{ backgroundColor: '#dc2626', color: '#ffffff' }}>
                    🚨 বকেয়া/অনুপস্থিত
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[8px]" style={{ color: '#475569' }}>
                <Store className="w-2.5 h-2.5 shrink-0" style={{ color: '#64748b' }} />
                <span>ধরন: <strong style={{ color: '#0f172a' }}>{guard2BusinessType || '—'}</strong></span>
              </div>
              {guard2StatusNote && (
                <div className="text-[7.5px] font-medium px-1 rounded mt-0.5" style={{ backgroundColor: '#fef3c7', color: '#78350f' }}>
                  নোট: {guard2StatusNote}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions Body */}
        <div className="space-y-1" style={{ color: '#0f172a' }}>
          {/* 1. জরুরি নির্দেশনা (Emergency Instructions Box) */}
          <div
            className="border rounded p-1.5 space-y-1 text-[9px]"
            style={{ backgroundColor: '#fef2f2', borderColor: '#fca5a5', color: '#0f172a' }}
          >
            <div className="flex items-center gap-1 font-bold text-[10px] border-b pb-0.5" style={{ color: '#991b1b', borderColor: '#fecaca' }}>
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: '#b91c1c' }} />
              <span>জরুরি নির্দেশনা:</span>
            </div>
            <ul className="space-y-1 leading-[1.4] pl-0.5">
              <li className="flex items-start gap-1">
                <span className="font-bold shrink-0" style={{ color: '#dc2626' }}>•</span>
                <span>
                  ডিউটিতে অপারগ হলে বিকল্প লোক নিতে <strong className="px-1 rounded font-bold" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>৩০০ টাকা সহ</strong> রাত ৯:০০ টার মধ্যে{' '}
                  <strong className="font-mono font-bold underline" style={{ color: '#991b1b' }}>{displayPhone}</strong> নম্বরে যোগাযোগ করুন।
                </span>
              </li>
              <li className="flex items-start gap-1">
                <span className="font-bold shrink-0" style={{ color: '#dc2626' }}>•</span>
                <span>
                  যদি রাত ৯:০০ টার মধ্যে বদলীর টাকা জমা না করে থাকেন তবে <strong className="font-bold underline px-1 rounded" style={{ backgroundColor: '#fecaca', color: '#991b1b' }}>১০০ টাকা জরিমানা</strong> হবে।
                </span>
              </li>
              <li className="flex items-start gap-1">
                <span className="font-bold shrink-0" style={{ color: '#dc2626' }}>•</span>
                <span>
                  যদিবা রাত ১০:০০ টার মধ্যেও দায়িত্বশীল না হয়ে থাকেন তবে <strong className="px-1 font-bold rounded" style={{ backgroundColor: '#fecaca', color: '#991b1b' }}>১,০০০ টাকা জরিমানা</strong> হবে। অনাদায়ে বাজার কমিটি <strong className="underline font-bold" style={{ color: '#991b1b' }}>দোকান তালাবদ্ধ করে রাখবেন</strong>।
                </span>
              </li>
            </ul>
          </div>

          {/* 2. প্রয়োজনীয় সরঞ্জাম & 3. নিরাপত্তা ও রিপোর্টিং Grid */}
          <div className="grid grid-cols-1 gap-1 text-[8.5px]">
            {/* প্রয়োজনীয় সরঞ্জাম */}
            <div
              className="border p-1 rounded"
              style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#0f172a' }}
            >
              <div className="flex items-center gap-1 font-bold text-[9.5px] mb-0.5" style={{ color: '#92400e' }}>
                <Wrench className="w-2.5 h-2.5 shrink-0" style={{ color: '#92400e' }} />
                <span>প্রয়োজনীয় সরঞ্জাম:</span>
              </div>
              <p className="leading-tight" style={{ color: '#0f172a' }}>
                ডিউটির সময় অবশ্যই সাথে <strong className="font-bold px-1 rounded" style={{ backgroundColor: '#fef3c7', color: '#78350f' }}>বাঁশি, বল্লম, টর্চ লাইট এবং মোবাইল</strong> রাখুন।
              </p>
            </div>

            {/* নিরাপত্তা ও রিপোর্টিং */}
            <div
              className="border p-1 rounded space-y-0.5"
              style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe', color: '#0f172a' }}
            >
              <div className="flex items-center gap-1 font-bold text-[9.5px]" style={{ color: '#1e40af' }}>
                <CheckSquare className="w-2.5 h-2.5 shrink-0" style={{ color: '#1e40af' }} />
                <span>নিরাপত্তা ও রিপোর্টিং:</span>
              </div>
              <ul className="space-y-0.5 leading-tight text-[8.5px] pl-0.5" style={{ color: '#0f172a' }}>
                <li className="flex items-start gap-1">
                  <span className="font-bold shrink-0" style={{ color: '#2563eb' }}>•</span>
                  <span>তালা চেকের সময় কেউ ভেতরে থাকলে রিপোর্টে লিখুন।</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-bold shrink-0" style={{ color: '#2563eb' }}>•</span>
                  <span>সন্দেহভাজন কাউকে দেখলে দ্রুত গ্রুপে জানান।</span>
                </li>
              </ul>
            </div>

            {customInstruction && (
              <div
                className="border p-1 rounded text-[8.5px]"
                style={{ backgroundColor: '#faf5ff', borderColor: '#e9d5ff', color: '#581c87' }}
              >
                <span className="font-bold" style={{ color: '#6b21a8' }}>বিশেষ নির্দেশ:</span> {customInstruction}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section: QR Code, Barcode, Signatures, Slogan */}
      <div className="mt-1 pt-1 border-t border-dashed space-y-1" style={{ borderColor: '#cbd5e1' }}>
        <div className="flex items-center justify-between gap-1">
          {/* QR Code & Barcode Block */}
          <div
            className="flex items-center gap-1.5 border p-0.5 rounded shadow-2xs"
            style={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a' }}
          >
            {/* QR Code */}
            <div
              onClick={onVerifyClick}
              className="cursor-pointer hover:opacity-80 transition shrink-0"
              title="ডিজিটাল স্লিপ যাচাইকরণ"
            >
              <QRCodeSVG
                value={
                  qrCodeUrl && qrCodeUrl !== 'https://gonimarket.org/report'
                    ? qrCodeUrl
                    : typeof window !== 'undefined'
                    ? `${window.location.origin}${window.location.pathname}?verify=1&slip=${slipNumber}&date=${dutyDate}`
                    : `GMS-VERIFY:${slipNumber}`
                }
                size={30}
                level="M"
              />
            </div>

            {/* 1D Barcode & Label */}
            <div className="flex flex-col items-start text-[7px] leading-none space-y-0.5">
              <span className="font-bold flex items-center gap-0.5 text-[7.5px]" style={{ color: '#1e293b' }}>
                <CheckCircle className="w-2.5 h-2.5 shrink-0" style={{ color: '#059669' }} />
                <span>যাচাইকরণ কোড</span>
              </span>
              <BarcodeSVG value={slipNumber} height={12} showText={false} />
              <button
                type="button"
                onClick={onVerifyClick}
                className="text-[6.5px] font-bold border px-1 py-0.2 rounded transition cursor-pointer no-print"
                style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#92400e' }}
              >
                🔍 সত্যতা যাচাই
              </button>
            </div>
          </div>

          {/* Signatures for Guard 1, Guard 2, and Secretary */}
          <div className="flex gap-1.5 text-[7px] text-center pr-0.5" style={{ color: '#475569' }}>
            <div className="flex flex-col items-center">
              <div className="w-10 border-b mb-0.5" style={{ borderColor: '#94a3b8' }}></div>
              <span>১ম পাহারাদার</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 border-b mb-0.5" style={{ borderColor: '#94a3b8' }}></div>
              <span>২য় পাহারাদার</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 border-b mb-0.5" style={{ borderColor: '#94a3b8' }}></div>
              <span>সচিব/প্রশাসন</span>
            </div>
          </div>
        </div>

        {/* Motivational Slogan Box */}
        <div
          className="w-full border p-1 px-1.5 rounded text-center text-[8.5px] leading-tight font-bold tracking-tight shadow-xs"
          style={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', color: '#fef08a' }}
        >
          &ldquo;আপনার দোকানের নিরাপত্তা যেমন আপনি কোন আপোষ করবেননা তেমনি পুরোবাজারের প্রতিটি দোকানের নিরাপত্তার বিষয়টি আপনার কাছে ততটাই গুরুত্বপূর্ণ&rdquo;
        </div>
      </div>
    </div>
  );
};
