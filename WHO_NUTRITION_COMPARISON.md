# WHO Nutrition Comparison Feature

## Overview

The summary page now includes a comprehensive nutritional intake comparison table that shows how daily food intake compares against **WHO (World Health Organization) recommended daily intakes**. This helps parents and users understand if nutritional needs are being met.

## 📚 Acronyms & Terms Explained

### Organizations & Standards
- **WHO** = World Health Organization (United Nations health agency)
- **FAO** = Food and Agriculture Organization (United Nations agency for nutrition)
- **RDI** = Recommended Daily Intake (daily nutrition targets set by health organizations)

### Measurements
- **kcal** = Kilocalories (commonly called "calories") - unit of energy
- **g** = Grams - unit of weight
- **mg** = Milligrams (1/1,000 of a gram) - smaller unit of weight
- **mcg** = Micrograms (1/1,000,000 of a gram) - very small unit of weight

### Special Terms
- **RAE** = Retinol Activity Equivalents (measurement for Vitamin A)
- **% of RDI** = Percentage of Recommended Daily Intake achieved

All these acronyms are also explained directly in the app interface for easy reference.

## 🎯 What's New

### Automatic WHO Comparison Tables

The summary page now displays three detailed tables comparing actual intake vs recommendations:

1. **Macronutrients & Energy**
   - Energy (calories)
   - Protein
   - Carbohydrates
   - Fat
   - Fiber
   - Sugar (max limit)
   - Sodium (max limit)

2. **Vitamins**
   - All B vitamins (B1, B2, B3, B6, B12)
   - Vitamins A, C, D, E, K
   - Folate

3. **Minerals**
   - Calcium, Iron, Magnesium
   - Phosphorus, Potassium, Zinc
   - Copper, Manganese, Selenium

## ✨ Key Features

### Age-Appropriate Recommendations

Recommendations automatically adjust based on:
- **Age Groups:**
  - 1-3 years (toddlers)
  - 4-8 years (children)
  - 9-13 years (pre-teens)
  - 14-18 years (teens)
  - 19+ years (adults)

- **Sex:** Different recommendations for male/female
- **Selected Person:** Uses child's age/sex, or adult defaults for parent

### Visual Status Indicators

Each nutrient shows:
- **Actual Intake:** What was consumed that day
- **Recommended Amount:** WHO guideline for that person
- **Percentage:** % of recommended intake achieved
- **Status Badge:** Color-coded status

### Status Colors

**For Most Nutrients (target to meet/exceed):**
- 🟢 **Green (Met):** ≥100% of recommended intake
- 🟡 **Yellow (Adequate):** 75-99% of recommended intake
- 🔴 **Red (Low):** <75% of recommended intake

**For Max Values (sugar, sodium - target to stay under):**
- 🟢 **Green (Good):** ≤80% of maximum recommended
- 🟡 **Yellow (Acceptable):** 81-100% of maximum
- 🔴 **Red (Excessive):** >100% of maximum

## 📊 How to Use

### Viewing Comparison Tables

1. Navigate to **Summary** page
2. Select a date
3. Select a child (or view as parent)
4. Scroll down below the daily summary card
5. View three comparison tables

### Interpreting Results

**Green Status (Good):**
- Nutritional needs are being met
- Continue current dietary patterns

**Yellow Status (Adequate/Acceptable):**
- Close to meeting needs
- Consider adding foods rich in those nutrients
- Generally acceptable but could be improved

**Red Status (Low/Excessive):**
- **Low:** Not meeting nutritional needs
  - Add foods rich in that nutrient
  - Consider dietary adjustments
- **Excessive:** Over maximum recommended
  - Reduce intake of that nutrient
  - Review food choices

### Example Scenarios

**Scenario 1: Low Iron**
- Status shows "Low" (red) with 45% of RDI
- **Action:** Add iron-rich foods (lean meats, beans, fortified cereals)

**Scenario 2: Excessive Sugar**
- Status shows "Excessive" (red) with 150% of max
- **Action:** Reduce sugary foods and drinks

**Scenario 3: Adequate Protein**
- Status shows "Met" (green) with 105% of RDI
- **Action:** Current intake is good, maintain

## 🔧 Technical Implementation

### Files Created (3)

1. **`src/data/whoRecommendations.ts`**
   - WHO/FAO guideline data for all age groups
   - Helper functions for age group calculation
   - Status color and label generators
   - Percentage calculation utilities

2. **`src/components/NutritionComparisonTable.tsx`**
   - React component for displaying comparison tables
   - Three sections: Macronutrients, Vitamins, Minerals
   - Color-coded status badges
   - Responsive table design
   - Info banner with legend

3. **`WHO_NUTRITION_COMPARISON.md`**
   - This documentation file

### Files Modified (2)

1. **`src/utils/dateUtils.ts`**
   - Added `calculateAge()` function
   - Calculates age from date of birth
   - Accounts for birthday not yet occurred this year

2. **`src/app/summary/page.tsx`**
   - Imports comparison component
   - Fetches child data for age/sex
   - Calculates appropriate WHO recommendations
   - Displays comparison tables below summary

## 📖 WHO Guidelines Source

Recommendations are based on:
- **WHO/FAO Vitamin and Mineral Requirements in Human Nutrition**
- **Dietary Reference Intakes (DRIs)** from Institute of Medicine
- **WHO Technical Report Series** on nutrition

