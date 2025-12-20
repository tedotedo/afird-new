-- Create food_milestones table to track new foods tried by children and parents
CREATE TABLE IF NOT EXISTS food_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE, -- NULL for parent
  food_name TEXT NOT NULL,
  food_category TEXT CHECK (food_category IN ('vegetable', 'fruit', 'protein', 'grain', 'dairy', 'snack', 'beverage', 'other')),
  date_tried DATE NOT NULL,
  attempt_number INTEGER DEFAULT 1, -- Track repeated attempts
  success_level TEXT CHECK (success_level IN ('refused', 'touched', 'licked', 'nibble', 'bite', 'finished')),
  texture TEXT CHECK (texture IN ('smooth', 'crunchy', 'soft', 'chewy', 'crispy', 'mixed', 'other')),
  temperature TEXT CHECK (temperature IN ('cold', 'room', 'warm', 'hot')),
  notes TEXT,
  photo_url TEXT,
  food_entry_id UUID REFERENCES food_entries(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_food_milestones_user_id ON food_milestones(user_id);
CREATE INDEX idx_food_milestones_child_id ON food_milestones(child_id);
CREATE INDEX idx_food_milestones_date ON food_milestones(date_tried);
CREATE INDEX idx_food_milestones_success ON food_milestones(success_level);

-- Enable Row Level Security
ALTER TABLE food_milestones ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own food milestones
CREATE POLICY "Users can read own food milestones"
  ON food_milestones
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own food milestones
CREATE POLICY "Users can insert own food milestones"
  ON food_milestones
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own food milestones
CREATE POLICY "Users can update own food milestones"
  ON food_milestones
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own food milestones
CREATE POLICY "Users can delete own food milestones"
  ON food_milestones
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_food_milestones_updated_at
  BEFORE UPDATE ON food_milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE food_milestones IS 'Tracks new foods tried by children and parents, including success levels and celebration milestones for ARFID management';

