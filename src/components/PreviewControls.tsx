import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Printer, Download, Eye, Layers } from 'lucide-react';

interface PreviewControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onPrint: () => void;
  onDownloadPDF: () => void;
  isDownloading: boolean;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onPrint,
  onDownloadPDF,
  isDownloading,
}) => {
  return (
    <div className="no-print bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>A5 পেজ প্রিভিউ (২টি A6 স্লিপ সাইড-বাই-সাইড)</span>
        </span>
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
          <span>{isDownloading ? 'প্রসেসিং...' : 'PDF ডাউনলোড'}</span>
        </button>
      </div>
    </div>
  );
};
