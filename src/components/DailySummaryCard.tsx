import React from 'react';
import { NutritionalData } from '@/types/nutrition';
import NutritionCard from './NutritionCard';

interface DailySummaryCardProps {
  totals: NutritionalData;
  totalEntries: number;
  date: string;
}

export default function DailySummaryCard({ 
  totals, 
  totalEntries, 
  date 
}: DailySummaryCardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Daily Summary
          </h2>
          <div className="text-sm text-gray-600">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          {totalEntries} {totalEntries === 1 ? 'entry' : 'entries'} for this day
        </p>
      </div>

      <NutritionCard nutritionalData={totals} />
    </div>
  );
}

