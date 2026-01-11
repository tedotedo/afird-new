'use client';

import { useEffect, useMemo, useState } from 'react';
import { format, subMonths } from 'date-fns';
import AuthGuard from '@/components/AuthGuard';
import { useChildContext } from '@/contexts/ChildContext';
import { GrowthTrendChart } from '@/components/GrowthTrendChart';

interface GrowthMeasurement {
  date: string;
  height?: number;
  weight?: number;
  bmi: number;
  notes?: string | null;
  childName?: string;
}

type TimeRange = '6months' | '12months' | '24months';

export default function BMITrendsPage() {
  const { selectedChild } = useChildContext();
  const [timeRange, setTimeRange] = useState<TimeRange>('12months');
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDateRange = () => {
    const now = new Date();
    let monthsBack = 12;

    switch (timeRange) {
      case '6months':
        monthsBack = 6;
        break;
      case '12months':
        monthsBack = 12;
        break;
      case '24months':
        monthsBack = 24;
        break;
      default:
        monthsBack = 12;
    }

    const start = subMonths(now, monthsBack);
    const end = now;

    return {
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd'),
    };
  };

  useEffect(() => {
    fetchGrowthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChild, timeRange]);

  const fetchGrowthData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { startDate, endDate } = getDateRange();
      const params = new URLSearchParams({ startDate, endDate });
      if (selectedChild) {
        params.append('childId', selectedChild.id);
      }

      const response = await fetch(`/api/trends/growth?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch BMI data');
      }

      setMeasurements(result.measurements || []);
    } catch (err: any) {
      console.error('Error fetching BMI trends:', err);
      setError("We couldn't load BMI trends right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Group measurements by month and take the latest entry in each month
  const monthlyData = useMemo(() => {
    const byMonth = new Map<string, GrowthMeasurement>();

    measurements.forEach((m) => {
      const d = new Date(m.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`; // month bucket
      const existing = byMonth.get(key);

      if (!existing || new Date(m.date) > new Date(existing.date)) {
        byMonth.set(key, m);
      }
    });

    return Array.from(byMonth.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [measurements]);

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
              <p className="mt-4 text-gray-600">Loading BMI trends...</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Trends (Monthly)</h1>
            <p className="text-gray-600">
              View monthly BMI changes for {selectedChild ? selectedChild.name : 'yourself (parent)'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Each point represents the <span className="font-semibold">latest measurement in that month</span>.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Range
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="6months">Last 6 months</option>
                  <option value="12months">Last 12 months</option>
                  <option value="24months">Last 24 months</option>
                </select>
              </div>

              <div className="md:col-span-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p>
                  BMI is calculated from your height and weight measurements. Use this view to spot overall
                  trends, not to diagnose specific health issues.
                </p>
              </div>
            </div>
          </div>

          {/* Graph */}
          <div className="mb-8">
            <GrowthTrendChart
              data={monthlyData}
              metric="bmi"
              title="Monthly BMI"
              color="#8b5cf6"
              unit="kg/m²"
              dateFormat="MMM yyyy"
              fullDateFormat="MMMM yyyy"
            />
          </div>

          {/* Numeric table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly BMI Data</h2>

            {monthlyData.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No BMI measurements found for this time range. Try adding measurements on the Profile page.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Month</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">BMI (kg/m²)</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Height (cm)</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Weight (kg)</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {monthlyData.map((m) => {
                      const d = new Date(m.date);
                      const monthLabel = format(d, 'MMMM yyyy');

                      return (
                        <tr key={m.date}>
                          <td className="px-4 py-2 text-gray-900">{monthLabel}</td>
                          <td className="px-4 py-2 font-semibold text-gray-900">{m.bmi.toFixed(1)}</td>
                          <td className="px-4 py-2 text-gray-700">
                            {m.height != null ? m.height.toFixed(1) : '—'}
                          </td>
                          <td className="px-4 py-2 text-gray-700">
                            {m.weight != null ? m.weight.toFixed(1) : '—'}
                          </td>
                          <td className="px-4 py-2 text-gray-700 max-w-xs">
                            {m.notes ? <span className="line-clamp-2">{m.notes}</span> : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <p className="mt-4 text-xs text-gray-500">
              This page is for tracking and discussion with your healthcare team. It does not provide medical
              advice or diagnosis.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
