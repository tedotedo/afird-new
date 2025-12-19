'use client';

import { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import DailySummaryCard from '@/components/DailySummaryCard';
import FoodEntryList from '@/components/FoodEntryList';
import NutritionComparisonTable from '@/components/NutritionComparisonTable';
import NutritionOverviewDashboard from '@/components/NutritionOverviewDashboard';
import { useChildContext } from '@/contexts/ChildContext';
import { getRecommendations } from '@/data/whoRecommendations';
import { calculateAge } from '@/utils/dateUtils';
import Link from 'next/link';

export default function SummaryPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedChild } = useChildContext();

  const fetchSummary = async (date: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = selectedChild 
        ? `/api/daily-summary?date=${date}&childId=${selectedChild.id}`
        : `/api/daily-summary?date=${date}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch daily summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary(selectedDate);
  }, [selectedDate, selectedChild]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Daily Summary</h1>
              {selectedChild && (
                <p className="text-sm text-blue-600 mt-1">
                  Showing summary for {selectedChild.name}
                </p>
              )}
              {!selectedChild && (
                <p className="text-sm text-gray-600 mt-1">
                  Showing your summary (parent)
                </p>
              )}
            </div>

            {/* Supplements Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-sm">
              <p className="text-blue-700">
                <span className="font-semibold">Note:</span> Nutrition data shows food entries only. 
                Supplements are not included.
              </p>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm">
              <p className="text-yellow-800">
                <span className="font-semibold">Disclaimer:</span> Nutritional analyses are estimates based on AI and food databases. 
                Considerable inaccuracies may occur. This tool is for tracking purposes only. 
                Always seek professional medical advice for any health or dietary concerns.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex gap-3">
                <button
                  onClick={goToPreviousDay}
                  className="flex-1 sm:flex-none px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-50 transition text-center"
                >
                  ← Previous
                </button>
                
                <button
                  onClick={goToNextDay}
                  className="flex-1 sm:flex-none px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-50 transition text-center"
                >
                  Next →
                </button>
              </div>

              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <button
                onClick={goToToday}
                className="w-full sm:w-auto px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center"
              >
                Today
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

          {!loading && !error && summary && (
            <>
              {/* Visual Overview Dashboard - NEW */}
              {summary.totalEntries > 0 && (
                <div className="mt-8">
                  <NutritionOverviewDashboard
                    totals={summary.totals}
                    recommendations={
                      selectedChild 
                        ? getRecommendations(calculateAge(selectedChild.date_of_birth), selectedChild.sex)
                        : getRecommendations(30, 'male')
                    }
                  />
                </div>
              )}

              {/* Daily Summary Card - Basic Totals */}
              <div className="mt-8">
                <DailySummaryCard
                  totals={summary.totals}
                  totalEntries={summary.totalEntries}
                  date={summary.date}
                />
              </div>

              {/* Section Divider with CTA */}
              {summary.totalEntries > 0 && (
                <div className="mt-12 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Detailed Nutritional Analysis
                        </h2>
                        <p className="text-gray-600">
                          Compare against WHO recommendations and learn more about each nutrient
                        </p>
                      </div>
                      <Link
                        href="/nutrition-info"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition whitespace-nowrap"
                      >
                        Learn About Nutrients →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* WHO Comparison Table - Detailed */}
              {summary.totalEntries > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Nutritional Intake vs WHO Recommendations
                  </h2>
                  <NutritionComparisonTable
                    totals={summary.totals}
                    recommendations={
                      selectedChild 
                        ? getRecommendations(calculateAge(selectedChild.date_of_birth), selectedChild.sex)
                        : getRecommendations(30, 'male')
                    }
                    age={selectedChild ? calculateAge(selectedChild.date_of_birth) : 30}
                    sex={selectedChild ? selectedChild.sex : 'adult'}
                  />
                </div>
              )}

              {/* Food Entries List */}
              {summary.entries && summary.entries.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Entries for this day</h2>
                  <FoodEntryList entries={summary.entries} />
                </div>
              )}
            </>
          )}

          {!loading && !error && summary && summary.totalEntries === 0 && (
            <div className="bg-white rounded-xl p-8 text-center shadow">
              <p className="text-gray-500 text-lg">No entries for this date</p>
              <p className="text-gray-400 text-sm mt-2">
                Try selecting a different date or add some food entries!
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

