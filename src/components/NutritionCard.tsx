import React from 'react';
import { NutritionalData } from '@/types/nutrition';

interface NutritionItemProps {
  title: string;
  value: number | undefined;
  unit: string;
  color?: string;
}

function NutritionItem({ title, value, unit, color = '#3498db' }: NutritionItemProps) {
  if (value === undefined || value === null) {
    return null;
  }

  return (
    <div className="flex items-center py-3 border-b border-gray-200 last:border-0">
      <div
        className="w-1 h-10 rounded mr-4"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 flex justify-between items-center">
        <span className="text-base text-gray-800">{title}</span>
        <span className="text-base font-semibold text-gray-800">
          {value.toFixed(value < 1 ? 2 : 0)} {unit}
        </span>
      </div>
    </div>
  );
}

interface NutritionCardProps {
  nutritionalData: NutritionalData;
}

export default function NutritionCard({ nutritionalData }: NutritionCardProps) {
  const macroColor = '#3498db';
  const microColor = '#9b59b6';
  const calorieColor = '#e74c3c';

  return (
    <div className="w-full space-y-5">
      {/* Calories - Highlighted */}
      {nutritionalData.calories !== undefined && (
        <div className="bg-white rounded-xl p-5 shadow-lg">
          <div className="flex items-center mb-2">
            <div
              className="w-1 h-12 rounded mr-4"
              style={{ backgroundColor: calorieColor }}
            />
            <div className="flex-1">
              <p className="text-base text-gray-600 mb-1">Calories</p>
              <p className="text-3xl font-bold text-gray-800">
                {nutritionalData.calories.toFixed(0)} kcal
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Macronutrients */}
      <div className="space-y-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">Macronutrients</h2>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <NutritionItem
            title="Protein"
            value={nutritionalData.protein}
            unit="g"
            color={macroColor}
          />
          <NutritionItem
            title="Carbohydrates"
            value={nutritionalData.carbohydrates}
            unit="g"
            color={macroColor}
          />
          <NutritionItem
            title="Fat"
            value={nutritionalData.fat}
            unit="g"
            color={macroColor}
          />
        </div>
      </div>

      {/* Micronutrients */}
      <div className="space-y-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">Other Nutrients</h2>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <NutritionItem
            title="Fiber"
            value={nutritionalData.fiber}
            unit="g"
            color={microColor}
          />
          <NutritionItem
            title="Sugar"
            value={nutritionalData.sugar}
            unit="g"
            color={microColor}
          />
          <NutritionItem
            title="Sodium"
            value={nutritionalData.sodium}
            unit="mg"
            color={microColor}
          />
        </div>
      </div>

      {/* Vitamins */}
      {nutritionalData.vitamins && Object.values(nutritionalData.vitamins).some(v => v !== undefined && v !== null) && (
        <div className="space-y-0">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">Vitamins</h2>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <NutritionItem
              title="Vitamin A"
              value={nutritionalData.vitamins.vitaminA}
              unit="mcg RAE"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin B1 (Thiamine)"
              value={nutritionalData.vitamins.vitaminB1}
              unit="mg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin B2 (Riboflavin)"
              value={nutritionalData.vitamins.vitaminB2}
              unit="mg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin B3 (Niacin)"
              value={nutritionalData.vitamins.vitaminB3}
              unit="mg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin B6"
              value={nutritionalData.vitamins.vitaminB6}
              unit="mg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin B12"
              value={nutritionalData.vitamins.vitaminB12}
              unit="mcg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin C"
              value={nutritionalData.vitamins.vitaminC}
              unit="mg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin D"
              value={nutritionalData.vitamins.vitaminD}
              unit="mcg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin E"
              value={nutritionalData.vitamins.vitaminE}
              unit="mg"
              color="#f39c12"
            />
            <NutritionItem
              title="Vitamin K"
              value={nutritionalData.vitamins.vitaminK}
              unit="mcg"
              color="#f39c12"
            />
            <NutritionItem
              title="Folate"
              value={nutritionalData.vitamins.folate}
              unit="mcg"
              color="#f39c12"
            />
          </div>
        </div>
      )}

      {/* Minerals */}
      {nutritionalData.minerals && Object.values(nutritionalData.minerals).some(m => m !== undefined && m !== null) && (
        <div className="space-y-0">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">Minerals</h2>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <NutritionItem
              title="Calcium"
              value={nutritionalData.minerals.calcium}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Iron"
              value={nutritionalData.minerals.iron}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Magnesium"
              value={nutritionalData.minerals.magnesium}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Phosphorus"
              value={nutritionalData.minerals.phosphorus}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Potassium"
              value={nutritionalData.minerals.potassium}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Zinc"
              value={nutritionalData.minerals.zinc}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Copper"
              value={nutritionalData.minerals.copper}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Manganese"
              value={nutritionalData.minerals.manganese}
              unit="mg"
              color="#16a085"
            />
            <NutritionItem
              title="Selenium"
              value={nutritionalData.minerals.selenium}
              unit="mcg"
              color="#16a085"
            />
          </div>
        </div>
      )}

      {/* Meal Type */}
      {nutritionalData.meal_type && (
        <div className="bg-white rounded-xl p-4 shadow flex items-center">
          <span className="text-base text-gray-600 mr-2">Meal Type:</span>
          <span className="text-base font-semibold text-gray-800 capitalize">
            {nutritionalData.meal_type}
          </span>
        </div>
      )}

      {/* Food Items */}
      {nutritionalData.food_items && nutritionalData.food_items.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-base font-semibold text-gray-800 mb-3">Food Items:</p>
          <div className="flex flex-wrap gap-2">
            {nutritionalData.food_items.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {nutritionalData.description && (
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-base font-semibold text-gray-800 mb-2">Description:</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {nutritionalData.description}
          </p>
        </div>
      )}
    </div>
  );
}
