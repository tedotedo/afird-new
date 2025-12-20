'use client';

import { useState, useEffect } from 'react';
import { useChildContext } from '@/contexts/ChildContext';
import AuthGuard from '@/components/AuthGuard';
import { GrowthTrendChart } from '@/components/GrowthTrendChart';
import { format, subDays, subWeeks, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import Link from 'next/link';

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
  const [sidebarDismissed, setSidebarDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('trendsReminderDismissed');
      if (dismissed === 'true') {
        setSidebarDismissed(true);
      }
    }
  }, []);

  const handleDismissSidebar = () => {
    sessionStorage.setItem('trendsReminderDismissed', 'true');
    setSidebarDismissed(true);
  };

  const handleDownload = () => {
    const { startDate, endDate } = getDateRange();
    const data = {
      dateRange: { startDate, endDate },
      child: selectedChild ? selectedChild.name : 'Parent',
      growthData,
      nutritionData,
      groupBy,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trends-${startDate}-to-${endDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

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
        {/* Sticky Sidebar Banner */}
        {!sidebarDismissed && (
          <div className="fixed right-4 top-24 z-40 hidden md:block animate-fadeIn">
            <div className="bg-white border-2 border-green-400 rounded-lg shadow-lg p-4 max-w-xs relative">
              <button
                onClick={handleDismissSidebar}
                className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-green-600 transition shadow-md"
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">📊</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Share growth trends</p>
                  <p className="text-xs text-gray-700">
                    Print or download charts to share with your healthcare team
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sticky Banner (Bottom) */}
        {!sidebarDismissed && (
          <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-slideUp">
            <div className="bg-white border-2 border-green-400 rounded-lg shadow-lg p-4 relative">
              <button
                onClick={handleDismissSidebar}
                className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-11 h-11 flex items-center justify-center hover:bg-green-600 transition shadow-lg z-50"
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-start gap-3 pr-4">
                <span className="text-3xl flex-shrink-0">📊</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Share growth trends
                  </p>
                  <p className="text-xs text-gray-700">
                    Use Print or Download buttons above to share with your healthcare team
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Trends</h1>
              <p className="text-gray-600">
                Track growth and nutrition patterns over time
                {selectedChild && ' for the selected child'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                disabled={loading}
                className="px-4 py-2 bg-white border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title="Print Trends"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title="Download Trends"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Note:</span> These trends show nutrients from food entries only. 
                  Supplements are <strong>not included</strong> in this data. Consult with your healthcare provider 
                  about total nutrient intake including any supplements.
                </p>
              </div>
            </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Vitamins & Minerals</h2>
            
            {/* Vitamins Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <GrowthTrendChart
                data={nutritionData}
                metric="vitaminA"
                title="Vitamin A"
                color="#f59e0b"
                unit="μg"
              />
              <GrowthTrendChart
                data={nutritionData}
                metric="vitaminB1"
                title="Vitamin B1 (Thiamine)"
                color="#3b82f6"
                unit="mg"
              />
              <GrowthTrendChart
                data={nutritionData}
                metric="vitaminB12"
                title="Vitamin B12"
                color="#8b5cf6"
                unit="μg"
              />
              <GrowthTrendChart
                data={nutritionData}
                metric="folate"
                title="Folate (Vitamin B9)"
                color="#ec4899"
                unit="μg"
              />
              <GrowthTrendChart
                data={nutritionData}
                metric="vitaminC"
                title="Vitamin C"
                color="#10b981"
                unit="mg"
              />
              <GrowthTrendChart
                data={nutritionData}
                metric="vitaminD"
                title="Vitamin D"
                color="#f97316"
                unit="μg"
              />
              <GrowthTrendChart
                data={nutritionData}
                metric="calcium"
                title="Calcium"
                color="#06b6d4"
                unit="mg"
              />
              <GrowthTrendChart
                data={nutritionData}
                metric="iron"
                title="Iron"
                color="#ef4444"
                unit="mg"
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

          {/* Footer Action Box */}
          {!loading && (growthData.length > 0 || nutritionData.length > 0) && (
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border-2 border-green-400">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">📈</span>
                <h2 className="text-2xl font-bold text-gray-900">Discuss trends with your healthcare team</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Print charts */}
                <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Print charts</h3>
                  <p className="text-sm text-gray-600 mb-3">Bring growth and nutrition trends to your next appointment</p>
                  <button
                    onClick={handlePrint}
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    Print now →
                  </button>
                </div>

                {/* Download data */}
                <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Download data</h3>
                  <p className="text-sm text-gray-600 mb-3">Save trend data to share via email with your healthcare provider</p>
                  <button
                    onClick={handleDownload}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Download JSON →
                  </button>
                </div>

                {/* View daily details */}
                <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">View daily details</h3>
                  <p className="text-sm text-gray-600 mb-3">Check detailed nutrition for specific dates</p>
                  <Link
                    href="/summary"
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Daily summary →
                  </Link>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-sm text-yellow-800 font-semibold text-center">
                  Growth and nutrition trends are for tracking only, not medical diagnosis. Share these charts with your GP, paediatrician, or registered dietitian to discuss any concerns or changes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

