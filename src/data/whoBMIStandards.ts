/**
 * WHO BMI Standards for Adults and Children
 * 
 * Adult standards are based on WHO BMI classification
 * Children standards use BMI-for-age percentiles (sex and age specific)
 * 
 * Color Coding (ARFID-appropriate):
 * 🔴 RED: Underweight & Obese (both extremes require medical attention)
 * 🟡 YELLOW: Overweight (caution, monitor)
 * 🟢 GREEN: Normal/Healthy (goal range)
 * 
 * Note: In ARFID context, underweight is a critical concern requiring
 * immediate medical attention, hence the red (urgent) color coding.
 */

export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface BMICategoryInfo {
  category: BMICategory;
  label: string;
  color: string;
  bgColor: string;
  description: string;
  recommendation: string;
}

/**
 * WHO BMI Categories for Adults (18+ years)
 * Source: WHO Global Database on Body Mass Index
 */
export const ADULT_BMI_CATEGORIES: Record<BMICategory, BMICategoryInfo> = {
  underweight: {
    category: 'underweight',
    label: 'Underweight',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'BMI below 18.5',
    recommendation: 'Low weight. Consult healthcare provider for nutritional support and assessment.'
  },
  normal: {
    category: 'normal',
    label: 'Normal Weight',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    description: 'BMI 18.5 - 24.9',
    recommendation: 'Healthy weight range. Maintain current lifestyle and balanced diet.'
  },
  overweight: {
    category: 'overweight',
    label: 'Overweight',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    description: 'BMI 25.0 - 29.9',
    recommendation: 'May benefit from weight loss. Consider healthy eating and regular exercise.'
  },
  obese: {
    category: 'obese',
    label: 'Obese',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'BMI 30.0 or higher',
    recommendation: 'Increased health risks. Strongly advised to consult healthcare provider.'
  }
};

/**
 * WHO BMI-for-age percentile categories for Children (2-19 years)
 * Based on WHO Child Growth Standards and CDC growth charts
 */
export const CHILD_BMI_CATEGORIES: Record<BMICategory, BMICategoryInfo> = {
  underweight: {
    category: 'underweight',
    label: 'Underweight',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'Below 5th percentile',
    recommendation: 'Low weight for age and sex. Consult pediatrician to rule out ARFID or other health issues.'
  },
  normal: {
    category: 'normal',
    label: 'Healthy Weight',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    description: '5th to 85th percentile',
    recommendation: 'Healthy weight range for age and sex. Continue balanced diet and active lifestyle.'
  },
  overweight: {
    category: 'overweight',
    label: 'Overweight',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    description: '85th to 95th percentile',
    recommendation: 'Monitor closely. Encourage healthy eating habits and physical activity.'
  },
  obese: {
    category: 'obese',
    label: 'Obese',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'Above 95th percentile',
    recommendation: 'Consult pediatrician for personalized weight management plan.'
  }
};

/**
 * WHO BMI-for-age percentile data for children (2-20 years)
 * These are approximated L, M, S values from WHO/CDC growth charts
 * For production, you would want the complete LMS tables
 * 
 * Format: age in months -> { L, M, S }
 * L = Box-Cox transformation parameter
 * M = Median
 * S = Coefficient of variation
 */
interface LMSData {
  L: number;
  M: number;
  S: number;
}

/**
 * Simplified BMI-for-age data (males, ages 2-20 years)
 * Source: CDC/WHO growth charts
 */
export const MALE_BMI_FOR_AGE: Record<number, LMSData> = {
  24: { L: -1.8, M: 16.0, S: 0.089 },  // 2 years
  36: { L: -1.9, M: 15.8, S: 0.087 },  // 3 years
  48: { L: -2.0, M: 15.5, S: 0.086 },  // 4 years
  60: { L: -2.1, M: 15.4, S: 0.085 },  // 5 years
  72: { L: -2.0, M: 15.3, S: 0.085 },  // 6 years
  84: { L: -1.9, M: 15.4, S: 0.087 },  // 7 years
  96: { L: -1.8, M: 15.6, S: 0.090 },  // 8 years
  108: { L: -1.6, M: 15.9, S: 0.094 }, // 9 years
  120: { L: -1.4, M: 16.4, S: 0.099 }, // 10 years
  132: { L: -1.2, M: 17.0, S: 0.104 }, // 11 years
  144: { L: -0.9, M: 17.7, S: 0.109 }, // 12 years
  156: { L: -0.6, M: 18.5, S: 0.113 }, // 13 years
  168: { L: -0.3, M: 19.3, S: 0.116 }, // 14 years
  180: { L: 0.0, M: 20.1, S: 0.118 },  // 15 years
  192: { L: 0.2, M: 20.8, S: 0.119 },  // 16 years
  204: { L: 0.4, M: 21.5, S: 0.120 },  // 17 years
  216: { L: 0.5, M: 22.0, S: 0.120 },  // 18 years
  228: { L: 0.6, M: 22.5, S: 0.120 },  // 19 years
  240: { L: 0.7, M: 23.0, S: 0.119 }   // 20 years
};

/**
 * Simplified BMI-for-age data (females, ages 2-20 years)
 * Source: CDC/WHO growth charts
 */
