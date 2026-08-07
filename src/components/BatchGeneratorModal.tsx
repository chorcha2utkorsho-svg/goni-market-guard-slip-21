import React, { useState } from 'react';
import { X, Sparkles, Calendar, Users, Download, ShieldCheck } from 'lucide-react';
import { GuardDutySlipInput } from '../types';
import { getTomorrowDateString, formatBengaliFullDate, generateSlipSerial, toBengaliNumerals } from '../utils/bengaliUtils';
import { A5DualSlipContainer } from './A5DualSlipContainer';
import { downloadBatchAsA5PDF } from '../utils/pdfGenerator';
import { getScheduledPairForDate } from '../data/rosterData';

interface BatchGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMobileNumber: string;
  defaultQrCodeUrl: string;
}

export const BatchGeneratorModal: React.FC<BatchGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultMobileNumber,
  defaultQrCodeUrl,
}) => {
  const [startDate, setStartDate] = useState(getTomorrowDateString());
  const [daysCount, setDaysCount] = useState<number>(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBatchSlips, setGeneratedBatchSlips] = useState<
    { id: string; serialNumber: string; data: GuardDutySlipInput }[]
  >([]);

  if (!isOpen) return null;

  const handleGenerateBatch = () => {
    const items: { id: string; serialNumber: string; data: GuardDutySlipInput }[] = [];
    const baseDate = new Date(startDate);

    for (let dayOffset = 0; dayOffset < daysCount; dayOffset++) {
      const currentDutyDate = new Date(baseDate);
      currentDutyDate.setDate(baseDate.getDate() + dayOffset);

      const year = currentDutyDate.getFullYear();
      const month = String(currentDutyDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDutyDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const scheduled = getScheduledPairForDate(dateStr);
      const uniqueId = `batch-slip-${dayOffset}`;
      const serial = generateSlipSerial();

      items.push({
        id: uniqueId,
        serialNumber: serial,
        data: {
          guard1Name: scheduled.pair.guard1Name,
          guard1BusinessType: scheduled.pair.guard1BusinessType,
          guard1ShopNo: scheduled.pair.guard1ShopNo || '',
          guard2Name: scheduled.pair.guard2Name,
          guard2BusinessType: scheduled.pair.guard2BusinessType,
          guard2ShopNo: scheduled.pair.guard2ShopNo || '',
          dutyDate: dateStr,
          roundNumber: scheduled.roundNumber,
          serialIndex: scheduled.serialNo,
          mobileNumber: defaultMobileNumber,
          qrCodeUrl: defaultQrCodeUrl,
          theme: 'classic',
          useBengaliNumerals: true,
        },
      });
    }

    setGeneratedBatchSlips(items);
  };

  const handleExportBatchPDF = async () => {
    if (generatedBatchSlips.length === 0) return;
    setIsGenerating(true);
    const elementIds = generatedBatchSlips.map((s) => s.id);
    await downloadBatchAsA5PDF(elementIds, `Goni_Market_Guard_Slips_Batch_${startDate}.pdf`);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-['Hind_Siliguri',sans-serif]">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl p-6 text-slate-100 shadow-2xl space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">অটমেটিক ব্যাচ স্লিপ জেনারেটর (Batch Duty Generator)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Step */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                ১. কত তারিখ থেকে জেনারেট করবেন? (Start Date):
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                ২. একটানা কতদিনের স্লিপ জেনারেট করবেন?
              </label>
              <select
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
              >
                <option value={1}>১ দিন (1 Day)</option>
                <option value={3}>৩ দিন (3 Days)</option>
                <option value={7}>৭ দিন (1 Week Schedule)</option>
                <option value={15}>১৫ দিন (15 Days)</option>
                <option value={35}>৩৫ দিন (১টি সম্পূর্ণ রাউন্ড - 1 Full Round)</option>
                <option value={70}>৭০ দিন (২টি সম্পূর্ণ রাউন্ড - 2 Full Rounds)</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateBatch}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>নির্ধারিত ৩৫ জোড়া তালিকার ভিত্তিতে {toBengaliNumerals(daysCount)} দিনের স্লিপ তৈরি করুন</span>
          </button>
        </div>

        {/* Generated Slips Preview Container */}
        {generatedBatchSlips.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-300">
                জেনারেট করা A5 স্লিপ পেজসমূহ ({toBengaliNumerals(generatedBatchSlips.length)} টি A5 শিট):
              </h4>
              <button
                type="button"
                onClick={handleExportBatchPDF}
                disabled={isGenerating}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'PDF তৈরি হচ্ছে...' : 'সবগুলো একবারে PDF ডাউনলোড করুন'}</span>
              </button>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-800">
              {generatedBatchSlips.map((item, idx) => (
                <div key={item.id} className="space-y-1">
                  <div className="text-[11px] font-mono text-slate-300 flex justify-between bg-slate-900 p-1.5 rounded">
                    <span>
                      পেজ #{idx + 1}: <strong className="text-amber-300">{item.data.guard1Name}</strong> + <strong className="text-sky-300">{item.data.guard2Name}</strong> ({formatBengaliFullDate(item.data.dutyDate)})
                    </span>
                    <span className="text-amber-400">রাউন্ড-{toBengaliNumerals(item.data.roundNumber)}</span>
                  </div>
                  <div className="overflow-x-auto p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-center transform scale-75 origin-top -mb-16">
                    <A5DualSlipContainer
                      id={item.id}
                      data={item.data}
                      serialNumber={item.serialNumber}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium cursor-pointer transition"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

