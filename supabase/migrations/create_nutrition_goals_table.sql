-- Create nutrition_goals table to track daily nutritional targets for children and parents
CREATE TABLE IF NOT EXISTS nutrition_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE, -- NULL for parent
  goal_type TEXT NOT NULL CHECK (goal_type IN ('calories', 'protein', 'carbohydrates', 'fat', 'fiber', 'sugar', 'sodium', 'vitamin', 'mineral', 'custom')),
  nutrient_name TEXT, -- Specific nutrient name for vitamins/minerals (e.g., 'vitaminD', 'iron')
  target_value NUMERIC NOT NULL, -- Daily target amount
  target_unit TEXT NOT NULL, -- Unit (e.g., 'kcal', 'g', 'mg', 'mcg')
  target_min NUMERIC, -- Minimum acceptable value (optional)
  target_max NUMERIC, -- Maximum acceptable value (optional)
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  notes TEXT, -- Why this goal was set (e.g., "Prescribed by dietitian for iron deficiency")
  set_by TEXT, -- Who set this goal (e.g., "Dr. Smith", "Self", "Dietitian")
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE, -- Optional end date for temporary goals
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_nutrition_goals_user_id ON nutrition_goals(user_id);
CREATE INDEX idx_nutrition_goals_child_id ON nutrition_goals(child_id);
CREATE INDEX idx_nutrition_goals_active ON nutrition_goals(is_active);
CREATE INDEX idx_nutrition_goals_type ON nutrition_goals(goal_type);

-- Enable Row Level Security
ALTER TABLE nutrition_goals ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own nutrition goals
CREATE POLICY "Users can read own nutrition goals"
  ON nutrition_goals
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own nutrition goals
CREATE POLICY "Users can insert own nutrition goals"
  ON nutrition_goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own nutrition goals
CREATE POLICY "Users can update own nutrition goals"
  ON nutrition_goals
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own nutrition goals
CREATE POLICY "Users can delete own nutrition goals"
  ON nutrition_goals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_nutrition_goals_updated_at
  BEFORE UPDATE ON nutrition_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE nutrition_goals IS 'Stores custom nutritional goals and targets for individuals, allowing tracking of progress toward specific health objectives';

