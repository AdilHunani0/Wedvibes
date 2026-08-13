-- 001_initial_schema.sql
-- Run this in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'planner', 'admin')),
  credits INTEGER NOT NULL DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('wedding', 'birthday', 'engagement', 'opening', 'anniversary')),
  tier TEXT NOT NULL CHECK (tier IN ('basic', 'standard', 'premium')),
  price INTEGER NOT NULL,
  credit_cost INTEGER NOT NULL,
  preview_image_url TEXT,
  html_file_path TEXT NOT NULL,
  thumbnail_video_url TEXT,
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  guest_email TEXT,
  template_id UUID NOT NULL REFERENCES templates(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'generating', 'delivered', 'failed')),
  payment_method TEXT CHECK (payment_method IN ('razorpay', 'credits')),
  amount_paid INTEGER,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  card_url TEXT UNIQUE,
  generated_card_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- customizations
CREATE TABLE customizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  person1_name TEXT,
  person2_name TEXT,
  event_date DATE,
  event_time TEXT,
  venue_name TEXT,
  venue_address TEXT,
  family_bride_father TEXT,
  family_bride_mother TEXT,
  family_groom_father TEXT,
  family_groom_mother TEXT,
  photo_urls TEXT[] DEFAULT '{}',
  extra_message TEXT,
  extra_fields JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- credit_plans
CREATE TABLE credit_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  basic_credits INTEGER NOT NULL DEFAULT 0,
  standard_credits INTEGER NOT NULL DEFAULT 0,
  premium_credits INTEGER NOT NULL DEFAULT 0,
  total_credits INTEGER GENERATED ALWAYS AS (basic_credits + (standard_credits * 2) + (premium_credits * 3)) STORED,
  price INTEGER NOT NULL,
  discount_percent INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- credit_transactions
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  type TEXT NOT NULL CHECK (type IN ('purchase', 'use', 'refund', 'bonus')),
  credits_delta INTEGER NOT NULL,
  order_id UUID REFERENCES orders(id),
  plan_id UUID REFERENCES credit_plans(id),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
