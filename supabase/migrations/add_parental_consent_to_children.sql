-- Add parental consent tracking to children table
ALTER TABLE children 
ADD COLUMN IF NOT EXISTS parental_consent_given BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS parental_consent_timestamp TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS parental_consent_ip TEXT;

-- Update existing records to have consent (retroactive - assumes existing children have consent)
UPDATE children 
SET parental_consent_given = true, 
    parental_consent_timestamp = created_at 
WHERE parental_consent_given IS NULL OR parental_consent_given = false;

-- Comment on columns
COMMENT ON COLUMN children.parental_consent_given IS 'Parental/guardian consent for processing child data under GDPR';
COMMENT ON COLUMN children.parental_consent_timestamp IS 'When parental consent was given';
COMMENT ON COLUMN children.parental_consent_ip IS 'IP address when consent was given (for audit trail)';

