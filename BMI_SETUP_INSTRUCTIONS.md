# WHO BMI Standards - Setup Instructions

This guide will help you set up the parent measurements feature with WHO BMI standards.

## Prerequisites

- Access to your Supabase project dashboard
- Existing AFIRD-new database with users and children tables

## Step 1: Database Migration

You need to create the `parent_measurements` table in your Supabase database.

### Run SQL Migration

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Create a new query
4. Copy and paste the following SQL:

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

5. Click **Run** to execute the migration
6. Verify success message appears

### Verify Table Creation

Run this verification query:

```sql
-- Check if table was created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'parent_measurements'
ORDER BY ordinal_position;
```

You should see 7 columns:
- id (uuid)
- user_id (uuid)
- height_cm (numeric)
- weight_kg (numeric)
- measurement_date (date)
- notes (text)
- created_at (timestamp with time zone)

## Step 2: Test the Feature

### Test Parent Measurement Creation

1. Log in to your application
2. Navigate to the **Profile** page
3. In the "Your Profile (Parent)" section, click **"Add Your Measurement"**
4. Fill in the form:
   - **Height**: Enter your height in centimeters (e.g., 170.5)
   - **Weight**: Enter your weight in kilograms (e.g., 70.0)
   - **Measurement Date**: Select today's date
   - **Notes**: (Optional) Add any notes
5. Click **"Save Measurement"**

### Expected Results

After saving, you should see:

✅ **BMI Card** displaying:
- Your BMI value (e.g., "24.2 kg/m²")
- Color-coded category badge:
  - 🔵 Blue for Underweight (BMI < 18.5)
  - 🟢 Green for Normal (BMI 18.5-24.9)
  - 🟡 Yellow for Overweight (BMI 25-29.9)
  - 🔴 Red for Obese (BMI ≥ 30)
- Your height and weight
- WHO category description
- Personalized recommendations
- "Based on WHO BMI standards" badge

### Test Children BMI

1. Ensure you have at least one child profile with measurements
2. On the Profile page, scroll to the "Children Profiles" section
3. Each child with measurements should show a color-coded BMI card
4. Children's BMI uses **percentiles** instead of fixed ranges:
   - Shows "65th percentile for age and sex" (example)
   - Color codes based on WHO BMI-for-age standards

## Step 3: Understanding the Color Codes

### For Parents (Adults 18+)

| Color | Category | BMI Range | What It Means |
|-------|----------|-----------|---------------|
| 🔵 Blue | Underweight | < 18.5 | May need to gain weight |
| 🟢 Green | Normal | 18.5-24.9 | Healthy weight range |
| 🟡 Yellow | Overweight | 25-29.9 | Consider weight loss |
| 🔴 Red | Obese | ≥ 30 | Consult healthcare provider |

### For Children (Ages 2-17)

| Color | Category | Percentile Range | What It Means |
|-------|----------|-----------------|---------------|
| 🔵 Blue | Underweight | < 5th | Below healthy weight |
| 🟢 Green | Healthy | 5th-85th | Appropriate weight |
| 🟡 Yellow | Overweight | 85th-95th | Monitor closely |
| 🔴 Red | Obese | > 95th | Consult pediatrician |

## Step 4: API Testing (Optional)

### Test Parent Measurement API

Using curl or your API client:

```bash
# Get latest parent measurement
curl -X GET 'https://your-app.com/api/parent-measurements/latest' \
  -H 'Cookie: your-session-cookie'

# Create new measurement
curl -X POST 'https://your-app.com/api/parent-measurements' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: your-session-cookie' \
  -d '{
    "height_cm": 170.5,
    "weight_kg": 70.0,
    "measurement_date": "2024-12-18",
    "notes": "Feeling healthy"
  }'

# Get all measurements
curl -X GET 'https://your-app.com/api/parent-measurements' \
  -H 'Cookie: your-session-cookie'
```

## Troubleshooting

### Table Creation Failed

**Error**: "relation already exists"
- **Solution**: The table already exists. Verify with the verification query above.

**Error**: "must be owner of table"
- **Solution**: Make sure you're logged in as the Supabase project owner.

### RLS Policies Not Working

**Error**: "new row violates row-level security policy"
- **Solution**: Check that RLS policies were created correctly. Run:

```sql
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'parent_measurements';
```

You should see 4 policies (SELECT, INSERT, UPDATE, DELETE).

### BMI Not Showing

**Issue**: BMI card not appearing after saving measurement
- **Check**: Browser console for errors
- **Check**: Network tab shows successful API response
- **Try**: Refresh the page
- **Verify**: Data was saved in Supabase table viewer

### Wrong BMI Category/Color

**Issue**: BMI shows wrong color or category
- **Verify**: Height and weight entered correctly
- **Check**: Units are correct (cm and kg, not inches and pounds)
- **Calculate**: Verify BMI manually: weight(kg) / [height(m)]²
- **Example**: 70kg / (1.70m)² = 24.2 BMI = Normal (Green)

### Child Percentile Not Showing

**Issue**: Child BMI doesn't show percentile
- **Check**: Child age is between 2-20 years
- **Note**: Children under 2 or adults 18+ use adult BMI standards
- **Verify**: Child's date of birth is correct

## Important Notes

### Data Privacy
- All measurements are private to each user
- Row Level Security (RLS) ensures users can only access their own data
- Parent measurements are separate from children's measurements

### BMI Accuracy
- BMI is a screening tool, not a diagnostic tool
- Results should be discussed with healthcare providers
- Athletes and muscular individuals may show higher BMI
- Always consult doctors for health decisions

### Units
- **Height**: Centimeters (cm) only
- **Weight**: Kilograms (kg) only
- Conversion:
  - Inches to cm: multiply by 2.54
  - Feet to cm: multiply by 30.48
  - Pounds to kg: multiply by 0.453592

### WHO Standards Source
- Adult BMI: WHO Global Database on BMI
- Children BMI: WHO Child Growth Standards + CDC Growth Charts
- Percentiles calculated using LMS method (Lambda-Mu-Sigma)

## Next Steps

After setup:

1. **Add your measurement** as a parent to test the feature
2. **Add measurements for children** to see percentile-based BMI
3. **Update measurements regularly** to track trends over time
4. **Review the full documentation** in `WHO_BMI_STANDARDS_FEATURE.md`
5. **Share with family members** so they can track their own measurements

## Support Resources

- **Full Documentation**: See `WHO_BMI_STANDARDS_FEATURE.md`
- **Database Schema**: See `DATABASE_MIGRATION.md` (Section 5)
- **WHO Resources**: https://www.who.int/tools/child-growth-standards
- **CDC Growth Charts**: https://www.cdc.gov/growthcharts/

## Success Checklist

- ✅ Database table created successfully
- ✅ RLS policies enabled and working
- ✅ Can add parent measurement via UI
- ✅ BMI card displays with correct color coding
- ✅ Children's BMI shows percentiles (if applicable)
- ✅ Can update measurements
- ✅ WHO standards explanation understood

---

**Congratulations!** You've successfully set up the WHO BMI Standards feature. Your family can now track their health metrics with evidence-based WHO guidelines! 🎉

For questions or issues, refer to the troubleshooting section or review the complete feature documentation.

