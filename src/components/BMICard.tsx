'use client';

import { getBMICategoryInfo } from '@/data/whoBMIStandards';

interface BMICardProps {
  heightCm: number;
  weightKg: number;
  ageYears: number;
  sex: 'male' | 'female' | 'other';
  name?: string;
  isParent?: boolean;
  className?: string;
}

/**
 * BMI Card component with WHO color coding
 * Shows BMI value, category, and color-coded indicator
 */
export function BMICard({
  heightCm,
  weightKg,
  ageYears,
  sex,
  name,
  isParent = false,
  className = '',
}: BMICardProps) {
  const bmiInfo = getBMICategoryInfo(heightCm, weightKg, ageYears, sex);
  const { bmi, categoryInfo, percentile, isChild } = bmiInfo;

  return (
    <div
      className={`rounded-lg border-2 p-4 transition-all hover:shadow-md ${categoryInfo.bgColor} border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          {name && (
            <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
          )}
          <p className="text-sm text-gray-600">
            {isParent ? 'Parent' : `Child, ${ageYears} years old`}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color} bg-white/50`}>
          {categoryInfo.label}
        </div>
      </div>

      {/* BMI Value */}
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            {bmi.toFixed(1)}
          </span>
          <span className="text-sm text-gray-600">kg/m²</span>
        </div>
        {!isParent && percentile !== undefined && (
          <p className="text-sm text-gray-600 mt-1">
            {percentile.toFixed(0)}th percentile for age and sex
          </p>
        )}
      </div>

      {/* Measurements */}
      <div className="flex gap-4 text-sm text-gray-700 mb-3 pb-3 border-b border-gray-300">
        <div>
          <span className="font-medium">Height:</span> {heightCm.toFixed(1)} cm
        </div>
        <div>
          <span className="font-medium">Weight:</span> {weightKg.toFixed(1)} kg
        </div>
      </div>

      {/* Category Info */}
      <div className="space-y-2">
        <div className="text-sm">
          <p className="font-medium text-gray-900 mb-1">
            {categoryInfo.description}
          </p>
          <p className="text-gray-700">{categoryInfo.recommendation}</p>
        </div>
      </div>

      {/* WHO Badge */}
      <div className="mt-3 pt-3 border-t border-gray-300">
        <p className="text-xs text-gray-500">
          Based on WHO {isChild ? 'BMI-for-age' : 'BMI'} standards
        </p>
      </div>
    </div>
  );
}


