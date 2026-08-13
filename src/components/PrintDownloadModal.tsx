import React, { useState, useEffect } from 'react';
import { X, Printer, Download, Image as ImageIcon, ExternalLink, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { downloadElementAsA4PDF, downloadElementAsA5PDF, downloadElementAsPNG, captureElementToCanvas, triggerPrintWindow } from '../utils/pdfGenerator';
import { GuardDutySlipInput } from '../types';
import { formatBengaliFullDate } from '../utils/bengaliUtils';

interface PrintDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  paperSize: 'a4' | 'a5';
  formData: GuardDutySlipInput;
  serialNumber: string;
}

export const PrintDownloadModal: React.FC<PrintDownloadModalProps> = ({
  isOpen,
  onClose,
  paperSize,
  formData,
  serialNumber,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const targetElementId = paperSize === 'a4' ? 'a4-quad-slip-container' : 'a5-dual-slip-container';

  useEffect(() => {
    if (!isOpen) {
      setPreviewImage(null);
      setStatusMessage('');
      setErrorMessage(null);
      return;
    }

    // Auto generate high resolution preview image when modal opens
    let isMounted = true;
    const generatePreview = async () => {
      setIsGenerating(true);
      setStatusMessage('স্লিপের হাই-কোয়ালিটি ক্যানভাস প্রস্তুত করা হচ্ছে...');
      setErrorMessage(null);

      // Brief delay to ensure DOM is rendered
      await new Promise((r) => setTimeout(r, 200));

      const elem = document.getElementById(targetElementId) || document.getElementById(`${targetElementId}-print`);
      if (elem) {
        try {
          const canvas = await captureElementToCanvas(elem);
          if (isMounted) {
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            setPreviewImage(dataUrl);
            setStatusMessage('প্রিভিউ সম্পূর্ণ তৈরি হয়েছে।');
          }
        } catch (err) {
          console.error('Modal preview generate error:', err);
          if (isMounted) {
            setStatusMessage('নিচের বাটনগুলো দিয়ে সরাসরি প্রিন্ট বা ডাউনলোড করুন।');
          }
        }
      } else {
        if (isMounted) {
          setStatusMessage('নিচের বাটনগুলো দিয়ে সরাসরি প্রিন্ট বা ডাউনলোড করুন।');
        }
      }
      if (isMounted) setIsGenerating(false);
    };

    generatePreview();

    return () => {
      isMounted = false;
    };
  }, [isOpen, paperSize, targetElementId]);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setStatusMessage('PDF ফাইল প্রসেস ও ডাউনলোড করা হচ্ছে...');
    const elemId = document.getElementById(targetElementId) ? targetElementId : `${targetElementId}-print`;
    const dateStr = formData.dutyDate || 'date';
    const fileName = paperSize === 'a4'
      ? `Goni_Market_Guard_Slips_A4_${dateStr}.pdf`
      : `Goni_Market_Guard_Slip_A5_${dateStr}.pdf`;

    let success = false;
    if (paperSize === 'a4') {
      success = await downloadElementAsA4PDF(elemId, fileName);
    } else {
      success = await downloadElementAsA5PDF(elemId, fileName);
    }

    setIsGenerating(false);
    if (success) {
      setStatusMessage('✅ PDF ডাউনলোড সফল হয়েছে!');
    } else {
      setErrorMessage('PDF ডাউনলোডে সমস্যা হলে নিচের "HD ছবি (PNG)" বা "নতুন পেজে খুলুন" অপশন ব্যবহার করুন।');
    }
  };

  const handleDownloadPNG = async () => {
    setIsGenerating(true);
    setStatusMessage('HD ছবি ডাউনলোড করা হচ্ছে...');
    const elemId = document.getElementById(targetElementId) ? targetElementId : `${targetElementId}-print`;
    const dateStr = formData.dutyDate || 'date';
    const fileName = `Goni_Market_Guard_Slip_${paperSize.toUpperCase()}_${dateStr}.png`;

    const success = await downloadElementAsPNG(elemId, fileName);
    setIsGenerating(false);

    if (success) {
      setStatusMessage('✅ HD ছবি (PNG) ডাউনলোড সফল হয়েছে!');
    } else {
      // Fallback: If previewImage exists, trigger download directly from previewImage
      if (previewImage) {
        try {
          const a = document.createElement('a');
          a.href = previewImage;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setStatusMessage('✅ HD ছবি ডাউনলোড সম্পূর্ণ!');
          return;
        } catch (e) {
          console.error(e);
        }
      }
      setErrorMessage('ছবি ডাউনলোড হতে সমস্যা হচ্ছে। ছবিতে চেপে ধরে "Save Image" চাপুন।');
    }
  };

  const handleDirectPrint = () => {
    triggerPrintWindow();
  };

  const handleOpenNewWindow = async () => {
    let imgSource = previewImage;
    const elem = document.getElementById(targetElementId) || document.getElementById(`${targetElementId}-print`);

    if (!imgSource && elem) {
      try {
        const canvas = await captureElementToCanvas(elem);
        imgSource = canvas.toDataURL('image/png', 1.0);
        setPreviewImage(imgSource);
      } catch (e) {
        console.error('Canvas capture fallback for new window:', e);
      }
    }

    const newWin = window.open('', '_blank');
    if (!newWin) {
      alert('ব্রাউজারের পপআপ ব্লকার উইন্ডো আটকে দিয়েছে। অনুগ্রহ করে ব্রাউজার সেটিংসে পপআপ অ্যালাউ করুন।');
      return;
    }

    const htmlContent = elem ? elem.outerHTML : '';

    newWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>গণি মার্কেট স্লিপ - প্রিন্ট পেজ (${paperSize.toUpperCase()})</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 20px; background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
            .btn { background: #f59e0b; color: #000; font-weight: bold; padding: 12px 28px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 15px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4); transition: transform 0.1s; }
            .btn:hover { background: #d97706; transform: scale(1.02); }
            .print-wrapper { background: #ffffff; padding: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); color: #000; }
            @media print {
              body { background: #ffffff !important; padding: 0 !important; color: #000 !important; }
              .no-print { display: none !important; }
              .print-wrapper { box-shadow: none !important; border-radius: 0 !important; width: 100% !important; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #f59e0b; margin-bottom: 5px;">গণি মার্কেট নৈশকালীন নিরাপত্তা স্লিপ (${paperSize.toUpperCase()})</h2>
            <p style="color: #94a3b8; font-size: 14px;">প্রিন্ট করতে নিচের বাটনে চাপুন অথবা সরাসরি Ctrl+P চাপুন:</p>
            <button class="btn" onclick="window.print()">🖨️ এই পেজটি সরাসরি প্রিন্ট করুন (Ctrl+P)</button>
          </div>
          <div class="print-wrapper">
            ${imgSource ? `<img src="${imgSource}" style="max-width:210mm; width:100%; height:auto; display:block;" />` : htmlContent}
          </div>
        </body>
      </html>
    `);
    newWin.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn no-print">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                প্রিন্ট ও ডাউনলোড অ্যাসিস্ট্যান্ট ({paperSize.toUpperCase()})
              </h3>
              <p className="text-xs text-slate-400">
                তারিখ: {formatBengaliFullDate(formData.dutyDate)} | সিরিয়াল: #{serialNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status or Alert banner */}
        {statusMessage && (
          <div className="mt-4 p-3 bg-slate-800/80 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center gap-2">
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Preview Container */}
        <div className="my-4 flex-1 flex flex-col items-center justify-center bg-slate-950/80 border border-slate-800 rounded-xl p-3 min-h-[220px] max-h-[350px] overflow-auto">
          {isGenerating && !previewImage ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-slate-400 text-xs">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <span>উচ্চ-রেজোলিউশন স্লিপ ক্যানভাস প্রসেস হচ্ছে...</span>
            </div>
          ) : previewImage ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <img
                src={previewImage}
                alt="Slip Preview"
                className="max-h-[280px] w-auto object-contain rounded-md border border-slate-700 shadow-md"
              />
              <span className="text-[11px] text-slate-400">
                💡 মোবাইলে ছবি ডাউনলোডে সমস্যা হলে ছবির উপর চেপে ধরে &quot;Save Image&quot; বা &quot;Download Image&quot; বেছে নিন।
              </span>
            </div>
          ) : (
            <div className="text-slate-400 text-xs text-center py-8 flex flex-col items-center gap-2">
              <Printer className="w-8 h-8 text-amber-400/80 mb-1" />
              <span>সরাসরি নিচের ১, ২, ৩ বা ৪ নং বাটন থেকে ডাউনলোড অথবা প্রিন্ট করুন।</span>
            </div>
          )}
        </div>

        {/* Main Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>১. {paperSize.toUpperCase()} PDF ডাউনলোড করুন</span>
          </button>

          <button
            onClick={handleDownloadPNG}
            disabled={isGenerating}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <ImageIcon className="w-4 h-4 text-sky-200" />
            <span>২. HD ছবি (PNG) ডাউনলোড</span>
          </button>

          <button
            onClick={handleDirectPrint}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>৩. ব্রাউজার প্রিন্ট ডায়ালগ (Ctrl+P)</span>
          </button>

          <button
            onClick={handleOpenNewWindow}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-600/60 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>৪. নতুন ট্যাবে খুলে প্রিন্ট করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