export const FEMALE_BMI_FOR_AGE: Record<number, LMSData> = {
  24: { L: -1.5, M: 16.0, S: 0.088 },  // 2 years
  36: { L: -1.6, M: 15.7, S: 0.087 },  // 3 years
  48: { L: -1.7, M: 15.5, S: 0.087 },  // 4 years
  60: { L: -1.8, M: 15.3, S: 0.088 },  // 5 years
  72: { L: -1.8, M: 15.2, S: 0.090 },  // 6 years
  84: { L: -1.8, M: 15.3, S: 0.093 },  // 7 years
  96: { L: -1.7, M: 15.5, S: 0.097 },  // 8 years
  108: { L: -1.6, M: 15.8, S: 0.102 }, // 9 years
  120: { L: -1.4, M: 16.3, S: 0.107 }, // 10 years
  132: { L: -1.2, M: 16.9, S: 0.112 }, // 11 years
  144: { L: -0.9, M: 17.6, S: 0.117 }, // 12 years
  156: { L: -0.6, M: 18.3, S: 0.121 }, // 13 years
  168: { L: -0.3, M: 19.0, S: 0.124 }, // 14 years
  180: { L: 0.0, M: 19.6, S: 0.126 },  // 15 years
  192: { L: 0.2, M: 20.2, S: 0.127 },  // 16 years
  204: { L: 0.4, M: 20.7, S: 0.128 },  // 17 years
  216: { L: 0.5, M: 21.1, S: 0.128 },  // 18 years
  228: { L: 0.6, M: 21.5, S: 0.128 },  // 19 years
  240: { L: 0.7, M: 21.8, S: 0.128 }   // 20 years
};

/**
 * Percentile thresholds for BMI-for-age categories
 */
export const BMI_PERCENTILE_THRESHOLDS = {
  underweight: { min: 0, max: 5 },
  normal: { min: 5, max: 85 },
  overweight: { min: 85, max: 95 },
  obese: { min: 95, max: 100 }
};

/**
 * Get interpolated LMS values for a specific age in months
 */
function getInterpolatedLMS(
  ageMonths: number,
  sex: 'male' | 'female'
): LMSData {
  const data = sex === 'male' ? MALE_BMI_FOR_AGE : FEMALE_BMI_FOR_AGE;
  const ages = Object.keys(data).map(Number).sort((a, b) => a - b);
  
  // Find the two nearest ages
  let lowerAge = ages[0];
  let upperAge = ages[ages.length - 1];
  
  for (let i = 0; i < ages.length - 1; i++) {
    if (ageMonths >= ages[i] && ageMonths <= ages[i + 1]) {
      lowerAge = ages[i];
      upperAge = ages[i + 1];
      break;
    }
  }
  
  // If exact match, return it
  if (data[ageMonths]) {
    return data[ageMonths];
  }
  
  // Linear interpolation
  const lower = data[lowerAge];
  const upper = data[upperAge];
  const fraction = (ageMonths - lowerAge) / (upperAge - lowerAge);
  
  return {
    L: lower.L + (upper.L - lower.L) * fraction,
    M: lower.M + (upper.M - lower.M) * fraction,
    S: lower.S + (upper.S - lower.S) * fraction
  };
}

/**
 * Calculate BMI percentile for children using LMS method
 * @param bmi Calculated BMI value
 * @param ageMonths Age in months
 * @param sex Child's sex
 * @returns Percentile (0-100)
 */
export function calculateBMIPercentile(
  bmi: number,
  ageMonths: number,
  sex: 'male' | 'female' | 'other'
): number | null {
  // Use male data for 'other' as default
  const effectiveSex = sex === 'other' ? 'male' : sex;
  
  // Only valid for ages 24-240 months (2-20 years)
  if (ageMonths < 24 || ageMonths > 240) {
    return null;
  }
  
  const lms = getInterpolatedLMS(ageMonths, effectiveSex);
  
  // LMS method formula: Z = ((X/M)^L - 1) / (L*S)
  // where X is the BMI value
  const { L, M, S } = lms;
  
  let z: number;
  if (L !== 0) {
    z = (Math.pow(bmi / M, L) - 1) / (L * S);
  } else {
    // When L = 0, use natural log
    z = Math.log(bmi / M) / S;
  }
  
  // Convert Z-score to percentile using normal distribution approximation
  const percentile = normalCDF(z) * 100;
  
  return Math.max(0, Math.min(100, percentile));
}

/**
 * Normal cumulative distribution function (approximation)
 */
function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const probability =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  
  return z > 0 ? 1 - probability : probability;
}

/**
 * Calculate BMI
 * @param heightCm Height in centimeters
 * @param weightKg Weight in kilograms
 * @returns BMI value
 */
export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Get BMI category for adults (18+ years)
 */
export function getAdultBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

/**
 * Get BMI category for children based on percentile
 */
export function getChildBMICategory(percentile: number): BMICategory {
  if (percentile < 5) return 'underweight';
  if (percentile < 85) return 'normal';
  if (percentile < 95) return 'overweight';
  return 'obese';
}

/**
 * Get BMI category info with color coding
 */
export function getBMICategoryInfo(
  heightCm: number,
  weightKg: number,
  ageYears: number,
  sex: 'male' | 'female' | 'other'
): {
  bmi: number;
  category: BMICategory;
  categoryInfo: BMICategoryInfo;
  percentile?: number;
  isChild: boolean;
} {
  const bmi = calculateBMI(heightCm, weightKg);
  const isChild = ageYears < 18;
  
  if (isChild && ageYears >= 2) {
    // Use BMI-for-age percentiles for children 2-17 years
    const ageMonths = ageYears * 12;
    const percentile = calculateBMIPercentile(bmi, ageMonths, sex);
    
    if (percentile !== null) {
      const category = getChildBMICategory(percentile);
      return {
        bmi,
        category,
        categoryInfo: CHILD_BMI_CATEGORIES[category],
        percentile,
        isChild: true
      };
    }
  }
  
  // Use adult BMI categories for 18+ or if percentile calculation failed
  const category = getAdultBMICategory(bmi);
  return {
    bmi,
    category,
    categoryInfo: ADULT_BMI_CATEGORIES[category],
    isChild: false
  };
}

