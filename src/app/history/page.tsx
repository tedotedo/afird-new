'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import FoodEntryList from '@/components/FoodEntryList';
import { useFoodEntries } from '@/hooks/useFoodEntries';

const AddAnotherButton = () => (
  <Link
    href="/"
    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow transition"
  >
    Add Another Entry
  </Link>
);

export default function HistoryPage() {
  const [mealTypeFilter, setMealTypeFilter] = useState<string>('all');
  const { entries, loading, error, deleteEntry } = useFoodEntries();

  const handleDelete = async (entryId: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(entryId);
      } catch (err) {
        alert('Failed to delete entry');
      }
    }
  };

  const filteredEntries = mealTypeFilter === 'all'
    ? entries
    : entries.filter(entry => entry.meal_type === mealTypeFilter);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Food History</h1>
              <AddAnotherButton />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMealTypeFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mealTypeFilter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMealTypeFilter('breakfast')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mealTypeFilter === 'breakfast'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Breakfast
              </button>
              <button
                onClick={() => setMealTypeFilter('lunch')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mealTypeFilter === 'lunch'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Lunch
              </button>
              <button
                onClick={() => setMealTypeFilter('dinner')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mealTypeFilter === 'dinner'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dinner
              </button>
              <button
                onClick={() => setMealTypeFilter('snack')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  mealTypeFilter === 'snack'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Snack
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Showing {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
              </p>
              <FoodEntryList 
                entries={filteredEntries} 
                onDelete={handleDelete}
                showDelete={true}
              />
              <div className="flex justify-center mt-6">
                <AddAnotherButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

