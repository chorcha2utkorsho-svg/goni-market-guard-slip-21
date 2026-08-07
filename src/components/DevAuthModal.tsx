import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, X, Check } from 'lucide-react';

interface DevAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DevAuthModal: React.FC<DevAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'admin123' || pin === 'goni2026') {
      setError('');
      setPin('');
      onSuccess();
      onClose();
    } else {
      setError('ভুল সিকিউরিটি PIN! সঠিক ডেভেলপার PIN প্রদান করুন।');
    }
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
          <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shadow-inner shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>ডেভেলপার ও এডমিন এক্সেস সুরক্ষা</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 font-extrabold px-2 py-0.5 rounded border border-red-500/30">
                LOCKED 🔒
              </span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              স্লিপ ইনপুট, আউটপুট ও অফিশিয়াল রেকর্ড নিয়ন্ত্রণের জন্য সিকিউরিটি PIN আবশ্যক।
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>ডেভেলপার সিকিউরিটি PIN দিন:</span>
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              placeholder="••••"
              maxLength={12}
              autoFocus
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-lg tracking-widest text-white outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs p-2.5 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span>ডিফল্ট ডেভেলপার সিকিউরিটি PIN:</span>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                {showHint ? 'পিন লুকান' : 'পিন দেখুন'}
              </button>
            </div>
            {showHint && (
              <p className="text-amber-300 font-mono font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 text-center text-xs">
                1234
              </p>
            )}
            <p className="text-[10px] text-slate-500">
              ব্যবসায়ীদের নিরাপত্তার সুবিধার্থে সাধারণ ইউজারগণ শুধুমাত্র ড্যাশবোর্ড দেখতে ও মন্তব্য করতে পারবেন।
            </p>
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
              className="w-1/2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-950/50 flex items-center justify-center gap-1.5 cursor-pointer transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>এক্সেস আনলক করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
