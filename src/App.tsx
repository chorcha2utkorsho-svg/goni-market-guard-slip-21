import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InputForm } from './components/InputForm';
import { A5DualSlipContainer } from './components/A5DualSlipContainer';
import { A4QuadSlipContainer } from './components/A4QuadSlipContainer';
import { A5DualSlipBackContainer } from './components/A5DualSlipBackContainer';
import { A4QuadSlipBackContainer } from './components/A4QuadSlipBackContainer';
import { PreviewControls } from './components/PreviewControls';
import { BatchGeneratorModal } from './components/BatchGeneratorModal';
import { HistoryPanel } from './components/HistoryPanel';
import { VerificationModal } from './components/VerificationModal';
import { PublicAuditBoard } from './components/PublicAuditBoard';
import { CommonMarketDashboard } from './components/CommonMarketDashboard';
import { DevAuthModal } from './components/DevAuthModal';
import { DeveloperContentModal } from './components/DeveloperContentModal';
import { PrintDownloadModal } from './components/PrintDownloadModal';
import { MerchantAuthModal, MerchantProfile } from './components/MerchantAuthModal';
import { GuardDutySlipInput, SavedSlipRecord, DutyComment, GuardStatus } from './types';
import { getTomorrowDateString, generateSlipSerial, formatBengaliFullDate } from './utils/bengaliUtils';
import {
  downloadElementAsA5PDF,
  downloadElementAsA4PDF,
  downloadDuplexA5PDF,
  downloadDuplexA4PDF,
  downloadElementAsPNG,
  triggerPrintWindow,
} from './utils/pdfGenerator';
import { Sparkles, Lock, ShieldCheck, ArrowRight, Store, Edit3 } from 'lucide-react';
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

  const [isDevUnlocked, setIsDevUnlocked] = useState<boolean>(false);

  // Auth Modals & CMS Content Editor
  const [isDevAuthModalOpen, setIsDevAuthModalOpen] = useState(false);
  const [isDevContentModalOpen, setIsDevContentModalOpen] = useState(false);
  const [isMerchantAuthModalOpen, setIsMerchantAuthModalOpen] = useState(false);
  const [pendingDevAction, setPendingDevAction] = useState<'SLIP_GENERATOR' | 'SLIP_GENERATOR_14TH' | 'SECTION_EDITOR' | null>(null);

  const handleOpenDevContentEditor = () => {
    if (!isDevUnlocked) {
      setPendingDevAction('SECTION_EDITOR');
      setIsDevAuthModalOpen(true);
    } else {
      setIsDevContentModalOpen(true);
    }
  };

  const handleOpenSlipGenerator = () => {
    if (!isDevUnlocked) {
      setPendingDevAction('SLIP_GENERATOR');
      setIsDevAuthModalOpen(true);
    } else {
      setCurrentView('SLIP_GENERATOR');
    }
  };

  const handleLockDev = () => {
    setIsDevUnlocked(false);
    setCurrentView('COMMON_DASHBOARD');
    setIsDevContentModalOpen(false);
  };

  // Safety guard: if not unlocked, never allow SLIP_GENERATOR view
  useEffect(() => {
    if (!isDevUnlocked && currentView === 'SLIP_GENERATOR') {
      setCurrentView('COMMON_DASHBOARD');
    }
  }, [isDevUnlocked, currentView]);

  useEffect(() => {
    const handleOpenSlipGenEvent = () => {
      handleOpenSlipGenerator();
    };
    window.addEventListener('goni_market_open_slip_generator', handleOpenSlipGenEvent);
    return () => {
      window.removeEventListener('goni_market_open_slip_generator', handleOpenSlipGenEvent);
    };
  }, [isDevUnlocked]);

  // Form State initialized with restored draft or defaults
  const [formData, setFormData] = useState<GuardDutySlipInput>(() => {
    try {
      const savedDraft = localStorage.getItem('goni_market_form_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && typeof parsed === 'object' && parsed.dutyDate) {
          if (parsed.mobileNumber === '01947399752' || !parsed.mobileNumber) {
            parsed.mobileNumber = '01333601029';
          }
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
      mobileNumber: '01333601029',
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
  const [activeSide, setActiveSide] = useState<'front' | 'back' | 'both'>('front');
  const [zoomLevel, setZoomLevel] = useState<number>(0.75);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);
  const [isSupabaseActive] = useState<boolean>(() => isSupabaseConfigured());

  // Modals & Drawers
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isAuditBoardOpen, setIsAuditBoardOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Auto open verification modal if URL query has ?verify=1 or handle 14th Slip Generator request
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('verify') === '1') {
        setIsVerificationOpen(true);
      }
    }

    const handleOpen14thSlip = () => {
      if (!isDevUnlocked) {
        setPendingDevAction('SLIP_GENERATOR_14TH');
        setIsDevAuthModalOpen(true);
        return;
      }
      setCurrentView('SLIP_GENERATOR');
      // Set date to 14th of current month (e.g., 2026-08-14)
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const date14Str = `${year}-${month}-14`;
      setFormData((prev) => ({
        ...prev,
        dutyDate: date14Str,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('goni_market_open_slip_generator_14th', handleOpen14thSlip);
    return () => window.removeEventListener('goni_market_open_slip_generator_14th', handleOpen14thSlip);
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
      mobileNumber: '01333601029',
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
    const newRecordDay1: SavedSlipRecord = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      serialNumber,
    };

    // Calculate Day 2 data for 2-day batch storage
    const d1Obj = new Date(`${formData.dutyDate}T00:00:00`);
    d1Obj.setDate(d1Obj.getDate() + 1);
    const y2 = d1Obj.getFullYear();
    const m2 = String(d1Obj.getMonth() + 1).padStart(2, '0');
    const d2 = String(d1Obj.getDate()).padStart(2, '0');
    const day2DateStr = `${y2}-${m2}-${d2}`;
    const sched2 = getScheduledPairForDate(day2DateStr);

    const newRecordDay2: SavedSlipRecord = {
      ...formData,
      id: (Date.now() + 1).toString(),
      dutyDate: day2DateStr,
      roundNumber: sched2.roundNumber,
      serialIndex: sched2.serialNo,
      guard1Name: sched2.pair.guard1Name,
      guard1BusinessType: sched2.pair.guard1BusinessType,
      guard1ShopNo: sched2.pair.guard1ShopNo || '',
      guard1Status: 'PRESENT',
      guard2Name: sched2.pair.guard2Name,
      guard2BusinessType: sched2.pair.guard2BusinessType,
      guard2ShopNo: sched2.pair.guard2ShopNo || '',
      guard2Status: 'PRESENT',
      createdAt: new Date().toISOString(),
      serialNumber: `${serialNumber}-DAY2`,
    };

    if (paperSize === 'a4') {
      setHistoryRecords((prev) => [newRecordDay1, newRecordDay2, ...prev]);

      if (isSupabaseActive) {
        await saveSlipToSupabase(newRecordDay1);
        await saveSlipToSupabase(newRecordDay2);
      }
    } else {
      setHistoryRecords((prev) => [newRecordDay1, ...prev]);

      if (isSupabaseActive) {
        await saveSlipToSupabase(newRecordDay1);
      }
    }

    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 2500);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      let success = false;
      const dateStr = formData.dutyDate || 'date';
      const frontId = paperSize === 'a4' ? 'a4-quad-slip-container' : 'a5-dual-slip-container';
      const backId = paperSize === 'a4' ? 'a4-quad-slip-back-container' : 'a5-dual-slip-back-container';

      if (activeSide === 'both') {
        const fileName = paperSize === 'a4'
          ? `Goni_Market_Guard_Slips_A4_Duplex_${dateStr}.pdf`
          : `Goni_Market_Guard_Slip_A5_Duplex_${dateStr}.pdf`;
        if (paperSize === 'a4') {
          success = await downloadDuplexA4PDF(frontId, backId, fileName);
        } else {
          success = await downloadDuplexA5PDF(frontId, backId, fileName);
        }
      } else if (activeSide === 'back') {
        const fileName = paperSize === 'a4'
          ? `Goni_Market_Guard_Slips_A4_BackSide_${dateStr}.pdf`
          : `Goni_Market_Guard_Slip_A5_BackSide_${dateStr}.pdf`;
        if (paperSize === 'a4') {
          success = await downloadElementAsA4PDF(backId, fileName);
        } else {
          success = await downloadElementAsA5PDF(backId, fileName);
        }
      } else {
        const fileName = paperSize === 'a4'
          ? `Goni_Market_Guard_Slips_A4_FrontSide_${dateStr}.pdf`
          : `Goni_Market_Guard_Slip_A5_FrontSide_${dateStr}.pdf`;
        if (paperSize === 'a4') {
          success = await downloadElementAsA4PDF(frontId, fileName);
        } else {
          success = await downloadElementAsA5PDF(frontId, fileName);
        }
      }

      if (!success) {
        setIsPrintModalOpen(true);
      }
    } catch (err) {
      console.error('PDF Download Error:', err);
      setIsPrintModalOpen(true);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPNG = async () => {
    setIsDownloading(true);
    try {
      const dateStr = formData.dutyDate || 'date';
      const targetId = activeSide === 'back'
        ? (paperSize === 'a4' ? 'a4-quad-slip-back-container' : 'a5-dual-slip-back-container')
        : (paperSize === 'a4' ? 'a4-quad-slip-container' : 'a5-dual-slip-container');
      const sideSuffix = activeSide === 'back' ? 'BackSide' : 'FrontSide';
      const fileName = `Goni_Market_Guard_Slip_${paperSize.toUpperCase()}_${sideSuffix}_${dateStr}.png`;
      const success = await downloadElementAsPNG(targetId, fileName);
      if (!success) {
        setIsPrintModalOpen(true);
      }
    } catch (err) {
      console.error('PNG Download Error:', err);
      setIsPrintModalOpen(true);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTriggerPrint = () => {
    triggerPrintWindow();
    setIsPrintModalOpen(true);
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
      {/* Screen Interactive UI Wrapper (Hidden during print) */}
      <div className="no-print flex-1 flex flex-col">
        {/* Top Navbar */}
        <Navbar
          currentView={currentView}
          onSelectView={(view) => {
            if (view === 'SLIP_GENERATOR') {
              handleOpenSlipGenerator();
            } else {
              setCurrentView('COMMON_DASHBOARD');
            }
          }}
          onPrint={handleTriggerPrint}
          onDownloadPDF={handleDownloadPDF}
          onOpenHistory={() => setIsHistoryPanelOpen(true)}
          onOpenBatch={() => setIsBatchModalOpen(true)}
          onOpenPresets={() => {}}
          onOpenVerification={() => setIsVerificationOpen(true)}
          onOpenAuditBoard={() => setIsAuditBoardOpen(true)}
          onOpenMerchantAuth={() => setIsMerchantAuthModalOpen(true)}
          onOpenDevAuth={() => {
            setPendingDevAction('SECTION_EDITOR');
            setIsDevAuthModalOpen(true);
          }}
          onOpenDevContentEditor={handleOpenDevContentEditor}
          onLockDev={handleLockDev}
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
            onOpenDevAuth={() => {
              setPendingDevAction('SLIP_GENERATOR');
              setIsDevAuthModalOpen(true);
            }}
            isDevUnlocked={isDevUnlocked}
            onGoToDevDashboard={handleOpenSlipGenerator}
            onPostGlobalComment={handleAddComment}
            onLockDev={handleLockDev}
          />
        ) : (
          /* DEVELOPER SLIP GENERATOR VIEW */
          !isDevUnlocked ? (
            <div className="bg-slate-900/90 border border-red-500/40 rounded-2xl p-8 max-w-lg mx-auto my-12 text-center space-y-5 shadow-2xl backdrop-blur-md">
              <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/40 mx-auto flex items-center justify-center text-red-400">
                <Lock className="w-8 h-8 text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  নাইট গার্ড সিকিউরিটি স্লিপ প্যানেল লক করা 🔒
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  অফিশিয়াল স্লিপ তৈরি, প্রিন্ট ও ডেটাবেজে সংরক্ষণের জন্য অ্যাডমিন/ডেভেলপার সিকিউরিটি পাসওয়ার্ড দিয়ে এক্সেস আনলক করতে হবে।
                </p>
              </div>
              <button
                onClick={() => {
                  setPendingDevAction('SLIP_GENERATOR');
                  setIsDevAuthModalOpen(true);
                }}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40"
              >
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                <span>সিক্রেট পাসওয়ার্ড দিয়ে স্লিপ প্যানেল আনলক করুন</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
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
                    activeSide={activeSide}
                    onSideChange={setActiveSide}
                    zoomLevel={zoomLevel}
                    onZoomIn={() => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3))}
                    onZoomOut={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.4))}
                    onResetZoom={() => setZoomLevel(paperSize === 'a4' ? 0.65 : 0.85)}
                    onPrint={handleTriggerPrint}
                    onDownloadPDF={handleDownloadPDF}
                    onDownloadPNG={handleDownloadPNG}
                    onOpenVerification={() => setIsVerificationOpen(true)}
                    isDownloading={isDownloading}
                  />
                </div>

                {/* Slip Document Viewer Frame */}
                <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-2xl flex flex-col items-center min-h-[550px] justify-center relative">
                  <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-2 no-print">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>
                      {activeSide === 'back' ? (
                        <>
                          🔄 লাইভ উল্টোপিঠ প্রিভিউ (ব্যবসায়ী ও উদ্যোক্তা অনুপ্রেরণার ৭টি মূলনীতি — {paperSize.toUpperCase()})
                        </>
                      ) : activeSide === 'both' ? (
                        <>
                          📑 লাইভ উভয় পিঠ প্রিভিউ (সামনের পাহারাদার স্লিপ + উল্টোপিঠের ৭টি মূলমন্ত্র)
                        </>
                      ) : paperSize === 'a4' ? (
                        <>
                          📄 লাইভ A4 পেজ প্রিভিউ (৪টি ল্যান্ডস্কেপ স্লিপ — {formatBengaliFullDate(formData.dutyDate)} ও পরবর্তী দিন)
                        </>
                      ) : (
                        <>
                          📄 লাইভ A5 পেজ প্রিভিউ (২টি স্লিপ — {formatBengaliFullDate(formData.dutyDate)})
                        </>
                      )}
                    </span>
                  </div>

                  {/* Scaled Preview Canvas */}
                  <div
                    className="transition-transform duration-200 ease-out origin-top shadow-2xl rounded-sm flex flex-col gap-6 items-center"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      marginBottom: `${(zoomLevel - 1) * (paperSize === 'a4' ? (activeSide === 'both' ? 900 : 450) : (activeSide === 'both' ? 400 : 200))}px`,
                    }}
                  >
                    {/* Front Page */}
                    {(activeSide === 'front' || activeSide === 'both') && (
                      <div className="flex flex-col items-center">
                        {activeSide === 'both' && (
                          <div className="bg-amber-600/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 no-print shadow-sm">
                            ১ম পৃষ্ঠা: সামনের মূল স্লিপ (Front Side)
                          </div>
                        )}
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
                    )}

                    {/* Back Page */}
                    {(activeSide === 'back' || activeSide === 'both') && (
                      <div className="flex flex-col items-center">
                        {activeSide === 'both' && (
                          <div className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 no-print shadow-sm">
                            ২য় পৃষ্ঠা: উল্টোপিঠ (উদ্যোক্তা ও সামাজিক দায়বদ্ধতার নীতি)
                          </div>
                        )}
                        {paperSize === 'a4' ? (
                          <A4QuadSlipBackContainer
                            id="a4-quad-slip-back-container"
                            dataDay1={formData}
                            serialNumberDay1={serialNumber}
                          />
                        ) : (
                          <A5DualSlipBackContainer
                            id="a5-dual-slip-back-container"
                            data={formData}
                            serialNumber={serialNumber}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hidden Background Mounted Elements for PDF export if not currently in DOM */}
                  <div className="sr-only" aria-hidden="true">
                    {activeSide === 'back' && (
                      paperSize === 'a4' ? (
                        <A4QuadSlipContainer
                          id="a4-quad-slip-container"
                          dataDay1={formData}
                          serialNumberDay1={serialNumber}
                        />
                      ) : (
                        <A5DualSlipContainer
                          id="a5-dual-slip-container"
                          data={formData}
                          serialNumber={serialNumber}
                        />
                      )
                    )}
                    {activeSide === 'front' && (
                      paperSize === 'a4' ? (
                        <A4QuadSlipBackContainer
                          id="a4-quad-slip-back-container"
                          dataDay1={formData}
                          serialNumberDay1={serialNumber}
                        />
                      ) : (
                        <A5DualSlipBackContainer
                          id="a5-dual-slip-back-container"
                          data={formData}
                          serialNumber={serialNumber}
                        />
                      )
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )
      )}
      </main>

      {/* Footer with Subtle Developer Access at bottom corner */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-950/90 py-6 px-4 sm:px-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span>© ২০২৬ গণি মার্কেট ব্যবসায়ী সমিতি | কেন্দ্রীয় ব্যবসায়ীদের কমন ড্যাশবোর্ড ও সোশ্যাল হাব</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>সহায়তা ও হটলাইন: ০১৩৩৩-৬০১০২৯</span>

            {/* Subtle Developer Access Link at bottom right corner */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenDevContentEditor}
                className="text-slate-500 hover:text-amber-400 text-[11px] font-medium transition cursor-pointer flex items-center gap-1 opacity-70 hover:opacity-100 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800 hover:border-amber-500/40"
                title="গোপন পাসওয়ার্ড দিয়ে সেকশন এডিটর খুলুন"
              >
                <Lock className={`w-3 h-3 ${isDevUnlocked ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{isDevUnlocked ? 'এডমিন সেকশন এডিটর' : 'এডমিন পোর্টাল 🔒'}</span>
              </button>

              {isDevUnlocked && (
                <button
                  onClick={() => setCurrentView(currentView === 'SLIP_GENERATOR' ? 'COMMON_DASHBOARD' : 'SLIP_GENERATOR')}
                  className="text-slate-500 hover:text-emerald-400 text-[11px] font-medium transition cursor-pointer flex items-center gap-1 opacity-70 hover:opacity-100 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800 hover:border-emerald-500/40"
                >
                  <span>{currentView === 'SLIP_GENERATOR' ? 'কমন ড্যাশবোর্ড' : 'স্লিপ প্যানেল'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
      </div> {/* End of screen interactive UI wrapper */}

      {/* Print-Only Container for browser window.print() */}
      <div className="print-only-container">
        {(activeSide === 'front' || activeSide === 'both') && (
          paperSize === 'a4' ? (
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
          )
        )}
        {(activeSide === 'back' || activeSide === 'both') && (
          paperSize === 'a4' ? (
            <A4QuadSlipBackContainer
              id="a4-quad-slip-back-container-print"
              dataDay1={formData}
              serialNumberDay1={serialNumber}
            />
          ) : (
            <A5DualSlipBackContainer
              id="a5-dual-slip-back-container-print"
              data={formData}
              serialNumber={serialNumber}
            />
          )
        )}
      </div>

      {/* Auth & Security Modals */}
      <DevAuthModal
        isOpen={isDevAuthModalOpen}
        onClose={() => {
          setIsDevAuthModalOpen(false);
          setPendingDevAction(null);
        }}
        onSuccess={() => {
          setIsDevUnlocked(true);
          try {
            sessionStorage.setItem('goni_market_dev_unlocked', 'true');
          } catch {
            // ignore
          }
          if (pendingDevAction === 'SECTION_EDITOR') {
            setIsDevContentModalOpen(true);
          } else if (pendingDevAction === 'SLIP_GENERATOR') {
            setCurrentView('SLIP_GENERATOR');
          } else if (pendingDevAction === 'SLIP_GENERATOR_14TH') {
            setCurrentView('SLIP_GENERATOR');
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const date14Str = `${year}-${month}-14`;
            setFormData((prev) => ({
              ...prev,
              dutyDate: date14Str,
            }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setIsDevContentModalOpen(true);
          }
          setPendingDevAction(null);
        }}
      />

      {/* CMS Content Editor Modal */}
      <DeveloperContentModal
        isOpen={isDevContentModalOpen}
        onClose={() => setIsDevContentModalOpen(false)}
        initialSectionId="sec-1"
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

      <PrintDownloadModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        paperSize={paperSize}
        formData={formData}
        serialNumber={serialNumber}
      />
    </div>
  );
}
