import React, { useState } from 'react';
import { X, Search, Trash2, Calendar, User, Phone, ArrowUpRight, History } from 'lucide-react';
import { SavedSlipRecord, GuardDutySlipInput } from '../types';
import { formatBengaliFullDate } from '../utils/bengaliUtils';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  historyRecords: SavedSlipRecord[];
  onSelectRecord: (record: SavedSlipRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  isOpen,
  onClose,
  historyRecords,
  onSelectRecord,
  onDeleteRecord,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredRecords = historyRecords.filter((record) => {
    const term = searchTerm.toLowerCase();
    return (
      (record.guard1Name && record.guard1Name.toLowerCase().includes(term)) ||
      (record.guard2Name && record.guard2Name.toLowerCase().includes(term)) ||
      record.dutyDate.includes(term) ||
      record.serialNumber.toLowerCase().includes(term) ||
      record.mobileNumber.includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 text-slate-100 shadow-2xl space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">সংরক্ষিত স্লিপ হিস্ট্রি (Saved Slips Log)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Clear All */}
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পাহারাদারের নাম, তারিখ বা ক্রমিক নম্বর দিয়ে খুঁজুন..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-amber-400"
            />
          </div>
          {historyRecords.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl transition cursor-pointer self-end"
            >
              সব মুছে ফেলুন
            </button>
          )}
        </div>

        {/* Records List */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            {searchTerm ? 'কোন তথ্য পাওয়া যায়নি।' : 'এখনো কোনো স্লিপ সংরক্ষণ করা হয়নি।'}
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">
                      {record.guard1Name} ({record.guard1BusinessType || 'ব্যবসায়ী'}) + {record.guard2Name} ({record.guard2BusinessType || 'ব্যবসায়ী'})
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                      রাউন্ড-{record.roundNumber || 1}
                    </span>
                    <span className="text-[10px] bg-slate-700 text-slate-300 font-mono px-1.5 py-0.2 rounded border border-slate-600">
                      #{record.serialNumber}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-amber-300/90 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {formatBengaliFullDate(record.dutyDate)}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {record.mobileNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onSelectRecord(record);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <span>প্রিভিউতে আনুন</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteRecord(record.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
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
