import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Printer, Download, Layers, FileCheck, Image as ImageIcon, RotateCw, BookOpen } from 'lucide-react';

interface PreviewControlsProps {
  paperSize: 'a4' | 'a5';
  onPaperSizeChange: (size: 'a4' | 'a5') => void;
  activeSide: 'front' | 'back' | 'both';
  onSideChange: (side: 'front' | 'back' | 'both') => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onPrint: () => void;
  onDownloadPDF: () => void;
  onDownloadPNG?: () => void;
  onOpenVerification?: () => void;
  isDownloading: boolean;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({
  paperSize,
  onPaperSizeChange,
  activeSide,
  onSideChange,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onPrint,
  onDownloadPDF,
  onDownloadPNG,
  onOpenVerification,
  isDownloading,
}) => {
  return (
    <div className="no-print bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 flex flex-col gap-2.5 shadow-md">
      {/* Top Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Paper Format Selector Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>প্রিন্ট সাইজ:</span>
          </span>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => onPaperSizeChange('a4')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                paperSize === 'a4'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="১টি A4 পেপারে ৪টি ল্যান্ডস্কেপ স্লিপ (২ দিন x ২ কপি) — জিরো পেপার ওয়েস্ট"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>A4 (৪টি স্লিপ / ২ দিন)</span>
            </button>
            <button
              onClick={() => onPaperSizeChange('a5')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                paperSize === 'a5'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="১টি A5 পেপারে ২টি স্লিপ (১ দিন x ২ কপি)"
            >
              <span>A5 (২টি স্লিপ / ১ দিন)</span>
            </button>
          </div>
        </div>

        {/* Page Side Switcher (Front vs Back vs Both) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>কাগজের পিঠ:</span>
          </span>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => onSideChange('front')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                activeSide === 'front'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="পাহারাদার স্লিপের সামনের মূল পেজ"
            >
              <span>📄 সামনের পিঠ (Front)</span>
            </button>
            <button
              onClick={() => onSideChange('back')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                activeSide === 'back'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="ব্যবসায়ী ও উদ্যোক্তা অনুপ্রেরণা (৭টি মূলমন্ত্র সমৃদ্ধ উল্টোপিঠ)"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>🔄 উল্টোপিঠ (Back)</span>
            </button>
            <button
              onClick={() => onSideChange('both')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                activeSide === 'both'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="সামনে ও উল্টোপিঠ উভয় একসাথে দেখুন"
            >
              <span>📑 উভয় পিঠ (Duplex)</span>
            </button>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-slate-900/80 rounded-lg p-1 border border-slate-700">
          <button
            onClick={onZoomOut}
            className="p-1 hover:bg-slate-700 text-slate-300 rounded cursor-pointer transition"
            title="ছোট করুন (Zoom Out)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span
            onClick={onResetZoom}
            className="text-[10px] font-mono font-bold text-amber-300 px-1.5 cursor-pointer hover:underline"
            title="জুম রিসেট করুন"
          >
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            className="p-1 hover:bg-slate-700 text-slate-300 rounded cursor-pointer transition"
            title="বড় করুন (Zoom In)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onResetZoom}
            className="p-1 hover:bg-slate-700 text-slate-300 rounded cursor-pointer transition ml-1"
            title="স্ক্রিনে ফিট করুন"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Direct Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-700/60">
        {onOpenVerification && (
          <button
            onClick={onOpenVerification}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-600 transition flex items-center gap-1 cursor-pointer"
            title="বারকোড ও QR কোডের সরাসরি কার্যকারিতা দেখুন"
          >
            <span>🔍 কোড যাচাই</span>
          </button>
        )}

        {onDownloadPNG && (
          <button
            onClick={onDownloadPNG}
            disabled={isDownloading}
            className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold border border-sky-400 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
            title="মোবাইল/হোয়াটসঅ্যাপে পাঠানোর জন্য এইচডি ছবি ডাউনলোড করুন"
          >
            <ImageIcon className="w-3.5 h-3.5 text-sky-200" />
            <span>HD ছবি (PNG)</span>
          </button>
        )}

        <button
          onClick={onPrint}
          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold border border-slate-600 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          title="সরাসরি প্রিন্ট সিলেক্ট করুন"
        >
          <Printer className="w-3.5 h-3.5 text-amber-300" />
          <span>প্রিন্ট করুন</span>
        </button>

        <button
          onClick={onDownloadPDF}
          disabled={isDownloading}
          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isDownloading ? 'প্রসেসিং...' : `${paperSize.toUpperCase()} PDF`}</span>
        </button>
      </div>
    </div>
  );
};

