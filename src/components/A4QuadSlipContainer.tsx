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
        backgroundColor: '#ffffff',
        color: '#0f172a',
      }}
    >
      {/* ================= TOP HALF (DAY 1: 2 SLIPS - 148.5mm HEIGHT) ================= */}
      <div className="w-[210mm] h-[148.5mm] flex relative border-b-2 border-dashed border-amber-600/70" style={{ backgroundColor: '#ffffff' }}>
        {/* Day 1 Label Badge (screen only) - Centered over divider axis */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 bg-amber-600 text-white font-bold text-[8px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase opacity-95 no-print">
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
        <div className="relative w-0 h-full border-r border-dashed border-neutral-400 z-10 flex flex-col justify-between items-center py-1 -ml-[0.5px]">
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-2.5 h-2.5 rotate-90" />
          </div>
          <div
            className="text-[7.5px] text-neutral-400 font-mono tracking-widest uppercase select-none opacity-80 whitespace-nowrap bg-white px-0.5 my-auto"
            style={{ writingMode: 'vertical-lr' }}
          >
            ✂️ এখান থেকে কাটুন ✂️
          </div>
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-2.5 h-2.5 -rotate-90" />
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

      {/* ================= BOTTOM HALF (DAY 2: 2 SLIPS - 148.5mm HEIGHT) ================= */}
      <div className="w-[210mm] h-[148.5mm] flex relative bg-white" style={{ backgroundColor: '#ffffff' }}>
        {/* Day 2 Label Badge (screen only) - Centered over divider axis */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 bg-sky-600 text-white font-bold text-[8px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase opacity-95 no-print">
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
        <div className="relative w-0 h-full border-r border-dashed border-neutral-400 z-10 flex flex-col justify-between items-center py-1 -ml-[0.5px]">
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-2.5 h-2.5 rotate-90" />
          </div>
          <div
            className="text-[7.5px] text-neutral-400 font-mono tracking-widest uppercase select-none opacity-80 whitespace-nowrap bg-white px-0.5 my-auto"
            style={{ writingMode: 'vertical-lr' }}
          >
            ✂️ এখান থেকে কাটুন ✂️
          </div>
          <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
            <Scissors className="w-2.5 h-2.5 -rotate-90" />
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
