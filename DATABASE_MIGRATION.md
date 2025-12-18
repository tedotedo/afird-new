# Database Migration for Children Profiles

This document contains the SQL commands needed to add children profiles and measurements tracking to the database.

## Run these SQL commands in your Supabase SQL Editor

### 1. Create children table

```sql
-- Create children table
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  sex TEXT NOT NULL CHECK (sex IN ('male', 'female', 'other')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_children_user_id ON children(user_id);

-- Enable RLS
ALTER TABLE children ENABLE ROW LEVEL SECURITY;

-- RLS Policies for children
CREATE POLICY "Users can view their own children"
  ON children FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own children"
  ON children FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own children"
  ON children FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own children"
  ON children FOR DELETE
  USING (auth.uid() = user_id);
```

### 2. Create child_measurements table

```sql
-- Create child_measurements table
CREATE TABLE IF NOT EXISTS child_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  height_cm DECIMAL(5,2) NOT NULL CHECK (height_cm > 0),
  weight_kg DECIMAL(5,2) NOT NULL CHECK (weight_kg > 0),
  measurement_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_child_measurements_child_id ON child_measurements(child_id);
CREATE INDEX IF NOT EXISTS idx_child_measurements_date ON child_measurements(measurement_date DESC);

-- Enable RLS
ALTER TABLE child_measurements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for child_measurements
CREATE POLICY "Users can view measurements for their children"
  ON child_measurements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = child_measurements.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert measurements for their children"
  ON child_measurements FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = child_measurements.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update measurements for their children"
  ON child_measurements FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = child_measurements.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete measurements for their children"
  ON child_measurements FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = child_measurements.child_id
      AND children.user_id = auth.uid()
    )
  );
```

### 3. Update food_entries table to add child_id

```sql
-- Add child_id column to food_entries table
ALTER TABLE food_entries
ADD COLUMN IF NOT EXISTS child_id UUID REFERENCES children(id) ON DELETE SET NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_food_entries_child_id ON food_entries(child_id);

-- Note: child_id is nullable to maintain backward compatibility with existing entries
-- Existing entries without a child_id will be considered as entries for the parent user
```

### 4. Create function to update updated_at timestamp

```sql
-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for children table
DROP TRIGGER IF EXISTS update_children_updated_at ON children;
CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 5. Create parent_measurements table

```sql
-- Create parent_measurements table
CREATE TABLE IF NOT EXISTS parent_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  height_cm DECIMAL(5,2) NOT NULL CHECK (height_cm > 0 AND height_cm <= 300),
  weight_kg DECIMAL(5,2) NOT NULL CHECK (weight_kg > 0 AND weight_kg <= 500),
  measurement_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_parent_measurements_user_id ON parent_measurements(user_id);
CREATE INDEX IF NOT EXISTS idx_parent_measurements_date ON parent_measurements(measurement_date DESC);

-- Enable RLS
ALTER TABLE parent_measurements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for parent_measurements
CREATE POLICY "Users can view their own measurements"
  ON parent_measurements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own measurements"
  ON parent_measurements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own measurements"
  ON parent_measurements FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own measurements"
  ON parent_measurements FOR DELETE
  USING (auth.uid() = user_id);
```

## Verification

After running the migrations, verify the tables were created:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('children', 'child_measurements', 'parent_measurements');

-- Check if child_id column was added to food_entries
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'food_entries' 
AND column_name = 'child_id';
```

