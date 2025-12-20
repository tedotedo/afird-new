'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { useChildContext } from '@/contexts/ChildContext';
import Link from 'next/link';
import Image from 'next/image';

interface FoodMilestone {
  id: string;
  food_name: string;
  food_category: string;
  date_tried: string;
  attempt_number: number;
  success_level: string;
  texture?: string;
  temperature?: string;
  notes?: string;
  photo_url?: string;
}

interface Stats {
  totalFoodsTried: number;
  totalAttempts: number;
  successfulAttempts: number;
  successRate: number;
  newFoodsThisWeek: number;
  newFoodsThisMonth: number;
  newFoodsThisYear: number;
  categories: Record<string, number>;
  textures: Record<string, number>;
  uniqueTextures: number;
  achievements: Array<{
    id: string;
    name: string;
    icon: string;
    unlocked: boolean;
  }>;
  recentMilestones: FoodMilestone[];
}

const SUCCESS_LEVEL_ICONS: Record<string, string> = {
  refused: '😟',
  touched: '👆',
  licked: '👅',
  nibble: '🤏',
  bite: '😊',
  finished: '🎉',
};

const SUCCESS_LEVEL_NAMES: Record<string, string> = {
  refused: 'Refused',
  touched: 'Touched/Explored',
  licked: 'Licked/Kissed',
  nibble: 'Small Nibble',
  bite: 'Took a Bite',
  finished: 'Finished It!',
};

const CATEGORY_ICONS: Record<string, string> = {
  vegetable: '🥕',
  fruit: '🍎',
  protein: '🍗',
  grain: '🌾',
  dairy: '🥛',
  snack: '🍪',
  beverage: '🥤',
  other: '🍽️',
};

export default function FoodJourneyPage() {
  const { selectedChild } = useChildContext();
  const [stats, setStats] = useState<Stats | null>(null);
  const [milestones, setMilestones] = useState<FoodMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterSuccessLevel, setFilterSuccessLevel] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [selectedChild]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const childParam = selectedChild ? `?childId=${selectedChild.id}` : '';
      
      // Fetch stats
      const statsResponse = await fetch(`/api/food-milestones/stats${childParam}`);
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch statistics');
      }
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch all milestones
      const milestonesResponse = await fetch(`/api/food-milestones${childParam}`);
      if (!milestonesResponse.ok) {
        throw new Error('Failed to fetch milestones');
      }
      const milestonesData = await milestonesResponse.json();
      setMilestones(milestonesData);

    } catch (err: any) {
      setError(err.message || 'Failed to load food journey');
    } finally {
      setLoading(false);
    }
  };

  const filteredMilestones = filterSuccessLevel
    ? milestones.filter(m => m.success_level === filterSuccessLevel)
    : milestones;

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-bounce">🌟</div>
            <p className="text-gray-600">Loading your food journey...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🌟</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Food Journey</h1>
                {selectedChild && (
                  <p className="text-xl text-purple-100 mt-2">{selectedChild.name}'s adventure</p>
                )}
                {!selectedChild && (
                  <p className="text-xl text-purple-100 mt-2">Your food adventure</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-8 space-y-8">
          {/* Statistics Dashboard */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{stats.totalFoodsTried}</div>
                <div className="text-sm text-gray-600">Foods Tried</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">{stats.newFoodsThisWeek}</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{stats.successRate}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.achievements.length}</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          )}

          {/* Achievements Section */}
          {stats && stats.achievements.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span>🏆</span>
                Achievements Unlocked
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 text-center shadow-md transform hover:scale-105 transition"
                  >
                    <div className="text-5xl mb-2">{achievement.icon}</div>
                    <div className="font-semibold text-gray-800">{achievement.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Breakdown */}
          {stats && Object.keys(stats.categories).length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span>📊</span>
                Foods by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.categories).map(([category, count]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">{CATEGORY_ICONS[category] || '🍽️'}</div>
                    <div className="font-semibold text-gray-800 capitalize">{category}</div>
                    <div className="text-2xl font-bold text-purple-600">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span>📅</span>
                Timeline
              </h2>
              <select
                value={filterSuccessLevel}
                onChange={(e) => setFilterSuccessLevel(e.target.value)}
                className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Attempts</option>
                <option value="refused">😟 Refused</option>
                <option value="touched">👆 Touched</option>
                <option value="licked">👅 Licked</option>
                <option value="nibble">🤏 Nibble</option>
                <option value="bite">😊 Bite</option>
                <option value="finished">🎉 Finished</option>
              </select>
            </div>

            {filteredMilestones.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Your Journey!</h3>
                <p className="text-gray-600 mb-6">
                  Try a new food and mark it in the results screen to begin tracking your progress.
                </p>
                <Link href="/camera" legacyBehavior>
                  <a className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Take a Food Photo
                  </a>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredMilestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl">
                        {SUCCESS_LEVEL_ICONS[milestone.success_level]}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.food_name}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                            <span>{new Date(milestone.date_tried).toLocaleDateString()}</span>
                            {milestone.food_category && (
                              <span className="inline-flex items-center gap-1">
                                {CATEGORY_ICONS[milestone.food_category]}
                                <span className="capitalize">{milestone.food_category}</span>
                              </span>
                            )}
                            {milestone.attempt_number > 1 && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                Attempt #{milestone.attempt_number}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-purple-600">
                            {SUCCESS_LEVEL_NAMES[milestone.success_level]}
                          </div>
                          {milestone.texture && (
                            <div className="text-xs text-gray-500 mt-1 capitalize">
                              {milestone.texture}
                            </div>
                          )}
                        </div>
                      </div>
                      {milestone.notes && (
                        <p className="text-sm text-gray-700 mt-2 italic">&quot;{milestone.notes}&quot;</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Encouragement Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Keep Going! 🌟</h2>
            <p className="text-lg text-blue-100 mb-6">
              Every attempt is progress, whether successful or not. You're building confidence and exploring new foods!
            </p>
            <Link href="/camera" legacyBehavior>
              <a className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg">
                Try Another Food
              </a>
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

