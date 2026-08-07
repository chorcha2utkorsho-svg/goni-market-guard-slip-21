export interface GuardPreset {
  id: string;
  name: string;
  phone?: string;
  badgeId?: string;
}

export interface GuardDetail {
  name: string;
  businessType: string;
  shopNo?: string;
  phone?: string;
}

export interface GuardDutySlipInput {
  // Guard 1
  guard1Name: string;
  guard1BusinessType: string;
  guard1ShopNo: string;

  // Guard 2
  guard2Name: string;
  guard2BusinessType: string;
  guard2ShopNo: string;

  // Duty Meta
  dutyDate: string; // YYYY-MM-DD
  dutyDayName?: string; // e.g. "মঙ্গলবার"
  roundNumber: number; // e.g. 1, 2, 3...
  serialIndex?: number; // 1 to 35 from roster

  // Common
  mobileNumber: string;
  qrCodeUrl: string;
  dutyTimeText?: string; // Default: "রাত ১০টা থেকে সকাল ৬টা"
  customInstruction?: string;
  marketName?: string;
  theme?: 'classic' | 'navy' | 'emerald';
  useBengaliNumerals?: boolean;
}

export interface SavedSlipRecord extends GuardDutySlipInput {
  id: string;
  createdAt: string;
  serialNumber: string;
}

export interface RosterPair {
  serialNo: number; // 1 to 35
  guard1Name: string;
  guard1BusinessType: string;
  guard2Name: string;
  guard2BusinessType: string;
  baseDateRound1: string; // "2026-08-18"
}

