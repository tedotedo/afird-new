-- Add 'sip' to the success_level constraint for beverages
-- Run this in Supabase SQL Editor

ALTER TABLE food_milestones
DROP CONSTRAINT IF EXISTS food_milestones_success_level_check;

ALTER TABLE food_milestones
ADD CONSTRAINT food_milestones_success_level_check
CHECK (success_level IN ('refused', 'touched', 'licked', 'nibble', 'sip', 'bite', 'finished'));
