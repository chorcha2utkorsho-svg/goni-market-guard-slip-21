import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Printer, Download, Layers, FileCheck } from 'lucide-react';

interface PreviewControlsProps {
  paperSize: 'a4' | 'a5';
  onPaperSizeChange: (size: 'a4' | 'a5') => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onPrint: () => void;
  onDownloadPDF: () => void;
  isDownloading: boolean;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({
  paperSize,
  onPaperSizeChange,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onPrint,
  onDownloadPDF,
  isDownloading,
}) => {
  return (
    <div className="no-print bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
      {/* Paper Format Selector Switcher */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>প্রিন্ট পেপার সাইজ:</span>
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

      {/* Direct Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold border border-slate-600 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Printer className="w-3.5 h-3.5 text-amber-300" />
          <span>সরাসরি প্রিন্ট</span>
        </button>
        <button
          onClick={onDownloadPDF}
          disabled={isDownloading}
          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isDownloading ? 'প্রসেসিং...' : `${paperSize.toUpperCase()} PDF ডাউনলোড`}</span>
        </button>
      </div>
    </div>
  );
};

