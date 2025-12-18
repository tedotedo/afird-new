/**
 * WHO Recommended Daily Nutritional Intakes
 * 
 * Based on WHO/FAO guidelines for different age groups and sexes
 * 
 * Acronyms:
 * - WHO = World Health Organization
 * - FAO = Food and Agriculture Organization
 * - RDI = Recommended Daily Intake
 * - RAE = Retinol Activity Equivalents (for Vitamin A)
 * - mcg = micrograms (1/1,000,000 of a gram)
 * - mg = milligrams (1/1,000 of a gram)
 * - g = grams
 * - kcal = kilocalories (commonly called "calories")
 * 
 * Age groups:
 * - 1-3 years (toddlers)
 * - 4-8 years (children)
 * - 9-13 years (pre-teens)
 * - 14-18 years (teens)
 * - 19+ years (adults)
 */

export interface NutritionRecommendation {
  energy: number; // kcal
  protein: number; // g
  carbohydrates: number; // g
  fat: number; // g
  fiber: number; // g
  sugar: number; // g (max)
  sodium: number; // mg (max)
  
  // Vitamins
  vitaminA: number; // mcg RAE
  vitaminB1: number; // mg (Thiamine)
  vitaminB2: number; // mg (Riboflavin)
  vitaminB3: number; // mg (Niacin)
  vitaminB6: number; // mg
  vitaminB12: number; // mcg
  vitaminC: number; // mg
  vitaminD: number; // mcg
  vitaminE: number; // mg
  vitaminK: number; // mcg
  folate: number; // mcg
  
  // Minerals
  calcium: number; // mg
  iron: number; // mg
  magnesium: number; // mg
  phosphorus: number; // mg
  potassium: number; // mg
  zinc: number; // mg
  copper: number; // mg
  manganese: number; // mg
  selenium: number; // mcg
}

export const WHO_RECOMMENDATIONS: {
  [key: string]: {
    male: NutritionRecommendation;
    female: NutritionRecommendation;
  };
} = {
  '1-3': {
    male: {
      energy: 1000,
      protein: 13,
      carbohydrates: 130,
      fat: 30,
      fiber: 19,
      sugar: 25,
      sodium: 1000,
      vitaminA: 300,
      vitaminB1: 0.5,
      vitaminB2: 0.5,
      vitaminB3: 6,
      vitaminB6: 0.5,
      vitaminB12: 0.9,
      vitaminC: 15,
      vitaminD: 15,
      vitaminE: 6,
      vitaminK: 30,
      folate: 150,
      calcium: 700,
      iron: 7,
      magnesium: 80,
      phosphorus: 460,
      potassium: 2000,
      zinc: 3,
      copper: 0.34,
      manganese: 1.2,
      selenium: 20,
    },
    female: {
      energy: 1000,
      protein: 13,
      carbohydrates: 130,
      fat: 30,
      fiber: 19,
      sugar: 25,
      sodium: 1000,
      vitaminA: 300,
      vitaminB1: 0.5,
      vitaminB2: 0.5,
      vitaminB3: 6,
      vitaminB6: 0.5,
      vitaminB12: 0.9,
      vitaminC: 15,
      vitaminD: 15,
      vitaminE: 6,
      vitaminK: 30,
      folate: 150,
      calcium: 700,
      iron: 7,
      magnesium: 80,
      phosphorus: 460,
      potassium: 2000,
      zinc: 3,
      copper: 0.34,
      manganese: 1.2,
      selenium: 20,
    },
  },
  '4-8': {
    male: {
      energy: 1400,
      protein: 19,
      carbohydrates: 130,
      fat: 35,
      fiber: 25,
      sugar: 25,
      sodium: 1200,
      vitaminA: 400,
      vitaminB1: 0.6,
      vitaminB2: 0.6,
      vitaminB3: 8,
      vitaminB6: 0.6,
      vitaminB12: 1.2,
      vitaminC: 25,
      vitaminD: 15,
      vitaminE: 7,
      vitaminK: 55,
      folate: 200,
      calcium: 1000,
      iron: 10,
      magnesium: 130,
      phosphorus: 500,
      potassium: 2300,
      zinc: 5,
      copper: 0.44,
      manganese: 1.5,
      selenium: 30,
    },
    female: {
      energy: 1200,
      protein: 19,
      carbohydrates: 130,
      fat: 35,
      fiber: 25,
      sugar: 25,
      sodium: 1200,
      vitaminA: 400,
      vitaminB1: 0.6,
      vitaminB2: 0.6,
      vitaminB3: 8,
      vitaminB6: 0.6,
      vitaminB12: 1.2,
      vitaminC: 25,
      vitaminD: 15,
      vitaminE: 7,
      vitaminK: 55,
      folate: 200,
      calcium: 1000,
      iron: 10,
      magnesium: 130,
      phosphorus: 500,
      potassium: 2300,
      zinc: 5,
      copper: 0.44,
      manganese: 1.5,
      selenium: 30,
    },
  },
  '9-13': {
    male: {
      energy: 1800,
      protein: 34,
      carbohydrates: 130,
      fat: 45,
      fiber: 31,
      sugar: 30,
      sodium: 1500,
      vitaminA: 600,
      vitaminB1: 0.9,
      vitaminB2: 0.9,
      vitaminB3: 12,
      vitaminB6: 1.0,
      vitaminB12: 1.8,
      vitaminC: 45,
      vitaminD: 15,
      vitaminE: 11,
      vitaminK: 60,
      folate: 300,
      calcium: 1300,
      iron: 8,
      magnesium: 240,
      phosphorus: 1250,
      potassium: 2500,
      zinc: 8,
      copper: 0.7,
      manganese: 1.9,
      selenium: 40,
    },
    female: {
      energy: 1600,
      protein: 34,
      carbohydrates: 130,
      fat: 45,
      fiber: 26,
      sugar: 30,
      sodium: 1500,
      vitaminA: 600,
      vitaminB1: 0.9,
      vitaminB2: 0.9,
      vitaminB3: 12,
      vitaminB6: 1.0,
      vitaminB12: 1.8,
      vitaminC: 45,
      vitaminD: 15,
      vitaminE: 11,
      vitaminK: 60,
      folate: 300,
      calcium: 1300,
      iron: 8,
      magnesium: 240,
      phosphorus: 1250,
      potassium: 2500,
      zinc: 8,
      copper: 0.7,
      manganese: 1.6,
      selenium: 40,
    },
  },
  '14-18': {
    male: {
      energy: 2400,
      protein: 52,
      carbohydrates: 130,
      fat: 65,
      fiber: 38,
      sugar: 35,
      sodium: 1500,
      vitaminA: 900,
      vitaminB1: 1.2,
      vitaminB2: 1.3,
      vitaminB3: 16,
      vitaminB6: 1.3,
      vitaminB12: 2.4,
      vitaminC: 75,
      vitaminD: 15,
      vitaminE: 15,
      vitaminK: 75,
      folate: 400,
      calcium: 1300,
      iron: 11,
      magnesium: 410,
      phosphorus: 1250,
      potassium: 3000,
      zinc: 11,
      copper: 0.89,
      manganese: 2.2,
      selenium: 55,
    },
    female: {
      energy: 1800,
      protein: 46,
      carbohydrates: 130,
      fat: 55,
      fiber: 26,
      sugar: 30,
      sodium: 1500,
      vitaminA: 700,
      vitaminB1: 1.0,
      vitaminB2: 1.0,
      vitaminB3: 14,
      vitaminB6: 1.2,
      vitaminB12: 2.4,
      vitaminC: 65,
      vitaminD: 15,
      vitaminE: 15,
      vitaminK: 75,
      folate: 400,
      calcium: 1300,
      iron: 15,
      magnesium: 360,
      phosphorus: 1250,
      potassium: 2300,
      zinc: 9,
      copper: 0.89,
      manganese: 1.6,
      selenium: 55,
    },
  },
  '19+': {
    male: {
      energy: 2400,
      protein: 56,
      carbohydrates: 130,
      fat: 70,
      fiber: 38,
      sugar: 36,
      sodium: 2000,
      vitaminA: 900,
      vitaminB1: 1.2,
      vitaminB2: 1.3,
      vitaminB3: 16,
      vitaminB6: 1.3,
      vitaminB12: 2.4,
      vitaminC: 90,
      vitaminD: 15,
      vitaminE: 15,
      vitaminK: 120,
      folate: 400,
      calcium: 1000,
      iron: 8,
      magnesium: 400,
      phosphorus: 700,
      potassium: 3400,
      zinc: 11,
      copper: 0.9,
      manganese: 2.3,
      selenium: 55,
    },
    female: {
      energy: 1800,
      protein: 46,
      carbohydrates: 130,
      fat: 55,
      fiber: 25,
      sugar: 30,
      sodium: 2000,
      vitaminA: 700,
      vitaminB1: 1.1,
      vitaminB2: 1.1,
      vitaminB3: 14,
      vitaminB6: 1.3,
      vitaminB12: 2.4,
      vitaminC: 75,
      vitaminD: 15,
      vitaminE: 15,
      vitaminK: 90,
      folate: 400,
      calcium: 1000,
      iron: 18,
      magnesium: 310,
      phosphorus: 700,
      potassium: 2600,
      zinc: 8,
      copper: 0.9,
      manganese: 1.8,
      selenium: 55,
    },
  },
};

