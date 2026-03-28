-- Add referral_code column to website_leads for referral program
ALTER TABLE website_leads ADD COLUMN IF NOT EXISTS referral_code text;
CREATE UNIQUE INDEX IF NOT EXISTS website_leads_referral_code_idx ON website_leads (referral_code) WHERE referral_code IS NOT NULL;
