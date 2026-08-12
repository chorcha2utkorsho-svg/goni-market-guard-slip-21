import { RosterPair } from '../types';

// Explicit mapping for Round 2 ending entries (August 5 - August 13, 2026) provided by user
export const ROUND_2_EXPLICIT_ROSTER: Record<string, RosterPair & { roundNumber: number }> = {
  '2026-08-05': { serialNo: 27, guard1Name: 'হাসেন', guard1BusinessType: 'ফার্নিচার', guard2Name: 'আলামিন', guard2BusinessType: 'মুদির', baseDateRound1: '2026-08-05', roundNumber: 2 },
  '2026-08-06': { serialNo: 28, guard1Name: 'মানিক', guard1BusinessType: 'কাঁচামাল', guard2Name: 'বোরহান', guard2BusinessType: 'কাঁচামাল', baseDateRound1: '2026-08-06', roundNumber: 2 },
  '2026-08-07': { serialNo: 29, guard1Name: 'কাউসার', guard1BusinessType: 'কাঁচামাল', guard2Name: 'হাবিজুদ্দিন', guard2BusinessType: 'কাঁচামাল', baseDateRound1: '2026-08-07', roundNumber: 2 },
  '2026-08-08': { serialNo: 30, guard1Name: 'মাহতাব', guard1BusinessType: 'কাঁচামাল', guard2Name: 'মাসাদ', guard2BusinessType: 'চা', baseDateRound1: '2026-08-08', roundNumber: 2 },
  '2026-08-09': { serialNo: 31, guard1Name: 'তারেক', guard1BusinessType: 'মুদি', guard2Name: 'ফিরোজ', guard2BusinessType: 'সেলুন', baseDateRound1: '2026-08-09', roundNumber: 2 },
  '2026-08-10': { serialNo: 32, guard1Name: 'হাবুল্লাহ', guard1BusinessType: 'মুদী', guard2Name: '', guard2BusinessType: 'গোস্ত', baseDateRound1: '2026-08-10', roundNumber: 2 },
  '2026-08-11': { serialNo: 33, guard1Name: 'আনার', guard1BusinessType: 'মুদী', guard2Name: 'বাশার', guard2BusinessType: 'ফার্মেসী', baseDateRound1: '2026-08-11', roundNumber: 2 },
  '2026-08-12': { serialNo: 34, guard1Name: 'আলম', guard1BusinessType: 'ভাঙারি', guard2Name: 'দিদার', guard2BusinessType: 'ডেকোরেটর', baseDateRound1: '2026-08-12', roundNumber: 2 },
  '2026-08-13': { serialNo: 35, guard1Name: 'জয়নাল', guard1BusinessType: 'ফার্নিচার', guard2Name: 'রিয়াজ উদ্দিন', guard2BusinessType: 'সার ডিলার', baseDateRound1: '2026-08-13', roundNumber: 2 },
};

/**
 * OFFICIAL FINALIZED ROSTER (35 PAIRS / 35 DAYS PER ROUND)
 * Includes Shop/Stall numbers (দোকান নং) and finalized calendar sequence for Rounds 3, 4, 5, 6 onwards.
 * Round 3: Aug 18, 2026 - Sep 21, 2026
 * Round 4: Sep 22, 2026 - Oct 26, 2026
 * Round 5: Oct 27, 2026 - Nov 30, 2026
 * Round 6: Dec 01, 2026 - Jan 04, 2027
 */
