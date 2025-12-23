import { NutritionalData } from '@/types/nutrition';
import { NutritionRecommendation, calculatePercentage } from '@/data/whoRecommendations';

export interface NutrientStatus {
  name: string;
  actual: number;
  recommended: number;
  percentage: number;
  status: 'met' | 'adequate' | 'low' | 'excessive';
  isMaxValue?: boolean;
}

export interface CategoryScore {
  category: string;
  score: number; // 0-100
  count: {
    met: number;
    adequate: number;
    low: number;
    excessive: number;
  };
}

export interface NutritionAnalysis {
  overallScore: number; // 0-100
  categories: {
    energy: CategoryScore;
    macronutrients: CategoryScore;
    vitamins: CategoryScore;
    minerals: CategoryScore;
  };
  topDeficiencies: NutrientStatus[];
  topExcesses: NutrientStatus[];
  trafficLight: {
    green: number;
    yellow: number;
    red: number;
    total: number;
  };
}

/**
 * Determine nutrient status based on percentage
 */
function getNutrientStatus(percentage: number, isMaxValue: boolean = false): 'met' | 'adequate' | 'low' | 'excessive' {
  if (isMaxValue) {
    if (percentage <= 80) return 'met';
    if (percentage <= 100) return 'adequate';
    return 'excessive';
  } else {
    if (percentage >= 100) return 'met';
    if (percentage >= 75) return 'adequate';
    return 'low';
  }
}

/**
 * Calculate score for a nutrient (0-100)
 */
function calculateNutrientScore(percentage: number, isMaxValue: boolean = false): number {
  if (isMaxValue) {
    // For max values, score decreases as percentage increases above 100%
    if (percentage <= 80) return 100;
    if (percentage <= 100) return 85;
    if (percentage <= 120) return 70;
    if (percentage <= 150) return 50;
    return 30;
  } else {
    // For min values, score increases as we approach 100%
    if (percentage >= 100) return 100;
    if (percentage >= 90) return 95;
    if (percentage >= 75) return 85;
    if (percentage >= 50) return 60;
    if (percentage >= 25) return 40;
    return 20;
  }
}

/**
 * Analyze all nutrients and return comprehensive analysis
 */
