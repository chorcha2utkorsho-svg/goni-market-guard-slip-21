// Bengali number dictionary
const BENGALI_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const BENGALI_DAYS = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

/**
 * Converts English numbers/digits in a string or number to Bengali digits.
 */
export function toBengaliNumerals(input: string | number | undefined | null): string {
  if (input === undefined || input === null) return '';
  const str = String(input);
  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
}

/**
 * Returns tomorrow's date as YYYY-MM-DD
 */
export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns today's date as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a YYYY-MM-DD string into Bengali long date format e.g. "০৭ আগস্ট, ২০২৬ (শুক্রবার)"
 */
export function formatBengaliFullDate(dateString: string, includeDayName = true): string {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const year = parseInt(parts[0], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const dateObj = new Date(year, monthIndex, day);
  const dayName = BENGALI_DAYS[dateObj.getDay()];
  const monthName = BENGALI_MONTHS[monthIndex] || '';

  const bnDay = toBengaliNumerals(day.toString().padStart(2, '0'));
  const bnYear = toBengaliNumerals(year.toString());

  if (includeDayName) {
    return `${bnDay} ${monthName}, ${bnYear} (${dayName})`;
  }
  return `${bnDay} ${monthName}, ${bnYear}`;
}

/**
 * Formats YYYY-MM-DD as short Bengali date: "০৭/০৮/২০২৬"
 */
export function formatBengaliShortDate(dateString: string): string {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const [year, month, day] = parts;
  return `${toBengaliNumerals(day)}/${toBengaliNumerals(month)}/${toBengaliNumerals(year)}`;
}

/**
 * Generates a serial slip ID like "GM-2026-0042"
 */
export function generateSlipSerial(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `GMS-${year}-${randomNum}`;
}
