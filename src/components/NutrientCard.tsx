import React from 'react';
import { NutrientInfo } from '@/data/nutritionInfo';

interface NutrientCardProps {
  nutrient: NutrientInfo;
  onClick: () => void;
}

export default function NutrientCard({ nutrient, onClick }: NutrientCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vitamin':
        return 'from-green-500 to-green-600';
      case 'mineral':
        return 'from-purple-500 to-purple-600';
      case 'macronutrient':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vitamin':
        return '🍊';
      case 'mineral':
        return '💎';
      case 'macronutrient':
        return '🥗';
      default:
        return '📊';
    }
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left w-full group border border-gray-200 hover:border-gray-300"
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(nutrient.category)} text-white text-2xl mb-4`}>
        {getCategoryIcon(nutrient.category)}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {nutrient.name}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {nutrient.function}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {nutrient.foodSources.slice(0, 3).map((source, idx) => (
          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {source}
          </span>
        ))}
        {nutrient.foodSources.length > 3 && (
          <span className="text-xs text-gray-500">
            +{nutrient.foodSources.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
          nutrient.category === 'vitamin' ? 'bg-green-100 text-green-800' :
          nutrient.category === 'mineral' ? 'bg-purple-100 text-purple-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {nutrient.category}
        </span>
        <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
          Learn more →
        </span>
      </div>
    </button>
  );
}


