import React from 'react';
import { Scissors } from 'lucide-react';
import { SlipBackTemplate } from './SlipBackTemplate';
import { GuardDutySlipInput } from '../types';

interface A5DualSlipBackContainerProps {
  data: GuardDutySlipInput;
  id?: string;
  serialNumber?: string;
}

export const A5DualSlipBackContainer: React.FC<A5DualSlipBackContainerProps> = ({
  data,
  id = 'a5-dual-slip-back-container',
  serialNumber = 'GMS-2026-001',
}) => {
  return (
    <div
      id={id}
      className="print-page bg-white text-slate-900 border border-slate-300 shadow-xl relative mx-auto overflow-hidden flex select-none"
      style={{
        width: '210mm',
        height: '148mm',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        color: '#0f172a',
      }}
    >
      {/* Left Slip Back (1st Partner) */}
      <div className="w-[105mm] h-[148mm] p-1.5 box-border">
        <SlipBackTemplate
          data={data}
          slipNumber={serialNumber}
          copyLabel="১ম পাহারাদার কপি"
        />
      </div>

      {/* Center Cutting Divider Line */}
      <div className="relative w-0 h-full border-r border-dashed border-neutral-400 z-10 flex flex-col justify-between items-center py-2 -ml-[0.5px]">
        <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
          <Scissors className="w-3 h-3 rotate-90" />
        </div>
        <div
          className="text-[8px] text-neutral-400 font-mono tracking-widest uppercase select-none opacity-80 whitespace-nowrap bg-white px-0.5 my-auto"
          style={{ writingMode: 'vertical-lr' }}
        >
          ✂️ এখান থেকে কাটুন • CUT HERE ✂️
        </div>
        <div className="bg-white border border-neutral-300 p-0.5 rounded-full text-neutral-500 shadow-xs -mr-[0.5px]">
          <Scissors className="w-3 h-3 -rotate-90" />
        </div>
      </div>

      {/* Right Slip Back (2nd Partner) */}
      <div className="w-[105mm] h-[148mm] p-1.5 box-border">
        <SlipBackTemplate
          data={data}
          slipNumber={`${serialNumber}-B`}
          copyLabel="২য় পাহারাদার কপি"
        />
      </div>
    </div>
  );
};
