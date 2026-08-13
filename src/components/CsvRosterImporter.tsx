import React, { useState, useEffect, useMemo } from 'react';
import {
  FileSpreadsheet,
  Copy,
  Check,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Table,
  Upload,
  Info,
  Sparkles,
} from 'lucide-react';
import { RosterPair } from '../types';
import {
  OFFICIAL_ROSTER_PAIRS,
  getActiveRosterPairs,
  saveCustomRosterPairs,
  resetCustomRosterPairs,
  isCustomRosterActive,
} from '../data/rosterData';

export const CsvRosterImporter: React.FC = () => {
  const [csvInput, setCsvInput] = useState<string>('');
  const [copiedSample, setCopiedSample] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isCustomActive, setIsCustomActive] = useState<boolean>(isCustomRosterActive());

  // Listen to global roster updates
  useEffect(() => {
    const handleUpdate = () => {
      setIsCustomActive(isCustomRosterActive());
    };
    window.addEventListener('goni_market_roster_updated', handleUpdate);
    return () => window.removeEventListener('goni_market_roster_updated', handleUpdate);
  }, []);

  // Sample CSV string generation
  const sampleCsvText = useMemo(() => {
    const header = 'ক্রমিক, ১ম পাহারাদার, ১ম ব্যবসা, দোকান১, ২য় পাহারাদার, ২য় ব্যবসা, দোকান২\n';
    const rows = OFFICIAL_ROSTER_PAIRS.slice(0, 5)
      .map(
        (p) =>
          `${p.serialNo},${p.guard1Name},${p.guard1BusinessType},${p.guard1ShopNo || ''},${p.guard2Name},${p.guard2BusinessType},${p.guard2ShopNo || ''}`
      )
      .join('\n');
    return header + rows;
  }, []);

  // Generate CSV text for current active roster so user can edit easily
  const currentActiveCsvText = useMemo(() => {
    const active = getActiveRosterPairs();
    const rows = active
      .map(
        (p) =>
          `${p.serialNo},${p.guard1Name},${p.guard1BusinessType},${p.guard1ShopNo || ''},${p.guard2Name},${p.guard2BusinessType},${p.guard2ShopNo || ''}`
      )
      .join('\n');
    return rows;
  }, [isCustomActive]);

  // Load current active roster into textarea
  const handleLoadCurrentRoster = () => {
    setCsvInput(currentActiveCsvText);
    setSaveMessage('বর্তমান রোস্টারের তথ্য ইনপুট বক্সে লোড করা হয়েছে!');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Copy sample to clipboard
  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleCsvText);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2500);
  };

  // Robust CSV/TSV Parser
  const parsedPairs = useMemo<RosterPair[]>(() => {
    if (!csvInput.trim()) return [];

    const lines = csvInput
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const result: RosterPair[] = [];

    lines.forEach((line, index) => {
      // Skip header line if detected
      if (
        index === 0 &&
        (line.toLowerCase().includes('ক্রমিক') ||
          line.toLowerCase().includes('serial') ||
          line.toLowerCase().includes('guard') ||
          line.toLowerCase().includes('পাহারাদার'))
      ) {
        return;
      }

      // Detect delimiter: tab, comma, semicolon, or pipe
      let delimiter = ',';
      if (line.includes('\t')) delimiter = '\t';
      else if (line.includes(';')) delimiter = ';';
      else if (line.includes('|')) delimiter = '|';

      const parts = line.split(delimiter).map((p) => p.trim());

      if (parts.length >= 2) {
        let serialNo = index + 1;
        let pIndex = 0;

        // Check if 1st part is numeric serial
        const firstAsNum = parseInt(parts[0], 10);
        if (!isNaN(firstAsNum) && firstAsNum > 0 && firstAsNum <= 100) {
          serialNo = firstAsNum;
          pIndex = 1; // start reading names from 2nd col
        }

        const guard1Name = parts[pIndex] || `পাহারাদার ${serialNo}A`;
        const guard1BusinessType = parts[pIndex + 1] || 'ব্যবসা';
        const guard1ShopNo = parts[pIndex + 2] || '';

        const guard2Name = parts[pIndex + 3] || `পাহারাদার ${serialNo}B`;
        const guard2BusinessType = parts[pIndex + 4] || 'ব্যবসা';
        const guard2ShopNo = parts[pIndex + 5] || '';

        result.push({
          serialNo,
          guard1Name,
          guard1BusinessType,
          guard1ShopNo,
          guard2Name,
          guard2BusinessType,
          guard2ShopNo,
          baseDateRound1: '2026-08-14',
        });
      }
    });

    return result;
  }, [csvInput]);

  // Save parsed pairs to dynamic roster state
  const handleSaveToRoster = () => {
    if (parsedPairs.length === 0) {
      alert('সঠিক ফরম্যাটে কোনো রোস্টার ডাটা পাওয়া যায়নি। অনুগ্রহ করে CSV কপি-পেস্ট করুন!');
      return;
    }

    const success = saveCustomRosterPairs(parsedPairs);
    if (success) {
      setSaveMessage(`সফলভাবে ${parsedPairs.length}টি জোড়ার কাস্টম রোস্টার সেভ ও ডাইনামিক আপডেট করা হয়েছে!`);
      setIsCustomActive(true);
      setTimeout(() => setSaveMessage(null), 4000);
    } else {
      alert('রোস্টার সেভ করতে সমস্যা হয়েছে।');
    }
  };

  // Reset to default official roster
  const handleResetToOfficial = () => {
    if (confirm('আপনি কি পূর্বের মূল অফিশিয়াল রোস্টারে ফিরে যেতে চান?')) {
      resetCustomRosterPairs();
      setCsvInput('');
      setIsCustomActive(false);
      setSaveMessage('মূল অফিশিয়াল রোস্টার পুনরায় সক্রিয় করা হয়েছে!');
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 text-xs text-slate-200">
      {/* Header & Status Badge */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📋 কাস্টম CSV রোস্টার ইম্পোর্টার (Roster CSV Paste)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              এক্সেল, গুগল শিট বা টেক্সট ফাইল থেকে CSV ফরম্যাটের নাইট গার্ড তালিকা পেস্ট করে সরাসরি অ্যাপের রোস্টার আপডেট করুন।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCustomActive ? (
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>কাস্টম CSV রোস্টার সক্রিয়</span>
            </span>
          ) : (
            <span className="text-[11px] bg-slate-800 text-slate-300 font-medium px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>ডিফল্ট অফিশিয়াল রোস্টার সক্রিয় (৩৫ জোড়া)</span>
            </span>
          )}
        </div>
      </div>

      {/* Success Banner */}
      {saveMessage && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-3 rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold text-xs">{saveMessage}</span>
        </div>
      )}

      {/* Format Guide Box */}
      <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 space-y-2 text-[11px]">
        <div className="flex items-center justify-between text-amber-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>CSV / Excel ফরম্যাট গাইডলাইন:</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadCurrentRoster}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-1 rounded border border-amber-500/40 cursor-pointer font-bold flex items-center gap-1 text-[10px]"
            >
              <Upload className="w-3 h-3" />
              <span>বর্তমান রোস্টার লোড করুন</span>
            </button>
            <button
              type="button"
              onClick={handleCopySample}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 cursor-pointer font-medium flex items-center gap-1 text-[10px]"
            >
              {copiedSample ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSample ? 'কপি হয়েছে!' : 'নমুনা CSV কপি করুন'}</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-900 font-mono text-[10px] text-slate-300 p-2 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre">
          {sampleCsvText}
        </div>
        <p className="text-slate-400 text-[10px]">
          💡 কলামের ক্রম: <strong>ক্রমিক, ১ম পাহারাদার, ১ম ব্যবসা, দোকান১, ২য় পাহারাদার, ২য় ব্যবসা, দোকান২</strong> (কমা <code className="bg-slate-900 px-1 rounded text-amber-300">,</code> বা কমা ছাড়া Excel থেকে কপি করে কলামসহ সরাসরি পেস্ট করা যাবে)।
        </p>
      </div>

      {/* Textarea Input */}
      <div className="space-y-1.5">
        <label className="block text-slate-300 font-bold text-xs flex items-center justify-between">
          <span>এখানে CSV / Excel ডাটা পেস্ট করুন:</span>
          <span className="text-[10px] text-slate-400 font-normal">
            {parsedPairs.length > 0 ? `✅ ${parsedPairs.length}টি রোস্টার জোড়া চিহ্নিত হয়েছে` : 'এখানে পেস্ট করুন'}
          </span>
        </label>
        <textarea
          rows={7}
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder={`১, খোরশেদ, ওয়ার্কশপ, , কাজল, হোটেল, 64\n২, মাহফুজ, ফার্নিচার, , অনুকুল, জুয়েলারী, 63\n৩, কামাল, ফার্নিচার, , রেডোয়ান, কম্পিউটার, 62\n...`}
          className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl p-3 font-mono text-xs text-emerald-300 outline-none leading-relaxed"
        />
      </div>

      {/* Parsed Live Preview Table */}
      {parsedPairs.length > 0 && (
        <div className="space-y-2 border border-slate-800 rounded-xl p-3 bg-slate-950/60">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Table className="w-4 h-4 text-emerald-400" />
              <span>লাইভ প্রিভিউ টেবিল ({parsedPairs.length}টি জোড়া):</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              যাচাইকৃত ডাটা
            </span>
          </div>

          <div className="max-h-52 overflow-y-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-slate-900 text-amber-300 border-b border-slate-800 sticky top-0 font-bold">
                  <th className="p-2 border-r border-slate-800 text-center w-12">#</th>
                  <th className="p-2 border-r border-slate-800">১ম পাহারাদার (ব্যবসা • দোকান)</th>
                  <th className="p-2">২য় পাহারাদার (ব্যবসা • দোকান)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {parsedPairs.map((pair, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60">
                    <td className="p-2 text-center text-amber-400 font-bold border-r border-slate-800">
                      {pair.serialNo}
                    </td>
                    <td className="p-2 border-r border-slate-800 text-slate-200">
                      <strong className="text-white">{pair.guard1Name}</strong>{' '}
                      <span className="text-slate-400">({pair.guard1BusinessType}{pair.guard1ShopNo ? ` • #${pair.guard1ShopNo}` : ''})</span>
                    </td>
                    <td className="p-2 text-slate-200">
                      <strong className="text-white">{pair.guard2Name}</strong>{' '}
                      <span className="text-slate-400">({pair.guard2BusinessType}{pair.guard2ShopNo ? ` • #${pair.guard2ShopNo}` : ''})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={handleResetToOfficial}
          disabled={!isCustomActive && !csvInput}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>ডিফল্ট অফিশিয়াল রোস্টারে ফেরত যান</span>
        </button>

        <button
          type="button"
          onClick={handleSaveToRoster}
          disabled={parsedPairs.length === 0}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer border border-emerald-400"
        >
          <Save className="w-4 h-4" />
          <span>💾 ডাইনামিক রোস্টার সেভ ও আপডেট করুন ({parsedPairs.length}টি)</span>
        </button>
      </div>
    </div>
  );
};
