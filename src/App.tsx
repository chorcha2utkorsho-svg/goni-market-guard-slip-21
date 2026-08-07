import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InputForm } from './components/InputForm';
import { A5DualSlipContainer } from './components/A5DualSlipContainer';
import { A4QuadSlipContainer } from './components/A4QuadSlipContainer';
import { PreviewControls } from './components/PreviewControls';
import { BatchGeneratorModal } from './components/BatchGeneratorModal';
import { HistoryPanel } from './components/HistoryPanel';
import { VerificationModal } from './components/VerificationModal';
import { GuardDutySlipInput, SavedSlipRecord } from './types';
import { getTomorrowDateString, generateSlipSerial, formatBengaliFullDate } from './utils/bengaliUtils';
import { downloadElementAsA5PDF, downloadElementAsA4PDF, triggerPrintWindow } from './utils/pdfGenerator';
import { Info, Sparkles } from 'lucide-react';
import { getScheduledPairForDate } from './data/rosterData';
import { fetchSlipsFromSupabase, saveSlipToSupabase, isSupabaseConfigured } from './utils/supabase';

export default function App() {
  const tomorrowDate = getTomorrowDateString();
  const initialSchedule = getScheduledPairForDate(tomorrowDate);

  // Form State initialized with two guards and round number
  const [formData, setFormData] = useState<GuardDutySlipInput>(() => ({
    guard1Name: initialSchedule.pair.guard1Name,
    guard1BusinessType: initialSchedule.pair.guard1BusinessType,
    guard1ShopNo: '',
    guard2Name: initialSchedule.pair.guard2Name,
    guard2BusinessType: initialSchedule.pair.guard2BusinessType,
    guard2ShopNo: '',
    dutyDate: tomorrowDate,
    roundNumber: initialSchedule.roundNumber,
    serialIndex: initialSchedule.serialNo,
    mobileNumber: '01947399752',
    qrCodeUrl: 'https://gonimarket.org/report',
    customInstruction: '',
    theme: 'classic',
    useBengaliNumerals: true,
  }));

  const [serialNumber, setSerialNumber] = useState<string>(() => generateSlipSerial());
  const [paperSize, setPaperSize] = useState<'a4' | 'a5'>('a4'); // Default to A4 4-in-1
  const [zoomLevel, setZoomLevel] = useState<number>(0.75);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);
  const [isSupabaseActive] = useState<boolean>(() => isSupabaseConfigured());

  // Modals & Drawers
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  // Auto open verification modal if URL query has ?verify=1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('verify') === '1') {
        setIsVerificationOpen(true);
      }
    }
  }, []);

  // History State
  const [historyRecords, setHistoryRecords] = useState<SavedSlipRecord[]>(() => {
    try {
      const saved = localStorage.getItem('goni_market_slip_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load from Supabase on mount if configured
  useEffect(() => {
    if (isSupabaseActive) {
      fetchSlipsFromSupabase().then((remoteSlips) => {
        if (remoteSlips && remoteSlips.length > 0) {
          setHistoryRecords(remoteSlips);
        }
      });
    }
  }, [isSupabaseActive]);

  useEffect(() => {
    localStorage.setItem('goni_market_slip_history', JSON.stringify(historyRecords));
  }, [historyRecords]);

  // Handlers
  const handleFormChange = (updated: Partial<GuardDutySlipInput>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const handleResetForm = () => {
    const sched = getScheduledPairForDate(tomorrowDate);
    setFormData({
      guard1Name: sched.pair.guard1Name,
      guard1BusinessType: sched.pair.guard1BusinessType,
      guard1ShopNo: '',
      guard2Name: sched.pair.guard2Name,
      guard2BusinessType: sched.pair.guard2BusinessType,
      guard2ShopNo: '',
      dutyDate: tomorrowDate,
      roundNumber: sched.roundNumber,
      serialIndex: sched.serialNo,
      mobileNumber: '01712345678',
      qrCodeUrl: 'https://gonimarket.org/report',
      customInstruction: '',
      theme: 'classic',
      useBengaliNumerals: true,
    });
    setSerialNumber(generateSlipSerial());
  };

  const handleSaveToHistory = async () => {
    const newRecord: SavedSlipRecord = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      serialNumber,
    };

    setHistoryRecords((prev) => [newRecord, ...prev]);

    if (isSupabaseActive) {
      await saveSlipToSupabase(newRecord);
    }

    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 2500);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    if (paperSize === 'a4') {
      const fileName = `Goni_Market_Guard_Slips_A4_4Up_${formData.dutyDate}.pdf`;
      await downloadElementAsA4PDF('a4-quad-slip-container', fileName);
    } else {
      const fileName = `Goni_Market_Guard_Slip_A5_${formData.dutyDate}.pdf`;
      await downloadElementAsA5PDF('a5-dual-slip-container', fileName);
    }
    setIsDownloading(false);
  };

  const handleDeleteHistoryRecord = (id: string) => {
    setHistoryRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('আপনি কি সব সংরক্ষিত স্লিপ মুছে ফেলতে চান?')) {
      setHistoryRecords([]);
    }
  };

  const handleSelectHistoryRecord = (record: SavedSlipRecord) => {
    setFormData({
      guard1Name: record.guard1Name,
      guard1BusinessType: record.guard1BusinessType,
      guard1ShopNo: record.guard1ShopNo,
      guard2Name: record.guard2Name,
      guard2BusinessType: record.guard2BusinessType,
      guard2ShopNo: record.guard2ShopNo,
      dutyDate: record.dutyDate,
      roundNumber: record.roundNumber || 1,
      serialIndex: record.serialIndex,
      mobileNumber: record.mobileNumber,
      qrCodeUrl: record.qrCodeUrl,
      customInstruction: record.customInstruction,
      theme: record.theme || 'classic',
      useBengaliNumerals: record.useBengaliNumerals ?? true,
    });
    if (record.serialNumber) {
      setSerialNumber(record.serialNumber);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif] antialiased">
      {/* Top Navbar */}
      <Navbar
        onPrint={triggerPrintWindow}
        onDownloadPDF={handleDownloadPDF}
        onOpenHistory={() => setIsHistoryPanelOpen(true)}
        onOpenBatch={() => setIsBatchModalOpen(true)}
        onOpenPresets={() => {}}
        onOpenVerification={() => setIsVerificationOpen(true)}
        isDownloading={isDownloading}
        historyCount={historyRecords.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form & Inputs (5 cols) */}
        <section className="no-print lg:col-span-5 space-y-4">
          <InputForm
            formData={formData}
            onChange={handleFormChange}
            onReset={handleResetForm}
            onSaveToHistory={handleSaveToHistory}
            isSavedSuccess={isSavedSuccess}
            isSupabaseActive={isSupabaseActive}
          />

          {/* Quick Info Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>A4 পেপারে ৪টি স্লিপ (২ দিন) জিরো পেপার ওয়েস্ট প্রিন্টিং:</span>
            </div>
            <p className="leading-relaxed">
              ১টি стандарт <strong className="text-white">A4 সাইজ পেপারে ২টি A5 লেআউট (২ দিন x ২টি কপি = মোট ৪টি ল্যান্ডস্কেপ স্লিপ)</strong> প্রিন্ট করা যায়। এর ফলে কোনো কাগজ অপচয় না হয়ে ২ দিনের স্লিপ একসাথে সুন্দরভাবে বের হয়। আপনি চাইলে উপরে ডানপাশে A5 সাইজও বাছাই করতে পারেন।
            </p>
          </div>
        </section>

        {/* Right Column: Live Dual / Quad Slip Preview (7 cols) */}
        <section className="lg:col-span-7 space-y-4 flex flex-col items-center">
          <div className="w-full">
            <PreviewControls
              paperSize={paperSize}
              onPaperSizeChange={setPaperSize}
              zoomLevel={zoomLevel}
              onZoomIn={() => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3))}
              onZoomOut={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.4))}
              onResetZoom={() => setZoomLevel(paperSize === 'a4' ? 0.65 : 0.85)}
              onPrint={triggerPrintWindow}
              onDownloadPDF={handleDownloadPDF}
              onOpenVerification={() => setIsVerificationOpen(true)}
              isDownloading={isDownloading}
            />
          </div>

          {/* Slip Document Viewer Frame */}
          <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-2xl flex flex-col items-center min-h-[550px] justify-center relative">
            <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-2 no-print">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                {paperSize === 'a4' ? (
                  <>
                    লাইভ A4 পেজ প্রিভিউ (৪টি ল্যান্ডস্কেপ স্লিপ — {formatBengaliFullDate(formData.dutyDate)} ও পরবর্তী দিন)
                  </>
                ) : (
                  <>
                    লাইভ A5 পেজ প্রিভিউ (২টি স্লিপ — {formatBengaliFullDate(formData.dutyDate)})
                  </>
                )}
              </span>
            </div>

            {/* Scaled Preview Canvas */}
            <div
              className="transition-transform duration-200 ease-out origin-top shadow-2xl rounded-sm"
              style={{
                transform: `scale(${zoomLevel})`,
                marginBottom: `${(zoomLevel - 1) * (paperSize === 'a4' ? 450 : 200)}px`,
              }}
            >
              {paperSize === 'a4' ? (
                <A4QuadSlipContainer
                  id="a4-quad-slip-container"
                  dataDay1={formData}
                  serialNumberDay1={serialNumber}
                  onVerifyClick={() => setIsVerificationOpen(true)}
                />
              ) : (
                <A5DualSlipContainer
                  id="a5-dual-slip-container"
                  data={formData}
                  serialNumber={serialNumber}
                  onVerifyClick={() => setIsVerificationOpen(true)}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Hidden Print-Only Container for browser window.print() */}
      <div className="hidden print-only-container">
        {paperSize === 'a4' ? (
          <A4QuadSlipContainer
            id="a4-quad-slip-container-print"
            dataDay1={formData}
            serialNumberDay1={serialNumber}
          />
        ) : (
          <A5DualSlipContainer
            id="a5-dual-slip-container-print"
            data={formData}
            serialNumber={serialNumber}
          />
        )}
      </div>

      {/* Modals & Slide-overs */}
      <BatchGeneratorModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        defaultMobileNumber={formData.mobileNumber}
        defaultQrCodeUrl={formData.qrCodeUrl}
      />

      <HistoryPanel
        isOpen={isHistoryPanelOpen}
        onClose={() => setIsHistoryPanelOpen(false)}
        historyRecords={historyRecords}
        onSelectRecord={handleSelectHistoryRecord}
        onDeleteRecord={handleDeleteHistoryRecord}
        onClearAll={handleClearAllHistory}
      />

      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        data={formData}
        slipNumber={serialNumber}
      />
    </div>
  );
}


