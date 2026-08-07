import React from 'react';
import { ShieldCheck, Printer, Download, History, Users, Sparkles, ShieldAlert, Store, Lock, LogIn, LayoutDashboard, FileText } from 'lucide-react';
import { MerchantProfile } from './MerchantAuthModal';

interface NavbarProps {
  currentView: 'COMMON_DASHBOARD' | 'SLIP_GENERATOR';
  onSelectView: (view: 'COMMON_DASHBOARD' | 'SLIP_GENERATOR') => void;
  onPrint: () => void;
  onDownloadPDF: () => void;
  onOpenHistory: () => void;
  onOpenBatch: () => void;
  onOpenPresets: () => void;
  onOpenVerification?: () => void;
  onOpenAuditBoard?: () => void;
  onOpenMerchantAuth: () => void;
  onOpenDevAuth: () => void;
  currentMerchant: MerchantProfile | null;
  isDevUnlocked: boolean;
  isDownloading: boolean;
  historyCount: number;
  unpaidCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onPrint,
  onDownloadPDF,
  onOpenHistory,
  onOpenBatch,
  onOpenPresets,
  onOpenVerification,
  onOpenAuditBoard,
  onOpenMerchantAuth,
  onOpenDevAuth,
  currentMerchant,
  isDevUnlocked,
  isDownloading,
  historyCount,
  unpaidCount = 0,
}) => {
  return (
    <header className="no-print bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-950/40 border border-amber-400/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                গণি মার্কেট ব্যবসায়ীদের কমন ড্যাশবোর্ড ও সিকিউরিটি স্লিপ
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Goni Market Merchant Common Dashboard & Security Management
            </p>
          </div>
        </div>

        {/* Navigation Mode Switcher Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => onSelectView('COMMON_DASHBOARD')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              currentView === 'COMMON_DASHBOARD'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>কমন ড্যাশবোর্ড</span>
          </button>

          <button
            onClick={() => {
              if (isDevUnlocked) {
                onSelectView('SLIP_GENERATOR');
              } else {
                onOpenDevAuth();
              }
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              currentView === 'SLIP_GENERATOR'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title={isDevUnlocked ? 'ডেভেলপার স্লিপ জেনারেটর' : 'পিন লক করা জেনারেটর'}
          >
            {isDevUnlocked ? (
              <FileText className="w-3.5 h-3.5 text-emerald-950" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-red-400" />
            )}
            <span>ডেভেলপার জেনারেটর</span>
            {!isDevUnlocked && (
              <span className="text-[9px] bg-red-500/20 text-red-300 font-extrabold px-1 py-0.2 rounded border border-red-500/30">
                🔒
              </span>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Merchant Auth Button */}
          <button
            onClick={onOpenMerchantAuth}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
              currentMerchant
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
            title="ব্যবসায়ীদের ড্যাশবোর্ড সাইন-ইন"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>{currentMerchant ? `দোকান #${currentMerchant.shopNo}` : 'ব্যবসায়ী সাইন-ইন'}</span>
          </button>

          {/* Dev Lock/Unlock Button */}
          <button
            onClick={() => {
              if (isDevUnlocked) {
                onSelectView('SLIP_GENERATOR');
              } else {
                onOpenDevAuth();
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
              isDevUnlocked
                ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                : 'bg-red-950/70 border-red-800 text-red-300 hover:bg-red-900'
            }`}
            title={isDevUnlocked ? 'ডেভেলপার এক্সেস সক্রিয়' : 'ডেভেলপার এক্সেস আনলক করতে পিন দিন'}
          >
            {isDevUnlocked ? <Sparkles className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-red-400" />}
            <span className="hidden sm:inline">{isDevUnlocked ? 'ডেভেলপার মোড ⚡' : 'ডেভেলপার লকিং 🔒'}</span>
          </button>

          {/* Public Audit Board & Feedback Button */}
          {onOpenAuditBoard && (
            <button
              onClick={onOpenAuditBoard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-bold border border-red-700/60 transition cursor-pointer relative"
              title="পাহারা ও বকেয়া ট্র্যাকার বোর্ড এবং জনমত প্রকাশ"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span className="hidden md:inline">বকেয়া বোর্ড</span>
              {unpaidCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse border border-red-300">
                  {unpaidCount}
                </span>
              )}
            </button>
          )}

          {/* Verification Tool Button */}
          {onOpenVerification && (
            <button
              onClick={onOpenVerification}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-700/60 transition cursor-pointer"
              title="বারকোড ও QR কোডের সত্যতা যাচাইকরণ পোর্টাল"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">স্লিপ যাচাই</span>
            </button>
          )}

          {/* Roster Schedule / Batch */}
          <button
            onClick={onOpenBatch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            title="৩৫ জোড়া পাহারাদারের তফসিল ও ব্যাচ জেনারেটর"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span className="hidden lg:inline">৩৫ জোড়া তফসিল</span>
          </button>

          {/* History */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            title="সংরক্ষিত স্লিপসমূহ (History)"
          >
            <History className="w-4 h-4 text-purple-400" />
            <span className="hidden lg:inline">সংরক্ষিত স্লিপ</span>
            {historyCount > 0 && (
              <span className="ml-0.5 bg-purple-500/30 text-purple-200 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-purple-400/40">
                {historyCount}
              </span>
            )}
          </button>

          <div className="h-5 w-px bg-slate-800 my-auto hidden sm:block"></div>

          {/* Quick Print */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold border border-slate-600 transition cursor-pointer active:scale-97"
          >
            <Printer className="w-4 h-4 text-slate-200" />
            <span>প্রিন্ট</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={onDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold shadow-md shadow-red-950/40 transition cursor-pointer disabled:opacity-50 active:scale-97"
          >
            <Download className="w-4 h-4 text-amber-200" />
            <span>{isDownloading ? 'প্রসেসিং...' : 'A5 PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
