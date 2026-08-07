import React from 'react';
import { ShieldCheck, CheckCircle2, QrCode, Barcode, Phone, Calendar, Users, Store, X, Info, ExternalLink } from 'lucide-react';
import { GuardDutySlipInput } from '../types';
import { formatBengaliFullDate, toBengaliNumerals } from '../utils/bengaliUtils';
import { BarcodeSVG } from './BarcodeSVG';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GuardDutySlipInput;
  slipNumber?: string;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  data,
  slipNumber = 'GMS-2026-001',
}) => {
  if (!isOpen) return null;

  const {
    guard1Name,
    guard1BusinessType,
    guard1ShopNo,
    guard2Name,
    guard2BusinessType,
    guard2ShopNo,
    dutyDate,
    roundNumber,
    serialIndex,
    mobileNumber = '01947399752',
  } = data;

  const formattedDate = formatBengaliFullDate(dutyDate);
  const hashVal = `VERIFIED-${slipNumber}-${dutyDate.replace(/-/g, '')}-OK`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-kalpurush">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl text-slate-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Verification Status Header */}
        <div className="text-center space-y-2 mb-6 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 mb-1 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-xl font-bold text-emerald-400 flex items-center justify-center gap-1.5">
            <span>স্লিপের সত্যতা যাচাইকৃত (Authentic Slip)</span>
          </h2>
          <p className="text-xs text-slate-300">
            গণি মার্কেট ব্যবসায়ী সমিতি ডিজিটাল ডেটাবেজ দ্বারা অনুমোদিত ও নিবন্ধিত
          </p>
        </div>

        {/* Certificate Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 mb-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs text-slate-400">স্লিপ নম্বর:</span>
            <span className="text-sm font-mono font-bold text-amber-400">{slipNumber}</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs text-slate-400">ডিউটির তারিখ & রাউন্ড:</span>
            <span className="text-xs font-bold text-white">
              {formattedDate} (রাউন্ড-{toBengaliNumerals(roundNumber)}{serialIndex ? `, ক্রমিক #${toBengaliNumerals(serialIndex)}` : ''})
            </span>
          </div>

          {/* Guards Info */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-amber-950/30 border border-amber-800/40 p-2.5 rounded-lg space-y-1">
              <span className="text-[10px] text-amber-400 font-bold block">১ম পাহারাদার</span>
              <p className="text-xs font-bold text-white">{guard1Name}</p>
              <p className="text-[10px] text-slate-400">{guard1BusinessType} {guard1ShopNo ? `(দোকান: ${guard1ShopNo})` : ''}</p>
            </div>

            <div className="bg-blue-950/30 border border-blue-800/40 p-2.5 rounded-lg space-y-1">
              <span className="text-[10px] text-blue-400 font-bold block">২য় পাহারাদার</span>
              <p className="text-xs font-bold text-white">{guard2Name}</p>
              <p className="text-[10px] text-slate-400">{guard2BusinessType} {guard2ShopNo ? `(দোকান: ${guard2ShopNo})` : ''}</p>
            </div>
          </div>

          {/* Barcode Display inside modal */}
          <div className="pt-2 flex flex-col items-center justify-center bg-white p-3 rounded-lg border border-slate-700">
            <BarcodeSVG value={slipNumber} height={36} showText={true} />
            <span className="text-[9px] text-slate-600 font-bold mt-1">ডিজিটাল ১ডি সিকিউরিটি বারকোড</span>
          </div>

          {/* Hash signature */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
            <span>ডিজিটাল হ্যাশ:</span>
            <span className="text-emerald-400 font-bold">{hashVal}</span>
          </div>
        </div>

        {/* Functionality Explanation Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 space-y-2 text-xs">
          <h3 className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
            <Info className="w-4 h-4" />
            <span>বারকোড ও QR কোডের সরাসরি কার্যকারিতা:</span>
          </h3>

          <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed pl-1">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong className="text-white">১. ভুয়া স্লিপ শনাক্তকরণ:</strong> যেকোনো ব্যক্তি বা গার্ড স্ক্যান করলে সাথে সাথেই ডাটাবেজের আসল তথ্য ভেসে উঠে, ফলে হস্তলিখিত নকল বা জালিয়াতি স্লিপ ধরা পড়ে।
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong className="text-white">২. অফিস বারকোড গান স্ক্যানিং:</strong> অফিস গেইটে বা বাজার সমিতির অফিসে স্ট্যান্ডার্ড ১ডি বারকোড গান দিয়ে স্ক্যান করে গার্ডদের দ্রুত এন্ট্রি নিশ্চিত করা যায়।
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong className="text-white">৩. জরুরি রিপোর্ট জমা:</strong> নৈশকালীন কোনো দুর্ঘটনা ঘটলে মোবাইল ক্যামেরা দিয়ে কিউআর স্ক্যান করে দ্রুত সমিতি অফিসে মেসেজ পাঠানো যায়।
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
