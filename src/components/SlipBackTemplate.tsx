import React from 'react';
import { Lightbulb, Sparkles, Target, Compass, Users, HeartHandshake, Award } from 'lucide-react';
import { GuardDutySlipInput } from '../types';

interface SlipBackTemplateProps {
  data?: GuardDutySlipInput;
  slipNumber?: string;
  copyLabel?: string;
}

export const SlipBackTemplate: React.FC<SlipBackTemplateProps> = ({
  data,
  copyLabel = 'ব্যবসায়ী দিকনির্দেশনা ও সামাজিক দায়বদ্ধতা',
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

      <div className="space-y-1">
        {/* Header Banner */}
        <div
          className="p-1.5 rounded-xs shadow-xs text-white"
          style={{ backgroundColor: getHeaderBgStyle(), color: '#ffffff' }}
        >
          <div className="flex items-center justify-center gap-1 text-center">
            <Lightbulb className="w-3.5 h-3.5 shrink-0" style={{ color: '#fde047' }} />
            <h1 className="text-[11.5px] font-bold leading-tight tracking-tight" style={{ color: '#ffffff' }}>
              গণি মার্কেট ব্যবসায়ী অনুপ্রেরণা ও সামাজিক দায়বদ্ধতা
            </h1>
          </div>
          <div className="flex items-center justify-between gap-1 text-[8.5px] mt-1 pt-1 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
            <span
              className="px-1.5 py-0.5 rounded font-medium truncate"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fef3c7' }}
            >
              {copyLabel}
            </span>
            <span
              className="font-bold px-1.5 py-0.5 rounded shrink-0"
              style={{ backgroundColor: '#fbbf24', color: '#000000' }}
            >
              উদ্যোক্তা চিন্তার ৭টি মূলমন্ত্র
            </span>
          </div>
        </div>

        {/* Motivational Principles List (7 Points) */}
        <div className="space-y-1 text-[8.5px] leading-[1.35]" style={{ color: '#0f172a' }}>
          {/* Point 1 & 2 Box */}
          <div
            className="p-1 rounded border space-y-0.5"
            style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#0f172a' }}
          >
            <div className="flex items-start gap-1">
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[8px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#92400e', color: '#ffffff' }}
              >
                ১
              </span>
              <p>
                <strong style={{ color: '#92400e' }}>ব্যবসা মানে সমাধান:</strong> বাজার মানেই সমাধান আছে। প্রতিটি সফল ব্যবসা মানুষের কোনো না কোনো সমস্যার কার্যকর সমাধান।
              </p>
            </div>
            <div className="flex items-start gap-1 pt-0.5 border-t" style={{ borderColor: '#fef3c7' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[8px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#92400e', color: '#ffffff' }}
              >
                ২
              </span>
              <p>
                <strong style={{ color: '#92400e' }}>জনপদের সমস্যা থেকে উদ্যোগ:</strong> হাজারো সমস্যায় জর্জরিত এই জনপদ, মানুষের অনেক কষ্ট ও সংকট। আপনি এই হাজারো সমস্যার মধ্যে যেকোনো একটি সমস্যার সমাধান অবশ্যই খুব ভালো জানেন; আর সেটি দিয়েই শুরু করুন আপনার ব্যবসায়িক উদ্যোগ।
              </p>
            </div>
          </div>

          {/* Point 3, 4, 5 Box */}
          <div
            className="p-1 rounded border space-y-0.5"
            style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe', color: '#0f172a' }}
          >
            <div className="flex items-start gap-1">
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[8px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#1e40af', color: '#ffffff' }}
              >
                ৩
              </span>
              <p>
                <strong style={{ color: '#1e40af' }}>পুঁজি ও উদ্ভাবনী শক্তি:</strong> ব্যবসা করতে পুঁজি লাগে এটা সত্য। আবার ক্যাশ টাকা ছাড়াও মেধা ও সততায় ব্যবসা শুরু করতে পারেন কেউ কেউ, তবে তাদের ব্যবসার ধরন হয়তো আলাদা।
              </p>
            </div>
            <div className="flex items-start gap-1 pt-0.5 border-t" style={{ borderColor: '#dbeafe' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[8px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#1e40af', color: '#ffffff' }}
              >
                ৪
              </span>
              <p>
                <strong style={{ color: '#1e40af' }}>দক্ষতা অর্জনে পরিশ্রম:</strong> ব্যবসায় ভালো করতে হলে সমাধান সৃষ্টিতে দক্ষ হতে হয়। আমরা জানি যে একাগ্র পরিশ্রম ছাড়া কোনো দক্ষতাই অর্জন হয় না।
              </p>
            </div>
            <div className="flex items-start gap-1 pt-0.5 border-t" style={{ borderColor: '#dbeafe' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[8px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#1e40af', color: '#ffffff' }}
              >
                ৫
              </span>
              <p>
                <strong style={{ color: '#1e40af' }}>সুন্দর পরিকল্পনা:</strong> যত পরিশ্রম আর পরিকল্পনা যত সুন্দর হবে, ততটাই মানুষের আস্থার সমাধান হয়ে উঠব আমরা।
              </p>
            </div>
          </div>

          {/* Point 6 & 7 Box (Community & Unity) */}
          <div
            className="p-1 rounded border space-y-0.5"
            style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#0f172a' }}
          >
            <div className="flex items-start gap-1">
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[8px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#166534', color: '#ffffff' }}
              >
                ৬
              </span>
              <p>
                <strong style={{ color: '#166534' }}>গণি মার্কেট ও বণিক সমিতি:</strong> এই জনপদের সমাধান কেন্দ্র গণি মার্কেট— যার নিরাপত্তা, পরিচ্ছন্নতা, অবকাঠামোগত উন্নয়ন, বিক্রি বৃদ্ধির পরিবেশ সৃষ্টি, ন্যায়বিচার প্রতিষ্ঠা, ব্যবসায়িক আইডিয়া শেয়ারিং, পুঁজি গঠন ও দেউলিয়া হয়ে যাওয়া ব্যবসায়ীদের পুনর্বাসন ইত্যাদি কল্যাণমূলক ভাবনা থেকে বাজারে একটি ঐক্যবদ্ধ বণিক সমিতি গঠিত হলে সমৃদ্ধি ও প্রাচুর্যের পথ পাব আমরা।
              </p>
            </div>
            <div className="flex items-start gap-1 pt-0.5 border-t" style={{ borderColor: '#dcfce7' }}>
              <span
                className="w-3.5 h-3.5 rounded-full font-bold text-[8px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#166534', color: '#ffffff' }}
              >
                ৭
              </span>
              <p>
                <strong style={{ color: '#166534' }}>পারস্পরিক সৌহার্দ্য:</strong> প্রতিটি ব্যবসায়ীর মধ্যে পারস্পরিক আন্তরিকতা, শ্রদ্ধাবোধ ও সহযোগিতামূলক কার্যকলাপ আমাদের এক অনুকরণীয় নতুন পরিচয় সৃষ্টি করবে।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-1 pt-1 border-t border-dashed space-y-1" style={{ borderColor: '#cbd5e1' }}>
        <div
          className="w-full border p-1 px-1.5 rounded text-center text-[8px] leading-tight font-bold tracking-tight shadow-xs"
          style={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', color: '#fef08a' }}
        >
          &ldquo;সৎ ব্যবসা ও সামাজিক দায়বদ্ধতাই প্রতিটি ব্যবসায়ীর স্থায়ী সম্মান ও সফলতার চাবিকাঠি&rdquo;
        </div>
      </div>
    </div>
  );
};
