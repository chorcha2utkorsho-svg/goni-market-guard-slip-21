-- ======================================================
-- Goni Market Night Guard Duty Slip Database Schema
-- Supabase SQL Migration
-- ======================================================

-- 1. Create Guard Slips History Table
CREATE TABLE IF NOT EXISTS public.guard_slips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_number VARCHAR(50) NOT NULL,
    guard1_name VARCHAR(255) NOT NULL,
    guard1_business_type VARCHAR(255),
    guard1_shop_no VARCHAR(100),
    guard2_name VARCHAR(255) NOT NULL,
    guard2_business_type VARCHAR(255),
    guard2_shop_no VARCHAR(100),
    duty_date DATE NOT NULL,
    duty_day_name VARCHAR(100),
    round_number INT DEFAULT 1,
    mobile_number VARCHAR(50),
    qr_code_url TEXT,
    custom_instruction TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.guard_slips ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if present to prevent duplicates
DROP POLICY IF EXISTS "Allow public read guard_slips" ON public.guard_slips;
DROP POLICY IF EXISTS "Allow public insert guard_slips" ON public.guard_slips;
DROP POLICY IF EXISTS "Allow public delete guard_slips" ON public.guard_slips;

-- Allow public read & write
CREATE POLICY "Allow public read guard_slips" ON public.guard_slips
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert guard_slips" ON public.guard_slips
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete guard_slips" ON public.guard_slips
    FOR DELETE USING (true);

-- 2. Create Official 35-Pair Roster Schedule Table
CREATE TABLE IF NOT EXISTS public.roster_schedule (
    serial_no INT PRIMARY KEY,
    guard1_name VARCHAR(255) NOT NULL,
    guard1_business_type VARCHAR(255),
    guard2_name VARCHAR(255) NOT NULL,
    guard2_business_type VARCHAR(255),
    base_date_round1 DATE DEFAULT '2026-08-18'
);

ALTER TABLE public.roster_schedule ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read roster_schedule" ON public.roster_schedule;

CREATE POLICY "Allow public read roster_schedule" ON public.roster_schedule
    FOR SELECT USING (true);