export const OFFICIAL_ROSTER_PAIRS: RosterPair[] = [
  { serialNo: 1, guard1Name: 'খোরশেদ', guard1BusinessType: 'ওয়ার্কশপ', guard1ShopNo: '', guard2Name: 'কাজল', guard2BusinessType: 'হোটেল', guard2ShopNo: '64', baseDateRound1: '2026-08-18' },
  { serialNo: 2, guard1Name: 'মাহফুজ', guard1BusinessType: 'ফার্নিচার', guard1ShopNo: '', guard2Name: 'অনুকুল', guard2BusinessType: 'জুয়েলারী', guard2ShopNo: '63', baseDateRound1: '2026-08-19' },
  { serialNo: 3, guard1Name: 'কামাল', guard1BusinessType: 'ফার্নিচার', guard1ShopNo: '', guard2Name: 'রেডোয়ান', guard2BusinessType: 'কম্পিউটার', guard2ShopNo: '62', baseDateRound1: '2026-08-20' },
  { serialNo: 4, guard1Name: 'বোরহান', guard1BusinessType: 'টেইলার', guard1ShopNo: '', guard2Name: 'হারুন', guard2BusinessType: 'অফিস', guard2ShopNo: '61', baseDateRound1: '2026-08-21' },
  { serialNo: 5, guard1Name: 'রঞ্জন', guard1BusinessType: 'ফার্মেসী', guard1ShopNo: '', guard2Name: 'হান্নান', guard2BusinessType: 'বেডিং', guard2ShopNo: '60', baseDateRound1: '2026-08-22' },
  { serialNo: 6, guard1Name: 'স্বপন', guard1BusinessType: 'টেইলার', guard1ShopNo: '', guard2Name: 'দুই্যা', guard2BusinessType: 'সেলুন', guard2ShopNo: '59', baseDateRound1: '2026-08-23' },
  { serialNo: 7, guard1Name: 'সামসুল হুদা', guard1BusinessType: 'চাল', guard1ShopNo: '', guard2Name: 'এনামুল', guard2BusinessType: 'মুদী', guard2ShopNo: '58', baseDateRound1: '2026-08-24' },
  { serialNo: 8, guard1Name: 'বাবুল', guard1BusinessType: 'সেলুন', guard1ShopNo: '', guard2Name: 'ফারুক', guard2BusinessType: 'মুদী', guard2ShopNo: '57', baseDateRound1: '2026-08-25' },
  { serialNo: 9, guard1Name: 'মনির', guard1BusinessType: 'মুদী', guard1ShopNo: '', guard2Name: 'আলামিন', guard2BusinessType: 'ফার্মেসী', guard2ShopNo: '56', baseDateRound1: '2026-08-26' },
  { serialNo: 10, guard1Name: 'রিপন', guard1BusinessType: 'গোডাউন', guard1ShopNo: '', guard2Name: 'রতন', guard2BusinessType: 'ফল', guard2ShopNo: '55', baseDateRound1: '2026-08-27' },
  { serialNo: 11, guard1Name: 'সাইফুল', guard1BusinessType: 'ভেটেরিনারী', guard1ShopNo: '', guard2Name: 'শাহাদাৎ', guard2BusinessType: 'ফার্নিচার', guard2ShopNo: '54', baseDateRound1: '2026-08-28' },
  { serialNo: 12, guard1Name: 'শাকিল', guard1BusinessType: 'মেকার', guard1ShopNo: '', guard2Name: 'শামীম', guard2BusinessType: 'মুদী', guard2ShopNo: '53', baseDateRound1: '2026-08-29' },
  { serialNo: 13, guard1Name: 'শাহাদত', guard1BusinessType: 'ইলেকট্রিক', guard1ShopNo: '', guard2Name: 'বিল্লাল', guard2BusinessType: 'মুদী', guard2ShopNo: '52', baseDateRound1: '2026-08-30' },
  { serialNo: 14, guard1Name: 'ডা: বিল্লাল', guard1BusinessType: 'ফার্মেসী', guard1ShopNo: '', guard2Name: 'রয়েল', guard2BusinessType: 'মুদী', guard2ShopNo: '51', baseDateRound1: '2026-08-31' },
  { serialNo: 15, guard1Name: 'মিলন প্রধান', guard1BusinessType: 'রডসিমেন্ট', guard1ShopNo: '', guard2Name: 'হিরন', guard2BusinessType: 'ব্রয়লার', guard2ShopNo: '50', baseDateRound1: '2026-09-01' },
  { serialNo: 16, guard1Name: 'রবি', guard1BusinessType: 'জুতা', guard1ShopNo: '', guard2Name: 'মিজান', guard2BusinessType: 'চাল', guard2ShopNo: '49', baseDateRound1: '2026-09-02' },
  { serialNo: 17, guard1Name: 'সোয়ায়েব', guard1BusinessType: 'চা', guard1ShopNo: '', guard2Name: 'ফাইজ উদ্দিন', guard2BusinessType: 'ব্রয়লার', guard2ShopNo: '48', baseDateRound1: '2026-09-03' },
  { serialNo: 18, guard1Name: 'ইউসুফ', guard1BusinessType: 'মুদী', guard1ShopNo: '', guard2Name: 'রুবেল ডাক্তার', guard2BusinessType: 'ফার্মেসী', guard2ShopNo: '47', baseDateRound1: '2026-09-04' },
  { serialNo: 19, guard1Name: 'আবু হোসেন', guard1BusinessType: 'মেকার', guard1ShopNo: '', guard2Name: 'রতন মেকার', guard2BusinessType: 'পান সুপারী', guard2ShopNo: '46', baseDateRound1: '2026-09-05' },
  { serialNo: 20, guard1Name: 'ফারুক অটো মেকার', guard1BusinessType: 'অটো মেকার', guard1ShopNo: '', guard2Name: 'কাউসার', guard2BusinessType: 'কাঁচামাল', guard2ShopNo: '45', baseDateRound1: '2026-09-06' },
  { serialNo: 21, guard1Name: 'শফিকুল', guard1BusinessType: 'মিষ্টি', guard1ShopNo: '', guard2Name: 'সেলিম', guard2BusinessType: 'মিষ্টি', guard2ShopNo: '44', baseDateRound1: '2026-09-07' },
  { serialNo: 22, guard1Name: 'আরিফ', guard1BusinessType: 'কম্পিউটার', guard1ShopNo: '', guard2Name: 'জয়নাল', guard2BusinessType: 'ফার্নিচার', guard2ShopNo: '43', baseDateRound1: '2026-09-08' },
  { serialNo: 23, guard1Name: 'সালাম', guard1BusinessType: 'মুদীর', guard1ShopNo: '', guard2Name: 'বকুল', guard2BusinessType: 'কাঁচামাল', guard2ShopNo: '65', baseDateRound1: '2026-09-09' },
  { serialNo: 24, guard1Name: 'সবুজ', guard1BusinessType: 'সেলুন', guard1ShopNo: '', guard2Name: 'কাউছার', guard2BusinessType: 'কাঁচামাল', guard2ShopNo: '66', baseDateRound1: '2026-09-10' },
  { serialNo: 25, guard1Name: 'জসী', guard1BusinessType: 'মুদী', guard1ShopNo: '', guard2Name: 'মানিক', guard2BusinessType: 'কাঁচামাল', guard2ShopNo: '67', baseDateRound1: '2026-09-11' },
  { serialNo: 26, guard1Name: 'মাসুম বিল্লাহ্', guard1BusinessType: 'মোবাইল সার্ভিস', guard1ShopNo: '', guard2Name: 'বোরহান', guard2BusinessType: 'কাঁচামাল', guard2ShopNo: '68', baseDateRound1: '2026-09-12' },
  { serialNo: 27, guard1Name: 'মনির', guard1BusinessType: 'হোটেল', guard1ShopNo: '', guard2Name: 'হাবিজ উদ্দিন', guard2BusinessType: 'কাঁচামাল', guard2ShopNo: '69', baseDateRound1: '2026-09-13' },
  { serialNo: 28, guard1Name: 'ফজলু', guard1BusinessType: 'কলা', guard1ShopNo: '', guard2Name: 'মাহতাব', guard2BusinessType: 'কাঁচামাল', guard2ShopNo: '70', baseDateRound1: '2026-09-14' },
  { serialNo: 29, guard1Name: 'প্রিন্স', guard1BusinessType: 'কম্পিউটার', guard1ShopNo: '', guard2Name: 'গোস্ত', guard2BusinessType: 'গোস্ত', guard2ShopNo: '71', baseDateRound1: '2026-09-15' },
  { serialNo: 30, guard1Name: 'শাকিল', guard1BusinessType: 'হোটেল', guard1ShopNo: '', guard2Name: 'রিয়াজ উদ্দিন', guard2BusinessType: 'সার ডিলার', guard2ShopNo: '42', baseDateRound1: '2026-09-16' },
  { serialNo: 31, guard1Name: 'হাসেন', guard1BusinessType: 'ফার্নিচার', guard1ShopNo: '', guard2Name: 'দিদার', guard2BusinessType: 'ডেকোরেটর', guard2ShopNo: '41', baseDateRound1: '2026-09-17' },
  { serialNo: 32, guard1Name: 'আলামিন', guard1BusinessType: 'মুদীর', guard1ShopNo: '', guard2Name: 'আলামিন', guard2BusinessType: 'মুড়ি', guard2ShopNo: '40', baseDateRound1: '2026-09-18' },
  { serialNo: 33, guard1Name: 'তারেক', guard1BusinessType: 'মুদী', guard1ShopNo: '', guard2Name: 'আলম', guard2BusinessType: 'ভাঙারী', guard2ShopNo: '39', baseDateRound1: '2026-09-19' },
  { serialNo: 34, guard1Name: 'ফিরোজ', guard1BusinessType: 'সেলুন', guard1ShopNo: '', guard2Name: 'আনার', guard2BusinessType: 'মুদী', guard2ShopNo: '38', baseDateRound1: '2026-09-20' },
  { serialNo: 35, guard1Name: 'হাবুল্লা', guard1BusinessType: 'মুদী', guard1ShopNo: '', guard2Name: 'বাশার', guard2BusinessType: 'ফার্মেসী', guard2ShopNo: '37', baseDateRound1: '2026-09-21' },
];

