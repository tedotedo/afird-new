# Health Trends Feature Documentation

## Overview

The Health Trends feature provides visual analytics for tracking growth and nutrition patterns over time. This is particularly valuable for ARFID monitoring, allowing parents and healthcare providers to identify patterns, celebrate progress, and spot concerns early.

## Features

### 📈 Growth Tracking
- **Height Trends**: Track height changes over time
- **Weight Trends**: Monitor weight progression
- **BMI Trends**: Visualize BMI changes with context

### 🍎 Nutrition Tracking
- **Macronutrients**: Calories, protein, carbs, and fat over time
- **Fiber & Sugar**: Monitor dietary fiber and sugar intake
- **Key Minerals**: Track calcium, iron, and sodium
- **Key Vitamins**: Monitor vitamins A, C, and D

### ⚙️ Flexible Controls
- **Time Ranges**: 1 week, 2 weeks, 1 month, 3 months, 6 months, or custom
- **Grouping**: View nutrition data daily or as weekly averages
- **Child Selection**: Automatically uses globally selected child
- **Custom Dates**: Pick any start and end date for analysis

## How to Access

1. Log in to your account
2. Click **"Trends"** in the navigation bar
3. The page will show data for the currently selected child (or parent if no child selected)

## Using the Trends Page

### Time Range Selection

**Preset Ranges:**
- **Last Week**: Perfect for daily monitoring
- **Last 2 Weeks**: Good for short-term pattern identification
- **Last Month**: Standard default view
- **Last 3 Months**: See quarterly progress
- **Last 6 Months**: Long-term trend analysis
- **Custom Range**: Pick any date range you want

### Grouping Options

**Daily View:**
- Shows individual day data points
- Best for short time ranges (1-2 weeks)
- Reveals day-to-day variations
- Helpful for identifying specific days with issues

**Weekly Average:**
- Smooths out daily variations
- Better for longer time ranges (1-6 months)
- Shows overall trends more clearly
- Reduces chart clutter

### Understanding the Charts

#### Growth Charts

**Height Chart (Green):**
- Shows height measurements over time
- Displays first, latest, and total change
- Ideal for tracking growth spurts
- For children, compare against growth percentiles

**Weight Chart (Orange):**
- Tracks weight changes over time
- Critical for ARFID monitoring
- Shows weight gain/loss trends
- First, latest, and change displayed

**BMI Chart (Purple):**
- Calculated BMI over time
- Uses WHO standards for interpretation
- Helps identify concerning trends early
- Compare with BMI cards on profile page

#### Nutrition Charts

**Macronutrients Chart:**
- **Calories (Red)**: Total energy intake
- **Protein (Blue)**: Essential for growth
- **Carbs (Orange)**: Primary energy source
- **Fat (Purple)**: Necessary for development

**Fiber & Sugar Chart:**
- **Fiber (Green)**: Digestive health
- **Sugar (Pink)**: Monitor intake levels

**Minerals Chart:**
- **Calcium (Cyan)**: Bone health
- **Iron (Orange)**: Blood health
- **Sodium (Gray)**: Electrolyte balance

**Vitamins Chart:**
- **Vitamin A (Orange)**: Vision, immune function
- **Vitamin C (Green)**: Immune system, healing
- **Vitamin D (Purple)**: Bone health, mood

### Reading the Data

**Tooltips:**
- Hover over any point to see exact values
- Date and measurement details displayed
- Multiple metrics shown together on nutrition charts

**Averages:**
- Displayed below each chart
- Calculated across the selected time range
- Helps identify typical intake levels

**Trend Lines:**
- Smooth curves show general direction
- Upward trend = increasing
- Downward trend = decreasing
- Flat = stable

## ARFID-Specific Uses

### Progress Monitoring

**Positive Indicators:**
- ✅ Steady weight gain (if underweight)
- ✅ Increasing calorie intake
- ✅ More consistent daily nutrition
- ✅ BMI moving toward healthy range
- ✅ Expanding variety (reflected in nutrient diversity)

**Concerning Patterns:**
- ⚠️ Weight loss or plateau
- ⚠️ Declining calorie intake
- ⚠️ Increasing gaps between meals
- ⚠️ Decreasing nutrient variety
- ⚠️ BMI moving toward underweight

### Clinical Use

**For Healthcare Appointments:**
- Take screenshots of trends
- Show long-term patterns (3-6 months)
- Identify intervention effectiveness
- Track medication effects on appetite
- Document growth progress

**For Feeding Therapy:**
- Weekly trends show therapy impact
- Daily view reveals meal patterns
- Protein trends show safe food expansion
- Vitamin trends show dietary variety

**For Family Planning:**
- Identify stressful periods (school, holidays)
- Plan interventions during stable periods
- Celebrate successes visually
- Set realistic goals based on trends

## Technical Details

### Data Sources