export function analyzeNutrition(
  totals: NutritionalData,
  recommendations: NutritionRecommendation
): NutritionAnalysis {
  const allNutrients: NutrientStatus[] = [];

  // Energy and Macronutrients
  const energyMacros = [
    { name: 'Energy', actual: totals.calories, recommended: recommendations.energy, isMaxValue: false },
    { name: 'Protein', actual: totals.protein, recommended: recommendations.protein, isMaxValue: false },
    { name: 'Carbohydrates', actual: totals.carbohydrates, recommended: recommendations.carbohydrates, isMaxValue: false },
    { name: 'Fat', actual: totals.fat, recommended: recommendations.fat, isMaxValue: false },
    { name: 'Fiber', actual: totals.fiber, recommended: recommendations.fiber, isMaxValue: false },
    { name: 'Sugar', actual: totals.sugar, recommended: recommendations.sugar, isMaxValue: true },
    { name: 'Sodium', actual: totals.sodium, recommended: recommendations.sodium, isMaxValue: true },
  ];

  energyMacros.forEach(nutrient => {
    if (nutrient.actual !== undefined) {
      const percentage = calculatePercentage(nutrient.actual, nutrient.recommended);
      allNutrients.push({
        name: nutrient.name,
        actual: nutrient.actual,
        recommended: nutrient.recommended,
        percentage,
        status: getNutrientStatus(percentage, nutrient.isMaxValue),
        isMaxValue: nutrient.isMaxValue,
      });
    }
  });

  // Vitamins
  const vitamins = [
    { name: 'Vitamin A', actual: totals.vitamins?.vitaminA, recommended: recommendations.vitaminA },
    { name: 'Vitamin B1', actual: totals.vitamins?.vitaminB1, recommended: recommendations.vitaminB1 },
    { name: 'Vitamin B2', actual: totals.vitamins?.vitaminB2, recommended: recommendations.vitaminB2 },
    { name: 'Vitamin B3', actual: totals.vitamins?.vitaminB3, recommended: recommendations.vitaminB3 },
    { name: 'Vitamin B6', actual: totals.vitamins?.vitaminB6, recommended: recommendations.vitaminB6 },
    { name: 'Vitamin B12', actual: totals.vitamins?.vitaminB12, recommended: recommendations.vitaminB12 },
    { name: 'Vitamin C', actual: totals.vitamins?.vitaminC, recommended: recommendations.vitaminC },
    { name: 'Vitamin D', actual: totals.vitamins?.vitaminD, recommended: recommendations.vitaminD },
    { name: 'Vitamin E', actual: totals.vitamins?.vitaminE, recommended: recommendations.vitaminE },
    { name: 'Vitamin K', actual: totals.vitamins?.vitaminK, recommended: recommendations.vitaminK },
    { name: 'Folate', actual: totals.vitamins?.folate, recommended: recommendations.folate },
  ];

  vitamins.forEach(nutrient => {
    if (nutrient.actual !== undefined) {
      const percentage = calculatePercentage(nutrient.actual, nutrient.recommended);
      allNutrients.push({
        name: nutrient.name,
        actual: nutrient.actual,
        recommended: nutrient.recommended,
        percentage,
        status: getNutrientStatus(percentage, false),
      });
    }
  });

  // Minerals
  const minerals = [
    { name: 'Calcium', actual: totals.minerals?.calcium, recommended: recommendations.calcium },
    { name: 'Iron', actual: totals.minerals?.iron, recommended: recommendations.iron },
    { name: 'Magnesium', actual: totals.minerals?.magnesium, recommended: recommendations.magnesium },
    { name: 'Phosphorus', actual: totals.minerals?.phosphorus, recommended: recommendations.phosphorus },
    { name: 'Potassium', actual: totals.minerals?.potassium, recommended: recommendations.potassium },
    { name: 'Zinc', actual: totals.minerals?.zinc, recommended: recommendations.zinc },
    { name: 'Copper', actual: totals.minerals?.copper, recommended: recommendations.copper },
    { name: 'Manganese', actual: totals.minerals?.manganese, recommended: recommendations.manganese },
    { name: 'Selenium', actual: totals.minerals?.selenium, recommended: recommendations.selenium },
  ];

  minerals.forEach(nutrient => {
    if (nutrient.actual !== undefined) {
      const percentage = calculatePercentage(nutrient.actual, nutrient.recommended);
      allNutrients.push({
        name: nutrient.name,
        actual: nutrient.actual,
        recommended: nutrient.recommended,
        percentage,
        status: getNutrientStatus(percentage, false),
      });
    }
  });

  // Calculate category scores
  const energyScore = calculateCategoryScore(energyMacros.filter(n => n.name === 'Energy'), allNutrients);
  const macroScore = calculateCategoryScore(
    energyMacros.filter(n => ['Protein', 'Carbohydrates', 'Fat', 'Fiber', 'Sugar', 'Sodium'].includes(n.name)),
    allNutrients
  );
  const vitaminScore = calculateCategoryScore(vitamins, allNutrients);
  const mineralScore = calculateCategoryScore(minerals, allNutrients);

  // Calculate overall score
  const overallScore = Math.round(
    (energyScore.score + macroScore.score + vitaminScore.score + mineralScore.score) / 4
  );

  // Get top deficiencies and excesses
  const deficiencies = allNutrients
    .filter(n => n.status === 'low' && !n.isMaxValue)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  const excesses = allNutrients
    .filter(n => (n.status === 'excessive' && n.isMaxValue) || (n.percentage > 150 && !n.isMaxValue))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  // Calculate traffic light counts
  const trafficLight = {
    green: allNutrients.filter(n => n.status === 'met').length,
    yellow: allNutrients.filter(n => n.status === 'adequate').length,
    red: allNutrients.filter(n => n.status === 'low' || n.status === 'excessive').length,
    total: allNutrients.length,
  };

  return {
    overallScore,
    categories: {
      energy: energyScore,
      macronutrients: macroScore,
      vitamins: vitaminScore,
      minerals: mineralScore,
    },
    topDeficiencies: deficiencies,
    topExcesses: excesses,
    trafficLight,
  };
}

/**
 * Calculate score for a category of nutrients
 */
function calculateCategoryScore(
  nutrients: Array<{ name: string; actual: number | undefined; recommended: number; isMaxValue?: boolean }>,
  allNutrients: NutrientStatus[]
): CategoryScore {
  const categoryNutrients = allNutrients.filter(n =>
    nutrients.some(nu => nu.name === n.name)
  );

  if (categoryNutrients.length === 0) {
    return {
      category: '',
      score: 0,
      count: { met: 0, adequate: 0, low: 0, excessive: 0 },
    };
  }

  // Calculate average score
  const scores = categoryNutrients.map(n =>
    calculateNutrientScore(n.percentage, n.isMaxValue)
  );
  const avgScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);

  // Count statuses
  const count = {
    met: categoryNutrients.filter(n => n.status === 'met').length,
    adequate: categoryNutrients.filter(n => n.status === 'adequate').length,
    low: categoryNutrients.filter(n => n.status === 'low').length,
    excessive: categoryNutrients.filter(n => n.status === 'excessive').length,
  };

  return {
    category: '',
    score: avgScore,
    count,
  };
}

/**
 * Get color class based on score
 */
export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

/**
 * Get score label
 */
export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Fair';
  if (score >= 60) return 'Needs Improvement';
  return 'Poor';
}


