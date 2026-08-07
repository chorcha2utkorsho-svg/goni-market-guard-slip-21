import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InputForm } from './components/InputForm';
import { A5DualSlipContainer } from './components/A5DualSlipContainer';
import { A4QuadSlipContainer } from './components/A4QuadSlipContainer';
import { PreviewControls } from './components/PreviewControls';
import { BatchGeneratorModal } from './components/BatchGeneratorModal';
import { HistoryPanel } from './components/HistoryPanel';
import { VerificationModal } from './components/VerificationModal';
import { PublicAuditBoard } from './components/PublicAuditBoard';
import { CommonMarketDashboard } from './components/CommonMarketDashboard';
import { DevAuthModal } from './components/DevAuthModal';
import { MerchantAuthModal, MerchantProfile } from './components/MerchantAuthModal';
import { GuardDutySlipInput, SavedSlipRecord, DutyComment, GuardStatus } from './types';
import { getTomorrowDateString, generateSlipSerial, formatBengaliFullDate } from './utils/bengaliUtils';
import { downloadElementAsA5PDF, downloadElementAsA4PDF, triggerPrintWindow } from './utils/pdfGenerator';
import { Sparkles, Lock, ShieldCheck, ArrowRight, Store } from 'lucide-react';
import { getScheduledPairForDate } from './data/rosterData';
import { fetchSlipsFromSupabase, saveSlipToSupabase, isSupabaseConfigured } from './utils/supabase';

