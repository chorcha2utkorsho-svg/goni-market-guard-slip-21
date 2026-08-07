import React from 'react';

// Code 39 Barcode Table: 9 elements (5 bars, 4 spaces alternating)
// 1 = wide (3x), 0 = narrow (1x)
const CODE39_PATTERNS: Record<string, string> = {
  '0': '000110100', '1': '100100001', '2': '001100001', '3': '101100000',
  '4': '000110001', '5': '100110000', '6': '001110000', '7': '000100101',
  '8': '100100100', '9': '001100100', 'A': '100001001', 'B': '001001001',
  'C': '101001000', 'D': '000011001', 'E': '100011000', 'F': '001011000',
  'G': '000001101', 'H': '100001100', 'I': '001001100', 'J': '000011100',
  'K': '100000011', 'L': '001000011', 'M': '101000010', 'N': '000010011',
  'O': '100010010', 'P': '001010010', 'Q': '000000111', 'R': '100000110',
  'S': '001000110', 'T': '000010110', 'U': '110000001', 'V': '011000001',
  'W': '111000000', 'X': '010010001', 'Y': '110010000', 'Z': '011010000',
  '-': '010000101', '.': '110000100', ' ': '011000100', '*': '010010100',
};

interface BarcodeSVGProps {
  value: string;
  height?: number;
  showText?: boolean;
  className?: string;
}

export const BarcodeSVG: React.FC<BarcodeSVGProps> = ({
  value,
  height = 24,
  showText = false,
  className = '',
}) => {
  const cleanValue = value.toUpperCase().replace(/[^A-Z0-9\-\. ]/g, '');
  const fullText = `*${cleanValue}*`;

  // Calculate widths
  const narrowWidth = 1;
  const wideWidth = 2.5;
  const quietZone = 10;

  let totalWidth = quietZone * 2;
  const rects: { x: number; width: number; fill: string }[] = [];

  let currentX = quietZone;

  for (let i = 0; i < fullText.length; i++) {
    const char = fullText[i];
    const pattern = CODE39_PATTERNS[char] || CODE39_PATTERNS['*'];

    for (let j = 0; j < pattern.length; j++) {
      const isBar = j % 2 === 0;
      const isWide = pattern[j] === '1';
      const width = isWide ? wideWidth : narrowWidth;

      if (isBar) {
        rects.push({
          x: currentX,
          width,
          fill: '#000000',
        });
      }
      currentX += width;
    }
    // Inter-character gap (narrow space)
    currentX += narrowWidth;
  }

  totalWidth = currentX + quietZone - narrowWidth;

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full h-auto max-h-[28px] overflow-visible"
        shapeRendering="crispEdges"
      >
        <rect width={totalWidth} height={height} fill="#ffffff" />
        {rects.map((r, idx) => (
          <rect
            key={idx}
            x={r.x}
            y={0}
            width={r.width}
            height={height}
            fill={r.fill}
          />
        ))}
      </svg>
      {showText && (
        <span className="text-[7.5px] font-mono text-slate-800 tracking-wider mt-0.5 leading-none">
          {cleanValue}
        </span>
      )}
    </div>
  );
};