**Growth Data:**
- Parent measurements from `parent_measurements` table
- Child measurements from `child_measurements` table
- BMI calculated automatically from height/weight

**Nutrition Data:**
- Food entries from `food_entries` table
- Aggregated by date automatically
- Filtered by selected child or parent
- Grouped by day or week as selected

### API Endpoints

**Growth Trends:**
```
GET /api/trends/growth?childId=xxx&startDate=xxx&endDate=xxx
```

**Nutrition Trends:**
```
GET /api/trends/nutrition?childId=xxx&startDate=xxx&endDate=xxx&groupBy=day|week
```

### Chart Library

**Technology:** Recharts (React + D3.js)
- Responsive design (works on all devices)
- Interactive tooltips
- Smooth animations
- Accessible (keyboard navigation)

## Privacy & Security

- All data filtered by authenticated user
- Row Level Security (RLS) enforced
- No data visible across accounts
- Secure HTTPS connection required
- Data not shared with third parties

## Tips for Best Results

### Regular Measurements

**Height & Weight:**
- Measure at the same time of day
- Use same scale for consistency
- Record weekly or bi-weekly
- Note any illness or stress

**Food Entries:**
- Log meals consistently
- Be as accurate as possible with portions
- Don't skip days
- Include snacks and drinks

### Interpreting Trends

**Short-term Fluctuations:**
- Weight varies 1-2 kg daily (normal!)
- Nutrition varies day-to-day (expected)
- Look for patterns, not single days
- Use weekly averages for clarity

**Long-term Patterns:**
- 3+ months shows real trends
- Compare seasons (appetite changes)
- Note growth spurts in children
- Consider external factors (stress, illness)

**Context Matters:**
- Growth spurts need more calories
- Illness affects appetite temporarily
- Stress impacts eating patterns
- Medications can affect weight

## Troubleshooting

### No Data Showing

**Check:**
1. Time range selected (try "Last 3 Months")
2. Correct child selected in dropdown
3. Have you added measurements/food entries?
4. Try clicking "Refresh Data" button

### Charts Look Sparse

**Solutions:**
- Add more measurements over time
- Select a narrower time range
- Switch to weekly grouping
- Continue logging consistently

### Trends Don't Match Expectations

**Consider:**
- Data entry accuracy
- Measurement consistency
- Time of day variations
- Seasonal changes
- Growth spurts

## Future Enhancements

Planned features:
- Goal lines on charts (target calories, weight)
- Comparison view (multiple children)
- Export charts as PDF
- Notes/annotations on charts
- WHO percentile overlays for children
- Food variety score trends
- Meal timing patterns

## Support

**Questions about:**
- **Feature use**: See this documentation
- **Your child's health**: Consult pediatrician
- **ARFID treatment**: Work with feeding therapist
- **Data interpretation**: Discuss with healthcare team
- **Technical issues**: Contact app support

## Examples

### Example 1: Weight Gain Success
**Scenario:** Child with ARFID starting feeding therapy

**Week 1-4:**
- Weight: Flat trend (40 kg → 40.2 kg)
- Calories: Variable (800-1200 kcal/day)
- Protein: Low (20-30g/day)

**Week 5-8:**
- Weight: Slight upward trend (40.2 kg → 41 kg)
- Calories: More consistent (1000-1300 kcal/day)
- Protein: Improving (30-40g/day)

**Week 9-12:**
- Weight: Steady gain (41 kg → 42.5 kg)
- Calories: Stable higher intake (1200-1500 kcal/day)
- Protein: Good levels (40-50g/day)

**Interpretation:** Therapy working! Increasing and stabilizing nutrition leading to healthy weight gain.

### Example 2: Identifying Stress Impact
**Scenario:** Teenager during exam period

**Pre-Exams (Month 1):**
- Weight: Stable (55 kg)
- Calories: 1800-2000 kcal/day
- Variety: Good (all vitamin levels adequate)

**During Exams (Month 2):**
- Weight: Slight drop (55 kg → 54 kg)
- Calories: Decreased (1400-1600 kcal/day)
- Variety: Reduced (vitamin C drops significantly)

**Post-Exams (Month 3):**
- Weight: Recovering (54 kg → 55.5 kg)
- Calories: Back to normal (1800-2100 kcal/day)
- Variety: Restored (all vitamins return to baseline)

**Interpretation:** Stress affected eating temporarily. Pattern returned to normal after stressor removed. Plan support for future stressful periods.

## Summary

The Trends feature is a powerful tool for:
- ✅ Monitoring progress over time
- ✅ Identifying patterns and concerns early
- ✅ Celebrating successes visually
- ✅ Supporting clinical decision-making
- ✅ Tracking intervention effectiveness
- ✅ Understanding your family's nutrition journey

Use it regularly, share it with your healthcare team, and celebrate every positive trend! 📈

---

**Remember:** Trends are guides, not diagnoses. Always work with qualified healthcare providers for medical decisions about growth, nutrition, and ARFID treatment.

