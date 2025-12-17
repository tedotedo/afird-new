'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FoodAnalysisResult } from '@/types/nutrition';
import FoodImageDisplay from '@/components/FoodImageDisplay';
import DateTimeDisplay from '@/components/DateTimeDisplay';
import NutritionCard from '@/components/NutritionCard';
import { useFoodEntries } from '@/hooks/useFoodEntries';

export default function ResultsScreen() {
  const router = useRouter();
  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { saveEntry } = useFoodEntries({ autoFetch: false });

  useEffect(() => {
    // Get result from sessionStorage
    const stored = sessionStorage.getItem('analysisResult');
    const storedFile = sessionStorage.getItem('analysisImageFile');
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert dateTime string back to Date object
        parsed.dateTime = new Date(parsed.dateTime);
        setResult(parsed);

        // Restore image file if available
        if (storedFile && typeof File !== 'undefined') {
          const fileData = JSON.parse(storedFile);
          const sourceUrl = fileData.objectUrl || fileData.dataUrl;
          if (sourceUrl) {
            fetch(sourceUrl)
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], fileData.name, { type: fileData.type });
                setImageFile(file);
              })
              .catch(err => {
                console.error('Error restoring image file:', err);
              });
          }
        }
      } catch (err) {
        console.error('Error parsing stored result:', err);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleSave = async () => {
    if (!result || !imageFile) {
      setSaveError('Missing image or result data');
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await saveEntry(
        imageFile,
        result.nutritionalData,
        result.nutritionalData.meal_type,
        result.dateTime
      );
      setSaveSuccess(true);
      // Clear session storage after successful save
      setTimeout(() => {
        sessionStorage.removeItem('analysisResult');
        sessionStorage.removeItem('analysisImageFile');
        router.push('/history');
      }, 1500);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save entry');
    } finally {
      setSaving(false);
    }
  };

  const handleTakeAnother = () => {
    sessionStorage.removeItem('analysisResult');
    sessionStorage.removeItem('analysisImageFile');
    router.push('/');
  };

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Analysis Results</h1>
        </div>

        <FoodImageDisplay imageUri={result.imageUri} />

        <DateTimeDisplay dateTime={result.dateTime} />

        <NutritionCard nutritionalData={result.nutritionalData} />

        {saveSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mt-4">
            Entry saved successfully! Redirecting...
          </div>
        )}

        {saveError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4">
            {saveError}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            disabled={saving || saveSuccess || !imageFile}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition shadow-lg disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Entry'}
          </button>
          <button
            onClick={handleTakeAnother}
            disabled={saving}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition shadow-lg disabled:cursor-not-allowed"
          >
            Take Another Photo
          </button>
        </div>
      </div>
    </div>
  );
}
