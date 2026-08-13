import React from 'react';
import { Scissors } from 'lucide-react';
import { SlipTemplate } from './SlipTemplate';
import { GuardDutySlipInput } from '../types';

interface A5DualSlipContainerProps {
  data: GuardDutySlipInput;
  id?: string;
  serialNumber?: string;
  onVerifyClick?: () => void;
}

export const A5DualSlipContainer: React.FC<A5DualSlipContainerProps> = ({
  data,
  id = 'a5-dual-slip-container',
  serialNumber = 'GMS-2026-001',
  onVerifyClick,
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
      {/* Left Slip (1st Partner Copy) */}
      <div className="w-[105mm] h-[148mm] p-1.5 box-border">
        <SlipTemplate
          data={data}
          slipNumber={serialNumber}
          copyLabel="১ম পাহারাদারের কপি (১ম পার্টনার)"
          onVerifyClick={onVerifyClick}
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

      {/* Right Slip (2nd Partner Copy) */}
      <div className="w-[105mm] h-[148mm] p-1.5 box-border">
        <SlipTemplate
          data={data}
          slipNumber={`${serialNumber}-B`}
          copyLabel="২য় পাহারাদারের কপি (২য় পার্টনার)"
          onVerifyClick={onVerifyClick}
        />
      </div>
    </div>
  );
};
