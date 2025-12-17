'use client';

import { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import DailySummaryCard from '@/components/DailySummaryCard';
import FoodEntryList from '@/components/FoodEntryList';
import { useFoodEntries } from '@/hooks/useFoodEntries';

export default function SummaryPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (date: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/daily-summary?date=${date}`);
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
  }, [selectedDate]);

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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Daily Summary</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={goToPreviousDay}
                className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition"
              >
                ← Previous
              </button>
              
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <button
                onClick={goToNextDay}
                className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition"
              >
                Next →
              </button>
              
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
              <DailySummaryCard
                totals={summary.totals}
                totalEntries={summary.totalEntries}
                date={summary.date}
              />

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