const CYCLE_LENGTH = 35; // 35 days per full round
// Round 3 starts on 2026-08-18 (as per official schedule), so Round 1 started 70 days earlier on 2026-06-09
const ROUND_1_START = new Date('2026-06-09T00:00:00');

/**
 * Calculates the exact YYYY-MM-DD date for a given serial number (1-35) and round number (1, 2, 3...)
 */
export function getDateForPairAndRound(serialNo: number, roundNumber: number): string {
  const dayIndex = serialNo - 1; // 0-based
  const totalDaysOffset = (roundNumber - 1) * CYCLE_LENGTH + dayIndex;
  
  const targetDate = new Date(ROUND_1_START);
  targetDate.setDate(targetDate.getDate() + totalDaysOffset);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Given any YYYY-MM-DD date string, calculates which pair (1-35) and round number (1, 2, 3...) is scheduled.
 */
export function getScheduledPairForDate(dateString: string): {
  pair: RosterPair;
  roundNumber: number;
  serialNo: number;
} {
  if (!dateString) {
    return {
      pair: OFFICIAL_ROSTER_PAIRS[0],
      roundNumber: 1,
      serialNo: 1,
    };
  }

  // Check explicit Round 2 override map first
  if (ROUND_2_EXPLICIT_ROSTER[dateString]) {
    const explicit = ROUND_2_EXPLICIT_ROSTER[dateString];
    return {
      pair: {
        serialNo: explicit.serialNo,
        guard1Name: explicit.guard1Name,
        guard1BusinessType: explicit.guard1BusinessType,
        guard1ShopNo: explicit.guard1ShopNo || '',
        guard2Name: explicit.guard2Name,
        guard2BusinessType: explicit.guard2BusinessType,
        guard2ShopNo: explicit.guard2ShopNo || '',
        baseDateRound1: explicit.baseDateRound1,
      },
      roundNumber: explicit.roundNumber,
      serialNo: explicit.serialNo,
    };
  }

  // Parse YYYY-MM-DD reliably without UTC shift
  const [y, m, d] = dateString.split('-').map((v) => parseInt(v, 10));
  const targetDate = new Date(y, m - 1, d, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - ROUND_1_START.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays)) {
    return {
      pair: OFFICIAL_ROSTER_PAIRS[0],
      roundNumber: 1,
      serialNo: 1,
    };
  }

  let adjustedDiff = diffDays;
  if (adjustedDiff < 0) {
    adjustedDiff = ((adjustedDiff % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;
  }

  const roundNumber = Math.floor(adjustedDiff / CYCLE_LENGTH) + 1;
  const dayIndex = adjustedDiff % CYCLE_LENGTH;
  const serialNo = dayIndex + 1;
  const pair = OFFICIAL_ROSTER_PAIRS[dayIndex] || OFFICIAL_ROSTER_PAIRS[0];

  return {
    pair,
    roundNumber,
    serialNo,
  };
}

export interface UpcomingDutyDate {
  dateStr: string;
  formattedDate: string;
  roundNumber: number;
  serialNo: number;
  partnerName: string;
  partnerShopNo: string;
}

/**
 * Calculates the next 5 upcoming security duty dates for a given merchant/shop number or name.
 */
export function getUpcomingDutiesForMerchant(
  shopNo: string,
  ownerName: string
): UpcomingDutyDate[] {
  const upcoming: UpcomingDutyDate[] = [];

  const cleanShop = (shopNo || '').trim();
  const cleanOwner = (ownerName || '').trim();

  // Find matching pair in OFFICIAL_ROSTER_PAIRS
  const matchedPair = OFFICIAL_ROSTER_PAIRS.find((p) => {
    const s1Matches = cleanShop && p.guard1ShopNo && p.guard1ShopNo.trim() === cleanShop;
    const s2Matches = cleanShop && p.guard2ShopNo && p.guard2ShopNo.trim() === cleanShop;
    const name1Matches = cleanOwner && p.guard1Name.toLowerCase().includes(cleanOwner.toLowerCase());
    const name2Matches = cleanOwner && p.guard2Name.toLowerCase().includes(cleanOwner.toLowerCase());
    return s1Matches || s2Matches || name1Matches || name2Matches;
  });

  const pairToUse = matchedPair || OFFICIAL_ROSTER_PAIRS[0];

  const isGuard1 =
    (pairToUse.guard1ShopNo && pairToUse.guard1ShopNo.trim() === cleanShop) ||
    (cleanOwner && pairToUse.guard1Name.toLowerCase().includes(cleanOwner.toLowerCase()));

  const partnerName = isGuard1 ? pairToUse.guard2Name : pairToUse.guard1Name;
  const partnerShopNo = isGuard1 ? pairToUse.guard2ShopNo || '' : pairToUse.guard1ShopNo || '';

  const todayStr = new Date().toISOString().split('T')[0];

  // Search through current & future rounds (Round 3 to Round 9)
  for (let r = 3; r <= 9; r++) {
    const dStr = getDateForPairAndRound(pairToUse.serialNo, r);
    if (dStr >= todayStr || upcoming.length === 0) {
      // Simple Bangla date formatter helper call or ISO parse
      const [y, m, d] = dStr.split('-');
      const monthNames = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
      ];
      const mBengali = monthNames[parseInt(m, 10) - 1] || m;
      const formattedDate = `${d} ${mBengali} ${y}`;

      upcoming.push({
        dateStr: dStr,
        formattedDate,
        roundNumber: r,
        serialNo: pairToUse.serialNo,
        partnerName: partnerName || 'নির্ধারিত সঙ্গী',
        partnerShopNo: partnerShopNo ? `দোকান #${partnerShopNo}` : '',
      });
    }
    if (upcoming.length >= 5) break;
  }

  return upcoming;
}
