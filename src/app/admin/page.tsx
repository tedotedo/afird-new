'use client';

import { useState, useEffect } from 'react';

interface AdminStats {
  summary: {
    total_entries: number;
    unique_users: number;
  };
  daily_stats: Array<{
    date: string;
    total_entries: number;
    unique_users: number;
    avg_calories: number;
  }>;
  meal_type_distribution: Array<{
    meal_type: string;
    count: number;
    percentage: number;
  }>;
  average_nutrition: {
    avg_calories: number;
    avg_protein: number;
    avg_carbs: number;
    avg_fat: number;
  };
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string>('');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState('');

  // Try to get key from env or localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('admin_api_key');
    const envKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
    
    if (envKey) {
      setAdminKey(envKey);
    } else if (savedKey) {
      setAdminKey(savedKey);
    }
  }, []);

  const fetchStats = async (key: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/statistics', {
        headers: {
          'Authorization': `Bearer ${key}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch statistics');
      }

      const data = await response.json();
      setStats(data);
      
      // Save key to localStorage if it worked
      if (key && !process.env.NEXT_PUBLIC_ADMIN_API_KEY) {
        localStorage.setItem('admin_api_key', key);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch statistics');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim()) {
      setAdminKey(keyInput.trim());
      fetchStats(keyInput.trim());
    }
  };

  useEffect(() => {
    if (adminKey) {
      fetchStats(adminKey);
    }
  }, [adminKey]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Statistics</h1>

        {!adminKey && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Admin API Key</h2>
            <form onSubmit={handleSubmitKey} className="flex gap-4">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter your admin API key"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Load Statistics
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-2">
              The admin API key is stored in your .env.local file as ADMIN_API_KEY
            </p>
          </div>
        )}

        {adminKey && (
          <div className="mb-4">
            <button
              onClick={() => {
                setAdminKey('');
                setKeyInput('');
                localStorage.removeItem('admin_api_key');
                setStats(null);
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Change API Key
            </button>
          </div>
        )}

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

        {!loading && !error && stats && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Entries</h2>
                <p className="text-4xl font-bold text-blue-600">{stats.summary.total_entries.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Unique Users</h2>
                <p className="text-4xl font-bold text-green-600">{stats.summary.unique_users.toLocaleString()}</p>
              </div>
            </div>

            {/* Average Nutrition */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Average Nutrition Per Entry</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.average_nutrition.avg_calories.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Protein (g)</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.average_nutrition.avg_protein.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Carbs (g)</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.average_nutrition.avg_carbs.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fat (g)</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.average_nutrition.avg_fat.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Meal Type Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Meal Type Distribution</h2>
              <div className="space-y-3">
                {stats.meal_type_distribution.map((item) => (
                  <div key={item.meal_type} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-800 capitalize">{item.meal_type}</span>
                        <span className="text-sm text-gray-600">
                          {item.count} entries ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Stats Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Statistics (Last 30 Days)</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Entries
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unique Users
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Calories
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.daily_stats.slice(0, 30).map((day) => (
                      <tr key={day.date}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(day.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.total_entries}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.unique_users}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.avg_calories.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {stats.daily_stats.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No daily statistics available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

