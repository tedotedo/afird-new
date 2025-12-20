'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { useChildContext } from '@/contexts/ChildContext';
import Link from 'next/link';

interface NutritionGoal {
  id: string;
  goal_type: string;
  nutrient_name?: string;
  target_value: number;
  target_unit: string;
  target_min?: number;
  target_max?: number;
  priority: string;
  notes?: string;
  set_by?: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
}

interface DailySummary {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
}

const PRIORITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  critical: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
};

export default function GoalsPage() {
  const { selectedChild } = useChildContext();
  const [goals, setGoals] = useState<NutritionGoal[]>([]);
  const [todaySummary, setTodaySummary] = useState<DailySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal_type: 'calories',
    nutrient_name: '',
    target_value: 0,
    target_unit: 'kcal',
    priority: 'medium',
    notes: '',
    set_by: '',
  });

  useEffect(() => {
    fetchData();
  }, [selectedChild]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const childParam = selectedChild ? `?childId=${selectedChild.id}` : '';
      
      // Fetch goals
      const goalsResponse = await fetch(`/api/nutrition-goals${childParam}&isActive=true`);
      if (!goalsResponse.ok) {
        throw new Error('Failed to fetch goals');
      }
      const goalsData = await goalsResponse.json();
      setGoals(goalsData);

      // Fetch today's summary
      const today = new Date().toISOString().split('T')[0];
      const summaryUrl = selectedChild
        ? `/api/daily-summary?date=${today}&childId=${selectedChild.id}`
        : `/api/daily-summary?date=${today}`;
      
      const summaryResponse = await fetch(summaryUrl);
      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json();
        setTodaySummary(summaryData);
      }

    } catch (err: any) {
      setError(err.message || 'Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    try {
      const response = await fetch('/api/nutrition-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newGoal,
          child_id: selectedChild?.id || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add goal');
      }

      // Reset form and refresh
      setNewGoal({
        goal_type: 'calories',
        nutrient_name: '',
        target_value: 0,
        target_unit: 'kcal',
        priority: 'medium',
        notes: '',
        set_by: '',
      });
      setShowAddGoal(false);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to add goal');
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm('Are you sure you want to delete this goal?')) {
      return;
    }

    try {
      const response = await fetch(`/api/nutrition-goals/${goalId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }

      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete goal');
    }
  };

  const calculateProgress = (goal: NutritionGoal): number => {
    if (!todaySummary) return 0;

    let currentValue = 0;

    // Map goal types to summary fields
    switch (goal.goal_type) {
      case 'calories':
        currentValue = todaySummary.totalCalories || 0;
        break;
      case 'protein':
        currentValue = todaySummary.totalProtein || 0;
        break;
      case 'carbohydrates':
        currentValue = todaySummary.totalCarbohydrates || 0;
        break;
      case 'fat':
        currentValue = todaySummary.totalFat || 0;
        break;
      case 'fiber':
        currentValue = todaySummary.totalFiber || 0;
        break;
      case 'sugar':
        currentValue = todaySummary.totalSugar || 0;
        break;
      case 'sodium':
        currentValue = todaySummary.totalSodium || 0;
        break;
      case 'vitamin':
        if (goal.nutrient_name && todaySummary.vitamins) {
          currentValue = todaySummary.vitamins[goal.nutrient_name] || 0;
        }
        break;
      case 'mineral':
        if (goal.nutrient_name && todaySummary.minerals) {
          currentValue = todaySummary.minerals[goal.nutrient_name] || 0;
        }
        break;
    }

    return Math.round((currentValue / goal.target_value) * 100);
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-bounce">🎯</div>
            <p className="text-gray-600">Loading your goals...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🎯</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Goals & Progress</h1>
                {selectedChild && (
                  <p className="text-xl text-green-100 mt-2">Tracking {selectedChild.name}'s nutritional targets</p>
                )}
                {!selectedChild && (
                  <p className="text-xl text-green-100 mt-2">Your nutritional targets</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-8 space-y-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Goals should be set in consultation with your healthcare provider, dietitian, or physician.
              This tool is for tracking purposes only and is not medical advice.
            </p>
          </div>

          {/* Add Goal Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddGoal(!showAddGoal)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg flex items-center gap-2"
            >
              <span className="text-xl">➕</span>
              Add New Goal
            </button>
          </div>

          {/* Add Goal Form */}
          {showAddGoal && (
            <div className="bg-white rounded-xl shadow-lg p-8 animate-scaleIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Nutrition Goal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
                  <select
                    value={newGoal.goal_type}
                    onChange={(e) => setNewGoal({ ...newGoal, goal_type: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="calories">Calories</option>
                    <option value="protein">Protein</option>
                    <option value="carbohydrates">Carbohydrates</option>
                    <option value="fat">Fat</option>
                    <option value="fiber">Fiber</option>
                    <option value="sugar">Sugar</option>
                    <option value="sodium">Sodium</option>
                    <option value="vitamin">Vitamin (specify below)</option>
                    <option value="mineral">Mineral (specify below)</option>
                  </select>
                </div>

                {(newGoal.goal_type === 'vitamin' || newGoal.goal_type === 'mineral') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {newGoal.goal_type === 'vitamin' ? 'Vitamin Name' : 'Mineral Name'}
                    </label>
                    <input
                      type="text"
                      value={newGoal.nutrient_name}
                      onChange={(e) => setNewGoal({ ...newGoal, nutrient_name: e.target.value })}
                      placeholder="e.g., vitaminD, iron"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                    <input
                      type="number"
                      value={newGoal.target_value}
                      onChange={(e) => setNewGoal({ ...newGoal, target_value: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <input
                      type="text"
                      value={newGoal.target_unit}
                      onChange={(e) => setNewGoal({ ...newGoal, target_unit: e.target.value })}
                      placeholder="e.g., kcal, g, mg"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                  <textarea
                    value={newGoal.notes}
                    onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
                    placeholder="Why this goal was set..."
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Set By (optional)</label>
                  <input
                    type="text"
                    value={newGoal.set_by}
                    onChange={(e) => setNewGoal({ ...newGoal, set_by: e.target.value })}
                    placeholder="e.g., Dr. Smith, Self"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddGoal}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Save Goal
                  </button>
                  <button
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Goals List */}
          {goals.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Goals Set Yet</h3>
              <p className="text-gray-600 mb-6">
                Set nutritional goals to track your progress and ensure you're meeting your dietary needs.
              </p>
              <button
                onClick={() => setShowAddGoal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
              >
                Add Your First Goal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = calculateProgress(goal);
                const priorityStyle = PRIORITY_COLORS[goal.priority] || PRIORITY_COLORS.medium;

                return (
                  <div
                    key={goal.id}
                    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${priorityStyle.border}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 capitalize">
                            {goal.goal_type}
                            {goal.nutrient_name && ` - ${goal.nutrient_name}`}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityStyle.bg} ${priorityStyle.text}`}>
                            {goal.priority}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Target: <strong>{goal.target_value} {goal.target_unit}</strong> per day
                        </div>
                        {goal.set_by && (
                          <div className="text-sm text-gray-500 mt-1">
                            Set by: {goal.set_by}
                          </div>
                        )}
                        {goal.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">{goal.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-700 transition ml-4"
                        title="Delete goal"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Today's Progress</span>
                        <span className="text-sm font-bold text-gray-900">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            progress >= 100
                              ? 'bg-gradient-to-r from-green-500 to-green-600'
                              : progress >= 75
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                              : progress >= 50
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                              : 'bg-gradient-to-r from-orange-500 to-red-600'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/summary" legacyBehavior>
              <a className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Summary</h3>
                <p className="text-sm text-gray-600">Check today's nutritional intake</p>
              </a>
            </Link>
            <Link href="/trends" legacyBehavior>
              <a className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Trends</h3>
                <p className="text-sm text-gray-600">Track progress over time</p>
              </a>
            </Link>
            <Link href="/camera" legacyBehavior>
              <a className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center">
                <div className="text-4xl mb-3">📸</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Food</h3>
                <p className="text-sm text-gray-600">Add today's meals</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

