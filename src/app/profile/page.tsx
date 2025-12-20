'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { ChildWithLatestMeasurement } from '@/types/child';
import { ParentMeasurement } from '@/types/parent';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BMICard } from '@/components/BMICard';
import { ParentMeasurementForm } from '@/components/ParentMeasurementForm';

export default function ProfilePage() {
  const router = useRouter();
  const [children, setChildren] = useState<ChildWithLatestMeasurement[]>([]);
  const [parentMeasurement, setParentMeasurement] = useState<ParentMeasurement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState<ChildWithLatestMeasurement | null>(null);
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [showParentForm, setShowParentForm] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | 'other'>('male');
  const [initialHeight, setInitialHeight] = useState('');
  const [initialWeight, setInitialWeight] = useState('');

  // Measurement form states
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [measurementDate, setMeasurementDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchChildren(), fetchParentMeasurement()]);
  };

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/children?includeMeasurements=true');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch children');
      }

      setChildren(data.children);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching children:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchParentMeasurement = async () => {
    try {
      const response = await fetch('/api/parent-measurements/latest');
      const data = await response.json();

      if (response.ok && data) {
        setParentMeasurement(data);
      }
    } catch (err: any) {
      console.error('Error fetching parent measurement:', err);
      // Don't show error for missing parent measurement, it's optional
    }
  };

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          dateOfBirth,
          sex,
          initialHeight: initialHeight ? parseFloat(initialHeight) : undefined,
          initialWeight: initialWeight ? parseFloat(initialWeight) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add child');
      }

      // Reset form
      setName('');
      setDateOfBirth('');
      setSex('male');
      setInitialHeight('');
      setInitialWeight('');
      setShowAddForm(false);

      // Refresh list
      await fetchChildren();
    } catch (err: any) {
      console.error('Error adding child:', err);
      setError(err.message);
    }
  };

  const handleDeleteChild = async (childId: string) => {
    if (!confirm('Are you sure you want to delete this child profile? This will also delete all associated food entries and measurements.')) {
      return;
    }

    try {
      const response = await fetch(`/api/children/${childId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete child');
      }

      await fetchChildren();
    } catch (err: any) {
      console.error('Error deleting child:', err);
      setError(err.message);
    }
  };

  const handleAddMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild) return;

    setError(null);

    try {
      const response = await fetch(`/api/children/${selectedChild.id}/measurements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heightCm: parseFloat(heightCm),
          weightKg: parseFloat(weightKg),
          measurementDate,
          notes: notes || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add measurement');
      }

      // Reset form
      setHeightCm('');
      setWeightKg('');
      setMeasurementDate(new Date().toISOString().split('T')[0]);
      setNotes('');
      setShowMeasurementForm(false);
      setSelectedChild(null);

      // Refresh list
      await fetchChildren();
    } catch (err: any) {
      console.error('Error adding measurement:', err);
      setError(err.message);
    }
  };

  const handleAddParentMeasurement = async (data: any) => {
    setError(null);

    try {
      const response = await fetch('/api/parent-measurements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add parent measurement');
      }

      setShowParentForm(false);
      await fetchParentMeasurement();
    } catch (err: any) {
      console.error('Error adding parent measurement:', err);
      throw err; // Re-throw to let form handle it
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading children profiles...</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Health Profile</h1>
            <p className="text-gray-600">Track your health and your children's growth with WHO BMI standards</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Parent Profile Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Your Profile (Parent)</h2>
              {parentMeasurement && !showParentForm && (
                <button
                  onClick={() => setShowParentForm(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Update Measurement
                </button>
              )}
            </div>

            {!parentMeasurement && !showParentForm ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  Add your height and weight to track your BMI with WHO standards
                </p>
                <button
                  onClick={() => setShowParentForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Add Your Measurement
                </button>
              </div>
            ) : showParentForm ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <ParentMeasurementForm
                  onSubmit={handleAddParentMeasurement}
                  onCancel={() => setShowParentForm(false)}
                  initialData={parentMeasurement || undefined}
                />
              </div>
            ) : parentMeasurement ? (
              <BMICard
                heightCm={parentMeasurement.height_cm}
                weightKg={parentMeasurement.weight_kg}
                ageYears={25} // TODO: Get actual age from user profile
                sex="male" // TODO: Get actual sex from user profile
                name="You"
                isParent={true}
              />
            ) : null}
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-300 my-8"></div>

          {/* Children Section Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Children Profiles</h2>
            <p className="text-gray-600">Manage your children's profiles and track their growth</p>
          </div>

          {/* Add Child Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mb-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
            >
              + Add Child
            </button>
          )}

          {/* Add Child Form */}
          {showAddForm && (
            <div className="mb-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Child</h2>
              <form onSubmit={handleAddChild} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Child's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sex *
                  </label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value as 'male' | 'female' | 'other')}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Initial Height (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={initialHeight}
                      onChange={(e) => setInitialHeight(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 120.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Initial Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={initialWeight}
                      onChange={(e) => setInitialWeight(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 25.5"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Add Child
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setName('');
                      setDateOfBirth('');
                      setSex('male');
                      setInitialHeight('');
                      setInitialWeight('');
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Measurement Form Modal */}
          {showMeasurementForm && selectedChild && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Add Measurement for {selectedChild.name}
                </h2>
                <form onSubmit={handleAddMeasurement} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 120.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 25.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Measurement Date *
                    </label>
                    <input
                      type="date"
                      value={measurementDate}
                      onChange={(e) => setMeasurementDate(e.target.value)}
                      required
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes (optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any additional notes..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Add Measurement
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMeasurementForm(false);
                        setSelectedChild(null);
                        setHeightCm('');
                        setWeightKg('');
                        setMeasurementDate(new Date().toISOString().split('T')[0]);
                        setNotes('');
                      }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Children List */}
          {children.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">No children profiles yet</p>
              <p className="text-sm text-gray-500">
                Add a child profile to start tracking their nutrition and growth
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                      <p className="text-sm text-gray-600">
                        {calculateAge(child.date_of_birth)} years old • {child.sex}
                      </p>
                      <p className="text-xs text-gray-500">
                        Born: {formatDate(child.date_of_birth)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteChild(child.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>

                  {child.latestMeasurement && (
                    <div className="mb-4">
                      <BMICard
                        heightCm={child.latestMeasurement.height_cm}
                        weightKg={child.latestMeasurement.weight_kg}
                        ageYears={calculateAge(child.date_of_birth)}
                        sex={child.sex as 'male' | 'female' | 'other'}
                        name={child.name}
                        isParent={false}
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Last measured: {formatDate(child.latestMeasurement.measurement_date)}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedChild(child);
                          setShowMeasurementForm(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                      >
                        Add Measurement
                      </button>
                      <button
                        onClick={() => router.push(`/profile/${child.id}/measurements`)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition text-sm"
                      >
                        View History
                      </button>
                    </div>
                    <Link href="/food-journey" legacyBehavior>
                      <a className="block w-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-2 px-4 rounded-lg transition text-sm text-center border-2 border-purple-300">
                        <span className="text-base mr-2">🌟</span>
                        View Food Journey
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

