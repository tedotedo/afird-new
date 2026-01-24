-- Create achievement_preferences table to store custom achievement settings
CREATE TABLE IF NOT EXISTS achievement_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE, -- NULL for parent's own achievements
  achievement_type TEXT NOT NULL,
  custom_threshold INTEGER,
  custom_name TEXT,
  custom_icon TEXT,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create unique constraint to prevent duplicate preferences
CREATE UNIQUE INDEX idx_achievement_preferences_unique
  ON achievement_preferences(user_id, COALESCE(child_id, '00000000-0000-0000-0000-000000000000'::uuid), achievement_type);

-- Create indexes for faster lookups
CREATE INDEX idx_achievement_preferences_user_id ON achievement_preferences(user_id);
CREATE INDEX idx_achievement_preferences_child_id ON achievement_preferences(child_id);

-- Enable Row Level Security
ALTER TABLE achievement_preferences ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own achievement preferences
CREATE POLICY "Users can read own achievement preferences"
  ON achievement_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own achievement preferences
CREATE POLICY "Users can insert own achievement preferences"
  ON achievement_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own achievement preferences
CREATE POLICY "Users can update own achievement preferences"
  ON achievement_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own achievement preferences
CREATE POLICY "Users can delete own achievement preferences"
  ON achievement_preferences
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_achievement_preferences_updated_at
  BEFORE UPDATE ON achievement_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE achievement_preferences IS 'Stores custom achievement settings for food journey milestones, allowing users to personalize thresholds, names, and icons';
