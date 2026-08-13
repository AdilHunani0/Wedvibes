-- 002_rls_policies.sql
-- Run this AFTER 001_initial_schema.sql

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_plans ENABLE ROW LEVEL SECURITY;

-- FUNCTION to check admin status without causing infinite recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
DECLARE
  _is_admin boolean;
BEGIN
  SELECT role = 'admin' INTO _is_admin
  FROM profiles
  WHERE id = auth.uid();
  RETURN coalesce(_is_admin, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- PROFILES
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR ALL
  USING ( is_admin() );

-- TEMPLATES
CREATE POLICY "Anyone can read active templates"
  ON templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins manage templates"
  ON templates FOR ALL
  USING ( is_admin() );

-- ORDERS
CREATE POLICY "Users see own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Card URLs are public"
  ON orders FOR SELECT
  USING (card_url IS NOT NULL AND status = 'delivered');

CREATE POLICY "Admins see all orders"
  ON orders FOR ALL
  USING ( is_admin() );

-- CUSTOMIZATIONS
CREATE POLICY "Users see own customizations"
  ON customizations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = customizations.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users insert own customizations"
  ON customizations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins see all customizations"
  ON customizations FOR ALL
  USING ( is_admin() );

-- CREDIT PLANS
CREATE POLICY "Anyone can read active plans"
  ON credit_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins manage credit plans"
  ON credit_plans FOR ALL
  USING ( is_admin() );

-- CREDIT TRANSACTIONS
CREATE POLICY "Users see own transactions"
  ON credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins see all transactions"
  ON credit_transactions FOR ALL
  USING ( is_admin() );