export default function App() {
  const tomorrowDate = getTomorrowDateString();
  const initialSchedule = getScheduledPairForDate(tomorrowDate);

  // App Navigation View: COMMON_DASHBOARD (Default) or SLIP_GENERATOR
  const [currentView, setCurrentView] = useState<'COMMON_DASHBOARD' | 'SLIP_GENERATOR'>('COMMON_DASHBOARD');

  // Auth States
  const [currentMerchant, setCurrentMerchant] = useState<MerchantProfile | null>(() => {
    try {
      const saved = localStorage.getItem('goni_market_merchant_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDevUnlocked, setIsDevUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('goni_market_dev_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // Auth Modals
  const [isDevAuthModalOpen, setIsDevAuthModalOpen] = useState(false);
  const [isMerchantAuthModalOpen, setIsMerchantAuthModalOpen] = useState(false);

  // Form State initialized with restored draft or defaults
  const [formData, setFormData] = useState<GuardDutySlipInput>(() => {
    try {
      const savedDraft = localStorage.getItem('goni_market_form_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && typeof parsed === 'object' && parsed.dutyDate) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial schedule
    }
    return {
      guard1Name: initialSchedule.pair.guard1Name,
      guard1BusinessType: initialSchedule.pair.guard1BusinessType,
      guard1ShopNo: initialSchedule.pair.guard1ShopNo || '',
      guard2Name: initialSchedule.pair.guard2Name,
      guard2BusinessType: initialSchedule.pair.guard2BusinessType,
      guard2ShopNo: initialSchedule.pair.guard2ShopNo || '',
      dutyDate: tomorrowDate,
      roundNumber: initialSchedule.roundNumber,
      serialIndex: initialSchedule.serialNo,
      mobileNumber: '01947399752',
      qrCodeUrl: 'https://gonimarket.org/report',
      customInstruction: '',
      theme: 'classic',
      useBengaliNumerals: true,
    };
  });

  // Auto-save form draft to localStorage on every field update
  useEffect(() => {
    try {
      localStorage.setItem('goni_market_form_draft', JSON.stringify(formData));
    } catch {
      // ignore storage quota errors
    }
  }, [formData]);

  const [serialNumber, setSerialNumber] = useState<string>(() => generateSlipSerial());
  const [paperSize, setPaperSize] = useState<'a4' | 'a5'>('a4');
  const [zoomLevel, setZoomLevel] = useState<number>(0.75);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);
  const [isSupabaseActive] = useState<boolean>(() => isSupabaseConfigured());

  // Modals & Drawers
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isAuditBoardOpen, setIsAuditBoardOpen] = useState(false);

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

  // Calculate total unpaid defaulters count for notification badge
  const unpaidCount = historyRecords.reduce((acc, r) => {
    let count = 0;
    if (r.guard1Status === 'ABSENT_UNPAID') count++;
    if (r.guard2Status === 'ABSENT_UNPAID') count++;
    return acc + count;
  }, (formData.guard1Status === 'ABSENT_UNPAID' ? 1 : 0) + (formData.guard2Status === 'ABSENT_UNPAID' ? 1 : 0));

  // Handle adding comments to records
  const handleAddComment = (recordId: string, comment: DutyComment) => {
    setHistoryRecords((prev) => {
      // If record ID matches existing
      const exists = prev.some((r) => r.id === recordId);
      if (exists) {
        return prev.map((r) => {
          if (r.id === recordId) {
            return {
              ...r,
              comments: [...(r.comments || []), comment],
            };
          }
          return r;
        });
      } else {
        // Create live record if not found
        const liveRecord: SavedSlipRecord = {
          ...formData,
          id: recordId,
          createdAt: new Date().toISOString(),
          serialNumber,
          comments: [comment],
        };
        return [liveRecord, ...prev];
      }
    });
  };

  const handleUpdateGuardStatus = (
    recordId: string,
    guardIndex: 1 | 2,
    status: GuardStatus,
    note?: string
  ) => {
    setHistoryRecords((prev) =>
      prev.map((r) => {
        if (r.id === recordId) {
          if (guardIndex === 1) {
            return { ...r, guard1Status: status, guard1StatusNote: note };
          } else {
            return { ...r, guard2Status: status, guard2StatusNote: note };
          }
        }
        return r;
      })
    );
  };

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
      guard1Status: 'PRESENT',
      guard1StatusNote: '',
      guard2Name: sched.pair.guard2Name,
      guard2BusinessType: sched.pair.guard2BusinessType,
      guard2ShopNo: '',
      guard2Status: 'PRESENT',
      guard2StatusNote: '',
      dutyDate: tomorrowDate,
      roundNumber: sched.roundNumber,
      serialIndex: sched.serialNo,
      mobileNumber: '01947399752',
      qrCodeUrl: 'https://gonimarket.org/report',
      customInstruction: '',
      theme: 'classic',
      useBengaliNumerals: true,
      comments: [],
    });
    setSerialNumber(generateSlipSerial());
    try {
      localStorage.removeItem('goni_market_form_draft');
    } catch {
      // ignore
    }
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
      guard1Status: record.guard1Status || 'PRESENT',
      guard1StatusNote: record.guard1StatusNote || '',
      guard2Name: record.guard2Name,
      guard2BusinessType: record.guard2BusinessType,
      guard2ShopNo: record.guard2ShopNo,
      guard2Status: record.guard2Status || 'PRESENT',
      guard2StatusNote: record.guard2StatusNote || '',
      dutyDate: record.dutyDate,
      roundNumber: record.roundNumber || 1,
      serialIndex: record.serialIndex,
      mobileNumber: record.mobileNumber,
      qrCodeUrl: record.qrCodeUrl,
      customInstruction: record.customInstruction,
      theme: record.theme || 'classic',
      useBengaliNumerals: record.useBengaliNumerals ?? true,
      comments: record.comments || [],
    });
    if (record.serialNumber) {
      setSerialNumber(record.serialNumber);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif] antialiased">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        onPrint={triggerPrintWindow}
        onDownloadPDF={handleDownloadPDF}
        onOpenHistory={() => setIsHistoryPanelOpen(true)}
        onOpenBatch={() => setIsBatchModalOpen(true)}
        onOpenPresets={() => {}}
        onOpenVerification={() => setIsVerificationOpen(true)}
        onOpenAuditBoard={() => setIsAuditBoardOpen(true)}
        onOpenMerchantAuth={() => setIsMerchantAuthModalOpen(true)}
        onOpenDevAuth={() => setIsDevAuthModalOpen(true)}
        currentMerchant={currentMerchant}
        isDevUnlocked={isDevUnlocked}
        isDownloading={isDownloading}
        historyCount={historyRecords.length}
        unpaidCount={unpaidCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {currentView === 'COMMON_DASHBOARD' ? (
          /* COMMON MARKET DASHBOARD VIEW */
          <CommonMarketDashboard
            records={historyRecords}
            currentMerchant={currentMerchant}
            onOpenMerchantAuth={() => setIsMerchantAuthModalOpen(true)}
            onOpenDevAuth={() => setIsDevAuthModalOpen(true)}
            isDevUnlocked={isDevUnlocked}
            onGoToDevDashboard={() => setCurrentView('SLIP_GENERATOR')}
            onPostGlobalComment={handleAddComment}
          />
        ) : (
          /* DEVELOPER SLIP GENERATOR VIEW */
          <div className="space-y-4">
            {/* Developer Lock Status Alert Bar */}
            {!isDevUnlocked && (
              <div className="bg-red-950/80 border border-red-700/80 rounded-2xl p-4 text-xs text-red-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-1.5">
                      <span>ডেভেলপার ইনপুট সিকিউরিটি লক করা (LOCKED)</span>
                    </h4>
                    <p className="text-[11px] text-red-300">
                      বাজারের নিরাপত্তার স্বার্থে নতুন ইনপুট প্রদান বা স্লিপ সেভ করতে পিন (1234) দিয়ে ডেভেলপার এক্সেস আনলক করুন।
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDevAuthModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>PIN দিয়ে আনলক করুন</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
                    ১টি স্ট্যান্ডার্ড <strong className="text-white">A4 সাইজ পেপারে ২টি A5 লেআউট (২ দিন x ২টি কপি = মোট ৪টি ল্যান্ডস্কেপ স্লিপ)</strong> প্রিন্ট করা যায়। এর ফলে কোনো কাগজ অপচয় না হয়ে ২ দিনের স্লিপ একসাথে সুন্দরভাবে বের হয়।
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
            </div>
          </div>
        )}
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

      {/* Auth & Security Modals */}
      <DevAuthModal
        isOpen={isDevAuthModalOpen}
        onClose={() => setIsDevAuthModalOpen(false)}
        onSuccess={() => {
          setIsDevUnlocked(true);
          try {
            sessionStorage.setItem('goni_market_dev_unlocked', 'true');
          } catch {
            // ignore
          }
          setCurrentView('SLIP_GENERATOR');
        }}
      />

      <MerchantAuthModal
        isOpen={isMerchantAuthModalOpen}
        onClose={() => setIsMerchantAuthModalOpen(false)}
        onSignInSuccess={(profile) => {
          setCurrentMerchant(profile);
          try {
            localStorage.setItem('goni_market_merchant_session', JSON.stringify(profile));
          } catch {
            // ignore
          }
        }}
        currentMerchant={currentMerchant}
        onSignOut={() => {
          setCurrentMerchant(null);
          try {
            localStorage.removeItem('goni_market_merchant_session');
          } catch {
            // ignore
          }
        }}
      />

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

      <PublicAuditBoard
        isOpen={isAuditBoardOpen}
        onClose={() => setIsAuditBoardOpen(false)}
        records={
          historyRecords.some((r) => r.dutyDate === formData.dutyDate)
            ? historyRecords
            : [
                {
                  ...formData,
                  id: 'current-live-form',
                  createdAt: new Date().toISOString(),
                  serialNumber,
                },
                ...historyRecords,
              ]
        }
        onAddComment={handleAddComment}
        onUpdateGuardStatus={handleUpdateGuardStatus}
      />
    </div>
  );
}