### Age Group Details

**1-3 Years (Toddlers):**
- Energy: 1000 kcal/day
- Protein: 13g/day
- Key focus: Growth and development

**4-8 Years (Children):**
- Energy: 1200-1400 kcal/day (sex-dependent)
- Protein: 19g/day
- Increased calcium for bone growth

**9-13 Years (Pre-teens):**
- Energy: 1600-1800 kcal/day (sex-dependent)
- Protein: 34g/day
- Higher calcium needs (1300mg)

**14-18 Years (Teens):**
- Energy: 1800-2400 kcal/day (sex-dependent)
- Protein: 46-52g/day (sex-dependent)
- Higher iron needs for females (15mg)

**19+ Years (Adults):**
- Energy: 1800-2400 kcal/day (sex-dependent)
- Protein: 46-56g/day (sex-dependent)
- Maintenance levels

## 🎨 UI Design

### Table Layout

**Header Section:**
- Color-coded by nutrient category
- Blue: Macronutrients
- Green: Vitamins
- Purple: Minerals

**Column Structure:**
1. Nutrient Name
2. Actual Intake (with units)
3. Recommended Amount (with units)
4. % of RDI (colored badge)
5. Status (colored badge)

**Info Banner:**
- Blue information box at top
- Shows age, sex, and data source
- Includes legend for color coding

### Mobile Responsive

- Horizontal scroll on small screens
- Tables maintain readability
- Status badges visible at all sizes
- Compact layout for mobile

## 💡 Use Cases

### For Parents Tracking Children

**Morning Review:**
- Check yesterday's nutrition
- Identify any deficiencies
- Plan today's meals accordingly

**Weekly Planning:**
- Review multiple days
- Identify patterns (always low in calcium?)
- Adjust meal planning

**Growth Monitoring:**
- Ensure adequate nutrition for growth
- Track against age-appropriate guidelines
- Share with pediatrician

### For Adults (Self-Tracking)

**Health Goals:**
- Monitor nutritional adequacy
- Identify areas for improvement
- Track progress over time

**Dietary Adjustments:**
- See immediate impact of diet changes
- Validate nutritional completeness
- Identify excessive intakes

## ⚠️ Important Notes

### Limitations

1. **General Guidelines:** WHO recommendations are population averages
2. **Individual Variation:** Actual needs may vary based on:
   - Activity level
   - Health conditions
   - Growth spurts
   - Metabolic factors

3. **Data Accuracy:** Nutritional data depends on:
   - AI analysis accuracy
   - Food database completeness
   - Portion size estimates

### Recommendations

1. **Use as a Guide:** Not a substitute for professional advice
2. **Consult Healthcare Provider:** For personalized nutrition plans
3. **Consider Patterns:** Look at weekly/monthly trends, not single days
4. **Combine with Growth Charts:** Use alongside pediatric growth monitoring

## 🔮 Future Enhancements

Potential improvements:
- Weekly/monthly average comparisons
- Trend charts over time
- Printable nutrition reports
- Export to share with healthcare providers
- Customizable recommendations
- Activity level adjustments
- Special dietary needs profiles
- Nutritional goal setting
- Progress tracking
- Nutrient deficiency alerts

## 📱 User Experience Flow

### Typical Usage

1. **Record Food:**
   - Take photos throughout the day
   - Select appropriate child

2. **View Summary:**
   - Go to Summary page
   - Select date to review

3. **Check Comparison:**
   - Scroll to WHO comparison tables
   - Review status indicators

4. **Take Action:**
   - Identify gaps or excesses
   - Adjust next meal planning
   - Note patterns over time

5. **Monitor Progress:**
   - Check daily/weekly trends
   - Celebrate improvements
   - Adjust strategies as needed

## 📊 Example Interpretation

### Sample Day Review

**Emma (Age 6, Female):**

**Macronutrients:**
- Energy: 1150 kcal (96% - Yellow/Adequate)
- Protein: 22g (116% - Green/Met)
- Fiber: 18g (72% - Red/Low)

**Action Items:**
- ✅ Good protein intake
- ⚠️ Almost meeting energy needs - add small snack
- ❌ Need more fiber - add fruits, vegetables, whole grains

**Vitamins:**
- Vitamin C: 45mg (180% - Green/Met)
- Vitamin D: 8mcg (53% - Red/Low)
- Iron: 7mg (70% - Yellow/Adequate)

**Action Items:**
- ✅ Excellent vitamin C
- ❌ Need more vitamin D - add fortified milk, fish
- ⚠️ Iron close to adequate - continue current intake

## 🎯 Benefits

### For Children

- **Optimal Growth:** Ensure nutritional needs met during critical development
- **Healthy Habits:** Learn about balanced nutrition
- **Prevention:** Avoid deficiencies before they cause issues

### For Parents

- **Confidence:** Know children are well-nourished
- **Guidance:** Clear direction for meal planning
- **Tracking:** Monitor nutrition objectively
- **Communication:** Share data with healthcare providers

### For Health

- **Early Detection:** Identify nutritional gaps quickly
- **Informed Decisions:** Data-driven dietary choices
- **Prevention:** Avoid long-term health issues
- **Optimization:** Fine-tune nutrition for best outcomes

---

**Feature Complete!** ✅

The WHO nutrition comparison feature is now live in the summary page, providing comprehensive nutritional analysis for both children and adults.

