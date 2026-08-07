/// <reference types="vite/client" />
import { SavedSlipRecord } from '../types';

// Environment variables for Supabase in Vercel / Vite
const env = (import.meta as any).env || {};
const SUPABASE_URL = env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || '';

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/**
 * Fetch saved slips from Supabase
 */
export async function fetchSlipsFromSupabase(): Promise<SavedSlipRecord[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/guard_slips?select=*&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      console.warn('Supabase fetch failed:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.map((item: any) => ({
      id: item.id,
      serialNumber: item.serial_number,
      guard1Name: item.guard1_name,
      guard1BusinessType: item.guard1_business_type || '',
      guard1ShopNo: item.guard1_shop_no || '',
      guard2Name: item.guard2_name,
      guard2BusinessType: item.guard2_business_type || '',
      guard2ShopNo: item.guard2_shop_no || '',
      dutyDate: item.duty_date,
      dutyDayName: item.duty_day_name || '',
      roundNumber: item.round_number || 1,
      mobileNumber: item.mobile_number || '',
      qrCodeUrl: item.qr_code_url || '',
      customInstruction: item.custom_instruction || '',
      createdAt: item.created_at,
    }));
  } catch (err) {
    console.error('Error fetching from Supabase:', err);
    return null;
  }
}

/**
 * Save a slip record to Supabase
 */
export async function saveSlipToSupabase(record: SavedSlipRecord): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const payload = {
      serial_number: record.serialNumber,
      guard1_name: record.guard1Name,
      guard1_business_type: record.guard1BusinessType,
      guard1_shop_no: record.guard1ShopNo,
      guard2_name: record.guard2Name,
      guard2_business_type: record.guard2BusinessType,
      guard2_shop_no: record.guard2ShopNo,
      duty_date: record.dutyDate,
      duty_day_name: record.dutyDayName,
      round_number: record.roundNumber,
      mobile_number: record.mobileNumber,
      qr_code_url: record.qrCodeUrl,
      custom_instruction: record.customInstruction,
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/guard_slips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (err) {
    console.error('Error saving to Supabase:', err);
    return false;
  }
}
