import React from 'react';
import { NutritionalData } from '@/types/nutrition';
import { 
  NutritionRecommendation, 
  calculatePercentage, 
  getStatusColor, 
  getStatusLabel 
} from '@/data/whoRecommendations';

interface NutritionComparisonTableProps {
  totals: NutritionalData;
  recommendations: NutritionRecommendation;
  age: number;
  sex: string;
}

interface NutrientRow {
  name: string;
  actual: number | undefined;
  recommended: number;
  unit: string;
  isMaxValue?: boolean; // True for nutrients where less is better
}

export default function NutritionComparisonTable({
  totals,
  recommendations,
  age,
  sex,
}: NutritionComparisonTableProps) {
  const macronutrients: NutrientRow[] = [
    { name: 'Energy', actual: totals.calories, recommended: recommendations.energy, unit: 'kcal' },
    { name: 'Protein', actual: totals.protein, recommended: recommendations.protein, unit: 'g' },
    { name: 'Carbohydrates', actual: totals.carbohydrates, recommended: recommendations.carbohydrates, unit: 'g' },
    { name: 'Fat', actual: totals.fat, recommended: recommendations.fat, unit: 'g' },
    { name: 'Fiber', actual: totals.fiber, recommended: recommendations.fiber, unit: 'g' },
    { name: 'Sugar', actual: totals.sugar, recommended: recommendations.sugar, unit: 'g', isMaxValue: true },
    { name: 'Sodium', actual: totals.sodium, recommended: recommendations.sodium, unit: 'mg', isMaxValue: true },
  ];

  const vitamins: NutrientRow[] = [
    { name: 'Vitamin A', actual: totals.vitamins?.vitaminA, recommended: recommendations.vitaminA, unit: 'mcg' },
    { name: 'Vitamin B1', actual: totals.vitamins?.vitaminB1, recommended: recommendations.vitaminB1, unit: 'mg' },
    { name: 'Vitamin B2', actual: totals.vitamins?.vitaminB2, recommended: recommendations.vitaminB2, unit: 'mg' },
    { name: 'Vitamin B3', actual: totals.vitamins?.vitaminB3, recommended: recommendations.vitaminB3, unit: 'mg' },
    { name: 'Vitamin B6', actual: totals.vitamins?.vitaminB6, recommended: recommendations.vitaminB6, unit: 'mg' },
    { name: 'Vitamin B12', actual: totals.vitamins?.vitaminB12, recommended: recommendations.vitaminB12, unit: 'mcg' },
    { name: 'Vitamin C', actual: totals.vitamins?.vitaminC, recommended: recommendations.vitaminC, unit: 'mg' },
    { name: 'Vitamin D', actual: totals.vitamins?.vitaminD, recommended: recommendations.vitaminD, unit: 'mcg' },
    { name: 'Vitamin E', actual: totals.vitamins?.vitaminE, recommended: recommendations.vitaminE, unit: 'mg' },
    { name: 'Vitamin K', actual: totals.vitamins?.vitaminK, recommended: recommendations.vitaminK, unit: 'mcg' },
    { name: 'Folate', actual: totals.vitamins?.folate, recommended: recommendations.folate, unit: 'mcg' },
  ];

  const minerals: NutrientRow[] = [
    { name: 'Calcium', actual: totals.minerals?.calcium, recommended: recommendations.calcium, unit: 'mg' },
    { name: 'Iron', actual: totals.minerals?.iron, recommended: recommendations.iron, unit: 'mg' },
    { name: 'Magnesium', actual: totals.minerals?.magnesium, recommended: recommendations.magnesium, unit: 'mg' },
    { name: 'Phosphorus', actual: totals.minerals?.phosphorus, recommended: recommendations.phosphorus, unit: 'mg' },
    { name: 'Potassium', actual: totals.minerals?.potassium, recommended: recommendations.potassium, unit: 'mg' },
    { name: 'Zinc', actual: totals.minerals?.zinc, recommended: recommendations.zinc, unit: 'mg' },
    { name: 'Copper', actual: totals.minerals?.copper, recommended: recommendations.copper, unit: 'mg' },
    { name: 'Manganese', actual: totals.minerals?.manganese, recommended: recommendations.manganese, unit: 'mg' },
    { name: 'Selenium', actual: totals.minerals?.selenium, recommended: recommendations.selenium, unit: 'mcg' },
  ];

  const renderNutrientRow = (nutrient: NutrientRow) => {
    const percentage = calculatePercentage(nutrient.actual, nutrient.recommended);
    const statusColor = getStatusColor(percentage, nutrient.isMaxValue);
    const statusLabel = getStatusLabel(percentage, nutrient.isMaxValue);

    return (
      <tr key={nutrient.name} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="py-3 px-4 text-sm font-medium text-gray-900">{nutrient.name}</td>
        <td className="py-3 px-4 text-sm text-gray-700 text-right">
          {nutrient.actual !== undefined ? `${nutrient.actual.toFixed(1)} ${nutrient.unit}` : '—'}
        </td>
        <td className="py-3 px-4 text-sm text-gray-700 text-right">
          {nutrient.recommended.toFixed(1)} {nutrient.unit}
        </td>
        <td className="py-3 px-4 text-sm text-right">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {percentage}%
          </span>
        </td>
        <td className="py-3 px-4 text-sm text-right">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>
            {statusLabel}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              WHO Recommended Daily Intake Comparison
            </h3>
            <p className="text-xs text-blue-700 mt-1">
              Based on age {age} years, {sex}. Values compared against WHO/FAO (World Health Organization / Food and Agriculture Organization) guidelines.
            </p>
            <div className="bg-white/50 rounded p-2 mt-2 text-xs text-blue-800">
              <p className="font-semibold mb-1">Acronym Guide:</p>
              <ul className="space-y-0.5 ml-2">
                <li>• <strong>RDI</strong> = Recommended Daily Intake (daily nutrition targets)</li>
                <li>• <strong>WHO</strong> = World Health Organization</li>
                <li>• <strong>FAO</strong> = Food and Agriculture Organization</li>
                <li>• <strong>RAE</strong> = Retinol Activity Equivalents (for Vitamin A)</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                Met/Good
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mr-1"></span>
                Adequate/Acceptable
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-100 text-red-800">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                Low/Excessive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrients */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
          <h3 className="text-lg font-bold text-white">Macronutrients & Energy</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Nutrient
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actual
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Recommended
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <span title="Percentage of Recommended Daily Intake">% of RDI</span>
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {macronutrients.map(renderNutrientRow)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vitamins */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
          <h3 className="text-lg font-bold text-white">Vitamins</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Vitamin
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actual
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Recommended
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <span title="Percentage of Recommended Daily Intake">% of RDI</span>
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitamins.map(renderNutrientRow)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Minerals */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
          <h3 className="text-lg font-bold text-white">Minerals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Mineral
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actual
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Recommended
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <span title="Percentage of Recommended Daily Intake">% of RDI</span>
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {minerals.map(renderNutrientRow)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs text-gray-600 mb-2">
          <strong>Important Information:</strong>
        </p>
        <ul className="text-xs text-gray-600 space-y-1 ml-3">
          <li>• <strong>RDI</strong> (Recommended Daily Intake): Daily nutrition targets set by health organizations</li>
          <li>• <strong>kcal</strong>: Kilocalories (commonly called "calories"), a unit of energy</li>
          <li>• <strong>g</strong>: Grams, a unit of weight</li>
          <li>• <strong>mg</strong>: Milligrams, 1/1000th of a gram</li>
          <li>• <strong>mcg</strong>: Micrograms, 1/1,000,000th of a gram</li>
          <li>• These values are general guidelines and may vary based on individual health conditions, activity levels, and specific nutritional needs</li>
          <li>• Always consult with a healthcare provider or registered dietitian for personalized nutrition advice</li>
        </ul>
      </div>
    </div>
  );
}

