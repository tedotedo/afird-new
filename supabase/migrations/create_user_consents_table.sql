-- Create user_consents table to track cookie, medical disclaimer, and GDPR acceptances
CREATE TABLE IF NOT EXISTS user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('cookies', 'medical_disclaimer', 'gdpr')),
  accepted BOOLEAN NOT NULL DEFAULT true,
  accepted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_user_consents_user_id ON user_consents(user_id);
CREATE INDEX idx_user_consents_consent_type ON user_consents(consent_type);
CREATE INDEX idx_user_consents_user_consent ON user_consents(user_id, consent_type);

-- Enable Row Level Security
ALTER TABLE user_consents ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own consent records
CREATE POLICY "Users can read own consents"
  ON user_consents
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own consent records
CREATE POLICY "Users can insert own consents"
  ON user_consents
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own consent records
CREATE POLICY "Users can update own consents"
  ON user_consents
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_consents_updated_at
  BEFORE UPDATE ON user_consents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE user_consents IS 'Stores user consent records for cookies, medical disclaimers, and GDPR compliance';

