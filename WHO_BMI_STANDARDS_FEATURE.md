# WHO BMI Standards Feature Documentation

## Overview

This feature adds comprehensive BMI (Body Mass Index) tracking for both parents and children using official WHO (World Health Organization) standards. The system provides color-coded visual indicators to help families understand their health metrics at a glance.

## What is BMI and Why It Matters

**Body Mass Index (BMI)** is a measurement that uses height and weight to estimate body fat. It's a widely used screening tool to identify weight categories that may lead to health problems.

### Important Notes:
- BMI is a **screening tool**, not a diagnostic tool
- It doesn't directly measure body fat or health
- It should be one factor among many in health assessments
- Always consult healthcare providers for personalized advice

## WHO BMI Standards Explained

### For Adults (Parents) - Age 18+

The WHO uses fixed BMI ranges for adults:

| BMI Range | Category | Color Code | Health Implications |
|-----------|----------|------------|-------------------|
| < 18.5 | **Underweight** | 🔴 Red | Low weight - May indicate malnutrition or ARFID; medical attention advised |
| 18.5 - 24.9 | **Normal Weight** | 🟢 Green | Healthy weight range; maintain current lifestyle |
| 25.0 - 29.9 | **Overweight** | 🟡 Yellow | Increased health risk; consider lifestyle changes |
| ≥ 30.0 | **Obese** | 🔴 Red | Significant health risks; medical consultation advised |

**Source:** WHO Global Database on Body Mass Index (BMI)

**Note:** In the context of ARFID (Avoidant/Restrictive Food Intake Disorder), underweight is an important concern that needs attention, hence the red (warning) color coding for both extremes.

### For Children (Ages 2-19)

Children's BMI is **age and sex-specific** because body composition changes as children grow. The WHO uses **BMI-for-age percentiles** rather than fixed ranges.

| Percentile Range | Category | Color Code | What It Means |
|------------------|----------|------------|---------------|
| < 5th percentile | **Underweight** | 🔴 Red | Low weight for age/sex - May indicate ARFID, malnutrition, or growth issues; pediatric evaluation recommended |
| 5th - 85th percentile | **Healthy Weight** | 🟢 Green | Appropriate weight for age/sex |
| 85th - 95th percentile | **Overweight** | 🟡 Yellow | Above healthy weight; monitor closely |
| > 95th percentile | **Obese** | 🔴 Red | Significantly above healthy weight |

**Example:** A 10-year-old girl at the 60th percentile means she has a higher BMI than 60% of girls her age, which falls in the healthy range.

**ARFID Context:** For children with Avoidant/Restrictive Food Intake Disorder, underweight status is a primary concern that needs medical attention. The red color coding helps highlight the importance of addressing nutritional needs.

**Sources:** 
- WHO Child Growth Standards (ages 2-5)
- CDC Growth Charts (ages 2-20, based on WHO standards)

## How BMI is Calculated

The formula is the same for adults and children:

```
BMI = weight (kg) / [height (m)]²
```

**Example:**
- Height: 170 cm = 1.70 m
- Weight: 70 kg
- BMI = 70 / (1.70 × 1.70) = 70 / 2.89 = 24.2

For children, this BMI value is then compared against age and sex-specific percentile tables.

## Understanding Percentiles (Children)

**Percentiles** show how a child's BMI compares to other children of the same age and sex.

- **50th percentile**: Exactly average (median)
- **75th percentile**: Higher BMI than 75% of peers
- **25th percentile**: Lower BMI than 75% of peers

### Why Percentiles Matter

Children's bodies change dramatically as they grow. A BMI of 18 might be:
- **Healthy** for a 10-year-old
- **Overweight** for a 6-year-old
- **Underweight** for a 16-year-old

Percentiles account for these differences automatically.

## Features in the App

### 1. Parent Profile
- Add your height and weight
- View your BMI with WHO color coding
- See which category you fall into
- Get personalized recommendations
- Track changes over time

### 2. Children Profiles
- Each child's BMI is calculated using their:
  - Current height and weight
  - Date of birth (for age calculation)
  - Sex (male/female/other)
- Results show:
  - BMI value
  - Percentile rank for their age and sex
  - Color-coded category
  - WHO recommendations

### 3. Visual Indicators

#### Color Coding System
The app uses ARFID-appropriate color coding:

- 🔴 **Red (Underweight & Obese)**: Both extremes need medical attention
- 🟢 **Green (Healthy)**: Goal range - healthy weight for age/sex
- 🟡 **Yellow (Overweight)**: Caution - monitor and encourage healthy habits

**ARFID-Specific Design:** In the context of Avoidant/Restrictive Food Intake Disorder, underweight needs attention just like obesity. Both extremes use red to highlight the importance of professional medical guidance.

#### Information Display
Each BMI card shows:
- Name and age
- BMI value (e.g., "22.5 kg/m²")
- Percentile (for children, e.g., "65th percentile")
- Category badge with color
- Height and weight measurements
- WHO-based recommendations
- Measurement date

## Technical Implementation

### Database Schema

```sql
-- Parent measurements table
CREATE TABLE parent_measurements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  height_cm DECIMAL(5,2),
  weight_kg DECIMAL(5,2),
  measurement_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ
);
```

### BMI Calculation Method

For children, the app uses the **LMS method** (Lambda-Mu-Sigma):

```
Z-score = ((BMI/M)^L - 1) / (L*S)
Percentile = CDF(Z-score) × 100
```

Where:
- **L** = Box-Cox transformation parameter
- **M** = Median BMI for age/sex
- **S** = Coefficient of variation
- **CDF** = Cumulative Distribution Function (normal distribution)

This is the same method used by the CDC and WHO for growth charts.

