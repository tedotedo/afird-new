'use client';

import { getBMICategoryInfo } from '@/data/whoBMIStandards';

interface BMIBadgeProps {
  heightCm: number;
  weightKg: number;
  ageYears: number;
  sex: 'male' | 'female' | 'other';
  showPercentile?: boolean;
  className?: string;
}

/**
 * Compact BMI badge component with color coding
 * For inline display in lists and tables
 */
export function BMIBadge({
  heightCm,
  weightKg,
  ageYears,
  sex,
  showPercentile = false,
  className = '',
}: BMIBadgeProps) {
  const bmiInfo = getBMICategoryInfo(heightCm, weightKg, ageYears, sex);
  const { bmi, categoryInfo, percentile } = bmiInfo;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryInfo.color} ${categoryInfo.bgColor}`}
        title={`${categoryInfo.description} - ${categoryInfo.recommendation}`}
      >
        BMI: {bmi.toFixed(1)}
      </span>
      {showPercentile && percentile !== undefined && (
        <span className="text-xs text-gray-600">
          {percentile.toFixed(0)}th %ile
        </span>
      )}
    </div>
  );
}

