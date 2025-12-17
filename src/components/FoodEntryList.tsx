'use client';

import React from 'react';
import { FoodEntry } from '@/services/foodEntryService';
import { formatDateTime } from '@/utils/dateUtils';
import Image from 'next/image';

interface FoodEntryListProps {
  entries: FoodEntry[];
  onDelete?: (entryId: string) => void;
  showDelete?: boolean;
}

export default function FoodEntryList({ 
  entries, 
  onDelete, 
  showDelete = false 
}: FoodEntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No food entries yet</p>
        <p className="text-gray-400 text-sm mt-2">
          Start by taking a photo of your food!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="flex">
            <div className="w-32 h-32 flex-shrink-0 relative">
              <img
                src={entry.image_url}
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {entry.meal_type && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded capitalize">
                        {entry.meal_type}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {formatDateTime(new Date(entry.date_time))}
                    </span>
                  </div>
                  {entry.nutritional_data.food_items && 
                   entry.nutritional_data.food_items.length > 0 && (
                    <p className="text-sm text-gray-600 mb-2">
                      {entry.nutritional_data.food_items.join(', ')}
                    </p>
                  )}
                  <div className="flex gap-4 text-sm">
                    {entry.nutritional_data.calories !== undefined && (
                      <span className="text-gray-700">
                        <span className="font-semibold">{entry.nutritional_data.calories.toFixed(0)}</span> kcal
                      </span>
                    )}
                    {entry.nutritional_data.protein !== undefined && (
                      <span className="text-gray-700">
                        <span className="font-semibold">{entry.nutritional_data.protein.toFixed(1)}g</span> protein
                      </span>
                    )}
                    {entry.nutritional_data.carbohydrates !== undefined && (
                      <span className="text-gray-700">
                        <span className="font-semibold">{entry.nutritional_data.carbohydrates.toFixed(1)}g</span> carbs
                      </span>
                    )}
                  </div>
                </div>
                {showDelete && onDelete && (
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

