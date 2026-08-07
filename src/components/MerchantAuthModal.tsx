import React, { useState } from 'react';
import { Store, User, CheckCircle2, LogIn, X, ShieldCheck, Tag } from 'lucide-react';
import { OFFICIAL_ROSTER_PAIRS } from '../data/rosterData';

export interface MerchantProfile {
  shopNo: string;
  ownerName: string;
  businessType: string;
  signedInAt: string;
}

interface MerchantAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (profile: MerchantProfile) => void;
  currentMerchant: MerchantProfile | null;
  onSignOut: () => void;
}

export const MerchantAuthModal: React.FC<MerchantAuthModalProps> = ({
  isOpen,
  onClose,
  onSignInSuccess,
  currentMerchant,
  onSignOut,
}) => {
  const [selectedStall, setSelectedStall] = useState<string>('64');
  const [customShopNo, setCustomShopNo] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('');
  const [usePreset, setUsePreset] = useState<boolean>(true);

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
      signedInAt: new Date().toISOString(),
    };

    onSignInSuccess(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>ব্যবসায়ী সাইন-ইন (Merchant Portal)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                কমন ড্যাশবোর্ড
              </span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              গণি মার্কেট কমন ড্যাশবোর্ডে ব্যবসায়িক মতামত ও প্রস্তাবনায় অংশ নিতে সাইন-ইন করুন।
            </p>
          </div>
        </div>

        {currentMerchant ? (
          /* Currently Signed In View */
          <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-3 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-1 border border-emerald-500/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">আপনি ইতোমধ্যে সাইন-ইন করে আছেন</h4>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs space-y-1 text-slate-300">
              <div>
                <span className="text-slate-400">দোকান নম্বর:</span>{' '}
                <strong className="text-amber-300 font-bold">দোকান #{currentMerchant.shopNo}</strong>
              </div>
              <div>
                <span className="text-slate-400">ব্যবসায়ীর নাম:</span>{' '}
                <strong className="text-white">{currentMerchant.ownerName}</strong>
              </div>
              <div>
                <span className="text-slate-400">ব্যবসার ধরন:</span>{' '}
                <span className="text-emerald-400 font-medium">{currentMerchant.businessType}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="w-1/2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                ড্যাশবোর্ডে যান
              </button>
              <button
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="w-1/2 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-semibold rounded-lg border border-red-800 transition cursor-pointer"
              >
                সাইন-আউট করুন
              </button>
            </div>
          </div>
        ) : (
          /* Sign-In Form */
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

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                সাইন-ইন করার পর আপনার সকল মন্তব্য ও ভোট আপনার দোকান নম্বরের অফিশিয়াল ব্যাজসহ বাজারে প্রকাশ্যে প্রদর্শিত হবে।
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
                <span>সাইন-ইন নিশ্চিত করুন</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
