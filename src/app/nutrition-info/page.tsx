'use client';

import React, { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import NutrientCard from '@/components/NutrientCard';
import NutrientDetailCard from '@/components/NutrientDetailCard';
import { NUTRITION_INFO_DATABASE, NutrientInfo, getNutrientsByCategory, searchNutrients } from '@/data/nutritionInfo';

type CategoryTab = 'all' | 'vitamin' | 'mineral' | 'macronutrient';

export default function NutritionInfoPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>('all');
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter nutrients based on category and search
  const getFilteredNutrients = () => {
    let nutrients = selectedCategory === 'all' 
      ? NUTRITION_INFO_DATABASE 
      : getNutrientsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      nutrients = searchNutrients(searchQuery);
      // Further filter by category if not 'all'
      if (selectedCategory !== 'all') {
        nutrients = nutrients.filter(n => n.category === selectedCategory);
      }
    }

    return nutrients;
  };

  const filteredNutrients = getFilteredNutrients();

  const tabs: { id: CategoryTab; label: string; icon: string }[] = [
    { id: 'all', label: 'All Nutrients', icon: '📊' },
    { id: 'vitamin', label: 'Vitamins', icon: '🍊' },
    { id: 'mineral', label: 'Minerals', icon: '💎' },
    { id: 'macronutrient', label: 'Macronutrients', icon: '🥗' },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-4xl font-bold mb-4">Nutrition Information Center</h1>
            <p className="text-lg text-blue-100 max-w-3xl">
              Learn about the essential vitamins, minerals, and macronutrients your body needs. 
              Discover their benefits, food sources, and importance for health.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search nutrients... (e.g., iron, vitamin c, calcium)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-white rounded-lg shadow-md p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-semibold transition ${
                    selectedCategory === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">About This Information</h3>
                <p className="text-sm text-blue-800">
                  All information is sourced from authoritative health organizations including WHO (World Health Organization), 
                  NIH (National Institutes of Health), Mayo Clinic, Harvard Health, and CDC. Click on any nutrient card 
                  to learn more and access external resources.
                </p>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredNutrients.length}</span> nutrient{filteredNutrients.length !== 1 ? 's' : ''}
              {searchQuery && (
                <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
              )}
            </p>
          </div>

          {/* Nutrients Grid */}
          {filteredNutrients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNutrients.map((nutrient) => (
                <NutrientCard
                  key={nutrient.id}
                  nutrient={nutrient}
                  onClick={() => setSelectedNutrient(nutrient)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No nutrients found</h3>
              <p className="text-gray-600">
                Try adjusting your search or selecting a different category.
              </p>
            </div>
          )}

          {/* Educational Footer */}
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why Nutrition Matters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-indigo-900 mb-2">🌱 Growth & Development</h4>
                <p className="text-gray-700">
                  Proper nutrition is essential for children's physical and mental development, supporting healthy growth patterns.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">💪 Disease Prevention</h4>
                <p className="text-gray-700">
                  Adequate nutrient intake helps prevent deficiencies and supports the immune system in fighting infections.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-900 mb-2">🧠 Cognitive Function</h4>
                <p className="text-gray-700">
                  Many nutrients play crucial roles in brain health, learning, memory, and overall cognitive performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedNutrient && (
        <NutrientDetailCard
          nutrient={selectedNutrient}
          onClose={() => setSelectedNutrient(null)}
        />
      )}
    </AuthGuard>
  );
}


