import React from 'react';
import { ShieldCheck, Printer, Download, History, Users, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  onPrint: () => void;
  onDownloadPDF: () => void;
  onOpenHistory: () => void;
  onOpenBatch: () => void;
  onOpenPresets: () => void;
  isDownloading: boolean;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onPrint,
  onDownloadPDF,
  onOpenHistory,
  onOpenBatch,
  onOpenPresets,
  isDownloading,
  historyCount,
}) => {
  return (
    <header className="no-print bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-950/40 border border-amber-400/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                গণি মার্কেট নৈশকালীন নিরাপত্তা পাহারাদার স্লিপ
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                A5 Dual-A6 Layout
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Goni Market Night Security Guard Duty Slip Generator
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Roster Schedule / Batch */}
          <button
            onClick={onOpenBatch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            title="৩৫ জোড়া পাহারাদারের তফসিল ও ব্যাচ জেনারেটর"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span className="hidden md:inline">৩৫ জোড়া ডিউটি তফসিল</span>
          </button>

          {/* History */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            title="সংরক্ষিত স্লিপসমূহ (History)"
          >
            <History className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">সংরক্ষিত স্লিপ</span>
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
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold border border-slate-600 transition shadow-xs cursor-pointer active:scale-97"
          >
            <Printer className="w-4 h-4 text-slate-200" />
            <span>প্রিন্ট করুন</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={onDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold shadow-md shadow-red-950/40 transition cursor-pointer disabled:opacity-50 active:scale-97"
          >
            <Download className="w-4 h-4 text-amber-200" />
            <span>{isDownloading ? 'PDF প্রসেস হচ্ছে...' : 'A5 PDF ডাউনলোড'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
