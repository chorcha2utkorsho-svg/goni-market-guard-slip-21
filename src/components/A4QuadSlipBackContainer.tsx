import React from 'react';
import { Scissors } from 'lucide-react';
import { SlipBackTemplate } from './SlipBackTemplate';
import { GuardDutySlipInput } from '../types';

interface A4QuadSlipBackContainerProps {
  dataDay1: GuardDutySlipInput;
  dataDay2?: GuardDutySlipInput;
  id?: string;
  serialNumberDay1?: string;
  serialNumberDay2?: string;
}

export const A4QuadSlipBackContainer: React.FC<A4QuadSlipBackContainerProps> = ({
  dataDay1,
  dataDay2: customDataDay2,
  id = 'a4-quad-slip-back-container',
  serialNumberDay1 = 'GMS-2026-001',
  serialNumberDay2 = 'GMS-2026-002',
}) => {
  const dataDay2 = customDataDay2 || dataDay1;

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
      {/* ================= TOP HALF (DAY 1: 2 SLIP BACKS - 148.5mm HEIGHT) ================= */}
      <div className="w-[210mm] h-[148.5mm] flex relative border-b-2 border-dashed border-amber-600/70" style={{ backgroundColor: '#ffffff' }}>
        {/* Day 1 Label Badge (screen only) */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 bg-amber-600 text-white font-bold text-[8px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase opacity-95 no-print">
          ১ম দিন — উল্টোপিঠ (Day 1 Back)
        </div>

        {/* Day 1 1st Partner Copy Back */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipBackTemplate
            data={dataDay1}
            slipNumber={serialNumberDay1}
            copyLabel="১ম পাহারাদারের উল্টোপিঠ (১ম পার্টনার)"
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

        {/* Day 1 2nd Partner Copy Back */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipBackTemplate
            data={dataDay1}
            slipNumber={`${serialNumberDay1}-B`}
            copyLabel="২য় পাহারাদারের উল্টোপিঠ (২য় পার্টনার)"
          />
        </div>
      </div>

      {/* ================= BOTTOM HALF (DAY 2: 2 SLIP BACKS - 148.5mm HEIGHT) ================= */}
      <div className="w-[210mm] h-[148.5mm] flex relative bg-white" style={{ backgroundColor: '#ffffff' }}>
        {/* Day 2 Label Badge (screen only) */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 bg-sky-600 text-white font-bold text-[8px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase opacity-95 no-print">
          ২য় দিন — উল্টোপিঠ (Day 2 Back)
        </div>

        {/* Day 2 1st Partner Copy Back */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipBackTemplate
            data={dataDay2}
            slipNumber={serialNumberDay2}
            copyLabel="১ম পাহারাদারের উল্টোপিঠ (১ম পার্টনার)"
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

        {/* Day 2 2nd Partner Copy Back */}
        <div className="w-[105mm] h-[148.5mm] p-1.5 box-border">
          <SlipBackTemplate
            data={dataDay2}
            slipNumber={`${serialNumberDay2}-B`}
            copyLabel="২য় পাহারাদারের উল্টোপিঠ (২য় পার্টনার)"
          />
        </div>
      </div>
    </div>
  );
};