### Data Sources

The app includes LMS tables for:
- Males: ages 2-20 years (24-240 months)
- Females: ages 2-20 years (24-240 months)

Data points at 12-month intervals with linear interpolation for exact ages.

## API Endpoints

### Parent Measurements

```
GET    /api/parent-measurements          # Get all measurements
GET    /api/parent-measurements/latest   # Get most recent
POST   /api/parent-measurements          # Create new measurement
GET    /api/parent-measurements/:id      # Get specific measurement
PUT    /api/parent-measurements/:id      # Update measurement
DELETE /api/parent-measurements/:id      # Delete measurement
```

### Children (Enhanced)
Existing children endpoints now include BMI calculations in responses when measurement data is present.

## Components

### BMICard
Full-featured card component displaying:
- Personal information
- BMI value and category
- Percentile (for children)
- Measurements
- WHO recommendations
- Color-coded background

**Usage:**
```tsx
<BMICard
  heightCm={165}
  weightKg={60}
  ageYears={35}
  sex="female"
  name="Jane Doe"
  isParent={true}
/>
```

### BMIBadge
Compact inline badge for lists and tables:
```tsx
<BMIBadge
  heightCm={120}
  weightKg={25}
  ageYears={7}
  sex="male"
  showPercentile={true}
/>
```

### ParentMeasurementForm
Form component for adding/updating parent measurements with validation.

## User Experience Flow

### Adding Parent Measurement
1. Navigate to Profile page
2. Click "Add Your Measurement" in parent section
3. Enter height (cm) and weight (kg)
4. Select measurement date
5. Optionally add notes
6. Submit form
7. View color-coded BMI card with category and recommendations

### Viewing Children BMI
1. Navigate to Profile page
2. Each child with measurements shows a BMI card
3. Color-coded category is immediately visible
4. Hover/tap for detailed recommendations
5. Click "Add Measurement" to track growth over time
6. Click "View History" to see BMI trends

## Health Recommendations

### 🔴 Underweight (LOW)
- **Adults**: Medical attention advised - May indicate ARFID, malnutrition, or underlying health conditions; consult healthcare provider for nutritional support and assessment
- **Children**: Pediatric evaluation recommended - Screen for ARFID, feeding disorders, or other issues; specialized support may be helpful

### 🟢 Normal/Healthy Weight (GOAL)
- **Adults**: Maintain current lifestyle with balanced diet and regular exercise
- **Children**: Continue healthy eating habits and active play; celebrate food exploration and variety

### 🟡 Overweight (MONITOR)
- **Adults**: Consider lifestyle modifications (diet, exercise); may benefit from weight loss
- **Children**: Encourage healthy habits; monitor growth; consult pediatrician if concerned

### 🔴 Obese (HIGH)
- **Adults**: Strongly advised to consult healthcare provider; increased risk for various health conditions
- **Children**: Consult pediatrician for personalized weight management plan

## Limitations and Disclaimers

### BMI Limitations
- **Doesn't distinguish muscle from fat**: Athletes may have high BMI due to muscle
- **Doesn't account for bone density**: Can vary by ethnicity
- **Doesn't measure fat distribution**: Where fat is stored matters for health
- **Doesn't consider overall fitness**: A fit person with high BMI may be healthier than an unfit person with normal BMI

### When BMI May Not Apply
- Pregnant or breastfeeding women
- Competitive athletes and bodybuilders
- People with medical conditions affecting weight
- Elderly with muscle loss
- Children under 2 years old

### Important
⚠️ **This app is for informational and tracking purposes only. Always consult qualified healthcare providers for:**
- Medical diagnosis
- Treatment plans
- Personalized health advice
- Concerns about child development
- Questions about weight management

## References and Resources

### Official WHO Resources
- [WHO BMI Classification](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)
- [WHO Child Growth Standards](https://www.who.int/tools/child-growth-standards)
- [WHO BMI-for-age Charts](https://www.who.int/tools/growth-reference-data-for-5to19-years)

### CDC Resources
- [CDC BMI Calculator](https://www.cdc.gov/bmi/calculator.html)
- [CDC Growth Charts](https://www.cdc.gov/growthcharts/)
- [Understanding BMI for Children and Teens](https://www.cdc.gov/healthyweight/bmi/childrens_bmi.html)

### Additional Reading
- [NIH: Calculate Your BMI](https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm)
- [Harvard Health: How useful is BMI?](https://www.health.harvard.edu/blog/how-useful-is-the-body-mass-index-bmi-201603309339)

## Future Enhancements

Potential improvements to consider:

1. **Waist-to-height ratio**: Additional metric for health assessment
2. **Growth charts**: Visual timeline of BMI changes over time
3. **Multiple measurements**: Compare multiple dates side-by-side
4. **Family trends**: Aggregate family health overview
5. **Health goals**: Set and track BMI targets
6. **Reminders**: Schedule regular measurement check-ins
7. **Export data**: Download BMI history for healthcare appointments
8. **Contextual tips**: Age-specific nutrition and exercise advice

## Support

For questions about:
- **The feature**: Refer to this documentation
- **Your health**: Consult your healthcare provider
- **Your child's growth**: Consult your pediatrician
- **BMI accuracy**: Remember it's one tool among many
- **Technical issues**: Contact app support

---

## Summary

The WHO BMI Standards feature provides evidence-based, color-coded health metrics for the whole family. By using official WHO standards for adults and BMI-for-age percentiles for children, families can track growth and health trends with confidence, always remembering that BMI is a screening tool that works best alongside professional healthcare guidance.

**Remember**: The colors are guides, not judgments. Every body is different, and health encompasses much more than a single number. Use this tool as part of a holistic approach to family wellness! 🌈💙

