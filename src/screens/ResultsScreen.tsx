'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FoodAnalysisResult } from '@/types/nutrition';
import FoodImageDisplay from '@/components/FoodImageDisplay';
import DateTimeDisplay from '@/components/DateTimeDisplay';
import NutritionCard from '@/components/NutritionCard';
import { useFoodEntries } from '@/hooks/useFoodEntries';
import { useChildContext } from '@/contexts/ChildContext';
import Confetti from '@/components/Confetti';

export default function ResultsScreen() {
  const router = useRouter();
  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { selectedChild, children } = useChildContext();
  const { saveEntry } = useFoodEntries({ autoFetch: false });
  
  // New food tracking state
  const [isNewFood, setIsNewFood] = useState(false);
  const [successLevel, setSuccessLevel] = useState<string>('bite');
  const [foodNotes, setFoodNotes] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

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
      // Save the food entry first
      await saveEntry(
        imageFile,
        result.nutritionalData,
        result.nutritionalData.meal_type,
        result.dateTime,
        selectedChild?.id || undefined
      );
      
      // If this is a new food, save the milestone
      if (isNewFood) {
        const foodName = result.nutritionalData.food_items?.[0] || result.nutritionalData.description || 'Unknown food';
        
        const milestoneResponse = await fetch('/api/food-milestones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            child_id: selectedChild?.id || null,
            food_name: foodName,
            food_category: result.nutritionalData.meal_type || 'other',
            date_tried: result.dateTime.toISOString().split('T')[0],
            success_level: successLevel,
            notes: foodNotes || null,
            photo_url: result.imageUri,
          }),
        });

        if (!milestoneResponse.ok) {
          console.error('Failed to save food milestone, but entry was saved');
        } else {
          // Show confetti for new food achievement!
          setShowConfetti(true);
        }
      }
      
      setSaveSuccess(true);
      
      // Clear session storage after successful save
      setTimeout(() => {
        sessionStorage.removeItem('analysisResult');
        sessionStorage.removeItem('analysisImageFile');
        router.push(isNewFood ? '/food-journey' : '/history');
      }, isNewFood ? 3500 : 1500); // Extra time for confetti
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

        {/* Selected Child Indicator */}
        {selectedChild && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Recording for: {selectedChild.name}
                </p>
                <p className="text-xs text-blue-700">
                  Change in the navigation menu if needed
                </p>
              </div>
            </div>
          </div>
        )}

        {!selectedChild && children.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Recording for: Yourself (Parent)
                </p>
                <p className="text-xs text-gray-600">
                  Select a child in the navigation menu to record for them
                </p>
              </div>
            </div>
          </div>
        )}

        <NutritionCard nutritionalData={result.nutritionalData} />

        {/* New Food Tracking */}
        <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌟</span>
            <h3 className="text-xl font-bold text-purple-900">Is this a new food?</h3>
          </div>
          
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isNewFood}
              onChange={(e) => setIsNewFood(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-purple-900 font-medium">
              Mark as new food attempt for {selectedChild?.name || 'me'}
            </span>
          </label>

          {isNewFood && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  How did it go?
                </label>
                <select
                  value={successLevel}
                  onChange={(e) => setSuccessLevel(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="refused">😟 Refused to try</option>
                  <option value="touched">👆 Touched or explored</option>
                  <option value="licked">👅 Licked or kissed</option>
                  <option value="nibble">🤏 Small nibble</option>
                  <option value="bite">😊 Took a bite</option>
                  <option value="finished">🎉 Finished it!</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Notes about this experience (optional)
                </label>
                <textarea
                  value={foodNotes}
                  onChange={(e) => setFoodNotes(e.target.value)}
                  placeholder="E.g., 'Tried broccoli for the first time, didn't like the texture but willing to try again'"
                  className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong className="font-semibold">Medical Disclaimer:</strong> These nutritional values are estimates based on AI image recognition and food label databases. 
                Accuracy can vary considerably depending on food preparation, portion sizes, and ingredients. 
                This information is for tracking purposes only and should not be considered medical or dietary advice. 
                Always consult with a qualified healthcare professional, dietitian, or physician regarding any nutritional or medical concerns.
              </p>
            </div>
          </div>
        </div>

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
      
      {/* Confetti celebration for new foods */}
      <Confetti
        show={showConfetti}
        onComplete={() => setShowConfetti(false)}
        duration={3000}
      />
    </div>
  );
}
