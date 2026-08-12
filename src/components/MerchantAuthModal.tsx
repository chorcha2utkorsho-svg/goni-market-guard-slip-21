import React, { useState } from 'react';
import {
  Store,
  User,
  CheckCircle2,
  LogIn,
  X,
  ShieldCheck,
  Tag,
  KeyRound,
  Calendar,
  Send,
  Sparkles,
  MessageSquare,
  ChevronRight,
  LogOut,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { OFFICIAL_ROSTER_PAIRS, getUpcomingDutiesForMerchant, UpcomingDutyDate } from '../data/rosterData';

export interface MerchantProfile {
  shopNo: string;
  ownerName: string;
  businessType: string;
  pinCode?: string;
  shopTitle?: string;
  signedInAt: string;
}

interface MerchantAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (profile: MerchantProfile) => void;
  currentMerchant: MerchantProfile | null;
  onSignOut: () => void;
  onQuickPost?: (content: string, category: 'সমস্যা ও সংস্কার' | 'ব্যবসার সম্ভাবনা' | 'পণ্যের খবর ও অফার' | 'সাধারণ আলোচনা') => void;
}

export const MerchantAuthModal: React.FC<MerchantAuthModalProps> = ({
  isOpen,
  onClose,
  onSignInSuccess,
  currentMerchant,
  onSignOut,
  onQuickPost,
}) => {
  const [selectedStall, setSelectedStall] = useState<string>('64');
  const [customShopNo, setCustomShopNo] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('1234');
  const [usePreset, setUsePreset] = useState<boolean>(true);

  // Quick Post Composer inside Merchant Dashboard
  const [quickPostText, setQuickPostText] = useState('');
  const [quickPostCategory, setQuickPostCategory] = useState<'সমস্যা ও সংস্কার' | 'ব্যবসার সম্ভাবনা' | 'পণ্যের খবর ও অফার' | 'সাধারণ আলোচনা'>('সাধারণ আলোচনা');
  const [postSuccessMessage, setPostSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Extract preset shops with stall numbers from OFFICIAL_ROSTER_PAIRS
  const presetShops = OFFICIAL_ROSTER_PAIRS.filter((p) => p.guard2ShopNo).map((p) => ({
    shopNo: p.guard2ShopNo || '',
    ownerName: p.guard2Name,
    businessType: p.guard2BusinessType,
  }));

  const handleSelectPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedStall(val);
    const found = presetShops.find((s) => s.shopNo === val);
    if (found) {
      setOwnerName(found.ownerName);
      setBusinessType(found.businessType);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalShopNo = usePreset ? selectedStall : customShopNo.trim();
    const finalOwnerName = ownerName.trim() || 'ব্যবসায়ী';
    const finalBusinessType = businessType.trim() || 'সাধারণ ব্যবসা';

    if (!finalShopNo) return;

    const profile: MerchantProfile = {
      shopNo: finalShopNo,
      ownerName: finalOwnerName,
      businessType: finalBusinessType,
      pinCode: pinCode.trim() || '1234',
      signedInAt: new Date().toISOString(),
    };

    onSignInSuccess(profile);
  };

  const handlePublishQuickPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPostText.trim()) return;

    if (onQuickPost) {
      onQuickPost(quickPostText.trim(), quickPostCategory);
      setQuickPostText('');
      setPostSuccessMessage('আপনার পোস্ট সফলভাবে ১০ম সেকশন (ফেসবুক ওয়ালে) প্রকাশিত হয়েছে!');
      setTimeout(() => setPostSuccessMessage(null), 3500);
    }
  };

  const upcomingDuties: UpcomingDutyDate[] = currentMerchant
    ? getUpcomingDutiesForMerchant(currentMerchant.shopNo, currentMerchant.ownerName)
    : [];

  const scrollToSection10 = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('sec-10');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
              <span>ব্যবসায়ী সাইন-ইন ও ড্যাশবোর্ড</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                Merchant Portal
              </span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              গোপন পিন নম্বর দিয়ে সাইন-ইন করে আপনার নিজস্ব ড্যাশবোর্ড থেকে ডিউটির তারিখ ও ১০ম সেকশন ওয়ালে পোস্ট করুন।
            </p>
          </div>
        </div>

        {currentMerchant ? (
          /* Signed In Merchant Personal Dashboard View */
          <div className="space-y-5">
            {/* Merchant Identity Card */}
            <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/40 shrink-0">
                    #{currentMerchant.shopNo}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{currentMerchant.ownerName}</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-500/30">
                        দোকান #{currentMerchant.shopNo}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">{currentMerchant.businessType}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold border border-emerald-500/40 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>সাইন-ইন সক্রিয়</span>
                  </span>
                  {currentMerchant.pinCode && (
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1 font-mono">
                      <KeyRound className="w-3 h-3 text-amber-400" />
                      <span>পিন: ****</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={scrollToSection10}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>১০ম সেকশন (ফেসবুক ওয়ালে) যান</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    onSignOut();
                  }}
                  className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-semibold rounded-xl border border-red-800/80 transition cursor-pointer flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>সাইন-আউট</span>
                </button>
              </div>
            </div>

            {/* Upcoming Duty Dates Section */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>আপনার পরবর্তী নিরাপত্তা ডিউটির তারিখ সমূহ:</span>
                </h4>
                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                  অফিশিয়াল রোস্টার
                </span>
              </div>

              {upcomingDuties.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {upcomingDuties.map((duty, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/20 shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{duty.formattedDate}</span>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                              রাউন্ড-{duty.roundNumber}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 flex items-center gap-1">
                            <span>সঙ্গী পাহারাদার: <strong className="text-slate-300">{duty.partnerName}</strong> {duty.partnerShopNo}</span>
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-1 rounded-md border border-slate-700 font-mono shrink-0">
                        ক্রম #{duty.serialNo}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">কোনো আসন্ন ডিউটির শিডিউল পাওয়া যায়নি।</p>
              )}
            </div>

            {/* Quick Post Creator for Section 10 */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>১০ম সেকশন (ফেসবুক ওয়ালে) পোস্ট করুন:</span>
                </h4>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  নিজে কমেন্ট/পোস্ট
                </span>
              </div>

              {postSuccessMessage && (
                <div className="bg-emerald-950/90 border border-emerald-500/50 p-2.5 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{postSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handlePublishQuickPost} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">ক্যাটাগরি নির্বাচন করুন:</label>
                  <select
                    value={quickPostCategory}
                    onChange={(e: any) => setQuickPostCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="সাধারণ আলোচনা">💬 সাধারণ আলোচনা</option>
                    <option value="সমস্যা ও সংস্কার">🚨 সমস্যা ও সংস্কার</option>
                    <option value="ব্যবসার সম্ভাবনা">📈 ব্যবসার সম্ভাবনা</option>
                    <option value="পণ্যের খবর ও অফার">🏷️ পণ্যের খবর ও অফার</option>
                  </select>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={quickPostText}
                    onChange={(e) => setQuickPostText(e.target.value)}
                    placeholder="মার্কেটের উন্নতি, পণ্যের অফার বা সমস্যা নিয়ে কিছু লিখুন..."
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400">
                    পোস্টটি দোকান <strong className="text-amber-300">#{currentMerchant.shopNo}</strong> এর নামে ১০ম সেকশনে যোগ হবে।
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow-md shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>পোস্ট করুন</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Sign-In Form with Secret PIN Number Input */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>তালিকা থেকে দোকান নির্বাচন করুন:</span>
              <button
                type="button"
                onClick={() => setUsePreset(!usePreset)}
                className="text-amber-400 hover:underline text-[11px] cursor-pointer"
              >
                {usePreset ? 'ম্যানুয়াল নম্বর দিন' : 'তালিকা থেকে নিন'}
              </button>
            </div>

            {usePreset ? (
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">দোকান নং সিলেক্ট করুন:</label>
                <select
                  value={selectedStall}
                  onChange={handleSelectPreset}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                >
                  {presetShops.map((s) => (
                    <option key={s.shopNo} value={s.shopNo}>
                      দোকান #{s.shopNo} — {s.ownerName} ({s.businessType})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">দোকান / স্টল নম্বর:</label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customShopNo}
                    onChange={(e) => setCustomShopNo(e.target.value)}
                    placeholder="যেমন: ৬৪ বা B-12"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">ব্যবসায়ীর নাম (মালিক):</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="যেমন: কাজল / রতন"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">ব্যবসার ধরন:</label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="যেমন: হোটেল, ফার্মেসী, কাঁচামাল"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
              />
            </div>

            {/* Secret PIN Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>গোপন পিন নম্বর (Secret PIN):</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">(ডিফল্ট পিন: ১২৩৪)</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="৪-সংখ্যার পিন (যেমন: ১২৩৪)"
                  required
                  maxLength={6}
                  className="w-full bg-slate-950 border border-amber-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-amber-400 font-mono tracking-widest"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                🔒 আপনার গোপন পিন ব্যবহার করে সাইন-ইন করলে আপনি নিজস্ব ড্যাশবোর্ডে পরবর্তী নিরাপত্তা ডিউটির তারিখ ও পোস্ট করার সুবিধা পাবেন।
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                সাইন-ইন করার পর আপনার সকল মন্তব্য, পোস্ট ও ভোট আপনার দোকান নম্বরের অফিশিয়াল ব্যাজসহ বাজারে ১০ম সেকশনে প্রদর্শিত হবে।
              </span>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="w-1/2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-950/40 flex items-center justify-center gap-1.5 cursor-pointer transition"
              >
                <LogIn className="w-4 h-4" />
                <span>সাইন-ইন ও ড্যাশবোর্ডে যান</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

