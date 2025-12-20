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

interface UserFeedback {
  id: string;
  user_email: string | null;
  feedback_type: string;
  rating: number | null;
  message: string;
  page_url: string | null;
  user_agent: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string>('');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState('');
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackFilter, setFeedbackFilter] = useState<string>('all');

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

  const fetchFeedback = async () => {
    try {
      setFeedbackLoading(true);
      const response = await fetch('/api/feedback?limit=100');

      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const data = await response.json();
      setFeedback(data.feedback || []);
    } catch (err: any) {
      console.error('Error fetching feedback:', err);
    } finally {
      setFeedbackLoading(false);
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
      fetchFeedback();
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

        {/* User Feedback Section */}
        {adminKey && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <span>💬</span>
                  User Feedback
                  <span className="text-sm font-normal text-gray-500">({feedback.length} total)</span>
                </h2>
                <button
                  onClick={fetchFeedback}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                  disabled={feedbackLoading}
                >
                  {feedbackLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {['all', 'bug', 'feature', 'improvement', 'praise', 'other'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFeedbackFilter(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      feedbackFilter === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    {type !== 'all' && (
                      <span className="ml-2 text-xs">
                        ({feedback.filter(f => f.feedback_type === type).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Feedback List */}
              {feedbackLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedback
                    .filter(f => feedbackFilter === 'all' || f.feedback_type === feedbackFilter)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {item.feedback_type === 'bug' && '🐛'}
                              {item.feedback_type === 'feature' && '💡'}
                              {item.feedback_type === 'improvement' && '✨'}
                              {item.feedback_type === 'praise' && '🎉'}
                              {item.feedback_type === 'other' && '💬'}
                            </span>
                            <div>
                              <span className="font-semibold text-gray-800 capitalize">
                                {item.feedback_type}
                              </span>
                              {item.rating && (
                                <span className="ml-3 text-yellow-500">
                                  {'⭐'.repeat(item.rating)}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(item.created_at).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-3 whitespace-pre-wrap">{item.message}</p>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          {item.user_email && (
                            <span className="flex items-center gap-1">
                              <span>👤</span>
                              {item.user_email}
                            </span>
                          )}
                          {!item.user_email && (
                            <span className="flex items-center gap-1">
                              <span>👤</span>
                              Anonymous
                            </span>
                          )}
                          {item.page_url && (
                            <span className="flex items-center gap-1 truncate max-w-xs">
                              <span>📄</span>
                              {item.page_url.replace('https://arfid-new.netlify.app', '')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                  {feedback.filter(f => feedbackFilter === 'all' || f.feedback_type === feedbackFilter).length === 0 && (
                    <p className="text-center text-gray-500 py-12">
                      No {feedbackFilter !== 'all' ? feedbackFilter : ''} feedback yet
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

