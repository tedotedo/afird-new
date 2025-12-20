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
  const [sidebarDismissed, setSidebarDismissed] = useState(false);
  const [foodStats, setFoodStats] = useState<any>(null);
  const { selectedChild } = useChildContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('summaryReminderDismissed');
      if (dismissed === 'true') {
        setSidebarDismissed(true);
      }
    }
  }, []);

  const handleDismissSidebar = () => {
    sessionStorage.setItem('summaryReminderDismissed', 'true');
    setSidebarDismissed(true);
  };

  const handleDownload = () => {
    if (!summary) return;
    
    const data = {
      date: selectedDate,
      child: selectedChild ? selectedChild.name : 'Parent',
      totals: summary.totals,
      entries: summary.entries,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrition-summary-${selectedDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

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

  const fetchFoodStats = async () => {
    try {
      const childParam = selectedChild ? `?childId=${selectedChild.id}` : '';
      const statsResponse = await fetch(`/api/food-milestones/stats${childParam}`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setFoodStats(statsData);
      }
    } catch (err) {
      console.error('Failed to fetch food stats:', err);
    }
  };

  useEffect(() => {
    fetchSummary(selectedDate);
    fetchFoodStats();
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
        {/* Sticky Sidebar Banner */}
        {!sidebarDismissed && (
          <div className="fixed right-4 top-24 z-40 hidden md:block animate-fadeIn">
            <div className="bg-white border-2 border-blue-400 rounded-lg shadow-lg p-4 max-w-xs">
              <button
                onClick={handleDismissSidebar}
                className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600 transition"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">👨‍⚕️</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Share with your clinician</p>
                  <p className="text-xs text-gray-700">
                    Print or download this summary to discuss with your healthcare provider
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sticky Banner (Bottom) */}
        {!sidebarDismissed && (
          <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-slideUp">
            <div className="bg-white border-2 border-blue-400 rounded-lg shadow-lg p-3">
              <button
                onClick={handleDismissSidebar}
                className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600 transition"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👨‍⚕️</span>
                <p className="text-xs font-semibold text-gray-900">
                  Share with your clinician
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6 space-y-4">
            <div className="flex items-start justify-between">
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
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  disabled={loading || !summary}
                  className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Print Summary"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={loading || !summary}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Download Summary"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
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

            {/* New Foods Card */}
            {foodStats && foodStats.newFoodsThisWeek > 0 && (
              <Link href="/food-journey" legacyBehavior>
                <a className="block bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="text-5xl animate-bounce">🌟</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Amazing Progress!</h3>
                        <p className="text-lg text-purple-100">
                          <strong className="text-white">{foodStats.newFoodsThisWeek}</strong> new food{foodStats.newFoodsThisWeek !== 1 ? 's' : ''} tried this week!
                        </p>
                        <p className="text-sm text-purple-200 mt-1">
                          Tap to view your food journey →
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            )}
            
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

          {/* Footer Action Box */}
          {!loading && summary && summary.totalEntries > 0 && (
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-400">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">💬</span>
                <h2 className="text-2xl font-bold text-gray-900">Discuss with your healthcare team</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Print for appointment */}
                <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Print summary</h3>
                  <p className="text-sm text-gray-600 mb-3">Bring this nutritional summary to your next appointment</p>
                  <button
                    onClick={handlePrint}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Print now →
                  </button>
                </div>

                {/* Download data */}
                <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Download data</h3>
                  <p className="text-sm text-gray-600 mb-3">Save detailed nutrition data to share via email</p>
                  <button
                    onClick={handleDownload}
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    Download JSON →
                  </button>
                </div>

                {/* View trends */}
                <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">View long-term trends</h3>
                  <p className="text-sm text-gray-600 mb-3">See nutrition and growth patterns over weeks and months</p>
                  <Link
                    href="/trends"
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    View trends →
                  </Link>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-sm text-yellow-800 font-semibold text-center">
                  Nutritional data is for tracking only, not medical diagnosis. Always discuss changes or concerns with your GP, paediatrician, or registered dietitian.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

