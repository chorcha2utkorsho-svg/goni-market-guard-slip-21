import React from 'react';
import { Scissors } from 'lucide-react';
import { SlipTemplate } from './SlipTemplate';
import { GuardDutySlipInput } from '../types';
import { getScheduledPairForDate } from '../data/rosterData';

interface A4QuadSlipContainerProps {
  dataDay1: GuardDutySlipInput;
  dataDay2?: GuardDutySlipInput;
  id?: string;
  serialNumberDay1?: string;
  serialNumberDay2?: string;
  onVerifyClick?: () => void;
}

export const A4QuadSlipContainer: React.FC<A4QuadSlipContainerProps> = ({
  dataDay1,
  dataDay2: customDataDay2,
  id = 'a4-quad-slip-container',
  serialNumberDay1 = 'GMS-2026-001',
  serialNumberDay2 = 'GMS-2026-002',
  onVerifyClick,
}) => {
  // If custom data for Day 2 is not provided, calculate automatically based on Day 1 date + 1
  const dataDay2 = React.useMemo(() => {
    if (customDataDay2) return customDataDay2;

    const day1Date = new Date(`${dataDay1.dutyDate}T00:00:00`);
    day1Date.setDate(day1Date.getDate() + 1);

    const year = day1Date.getFullYear();
    const month = String(day1Date.getMonth() + 1).padStart(2, '0');
    const day = String(day1Date.getDate()).padStart(2, '0');
    const day2DateStr = `${year}-${month}-${day}`;

    const sched2 = getScheduledPairForDate(day2DateStr);

    return {
      guard1Name: sched2.pair.guard1Name,
      guard1BusinessType: sched2.pair.guard1BusinessType,
      guard1ShopNo: dataDay1.guard1ShopNo || '',
      guard2Name: sched2.pair.guard2Name,
      guard2BusinessType: sched2.pair.guard2BusinessType,
      guard2ShopNo: dataDay1.guard2ShopNo || '',
      dutyDate: day2DateStr,
      roundNumber: sched2.roundNumber,
      serialIndex: sched2.serialNo,
      mobileNumber: dataDay1.mobileNumber,
      qrCodeUrl: dataDay1.qrCodeUrl,
      customInstruction: dataDay1.customInstruction,
      theme: dataDay1.theme,
      useBengaliNumerals: dataDay1.useBengaliNumerals,
    } as GuardDutySlipInput;
  }, [dataDay1, customDataDay2]);

  return (
    <div
      id={id}
      className="print-page print-a4 bg-white text-slate-900 border border-slate-300 shadow-2xl relative mx-auto overflow-hidden flex flex-col select-none"
      style={{
        width: '210mm',
        height: '297mm',
        boxSizing: 'border-box',
      }}
    >
      {/* ================= TOP HALF (DAY 1: 2 SLIPS - 148.5mm HEIGHT) ================= */}
      <div className="w-[210mm] h-[148.5mm] flex relative border-b border-dashed border-amber-600/70">
        {/* Day 1 Label Badge */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 bg-amber-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase opacity-90 no-print">
          ১ম দিন (Day 1)
        </div>

        {/* Day 1 1st Partner Copy */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipTemplate
            data={dataDay1}
            slipNumber={serialNumberDay1}
            copyLabel="১ম পাহারাদারের কপি (১ম পার্টনার)"
            onVerifyClick={onVerifyClick}
          />
        </div>

        {/* Center Vertical Divider Line */}
        <div className="relative w-0 h-full border-r border-dashed border-neutral-400 z-10 flex flex-col justify-between items-center py-2 -ml-[0.5px]">
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-3 h-3 rotate-90" />
          </div>
          <div className="writing-mode-vertical text-[8px] text-neutral-400 font-mono tracking-widest uppercase select-none opacity-80 whitespace-nowrap bg-white px-1 my-auto">
            ✂️ এখান থেকে কাটুন • CUT HERE ✂️
          </div>
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-3 h-3 -rotate-90" />
          </div>
        </div>

        {/* Day 1 2nd Partner Copy */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipTemplate
            data={dataDay1}
            slipNumber={`${serialNumberDay1}-B`}
            copyLabel="২য় পাহারাদারের কপি (২য় পার্টনার)"
            onVerifyClick={onVerifyClick}
          />
        </div>
      </div>

      {/* ================= HORIZONTAL MIDDLE CUT LINE (A4 CENTER CUT) ================= */}
      <div className="relative w-full h-0 z-30 flex items-center justify-between px-3 bg-neutral-100 -mt-[1px]">
        <div className="flex items-center gap-1 text-[8px] font-mono text-neutral-500 bg-white px-2 py-0.5 border border-dashed border-neutral-400 rounded-full shadow-2xs -mt-[9px]">
          <Scissors className="w-3 h-3 text-amber-600" />
          <span>✂️ ১ম ও ২য় দিনের মাঝখানের কর্তন রেখা (A4 Middle Cut - Zero Waste) ✂️</span>
        </div>
      </div>

      {/* ================= BOTTOM HALF (DAY 2: 2 SLIPS - 148.5mm HEIGHT) ================= */}
      <div className="w-[210mm] h-[148.5mm] flex relative bg-slate-50/20">
        {/* Day 2 Label Badge */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 bg-sky-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase opacity-90 no-print">
          ২য় দিন (Day 2)
        </div>

        {/* Day 2 1st Partner Copy */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipTemplate
            data={dataDay2}
            slipNumber={serialNumberDay2}
            copyLabel="১ম পাহারাদারের কপি (১ম পার্টনার)"
            onVerifyClick={onVerifyClick}
          />
        </div>

        {/* Center Vertical Divider Line */}
        <div className="relative w-0 h-full border-r border-dashed border-neutral-400 z-10 flex flex-col justify-between items-center py-2 -ml-[0.5px]">
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-3 h-3 rotate-90" />
          </div>
          <div className="writing-mode-vertical text-[8px] text-neutral-400 font-mono tracking-widest uppercase select-none opacity-80 whitespace-nowrap bg-white px-1 my-auto">
            ✂️ এখান থেকে কাটুন • CUT HERE ✂️
          </div>
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-3 h-3 -rotate-90" />
          </div>
        </div>

        {/* Day 2 2nd Partner Copy */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipTemplate
            data={dataDay2}
            slipNumber={`${serialNumberDay2}-B`}
            copyLabel="২য় পাহারাদারের কপি (২য় পার্টনার)"
            onVerifyClick={onVerifyClick}
          />
        </div>
      </div>
    </div>
  );
};
