'use client';

import { useState, useEffect } from 'react';
import { useChildContext } from '@/contexts/ChildContext';
import AuthGuard from '@/components/AuthGuard';
import { GrowthTrendChart } from '@/components/GrowthTrendChart';
import { NutritionTrendChart } from '@/components/NutritionTrendChart';
import { format, subDays, subWeeks, subMonths, startOfWeek, endOfWeek } from 'date-fns';

type TimeRange = '1week' | '2weeks' | '1month' | '3months' | '6months' | 'custom';

export default function TrendsPage() {
  const { selectedChild } = useChildContext();
  const [timeRange, setTimeRange] = useState<TimeRange>('1month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [groupBy, setGroupBy] = useState<'day' | 'week'>('day');
  
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [nutritionData, setNutritionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate date range based on selection
  const getDateRange = () => {
    const now = new Date();
    let start: Date;
    let end: Date = now;

    switch (timeRange) {
      case '1week':
        start = subWeeks(now, 1);
        break;
      case '2weeks':
        start = subWeeks(now, 2);
        break;
      case '1month':
        start = subMonths(now, 1);
        break;
      case '3months':
        start = subMonths(now, 3);
        break;
      case '6months':
        start = subMonths(now, 6);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          start = new Date(customStartDate);
          end = new Date(customEndDate);
        } else {
          start = subMonths(now, 1);
        }
        break;
      default:
        start = subMonths(now, 1);
    }

    return {
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd'),
    };
  };

  useEffect(() => {
    fetchTrendsData();
  }, [selectedChild, timeRange, customStartDate, customEndDate, groupBy]);

  const fetchTrendsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { startDate, endDate } = getDateRange();

      // Fetch growth data
      const growthParams = new URLSearchParams({
        startDate,
        endDate,
      });
      if (selectedChild) {
        growthParams.append('childId', selectedChild.id);
      }

      const growthResponse = await fetch(`/api/trends/growth?${growthParams}`);
      const growthResult = await growthResponse.json();

      if (!growthResponse.ok) {
        throw new Error(growthResult.error || 'Failed to fetch growth data');
      }

      setGrowthData(growthResult.measurements || []);

      // Fetch nutrition data
      const nutritionParams = new URLSearchParams({
        startDate,
        endDate,
        groupBy,
      });
      if (selectedChild) {
        nutritionParams.append('childId', selectedChild.id);
      }

      const nutritionResponse = await fetch(`/api/trends/nutrition?${nutritionParams}`);
      const nutritionResult = await nutritionResponse.json();

      if (!nutritionResponse.ok) {
        throw new Error(nutritionResult.error || 'Failed to fetch nutrition data');
      }

      setNutritionData(nutritionResult.trends || []);
    } catch (err: any) {
      console.error('Error fetching trends:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading trends...</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Trends</h1>
            <p className="text-gray-600">
              Track growth and nutrition patterns over time
              {selectedChild && ' for the selected child'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Time Range Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Range
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1week">Last Week</option>
                  <option value="2weeks">Last 2 Weeks</option>
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Group By Selector (for nutrition) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Nutrition By
                </label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value as 'day' | 'week')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly Average</option>
                </select>
              </div>

              {/* Refresh Button */}
              <div className="flex items-end">
                <button
                  onClick={fetchTrendsData}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            {/* Custom Date Range */}
            {timeRange === 'custom' && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Growth Charts Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Growth Trends</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <GrowthTrendChart
                data={growthData}
                metric="height"
                title="Height Over Time"
                color="#10b981"
                unit="cm"
              />
              <GrowthTrendChart
                data={growthData}
                metric="weight"
                title="Weight Over Time"
                color="#f59e0b"
                unit="kg"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <GrowthTrendChart
                data={growthData}
                metric="bmi"
                title="BMI Over Time"
                color="#8b5cf6"
                unit="kg/m²"
              />
            </div>
          </div>

          {/* Nutrition Charts Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nutrition Trends</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* Macronutrients */}
              <NutritionTrendChart
                data={nutritionData}
                title="Macronutrients"
                metrics={[
                  { key: 'calories', label: 'Calories', color: '#ef4444', unit: 'kcal' },
                  { key: 'protein', label: 'Protein', color: '#3b82f6', unit: 'g' },
                  { key: 'carbs', label: 'Carbs', color: '#f59e0b', unit: 'g' },
                  { key: 'fat', label: 'Fat', color: '#8b5cf6', unit: 'g' },
                ]}
                showLegend={true}
              />

              {/* Fiber and Sugar */}
              <NutritionTrendChart
                data={nutritionData}
                title="Fiber & Sugar"
                metrics={[
                  { key: 'fiber', label: 'Fiber', color: '#10b981', unit: 'g' },
                  { key: 'sugar', label: 'Sugar', color: '#ec4899', unit: 'g' },
                ]}
                showLegend={true}
              />

              {/* Minerals */}
              <NutritionTrendChart
                data={nutritionData}
                title="Key Minerals"
                metrics={[
                  { key: 'calcium', label: 'Calcium', color: '#06b6d4', unit: 'mg' },
                  { key: 'iron', label: 'Iron', color: '#f97316', unit: 'mg' },
                  { key: 'sodium', label: 'Sodium', color: '#64748b', unit: 'mg' },
                ]}
                showLegend={true}
              />

              {/* Vitamins */}
              <NutritionTrendChart
                data={nutritionData}
                title="Key Vitamins"
                metrics={[
                  { key: 'vitaminA', label: 'Vitamin A', color: '#f59e0b', unit: 'μg' },
                  { key: 'vitaminC', label: 'Vitamin C', color: '#10b981', unit: 'mg' },
                  { key: 'vitaminD', label: 'Vitamin D', color: '#8b5cf6', unit: 'μg' },
                ]}
                showLegend={true}
              />
            </div>
          </div>

          {/* No Data Message */}
          {!loading && growthData.length === 0 && nutritionData.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg mb-2">No data available for this period</p>
              <p className="text-gray-500 text-sm">
                Try selecting a different time range or add some measurements and food entries
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

