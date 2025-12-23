'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { Child, ChildMeasurement } from '@/types/child';

export default function MeasurementsPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;

  const [child, setChild] = useState<Child | null>(null);
  const [measurements, setMeasurements] = useState<ChildMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (childId) {
      fetchChildAndMeasurements();
    }
  }, [childId]);

  const fetchChildAndMeasurements = async () => {
    try {
      setLoading(true);

      // Fetch child details
      const childResponse = await fetch(`/api/children/${childId}`);
      const childData = await childResponse.json();

      if (!childResponse.ok) {
        throw new Error(childData.error || 'Failed to fetch child');
      }

      setChild(childData.child);

      // Fetch measurements
      const measurementsResponse = await fetch(`/api/children/${childId}/measurements`);
      const measurementsData = await measurementsResponse.json();

      if (!measurementsResponse.ok) {
        throw new Error(measurementsData.error || 'Failed to fetch measurements');
      }

      setMeasurements(measurementsData.measurements);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateBMI = (weightKg: number, heightCm: number) => {
    const heightM = heightCm / 100;
    return (weightKg / (heightM * heightM)).toFixed(1);
  };

  const calculateGrowth = (current: number, previous: number) => {
    const diff = current - previous;
    const sign = diff >= 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)}`;
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading measurements...</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error || !child) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error || 'Child not found'}</p>
              <button
                onClick={() => router.push('/profile')}
                className="mt-2 text-sm underline"
              >
                Back to Profiles
              </button>
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
            <button
              onClick={() => router.push('/profile')}
              className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center"
            >
              ← Back to Profiles
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {child.name}'s Growth History
            </h1>
            <p className="text-gray-600">Track height and weight measurements over time</p>
          </div>

          {/* Measurements List */}
          {measurements.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">No measurements recorded yet</p>
              <p className="text-sm text-gray-500">
                Add measurements from the profile page to track growth
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {measurements.map((measurement, index) => {
                const previousMeasurement = measurements[index + 1];
                const heightGrowth = previousMeasurement
                  ? calculateGrowth(measurement.height_cm, previousMeasurement.height_cm)
                  : null;
                const weightGrowth = previousMeasurement
                  ? calculateGrowth(measurement.weight_kg, previousMeasurement.weight_kg)
                  : null;

                return (
                  <div
                    key={measurement.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {formatDate(measurement.measurement_date)}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Recorded: {formatDate(measurement.created_at)}
                        </p>
                      </div>
                      {index === 0 && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                          Latest
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Height</p>
                        <p className="text-lg font-bold text-gray-900">
                          {measurement.height_cm} cm
                        </p>
                        {heightGrowth && (
                          <p className={`text-xs font-medium ${
                            parseFloat(heightGrowth) >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {heightGrowth} cm
                          </p>
                        )}
                      </div>

                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Weight</p>
                        <p className="text-lg font-bold text-gray-900">
                          {measurement.weight_kg} kg
                        </p>
                        {weightGrowth && (
                          <p className={`text-xs font-medium ${
                            parseFloat(weightGrowth) >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {weightGrowth} kg
                          </p>
                        )}
                      </div>

                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">BMI</p>
                        <p className="text-lg font-bold text-gray-900">
                          {calculateBMI(measurement.weight_kg, measurement.height_cm)}
                        </p>
                        <p className="text-xs text-gray-500">kg/m²</p>
                      </div>
                    </div>

                    {measurement.notes && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Notes</p>
                        <p className="text-sm text-gray-800">{measurement.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}