/**
 * Get age group key from age
 */
export function getAgeGroup(age: number): string {
  if (age < 1) return '1-3'; // Default to youngest group for babies
  if (age <= 3) return '1-3';
  if (age <= 8) return '4-8';
  if (age <= 13) return '9-13';
  if (age <= 18) return '14-18';
  return '19+';
}

/**
 * Get WHO recommendations for a specific age and sex
 */
export function getRecommendations(age: number, sex: 'male' | 'female' | 'other'): NutritionRecommendation {
  const ageGroup = getAgeGroup(age);
  const sexKey = sex === 'other' ? 'male' : sex; // Default to male for 'other'
  return WHO_RECOMMENDATIONS[ageGroup][sexKey];
}

/**
 * Calculate percentage of recommended intake
 */
export function calculatePercentage(actual: number | undefined, recommended: number): number {
  if (!actual || recommended === 0) return 0;
  return Math.round((actual / recommended) * 100);
}

/**
 * Get status color based on percentage and nutrient type
 * @param percentage - Percentage of RDI (Recommended Daily Intake)
 * @param isMaxValue - True for nutrients where less is better (sugar, sodium)
 * @returns Tailwind CSS classes for color coding
 */
export function getStatusColor(percentage: number, isMaxValue: boolean = false): string {
  if (isMaxValue) {
    // For max values (sugar, sodium), we want to stay under
    if (percentage <= 80) return 'text-green-600 bg-green-50';
    if (percentage <= 100) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  } else {
    // For min values (most nutrients), we want to meet or exceed
    if (percentage >= 100) return 'text-green-600 bg-green-50';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  }
}

/**
 * Get status label based on percentage and nutrient type
 */
export function getStatusLabel(percentage: number, isMaxValue: boolean = false): string {
  if (isMaxValue) {
    if (percentage <= 80) return 'Good';
    if (percentage <= 100) return 'Acceptable';
    return 'Excessive';
  } else {
    if (percentage >= 100) return 'Met';
    if (percentage >= 75) return 'Adequate';
    return 'Low';
  }
}

