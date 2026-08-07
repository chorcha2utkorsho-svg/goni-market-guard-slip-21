import React, { useState } from 'react';
import { X, UserPlus, Trash2, Check, Shield, Phone, Tag } from 'lucide-react';
import { GuardPreset } from '../types';

interface PresetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  presets: GuardPreset[];
  onAddPreset: (preset: Omit<GuardPreset, 'id'>) => void;
  onDeletePreset: (id: string) => void;
  onSelectAndClose: (preset: GuardPreset) => void;
}

export const PresetManagerModal: React.FC<PresetManagerModalProps> = ({
  isOpen,
  onClose,
  presets,
  onAddPreset,
  onDeletePreset,
  onSelectAndClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [badgeId, setBadgeId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPreset({
      name: name.trim(),
      phone: phone.trim() || undefined,
      badgeId: badgeId.trim() || undefined,
    });
    setName('');
    setPhone('');
    setBadgeId('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 text-slate-100 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">পাহারাদারদের তালিকা (Goni Market Guards)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add New Guard Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <UserPlus className="w-4 h-4" />
            <span>নতুন পাহারাদার যুক্ত করুন:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                নাম <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: মো: আবুল কালাম"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1 font-medium">মোবাইল নম্বর (ঐচ্ছিক)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="যেমন: 01800000000"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-1">
            <input
              type="text"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              placeholder="ব্যাজ / আইডি (যেমন: G-05)"
              className="bg-slate-900 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 outline-none w-1/2"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-lg transition shadow-xs cursor-pointer"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>

        {/* Existing Guard Presets List */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            তালিকাভুক্ত পাহারাদারগণ ({presets.length} জন):
          </label>

          {presets.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              কোন পাহারাদারের নাম যুক্ত করা হয়নি।
            </div>
          ) : (
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-amber-300 flex items-center justify-center font-bold text-xs border border-slate-600">
                      {preset.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{preset.name}</span>
                        {preset.badgeId && (
                          <span className="text-[9px] bg-slate-700 text-amber-300 px-1.5 py-0.2 rounded border border-slate-600 font-mono">
                            {preset.badgeId}
                          </span>
                        )}
                      </div>
                      {preset.phone && (
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-slate-500" />
                          <span>{preset.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectAndClose(preset)}
                      className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>নির্বাচন</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeletePreset(preset.id)}
                      className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
