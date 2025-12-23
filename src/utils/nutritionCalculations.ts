import { NutritionalData, Vitamins, Minerals } from '@/types/nutrition';

/**
 * Aggregate multiple nutritional data objects into totals
 */
export function aggregateNutritionData(
  entries: NutritionalData[]
): NutritionalData {
  const aggregated: NutritionalData = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    vitamins: {},
    minerals: {},
  };

  entries.forEach((entry) => {
    // Sum basic nutrients
    if (entry.calories !== undefined) {
      aggregated.calories = (aggregated.calories || 0) + entry.calories;
    }
    if (entry.protein !== undefined) {
      aggregated.protein = (aggregated.protein || 0) + entry.protein;
    }
    if (entry.carbohydrates !== undefined) {
      aggregated.carbohydrates = (aggregated.carbohydrates || 0) + entry.carbohydrates;
    }
    if (entry.fat !== undefined) {
      aggregated.fat = (aggregated.fat || 0) + entry.fat;
    }
    if (entry.fiber !== undefined) {
      aggregated.fiber = (aggregated.fiber || 0) + entry.fiber;
    }
    if (entry.sugar !== undefined) {
      aggregated.sugar = (aggregated.sugar || 0) + entry.sugar;
    }
    if (entry.sodium !== undefined) {
      aggregated.sodium = (aggregated.sodium || 0) + entry.sodium;
    }

    // Sum vitamins
    if (entry.vitamins) {
      if (!aggregated.vitamins) aggregated.vitamins = {};
      const v = entry.vitamins;
      aggregated.vitamins.vitaminA = (aggregated.vitamins.vitaminA || 0) + (v.vitaminA || 0);
      aggregated.vitamins.vitaminB1 = (aggregated.vitamins.vitaminB1 || 0) + (v.vitaminB1 || 0);
      aggregated.vitamins.vitaminB2 = (aggregated.vitamins.vitaminB2 || 0) + (v.vitaminB2 || 0);
      aggregated.vitamins.vitaminB3 = (aggregated.vitamins.vitaminB3 || 0) + (v.vitaminB3 || 0);
      aggregated.vitamins.vitaminB6 = (aggregated.vitamins.vitaminB6 || 0) + (v.vitaminB6 || 0);
      aggregated.vitamins.vitaminB12 = (aggregated.vitamins.vitaminB12 || 0) + (v.vitaminB12 || 0);
      aggregated.vitamins.vitaminC = (aggregated.vitamins.vitaminC || 0) + (v.vitaminC || 0);
      aggregated.vitamins.vitaminD = (aggregated.vitamins.vitaminD || 0) + (v.vitaminD || 0);
      aggregated.vitamins.vitaminE = (aggregated.vitamins.vitaminE || 0) + (v.vitaminE || 0);
      aggregated.vitamins.vitaminK = (aggregated.vitamins.vitaminK || 0) + (v.vitaminK || 0);
      aggregated.vitamins.folate = (aggregated.vitamins.folate || 0) + (v.folate || 0);
    }

    // Sum minerals
    if (entry.minerals) {
      if (!aggregated.minerals) aggregated.minerals = {};
      const m = entry.minerals;
      aggregated.minerals.calcium = (aggregated.minerals.calcium || 0) + (m.calcium || 0);
      aggregated.minerals.iron = (aggregated.minerals.iron || 0) + (m.iron || 0);
      aggregated.minerals.magnesium = (aggregated.minerals.magnesium || 0) + (m.magnesium || 0);
      aggregated.minerals.phosphorus = (aggregated.minerals.phosphorus || 0) + (m.phosphorus || 0);
      aggregated.minerals.potassium = (aggregated.minerals.potassium || 0) + (m.potassium || 0);
      aggregated.minerals.zinc = (aggregated.minerals.zinc || 0) + (m.zinc || 0);
      aggregated.minerals.copper = (aggregated.minerals.copper || 0) + (m.copper || 0);
      aggregated.minerals.manganese = (aggregated.minerals.manganese || 0) + (m.manganese || 0);
      aggregated.minerals.selenium = (aggregated.minerals.selenium || 0) + (m.selenium || 0);
    }
  });

  // Clean up zero values (optional - you might want to keep them)
  return aggregated;
}

/**
 * Calculate daily totals from food entries
 * @param entries - Array of food entries with nutritional_data
 */
export function calculateDailyTotals(entries: Array<{ nutritional_data: NutritionalData }>): NutritionalData {
  const nutritionData = entries.map(e => e.nutritional_data);
  return aggregateNutritionData(nutritionData);
}

/**
 * Filter entries by date range
 */
export function filterEntriesByDateRange<T extends { date_time: string }>(
  entries: T[],
  startDate: Date,
  endDate: Date
): T[] {
  return entries.filter((entry) => {
    const entryDate = new Date(entry.date_time);
    return entryDate >= startDate && entryDate <= endDate;
  });
}

/**
 * Filter entries by a specific date
 */
export function filterEntriesByDate<T extends { date_time: string }>(
  entries: T[],
  targetDate: Date
): T[] {
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  return filterEntriesByDateRange(entries, startOfDay, endOfDay);
}


