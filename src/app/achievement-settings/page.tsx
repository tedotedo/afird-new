'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { useChildContext } from '@/contexts/ChildContext';
import Link from 'next/link';

interface AchievementPreference {
  id?: string;
  achievement_type: string;
  custom_threshold?: number;
  custom_name?: string;
  custom_icon?: string;
  is_enabled: boolean;
}

const DEFAULT_ACHIEVEMENTS = [
  { type: 'first_food', threshold: 1, name: 'First Step', icon: '🌱', description: 'Try the first new food' },
  { type: 'brave_five', threshold: 5, name: 'Brave Taster', icon: '⭐', description: 'Try 5 different foods' },
  { type: 'explorer_ten', threshold: 10, name: 'Food Explorer', icon: '🗺️', description: 'Try 10 different foods' },
  { type: 'adventurer_twenty', threshold: 20, name: 'Taste Adventurer', icon: '🎒', description: 'Try 20 different foods' },
  { type: 'champion_fifty', threshold: 50, name: 'Food Champion', icon: '🏆', description: 'Try 50 different foods' },
  { type: 'rainbow_eater', threshold: 5, name: 'Rainbow Eater', icon: '🌈', description: 'Try 5+ fruits and vegetables' },
  { type: 'texture_master', threshold: 5, name: 'Texture Master', icon: '🎨', description: 'Try 5 different textures' },
];

export default function AchievementSettingsPage() {
  const { selectedChild } = useChildContext();
  const [preferences, setPreferences] = useState<Map<string, AchievementPreference>>(new Map());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPreferences();
  }, [selectedChild]);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const childParam = selectedChild ? `?childId=${selectedChild.id}` : '';
      const response = await fetch(`/api/achievement-preferences${childParam}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch preferences');
      }

      const data = await response.json();
      const prefsMap = new Map(
        data.map((pref: any) => [pref.achievement_type, pref])
      );
      setPreferences(prefsMap);
    } catch (err: any) {
      console.error('Error fetching preferences:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (achievementType: string, threshold: number, enabled: boolean) => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/achievement-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          child_id: selectedChild?.id || null,
          achievement_type: achievementType,
          custom_threshold: threshold,
          is_enabled: enabled,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preference');
      }

      await fetchPreferences();
      setMessage({ type: 'success', text: 'Achievement settings saved!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset all achievement settings to defaults? This cannot be undone.')) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const childParam = selectedChild ? `?childId=${selectedChild.id}` : '';
      const response = await fetch(`/api/achievement-preferences${childParam}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to reset preferences');
      }

      await fetchPreferences();
      setMessage({ type: 'success', text: 'All achievements reset to defaults!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to reset settings' });
    } finally {
      setSaving(false);
    }
  };

  const getPreference = (type: string) => {
    return preferences.get(type);
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-bounce">⚙️</div>
            <p className="text-gray-600">Loading achievement settings...</p>
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
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🎯</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Achievement Settings</h1>
                {selectedChild && (
                  <p className="text-xl text-purple-100 mt-2">Customizing for {selectedChild.name}</p>
                )}
                {!selectedChild && (
                  <p className="text-xl text-purple-100 mt-2">Customizing your achievements</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl mt-8 space-y-8">
          {/* Back Link */}
          <Link href="/food-journey" legacyBehavior>
            <a className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Food Journey
            </a>
          </Link>

          {/* Explanation */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span>💡</span>
              About Achievement Customization
            </h2>
            <div className="text-blue-800 space-y-2 text-sm">
              <p>
                <strong>Every child is unique!</strong> The default achievement thresholds work well for many children, 
                but you know your child best. You can customize these goals to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Match developmental stage:</strong> Younger children may need smaller, more frequent wins</li>
                <li><strong>Build confidence:</strong> Set achievable goals that motivate rather than overwhelm</li>
                <li><strong>Reflect individual progress:</strong> Some children benefit from more challenging targets</li>
                <li><strong>Create meaningful milestones:</strong> Adjust numbers to match your family's ARFID journey</li>
              </ul>
              <p className="mt-3 font-semibold">
                Remember: ANY food interaction is progress! These achievements celebrate effort, not perfection.
              </p>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Achievement List */}
          <div className="space-y-4">
            {DEFAULT_ACHIEVEMENTS.map((defaultAch) => {
              const pref = getPreference(defaultAch.type);
              const currentThreshold = pref?.custom_threshold ?? defaultAch.threshold;
              const isEnabled = pref?.is_enabled !== false;

              return (
                <div
                  key={defaultAch.type}
                  className={`bg-white rounded-xl shadow-lg p-6 transition ${
                    !isEnabled ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-5xl">{defaultAch.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {defaultAch.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{defaultAch.description}</p>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-700">Threshold:</span>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={currentThreshold}
                              onChange={(e) => {
                                const newValue = parseInt(e.target.value) || 1;
                                handleSave(defaultAch.type, newValue, isEnabled);
                              }}
                              disabled={!isEnabled || saving}
                              className="w-20 px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <span className="text-gray-600">foods</span>
                          </label>
                          {pref && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
                              Custom
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(e) => {
                          handleSave(defaultAch.type, currentThreshold, e.target.checked);
                        }}
                        disabled={saving}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 disabled:cursor-not-allowed"
                      />
                      <span className="text-sm font-medium text-gray-700">Enabled</span>
                    </label>
                  </div>
                  {pref && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      Default: {defaultAch.threshold} → Custom: {currentThreshold}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reset Button */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Reset to Defaults</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you want to start fresh with the original achievement thresholds, you can reset all customizations.
            </p>
            <button
              onClick={handleReset}
              disabled={saving || preferences.size === 0}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset All to Defaults
            </button>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📝</span>
              Tips for Setting Achievement Goals
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Start small:</strong> It's better to have frequent celebrations than distant goals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Observe patterns:</strong> Adjust based on how quickly your child tries new foods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Celebrate everything:</strong> Remember that touching, licking, and even refusing all count as "trying"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Be flexible:</strong> You can adjust these anytime as your child's journey progresses</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

