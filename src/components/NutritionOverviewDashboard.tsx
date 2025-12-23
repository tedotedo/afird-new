import React from 'react';
import { NutritionalData } from '@/types/nutrition';
import { NutritionRecommendation } from '@/data/whoRecommendations';
import { analyzeNutrition, getScoreColor, getScoreLabel } from '@/utils/nutritionAnalysis';

interface NutritionOverviewDashboardProps {
  totals: NutritionalData;
  recommendations: NutritionRecommendation;
}

export default function NutritionOverviewDashboard({
  totals,
  recommendations,
}: NutritionOverviewDashboardProps) {
  const analysis = analyzeNutrition(totals, recommendations);

  // Progress Ring Component
  const ProgressRing = ({ percentage, color, size = 120 }: { percentage: number; color: string; size?: number }) => {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${color} transition-all duration-1000 ease-out`}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const getRingColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className={`rounded-xl shadow-lg p-6 border-2 ${getScoreColor(analysis.overallScore)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Overall Nutrition Score</h2>
            <p className="text-sm opacity-75">Based on WHO recommendations for this person</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{analysis.overallScore}</div>
            <div className="text-lg font-semibold">{getScoreLabel(analysis.overallScore)}</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Calories Card */}
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🔥</span>
                <h3 className="font-semibold text-gray-700">Energy</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {totals.calories?.toFixed(0) || 0}
                <span className="text-sm font-normal text-gray-500 ml-1">kcal</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Target: {recommendations.energy} kcal
              </p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${
                (totals.calories || 0) >= recommendations.energy * 0.9 
                  ? 'text-green-600' 
                  : 'text-yellow-600'
              }`}>
                {((totals.calories || 0) / recommendations.energy * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* Protein Card */}
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">💪</span>
                <h3 className="font-semibold text-gray-700">Protein</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {totals.protein?.toFixed(1) || 0}
                <span className="text-sm font-normal text-gray-500 ml-1">g</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Target: {recommendations.protein} g
              </p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${
                (totals.protein || 0) >= recommendations.protein 
                  ? 'text-green-600' 
                  : 'text-yellow-600'
              }`}>
                {((totals.protein || 0) / recommendations.protein * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Deficiencies & Excesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Deficiencies */}
        {analysis.topDeficiencies.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              Needs Attention
            </h3>
            <div className="space-y-2">
              {analysis.topDeficiencies.map((nutrient, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{nutrient.name}</span>
                  <span className="font-semibold text-red-600">{nutrient.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Excesses */}
        {analysis.topExcesses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-orange-500">⚠️</span>
              Exceeding Limits
            </h3>
            <div className="space-y-2">
              {analysis.topExcesses.map((nutrient, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{nutrient.name}</span>
                  <span className="font-semibold text-orange-600">{nutrient.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If no issues, show positive message */}
        {analysis.topDeficiencies.length === 0 && analysis.topExcesses.length === 0 && (
          <div className="md:col-span-2 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <span className="text-3xl">✓</span>
            <p className="text-green-800 font-semibold mt-2">
              All nutrients are within healthy ranges!
            </p>
          </div>
        )}
      </div>

      {/* Progress Rings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Nutrient Category Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Energy */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <ProgressRing 
                percentage={analysis.categories.energy.score} 
                color={getRingColor(analysis.categories.energy.score)}
                size={100}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{analysis.categories.energy.score}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2 text-center">Energy</p>
          </div>

          {/* Macronutrients */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <ProgressRing 
                percentage={analysis.categories.macronutrients.score} 
                color={getRingColor(analysis.categories.macronutrients.score)}
                size={100}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{analysis.categories.macronutrients.score}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2 text-center">Macros</p>
          </div>

          {/* Vitamins */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <ProgressRing 
                percentage={analysis.categories.vitamins.score} 
                color={getRingColor(analysis.categories.vitamins.score)}
                size={100}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{analysis.categories.vitamins.score}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2 text-center">Vitamins</p>
          </div>

          {/* Minerals */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <ProgressRing 
                percentage={analysis.categories.minerals.score} 
                color={getRingColor(analysis.categories.minerals.score)}
                size={100}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{analysis.categories.minerals.score}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2 text-center">Minerals</p>
          </div>
        </div>
      </div>

      {/* Traffic Light Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Nutrient Status Overview</h3>
        
        {/* Visual Bar */}
        <div className="h-8 rounded-full overflow-hidden flex mb-4">
          {analysis.trafficLight.green > 0 && (
            <div 
              className="bg-green-500 flex items-center justify-center text-white text-sm font-semibold"
              style={{ width: `${(analysis.trafficLight.green / analysis.trafficLight.total) * 100}%` }}
            >
              {analysis.trafficLight.green > 2 && analysis.trafficLight.green}
            </div>
          )}
          {analysis.trafficLight.yellow > 0 && (
            <div 
              className="bg-yellow-500 flex items-center justify-center text-white text-sm font-semibold"
              style={{ width: `${(analysis.trafficLight.yellow / analysis.trafficLight.total) * 100}%` }}
            >
              {analysis.trafficLight.yellow > 2 && analysis.trafficLight.yellow}
            </div>
          )}
          {analysis.trafficLight.red > 0 && (
            <div 
              className="bg-red-500 flex items-center justify-center text-white text-sm font-semibold"
              style={{ width: `${(analysis.trafficLight.red / analysis.trafficLight.total) * 100}%` }}
            >
              {analysis.trafficLight.red > 2 && analysis.trafficLight.red}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium text-gray-700">Meeting Targets</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{analysis.trafficLight.green}</p>
            <p className="text-xs text-gray-500">
              {((analysis.trafficLight.green / analysis.trafficLight.total) * 100).toFixed(0)}%
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="text-sm font-medium text-gray-700">Adequate</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{analysis.trafficLight.yellow}</p>
            <p className="text-xs text-gray-500">
              {((analysis.trafficLight.yellow / analysis.trafficLight.total) * 100).toFixed(0)}%
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-sm font-medium text-gray-700">Needs Work</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{analysis.trafficLight.red}</p>
            <p className="text-xs text-gray-500">
              {((analysis.trafficLight.red / analysis.trafficLight.total) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


