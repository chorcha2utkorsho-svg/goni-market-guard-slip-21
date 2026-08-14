import React from 'react';
import { Lightbulb, Sparkles, ShieldCheck } from 'lucide-react';
import { GuardDutySlipInput } from '../types';

interface SlipBackTemplateProps {
  data?: GuardDutySlipInput;
  slipNumber?: string;
  copyLabel?: string;
}

export const SlipBackTemplate: React.FC<SlipBackTemplateProps> = ({
  data,
  slipNumber,
  copyLabel = '১ম পাহারাদার কপি',
}) => {
  const theme = data?.theme || 'classic';

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

      <div className="space-y-1.5">
        {/* Header Banner - Fully Centered and Well Balanced */}
        <div
          className="p-1.5 rounded-xs shadow-xs text-white text-center flex flex-col items-center justify-center gap-1.5"
          style={{ backgroundColor: getHeaderBgStyle(), color: '#ffffff' }}
        >
          {/* Main Title */}
          <div className="flex items-center justify-center gap-1.5 text-center w-full">
            <Lightbulb className="w-4 h-4 shrink-0" style={{ color: '#fde047' }} />
            <h1 className="text-[11.5px] font-bold leading-none tracking-tight text-white">
              গণি মার্কেট ব্যবসায়ী অনুপ্রেরণা ও সামাজিক দায়বদ্ধতা
            </h1>
          </div>

          {/* Centered Badges Row - Perfectly Centered in Badges */}
          <div
            className="w-full flex items-center justify-center gap-1.5 pt-1.5 border-t text-center"
            style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
          >
            <span
              className="inline-flex items-center justify-center text-center text-[8.5px] font-bold px-2.5 rounded-full shadow-xs gap-1"
              style={{ backgroundColor: '#fbbf24', color: '#0f172a', height: '21px' }}
            >
              <Sparkles className="w-2.5 h-2.5 shrink-0 relative -top-[0.5px]" />
              <span className="relative -top-[1px]">উদ্যোক্তা চিন্তার ৭টি মূলমন্ত্র</span>
            </span>
            <span
              className="inline-flex items-center justify-center text-center text-[8px] font-semibold px-2.5 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.22)', color: '#fef3c7', height: '21px' }}
            >
              <span className="relative -top-[1px]">{copyLabel}</span>
            </span>
            {slipNumber && (
              <span
                className="inline-flex items-center justify-center text-center text-[7.5px] font-mono font-bold px-2 rounded-full"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', color: '#ffffff', height: '21px' }}
              >
                <span className="relative -top-[1px]">#{slipNumber}</span>
              </span>
            )}
          </div>
        </div>

        {/* Motivational Principles List (7 Points) */}
        <div className="space-y-1 text-[8.2px] leading-[1.35]" style={{ color: '#0f172a' }}>
          {/* Section 1: Points 1 & 2 */}
          <div
            className="p-1 rounded border space-y-0.5"
            style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#0f172a' }}
          >
            <div className="flex items-start gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[7.5px] inline-flex items-center justify-center text-center shrink-0 mt-0.5 leading-none"
                style={{ backgroundColor: '#92400e', color: '#ffffff' }}
              >
                <span className="relative -top-[0.5px]">১</span>
              </span>
              <p className="flex-1 leading-relaxed">
                <strong style={{ color: '#92400e' }}>ব্যবসা মানে সমাধান:</strong> বাজার মানেই সমাধান আছে। প্রতিটি সফল ব্যবসা মানুষের কোনো না কোনো সমস্যার কার্যকর সমাধান।
              </p>
            </div>
            <div className="flex items-start gap-1.5 pt-0.5 border-t" style={{ borderColor: '#fef3c7' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[7.5px] inline-flex items-center justify-center text-center shrink-0 mt-0.5 leading-none"
                style={{ backgroundColor: '#92400e', color: '#ffffff' }}
              >
                <span className="relative -top-[0.5px]">২</span>
              </span>
              <p className="flex-1 leading-relaxed">
                <strong style={{ color: '#92400e' }}>জনপদের সমস্যা থেকে উদ্যোগ:</strong> হাজারো সমস্যায় জর্জরিত এই জনপদ, মানুষের অনেক কষ্ট ও সংকট। আপনি এই সমস্যার মধ্যে যেকোনো একটির সমাধান খুব ভালো জানেন; আর সেটি নিয়েই শুরু করুন উদ্যোগ।
              </p>
            </div>
          </div>

          {/* Section 2: Points 3, 4, 5 */}
          <div
            className="p-1 rounded border space-y-0.5"
            style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe', color: '#0f172a' }}
          >
            <div className="flex items-start gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[7.5px] inline-flex items-center justify-center text-center shrink-0 mt-0.5 leading-none"
                style={{ backgroundColor: '#1e40af', color: '#ffffff' }}
              >
                <span className="relative -top-[0.5px]">৩</span>
              </span>
              <p className="flex-1 leading-relaxed">
                <strong style={{ color: '#1e40af' }}>পুঁজি ও মেধার শক্তি:</strong> ব্যবসা করতে পুঁজি লাগে সত্য; তবে মেধা, সততা ও সুন্দর পরিকল্পনা দিয়ে ক্যাশ ছাড়াও শুরু করা সম্ভব।
              </p>
            </div>
            <div className="flex items-start gap-1.5 pt-0.5 border-t" style={{ borderColor: '#dbeafe' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[7.5px] inline-flex items-center justify-center text-center shrink-0 mt-0.5 leading-none"
                style={{ backgroundColor: '#1e40af', color: '#ffffff' }}
              >
                <span className="relative -top-[0.5px]">৪</span>
              </span>
              <p className="flex-1 leading-relaxed">
                <strong style={{ color: '#1e40af' }}>দক্ষতা অর্জনে পরিশ্রম:</strong> ব্যবসায় ভালো করতে সমাধান সৃষ্টিতে দক্ষ হতে হয়। একাগ্র পরিশ্রম ছাড়া কোনো দক্ষতা অর্জন সম্ভব নয়।
              </p>
            </div>
            <div className="flex items-start gap-1.5 pt-0.5 border-t" style={{ borderColor: '#dbeafe' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[7.5px] inline-flex items-center justify-center text-center shrink-0 mt-0.5 leading-none"
                style={{ backgroundColor: '#1e40af', color: '#ffffff' }}
              >
                <span className="relative -top-[0.5px]">৫</span>
              </span>
              <p className="flex-1 leading-relaxed">
                <strong style={{ color: '#1e40af' }}>পরিকল্পনা ও আস্থা:</strong> যত পরিশ্রম আর পরিকল্পনা যত সুন্দর হবে, ততটাই মানুষের নির্ভরতা ও আস্থার সমাধান হয়ে উঠব আমরা।
              </p>
            </div>
          </div>

          {/* Section 3: Points 6 & 7 */}
          <div
            className="p-1 rounded border space-y-0.5"
            style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#0f172a' }}
          >
            <div className="flex items-start gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[7.5px] inline-flex items-center justify-center text-center shrink-0 mt-0.5 leading-none"
                style={{ backgroundColor: '#166534', color: '#ffffff' }}
              >
                <span className="relative -top-[0.5px]">৬</span>
              </span>
              <p className="flex-1 leading-relaxed">
                <strong style={{ color: '#166534' }}>গণি মার্কেট ও বণিক সমিতি:</strong> বাজারের নিরাপত্তা, পরিচ্ছন্নতা, অবকাঠামো উন্নয়ন, বিক্রি বৃদ্ধি, ন্যায়বিচার ও পুনর্বাসনের লক্ষ্যে ঐক্যবদ্ধ বণিক সমিতি গঠিত হলে সমৃদ্ধির পথ সুগম হবে।
              </p>
            </div>
            <div className="flex items-start gap-1.5 pt-0.5 border-t" style={{ borderColor: '#dcfce7' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[7.5px] inline-flex items-center justify-center text-center shrink-0 mt-0.5 leading-none"
                style={{ backgroundColor: '#166534', color: '#ffffff' }}
              >
                <span className="relative -top-[0.5px]">৭</span>
              </span>
              <p className="flex-1 leading-relaxed">
                <strong style={{ color: '#166534' }}>পারস্পরিক সৌহার্দ্য:</strong> প্রতিটি ব্যবসায়ীর মধ্যে পারস্পরিক আন্তরিকতা, শ্রদ্ধাবোধ ও সহযোগিতামূলক আচরণ আমাদের এক অনন্য মর্যাদাপূর্ণ পরিচিতি দেবে।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner - Centered Quote */}
      <div className="mt-1 pt-1 border-t border-dashed space-y-0.5" style={{ borderColor: '#cbd5e1' }}>
        <div
          className="w-full border p-2 rounded text-center text-[8px] leading-snug font-bold tracking-tight shadow-xs flex items-center justify-center gap-1"
          style={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', color: '#fef08a' }}
        >
          <span className="text-center w-full block leading-snug relative -top-[0.5px]">
            ✨ &ldquo;সৎ ব্যবসা ও সামাজিক দায়বদ্ধতাই প্রতিটি ব্যবসায়ীর স্থায়ী সম্মান ও সফলতার চাবিকাঠি&rdquo; ✨
          </span>
        </div>
        <div className="text-center text-[6.5px] text-slate-500 font-medium">
          গণি মার্কেট পরিচালনা ও নৈশকালীন নিরাপত্তা কমিটি কর্তৃক প্রচারিত
        </div>
      </div>
    </div>
  );
};

